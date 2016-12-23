define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    var validate = require('validate');
    require('lodash');
    // 模板
    var tpls = {
        userIndex: require('../../tpl/userManager/index'),
        userList: require('../../tpl/userManager/list'),
        addUser: require('../../tpl/userManager/add')
    };

    function userList() {}
    $.extend(userList.prototype, {
        init: function(param) {
            // 初始化查询条件参数
            this.getParams(param);
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.userIndex)({ searchValue: this.searchParam }));
            // 控件初始化
            this.initControl();
            // 获取数据
            this.getData();
        },
        // 初始化控件
        initControl: function() {
            var me = this;
            this.event();
            common.tableSort(function(sortParam) {
                me.sortParam = sortParam;
                me.getData();
            });
        },
        // 获取查询条件
        getParams: function(param) {
            this.sortParam = {};
            var newParams = {
                username: common.getElValue('input[name="username"]'),
                name: common.getElValue('input[name="name"]')
            };
            this.searchParam = common.getParams('userSearchParams', param, newParams, false);
        },
        getData: function() {
            var me = this;
            var param = $.extend({}, this.searchParam, this.sortParam ? this.sortParam : {});
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('userSearchParams', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.userManager.list, param, function(res) {
                if (res.status === 'OK') {
                    var data = res.content;
                    $('#userList').empty().html(template.compile(tpls.userList)({
                        data: data.result || []
                    }));
                    common.page(data.totalCount, param.pageSize, param.pageNumber, function(currPage) {
                        me.searchParam.pageNumber = currPage;
                        common.changeHash('#userManager/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
                common.loading();
            });
        },
        // 停用或启用
        changeStatus: function(id, url, confirmText) {
            var me = this;
            common.confirm(confirmText, function() {
                common.loading('show', '数据正在处理中...');
                common.ajax(url, {
                    id: id
                }, function(res) {
                    if (res.status === 'OK') {
                        me.getData();
                    } else {
                        var msg = res.errorMsg || '系统出错，请联系管理员！';
                        common.toast(msg);
                    }
                    common.loading();
                });
            });
        },
        // 新增用户
        addUser: function() {
            var me = this;
            common.autoAdaptionDialog(tpls.addUser, {
                title: '新增用户'
            }, function(_dialog) {
                var result = false;
                $('input[name="username"]').focus();
                $('#btnCancel').on('click', function() {
                    _dialog.close();
                });
                $('#btnSearchUser').on('click', function() {
                    var username = $.trim($('#frmUserAdd input[name="username"]').val());
                    if (username && /^[0-9a-zA-Z]*$/.test(username)) {
                        common.ajax(api.userManager.checkUserName, { username: username }, function(res) {
                            if (res.status == 'OK') {
                                var data = res.content;
                                if (data) {
                                    $('#frmUserAdd #employeeName').text(data.name || '');
                                    $('#frmUserAdd #employeeMobile').text(data.mobile || '');
                                    result = true;
                                } else {
                                    common.toast('未找到相应员工!');
                                    return false;
                                }
                            } else {
                                common.toast(res.errorMsg);
                                return false;
                            }
                        });
                    } else {
                        common.toast('只能输入字母和数字!');
                        return false;
                    }
                });
                validate('#frmUserAdd', {
                    subBtn: '#btnOK',
                    promptPos: 'inline',
                    submit: function() {
                        if (result) {
                            var username = $.trim($('#frmUserAdd input[name="username"]').val());
                            var name = $('#frmUserAdd #employeeName').text();
                            var mobile = $('#frmUserAdd #employeeMobile').text();
                            common.ajax(api.userManager.add, { username: username, name: name, mobile: mobile }, function(res) {
                                if (res.status == 'OK') {
                                    common.alert('数据操作成功', '', true, function() {
                                        common.changeHash('#userManager/index');
                                    });
                                } else {
                                    common.alert(res.errorMsg, 'fail', true);
                                }
                            });
                            _dialog.close();
                        } else {
                            common.toast('请先查询员工工号!');
                            return false;
                        }
                    },
                    reg: {
                        'letternum': /^[0-9a-zA-Z]*$/
                    },
                    errorMsg: {
                        'letternum': '只能输入字母和数字'
                    }
                });
            });
        },
        event: function() {
            var me = this;
            // 查询-事件监听
            $('.panel-toolbar').on('click', '.js_list_search', function() {
                me.getParams(true);
                common.changeHash('#userManager/index/', me.searchParam);
            });
            // 事件监听
            $('#main-content').on('click', '.js_list_add', function() {
                me.addUser();
            }).on('click', '.js_changStatus', function() {
                var tr = $(this).closest('tr');
                var id = tr.data('id');
                var status = tr.data('status');
                var confirmText, url;
                if (status == 1) {
                    confirmText = '确定要停用该用户吗？';
                    url = api.userManager.stop;
                } else {
                    confirmText = '确定要启用该用户吗？';
                    url = api.userManager.active;
                }
                me.changeStatus(id, url, confirmText);
            });
        }
    });

    exports.init = function(param) {
        new userList().init(param);
    };
});