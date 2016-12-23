<table class="table table-hover no-margin">
	<colgroup>
	<col width="10%x" />
	<col width="10%" />
	<col width="11%" />
	<col width="11%" />
	<col width="13%" />
	<col width="8%" />
	<col width="8%" />
	<col width="13%" />
	<col width="8%" />
	<col width="8%" />
</colgroup>
<tbody>
	<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
	%>
	<tr data-id="<%= item.id %>">
		<td title="<%= item.plateNumber %>">
			<%= item.plateNumber %>
		</td>
		<td title="<%= item.uniqueId %>">
			<%= item.uniqueId %>
		</td>
		<td title="<%= item.orgName %>">
			<%= item.orgName %>
		</td>
		<td title="<%= formateDate(item.reportTime,'yyyy/MM/dd hh:mm:ss') %>">
			<%= formateDate(item.reportTime,'yyyy/MM/dd hh:mm:ss') %>
		</td>
		<td title="<%= item.faultDesc %>">
			<%= item.faultDesc %>
		</td>
		<td title="<%= deviceFaultProcessDesc(item.progress) %>">
			<%= deviceFaultProcessDesc(item.progress) %>
		</td>
		<td title="<%= item.operatorName %>">
			<%= item.operatorName %>
		</td>
		<td title="<%= item.operateDesc %>">
			<%= item.operateDesc %>
		</td>
		<td title="<%= formateDate(item.updateTime,'yyyy/MM/dd hh:mm:ss') %>">
			<%= formateDate(item.updateTime,'yyyy/MM/dd hh:mm:ss') %>
		</td>
		<td>
			<% if(item.progress != 3) { %>
			<a class="td-operator js-list-process" data-process="true">
				<i class="fa fa-check"></i>
				处 理
			</a>
			<% } %>
			<a class="td-operator js-list-detail" data-process="false">
				<i class="fa fa-eye"></i>
				查 看
			</a>
		</td>
	</tr>
	<% } } %>
	</tbody>
</table>