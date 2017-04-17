<table class="table table-hover no-margin">
    <colgroup>
        <col width="10%" />
        <col width="70%" />
        <col width="8%" />
        <col width="12%" />
    </colgroup>
    <tbody>
        <% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
	%>
            <tr>
                <td title="<%= item.PlateNo %>">
                    <%= item.PlateNo %>
                </td>
                <td title="<%= item.LogInfo %>">
                    <%= item.LogInfo %>
                </td>
                <td title="<%= item.UserName %>">
                    <%= item.UserName %>
                </td>
                <td title="<%= item.CreateTime %>">
                    <%= item.CreateTime %>
                </td>
            </tr>
            <% } } %>
    </tbody>
</table>