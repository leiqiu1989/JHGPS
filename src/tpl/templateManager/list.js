define(function(){return '<table class="table table-hover no-margin"> <colgroup> <col width="50px" /> <col width="14%" /> <col width="9%" /> <col width="9%" /> <col width="10%" /> <col width="15%" /> <col width="14%" /> <col width="15%" /> <col width="11%" /> </colgroup> <tbody> <% if(data && data.length > 0) { for(var i = 0 , len = data.length; i < len; i++) { var item = data[i]; %> <tr data-id="<%= item.id %>" data-status="<%= item.status %>"> <td class="align-center"> <input type="checkbox" name="checkItem" /> </td> <td title="<%= item.templateName %>"> <%= item.templateName %> </td> <td title="<%= item.statusDesc %>"> <%= item.statusDesc %> </td> <td title="<%= item.serialNo %>"> <%= item.serialNo %> </td> <td title="<%= item.versionCode %>"> <%= item.versionCode %> </td> <td title="<%= item.serviceName %>"> <%= item.serviceName %> </td> <td title="<%= formateDate(item.createTime) %>"> <%= formateDate(item.createTime) %> </td> <td title="<%= formateDate(item.updateTime) %>"> <%= formateDate(item.updateTime) %> </td> <td> <a class="td-operator js_list_edit"> <i class="fa fa-pencil-square-o"></i> 编 辑 </a> <a class="td-operator js_list_delete"> <i class="fa fa-remove"></i> 删 除 </a> <a class="td-operator js_list_detail"> <i class="fa fa-eye"></i> 查 看 </a> </td> </tr> <% } } %> </tbody> </table>'});