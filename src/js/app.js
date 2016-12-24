define(function(require, exports, module) {
    var router = require('router');
    var docEvent = require('docEvent');
    var common = require('common');

    var app = {
        setUserName: function() {
            // 显示当前登录名
            $('.ja_userName').text(common.getCookie('username'));
        },
        changeMenu: function(href) {
            // 选中当前菜单项
            var currTarget = $('a[href="#' + href + '"');
            if (currTarget.size() > 0) {
                var li = $(currTarget).parent();
                var menuLi = $(li).parents('li');
                $('ul.submenu > li').removeClass('active');
                $(li).addClass('active');
                if (!menuLi.hasClass('active')) {
                    menuLi.siblings().removeClass('active');
                    menuLi.addClass('active');
                }
            }
        },
        _init: function() {
            var me = this;
            router.init({
                beforeLoad: function(mod, href) {
                    //登录页和其他页面的切换
                    if (mod !== 'login') {
                        var username = common.getCookie('username') || '游客';
                        if (!username) {
                            common.clearData();
                            window.location.hash = '#login/login';
                            return false;
                        }
                        if ($('#sidebar-mini > ul.nav-list').length < 1) {
                            require.async('./../tpl/index/index', function(tpl) {
                                $('#contentBody').empty().html(template.compile(tpl)());
                                me.setUserName();
                                me.changeMenu(href);
                            });
                        } else {
                            me.setUserName();
                            me.changeMenu(href);
                        }
                    }
                    return true;
                }
            }).run();
            // 监听document事件
            this._docEvent();
        },
        _docEvent: function() {
            docEvent.init();
        }
    };
    module.exports = app;
});