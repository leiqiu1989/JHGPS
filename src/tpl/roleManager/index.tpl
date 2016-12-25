<div class="panel panel-transparent flexbox">
	<div class="panel-heading">
		<h3 class="panel-title">角色信息</h3>
	</div>
	<div class="panel-toolbar">
		<table class="table table-form-horizontal no-margin w-auto table-form-horizontal-patch">
			<tbody>
				<tr>
					<td>
						<label class="control-label">角色名称</label>
						<input type="text" class="form-control w-200" name="OrderNum" placeholder="输入角色名称后回车搜索"
						value="<%= searchValue.OrderNum%>" />
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
			<a class="btn btn-primary js_list_delete"> <i class="fa fa-times"></i>
				删 除
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
							<col width="3%" />
							<col width="5%" />
							<col width="8%" />
							<col width="8%" />
							<col width="12%" />
						</colgroup>
						<thead class="thin-border-bottom">
							<tr>
								<th class="align-center">
									<input type="checkbox" name="checkAll" />
								</th>
								<th>操 作</th>
								<th>角色名称</th>
								<th>更新时间</th>
								<th>备注</th>
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