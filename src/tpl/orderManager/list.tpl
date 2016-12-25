<table class="table table-hover no-margin">
	<colgroup>
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
		<td title="<%= item.OrderNum %>">
			<!-- <a href="javascript:" class="js_list_detail">
				<%= item.PlateNo %>
			</a> -->
			<%= item.OrderNum %>
		</td>
		<td title="<%= item.Phone %>">
			<%= item.Phone %>
		</td>
		<td title="<%= item.CreateTime %>">
			<%= item.CreateTime %>
		</td>
		<td title="<%= item.OrderType %>">
			<% if(item.OrderType == 1){ %>
				 位置订单
			<% }else if(item.OrderType == 2){%>
				 语音订单
			<% }else if(item.OrderType == 4){ %>
				微信订单
			<% } %>
		</td>
		<td>
			<a href="javascript:" data-path="<%= item.FilePath %>" class="js_list_detail">
				<% if(item.OrderType == 1||item.OrderType == 4){ %>
				 <a href="javascript:" class="js_list_detail" data-Lat="<%= item.Lat%>" data-Lng="<%= item.Lng%>">查看位置</a>
				<% }else if(item.OrderType == 2){%>
					<audio src="<%= item.FilePath%>" controls="controls">你的浏览器不支持此音频格式</audio>
				<% } %>
			</a>
		</td>
		<td title="<%= item.PlateNo %>">
			<%= item.PlateNo %>
		</td>
		<td title="<%= item.TakeTime %>">
			<%= item.TakeTime %>
		</td>
		<td title="<%= item.TakePosition %>" class="<%= stopCls %>">
			<%= item.TakePosition %>
		</td>
		<!-- <td title=<%= formateDate(item.ETime) %> class=<%= endTimeCls %>
			<%= formateDate(item.ETime) %>
		</td> -->
		<td title="<%= item.OrderResult %>">
			<%= item.OrderResult %>
		</td>
	</tr>
	<% } } %>
	</tbody>
</table>