define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var validate = require('validate');
    var common = require('common');
    var api = require('api');
    // 模板
    var tpls = {
        add: require('../../tpl/gpsDevice/add')
    };

    var GPSAdd = function() {
        this.isEdit = null;
        this.gpsStatus = null;
    };

    $.extend(GPSAdd.prototype, {
        init: function(uniqueId, status) {
            var me = this;
            this.isEdit = !!uniqueId;
            this.gpsStatus = status || null;
            // 初始化模板
            this.render(uniqueId, function() {
                // 初始化控件
                me.initControl();
                // 事件绑定
                me.event();
                // 验证
                me.validate();
            });
        },
        initControl: function() {
            common.initDateTime('#_outStockTime', 'Y-m-d', false, false, false, new Date());
        },
        render: function(uniqueId, callback) {
            var me = this;
            var title = this.isEdit ? '编辑GPS设备' : '新增GPS设备';
            if (this.isEdit) {
                common.loading('show');
                common.ajax(api.gpsDevice.detail, { uniqueId: uniqueId }, function(res) {
                    if (res && res.status === "OK") {
                        var data = res.content;
                        if (!data) {
                            common.toast('获取数据失败,请联系管理员!');
                            return false;
                        }
                        data.title = title;
                        data.gpsStatus = parseInt(me.gpsStatus);
                        data.isEdit = true;
                        $('#main-content').empty().html(template.compile(tpls.add)(data));
                        common.setElValue('#_name', data.name);
                        common.initDateTime('#_salesTime', 'Y-m-d', false, false, false, new Date());
                        common.initDateTime('#_serviceEndTime', 'Y-m-d', false, false, new Date(), false);
                        if (callback) callback();
                    }
                }).always(function() {
                    common.loading();
                });
            } else {
                var defaultValue = {
                    id: '',
                    title: title,
                    uniqueId: '',
                    simcard: '',
                    name: '',
                    outStockTime: '',
                    isEdit: false,
                    gpsStatus: null
                };
                $('#main-content').empty().html(template.compile(tpls.add)(defaultValue));
                if (callback) callback();
            }
        },
        validate: function() {
            var me = this;
            validate('#frmAddDevice', {
                subBtn: 'a.js_save',
                promptPos: 'inline',
                submit: function() {
                    me.submit();
                }
            });
        },
        event: function() {
            var me = this;
            $('#main-content').off()
                //返回
                .on('click', '.js_back,.js_cancel', function() {
                    common.changeHash('#gpsDevice/index');
                });
        },
        submit: function() {
            var param = common.getFormData('#frmAddDevice');
            var url = this.isEdit ? api.gpsDevice.updateGps : api.gpsDevice.addgps;
            common.ajax(url, param, function(data) {
                if (data.status == 'OK') {
                    common.alert('数据操作成功', '', true, function() {
                        common.changeHash('#gpsDevice/index');
                    });
                } else {
                    common.alert(data.errorMsg, 'fail', true);
                }
            });
        }
    });

    exports.init = function(param) {
        new GPSAdd().init(param.uniqueId, param.status);
    };
});