<div id="carDetail" class="full">
	<div class="row-container full">
		<div class="row-container-left">
			<div class="row row-static">
				<div class="col-static col-xs-12 no-padding border-r overflow-h">
					<div class="panel panel-transparent flexbox">
						<div class="panel-heading">
							<h3 class="panel-title">
								<ol class="breadcrumb no-padding no-margin bg-white">
								  <li>车辆信息</li>
								  <li class="active js_carName"><%= carInfo.plateNumber %></li>
								</ol>
							</h3>
						</div>
						<div class="panel-toolbar form-inline clearfix">
							<h4 class="pull-left no-margin panel-toolbar-title">
								<span class="js_carName"></span>
								<%= carInfo.plateNumber %>
								<span class="p15-lr js_detail_state"></span>
							</h4>
							<div class="panel-toolbar pull-right form-inline">
								<div class="form-group btn-toolbar">
									<a class="btn-operator js_detail_stop">
										<i class="fa fa-star-o"></i>
										停用
									</a>
									<a class="btn-operator js_detail_edit">
										<i class="fa fa-pencil-square-o"></i>
										编辑
									</a>
									<a class="btn-operator js_detail_back">
										<i class="fa fa-reply"></i>
										返回
									</a>
								</div>
							</div>
						</div>
						<div class="panel-body grow overflow-h">
							<div class="panel panel-transparent no-margin flexbox">
								<div class="panel-heading no-padding">
									<ul id="nav-carDetail" class="nav nav-tabs tab-space-4 tab-styled">
										<li class="active">
											<a data-toggle="tab" navId="#nav-carInfo" href="javascript:">车辆信息</a>
										</li>
										<li>
											<a data-toggle="tab" navId="#nav-carTrack" href="javascript:">行程轨迹</a>
										</li>
										<li>
											<a data-toggle="tab" navId="#nav-deviceInit" href="javascript:">设备初始化</a>
										</li>
									</ul>
								</div>
								<div class="panel-body no-padding grow">
									<div class="tab-content full bt0">
										<div id="nav-carInfo" class="tab-pane active">
											<div class="panel panel-transparent no-margin">
												<div class="panel-heading">
													<h3 class="panel-title">
														位置数据
														<a href="javascript:" class="p15-lr f12 js_detail_refresh">
															<i class="fa fa-refresh"></i>
															刷新
														</a>
													</h3>
												</div>
												<div id="lastLocation" class="panel-body"></div>
											</div>
											<div class="panel panel-transparent no-margin">
												<div class="panel-heading">
													<h3 class="panel-title">基础资料</h3>
												</div>
												<div class="panel-body">
													<form class="form-horizontal">
														<div class="row">
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-5 control-label">所属机构</label>
																	<div class="col-sm-7">
																		<label class="control-label-text-bootstrap" title="<%= carInfo.orgName %>">
																			<%= carInfo.orgName %>
																		</label>
																	</div>
																</div>
															</div>
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-5 control-label">车牌颜色</label>
																	<div class="col-sm-7">
																		<label class="control-label-text-bootstrap">
																			<%= plateNumberColorDesc(carInfo.plateNumberColor) %>
																		</label>
																	</div>
																</div>
															</div>
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-5 control-label">车辆品牌</label>
																	<div class="col-sm-7">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.vehicleBrand %>
																		</label>
																	</div>
																</div>
															</div>
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-5 control-label">车辆类型</label>
																	<div class="col-sm-7">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.truckType %>
																		</label>
																	</div>
																</div>
															</div>
														</div>
														<div class="row">															
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-5 control-label">额定载重</label>
																	<div class="col-sm-7">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.truckLoad %>吨
																		</label>
																	</div>
																</div>
															</div>
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-5 control-label">车长</label>
																	<div class="col-sm-7">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.truckLength %>米
																		</label>
																	</div>
																</div>
															</div>
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-5 control-label">油卡卡号</label>
																	<div class="col-sm-7">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.oilCard %>
																		</label>
																	</div>
																</div>
															</div>
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-5 control-label">发动机号</label>
																	<div class="col-sm-7">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.engineNo %>
																		</label>
																	</div>
																</div>
															</div>
														</div>
														<div class="row">
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-5 control-label">车架号</label>
																	<div class="col-sm-7">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.frameNumber %>
																		</label>
																	</div>
																</div>
															</div>
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-5 control-label">监管电话</label>
																	<div class="col-sm-7">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.monitorPhone %>
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
													<h3 class="panel-title">司机信息</h3>
												</div>
												<div class="panel-body">
													<form class="form-horizontal">
														<div class="row">
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-5 control-label">主驾</label>
																	<div class="col-sm-7">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.masterName %>
																		</label>
																	</div>
																</div>
															</div>
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-5 control-label">联系电话</label>
																	<div class="col-sm-7">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.masterTelephone %>
																		</label>
																	</div>
																</div>
															</div>
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-6 control-label">身份证号码</label>
																	<div class="col-sm-6">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.masterIdCard %>
																		</label>
																	</div>
																</div>
															</div>
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-5 control-label">驾照类型</label>
																	<div class="col-sm-7">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.masterCardType %>
																		</label>
																	</div>
																</div>
															</div>
														</div>
														<div class="row">
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-5 control-label">副驾</label>
																	<div class="col-sm-7">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.copilotName %>
																		</label>
																	</div>
																</div>
															</div>
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-5 control-label">联系电话</label>
																	<div class="col-sm-7">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.copilotTelephone %>
																		</label>
																	</div>
																</div>
															</div>
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-6 control-label">身份证号码</label>
																	<div class="col-sm-6">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.copilotIdCard %>
																		</label>
																	</div>
																</div>
															</div>
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-5 control-label">驾照类型</label>
																	<div class="col-sm-7">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.copilotCardType %>
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
													<h3 class="panel-title">GPS设备编号</h3>
												</div>
												<div class="panel-body">
													<div class="form-horizontal">
														<div class="row">
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-6 control-label">GPS设备编号</label>
																	<div class="col-sm-6">
																		<label class="control-label-text-bootstrap" title="<%= carInfo.uniqueId %>">
																			<%= carInfo.uniqueId %>
																		</label>
																	</div>
																</div>
															</div>
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-6 control-label">GPS设备类型</label>
																	<div class="col-sm-6">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.gpsBrand %>
																		</label>
																	</div>
																</div>
															</div>
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-6 control-label">服务到期时间</label>
																	<div class="col-sm-6">
																		<label class="control-label-text-bootstrap">
																			<%= formateDate(carInfo.gpsEndTime) %>
																		</label>
																	</div>
																</div>
															</div>
															<div class="col-sm-3">
																<div class="form-group">
																	<label class="col-sm-5 control-label">SIM卡号码</label>
																	<div class="col-sm-7">
																		<label class="control-label-text-bootstrap">
																			<%= carInfo.simmcard %>
																		</label>
																	</div>
																</div>
															</div>
														</div>
													</div>													
												</div>
											</div>
										</div>
										<div id="nav-carTrack" class="tab-pane full overflow-h">
											<div class="panel panel-transparent no-margin full flexbox">
												<div class="panel-toolbar panel-toolbar-patch">
													<table class="table table-form-horizontal no-margin table-form-horizontal-patch">
														<tbody>
															<tr>
																<td>
																	<label class="control-label">GPS时间</label>
																	<input type="text" id="startTime" class="form-control w-150 inline-block" />
																	<span class="p15-lr">至</span>
																	<input type="text" id="endTime" class="form-control w-150 inline-block" />
																</td>
																<td class="pl0">
																	<a href="javascript:" class="btn btn-primary js_detail_search">查 询</a>
																</td>
															</tr>
														</tbody>
													</table>
												</div>
												<div class="panel-body grow no-padding">
													<div class="panel no-margin">
														<div class="panel-heading no-padding datatable-header">
															<table class="table no-margin">
																<colgroup>
																<col width="150px" />
																<col width="80px" />
																<col width="80px" />
																<col width="80px" />
																<col width="120px"/>
																<col width="200px"/>
																<col width="100px"/>
															</colgroup>
															<thead class="thin-border-bottom">
																<tr>
																	<th>GPS时间</th>
																	<th>速 度(km/h)</th>
																	<th>方 向</th>
																	<th>状 态</th>
																	<th>警 情</th>
																	<th>位 置</th>
																	<th>里 程(km)</th>
																</tr>
															</thead>
														</table>
													</div>
													<div id="historyLocation" class="datatable-content overflow-y-h panel-body no-padding"></div>
												</div>
											</div>
										</div>
									</div>
									<div id="nav-deviceInit" class="tab-pane">
										<a href="javascript:" data-type="<%= carInfo.gpsBrand %>" class="btn btn-primary js_detail_send mb10">发 送</a>
										<div class="panel panel-transparent">
											<div class="panel-heading">
												<h3 class="panel-title">数据回传间隔</h3>
											</div>
											<div class="panel-body">
												<dl>
													<dt>ACC开回传间隔</dt>
													<dd>SPBSJ* P:BSJGPS*C:0015</dd>
												</dl>
												<dl>
													<dt>ACC关回传间隔</dt>
													<dd>SPBSJ* P:BSJGPS*C:0015</dd>
												</dl>
											</div>
										</div>
										<div class="panel panel-transparent">
											<div class="panel-heading">
												<h3 class="panel-title">设备数据回传IP端口(ET08S)</h3>
											</div>
											<div class="panel-body">
												<dl>
													<dd>
														SPBSJ*P:BSJGPS*T:123.057.052.210,5000*U:123.057.052.210,5000*N:
														<%= carInfo.uniqueId %></dd>
												</dl>
											</div>
										</div>
										<div class="panel panel-transparent">
											<div class="panel-heading">
												<h3 class="panel-title">设备内车辆参数设置(ET08BD)</h3>
											</div>
											<div class="panel-body">
												<dl>
													<dd>
														SPBSJ*P:BSJGPS*T:123.057.052.210,5000*U:123.057.052.210,5000*N:
														<%= carInfo.uniqueId %>
														*G:jt1.gghypt.net:7008*T:123.056.090.057,5013*V:52,2701,,,
														<%= GPSID(carInfo.uniqueId) %>
														,
														<%= carInfo.plateNumberColor %>
														,
														<%= carInfo.plateNumber %>
														,
														<%= carInfo.masterTelephone %>
														,
														<%= carInfo.frameNumber %>,1</dd>
												</dl>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row-container-right">
		<div class="mapContainer" id="mapContainer"></div>
	</div>
</div>
</div>