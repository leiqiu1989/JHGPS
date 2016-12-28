<div class="panel panel-transparent flexbox">
	<div class="panel-heading">
		<h3 class="panel-title">组织用户</h3>
	</div>
	<div class="panel-toolbar">
		<table class="table table-form-horizontal no-margin w-auto table-form-horizontal-patch">
			<tbody>
				<tr>
					<td>
						<label class="control-label">关键字</label>
						<input type="text" class="form-control w-300" name="Condition"
						 placeholder="组织名称、用户名、联系人、联系电话搜索" value="<%= searchValue.Condition %>" />
					</td>
					<td>
						<input type="hidden" name="OnlyOrgNo" value="<%= searchValue.OnlyOrgNo %>" />
						<label class="control-label">所属机构</label>
						<input type="text" class="form-control w-200" name="orgName" placeholder="至少输入3个字符搜索"
						value="<%= searchValue.orgName%>" />
						<ul class="ul-select hidden"></ul>
					</td>
					<td class="pl20">
						<a href="javascript:" class="btn btn-primary js_list_search mr10">查 询</a>
						<a href="javascript:" class="btn btn-primary js_list_reset">重 置</a>
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
							<col width="12%" />
							<col width="15%" />
							<col width="12%" />
							<col width="12%" />
							<col width="12%" />
							<col width="24%" />
							<col width="10%" />
						</colgroup>
						<thead class="thin-border-bottom">
							<tr>
								<th class="align-center">
									<input type="checkbox" name="checkAll" />
								</th>
								<th>组织名称</th>
								<th>所属机构</th>
								<th>管理员</th>
								<th>联系人</th>
								<th>联系电话</th>
								<th>用 户</th>
								<th>操 作</th>
							</tr>
						</thead>
					</table>
				</div>
				<div id="orgUserList" class="datatable-content panel-body no-padding grow"></div>
				<div class="panel-footer clearfix">
					<div id="page" class="pull-right"></div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>