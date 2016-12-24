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

    function carMonitor() {
        this.monitorTimer = null;
    }

    $.extend(carMonitor.prototype, {
        init: function(param) {
            // 赋值为null是为了,地图infowindow里面的轨迹回放返回,重新加载导致timer计时器未clear
            this.monitorTimer = null;
            $('#main-content').empty().html(template.compile(tpls.index)());
            map.init('monitorMap');
            this.initControl();
        },
        // 初始化控件
        initControl: function() {
            this.event();
            this.initZTree();
        },
        initZTree: function() {
            var me = this;
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
            common.ajax(api.vehicleList, {}, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var data = res.content || [];
                    $.fn.zTree.init($("#vehicleTree"), ztreeSetting, data);
                    //展开节点
                    var treeObj = $.fn.zTree.getZTreeObj("vehicleTree");
                    treeObj.expandAll(true);
                    var arrVids = common.getCookie('arrVids');
                    if (arrVids) {
                        // 取值默认选中tree
                        var ids = arrVids.split(',');
                        for (var i = 0; i < ids.length; i++) {
                            var node = treeObj.getNodeByParam('Id', ids[i]);
                            treeObj.checkNode(node, true, true);
                        }
                        // 获取列表
                        me.getCarPositionList(arrVids);
                    }
                    // tree查询
                    common.searchTree();
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
            });
        },
        // 统计车辆信息
        monitorSummary: function(data) {
            var onlineCount = 0;
            var offLineCount = 0;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if (item.VehicleStatus === '离线') {
                    offLineCount += 1;
                } else {
                    onlineCount += 1;
                }
            }
            $('.js-carTotal').text(data.length);
            $('.js-onLineTotal').text(onlineCount);
            $('.js-offLineTotal').text(offLineCount);
        },
        startMonitorTimer: function() {
            var me = this;
            if (!this.monitorTimer) {
                this.monitorTimer = setInterval(function() {
                    me.getCarPositionList();
                }, 30000);
            }
        },
        stopMonitorTimer: function() {
            clearInterval(this.monitorTimer);
        },
        carDetailInfo: function(id) {
            var me = this;
            common.ajax(api.carManager.detail, { vid: id }, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var data = res.content;
                    var html = template.compile(tpls.carDetail)({
                        data: data
                    });
                    common.autoAdaptionDialog(html, {
                        title: '车辆详情'
                    }, function(_dialog) {
                        $('#btnCancel').on('click', function() {
                            _dialog.close();
                        });
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
            });
        },
        // 获取车辆位置列表
        getCarPositionList: function(arrVids) {
            var me = this;
            var arrVid = arrVids ? arrVids : common.getTreeNodeSelected('vehicleTree');
            common.setCookie('arrVids', arrVid);
            if (arrVid) {
                common.ajax(api.carPositionList, { ArrVid: arrVid }, function(res) {
                    if (res && res.status === 'SUCCESS') {
                        var data = res.content || [];
                        $('#carMonitorList').empty().html(template.compile(tpls.carList)({
                            data: data
                        }));
                        if (data.length > 0) {
                            // 清除数据
                            map.clearData();
                            for (var i = 0; i < data.length; i++) {
                                data[i] = common.directForm(data[i]);
                                map.addTrackMark(data[i]);
                            }
                            // 绑定监控表格行单击事件
                            map.bindMonitorListEvent();
                            // 统计
                            me.monitorSummary(data);
                            // 开启监控
                            me.startMonitorTimer();
                        }
                    } else {
                        var msg = res.errorMsg || '系统出错，请联系管理员！';
                        common.toast(msg);
                    }
                });
            }
        },
        event: function() {
            var me = this;
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
                    var id = $(this).data('id');
                    common.carDetailInfo();
                })
                // 轨迹回放
                .on('click', '.js_track_replay', function() {
                    var id = $(this).data('id');
                    var plateNo = $(this).data('plate');
                    me.stopMonitorTimer();
                    common.changeHash('#carMonitor/track/', { id: id, plateNo: plateNo });
                })
                // 已选组织-确认
                .on('click', '.js-vehicle-ok', function() {
                    $('.vehicle-box').hide();
                    $('.monitorBody').show();
                    me.stopMonitorTimer();
                    me.getCarPositionList();
                });
        }
    });

    var monitor = new carMonitor();

    exports.init = function(param) {
        monitor.init(param);
    };

    // 地图infowindow事件
    //地图信息框点击事件-车辆详细信息
    window.showVehicleInfo = function(id) {
        monitor.carDetailInfo(id);
    };
    //地图信息框点击事件-车辆轨迹
    window.showVehicleTrack = function(id, plateNo) {
        monitor.stopMonitorTimer();
        common.changeHash('#carMonitor/track/', { id: id, plateNo: plateNo });
    };
});