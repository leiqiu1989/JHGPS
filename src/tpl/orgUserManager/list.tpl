<table class="table table-hover no-margin">
	<colgroup>
		<col width="50px" />
		<col width="12%" />
		<col width="15%" />
		<col width="12%" />
		<col width="12%" />
		<col width="12%" />
		<col width="24%" />
		<col width="10%" />
</colgroup>
<tbody>
	<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
	%>
	<tr data-orgid="<%= item.OrgId %>">
		<td class="align-center">
			<input type="checkbox" name="checkItem" />
		</td>
		<td title="<%= item.OrganizationName %>">
			<%= item.OrganizationName %>
		</td>
		<td title="<%= item.ParentOrgName %>">
			<%= item.ParentOrgName %>
		</td>
		<td title="<%= item.Manager %>">
			<%= item.Manager %>
		</td>
		<td title="<%= item.Principal %>">
			<%= item.Principal %>
		</td>
		<td title="<%= item.PrincipalPhone %>">
			<%= item.PrincipalPhone %>
		</td>
		<td title="<%= item.UserNames %>">
			<%= item.UserNames %>
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
	</tr>
	<% } } %>
	</tbody>
</table>