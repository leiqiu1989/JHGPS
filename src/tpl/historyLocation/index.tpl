<div class="panel panel-transparent no-margin full overflow-x-h">
    <div class="panel-heading">
        <h3 class="panel-title"> 
            历史位置查询
        </h3>
    </div>
    <div class="panel-body pb0">
        <div class="row">
            <div class="col-sm-4">
                <div class="panel panel-transparent no-margin">
                    <div class="panel-heading clearfix">
                        <h3 class="panel-title pull-left w-150">
                                区域1
                            </h3>
                        <div class="pull-right">
                            <a class="btn btn-primary relative t6 js-clear-overlay">清空所有数据</a>
                        </div>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class='form-group'>
                                        <label class="col-sm-5 control-label">最小经度</label>
                                        <div class="col-sm-7">
                                            <label class="form-control js-firstPoint">
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class='form-group'>
                                        <label class="col-sm-5 control-label">最小维度</label>
                                        <div class="col-sm-7">
                                            <label class="form-control js-firstPoint">
                                            </label>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class='form-group'>
                                        <label class="col-sm-5 control-label">最大经度</label>
                                        <div class="col-sm-7">
                                            <label class="form-control js-firstPoint">
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class='form-group'>
                                        <label class="col-sm-5 control-label">最大维度</label>
                                        <div class="col-sm-7">
                                            <label class="form-control js-firstPoint">
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="panel panel-transparent no-margin">
                    <div class="panel-heading clearfix">
                        <h3 class="panel-title pull-left w-150">
                            区域2
                        </h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class='form-group'>
                                        <label class="col-sm-5 control-label">最小经度</label>
                                        <div class="col-sm-7">
                                            <label class="form-control js-secondPoint">
                                            </label>
                                        </div>
                                    </div>                                    
                                </div>
                                <div class="col-sm-6">
                                    <div class='form-group'>
                                        <label class="col-sm-5 control-label">最小维度</label>
                                        <div class="col-sm-7">
                                            <label class="form-control js-secondPoint">
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class='form-group'>
                                        <label class="col-sm-5 control-label">最大经度</label>
                                        <div class="col-sm-7">
                                            <label class="form-control js-secondPoint">
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class='form-group'>
                                        <label class="col-sm-5 control-label">最大维度</label>
                                        <div class="col-sm-7">
                                            <label class="form-control js-secondPoint">
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div> 
                <div class="panel panel-transparent no-margin">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            时间
                        </h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class='form-group'>
                                        <label class="col-sm-5 control-label required">开始时间</label>
                                        <div class="col-sm-7">
                                            <input type="text" class="form-control" name="startDate" readonly />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class='form-group'>
                                        <label class="col-sm-5 control-label required">结束时间</label>
                                        <div class="col-sm-7">
                                            <input type="text" class="form-control" name="endDate" readonly />
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </form>
                    </div>
                </div>
                <div class="panel panel-transparent">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="col-sm-offset-4 col-sm-8">
                                    <a class="btn btn-primary w-200 js-search">查 询</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div id="historyMap" class="full"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="historyLocList">
                    <div class="panel no-margin flexbox">
                        <div class="panel-heading no-padding datatable-header">
                            <table class="table no-margin">
                                <colgroup>
                                    <col width="10px" />
                                    <col width="20%" />
                                    <col width="30%" />
                                    <col width="30%" />
                                    <col width="10%" />
                                </colgroup>
                                <thead class="thin-border-bottom">
                                    <tr>
                                        <th>序号</th>
                                        <th>车牌号码</th>
                                        <th>在区域1的时间</th>
                                        <th>在区域2的时间</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div id="historyLocationList" class="datatable-content panel-body no-padding grow">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
