define(function(){return '<div class="panel panel-transparent no-margin full overflow-h"> <div class="panel-heading"> <h3 class="panel-title"> 历史位置查询 </h3> </div> <div class="panel-body pb0"> <div class="row"> <div class="col-sm-5"> <div class="panel panel-transparent no-margin"> <div class="panel-heading clearfix"> <h3 class="panel-title pull-left w-150"> 区域1 </h3> <div class="pull-right"> <a class="btn btn-primary relative t6 js-mark-first">标注区域</a> </div> </div> <div class="panel-body"> <form class="form-horizontal form-horizontal-patch form-horizontal-lg form-group-small-margin"> <div class=\'form-group\'> <label class="col-sm-2 control-label">最小经度</label> <div class="col-sm-10"> <label class="form-control"> 113.23123213 </label> </div> </div> <div class=\'form-group\'> <label class="col-sm-2 control-label">最小维度</label> <div class="col-sm-10"> <label class="form-control"> 33.3213 </label> </div> </div> <div class=\'form-group\'> <label class="col-sm-2 control-label required">最大经度</label> <div class="col-sm-10"> <label class="form-control"> 33.3213 </label> </div> </div> <div class=\'form-group\'> <label class="col-sm-2 control-label required">最大维度</label> <div class="col-sm-10"> <label class="form-control"> 33.3213 </label> </div> </div> </form> </div> </div> <div class="panel panel-transparent no-margin"> <div class="panel-heading clearfix"> <h3 class="panel-title pull-left w-150"> 区域2 </h3> <div class="pull-right"> <a class="btn btn-primary relative t6">标注区域</a> </div> </div> <div class="panel-body"> <form class="form-horizontal form-horizontal-patch form-horizontal-lg form-group-small-margin"> <div class=\'form-group\'> <label class="col-sm-2 control-label">最小经度</label> <div class="col-sm-10"> <label class="form-control"> 113.23123213 </label> </div> </div> <div class=\'form-group\'> <label class="col-sm-2 control-label">最小维度</label> <div class="col-sm-10"> <label class="form-control"> 33.3213 </label> </div> </div> <div class=\'form-group\'> <label class="col-sm-2 control-label required">最大经度</label> <div class="col-sm-10"> <label class="form-control"> 33.3213 </label> </div> </div> <div class=\'form-group\'> <label class="col-sm-2 control-label required">最大维度</label> <div class="col-sm-10"> <label class="form-control"> 33.3213 </label> </div> </div> </form> </div> </div> <div class="panel panel-transparent no-margin"> <div class="panel-heading"> <h3 class="panel-title"> 时间 </h3> </div> <div class="panel-body"> <form class="form-horizontal form-horizontal-patch form-horizontal-lg form-group-small-margin"> <div class=\'form-group\'> <label class="col-sm-2 control-label">开始时间</label> <div class="col-sm-10"> <label class="form-control"> 113.23123213 </label> </div> </div> <div class=\'form-group\'> <label class="col-sm-2 control-label">结束时间</label> <div class="col-sm-10"> <label class="form-control"> 33.3213 </label> </div> </div> </form> </div> </div> </div> <div class="col-sm-7"> <div id="historyMap" class="full"></div> </div> </div> <div class="row"> <div class="col-sm-12"> <div class="historyLocList"> <div class="panel no-margin flexbox"> <div class="panel-heading no-padding datatable-header"> <table class="table no-margin"> <colgroup> <col width="10px" /> <col width="20%" /> <col width="30%" /> <col width="30%" /> <col width="10%" /> </colgroup> <thead class="thin-border-bottom"> <tr> <th>序号</th> <th>车牌号码</th> <th>在区域1的时间</th> <th>在区域2的时间</th> <th>操作</th> </tr> </thead> </table> </div> <div id="historyLocationList" class="datatable-content panel-body no-padding grow"> </div> </div> </div> </div> </div> </div> </div> '});