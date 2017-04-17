define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    // 模板
    var tpls = {
        orderSummaryIndex: require('../../tpl/orderSummary/index'),
        orderSummaryList: require('../../tpl/orderSummary/list')
    };

    var orderSummary = function() {};
    $.extend(orderSummary.prototype, {
        init: function(param) {
            // 初始化查询条件参数
            this.getParams(param);
            // 渲染模板            
            $('#main-content').empty().html(template.compile(tpls.orderSummaryIndex)({ searchValue: this.searchParam }));
            // 控件初始化
            this.initControl();
            // 获取数据
            this.getData();
        },
        // 初始化控件
        initControl: function() {
            this.event();
            common.initDateTime('input[name="Stime"]', 'Y-m-d H:i', false, null, true);
            common.initDateTime('input[name="Etime"]', 'Y-m-d H:i', false, null, true);
        },
        // 获取查询条件
        getParams: function(param) {
            debugger;
            this.sortParam = {};
            var newParams = {
                OrgNo: common.getElValue(':hidden[name="OrgNo"]'), //所属机构
                PlateNo: common.getElValue('input[name="PlateNo"]'), //车牌号码
                orgName: common.getElValue('input[name="orgName"]'), //机构名称
                Stime: common.getElValue('input[name="Stime"]'),
                Etime: common.getElValue('input[name="Etime"]')
            };
            this.searchParam = common.getParams('orderSummaryParams', param, newParams);
            if (!this.searchParam.Stime) {
                this.searchParam.Stime = new Date().format('yyyy-MM-dd 00:00');
            }
            if (!this.searchParam.Etime) {
                this.searchParam.Etime = new Date().format('yyyy-MM-dd 23:59');
            }
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            param = $.extend({}, param, this.sortParam ? this.sortParam : {});
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('orderSummaryParams', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.orderSummary.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    $('#orderSummaryList').empty().html(template.compile(tpls.orderSummaryList)({
                        data: data.Page || []
                    }));
                    common.page(data.TotalCount, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.PageIndex = currPage;
                        common.changeHash('#orderSummary/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
                common.loading();
            });
        },
        exportOrderSummary: function(el) {
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
            // 所属机构事件监听
            common.listenOrganization();
            // 查询-事件监听
            $('.panel-toolbar').on('click', '.js_list_search', function() {
                    me.getParams(true);
                    common.changeHash('#orderSummary/index/', me.searchParam);
                })
                //重置
                .on('click', '.js_list_reset', function() {
                    common.removeLocationStorage('carManagerParams'); // 车辆管理
                    me.getParams(false);
                    common.changeHash('#orderSummary/index/', me.searchParam);
                })
                .on('click', '.js_list_export', function() {
                    me.exportOrderSummary();
                });
        }
    });

    exports.init = function(param) {
        new orderSummary().init(param);
    };
});