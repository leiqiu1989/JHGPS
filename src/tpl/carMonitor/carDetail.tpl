<form class="form-horizontal form-horizontal-lg form-horizontal-patch w-700">
    <div class="panel panel-transparent no-margin">
        <div class="panel-heading">
            <h3 class="panel-title">
                基本信息
            </h3>
        </div>
        <div class="panel-body">
            <form class="form-horizontal">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">车牌号码</label>
                            <div class="col-sm-7">
                                <label class="control-label-text-bootstrap">
                                    <%= data.Vehicle.PlateNo %>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">车牌颜色</label>
                            <div class="col-sm-7">
                                <label class="control-label-text-bootstrap">
                                    <%= data.Vehicle.Color %>
                                </label>
                            </div>
                        </div>
                    </div>                
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">车辆品牌</label>
                            <div class="col-sm-7">
                                <label class="control-label-text-bootstrap">
                                    <%= data.Vehicle.Brand %>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">车辆类型</label>
                            <div class="col-sm-7">
                                <label class="control-label-text-bootstrap">
                                    <%= data.Vehicle.VehicleType %>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">购车日期</label>
                            <div class="col-sm-7">
                                <label class="control-label-text-bootstrap">
                                    <%= data.Vehicle.BuyDate %>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="panel panel-transparent no-margin">
        <div class="panel-heading">
            <h3 class="panel-title">
                司机信息
            </h3>
        </div>
        <div class="panel-body">
            <form class="form-horizontal">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">司机姓名</label>
                            <div class="col-sm-7">
                                <label class="control-label-text-bootstrap">
                                    <%= data.Driver.DriverName %>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">联系电话</label>
                            <div class="col-sm-7">
                                <label class="control-label-text-bootstrap">
                                    <%= data.Driver.PhoneNo %>
                                </label>
                            </div>
                        </div>
                    </div>                
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">紧急联系电话</label>
                            <div class="col-sm-7">
                                <label class="control-label-text-bootstrap">
                                    <%= data.Driver.UrgencyContactPhone %>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">身份证</label>
                            <div class="col-sm-7">
                                <label class="control-label-text-bootstrap">
                                    <%= data.Driver.IDCard %>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">家庭住址</label>
                            <div class="col-sm-7">
                                <label class="control-label-text-bootstrap">
                                    <%= data.Driver.HomeAddress %>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="panel panel-transparent no-margin">
        <div class="panel-heading">
            <h3 class="panel-title">
                GPS设备信息
            </h3>
        </div>
        <div class="panel-body">
            <form class="form-horizontal">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">设备编号</label>
                            <div class="col-sm-7">
                                <label class="control-label-text-bootstrap">
                                    <%= data.Equipment.EquipmentNo %>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">设备类型</label>
                            <div class="col-sm-7">
                                <label class="control-label-text-bootstrap">
                                    <%= data.Equipment.EquipmentTypeId %>
                                </label>
                            </div>
                        </div>
                    </div>                
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">设备名称</label>
                            <div class="col-sm-7">
                                <label class="control-label-text-bootstrap">
                                    <%= data.Equipment.DeviceName %>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">SIM卡号</label>
                            <div class="col-sm-7">
                                <label class="control-label-text-bootstrap">
                                    <%= data.Simcard.SimCardNo %>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">入网时间</label>
                            <div class="col-sm-7">
                                <label class="control-label-text-bootstrap">
                                    <%= data.Simcard.STime %>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">到期时间</label>
                            <div class="col-sm-7">
                                <label class="control-label-text-bootstrap">
                                    <%= data.Simcard.ETime %>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label class="col-sm-5 control-label">备注</label>
                            <div class="col-sm-7">
                                <label class="control-label-text-bootstrap">                                    
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="align-center">
        <a class="btn-basic-default" id="btnCancel">确 定</a>
    </div>
</form>