define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    // 模板
    var tpls = {
        logIndex: require('../../tpl/log/index'),
        logList: require('../../tpl/log/list')
    };

    function logList() {}
    $.extend(logList.prototype, {
        init: function(param) {
            // 初始化查询条件参数
            this.getParams(param);
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.logIndex)({ searchValue: this.searchParam }));
            // 控件初始化
            this.initControl();
            // 获取数据
            this.getData();
        },
        // 初始化控件
        initControl: function() {
            this.event();
            common.initDateTime('input[name="Start"]', 'Y-m-d H:i', false, null, true);
            common.initDateTime('input[name="End"]', 'Y-m-d H:i', false, null, true);
        },
        // 获取查询条件
        getParams: function(param) {
            this.sortParam = {};
            var newParams = {
                UserName: common.getElValue('input[name="UserName"]'),
                PlateNo: common.getElValue('input[name="PlateNo"]'),
                Start: common.getElValue('input[name="Start"]'),
                End: common.getElValue('input[name="End"]')
            };
            this.searchParam = common.getParams('logManagerSearchParams', param, newParams);
            if (!this.searchParam.Start) {
                this.searchParam.Start = new Date().format('yyyy-MM-dd 00:00');
            }
            if (!this.searchParam.End) {
                this.searchParam.End = new Date().format('yyyy-MM-dd 23:59');
            }
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            param = $.extend({}, param);
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('logManagerSearchParams', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.sysLogManager.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    $('#logList').empty().html(template.compile(tpls.logList)({
                        data: data.Page || []
                    }));
                    common.page(data.TotalCount, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.PageIndex = currPage;
                        common.changeHash('#log/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
                common.loading();
            });
        },
        exportLogList: function(el) {
            this.getParams();
            var st = common.getCookie('st');
            var sid = common.getCookie('sid');
            var src = api.carManager.exportCarList + '?sid=' + sid + '&st=' + st;
            $.each(this.searchParam, function(key, value) {
                src += '&' + key + '=' + value;
            });
            var downSrc = encodeURI(src);
            $(el).attr('href', downSrc);
        },
        event: function() {
            var me = this;
            // 查询-事件监听
            $('.panel-toolbar')
                //重置
                .on('click', '.js_list_reset', function() {
                    common.removeLocationStorage('logManagerSearchParams'); // 车辆管理
                    me.getParams(false);
                    common.changeHash('#log/index/', me.searchParam);
                })
                .on('click', '.js_list_search', function() {
                    me.getParams(true);
                    common.changeHash('#log/index/', me.searchParam);
                })
                .on('click', '.js_list_export', function() {
                    me.exportLogList($(this));
                });
        }
    });

    var _logList = new logList();

    exports.init = function(param) {
        _logList.init(param);
    };
});