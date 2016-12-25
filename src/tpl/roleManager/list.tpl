<table class="table table-hover no-margin">
	<colgroup>
	<col width="3%" />
	<col width="5%" />
	<col width="8%" />
	<col width="8%" />
	<col width="12%" />
</colgroup>
<tbody>
	<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
	%>
	<tr data-truckid="2" data-orgid="<%= item.orgId %>" data-uniqueids="<%= item.uniqueId %>">
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
		<td title="<%= item.OrgNo %>">
			<%= item.OrgNo %>
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