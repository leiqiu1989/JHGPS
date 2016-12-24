define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    require('zTree');
    require('excheck');
    require('exhide');
    var map = require('map');
    // 模板
    var tpls = {
        index: require('../../tpl/carMonitor/index'),
        carList: require('../../tpl/carMonitor/list'),
        carDetail: require('../../tpl/carMonitor/carDetail')
    };

    function carMonitor() {}
    $.extend(carMonitor.prototype, {
        init: function(param) {
            $('#main-content').empty().html(template.compile(tpls.index)());
            map.init('monitorMap');
            this.initControl();
        },
        // 初始化控件
        initControl: function() {
            var me = this;
            this.event();
            this.initZTree();
        },
        initZTree: function() {
            //组织列表树设置
            var ztreeSetting = {
                check: {
                    enable: true,
                    chkStyle: "checkbox"
                },
                view: {
                    selectedMulti: false
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "Id",
                        pIdKey: "Pid",
                        rootPId: null
                    },
                    key: {
                        name: "Name",
                        checked: "IsCheck"
                    }

                }
            };
            common.ajax(api.vehicleList, {}, function(data) {
                $.fn.zTree.init($("#vehicleTree"), ztreeSetting, data);
                //展开节点
                var treeObj = $.fn.zTree.getZTreeObj("vehicleTree");
                treeObj.expandAll(true);
                common.searchTree();
            });
        },
        // 统计车辆信息
        monitorSummary: function(data) {
            var stopCount = 0;
            var offLineCount = 0;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if (item.IsOnline === 0) { //车辆离线
                    offLineCount++;
                } else {
                    if (item.Status.indexOf("ACC关") > -1) {
                        stopCount++;
                    }
                }
            }
            $('.js-carTotal').text(data.length);
            $('.js-onLineTotal').text(data.length - stopCount - offLineCount);
            $('.js-offLineTotal').text(offLineCount);
        },
        // 获取车辆位置列表
        getCarPositionList: function() {
            var me = this;
            var arrVid = common.getTreeNodeSelected('vehicleTree');
            common.ajax(api.carPositionList, { ArrVid: arrVid }, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var data = res.content || [];
                    $('#carMonitorList').empty().html(template.compile(tpls.carList)({
                        data: data
                    }));
                    if (data.length > 0) {
                        map.clearOverlays();
                        for (var i = 0; i < data.length; i++) {
                            data[i] = common.directForm(data[i]);
                            map.addTrackMark(data[i]);
                        }
                        // 绑定监控表格行单击事件
                        map.bindMonitorListEvent();
                        // 统计
                        me.monitorSummary(data);
                    }

                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
            });
        },
        event: function() {
            var me = this;
            // 查询-事件监听
            $('.panel-toolbar').on('click', '.js_list_search', function() {
                me.getParams(true);
                common.changeHash('#carManager/index/', me.searchParam);
            });
            // 事件监听
            $('#main-content')
                // 组织列表隐藏
                .on('click', '.vehicle-close', function() {
                    $('.vehicle-box').hide();
                })
                // 切换组织列表
                .on('click', '.js-origin', function() {
                    $('.vehicle-box').toggle();
                    $('.monitorBody').hide();
                })
                // 切换车辆列表
                .on('click', '.js-foldToggle', function() {
                    var order = '';
                    if ($(this).hasClass('foldDown')) {
                        $(this).removeClass('foldDown').addClass('foldUp');
                        order = 'up';
                    } else {
                        $(this).removeClass('foldUp').addClass('foldDown');
                        order = 'down';
                    }
                    map.moveOverView(order);
                    $('.vehicle-box').hide();
                    $('.monitorBody').toggle();
                })
                // 车辆详情
                .on('click', '.js_car_info', function() {
                    common.autoAdaptionDialog(tpls.carDetail, {
                        title: '车辆详情'
                    }, function(_dialog) {
                        $('#btnCancel').on('click', function() {
                            _dialog.close();
                        });
                    });
                })
                // 轨迹回放
                .on('click', '.js_track_replay', function() {
                    common.changeHash('#carMonitor/track');
                })
                // 已选组织-确认
                .on('click', '.js-vehicle-ok', function() {
                    $('.vehicle-box').hide();
                    $('.monitorBody').show();
                    me.getCarPositionList();
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
                .on('click', '.js_list_detail', function() {
                    var tr = $(this).closest('tr');
                    var truckId = tr.data('truckid');
                    var orgId = tr.data('orgid');
                    var uniqueIds = tr.data('uniqueids');
                    common.changeHash('#carManager/detail/', { truckId: truckId, orgId: orgId, uniqueIds: uniqueIds });
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

    exports.init = function(param) {
        new carMonitor().init(param);
    };
});