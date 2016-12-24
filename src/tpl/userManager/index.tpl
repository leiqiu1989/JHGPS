<div class="panel panel-transparent flexbox">
	<div class="panel-heading">
		<h3 class="panel-title">系统用户</h3>
	</div>
	<div class="panel-toolbar">
		<table class="table table-form-horizontal no-margin w-auto table-form-horizontal-patch">
			<tbody>
				<tr>
					<td>
						<label class="control-label">工号</label>
						<input type="text" class="form-control w-200" name="username" placeholder="请输入用户工号"
						value="<%= searchValue.username %>" />
					</td>
					<td>
						<label class="control-label">姓名</label>
						<input type="text" class="form-control w-200" name="name" placeholder="请输入用户姓名"
						value="<%= searchValue.name %>" />
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
							<col width="20%" />
							<col width="20%" />
							<col width="20%" />
							<col width="15%" />
							<col />
							<col width="10%" />
						</colgroup>
						<thead class="thin-border-bottom">
							<tr>
								<th>工号</th>
								<th>姓名</th>
								<th>联系电话</th>
								<th>状态</th>
								<th>最近登录时间</th>
								<th>操 作</th>
							</tr>
						</thead>
					</table>
				</div>
				<div id="userList" class="datatable-content panel-body no-padding grow"></div>
				<div class="panel-footer clearfix">
					<div id="page" class="pull-right"></div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>