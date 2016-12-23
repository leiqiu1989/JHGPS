<div class="panel panel-transparent no-margin full flexbox">
    <div class="panel-heading">
        <h3 class="panel-title">
            <ol class="breadcrumb no-padding no-margin bg-white">
                <li>模板管理</li>
                <li class="active">新建模板</li>
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
            <div class="panel-heading clearfix">
                <div class="pull-left w-200">
                    <h3 class="panel-title">
                        第二步：编辑模板
                    </h3>
                </div>
                <div class="pull-right mt05-em">
                    <a class="btn btn-primary">
                        <i class="fa fa-check"></i> 生成模板
                    </a>
                </div>
            </div>
            <div class="panel-body grow row-container">
                <div class="row row-static">
                    <div class="col-static col-xs-9 no-padding overflow-y-h">
                        <div class="panel panel-transparent no-margin">
                            <div class="panel-heading">
                                <div class="panel-title">
                                    创建人：张三
                                </div>
                            </div>
                            <div class="panel-body">
                                <script id="editor" type="text/plain" style="width:100%;height:550px;"></script>
                            </div>
                        </div>
                    </div>
                    <div class="col-static col-xs-3 col-xs-offset-9 border-l no-padding">
                        <form class="frmEditTpl">
                            <div class="panel panel-transparent">
                                <div class="panel-body overflow-h">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="oil_Card">模板名称</label>
                                                <input class="form-control" disabled id="oil_Card" data-type="integer" name="oilCard" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="oil_Card">模板编号</label>
                                                <input class="form-control" disabled id="oil_Card" data-type="integer" name="oilCard" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="oil_Card">模板状态</label>
                                                <select class="form-control">
                                                    <option value="">可用</option>
                                                    <option value="">禁用</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="oil_Card">模板归属</label>
                                                <input class="form-control" id="oil_Card" data-type="integer" name="oilCard" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="oil_Card">备注</label>
                                                <textarea class="form-control" name="remark" rows="5" id="_remark"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>