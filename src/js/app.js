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
                                // 获取用户配置权限，初始化菜单
                                common.getUserMenu(function(data) {
                                    if (data.length > 0) {
                                        require.async('./../tpl/menu/index', function(tpl) {
                                            $('#sidebar-mini').empty().html(template.compile(tpl)({ data: data }));
                                            if (href != 'authorize') {
                                                me.changeMenu(href);
                                            }
                                            me.setUserName();
                                        });
                                    } else {
                                        window.location.hash = '#authorize/index';
                                        return false;
                                    }
                                });
                            });
                        } else {
                            me.setUserName();
                            me.changeMenu(href);
                        }
                        // 清除监控
                        if (mod !== 'carMonitor') {
                            common.stopMonitorTimer();
                        }
                        // 清除历史位置查询参数
                        if (mod !== 'historyLocation' && mod !== 'carMonitor') {
                            common.removeLocationStorage('historyLocationParams');
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