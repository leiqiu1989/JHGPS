<div class="panel panel-transparent">
    <div class="panel-heading">
        <h3 class="panel-title js_add_title">
            <ol class="breadcrumb no-padding no-margin bg-white">
              <li>设备故障</li>
              <li class="active"><%= title %></li>
            </ol>
        </h3>
    </div>
    <div class="panel-toolbar form-inline">
        <div class="form-group btn-toolbar">
            <a class="btn btn-default js_back"> <i class="fa fa-reply"></i> 返 回
            </a>
        </div>
    </div>
    <div class="panel-body">
        <div class="panel panel-transparent">
            <div class="panel-heading">
                <h3 class="panel-title">
                    <i class="fa fa-comment" aria-hidden="true"></i>
                    基础资料
                </h3>
            </div>
            <div class="panel-body">
                <form class="form-horizontal">
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">车牌号码</label>
                                <div class="col-sm-9">
                                    <label class="control-label-text-bootstrap">
                                        <%= data.plateNumber %>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">所属机构</label>
                                <div class="col-sm-9">
                                    <label class="control-label-text-bootstrap">
                                        <%= data.orgName %>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">绑定GPS设备</label>
                                <div class="col-sm-9">
                                    <label class="control-label-text-bootstrap">
                                        <%= data.uniqueId %>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">GPS设备类型</label>
                                <div class="col-sm-9">
                                    <label class="control-label-text-bootstrap">
                                        <%= data.gpsTypeDesc %>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">主驾</label>
                                <div class="col-sm-9">
                                    <label class="control-label-text-bootstrap">
                                        <%= data.driverName %>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">联系电话</label>
                                <div class="col-sm-9">
                                    <label class="control-label-text-bootstrap">
                                        <%= data.driverMobile %>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">设备状态</label>
                                <div class="col-sm-9">
                                    <label class="control-label-text-bootstrap">
                                        <%= data.gpsStatus %>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">服务到期日期</label>
                                <div class="col-sm-9">
                                    <label class="control-label-text-bootstrap">
                                        <%= formateDate(data.serviceEndDate) %>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="panel panel-transparent">
            <div class="panel-heading">
                <h3 class="panel-title">
                    <i class="fa fa-exclamation-triangle"></i>
                    故障信息
                </h3>
            </div>
            <div class="panel-body">
                <% if(isProcess) { %>
                    <div class="row">
                        <div class="col-sm-4">
                            <form id="frmProcessFault" class="form-horizontal form-horizontal-patch form-horizontal-lg">
                                <div class='form-group'>
                                    <label class="col-sm-2 control-label">报告时间</label>
                                    <div class="col-sm-10 pt4">
                                        <%= formateDate(data.reportTime,'yyyy-MM-dd hh:mm:ss') %>
                                    </div>
                                </div>
                                <div class='form-group'>
                                    <label class="col-sm-2 control-label">故障描述</label>
                                    <div class="col-sm-10">
                                        <%= data.faultDesc %>
                                    </div>
                                </div>
                                <div class='form-group'>
                                    <label class="col-sm-2 control-label required">处理方式</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" name="operateWay" required>
                                            <option value="1">其它</option>
                                            <option value="2">当前状态正常</option>
                                            <option value="3">重置设备参数</option>
                                            <option value="4">需要其它资源</option>
                                            <option value="5">未联系上客户,不能确定当前车辆正常状态</option>
                                        </select>
                                    </div>
                                </div>
                                <div class='form-group'>
                                    <label class="col-sm-2 control-label required">处理描述</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" rows="5" name="operateDesc" required></textarea>
                                    </div>
                                </div>
                                <div class='form-group'>
                                    <label class="col-sm-2 control-label required">处理进度</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" name="progress" required>
                                            <option value="1">未处理</option>
                                            <option value="2">正在处理</option>
                                            <option value="3">处理完成</option>
                                        </select>
                                    </div>
                                </div>
                                <div class='form-group'>
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10 mt20">
                                        <a class="btn btn-primary mr10 js_save">
                                            <i class="fa fa-check"></i> 保 存
                                        </a>
                                        <a class="btn btn-default js_back">
                                            <i class="fa fa-ban"></i> 取 消
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                <% } else { %>
                    <form class="form-horizontal">
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">报告时间</label>
                                    <div class="col-sm-9">
                                        <label class="control-label-text-bootstrap">
                                            <%= formateDate(data.reportTime,'yyyy-MM-dd hh:mm:ss') %>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">故障描述</label>
                                    <div class="col-sm-9">
                                        <label class="control-label-text-bootstrap"><%= data.faultDesc %></label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">处理方式</label>
                                    <div class="col-sm-9">
                                        <label class="control-label-text-bootstrap"><%= data.operateWayDesc %></label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">处理描述</label>
                                    <div class="col-sm-9">
                                        <label class="control-label-text-bootstrap"><%= data.operateDesc %></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">处理进度</label>
                                    <div class="col-sm-9">
                                        <label class="control-label-text-bootstrap">
                                            <%= data.progressDesc %>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">负责人</label>
                                    <div class="col-sm-9">
                                        <label class="control-label-text-bootstrap"><%= data.operatorName %></label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">更新时间</label>
                                    <div class="col-sm-9">
                                        <label class="control-label-text-bootstrap">
                                            <%= formateDate(data.updateTime,'yyyy-MM-dd hh:mm:ss') %>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                            </div>
                        </div>
                    </form>
                <% } %>
            </div>
        </div>
    </div>
</div>