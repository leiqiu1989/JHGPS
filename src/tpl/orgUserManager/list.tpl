<table class="table table-hover no-margin">
	<colgroup>
	<col width="50px" />
	<col width="8%" />
	<col width="6%" />
	<col width="8%" />
	<col width="8%" />
	<col width="8%" />
	<col width="8%" />
	<col width="8%" />
	<col width="8%" />
	<col width="9%" />
	<col width="12%" />
	<col width="12%" />
</colgroup>
<tbody>
	<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
			var stopCls = item.status == 0 ? 'red' :'';
			var endTimeCls= dateTimeCls(item.gpsEndTime);
			var carStatusDesc = (item.stateDesc ? item.stateDesc + ';' : '') +''+ (item.accStatus ? item.accStatus : '');
	%>
	<tr data-truckid="<%= item.Vid %>" data-orgid="<%= item.orgId %>" data-uniqueids="<%= item.uniqueId %>">
		<td class="align-center">
			<input type="checkbox" name="checkItem" />
		</td>
		<td>
			<a class="td-operator js_list_edit">
				<i class="fa fa-pencil-square-o"></i>
				编 辑
			</a>
			<a class="td-operator js_list_delete">
				<i class="fa fa-times"></i>
				删 除
			</a>
		</td>
		<td title="<%= item.PlateNo %>">
			<!-- <a href="javascript:" class="js_list_detail">
				<%= item.PlateNo %>
			</a> -->
			<%= item.PlateNo %>
		</td>
		<td title="<%= item.ColorString %>">
			<%= item.ColorString %>
		</td>
		<td title="<%= item.OrgNo %>">
			<%= item.OrgNo %>
		</td>
		<td title="<%= EquipmentNo %>">
			<%= EquipmentNo %>
		</td>
		<td title="<%= item.SimCardNo %>">
			<%= item.SimCardNo %>
		</td>
		<td title="<%= item.DriverName %>">
			<%= item.DriverName %>
		</td>
		<td title="<%= item.PhoneNo %>">
			<%= item.PhoneNo %>
		</td>
		<td title="<%= item.VehicleTypeString %>" class="<%= stopCls %>">
			<%= item.VehicleTypeString %>
		</td>
		<td title="<%= formateDate(item.ETime) %>" class="<%= endTimeCls %">
			<%= formateDate(item.ETime) %>
		</td>
		<td title="<%= item.Remark %>">
			<%= item.Remark %>
		</td>
	</tr>
	<% } } %>
	</tbody>
</table>