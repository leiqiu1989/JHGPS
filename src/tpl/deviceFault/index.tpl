<div class="panel panel-transparent flexbox">
	<div class="panel-heading">
		<h3 class="panel-title">设备故障</h3>
	</div>
	<div class="panel-heading no-padding pl40">
		<table class="table table-form-horizontal w-600 no-margin table-form-horizontal-patch">
			<tbody>
				<tr>
					<td>
						<label class="control-label">故障设备总数:</label>
						<label class="control-label-text js_total_device"></label>
					</td>
					<td>
						<label class="control-label">正在处理:</label>
						<label class="control-label-text js_process_device"></label>
					</td>
					<td>
						<label class="control-label">新增故障:</label>
						<label class="control-label-text js_new_device"></label>
					</td>								
				</tr>
			</tbody>
		</table>
	</div>
	<div class="panel-toolbar">		
		<table class="table table-form-horizontal no-margin w-auto table-form-horizontal-patch">
			<tbody>
				<tr>
					<td>
						<input type="hidden" name="orgId" value="<%= searchValue.orgId %>" />
						<label class="control-label">所属机构</label>
						<input type="text" class="form-control w-200" name="orgName" placeholder="至少输入3个字符搜索"
						value="<%= searchValue.orgName %>" />
						<ul class="ul-select hidden"></ul>
					</td>
					<td>
						<label class="control-label">车牌号码</label>
						<input type="text" class="form-control w-200" name="plateNumber" placeholder="请输入车牌号码"
						value="<%= searchValue.plateNumber %>" />
					</td>
					<td>
						<label class="control-label">GPS设备编号</label>
						<input type="text" class="form-control w-200" name="uniqueId" placeholder="请输入GPS设备编号"
						value="<%= searchValue.uniqueId %>" />
					</td>
					<td>
						<label class="control-label">处理进度</label>
						<input type="hidden" name="progress" value="<%= searchValue.progressStr %>" />
						<select class="form-control w-200" multiple name="selectProgress" data-placeholder="请选择...">
							<option value="1">未处理</option>
							<option value="2">正在处理</option>							
							<option value="3">处理完成</option>
						</select>
					</td>
					<td class="pl20">
						<a href="javascript:" class="btn btn-primary js_list_search">查 询</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="panel-toolbar form-inline">
		<div class="form-group btn-toolbar">
			<a class="btn btn-primary js_list_export">
				<i class="fa fa-download"></i>
				导 出
			</a>
		</div>
	</div>
	<div class="panel-body row-container grow">
		<div class="row row-static">
			<div class="col-static col-xs-12 no-padding">
				<div class="panel no-margin flexbox">
					<div class="panel-heading no-padding datatable-header">
						<table class="table no-margin">
							<colgroup>
							<col width="10%x" />
							<col width="10%" />
							<col width="11%" />
							<col width="11%" />
							<col width="13%" />
							<col width="8%" />
							<col width="8%" />
							<col width="13%" />
							<col width="8%" />
							<col width="8%" />
						</colgroup>
						<thead class="thin-border-bottom">
							<tr>
								<th>车牌号码</th>
								<th>GPS设备编号</th>
								<th>所属机构</th>
								<th>报告时间</th>
								<th>故障描述</th>
								<th>处理进度</th>
								<th>负责人</th>
								<th>处理描述</th>
								<th>更新时间</th>
								<th>操 作</th>
							</tr>
						</thead>
					</table>
				</div>
				<div id="deviceFaultList" class="datatable-content panel-body no-padding grow"></div>
				<div class="panel-footer clearfix">
					<div id="page" class="pull-right"></div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>