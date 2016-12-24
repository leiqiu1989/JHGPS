define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    var map = require('map');
    // 模板
    var tpls = {
        track: require('../../tpl/carMonitor/track'),
    };

    var carTrack = function() {
        this.id = null;
        this.plateNo = null;
    };
    $.extend(carTrack.prototype, {
        init: function(param) {
            $('#contentBody').empty().html(template.compile(tpls.track)());
            this.id = param.id;
            this.plateNo = param.plateNo;
            map.init('trackMap');
            map.removeOverView();
            this.initControl();
        },
        // 初始化控件
        initControl: function() {
            var me = this;
            // 获取车辆
            var arrVid = common.getCookie('arrVids');
            common.ajax(api.carPositionList, { ArrVid: arrVid }, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var data = res.content || [];
                    var selHtml = '';
                    $.each(data, function(index, item) {
                        selHtml += '<option value="' + item.Vid + '">' + item.PlateNo + '</option>';
                    });
                    $('select[name="selectCarList"]').append(selHtml);
                    common.initSelect('select[name="selectCarList"]', {}, function(param) {
                        $(':hidden[name="Vid"]').val(param.selected);
                    }, me.id);
                    $(':hidden[name="Vid"]').val(me.id);
                    $('.chosen-container').css('vertical-align', 'bottom');
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
            });
            common.initDateTime('#startDate', null, true, 'yyyy/MM/dd 00:00');
            common.initDateTime('#endDate', null, true);
            this.event();
        },
        // 重置
        reset: function() {

        },
        // 查询历史轨迹
        getHistory: function() {
            var vid = $(':hidden[name="Vid"]').val();
            if (!vid) {
                common.toast('该车没有绑定gps编号!');
                return false;
            }
            var startDate = $('#startDate').val();
            var endDate = $('#endDate').val();
            var chkResult = common.checkTime(endDate, startDate, 3);
            if (chkResult) {
                var sTime = startDate + ' :00';
                var eTime = endDate + ' :59';
                common.ajax(api.carTrackHistory, { Vid: vid, STime: sTime, ETime: eTime }, function(res) {
                    if (res && res.status === 'SUCCESS') {
                        var data = res.content;

                    }
                });
            }
        },
        event: function() {
            var me = this;
            // 事件监听
            $('.track-container')
                // 轨迹列表显示或隐藏
                .on('click', '.js-toggle-list', function() {
                    $(this).toggleClass('active');
                    $('.track-list-data').toggle();
                })
                // 返回
                .on('click', '.js-track-back', function() {
                    common.changeHash('#carMonitor/index');
                })
                // 查询
                .on('click', '.js-search-history', function() {
                    me.reset();
                    me.getHistory();
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
                });
        }
    });

    exports.init = function(param) {
        new carTrack().init(param);
    };
});