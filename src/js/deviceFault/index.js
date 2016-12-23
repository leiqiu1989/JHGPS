define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    // 模板
    var tpls = {
        index: require('../../tpl/deviceFault/index'),
        list: require('../../tpl/deviceFault/list')
    };

    function deviceFaultList() {}
    $.extend(deviceFaultList.prototype, {
        init: function(param) {
            // 初始化查询条件参数
            this.getParams(param);
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.index)({ searchValue: this.searchParam }));
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
            var weekArray = [];
            common.initSelect('select[name="selectProgress"]', {}, function(param) {
                var oldVal = $(':hidden[name="progress"]').val();
                if (oldVal) {
                    weekArray = oldVal.split('|');
                }
                if (param.selected) {
                    weekArray.push(param.selected);
                } else if (param.deselected) {
                    weekArray = _.without(weekArray, param.deselected);
                }
                $(':hidden[name="progress"]').val(weekArray.join('|'));
            }, this.searchParam.progressStr, { width: '350px' });
        },
        // 获取查询条件
        getParams: function(param) {
            this.sortParam = {};
            var newParams = {
                orgId: common.getElValue(':hidden[name="orgId"]'),
                orgName: common.getElValue('input[name="orgName"]'),
                plateNumber: common.getElValue('input[name="plateNumber"]'),
                uniqueId: common.getElValue('input[name="uniqueId"]'),
                progressStr: common.getElValue(':hidden[name="progress"]')
            };
            if (newParams.beginTime) newParams.beginTime = newParams.beginTime + ' 00:00:00';
            if (newParams.endTime) newParams.endTime = newParams.endTime + ' 00:00:00';
            this.searchParam = common.getParams('deviceFaultSearchParams', param, newParams, false);
            // 默认获取未处理和正在处理的数据
            if (this.searchParam.progressStr === undefined) {
                this.searchParam.progressStr = '1|2';
            }
        },
        getSummaryCount: function() {
            common.ajax(api.deviceFault.summaryCount, {}, function(res) {
                if (res && res.status === 'OK') {
                    var data = res.content;
                    $('.js_total_device').text(data.allFaultNum);
                    $('.js_process_device').text(data.operateNum);
                    $('.js_new_device').text(data.newFaultNum);
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
            });
        },
        getData: function() {
            var me = this;
            var param = $.extend({}, this.searchParam, this.sortParam ? this.sortParam : {});
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('deviceFaultSearchParams', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.deviceFault.list, param, function(res) {
                if (res.status === 'OK') {
                    var data = res.content;
                    $('#deviceFaultList').empty().html(template.compile(tpls.list)({
                        data: data.result || []
                    }));
                    // 获取设备数量
                    me.getSummaryCount();
                    common.page(data.totalCount, param.pageSize, param.pageNumber, function(currPage) {
                        me.searchParam.pageNumber = currPage;
                        common.changeHash('#deviceFault/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
                common.loading();
            });
        },
        exportDeviceFaultList: function(el) {
            this.getParams();
            var st = common.getCookie('st');
            var sid = common.getCookie('sid');
            var src = api.deviceFault.exportList + '?sid=' + sid + '&st=' + st;
            $.each(this.searchParam, function(key, value) {
                src += '&' + key + '=' + value;
            });
            var downSrc = encodeURI(src);
            $(el).attr('href', downSrc);
        },
        event: function() {
            var me = this;
            // 所属机构事件监听
            common.listenOrganization();
            // 查询-事件监听
            $('.panel-toolbar').on('click', '.js_list_search', function() {
                me.getParams(true);
                common.changeHash('#deviceFault/index/', me.searchParam);
            });
            // 事件监听
            $('#main-content').on('click', '.js-list-process,.js-list-detail', function() {
                var isProcess = $(this).data('process');
                var id = $(this).closest('tr').data('id');
                common.changeHash('#deviceFault/process/', { isProcess: isProcess, id: id });
            }).on('click', '.js_list_export', function() {
                me.exportDeviceFaultList($(this));
            });
        }
    });


    exports.init = function(param) {
        new deviceFaultList().init(param);
    };
});