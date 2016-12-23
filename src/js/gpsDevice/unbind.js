define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    // 模板
    var tpls = {
        detail: require('../../tpl/gpsDevice/detail')
    };

    var GPSUnbind = function() {
        this.uniqueId = null;
        this.truckId = null;
        this.gpsStatus = null;
    };
    $.extend(GPSUnbind.prototype, {
        init: function(uniqueId, status) {
            this.uniqueId = uniqueId;
            this.gpsStatus = status || null;
            this.render();
        },
        render: function() {
            var me = this;
            common.loading('show');
            common.ajax(api.gpsDevice.detail, { uniqueId: this.uniqueId }, function(res) {
                if (res && res.status === "OK") {
                    var data = res.content;
                    data.unbind = true;
                    data.gpsStatus = me.gpsStatus;
                    me.truckId = data.truckId;
                    $('#main-content').empty().html(template.compile(tpls.detail)(data));
                    me.event();
                } else {
                    common.alert(res.errorMsg, 'fail', true);
                }
            }).always(function() {
                common.loading();
            });
        },
        event: function() {
            var me = this;
            $('#main-content').off()
                //返回
                .on('click', '.js_back', function() {
                    common.changeHash('#gpsDevice/index');
                })
                //解绑按钮
                .on('click', '.js_unbind', function() {
                    common.dialog('<textarea class="form-control" rows="10" name="reason"></textarea>', {
                        title: '解绑理由',
                        callback: function() {
                            var reason = $.trim($('textarea[name="reason"]').val());
                            if (!reason) {
                                common.toast('理由不能为空!');
                                return false;
                            }
                            me.unbindGPS(reason);
                        }
                    });
                    setTimeout(function() {
                        $('textarea[name="reason"]').focus();
                    }, 500);

                });
        },
        unbindGPS: function(reason) {
            var param = { uniqueId: this.uniqueId, remark: reason };
            param.truckId = this.truckId ? this.truckId : null;
            common.ajax(api.gpsDevice.unbind, param, function(res) {
                if (res && res.status == 'OK') {
                    common.alert('解绑成功', '', true, function() {
                        common.changeHash('#gpsDevice/index');
                    });
                } else {
                    common.alert(res.errorMsg, 'fail', true);
                }
            });
        }
    });

    exports.init = function(param) {
        new GPSUnbind().init(param.uniqueId, param.status);
    };
});