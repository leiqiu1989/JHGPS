<table class="table table-hover no-margin">
	<colgroup>
	<col width="20%" />
	<col width="20%" />
	<col width="20%" />
	<col width="15%" />
	<col />
	<col width="10%" />
</colgroup>
<tbody>
	<% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
	%>
	<tr data-id="<%= item.id %>" data-status="<%= item.status %>">
		<td title="<%= item.username %>">
			<%= item.username %>
		</td>
		<td title="<%= item.name %>">
			<%= item.name %>
		</td>
		<td title="<%= item.mobile %>">
			<%= item.mobile %>
		</td>
		<td title="<%= userStatus(item.status) %>">
			<%= userStatus(item.status) %>
		</td>
		<td title="<%= item.lastLoginTime %>">
			<%= item.lastLoginTime %>
		</td>
		<td>
			<% if(item.status == 0){ %>
				<a class="td-operator js_changStatus">
					<i class="fa fa-star"></i>
					启 用
				</a>
			<% }else if(item.status == 1){ %>
				<a class="td-operator js_changStatus">
					<i class="fa fa-star-o"></i>
					停 用
			</a>
			<% } %>
		</td>
	</tr>
	<% } } %>
	</tbody>
</table>