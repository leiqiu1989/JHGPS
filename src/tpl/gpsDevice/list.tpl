<div class="panel panel-transparent flexbox">
	<div class="panel-heading">
		<h3 class="panel-title">GPS设备信息</h3>
	</div>
	<div class="panel-toolbar" id="gpsSearchBar">
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
						<input type="text" class="form-control w-200" name="plateNumber" placeholder="输入车牌号码查询"
						value="<%= searchValue.plateNumber %>" />
					</td>
					<td>
						<label class="control-label">GPS设备编号</label>
						<input type="text" class="form-control w-200" name="uniqueId" placeholder="请输入GPS设备编号查询"
						value="<%= searchValue.uniqueId %>" />
					</td>
					<td class="pl20">
						<a href="javascript:" class="btn btn-primary js_search">查 询</a>
					</td>
				</tr>
				<!--<tr>
					<td>
						<label class="control-label">SIM卡号码</label>
						<input type="text" class="form-control w-150" name="simcard" />
					</td>
					<td>
						<label class="control-label">是否销售</label>
						<select class="form-control w-150" name="status">
							<option value="">全部</option>
							<option value="1">已售</option>
							<option value="2">在库</option>
						</select>
					</td>
					<td>
						<label class="control-label">套餐到期时间</label>
						<input type="text" name="gpsEndTimeBegin" class="form-control w-150 inline-block" readonly="readonly" id="startDate" />
						<span class="p15-lr">至</span>
						<input type="text" name="gpsEndTimeEnd" class="form-control w-150 inline-block" readonly="readonly" id="endDate" />
					</td>
				</tr>-->
			</tbody>
		</table>
	</div>
	<div class="panel-toolbar form-inline">
		<div class="form-group btn-toolbar">
			<a class="btn btn-primary js_add"> <i class="fa fa-plus"></i>
				新 增
			</a>
			<a class="btn btn-primary js_sell"> <i class="fa fa-shopping-cart"></i>
				售 卖
			</a>
			<a class="btn btn-primary js_import">
				<i class="fa fa-upload"></i>
				导 入
			</a>
			<a class="btn btn-primary js_export">
				<i class="fa fa-download"></i>
				导 出
			</a>
		</div>
	</div>
	<div class="panel-body row-container grow">
		<div class="row row-static">
			<div id="gpsTable" class="col-static col-xs-12 no-padding">
		</div>
	</div>
</div>
</div>