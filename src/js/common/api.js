define(function(require, exports, module) {
    'use strict';

    var remoteUrl = 'http://120.25.212.193:8081';

    /*接口API*/
    var api = {
        //登录
        login: remoteUrl + '/Account/Login',
        vehicleList: remoteUrl + '/Home/QueryZtree',
        carPositionList: remoteUrl + '/Position/QueryLastPosition',
        carTrackHistory: remoteUrl + '/Position/QueryHistory',
        carManager: {
            list: remoteUrl + '/Vehicle/QueryAllVehicleAbbrInfo',//'/vehicle/get-vehicle-list', //车辆管理列表

            exportCarList: remoteUrl + '/vehicle/get-vehicle-list-export',
            orgList: remoteUrl + '/Home/QueryOrgZtree', //'/company/get-company-list', //获取组织树结构
            stop: remoteUrl + '/Vehicle/DeleteVehicleAbbrInfo',//'/vehicle/disable-vehicle', //删除车辆
            carType: remoteUrl + '/Vehicle/VehicleType',//'/vehicle/type/get-all-vehicle-type', //车辆类型
            carBrand: remoteUrl + '/Vehicle/VehicleBrand',//'/vehicle/brand/get-all-vehicle-brand', //车辆品牌
            plateNumberColor: remoteUrl + '/Vehicle/VehicleColor', //车牌颜色
            equipmentType: remoteUrl + '/Vehicle/EquipmentType', //设备类型
            carDriverList: remoteUrl + '/driver/get-drivers-by-orgid',
            checkGPS: remoteUrl + '/avl/check-gpsno',
            submit: remoteUrl + '/Vehicle/CreateVehicleAbbrInfo',//'/vehicle/save-vehicle',  增加车辆
            detail: remoteUrl + '/Vehicle/QueryVehicleAbbrInfo',//'/vehicle/get-vehicle-detail', //查看车辆详情
            update: remoteUrl + '/Vehicle/EditVehicleAbbrInfo',//'/vehicle/update-vehicle', //编辑车辆
            lastLocation: remoteUrl + '/vehicle/get-last-location',
            historyLocation: remoteUrl + '/vehicle/get-history-location',
            alarmList: remoteUrl + '/alarm/get-alarm-event-by-gpsno',
            checkImportFile: remoteUrl + '/vehicle/check-import-data',
            importData: remoteUrl + '/vehicle/import-data',
            sendGPS: remoteUrl + '/web/cmd/send',
            getGPSNumByOrgId: remoteUrl + '/avl/info/get-avlinfo-list-by-orgid'
        },
        orderManager:{
            list: remoteUrl + '/Order/QueryAllOrder',
        },
        gpsDevice: {
            list: remoteUrl + '/avl/get-avl-info-list', //GPS设备列表
            detail: remoteUrl + '/avl/info/get-avl-info-detail', //设备详情
            addgps: remoteUrl + '/avl/save-avl-info', //新增设置
            updateGps: remoteUrl + '/avl/info/update-avl-info-by-id', // 编辑保存GPS
            sellgps: remoteUrl + '/sales/records/batch-sales', //设备售卖
            unbind: remoteUrl + '/sales/records/unbind', //解绑设备
            export: remoteUrl + '/avl/get-avl-info-list-export', //导出列表
            checkFile: remoteUrl + '/avl/check-import-avl-data', //导入校验
            importFile: remoteUrl + '/avl/import-avl-data', //导入
        },
        userManager: {
            list: remoteUrl + '/sys/user/get-sys-user-page', // 列表
            add: remoteUrl + '/sys/user/save-sys-user', // 添加
            stop: remoteUrl + '/sys/user/disable-sys-user', // 停用
            active: remoteUrl + '/sys/user/active-sys-user', // 启用
            checkUserName: remoteUrl + '/sys/user/get-employee-info' //查询员工信息
        },
        deviceFault: {
            list: remoteUrl + '/web/device/fault-list',
            exportList: remoteUrl + '/web/device/exprot-fault-list',
            detail: remoteUrl + '/web/device/fault-info',
            processDeviceFault: remoteUrl + '/web/device/operate-fault',
            summaryCount: remoteUrl + '/web/device/count-fault'
        },
        tplManager: {
            list: remoteUrl + '/web/contract/template-list', // 获取模板列表
            enabledTpl: remoteUrl + '/web/contract/enabled-template', // 启用or禁用模板
            basicTplList: remoteUrl + '/web/contract/basic-templates', // 获取基础模板列表
            basicTplDetail: remoteUrl + '', // 获取基础模板详情
            detail: remoteUrl + '/web/contract/template-detail' // 模板详情
        }
    };
    return api;
});