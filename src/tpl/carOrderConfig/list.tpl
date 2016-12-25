<table class="table table-hover no-margin">
	<colgroup>
	<col width="4%" />
	<col width="6%" />
	<col width="6%" />
	<col width="6%" />
	<col width="6%" />
	<col width="6%" />
	<col width="12%" />
</colgroup>
<tbody>
	<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
	%>
	<tr data-vid="<%= item.Vid %>" data-plateno="<%= item.PlateNo %>">
		<td>
			<a href="javascript:" class="js_list_config">
				配置
			</a>
		</td>
		<td title="<%= item.PlateNo %>">
			<%= item.PlateNo %>
		</td>
		<td title="<%= item.WxFlag==0 ? '否': '是' %>">
			<%= item.WxFlag==0 ? '否': '是' %>
		</td>
		<td title="<%= item.PositionFlag==0 ? '否': '是' %>">
			<%= item.PositionFlag==0 ? '否': '是' %>
		</td>
		<td title="<%= item.VoiceFlag==0 ? '否': '是' %>">
			<%= item.VoiceFlag==0 ? '否': '是' %>
		</td>
		<td title="<%= item.ControlFlag==0 ? '否': '是' %>">
			<%= item.ControlFlag==0 ? '否': '是' %>
		</td>
		<td title="<%= item.SettingRemark %>">
			<%= item.SettingRemark %>
		</td>
	</tr>
	<% } } %>
	</tbody>
</table>