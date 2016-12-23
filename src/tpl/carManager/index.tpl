<div class="panel panel-transparent flexbox">
	<div class="panel-heading">
		<h3 class="panel-title">车辆信息</h3>
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
					<td class="pl20">
						<a href="javascript:" class="btn btn-primary js_list_search mr10">查 询</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="panel-toolbar form-inline">
		<div class="form-group btn-toolbar">
			<a class="btn btn-primary js_list_add"> <i class="fa fa-plus"></i>
				新 增
			</a>
			<a class="btn btn-primary js_list_stop"> <i class="fa fa-times"></i>
				停 用
			</a>
			<a class="btn btn-primary js_list_import">
				<i class="fa fa-upload"></i>
				导 入
			</a>
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
							<col width="50px" />
							<col width="11%" />
							<col width="11%" />
							<col width="13%" />
							<col width="13%" />
							<col width="13%" />
							<col width="8%" />
							<col width="11%" />
							<col width="8%" />
							<col width="9%" />
						</colgroup>
						<thead class="thin-border-bottom">
							<tr>
								<th class="align-center">
									<input type="checkbox" name="checkAll" />
								</th>
								<th class="sortable string asc" data-sortfield="plateNumber">车牌号码</th>
								<th class="sortable string asc" data-sortfield="plateNumberColor">车牌颜色</th>
								<th class="sortable string asc" data-sortfield="orgName">所属机构</th>
								<th class="sortable string asc" data-sortfield="state">车辆状态</th>
								<th class="sortable string asc" data-sortfield="uniqueId">GPS设备号码</th>
								<th class="sortable string asc" data-sortfield="needExamined">是否年审</th>
								<th class="sortable date asc" data-sortfield="gpsEndTime">服务到期时间</th>
								<th class="sortable string asc" data-sortfield="status">是否停用</th>
								<th>操 作</th>
							</tr>
						</thead>
					</table>
				</div>
				<div id="carList" class="datatable-content panel-body no-padding grow"></div>
				<div class="panel-footer clearfix">
					<div id="page" class="pull-right"></div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>