<div class="panel panel-transparent no-margin full overflow-x-h">
    <div class="panel-heading">
        <h3 class="panel-title"> 
            <ol class="breadcrumb no-padding no-margin bg-white">
                <li>地标点管理</li>
                <li class="active"><%= title %></li>
			</ol>
        </h3>
    </div>
    <div class="panel-body pb0">
        <div class="row-container-small-left">
            <div class="panel panel-transparent no-margin">
                <div class="panel-heading clearfix">
                    <h3 class="panel-title">
                        基本信息
                    </h3>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class='form-group'>
                                    <label class="col-sm-2 control-label required">名 称</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" name="LandMarkName" value="<%= data.LandMarkName %>" placeholder="最大长度为20个字符" />
                                    </div>
                                </div>
                            </div>                                                             
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class='form-group'>
                                    <label class="col-sm-2 control-label required">经度</label>
                                    <div class="col-sm-10">
                                        <label class="form-control js-lng">
                                            <%= data.Lng %>
                                        </label>
                                    </div>
                                </div>  
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class='form-group'>
                                    <label class="col-sm-2 control-label required">经度</label>
                                    <div class="col-sm-10">
                                        <label class="form-control js-lat">
                                            <%= data.Lat %>
                                        </label>
                                    </div>
                                </div>  
                            </div>                                
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class='form-group'>
                                    <label class="col-sm-2 control-label">备注</label>
                                    <div class="col-sm-10">
                                        <textarea name="Remark" placeholder="最大长度为50个字符" class="form-control" rows="5">
                                            <%= data.Remark %>
                                        </textarea>
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
                            <div class="col-sm-offset-2 col-sm-10">
                                <a class="btn btn-primary mr10 js-save">保 存</a>
                                <a class="btn btn-primary  js-cancel">取 消</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-container-small-right">
            <div class="mapToolbar">
                <input type="text" class="mapText" name="searchTxt" placeholder="输入地址定位" />
                <a href="javascript:" class="mapBtn mapBtnText js_mark_point_clear">清除标注</a>
                <a href="javascript:" class="mapBtn mapBtnText js_mark_point">标注地标点</a>
                <a href="javascript:" class="mapBtn mapBtnSearch js_search_map"></a>             
            </div>
            <div id="landMarkPointMap" style="width:100%;height:600px;" class="full">
            </div>
        </div>
    </div>
</div>
