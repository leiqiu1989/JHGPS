define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var validate = require('validate');
    var common = require('common');
    var api = require('api');
    var map = require('map');
    require('draw');

    // 模板
    var tpls = {
        index: require('../../tpl/historyLocation/index'),
        list: require('../../tpl/historyLocation/list')
    };

    var historyLocation = function() {
        this.initMapTime = null;
        this.drawManager = null;
    };
    $.extend(historyLocation.prototype, {
        init: function(param) {
            var me = this;
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.index)());
            // 控件初始化
            this.initControl();
            // 地图初始化
            map.init('historyMap');
            // 移除鹰眼
            map.removeOverView();

            $('#historyLocationList').empty().html(template.compile(tpls.list)());

            this.initMapTime = setInterval(function() {
                if (map._map.getCenter()) {
                    clearInterval(me.initMapTime);
                    me.drawManagerRectangle();
                }
            }, 1000);
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
                me.overlaycomplete();
            });
        },
        overlaycomplete: function(e) {
            this.drawManager.close();
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
                End: common.getElValue('input[name="End"]')
            };
            this.searchParam = common.getParams('complaintManagerParams', param, newParams);
            if (!this.searchParam.Start) this.searchParam.Start = new Date().format('yyyy-MM-dd 00:00');
            if (!this.searchParam.End) this.searchParam.End = new Date().format('yyyy-MM-dd h:m');
        },
        initControl: function() {
            common.initDateTime('input[name="Start"]', null, false, 'yyyy-MM-dd 00:00');
            common.initDateTime('input[name="End"]', null, false);
            this.event();
        },
        event: function() {
            var me = this;
            $('#main-content').off()
                // 绘制1
                .on('click', '.js-mark-first', function() {

                });
        },
        getData: function() {
            var me = this;
            var param = $.extend({}, this.searchParam, this.sortParam ? this.sortParam : {});
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('complaintManagerParams', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.complaintManager.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    $('#complaintList').empty().html(template.compile(tpls.list)({
                        data: data.Page || []
                    }));
                    me.totalCount = data.totalCount;
                    common.page(data.TotalCount, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.PageIndex = currPage;
                        common.changeHash('#complaintManager/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
                common.loading();
            });
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
        new historyLocation().init(param);
    };
});