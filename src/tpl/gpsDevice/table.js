define(function(){return '<div class="panel no-margin flexbox"> <div class="panel-heading no-padding datatable-header"> <table class="table no-margin"> <colgroup> <col width="50px" /> <col width="10%" /> <col width="6%" /> <col width="8%" /> <col width="11%" /> <col width="11%" /> <col width="11%" /> <col width="11%" /> <col width="11%" /> <col width="5%" /> <col width="13%" /> </colgroup> <thead class="thin-border-bottom"> <tr> <th class="align-center"> <input type="checkbox" name="checkAll" /> </th> <th>GPS设备编号</th> <th>是否销售</th> <th>设备型号</th> <th>绑定车辆</th> <th>所属机构</th> <th>SIM卡号码</th> <th>销售日期</th> <th>套餐到期日期</th> <th>设备状态</th> <th>操 作</th> </tr> </thead> </table> </div> <div class="datatable-content panel-body no-padding grow"> <table class="table table-hover no-margin"> <colgroup> <col width="50px" /> <col width="10%" /> <col width="6%" /> <col width="8%" /> <col width="11%" /> <col width="11%" /> <col width="11%" /> <col width="11%" /> <col width="11%" /> <col width="5%" /> <col width="13%" /> </colgroup> <tbody> <% if(data && data.length > 0) { for(var i = 0 , len = data.length; i < len; i++) { var item = data[i]; %> <tr data-truckid="<%= item.truckId %>" data-uniqueid="<%= item.uniqueId%>" data-status="<%=item.status%>"> <td class="align-center"> <input type="checkbox" name="checkItem" /> </td> <td title="<%= item.uniqueId %>"> <a href="javascript:" class="js_gpsDevice_list_detail"> <%= item.uniqueId %> </a> </td> <td title="<%= item.statusDesc %>"> <%= item.statusDesc %> </td> <td title="<%= item.name %>"> <%= item.name %> </td> <td title="<%= item.plateNumber %>"> <%= item.plateNumber %> </td> <td title="<%= item.orgName %>"> <%= item.orgName %> </td> <td title="<%= item.simCard %>"> <%= item.simCard %> </td> <td title="<%= sliceDate(item.saleTime) %>"> <%= sliceDate(item.saleTime) %> </td> <td title="<%= sliceDate(item.endTime) %>"> <%= sliceDate(item.endTime) %> </td> <td title="<%= item.avlStatus %>"> <%= item.avlStatus %> </td> <td> <a class="td-operator js-list-sellSingle"> <i class="fa fa-shopping-cart"></i> 售 卖 </a> <a class="td-operator js-list-unbindSingle" > <i class="fa fa-times"></i> 解 绑 </a> <a class="td-operator js-list-edit" > <i class="fa fa-pencil-square-o"></i> 编 辑 </a> </td> </tr> <% } } %> </tbody> </table> </div> <div class="panel-footer clearfix"> <div id="page" class="pull-right"></div> </div> </div>'});