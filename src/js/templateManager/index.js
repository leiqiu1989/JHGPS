define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    // 模板
    var tpls = {
        templateIndex: require('../../tpl/templateManager/index'),
        templateList: require('../../tpl/templateManager/list')
    };

    function templateList() {}
    $.extend(templateList.prototype, {
        init: function(param) {
            // 初始化查询条件参数
            this.getParams(param);
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.templateIndex)({ searchValue: this.searchParam }));
            // 控件初始化
            this.initControl();
            // 获取数据
            this.getData();
        },
        // 初始化控件
        initControl: function() {
            this.event();
            // 赋值模板状态
            $('select[name="selStatus"]').val(this.searchParam.status || '');
        },
        // 获取查询条件
        getParams: function(param) {
            this.sortParam = {};
            var newParams = {
                condition: common.getElValue('input[name="condition"]'),
                status: common.getElValue('select[name="selStatus"] > option:selected')
            };
            this.searchParam = common.getParams('tplSearchParams', param, newParams, false);
        },
        getData: function() {
            var me = this;
            var param = $.extend({}, this.searchParam, this.sortParam ? this.sortParam : {});
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('tplSearchParams', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.tplManager.list, param, function(res) {
                if (res.status === 'OK') {
                    var data = res.content;
                    $('#templateList').empty().html(template.compile(tpls.templateList)({
                        data: data.result || []
                    }));
                    common.page(data.totalCount, param.pageSize, param.pageNumber, function(currPage) {
                        me.searchParam.pageNumber = currPage;
                        common.changeHash('#templateManager/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
                common.loading();
            });
        },
        // 启用or禁用
        changeTplStatus: function(ids, confirmText, status) {
            var me = this;
            common.confirm(confirmText, function() {
                common.loading('show', '数据正在处理中...');
                common.ajax(api.tplManager.enabledTpl, {
                    tempIds: ids,
                    enable: status
                }, function(res) {
                    if (res.status === 'OK') {
                        common.toast('数据操作成功', 'success');
                        $('.datatable-header table > thead input[name="checkAll"]').removeAttr('checked');
                        me.getData();
                    } else {
                        var msg = res.errorMsg || '系统出错，请联系管理员！';
                        common.toast(msg);
                    }
                    common.loading();
                });
            });
        },
        event: function() {
            var me = this;
            // 查询-事件监听
            $('.panel-toolbar').on('click', '.js_list_search', function() {
                me.getParams(true);
                common.changeHash('#templateManager/index/', me.searchParam);
            });
            // 事件监听
            $('#main-content')
                .on('click', '.js_list_addTpl', function() {
                    common.changeHash('#templateManager/select');
                })
                // 启用or禁用
                .on('click', '.js_list_changeStatus', function() {
                    var status = $(this).data('status');
                    var statusDesc = status == 1 ? '启用' : status == 2 ? '禁用' : '';
                    var chks = $('.datatable-content table > tbody input[name="checkItem"]:checked');
                    if (chks.size() < 1) {
                        common.toast('请选择要启用或禁用的模板！');
                        return false;
                    }
                    var confirmText = '已选择&nbsp;<span class="red">' + chks.size() + '</span>&nbsp;个模板，是否' + statusDesc + '？';
                    var array = [];
                    $.each(chks, function(i, item) {
                        array.push($(item).closest('tr').data('id'));
                    });
                    me.changeTplStatus(array.join(','), confirmText, status);
                })
                // 详情
                .on('click', '.js_list_detail', function() {
                    var tr = $(this).closest('tr');
                    var tplId = tr.data('id');
                    common.changeHash('#templateManager/detail/', { tplId: tplId });
                })
                .on('click', 'input[name="checkAll"]', function() {
                    var isChecked = $(this).is(':checked');
                    if (isChecked) {
                        $('.datatable-content table > tbody input[name="checkItem"]').prop('checked', isChecked);
                    } else {
                        $('.datatable-content table > tbody input[name="checkItem"]').removeAttr('checked');
                    }
                })
                .on('click', 'input[name="checkItem"]', function() {
                    var chks = $('.datatable-content table > tbody input[name="checkItem"]:checked').size();
                    var totalChks = $('.datatable-content table > tbody input[name="checkItem"]').size();
                    if (chks == totalChks) {
                        $('.datatable-header table > thead input[name="checkAll"]').prop('checked', true);
                    } else {
                        $('.datatable-header table > thead input[name="checkAll"]').removeAttr('checked');
                    }
                });
        }
    });

    exports.init = function(param) {
        new templateList().init(param);
    };
});