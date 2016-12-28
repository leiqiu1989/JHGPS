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
			var carStatusDesc = item.Enable==1?'停用': '启用';
	%>
	<tr data-truckid="<%= item.Id %>" data-status="<%= item.Enable %>">
		<td>
			<a href="javascript:;" class="js_list_edit">
				编 辑
			</a>
			<a href="javascript:;" class="ml10 js_list_setStatus">
				<%= carStatusDesc%>
			</a>
		</td>
		<td title="<%= item.Id %>">
			<%= item.Id %>
		</td>
		<td title="<%= item.Name %>">
			<%= item.Name %>
		</td>
		<td title="<%= item.Ip %>">
			<%= item.Ip %>
		</td>
		<td title="<%= item.VehicleCount %>">
			<%= item.VehicleCount %>
		</td>
	</tr>
	<% } } %>
	</tbody>
</table>