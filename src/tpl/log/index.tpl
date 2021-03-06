<div class="panel panel-transparent flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">系统日志</h3>
    </div>
    <div class="panel-toolbar">
        <table class="table table-form-horizontal no-margin w-auto table-form-horizontal-patch">
            <tbody>
                <tr>
                    <td>
                        <label class="control-label">用户名</label>
                        <input type="text" class="form-control w-200" name="UserName" placeholder="" value="<%= searchValue.UserName%>" />
                    </td>
                    <td>
                        <label class="control-label">车牌号</label>
                        <input type="text" class="form-control w-200" name="PlateNo" placeholder="" value="<%= searchValue.PlateNo %>" />
                    </td>
                    <td>
                        <label class="control-label">操作时间</label>
                        <input type="text" class="form-control w-150 inline-block" name="Start" value="<%= searchValue.Start %>" readonly="readonly" />
                        <span class="p15-lr">至</span>
                        <input type="text" class="form-control w-150 inline-block" name="End" value="<%= searchValue.End %>" readonly="readonly" />
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
                                <col width="10%" />
                                <col width="70%" />
                                <col width="8%" />
                                <col width="12%" />
                            </colgroup>
                            <thead class="thin-border-bottom">
                                <tr>
                                    <th>车牌号</th>
                                    <th>操作内容</th>
                                    <th>用户</th>
                                    <th>操作时间</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div id="logList" class="datatable-content panel-body no-padding grow"></div>
                    <div class="panel-footer clearfix">
                        <div id="page" class="pull-right"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>