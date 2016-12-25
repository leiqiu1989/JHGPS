define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var validate = require('validate');
    var common = require('common');
    var api = require('api');

    // 模板
    var tpls = {
        index: require('../../tpl/complaintManager/list'),
        list: require('../../tpl/complaintManager/table')
    };

    var complaintList = function() {

    };
    $.extend(complaintList.prototype, {
        init: function(param) {
            // 获取查询条件
            this.getParams(param);
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.index)({ searchValue: this.searchParam }));
            // 控件初始化
            this.initControl();
            // 获取数据
            //this.getData();
        },
        // 获取查询条件
        getParams: function(param) {
            this.sortParam = {};
            var newParams = {
                OrderNum: common.getElValue('input[name="orgId"]'),
                From: common.getElValue('input[name="From"]'),
                To: common.getElValue('input[name="To"]'),
                Feature: common.getElValue('select[name="Feature"] > option:selected'),
                Start: common.getElValue('input[name="Start"]'),
                End: common.getElValue('input[name="To"]')
            };
            this.searchParam = common.getParams('complaintManagerParams', param, newParams);
        },
        initControl: function() {
            this.event();
            common.initDateTime('input[name="Start"]', null, true, 'yyyy/MM/dd 00:00');
            common.initDateTime('input[name="End"]', null, true);
        },
        event: function() {
            var me = this;
            /*************顶部工具栏*********/
            $('.panel-toolbar').off()
                //查询
                .on('click', '.js_search', function() {
                    me.getParams(true);
                    common.changeHash('#complaintManager/index/', me.searchParam);
                })
                //导出
                .on('click', '.js_export', function() {
                    me.export($(this));
                });
        },
        getData: function() {
            var me = this;
            var param = $.extend({}, this.searchParam, this.sortParam ? this.sortParam : {});
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('complaintManager', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.complaintManager.list, param, function(res) {
                if (res.status === 'OK') {
                    var data = res.content;
                    $('#gpsTable').empty().html(template.compile(tpls.gpsList)({
                        data: data.result || []
                    }));
                    me.totalCount = data.totalCount;
                    common.page(data.totalCount, param.pageSize, param.pageNumber, function(currPage) {
                        me.searchParam.pageNumber = currPage;
                        common.changeHash('#gpsDevice/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
                common.loading();
            });
        },
        getcheckedIds: function() {
            var ids = [];
            $('#gpsTable tbody input[type="checkbox"]:checked').each(function(i) {
                var $tr = $(this).closest('tr');
                if ($tr.data('status') === 0) { //1,已售;0,在库
                    ids.push($tr.data('uniqueid'));
                }
            });
            return ids;
        },
        export: function(el) {
            if (this.totalCount <= 1000) {
                this.getParams();
                var st = common.getCookie('st');
                var sid = common.getCookie('sid');
                var src = api.gpsDevice.export+'?sid=' + sid + '&st=' + st;
                $.each(this.searchParam, function(key, value) {
                    src += '&' + key + '=' + value;
                });
                var downSrc = encodeURI(src);
                $(el).attr('href', downSrc);
            } else {
                common.toast('导出数据量过大,请输入查询条件查询,最多导出1000条数据!');
                return false;
            }
        }
    });

    exports.init = function(param) {
        new complaintList().init(param);
    };
});