define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    // 模板
    var tpls = {
        detail: require('../../tpl/gpsDevice/detail')
    };

    function GPSDetail() {}

    $.extend(GPSDetail.prototype, {
        init: function(uniqueId, saleStatus) {
            this.render(uniqueId, saleStatus);
            this.event();
        },
        render: function(uniqueId, saleStatus) {
            common.loading('show');
            common.ajax(api.gpsDevice.detail, { uniqueId: uniqueId }, function(res) {
                if (res && res.status === "OK") {
                    var data = res.content;
                    data.saleStatus = parseInt(saleStatus);
                    $('#main-content').empty().html(template.compile(tpls.detail)(data));
                }
            }).always(function() {
                common.loading();
            });
        },
        event: function() {
            var me = this;
            $('#main-content').off()
                .on('click', '.js_back', function() {
                    common.changeHash('#gpsDevice/index');
                })
                .on('click', 'a[data-toggle="tab"]', function() {
                    var _li = $(this).parent();
                    $(_li).addClass('active');
                    $(_li).siblings().removeClass('active');
                    var _id = $(_li).children('a').attr('navId');
                    $(_id).addClass('active');
                    $(_id).siblings().removeClass('active');
                });
        }
    });

    exports.init = function(param) {
        new GPSDetail().init(param.uniqueId, param.saleStatus);
    };
});