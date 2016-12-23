<form id="frmaddCar">
	<input type="hidden" name="truckId" />
	<div id="carAdd" class="panel panel-transparent">
		<div class="panel-heading">
			<h3 class="panel-title js_add_title">
				<ol class="breadcrumb no-padding no-margin bg-white">
				  <li>车辆信息</li>
				  <li class="active"><%= title %></li>
				</ol>
			</h3>
		</div>
		<div class="panel-toolbar form-inline">
			<div class="form-group btn-toolbar">
				<a class="btn btn-default js_add_back"> <i class="fa fa-reply"></i>
					返 回
				</a>
			</div>
		</div>
		<div class="panel-body">
			<div class="panel panel-transparent">
				<div class="panel-heading">
					<h3 class="panel-title"> <i class="fa fa-comment" aria-hidden="true"></i>
						基础资料
					</h3>
				</div>
				<div class="panel-body">
					<div class='row'>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="plate_Number" class="required">车牌号码</label>
								<input class="form-control inline-text" id="plate_Number" name="plateNumber" required type="text" />
								<div class="checkbox inline-checkbox">
									<label>
										<input type="checkbox" data-chkvalue="1" data-unchkvalue="0" name="needExamined">需要年审</label>
								</div>
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="plateNumber_Color" class="required">车牌颜色</label>
								<select class="form-control" id="plateNumber_Color" name="plateNumberColor" required>
									<option value="0">黄牌</option>
									<option value="1">蓝牌</option>
								</select>
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="vehicle_Brand">车辆品牌</label>
								<select class="form-control" id="vehicle_Brand" name="vehicleBrand"></select>
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="truck_Type">车辆类型</label>
								<select class="form-control" id="truck_Type" name="truckType"></select>
							</div>
						</div>
					</div>
					<div class='row'>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="truck_Load">额定载重(吨)</label>
								<input class="form-control" id="truck_Load" data-type="number" name="truckLoad" type="text" />
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="truck_Length">车长(米)</label>
								<input class="form-control" id="truck_Length" data-type="number" name="truckLength" type="text" />
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="org_name" class="required">所属机构</label>
								<input type="text" class="form-control" required name="orgName" data-nosubmit="true" placeholder="至少输入3个字符搜索" />
								<input type="hidden" name="orgId" />
								<ul class="ul-select hidden"></ul>
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="engine_No">发动机号</label>
								<input class="form-control" id="engine_No" data-type='letternum' name="engineNo" type="text" />
							</div>
						</div>
					</div>
					<div class='row'>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="frame_Number">车架号</label>
								<input class="form-control" id="frame_Number" data-type='letternum' name="frameNumber" type="text" />
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="oil_Card">油卡卡号</label>
								<input class="form-control" id="oil_Card" data-type='integer' name="oilCard" type="text" />
							</div>
						</div>
						<div class="col-sm-3">
							<div class="form-group">
								<label for="monitor_Phone">监管电话</label>
								<input class="form-control" id="monitor_Phone" data-type="tel" name="monitorPhone" type="text" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="driveInfo" class="panel panel-transparent">
				<div class="panel-heading">
					<h3 class="panel-title">
						<i class="fa fa-user-plus" aria-hidden="true"></i>
						司机信息
					</h3>
				</div>
				<div class="panel-body">
					<div class='row'>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="master_DriverId">主驾</label>
								<select class="form-control" id="master_DriverId" data-type="master" name="masterDriverId"></select>
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="master_Telephone">联系电话</label>
								<input class="form-control" id="master_Telephone" data-nosubmit="true" name="masterTelephone" readonly data-type="tel" type="text" />
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="master_IdCard">身份证号码</label>
								<input class="form-control" id="master_IdCard" data-nosubmit="true" name="masterIdCard" readonly type="text" />
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="master_CardType">驾照类型</label>
								<input type="text" class="form-control" id="master_CardType" data-nosubmit="true" name="masterCardType" readonly="readonly" />
							</div>
						</div>
					</div>
					<div class='row'>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="copilot_DriverId">副驾</label>
								<select class="form-control" id="copilot_DriverId" data-type="copilot" name="copilotDriverId"></select>
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="copilot_Telephone">联系电话</label>
								<input class="form-control" id="copilot_Telephone" data-nosubmit="true" name="copilotTelephone" readonly type="text" />
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="copilot_IdCard">身份证号码</label>
								<input class="form-control" id="copilot_IdCard" data-nosubmit="true" name="copilotIdCard" readonly type="text" />
							</div>
						</div>
						<div class='col-sm-3'>
							<div class='form-group'>
								<label for="copilot_CardType">驾照类型</label>
								<input type="text" class="form-control" id="copilot_CardType" data-nosubmit="true" name="copilotCardType" readonly="readonly" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="panel panel-transparent">
				<div class="panel-heading">
					<h3 class="panel-title">
						<i class="fa fa-wifi" aria-hidden="true"></i>
						GPS设备信息
					</h3>
				</div>
				<div class="panel-body">
					<div class='row'>
						<div class='col-sm-3 js_add_control'>
							<div class='form-group'>
								<label for="unique_Id" class="required">绑定GPS设备</label>
								<input class="form-control inline-text w-87" required data-type='letterNum' id="unique_Id" name="uniqueId" type="text" />
								<div class="checkbox inline-checkbox">
									<label>
										<a class="check js_add_check">校 验</a>
									</label>
								</div>
								<i class="js_gps_text"></i>
							</div>
						</div>
						<div class='col-sm-3 hidden js_edit_control'>
							<div class='form-group'>
								<label for="unique_Id" class="required">GPS设备编号</label>
								<select name="uniqueId" class="form-control inline-text" required></select>
								<div class="checkbox inline-checkbox">
									<label>
										<a class="check disabled js_updateGPS">同步编号</a>
									</label>
								</div>
							</div>
						</div>
						<div class='col-sm-3 hidden js_edit_control'>
							<div class='form-group'>
								<label for="unique_Id">GPS设备类型</label>
								<input type="text" name="gpsBrand" data-nosubmit="true" class="form-control" disabled />
							</div>
						</div>
						<div class='col-sm-3 hidden js_edit_control'>
							<div class='form-group'>
								<label for="unique_Id">服务到期时间</label>
								<input type="text" name="gpsEndTime" data-nosubmit="true" class="form-control" disabled />
							</div>
						</div>
						<div class='col-sm-3 hidden js_edit_control'>
							<div class='form-group'>
								<label for="unique_Id">SIM卡号码</label>
								<input type="text" name="simmcard" data-nosubmit="true" class="form-control" disabled />
							</div>
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
		</div>
	</div>
</form>