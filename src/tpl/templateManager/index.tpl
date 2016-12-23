<div class="panel panel-transparent flexbox">
	<div class="panel-heading">
		<h3 class="panel-title">模板管理</h3>
	</div>
	<div class="panel-toolbar">
		<table class="table table-form-horizontal no-margin w-auto table-form-horizontal-patch">
			<tbody>
				<tr>
					<td>
						<input type="text" class="form-control w-200" name="condition" placeholder="请输入模板名称、编号查询"
							value="<%= searchValue.condition %>" maxlength="25" />
					</td>
					<td>
						<label class="control-label">模板状态</label>
						<select class="form-control w-200" name="selStatus">
							<option value="">全部</option>
							<option value="1">启用</option>
							<option value="2">禁用</option>
						</select>
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
			<a class="btn btn-primary js_list_addTpl"> <i class="fa fa-plus"></i>
				新建模板
			</a>
			<a class="btn btn-primary js_list_changeStatus" data-status="1"> <i class="fa fa-star"></i>
				启 用
			</a>
			<a class="btn btn-primary js_list_changeStatus" data-status="2"> <i class="fa fa-star-o"></i>
				禁 用
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
							<col width="14%" />
							<col width="9%" />
							<col width="9%" />
							<col width="10%" />
							<col width="15%" />
							<col width="14%" />
							<col width="15%" />
							<col width="11%" />
						</colgroup>
						<thead class="thin-border-bottom">
							<tr>
								<th class="align-center">
									<input type="checkbox" name="checkAll" />
								</th>
								<th>模板名称</th>
								<th>模板状态</th>
								<th>模板编号</th>
								<th>模板版本号</th>
								<th>模板归属</th>
								<th>创建时间</th>
								<th>最后修改时间</th>
								<th>操 作</th>
							</tr>
						</thead>
					</table>
				</div>
				<div id="templateList" class="datatable-content panel-body no-padding grow"></div>
				<div class="panel-footer clearfix">
					<div id="page" class="pull-right"></div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>