define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');

    function docEvent() {}
    $.extend(docEvent.prototype, {
        init: function() {
            // 全局监听document事件
            $(document).on('click', function(e) {
                var target = $(e.target);
                if (target.closest('ul.ul-select').size() < 1) {
                    $('ul.ul-select').addClass('hidden');
                }
            }).on('click', '.js_logout', function() {
                common.clearData();
                window.location.hash = "#login/login";
            });
        }
    });
    exports.init = function() {
        new docEvent().init();
    };
});