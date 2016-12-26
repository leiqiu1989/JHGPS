<div class="track-container">
    <div id="trackMap" class="full"></div>
    <div id="trackToolBar">
        <div class="track-back js-track-back">返 回</div>
        <div class="track-search">
            <div class="inline-block">
                <span>车牌牌照：</span>
                <input type="hidden" name="Vid" />
                <select class="form-control w-200" name="selectCarList" data-placeholder="请选择...">
                </select>
            </div>
            <div class="inline-block ml10">
                <span>开始时间：</span>
                <input type="text" class="normalText" id="startDate" readonly />
            </div>
            <div class="inline-block ml10">
                <span>结束时间：</span>
                <input type="text" class="normalText" id="endDate" readonly />
            </div>
            <div class="inline-block ml10">
                <a class="btn-basic-default js-search-history"> 查 询 </a>
            </div>
        </div>
    </div>
    <div class="track-list">
            <div class="track-range">
                <div class="track-process">
                    <div class="track-range-point"></div>
                </div>
            </div>
            <div class="track-play">
                <span class="trackPlay-btn"></span>
                <span class="track-time"></span>
                <span class="track-speed-slow">慢</span>
                <span class="track-speed-side">
                    <span class="track-speed-width">
                        <span class="track-speed-point" id="speed_point" name="run_point"></span>
                </span>
                </span>
                <span class="track-speed-fast">快</span>
            </div>
            <div class="track-list-info">
                <div class="track-list-info-choice">
                    <span class="track-list-info-choice-point" name="list_point">
                    轨迹点
                </span>
                    <span class="track-list-info-toggle js-toggle-list"></span>
                </div>
                <div class="track-list-data">
                    <div class="panel no-margin flexbox">
                        <div class="panel-heading no-padding datatable-header">
                            <table class="table no-margin">
                                <colgroup>
                                    <col width="50px">
                                    <col width="10%">
                                    <col width="10%">
                                    <col width="10%">
                                    <col width="10%">
                                    <col width="22%">
                                    <col width="35%">
                                </colgroup>
                                <thead class="thin-border-bottom">
                                    <tr>
                                        <th>序号</th>
                                        <th>GPS时间</th>
                                        <th>速度(Km/h)</th>
                                        <th>状态</th>
                                        <th>里程</th>
                                        <th>警情</th>
                                        <th>位置</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div id="track-history-list" class="datatable-content panel-body no-padding grow">                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>