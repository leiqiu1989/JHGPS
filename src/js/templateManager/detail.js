define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    // 模板
    var tpls = {
        detailTpl: require('../../tpl/templateManager/detail')
    };

    var detailTpl = function() {};
    $.extend(detailTpl.prototype, {
        init: function(tplId) {
            this.detail(tplId);
            this.event();
        },
        detail: function(tplId) {
            if (tplId) {
                common.loading('show');
                common.ajax(api.tplManager.detail, { id: tplId }, function(res) {
                    if (res.status === 'OK') {
                        var data = res.content;
                        $('#main-content').empty().html(template.compile(tpls.detailTpl)({ data: data }));
                    } else {
                        var msg = res.errorMsg || '系统出错，请联系管理员！';
                        common.toast(msg);
                    }
                    common.loading();
                });
            } else {
                common.toast('参数异常，请联系管理员！');
                return false;
            }

        },
        event: function() {
            var me = this;
            $('#main-content').off().on('click', '.js_tpl_back', function() {
                common.changeHash('#templateManager/index');
            });
        }
    });

    exports.init = function(param) {
        new detailTpl().init(param.tplId);
    };
});