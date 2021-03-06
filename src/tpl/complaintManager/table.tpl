<div class="panel no-margin flexbox">
    <div class="panel-heading no-padding datatable-header">
        <table class="table no-margin">
            <colgroup>
                <col width="15%" />
                <col width="15%" />
                <col width="15%" />
                <col width="15%" />
                <col width="15%" />
                <col width="25%" />
            </colgroup>
            <thead class="thin-border-bottom">
                <tr>
                    <th>订单编号</th>
					<th>投诉类型</th>
					<th>投诉时间</th>
					<th>投诉人</th>
					<th>被投诉人</th>
					<th>投诉原因</th>
                </tr>
            </thead>
        </table>
    </div>
    <div class="datatable-content panel-body no-padding grow">
        <table class="table table-hover no-margin">
            <colgroup>
                <col width="15%" />
                <col width="15%" />
                <col width="15%" />
                <col width="15%" />
                <col width="15%" />
                <col width="25%" />
            </colgroup>
            <tbody>
                <% if(data && data.length >	0) {
					for(var i = 0 , len = data.length; i < len; i++) {
								var item = data[i];
								var reason = item.Style + (item.Info ? '&nbsp;('+item.Info+')' : ''); 
				%>
			<tr>
				<td title="<%= item.OrderNum %>">
					<%= item.OrderNum %>
				</td>
				<td title="<%= item.ComplaintType %>">
					<%= item.ComplaintType %>
				</td>
				<td title="<%= item.CreateTime %>">
					<%= item.CreateTime %>
				</td>
				<td title="<%= item.From %>">
					<%= item.From %>
				</td>
				<td title="<%= item.To %>">
					<%= item.To %>
				</td>
				<td title="<%= reason %>">
					<%= reason %>
				</td>				
			</tr>
			<% } } %>
            </tbody>
        </table>
    </div>
    <div class="panel-footer clearfix">
		<div id="page" class="pull-right"></div>
	</div>
</div>