<table class="table table-hover no-margin">
    <colgroup>
        <col width="50px">
        <col width="10%">
        <col width="10%">
        <col width="10%">
        <col width="10%">
        <col width="22%">
        <col width="35%">
    </colgroup>
    <tbody>
        <% if(data && data.length >	0) {
            for(var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
        %>
        <tr>
            <td>
                <%= i+1 %>
            </td>
            <td>
                <%= item.GpsTime %>
            </td>
            <td>
                <%= item.Speed %>
            </td>
            <td>
                <%= item.Status %>
            </td>
            <td>
                <%= item.TotalDistance %>
            </td>
            <td>                                            
            </td>
            <td>
                <%= item.Location %>
            </td>		
        </tr>
        <% } } %>
    </tbody>
</table>