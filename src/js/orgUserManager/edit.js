define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    var validate = require('validate');

    // 模板
    var tpls = {
        add: require('../../tpl/orgUserManager/add'),
        userinfo: require('../../tpl/orgUserManager/userInfo')
    };

    var orgUserAdd = function() {
        this.isEdit = false;
        this.orgId = null;
        this.roles = null;
    };

    $.extend(orgUserAdd.prototype, {
        init: function(id) {
            this.isEdit = !!id;
            this.orgId = id || null;
            this.initPage();
        },
        bindEditValue: function(data) {
            // 数据转换
            data.OnlyOrgNo = data.ParentOrgNo;
            $('#main-content').empty().html(template.compile(tpls.add)({ title: '编辑组织用户', data: data, isEdit: this.isEdit }));
            // checkbox单独处理
            //$('input[name="needExamined"]').attr('checked', data.needExamined == 1 ? true : false);
        },
        initEditValue: function() {
            var me = this;
            common.ajax(api.orgUserManager.detail, {
                OrgId: me.orgId
            }, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    //me.bindEditValue(data);
                }
            });
        },
        initEditControl: function(data) {
            var me = this;
            $('#plate_Number,#plateNumber_Color').attr({
                'disabled': true
            });
            $('#plateNumber_Color').attr('data-nosubmit', true);
            $('.js_add_control').remove();
            $('.js_edit_control').removeClass('hidden');
            // 获取当前组织机构下的gps设备编号列表并且把当前gps设备编号填充进去
            this.getGPSNumerList(data.uniqueId, function() {
                if (data.uniqueId) {
                    var gpsHtml = '<option value="' + data.uniqueId + '" data-name="' + data.gpsBrand + '" data-endtime="' + data.gpsEndTime + '" data-simcard="' + data.simmcard + '">' + data.uniqueId + '</option>';
                    $('select[name="uniqueId"]').append(gpsHtml).val(data.uniqueId);
                }
            });
            // 编辑根据返回的车辆类型和品牌自动填充
            var timer = setInterval(function() {
                if (me.truckTypeIsLoaded && me.vehicleBrandIsLoaded) {
                    clearInterval(timer);
                    // 判断是否存在，不在则添加
                    if ($('#truck_Type > option:contains("' + data.truckType + '")').size() < 1) {
                        var truckTypeHtml = '<option value="' + data.truckType + '" data-code="">' + data.truckType + '</option>';
                        $('#truck_Type').append(truckTypeHtml);
                        $('#truck_Type').val(data.truckType);
                    }
                    if ($('#vehicle_Brand > option:contains("' + data.vehicleBrand + '")').size() < 1) {
                        var vehicleBrandHtml = '<option value="' + data.vehicleBrand + '">' + data.vehicleBrand + '</option>';
                        $('#vehicle_Brand').append(vehicleBrandHtml);
                        $('#vehicle_Brand').val(data.vehicleBrand);
                    }
                }
            }, 500);
        },
        initPage: function() {
            $('#main-content').empty().html(template.compile(tpls.add)({ title: '新增组织用户', data: {} }));
            // 编辑
            if (this.isEdit) {
                this.initEditValue();
            }
            this.initSelect($('select[name="RoleId"]'));
            this.validate();
            this.event();
        },
        initSelect: function(el) {
            //获取角色列表
            this.getSelect({
                url: api.orgUserManager.roles,
                obj: el,
                key: ['RoleId', 'RoleName']
            });
        },
        getSelect: function(opt) {
            var me = this;
            var obj = {
                url: opt.url,
                params: opt.params || {},
                errorMsg: opt.errorMsg || '请求错误，未请求到数据',
                key: opt.key || ['id', 'name'],
                $objs: opt.obj
            };
            me.truckTypeIsLoaded = false;
            common.ajax(obj.url, obj.params, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    me.roles = data;
                    var html = '';
                    if (data && data.length > 0) {
                        $.each(data, function(i, item) {
                            html += '<option value="' + item[obj.key[0]] + '">' + item[obj.key[1]] + '</option>';
                        });
                    }
                    me.truckTypeIsLoaded = true;
                    obj.$objs.html(html);
                } else {
                    var msg = res.errorMsg || obj.errorMsg;
                    common.toast(msg);
                }
            });
        },
        validate: function() {
            var me = this;
            validate('#frmOrgUser', {
                subBtn: '.js_add_save',
                promptPos: 'inline',
                submit: function() {
                    me.submitForm();
                },
                reg: {
                    'pwd': /^[a-zA-Z0-9]{8,16}$/
                },
                errorMsg: {
                    'pwd': '密码为字母和数字,长度(8-16)'
                }
            });
        },
        submitForm: function() {
            var me = this;
            var users = [];
            var params = common.getFormData('#frmOrgInfo');
            var rows = $('#frmUserList > div.row');
            for (var i = 0; i < rows.size(); i++) {
                var el = rows[i];
                var user = common.getFormData(el);
                users.push(user);
            }
            params.Users = users;
            debugger;
            var url = this.isEdit ? api.orgUserManager.update : api.orgUserManager.save;
            if (this.isEdit) {
                //params.Vid = me.truckId;
            }
            common.ajax(url, params, function(res) {
                debugger;
                if (res && res.status === 'SUCCESS') {
                    common.alert('数据操作成功', 'success', true, function() {
                        common.changeHash('#carManager/index');
                    });
                } else {
                    var msg = res.errorMsg ? res.errorMsg : '服务器问题，请稍后重试';
                    common.alert(msg, 'error');
                }
            }, null, {
                data: JSON.stringify(params)
            });
        },
        event: function() {
            var me = this;
            // 所属机构事件监听
            common.listenOrganization();
            // 事件监听
            $('#main-content').on('click', '.js_add_back', function() {
                    common.changeHash('#orgUserManager/index');
                })
                // 新增用户
                .on('click', '.js-addUser', function() {
                    if ($('#frmUserList div.row').size() < 5) {
                        $('#frmUserList').append(template.compile(tpls.userinfo)({ roles: me.roles }));
                    } else {
                        common.toast('最多只能绑定5个用户!');
                        return false;
                    }
                })
                // 删除用户
                .on('click', '.js_delete', function() {
                    var row = $(this).closest('div.row');
                    row.remove();
                });
        }
    });

    exports.init = function(param) {
        new orgUserAdd().init(param.id);
    };
});