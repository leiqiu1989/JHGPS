define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    // 模板
    var tpls = {
        selectTpl: require('../../tpl/templateManager/selectTpl')
    };

    var selectTpl = function() {
        this.tplId = null;
    };
    $.extend(selectTpl.prototype, {
        init: function() {
            var me = this;
            this.getTplList();
            this.event();
        },
        // 列表
        getTplList: function() {
            var me = this;
            common.loading('show');
            common.ajax(api.tplManager.basicTplList, {}, function(res) {
                if (res.status === 'OK') {
                    var data = res.content;
                    $('#main-content').empty().html(template.compile(tpls.selectTpl)({
                        list: data || []
                    }));
                    // 默认选择第一个
                    if (data.length > 0) {
                        me.tplId = data[0].id;
                        me.detail(me.tplId);
                        $('input[name="radioTpl"]:eq(0)').attr('checked', true);
                    }
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
                common.loading();
            });
        },
        // 详情
        detail: function(tplId) {
            common.loading('show');
            common.ajax(api.tplManager.detail, { id: tplId }, function(res) {
                if (res.status === 'OK') {
                    var data = res.content;
                    $('#tplDetail').empty().html(data.content || '');
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
                common.loading();
            });
        },
        event: function() {
            var me = this;
            $('#main-content').off().on('click', '.js_tpl_back', function() {
                common.changeHash('#templateManager/index');
            }).on('click', 'input[name="radioTpl"]', function() {
                var tplId = $(this).val();
                me.detail(tplId);
            }).on('click', '.js_tpl_next', function() {
                if ($('input[name="radioTpl"]:checked').size() < 1) {
                    common.toast('请选择一个模板进行操作！');
                    return false;
                }
                common.changeHash('#templateManager/edit');
            });
        }
    });

    exports.init = function(param) {
        new selectTpl().init();
    };
});