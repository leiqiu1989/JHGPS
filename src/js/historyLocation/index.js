define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var validate = require('validate');
    var common = require('common');
    var api = require('api');
    var map = require('map');
    require('draw');
    require('lodash');

    // 模板
    var tpls = {
        index: require('../../tpl/historyLocation/index'),
        list: require('../../tpl/historyLocation/list')
    };

    var historyLocation = function() {
        this.initMapTime = null;
        this.drawManager = null;
        this.overlays = [];
    };
    $.extend(historyLocation.prototype, {
        init: function(param) {
            var me = this;
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.index)());
            // 控件初始化
            this.initControl();
            // 地图初始化
            map.init('historyMap', null, false);

            this.initMapTime = setInterval(function() {
                if (map.isLoaded) {
                    clearInterval(me.initMapTime);
                    me.drawManagerRectangle();
                }
            }, 500);
        },
        // 鼠标绘制
        drawManagerRectangle: function() {
            var me = this;
            var styleOptions = {
                strokeColor: "#ccc", //边线颜色。
                fillColor: "#fff", //填充颜色。当参数为空时，圆形将没有填充效果。
                strokeWeight: 1, //边线的宽度，以像素为单位。
                strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
                fillOpacity: 1, //填充的透明度，取值范围0 - 1。
                strokeStyle: 'solid' //边线的样式，solid或dashed。
            };

            //实例化鼠标绘制工具
            this.drawManager = new BMapLib.DrawingManager(map._map, {
                isOpen: false, //是否开启绘制模式
                enableDrawingTool: true, //是否显示工具栏
                drawingToolOptions: {
                    anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                    offset: new BMap.Size(5, 5), //偏离值
                    drawingModes: [BMAP_DRAWING_RECTANGLE]
                },
                rectangleOptions: styleOptions //矩形的样式
            });
            this.drawManager.addEventListener('overlaycomplete', function(e) {
                me.overlaycomplete(e);
            });
        },
        overlaycomplete: function(e) {
            var maxLng = 0,
                maxLat = 0,
                minLng = 0,
                minLat = 0;
            var overlay = e.overlay;
            this.drawManager.close();
            var points = overlay.getPath();
            if (points.length > 0) {
                var lngs = _.map(points, 'lng');
                var lats = _.map(points, 'lat');
                maxLng = _.max(lngs);
                maxLat = _.max(lats);
                minLng = _.min(lngs);
                minLat = _.min(lats);
            }
            if (this.overlays.length == 2) {
                var removeLay = this.overlays.splice(0, 1);
                map._map.removeOverlay(removeLay[0].overlay);
            }
            this.overlays.push({
                overlay: e.overlay,
                maxLng: maxLng,
                maxLat: maxLat,
                minLng: minLng,
                minLat: minLat
            });
            this.setPointValue(this.overlays);
        },
        setPointValue: function(overlays) {
            var firstItem = null,
                secondItem = null,
                firstEl = null,
                secondEl = null,
                len = overlays.length;
            if (len == 1) {
                firstItem = overlays[0];
                firstEl = '.js-firstPoint';
            } else if (len == 2) {
                firstItem = overlays[0];
                secondItem = overlays[1];
                firstEl = '.js-firstPoint';
                secondEl = '.js-secondPoint';
            } else {
                this.clearOverLay();
                common.toast('标注数据异常!');
                return false;
            }
            $(firstEl).eq(0).text(firstItem.minLng);
            $(firstEl).eq(1).text(firstItem.minLat);
            $(firstEl).eq(2).text(firstItem.maxLng);
            $(firstEl).eq(3).text(firstItem.maxLat);
            if (secondEl) {
                $(secondEl).eq(0).text(secondItem.minLng);
                $(secondEl).eq(1).text(secondItem.minLat);
                $(secondEl).eq(2).text(secondItem.maxLng);
                $(secondEl).eq(3).text(secondItem.maxLat);
            }
        },
        clearOverLay: function() {
            var me = this;
            $('.js-firstPoint,js-secondPoint').text('');
            for (var i = 0; i < this.overlays.length; i++) {
                map._map.removeOverlay(me.overlays[i].overlay);
            }
        },
        initControl: function() {
            common.initDateTime('input[name="startDate"]', null, true, 'yyyy-MM-dd 00:00');
            common.initDateTime('input[name="endDate"]', null, true);
            this.event();
        },
        event: function() {
            var me = this;
            $('#main-content').off()
                // 清除overlay
                .on('click', '.js-clear-overlay', function() {
                    me.clearOverLay();
                })
                .on('click', '.js-search', function() {
                    me.getData();
                });
        },
        getData: function() {
            var me = this;
            var startDate = $('input[name="startDate"]').val();
            var endDate = $('input[name="endDate"]').val();
            if (!this.overlays.length) {
                common.toast('请在地图上进行区域画框!');
                return false;
            }
            if (common.checkTime(endDate, startDate)) {
                common.loading('show');
                var params = {
                    STime: startDate,
                    ETime: endDate
                };
                var len = this.overlays.length;
                var firstPoint = null,
                    secondPoint = null;
                if (len > 0 && len <= 2) {
                    firstPoint = this.overlays[0];
                    if (len == 2) {
                        secondPoint = this.overlays[1];
                    }
                    params = $.extend(params, {
                        RFMinLng: firstPoint.minLng,
                        RFMinLat: firstPoint.minLat,
                        RFMaxLng: firstPoint.maxLng,
                        RFMaxLat: firstPoint.maxLat
                    });
                    if (secondPoint) {
                        params = $.extend(params, {
                            RTMinLng: secondPoint.minLng,
                            RTMinLat: secondPoint.minLat,
                            RTMaxLng: secondPoint.maxLng,
                            RTMaxLat: secondPoint.maxLat
                        });
                    }
                } else {
                    common.toast('参数异常,请联系管理员!');
                    return false;
                }
                common.ajax(api.historyQuery, params, function(res) {
                    if (res && res.status === 'SUCCESS') {
                        var data = res.content;
                        $('#historyLocationList').empty().html(template.compile(tpls.list)({
                            data: data || []
                        }));
                    } else {
                        var msg = res.errorMsg || '系统出错，请联系管理员！';
                        common.toast(msg);
                    }
                    common.loading();
                });
            }
        }
    });

    exports.init = function(param) {
        new historyLocation().init(param);
    };
});