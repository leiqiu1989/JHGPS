define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    var map = require('map');
    require('lodash');
    // 模板
    var tpls = {
        carIndex: require('../../tpl/orderManager/index'),
        carList: require('../../tpl/orderManager/list'),
        map: require('../../tpl/orderManager/map')
    };

    function carList() {}
    $.extend(carList.prototype, {
        init: function(param) {
            // 初始化查询条件参数
            this.getParams(param);
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.carIndex)({ searchValue: this.searchParam }));
            // 控件初始化
            this.initControl();
            // 获取数据
            this.getData();
        },
        // 初始化控件
        initControl: function() {
            var me = this;
            this.event();
            common.tableSort(function(sortParam) {
                me.sortParam = sortParam;
                me.getData();
            });
            common.initDateTime('input[name="start"]', 'Y/m/d H:i', false, false, true, new Date());
            common.initDateTime('input[name="end"]', 'Y/m/d H:i', false, false, true, new Date());
        },
        // 获取查询条件
        getParams: function(param) {
            this.sortParam = {};
            var newParams = {
                OrderNum: common.getElValue('input[name="OrderNum"]'), //订单编号
                start: common.getElValue('input[name="start"]'),
                end: common.getElValue('input[name="end"]'),
                phone: common.getElValue('input[name="phone"]'),
                plateNo: common.getElValue('input[name="plateNo"]'),
                OrderType: common.getElValue('input[name="OrderType"]')
            };
            if (newParams.start) newParams.start = newParams.start;
            if (newParams.end) newParams.end = newParams.end;
            this.searchParam = common.getParams('carSearchParams', param, newParams, true);
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            //if (this.searchParam && !_.isEmpty(this.searchParam)) {
            param = $.extend({}, param, this.sortParam ? this.sortParam : {});
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('carSearchParams', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.orderManager.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    $('#carList').empty().html(template.compile(tpls.carList)({
                        data: data.Page || []
                    }));
                    common.page(data.TotalCount, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.pageNumber = currPage;
                        common.changeHash('#orderManager/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
                common.loading();
            });
            //}
        },
        stopCar: function(truckId, confirmText, callback) {
            var me = this;
            common.confirm(confirmText, function() {
                common.loading('show', '数据正在处理中...');
                common.ajax(api.carManager.stop, {
                    truckIds: truckId
                }, function(res) {
                    if (res.status === 'OK') {
                        if (callback) {
                            callback();
                        } else {
                            me.getData();
                        }
                    } else {
                        var msg = res.errorMsg || '系统出错，请联系管理员！';
                        common.toast(msg);
                    }
                    common.loading();
                });
            });
        },
        exportCarList: function(el) {
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
                common.changeHash('#orderManager/index/', me.searchParam);
            });
            // 事件监听
            $('#main-content').on('click', '.js_list_add', function() {
                    common.changeHash('#carManager/edit');
                })
                .on('click', '.js_list_edit', function() {
                    var tr = $(this).closest('tr');
                    var truckId = tr.data('truckid');
                    var orgId = tr.data('orgid');
                    common.changeHash('#carManager/edit/', { truckId: truckId, orgId: orgId });
                })
                .on('click', '.js_list_import', function() {
                    common.changeHash('#carManager/import');
                })
                .on('click', '.js_list_export', function() {
                    me.exportCarList($(this));
                })
                //查看位置
                .on('click', '.js_list_detail', function() {
                    common.autoAdaptionDialog(template.compile(tpls.map)(), {
                        title: '位置查看'
                    }, function() {
                        map.init('mymap');
                        map.removeOverView();
                    });
                    // var tr = $(this).closest('tr');
                    // var truckId = tr.data('truckid');
                    // var orgId = tr.data('orgid');
                    // var uniqueIds = tr.data('uniqueids');
                    // common.changeHash('#carManager/detail/', { truckId: truckId, orgId: orgId, uniqueIds: uniqueIds });

                })
                .on('click', '.js_list_stop', function() {
                    var truckId = $(this).closest('tr').data('truckid');
                    var confirmText = '';
                    if (truckId) {
                        confirmText = '确定要停用该车辆吗？';
                    } else {
                        var chks = $('.datatable-content table > tbody input[name="checkItem"]:checked');
                        if (chks.size() < 1) {
                            common.toast('请选择要停用的车辆！');
                            return false;
                        }
                        confirmText = '已选择&nbsp;<span class="red">' + chks.size() + '</span>&nbsp;辆车，是否对车辆停止使用？';
                        var array = [];
                        $.each(chks, function(i, item) {
                            array.push($(item).closest('tr').data('truckid'));
                        });
                        truckId = array.join(',');
                    }
                    me.stopCar(truckId, confirmText);
                }).on('click', 'input[name="checkAll"]', function() {
                    var isChecked = $(this).is(':checked');
                    if (isChecked) {
                        $('.datatable-content table > tbody input[name="checkItem"]').prop('checked', isChecked);
                    } else {
                        $('.datatable-content table > tbody input[name="checkItem"]').removeAttr('checked');
                    }
                }).on('click', 'input[name="checkItem"]', function() {
                    var chks = $('.datatable-content table > tbody input[name="checkItem"]:checked').size();
                    var totalChks = $('.datatable-content table > tbody input[name="checkItem"]').size();
                    if (chks == totalChks) {
                        $('.datatable-header table > thead input[name="checkAll"]').prop('checked', true);
                    } else {
                        $('.datatable-header table > thead input[name="checkAll"]').removeAttr('checked');
                    }
                });
        }
    });

    var _carObj = new carList();

    exports.init = function(param) {
        _carObj.init(param);
    };
});