define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var validate = require('validate');
    var common = require('common');
    var api = require('api');

    // 模板
    var tpls = {
        gpsIndex: require('../../tpl/gpsDevice/list'),
        gpsList: require('../../tpl/gpsDevice/table')
    };

    var GPSList = function() {
        this.totalCount = 0;
    };
    $.extend(GPSList.prototype, {
        init: function(param) {
            // 获取查询条件
            this.getParams(param);
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.gpsIndex)({ searchValue: this.searchParam }));
            // 控件初始化
            this.initControl();
            // 获取数据
            this.getData();
        },
        // 获取查询条件
        getParams: function(param) {
            this.sortParam = {};
            this.searchParam = common.getParams('gpsSearchParams', param, {
                orgId: common.getElValue(':hidden[name="orgId"]'), //部门id
                orgName: common.getElValue('input[name="orgName"]'), //部门名称
                plateNumber: common.getElValue('input[name="plateNumber"]'), //车牌
                uniqueId: common.getElValue('input[name="uniqueId"]') //设备编号
            });
            //gpsEndTimeBegin: common.getElValue('#startDate'), //到期时间开始
            //gpsEndTimeEnd: common.getElValue('#endDate'), //到期时间结束
            //simcard: common.getElValue('input[name="simcard"]'), //simcard
            //status: common.getElValue('select[name="status"] > option:selected'), //是否已售(1-已售，0-未售)
            //if (param.beginTime) param.beginTime = param.beginTime + ' 00:00:00';
            //if (param.endTime) param.endTime = param.endTime + ' 00:00:00';
        },
        initControl: function() {
            this.event();
            //common.initDateTime('#startDate', 'Y-m-d', null, false);
            //common.initDateTime('#endDate', 'Y-m-d', null, false);
        },
        event: function() {
            var me = this;
            // 所属机构事件监听
            common.listenOrganization();

            /*************顶部工具栏*********/
            $('.panel-toolbar').off()
                //查询
                .on('click', '.js_search', function() {
                    me.getParams(true);
                    common.changeHash('#gpsDevice/index/', me.searchParam);
                })
                //新增
                .on('click', '.js_add', function() {
                    common.changeHash('#gpsDevice/edit');
                })
                //售卖
                .on('click', '.js_sell', function() {
                    var uniqueids = me.getcheckedIds();
                    if (!uniqueids.length) {
                        common.toast('请先查询并勾选在库设备!');
                        return false;
                    }
                    common.changeHash('#gpsDevice/sell/', { uniqueids: uniqueids });
                })
                //导入
                .on('click', '.js_import', function() {
                    common.changeHash('#gpsDevice/import');
                })
                //导出
                .on('click', '.js_export', function() {
                    me.export($(this));
                });

            /****表格操作****/
            $('#main-content')
                // 售卖
                .on('click', '.js-list-sellSingle', function() {
                    var $tr = $(this).closest('tr');
                    var uniqueids = $tr.data('uniqueid');
                    var status = $tr.data('status');
                    if (status === 0) {
                        common.changeHash('#gpsDevice/sell/', { uniqueids: uniqueids });
                    } else {
                        common.toast('已售设备需解绑后才可售卖!');
                    }
                })
                //解绑
                .on('click', '.js-list-unbindSingle', function() {
                    var $tr = $(this).closest('tr');
                    var uniqueId = $tr.data('uniqueid');
                    var status = $tr.data('status');
                    if (status == 1) {
                        common.changeHash('#gpsDevice/unbind/', { uniqueId: uniqueId, status: status });
                    } else {
                        common.toast('未销售设备不可解绑!');
                    }
                })
                // 编辑
                .on('click', '.js-list-edit', function() {
                    var tr = $(this).closest('tr');
                    var uniqueId = tr.data('uniqueid');
                    var status = tr.data('status');
                    common.changeHash('#gpsDevice/edit/', { uniqueId: uniqueId, status: status });
                })
                //查看详情
                .on('click', '.js_gpsDevice_list_detail', function() {
                    var tr = $(this).closest('tr');
                    var uniqueId = tr.data('uniqueid');
                    var saleStatus = tr.data('status'); // 是否销售
                    common.changeHash('#gpsDevice/detail/', { uniqueId: uniqueId, saleStatus: saleStatus });
                })
                //全选
                .on('click', 'input[name="checkAll"]', function() {
                    var isChecked = $(this).is(':checked');
                    if (isChecked) {
                        $('.datatable-content table > tbody input[name="checkItem"]').prop('checked', isChecked);
                    } else {
                        $('.datatable-content table > tbody input[name="checkItem"]').removeAttr('checked');
                    }
                })
                //单选
                .on('click', 'input[name="checkItem"]', function() {
                    var chks = $('.datatable-content table > tbody input[name="checkItem"]:checked').size();
                    var totalChks = $('.datatable-content table > tbody input[name="checkItem"]').size();
                    if (chks == totalChks) {
                        $('.datatable-header table > thead input[name="checkAll"]').prop('checked', true);
                    } else {
                        $('.datatable-header table > thead input[name="checkAll"]').removeAttr('checked');
                    }
                });
        },
        getData: function() {
            var me = this;
            var param = $.extend({}, this.searchParam, this.sortParam ? this.sortParam : {});
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('gpsSearchParams', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.gpsDevice.list, param, function(res) {
                if (res.status === 'OK') {
                    var data = res.content;
                    $('#gpsTable').empty().html(template.compile(tpls.gpsList)({
                        data: data.result || []
                    }));
                    me.totalCount = data.totalCount;
                    common.page(data.totalCount, param.pageSize, param.pageNumber, function(currPage) {
                        me.searchParam.pageNumber = currPage;
                        common.changeHash('#gpsDevice/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
                common.loading();
            });
        },
        getcheckedIds: function() {
            var ids = [];
            $('#gpsTable tbody input[type="checkbox"]:checked').each(function(i) {
                var $tr = $(this).closest('tr');
                if ($tr.data('status') === 0) { //1,已售;0,在库
                    ids.push($tr.data('uniqueid'));
                }
            });
            return ids;
        },
        export: function(el) {
            if (this.totalCount <= 1000) {
                this.getParams();
                var st = common.getCookie('st');
                var sid = common.getCookie('sid');
                var src = api.gpsDevice.export+'?sid=' + sid + '&st=' + st;
                $.each(this.searchParam, function(key, value) {
                    src += '&' + key + '=' + value;
                });
                var downSrc = encodeURI(src);
                $(el).attr('href', downSrc);
            } else {
                common.toast('导出数据量过大,请输入查询条件查询,最多导出1000条数据!');
                return false;
            }
        }
    });

    exports.init = function(param) {
        new GPSList().init(param);
    };
});