define(function(require, exports, module) {
    'use strict';


    function map() {
        // 公共变量
        this._map = null;
        this.mouseMove_marker = null; //鼠标放在轨迹上显示的轨迹点
        this.mouseMoveClick_marker = null; //鼠标放在轨迹上显示的轨迹点点击
        this.stopPoints = []; //停留点（超过3分钟以上）
        this.runPoints = []; //非停留点（小于或等于3分钟）
    }

    map.prototype = {
        reset: function() {
            this.mouseMove_marker = null;
            this.mouseMoveClick_marker = null;
            this.stopPoints = [];
            this.runPoints = [];
        },
        init: function(el, defaultPoint, defaultZoom, callback) {
            var me = this;
            this._map = null;
            this._map = new BMap.Map(el);
            this._map.centerAndZoom('成都');
            if (defaultPoint && defaultZoom) {
                this._map.centerAndZoom(defaultPoint, defaultZoom);
            } else {
                var localCity = new BMap.LocalCity();
                //根据IP定位地图
                localCity.get(function(result) {
                    var cityName = result.name;
                    me._map.centerAndZoom(cityName);
                });
            }
            // 最大、最小缩放级别
            this._map.setMinZoom(6);
            this._map.setMaxZoom(18);
            //启用滚轮缩放
            this._map.enableScrollWheelZoom();
            // 添加地图平移控件
            this._map.addControl(new BMap.NavigationControl());
            // 添加缩略地图控件
            this._map.addControl(new BMap.OverviewMapControl({
                isOpen: true,
                anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                offset: new BMap.Size(10, 10)
            }));
            callback && callback();
        },
        // 设置中心点和zoom
        setCenterAndZoom: function(mapPoints) {
            var view = this._map.getViewport(eval(mapPoints));
            var mapZoom = view.zoom;
            var centerPoint = view.center;
            this._map.centerAndZoom(centerPoint, mapZoom);
        },
        // 统计点(未转化为地图点)
        summerPoint: function(data) {
            var me = this;
            $.each(data, function(index, item) {
                // 停留点（3分钟以上）
                if (item.stopTime > 180) {
                    me.stopPoints.push(item)
                } else {
                    me.runPoints.push(item);
                }
            });
        },
        // 添加报警
        addAlarm: function(alarmData) {
            for (var i = 0, l = alarmData.length; i < l; i++) {
                var alarm = alarmData[i];
                var marker = new BMap.Marker(new BMap.Point(alarm.longitude, alarm.latitude), {
                    icon: new BMap.Icon(window.DOMAIN + '/img/icon_stop.png', new BMap.Size(16, 16))
                });
                var label_position = {
                    offset: new BMap.Size(12, -30)
                }
                var label = new BMap.Label(
                    "<div class='mapCarItem'>" + alarm.alarmTypeName + "&nbsp;&nbsp;" + alarm.speed + "Km/h</div>" +
                    "<div class='mapCarItem'>" + alarm.beginTimeStr + "&nbsp;&nbsp;&nbsp;持续:" + alarm.keepTimeStr + "</div>", label_position
                );
                label.setStyle({
                    color: "#333",
                    fontSize: "12px",
                    padding: '5px',
                    fontFamily: "微软雅黑",
                });
                this._map.addOverlay(marker);
                marker.setLabel(label);
            }
        },
        // 生成地图points
        generateMapPoints: function(data) {
            var mapPoints = [];
            $.each(data, function(index, item) {
                var point = new BMap.Point(item.longitude, item.latitude);
                mapPoints.push(point);
            });
            return mapPoints;
        },
        // 添加折线
        addTrackLine: function(mapPoints, plateNumber) {
            var me = this;
            // 移除所有标注
            this._map.clearOverlays();
            var trackLine = new BMap.Polyline(mapPoints, {
                strokeColor: "blue",
                strokeWeight: 4,
                strokeOpacity: 0.7
            });
            this._map.addOverlay(trackLine);
            //绘制开始点
            var startMark = new BMap.Marker(mapPoints[0], {
                icon: new BMap.Icon(window.DOMAIN + "/img/icon_start.png", new BMap.Size(38, 45), {
                    imageOffset: new BMap.Size(0, 0)
                })
            });
            this._map.addOverlay(startMark);
            //绘制结束点
            var endMark = new BMap.Marker(mapPoints[mapPoints.length - 1], {
                icon: new BMap.Icon(window.DOMAIN + "/img/icon_end.png", new BMap.Size(38, 45), {
                    imageOffset: new BMap.Size(0, 0)
                })
            });
            this._map.addOverlay(endMark);

            /*停留点*/
            if (this.stopPoints.length > 0) {
                for (var i = 0; i < this.stopPoints.length; i++) {
                    me.markStopPoint(me.stopPoints[i], plateNumber);
                }
            }

            // 折线事件绑定
            trackLine.addEventListener('mousemove', function(e) {
                var lng = e.point.lng;
                var lat = e.point.lat;
                var lngArr = _.map(me.runPoints, function(point) {
                    return point.longitude;
                });
                var newLngArr = [];
                lngArr.map(function(longitude) {
                    newLngArr.push(Math.abs(longitude - lng));
                });
                var lngIndex = newLngArr.indexOf(Math.min.apply(null, newLngArr));
                me.addMarker(me.runPoints[lngIndex], plateNumber);
            });
            trackLine.addEventListener('mouseout', function(e) {
                me._map.removeOverlay(me.mouseMove_marker);
            });
        },
        // 鼠标悬浮，添加覆盖物
        addMarker: function(point, plateNumber) {
            var me = this;
            if (this.mouseMove_marker) {
                this._map.removeOverlay(this.mouseMove_marker);
            }
            var marker = new BMap.Marker(new BMap.Point(point.longitude, point.latitude), {
                icon: new BMap.Icon(window.DOMAIN + "/img/icon_pathway.png", new BMap.Size(16, 16))
            });
            //设置提示窗口Licenseplate
            var label_position = {
                position: new BMap.Point(point.longitude, point.latitude),
                offset: new BMap.Size(5, -55)
            }
            var label = new BMap.Label(
                "时间：" + point.gpsTime + "<br/>" + "速度：" + point.speed + "km/h", label_position
            );
            label.setStyle({
                color: "#333",
                fontSize: "12px",
                padding: "5px 10px",
                lineHeight: "20px",
                fontFamily: "微软雅黑",
                border: "1px solid #ccc"
            });
            marker.setLabel(label);
            this.mouseMove_marker = marker;
            marker.addEventListener('click', function() {
                //打新的轨迹点并打开弹出框
                me.clickMarker(point, plateNumber);
            });
            this._map.addOverlay(marker);
        },
        // 鼠标移动,点击弹出详情
        clickMarker: function(point, plateNumber) {
            var me = this;
            if (me.mouseMoveClick_marker) {
                this._map.removeOverlay(me.mouseMoveClick_marker);
            }
            this._map.removeOverlay(this.mouseMove_marker);
            var clickedMarker = new BMap.Marker(new BMap.Point(point.longitude, point.latitude), {
                icon: new BMap.Icon(window.DOMAIN + "/img/icon_pathway.png", new BMap.Size(16, 16))
            });
            var sContent = "<div class='mapCarItem'>车牌：" + plateNumber + "</div>" + "<div class='mapCarItem'>时间：" + point.gpsTime + "</div>" + "<div class='mapCarItem'>速度：" + point.speed + "km/h</div>" + "<div class='mapCarItem'><div class='pull-left'>位置：</div><div style='margin-left:36px;max-height: 37px;overflow: hidden;' title='" + point.location + "'>" + point.location + "</div></div>";
            var opts = {
                width: 300, // 信息窗口宽度
                height: 100, // 信息窗口高度
                title: "", // 信息窗口标题
                enableMessage: false //设置允许信息窗发送短息
            };
            var infoWindow = new BMap.InfoWindow(sContent, opts); // 创建信息窗口对象
            infoWindow.addEventListener("close", function() {
                me._map.removeOverlay(clickedMarker);
            });
            this._map.addOverlay(clickedMarker);
            clickedMarker.openInfoWindow(infoWindow);
        },
        // 添加停车点覆盖物
        markStopPoint: function(stopPoint, plateNumber) {
            var me = this;
            var markerStop = new BMap.Marker(new BMap.Point(stopPoint.longitude, stopPoint.latitude), {
                icon: new BMap.Icon(window.DOMAIN + "/img/icon_stop.png", new BMap.Size(16, 16), {
                    imageOffset: new BMap.Size(0, 0)
                })
            });
            var current_point = new BMap.Point(stopPoint.longitude, stopPoint.latitude);
            /*设置点击时候的提示窗口*/
            var stopPointInfo = '';
            stopPointInfo = "<div class='mapCarItem'>车牌号码：" + plateNumber + "</div>" +
                "<div class='mapCarItem'>开始时间：" + stopPoint.gpsTime + "</div>" +
                "<div class='mapCarItem'>结束时间：" + stopPoint.endGpsTime + "</div>" +
                "<div class='mapCarItem'>停留时长：" + stopPoint.duration + "</div>" +
                "<div class='mapCarItem'><div class='pull-left'>停留位置：</div><div style='margin-left:60px;' title='" + stopPoint.location + "'>" + stopPoint.location + "</div></div>";
            var opts = {
                width: 300, // 信息窗口宽度=
                height: 120, // 信息窗口高度
                title: "", // 信息窗口标题
                enableMessage: false //设置允许信息窗发送短息
            };
            var click_infoWindow = new BMap.InfoWindow(stopPointInfo, opts); // 创建信息窗口对象
            this._map.addOverlay(markerStop);
            markerStop.addEventListener("click", function() {
                this.openInfoWindow(click_infoWindow);
                me._map.panTo(current_point);
            });
        }
    }
    var _map = new map();

    module.exports = _map;

});