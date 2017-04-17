<table class="table table-hover no-margin">
    <colgroup>
        <col width="12%" />
        <col width="12%" />
        <col width="14%" />
        <col width="14%" />
        <col width="8%" />
        <col width="10%" />
        <col width="10%" />
    </colgroup>
    <tbody>
        <% if(data && data.length >	0) {
		for(var i = 0 , len = data.length; i < len; i++) {
			var item = data[i];
	%>
            <tr>
                <td title="<%= item.OrgName %>">
                    <%= item.OrgName %>
                </td>
                <td title="<%= item.PlateNo %>">
                    <%= item.PlateNo %>
                </td>
                <td title="<%= item.Stime %>">
                    <%= item.Stime %>
                </td>
                <td title="<%= item.Etime %>">
                    <%= item.Etime %>
                </td>
                <td title="<%= item.Total %>">
                    <%= item.Total %>
                </td>
                <td title="<%= item.Success %>">
                    <%= item.Success %>
                </td>
                <td title="<%= item.Percent %>">
                    <%= item.Percent %>
                </td>
            </tr>
            <% } } %>
    </tbody>
</table>