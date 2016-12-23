define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var validate = require('validate');
    var common = require('common');
    var api = require('api');
    // 模板
    var tpls = {
        sell: require('../../tpl/gpsDevice/sell')
    };

    var GPSSell = function() {
        this.uniqueIds = null;
    };

    $.extend(GPSSell.prototype, {
        init: function(uniqueids) {
            this.uniqueIds = uniqueids;
            this.render();
            this.event();
            this.validate();
        },
        render: function() {
            $('#main-content').empty().html(template.compile(tpls.sell)({ uniqueids: this.uniqueIds }));
            common.initDateTime('#sellDate', 'Y-m-d', false, false, false, new Date());
            common.initDateTime('#endDate', 'Y-m-d', false, false, new Date(), false);
        },
        event: function() {
            var me = this;
            // 所属机构事件监听
            common.listenOrganization();

            $('#main-content')
                //返回
                .on('click', '.js_back,.js_cancel', function() {
                    common.changeHash('#gpsDevice/index');
                });
        },
        validate: function() {
            var me = this;
            validate('#frm-addCar', {
                subBtn: '.js_save',
                promptPos: 'inline',
                submit: function() {
                    var param = me.getParams();
                    if (param.orgId) {
                        me.saleSublim(param);
                    } else {
                        common.toast('请搜索并选择所属机构');
                        return false;
                    }
                }
            });
        },
        saleSublim: function(param) {
            common.ajax(api.gpsDevice.sellgps, param, function(data) {
                if (data.status == 'OK') {
                    common.alert('售卖成功', '', true, function() {
                        common.changeHash('#gpsDevice/index');
                    });
                } else {
                    common.alert(data.errorMsg, 'fail', true);
                }
            });
        },
        getParams: function() {
            var me = this;
            return {
                orgId: common.getElValue('#orgId'), //部门id
                uniqueIds: me.uniqueIds, //GPS设备编号
                orgName: common.getElValue('#orgName'), //部门名称
                salesTime: common.getElValue('#sellDate') + ' 00:00:00', //销售日期
                servicePackage: common.getElValue('#package'), //套餐
                needFee: common.getElValue('#needFee'), //应收费用
                realFee: common.getElValue('#realFee'), //实收费用
                serviceEndTime: common.getElValue('#endDate') + ' 00:00:00', //服务到期时间
                status: 1, //状态(1-销售，2-解绑),
                remark: common.getElValue('#remark') //备注
            };
        }
    });

    exports.init = function(param) {
        new GPSSell().init(param.uniqueids);
    };
});