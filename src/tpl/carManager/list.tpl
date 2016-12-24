<table class="table table-hover no-margin">
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
<tbody>
	<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
			var stopCls = item.status == 0 ? 'red' :'';
			var endTimeCls= dateTimeCls(item.gpsEndTime);
			var carStatusDesc = (item.stateDesc ? item.stateDesc + ';' : '') +''+ (item.accStatus ? item.accStatus : '');
	%>
	<tr data-truckid="<%= item.truckId %>" data-orgid="<%= item.orgId %>" data-uniqueids="<%= item.uniqueId %>">
		<td class="align-center">
			<input type="checkbox" name="checkItem" />
		</td>
		<td title="<%= item.plateNumber %>">
			<a href="javascript:" class="js_list_detail">
				<%= item.plateNumber %>
			</a>
		</td>
		<td title="<%= item.plateNumberColorDesc %>">
			<%= item.plateNumberColorDesc %>
		</td>
		<td title="<%= item.orgName %>">
			<%= item.orgName %>
		</td>
		<td title="<%= carStatusDesc %>">
			<%= carStatusDesc %>
		</td>
		<td title="<%= item.uniqueId %>">
			<%= item.uniqueId %>
		</td>
		<td title="<%= item.needExaminedDesc %>">
			<%= item.needExaminedDesc %>
		</td>
		<td title="<%= formateDate(item.gpsEndTime) %>" class="<%= endTimeCls %">
			<%= formateDate(item.gpsEndTime) %>
		</td>
		<td title="<%= item.statusDesc %>" class="<%= stopCls %>">
			<%= item.statusDesc %>
		</td>
		<td>
			<a class="td-operator js_list_edit">
				<i class="fa fa-pencil-square-o"></i>
				编 辑
			</a>
			<a class="td-operator js_list_stop">
				<i class="fa fa-star-o"></i>
				停 用
			</a>
		</td>
	</tr>
	<% } } %>
	</tbody>
</table>