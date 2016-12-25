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
        carIndex: require('../../tpl/seatsManager/index'),
        carList: require('../../tpl/seatsManager/list'),
        editSeats: require('../../tpl/seatsManager/editSeats')
    };

    function seatsList() {}
    $.extend(seatsList.prototype, {
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
        event: function() {
            var me = this;
            // 事件监听
            $('#main-content').on('click', '.js_list_add', function() {
                    common.changeHash('#carManager/edit');
                })
                //编辑
                .on('click', '.js_list_edit', function() {
                    var tr = $(this).closest('tr');
                    var truckId = tr.data('truckid');

                    common.autoAdaptionDialog(template.compile(tpls.editSeats)({data: null || {}}),{
                        title: '编辑座席'
                    },function(_dialog){
                        me.initOrgTree(function(){
                            me.initEditValue();
                            me.validate();
                            $('#frmaddCar .js_add_cancel').on('click',function(){
                                _dialog.close();
                            });
                        });
                    });
                })
                //停用、启用
                .on('click', '.js_list_setStatus', function() {
                    var tr = $(this).closest('tr');
                    var id = tr.data('truckid');
                    var status = tr.data('status') == 1 ? '停用' : '启用';

                    common.confirm('确定' + status + '此座席信息？', function() {
                        me._opStatus(id, status);
                    });
                });
        },
        // 初始化表单
        initEditValue: function() {
            var me = this;
            var url = api.roleManage.roleInfo;

            //树上回显已经分配的资源
            var treeObj = $.fn.zTree.getZTreeObj("vehicleTree");
            
            if(treeObj==null) return;

            treeObj.expandAll(false); //默认收起全部节点
            treeObj.checkAllNodes(false);  //取消所有勾选的节点
            //发起请求
            me.ajaxPost(url,{id: me.para.roleId},function(res){
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
        //初始化树
        initOrgTree: function(callback){
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
            common.ajax(api.vehicleList, {}, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var data = res.content || [];
                    $.fn.zTree.init($("#vehicleTree"), ztreeSetting, data);
                    // //展开节点
                    // var treeObj = $.fn.zTree.getZTreeObj("vehicleTree");
                    // treeObj.expandAll(true);
                    typeof callback === 'function' && callback();
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
            });
        },
        validate: function() {
            var me = this;
            validate('#frmaddCar', {
                subBtn: '.js_add_save',
                promptPos: 'inline',
                submit: function() {
                        me.submitForm();
                    },
                    reg: {
                        'ipaddress':  /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/
                    },
                    errorMsg: {
                        'ipaddress': '请输入正确的ip地址'
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
         //停用、启用坐席信息
        _opStatus: function(ids, status) {
            var me = this,
                url = api.routeManage.invalid; //批量停用 //SERVER + 'web/batch-invalid-plan';
            if (status == '启用') { //启用
                url = api.routeManage.recover; //批量启用
            }
            if (ids instanceof Array) {
                ids = ids.toString();
            }
            var param = {
                ids: ids
            };
            common.post(url, {
                lineIds: ids
            }, function(data) {
                if (data.status == 'SUCCESS') {
                    common.toast('成功' + status + '座席信息', 'success');
                    common.changeHash('#seatsManager/index');
                } else {
                    common.toast(data.errorMsg);
                }
            });
        }
    });

    var _carObj = new seatsList();

    exports.init = function(param) {
        _carObj.init(param);
    };
});