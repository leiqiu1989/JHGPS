<form id="frmUserAdd" class="form-horizontal form-horizontal-lg form-horizontal-patch w-500 p15">
    <div class='form-group'>
        <label class="col-sm-3 control-label required">员工工号</label>
        <div class="col-sm-7">
            <input type="text" class="form-control" name="username" maxlength="16" required data-type='letternum' />
        </div>
        <div class="col-sm-2 pl0">
            <a class="btn btn-default" id="btnSearchUser">
                <i class="fa fa-search"></i>
                查 询
            </a>
        </div>
    </div>
    <div class='form-group'>
        <label class="col-sm-3 control-label required">姓名</label>
        <div class="col-sm-9">
            <label for="" class="form-control" id="employeeName"></label>
        </div>        
    </div>
    <div class='form-group'>
        <label class="col-sm-3 control-label required">联系电话</label>
        <div class="col-sm-9">
            <label for="" class="form-control" id="employeeMobile"></label>
        </div>        
    </div>
    <div class="form-group no-margin">
        <div class="col-sm-offset-3 col-sm-9">
            <a class="btn btn-primary mr10" id="btnOK">
                <i class="fa fa-check"></i>
                保 存
            </a>
            <a class="btn btn-default" id="btnCancel">
                <i class="fa fa-ban"></i>
                取 消
            </a>
        </div>
    </div>
</form>
