<table class="table table-hover no-margin">
	<colgroup>
	<col width="5%" />
	<col width="8%" />
	<col width="6%" />
	<col width="8%" />
	<col width="8%" />
</colgroup>
<tbody>
	<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
			var carStatusDesc = item.OrderStatus==1?'停用': '启用';
	%>
	<tr data-truckid="<%= item.Vid %>" data-status="<%= item.OrderStatus %>">
		<td>
			<a class="td-operator js_list_edit">
				编 辑
			</a>
			<a class="td-operator js_list_setStatus">
				<%= carStatusDesc%>
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
	</tr>
	<% } } %>
	</tbody>
</table>