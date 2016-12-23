define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    // 模板
    var tpls = {
        editTpl: require('../../tpl/templateManager/editTpl')
    };

    var editTpl = function() {};
    $.extend(editTpl.prototype, {
        init: function() {
            var me = this;
            $('#main-content').empty().html(template.compile(tpls.editTpl)());
            this.initEditor();
            this.event();
        },
        initEditor: function() {
            UE.delEditor('editor');
            UE.getEditor('editor');
            var times = setInterval(function() {
                var iframe = window.frames[1];
                if (iframe && iframe.document) {
                    clearInterval(times);
                    var iframeBody = $(iframe.document).find('body');
                    var iframeBodyHeight = $(iframeBody).height() - 26;
                    iframeBody.css({ 'overflow-y': 'auto', 'height': iframeBodyHeight + 'px', 'max-height': iframeBodyHeight + 'px' });
                    $('#editor > div:eq(0)').css('z-index', 1);
                    $('#edui1_iframeholder').css('max-height', $('#edui1_iframeholder').height());
                }
            }, 500);
        },
        event: function() {
            var me = this;
            $('#main-content').off().on('click', '.js_tpl_back', function() {
                common.changeHash('#templateManager/select');
            });
        }
    });

    exports.init = function(param) {
        new editTpl().init();
    };
});