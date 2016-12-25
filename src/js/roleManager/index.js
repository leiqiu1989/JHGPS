define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    var map = require('map');
    var validate = require('validate');

    require('lodash');
    require('zTree');
    require('excheck');
    require('exhide');
    // 模板
    var tpls = {
        carIndex: require('../../tpl/roleManager/index'),
        carList: require('../../tpl/roleManager/list'),
        editRole: require('../../tpl/roleManager/editRole')
    };

    function carList() {}
    $.extend(carList.prototype, {
        init: function(param) {
            // 初始化查询条件参数
            this.getParams(param);
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.carIndex)({ searchValue: this.searchParam }));
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
            common.initDateTime('input[name="start"]', 'Y-m-d H:i', false, 'yyyy-MM-dd h:m', true, false);
            common.initDateTime('input[name="end"]', 'Y-m-d H:i', false, 'yyyy-MM-dd h:m', true, false);
            $('#vehicleType').val(me.searchParam.OrderType);
        },
        // 获取查询条件
        getParams: function(param) {
            this.sortParam = {};
            var newParams = {
                OrderNum: common.getElValue('input[name="OrderNum"]'), //订单编号
                start: common.getElValue('input[name="start"]'),
                end: common.getElValue('input[name="end"]'),
                phone: common.getElValue('input[name="phone"]'),
                plateNo: common.getElValue('input[name="plateNo"]'),
                OrderType: common.getElValue('select[name="OrderType"]')
            };
            if (newParams.start) newParams.start = newParams.start;
            if (newParams.end) newParams.end = newParams.end;
            if(!param){
                newParams = {};
            }
            this.searchParam = common.getParams('carSearchParams', param, newParams, true);
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            //if (this.searchParam && !_.isEmpty(this.searchParam)) {
            param = $.extend({}, param, this.sortParam ? this.sortParam : {});
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('carSearchParams', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.orderManager.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    $('#carList').empty().html(template.compile(tpls.carList)({
                        data: data.Page || []
                    }));
                    common.page(data.TotalCount, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.pageNumber = currPage;
                        common.changeHash('#orderManager/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
                common.loading();
            });
            //}
        },
        exportCarList: function(el) {
            this.getParams();
            var st = common.getCookie('st');
            var sid = common.getCookie('sid');
            var src = api.carManager.exportCarList + '?sid=' + sid + '&st=' + st;
            $.each(this.searchParam, function(key, value) {
                src += '&' + key + '=' + value;
            });
            var downSrc = encodeURI(src);
            $(el).attr('href', downSrc);
        },
        event: function() {
            var me = this;

            // 查询-事件监听
            $('.panel-toolbar')
            
            .on('click', '.js_list_search', function() {
                me.getParams(true);
                common.changeHash('#orderManager/index/', me.searchParam);
            });
            // 事件监听
            $('#main-content').on('click', '.js_list_add', function() {
                    common.autoAdaptionDialog(template.compile(tpls.editRole)({data: null || {}}),{
                        title: '新增角色'
                    },function(_dialog){
                        me.initOrgTree(null,function(){
                            me.validate();
                            $('#frmaddCar .js_add_cancel').on('click',function(){
                                _dialog.close();
                            });
                        });
                    });
                })
                .on('click', '.js_list_edit', function() {
                    var tr = $(this).closest('tr');
                    var id = tr.data('truckid');

                    common.autoAdaptionDialog(template.compile(tpls.editRole)({data: null || {}}),{
                        title: '编辑角色'
                    },function(_dialog){
                        me.initOrgTree(id,function(){
                            me.initEditValue(id);
                            me.validate();
                            $('#frmaddCar .js_add_cancel').on('click',function(){
                                _dialog.close();
                            });
                        });
                    });
                })
                .on('click', '.js_list_import', function() {
                    common.changeHash('#carManager/import');
                })
                .on('click', '.js_list_export', function() {
                    me.exportCarList($(this));
                })
                //批量、单个删除角色
                .on('click', '.js_list_delete', function() {
                    var id = $(this).closest('tr').data('truckid');
                    var confirmText = '';
                    if (id) {
                        confirmText = '确定要删除角色吗？';
                    } else {
                        var chks = $('.datatable-content table > tbody input[name="checkItem"]:checked');
                        if (chks.size() < 1) {
                            common.toast('请选择要删除的角色！');
                            return false;
                        }
                        confirmText = '已选择&nbsp;<span class="red">' + chks.size() + '</span>&nbsp;个角色，是否对角色进行删除？';
                        var array = [];
                        $.each(chks, function(i, item) {
                            array.push($(item).closest('tr').data('truckid'));
                        });
                        id = array.join(',');
                    }
                    me.deleteRole(id, confirmText);
                })
                .on('click', 'input[name="checkAll"]', function() {
                    var isChecked = $(this).is(':checked');
                    if (isChecked) {
                        $('.datatable-content table > tbody input[name="checkItem"]').prop('checked', isChecked);
                    } else {
                        $('.datatable-content table > tbody input[name="checkItem"]').removeAttr('checked');
                    }
                }).on('click', 'input[name="checkItem"]', function() {
                    var chks = $('.datatable-content table > tbody input[name="checkItem"]:checked').size();
                    var totalChks = $('.datatable-content table > tbody input[name="checkItem"]').size();
                    if (chks == totalChks) {
                        $('.datatable-header table > thead input[name="checkAll"]').prop('checked', true);
                    } else {
                        $('.datatable-header table > thead input[name="checkAll"]').removeAttr('checked');
                    }
                });
        },
        //初始化树
        initOrgTree: function(id,callback){
            var me = this;
             
            //组织列表树设置
            var ztreeSetting = {
                check: {
                    enable: true,
                    chkStyle: "checkbox"
                },
                view: {
                    selectedMulti: false
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "Id",
                        pIdKey: "Pid",
                        rootPId: null
                    },
                    key: {
                        name: "Name",
                        children: "children",
                        checked: "IsCheck"
                    }
                },
                callback: {
                    onClick: function(event, treeId, treeNode) {
                        var treeObj = $.fn.zTree.getZTreeObj(treeId);
                        treeObj.checkNode(treeNode, !treeNode.checked, true);
                    }
                }
            };
            var $treeContainer = $("#vehicleTree");
            $treeContainer.html('正在请求数据...');

            common.ajax(api.vehicleList, {}, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var data = res.content || [];
                    if(!res.content||(res.content&&!res.content.length)){
                        $treeContainer.html('未查询到相关数据');
                        typeof callback === 'function' && callback();
                        return;
                    }
                    $.fn.zTree.init($treeContainer, ztreeSetting, data);
                    //展开节点
                    if(!id){
                        var treeObj = $.fn.zTree.getZTreeObj("vehicleTree");
                        treeObj.expandAll(true);
                    }
                    typeof callback === 'function' && callback();
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
            });
        },
        // 初始化表单
        initEditValue: function(id) {
            var me = this;
            var url = api.roleManage.roleInfo;

            //树上回显已经分配的资源
            var treeObj = $.fn.zTree.getZTreeObj("vehicleTree");
            
            if(treeObj==null) return;

            treeObj.expandAll(false); //默认收起全部节点
            treeObj.checkAllNodes(false);  //取消所有勾选的节点
            //发起请求
            me.ajaxPost(url,{id: id},function(res){
                var content = res.content,
                    nodess = treeObj.getNodes(),
                    resourceIdArr = content.resourceIds || [];
                //给表单赋值
                common.setFormData(me.$_container,content);
                //给权限树赋值回显
                if(nodess==null||(nodess!=null&&nodess.length==0)) return;
                    //根据该角色已有的权限进行相应节点的选中操作
                    for (var i = 0,len = nodess.length;i<len;i++) {
                        for(var j = 0,lenj = resourceIdArr.length;j<lenj;j++){
                            var getNodeByParam= treeObj.getNodeByParam("id",resourceIdArr[j], null);
                            if(getNodeByParam && getNodeByParam!=null){
                                treeObj.checkNode(getNodeByParam,true,false); 
                            }
                        }
                        treeObj.setChkDisabled(nodess[i], true,true,true);
                    };
                    treeObj.expandAll(true); //默认展开全部节点
            });
        },
        validate: function() {
            var me = this;
            validate('#frmaddCar', {
                subBtn: '.js_add_save',
                promptPos: 'inline',
                submit: function() {
                    me.submitForm();
                }
            });
        },
        submitForm: function() {
            var me = this;
            var url = api.carManager.update;
           
            var params = common.getFormData('#frmaddCar');
            var treeObj = $.fn.zTree.getZTreeObj("vehicleTree");
            var nodes = [];
            if(treeObj!=null){
                nodes = treeObj.getCheckedNodes(true);
            }
            var arr = [];
            for (var i = 0,len = nodes.length;i<len;i++) {
                arr.push(nodes[i].Id);
            };
            params.resourceIds = arr.toString();
            alert('pass');
            console.log(params);
            return;
            common.ajax(url, params, function(res) {
                if (res && res.status === 'SUCCESS') {
                    common.alert('数据操作成功', 'success', true, function() {
                        common.changeHash('#carManager/index');
                    });
                } else {
                    var msg = res.errorMsg ? res.errorMsg : '服务器问题，请稍后重试';
                    common.alert(msg, 'error');
                }
            });
        },
        //删除角色
        deleteRole: function(id, confirmText, callback) {
            var me = this;
            common.confirm(confirmText, function() {
                common.loading('show', '数据正在处理中...');
                common.ajax(api.carManager.delete, {
                    ArrVid: id
                }, function(res) {
                    if (res.status === 'SUCCESS') {
                        if (callback) {
                            callback();
                        } else {
                            me.getData();
                        }
                    } else {
                        var msg = res.errorMsg || '请求数据失败，请联系管理员！';
                        common.toast(msg);
                    }
                    common.loading();
                });
            });
        }
    });

    var _carObj = new carList();

    exports.init = function(param) {
        _carObj.init(param);
    };
});