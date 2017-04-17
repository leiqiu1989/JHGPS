<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">车辆订单统计</h3>
    </div>
    <div class="panel-toolbar">
        <table class="table table-form-horizontal no-margin w-auto table-form-horizontal-patch">
            <tbody>
                <tr>
                    <td>
                        <input type="hidden" name="OrgNo" value="<%= searchValue.OrgNo %>" />
                        <label class="control-label">所属机构</label>
                        <input type="text" class="form-control w-200" name="orgName" placeholder="至少输入3个字符搜索" value="<%= searchValue.orgName%>" />
                        <ul class="ul-select hidden"></ul>
                    </td>
                    <td>
                        <label class="control-label">车牌号</label>
                        <input type="text" class="form-control w-200" name="PlateNo" placeholder="车牌号搜索" value="<%= searchValue.PlateNo %>" />
                    </td>
                    <td>
                        <label class="control-label">订单时间</label>
                        <input type="text" class="form-control w-150 inline-block" name="Stime" value="<%= searchValue.Stime %>" readonly="readonly" />
                        <span class="p15-lr">至</span>
                        <input type="text" class="form-control w-150 inline-block" name="Etime" value="<%= searchValue.Etime %>" readonly="readonly" />
                    </td>
                    <td class="pl20">
                        <a href="javascript:" class="btn btn-primary js_list_search mr10">查 询</a>
                        <a href="javascript:" class="btn btn-primary js_list_reset">重 置</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!--<div class="panel-toolbar form-inline">
        <div class="form-group btn-toolbar">
            <a class="btn btn-primary js_list_export">
                <i class="fa fa-download"></i> 导 出
            </a>
        </div>
    </div>-->
    <div class="panel-body row-container grow">
        <div class="row row-static">
            <div class="col-static col-xs-12 no-padding">
                <div class="panel no-margin flexbox">
                    <div class="panel-heading no-padding datatable-header">
                        <table class="table no-margin">
                            <colgroup>
                                <col width="12%" />
                                <col width="12%" />
                                <col width="14%" />
                                <col width="14%" />
                                <col width="8%" />
                                <col width="10%" />
                                <col width="10%" />
                            </colgroup>
                            <thead class="thin-border-bottom">
                                <tr>
                                    <th>所属机构</th>
                                    <th>车牌号码</th>
                                    <th>开始时间</th>
                                    <th>结束时间</th>
                                    <th>接单总量</th>
                                    <th>成功订单数</th>
                                    <th>完成率</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div id="orderSummaryList" class="datatable-content panel-body no-padding grow"></div>
                    <div class="panel-footer clearfix">
                        <div id="page" class="pull-right"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>