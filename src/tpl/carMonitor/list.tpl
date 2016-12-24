<table class="table table-hover no-margin">
	<colgroup>
    <col width="50px" />
    <col width="10%" />
    <col width="8%" />
    <col width="12%" />
    <col width="10%" />
    <col width="12%" />
    <col width="10%" />
    <col width="35%" />
</colgroup>
<tbody>
    <% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];

	%>
	<tr data-flag="tr_monitor_<%= item.PlateNo %>">
		<td>
			<%= i+1 %>
		</td>
		<td>
            <a class="td-a js_car_info">查看资料</a>
            |
            <a class="td-a js_track_replay" data-id="<%= item.Vid %>" data-plate="<%= item.PlateNo %>">轨迹回放</a>
        </td>
		<td title="<%= item.PlateNo %>">
			<%= item.PlateNo %>
		</td>
		<td title="<%= item.GpsTime %>">
			<%= item.GpsTime %>
		</td>
		<td title="<%= item.Speed %>">
			<%= item.Speed %>
		</td>
		<td>
            未知
		</td>
		<td title="<%= directForm(item.Direction) %>">
			<%= directForm(item.Direction) %>
		</td>
		<td title="<%= item.Location %>">
			<%= item.Location %>
		</td>		
	</tr>
	<% } } %>
</tbody>
</table>