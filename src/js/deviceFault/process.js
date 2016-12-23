define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    var validate = require('validate');

    // 模板
    var tpls = {
        process: require('../../tpl/deviceFault/process')
    };

    var process = function() {
        this.id = null;
        this.isProcess = null;
    };

    $.extend(process.prototype, {
        init: function(id, isProcess) {
            this.id = id;
            this.isProcess = isProcess === 'true';
            this.render();
        },
        render: function() {
            var me = this;
            var title = this.isProcess ? '故障处理' : '故障信息查看';
            if (this.id) {
                common.ajax(api.deviceFault.detail, { id: this.id }, function(res) {
                    if (res && res.status === 'OK') {
                        var data = res.content;
                        $('#main-content').empty().html(template.compile(tpls.process)({ title: title, isProcess: me.isProcess, data: data }));
                        me.event();
                        me.validate();
                        if (me.isProcess) {
                            $('select[name="operateWay"]').val(data.operateWay);
                            $('textarea[name="operateDesc"]').val(data.operateDesc);
                            $('select[name="progress"]').val(data.progress);
                        }
                    } else {
                        var msg = res.errorMsg ? res.errorMsg : '服务器问题，请稍后重试';
                        common.toast(msg);
                        common.changeHash('#deviceFault/index');
                    }
                });
            }
        },
        validate: function() {
            var me = this;
            validate('#frmProcessFault', {
                subBtn: '.js_save',
                promptPos: 'inline',
                submit: function() {
                    me.ProcessDeviceFault();
                }
            });
        },
        ProcessDeviceFault: function() {
            var me = this;
            var url = api.deviceFault.processDeviceFault;
            var params = common.getFormData('#frmProcessFault');
            params.id = this.id;
            common.ajax(url, params, function(res) {
                if (res && res.status === 'OK') {
                    common.alert('故障处理成功', 'success', true, function() {
                        common.changeHash('#deviceFault/index');
                    });
                } else {
                    var msg = res.errorMsg ? res.errorMsg : '服务器问题，请稍后重试';
                    common.alert(msg, 'error');
                }
            });
        },
        event: function() {
            var me = this;
            $('#main-content').on('click', '.js_back', function() {
                common.changeHash('#deviceFault/index');
            });
        }
    });

    exports.init = function(param) {
        new process().init(param.id, param.isProcess);
    };
});