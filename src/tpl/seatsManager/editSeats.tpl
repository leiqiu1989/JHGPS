<div  class="full" style="width:700px;height:400px;">
    <div class="row-container full">
        <div class="row-container-left">
            <div class="panel-body">
            <form id="frmaddCar" class="">
                <div class="panel panel-transparent">
                    <div class="panel-body">
                        <div class='row'>
                            <div class='form-group'>
                                <label>编号：</label>
                                <label>9</label>
                            </div>
                            <div class='form-group'>
                                <label for="vehicle_Brand" class="required">姓名</label>
                                <input type="text" name="gpsEndTime" maxlength="20" required class="form-control" />
                            </div>
                            <div class='form-group'>
                                <label for="truck_Type" class="required">内网IP</label>
                                <input type="text" data-type="ipaddress" name="gpsEndTime" required class="form-control" />
                            </div>
                            <div class='form-group'>
                                <label for="truck_Type" class="required">密码</label>
                                <input type="password"  maxlength="20" name="gpsEndTime" required class="form-control" />
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer panel-footer-patch">
                        <a class="btn btn-primary mr10 js_add_save">
                            <i class="fa fa-check"></i>
                            保 存
                        </a>
                        <a class="btn btn-default js_add_cancel">
                            <i class="fa fa-ban"></i>
                            取 消
                        </a>
                    </div>  
                </div>
                </form>
            </div>
        </div>
        <div class="row-container-right">
            <div id="vehicleTree" class="ztree" style="overflow:auto;width:300px;height:320px;"></div>
        </div>
    </div>
</div>