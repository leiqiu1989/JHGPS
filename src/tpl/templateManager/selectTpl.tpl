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
                    <h3 class="panel-title">第一步：选择模板</h3>
                </div>
                <div class="pull-right mt05-em">
                    <a class="btn btn-default js_tpl_next">
                        <i class="fa fa-arrow-down"></i> 下一步
                    </a>
                </div>
            </div>
            <div class="panel-body grow row-container">
                <div class="row row-static">
                    <div class="col-static col-xs-3 border-r no-padding">
                        <ul class="list-group list-group-patch">
                            <li class="list-group-item list-group-item-patch">模板列表</li>
                            <% 
                                for(var i = 0;i < list.length;i++) { 
                                    var item= list[i];
                            %>
                            <li class="list-group-item">
                                <div class="radio">
                                    <label>
                                        <input type="radio" name="radioTpl" value="<%= item.id %>"> <%= item.templateName %>
                                    </label>
                                </div>
                            </li>
                            <% } %>
                        </ul>
                    </div>
                    <div class="col-static col-xs-9 col-xs-offset-3 no-padding">
                        <div class="panel panel-transparent">
                            <div class="panel-heading">
                                <div class="panel-title">
                                    模板预览
                                </div>
                            </div>
                            <div class="panel-body" id="tplDetail">                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
