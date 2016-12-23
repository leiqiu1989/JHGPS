<div class="panel panel-transparent no-margin full flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">
            <ol class="breadcrumb no-padding no-margin bg-white">
                <li>模板管理</li>
                <li class="active">模板详情</li>
            </ol>
        </h3>
    </div>
    <div class="panel-toolbar form-inline">
        <div class="form-group btn-toolbar">
            <a class="btn btn-default js_tpl_back">
                <i class="fa fa-reply"></i> 返 回
            </a>
        </div>
    </div>
    <div class="panel-body grow">
        <div class="panel panel-default no-margin full flexbox">
            <div class="panel-toolbar form-inline clearfix">
                <div class="form-group btn-toolbar">
                    <a class="btn btn-primary">
                        <i class="fa fa-plus"></i> 新建版本
                    </a>
                </div>
                <div class="pull-right">
                    <label class="control-label pr10">模板版本</label>
                    <select name="selVersion" class="form-control w-100">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>
            <div class="panel-body grow row-container">
                <div class="row row-static">
                    <div class="col-static col-xs-10 no-padding overflow-y-h">
                        <div class="panel panel-transparent no-margin">
                            <div class="panel-heading">
                                <div class="panel-title">
                                    <span class="panel-title-lineDetail">创建人：张三</span>
                                    <span class="panel-title-lineDetail">创建时间：张三</span>
                                    <span class="panel-title-lineDetail">修改时间：张三</span>
                                </div>
                            </div>
                            <div class="panel-body">
                                <%= data.content %>
                            </div>
                        </div>
                    </div>
                    <div class="col-static col-xs-2 col-xs-offset-10 border-l no-padding">
                        <div class="panel panel-transparent">
                            <div class="panel-body overflow-h">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>模板名称</label>
                                            <label class="form-control"><%= data.templateName %></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>模板编号</label>
                                            <label class="form-control"><%= data.serialNo %></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>模板状态</label>
                                            <label class="form-control"><%= data.statusDesc %></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>模板归属</label>
                                            <label class="form-control"><%= data.serviceName %></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>备注</label>
                                            <label class="form-control textarea-label"><%= data.description %></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>