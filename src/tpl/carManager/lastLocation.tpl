<form class="form-horizontal">
	<div class="row">
		<div class="col-sm-3">
			<div class="form-group">
				<label class="col-sm-5 control-label">GPS时间</label>
				<div class="col-sm-7">
					<label class="control-label-text-bootstrap" title="<%= location.locationTime %>">
						<%= location.locationTime %>
					</label>
				</div>
			</div>
		</div>
		<div class="col-sm-3">
			<div class="form-group">
				<label class="col-sm-5 control-label">行驶速度</label>
				<div class="col-sm-7">
					<label class="control-label-text-bootstrap">
						<%= location.speed %>Km/h
					</label>
				</div>
			</div>
		</div>
		<div class="col-sm-3">
			<div class="form-group">
				<label class="col-sm-5 control-label">行驶方向</label>
				<div class="col-sm-7">
					<label class="control-label-text-bootstrap">
						<%= location.directionName %>
					</label>
				</div>
			</div>
		</div>
		<div class="col-sm-3">
			<div class="form-group">
				<label class="col-sm-5 control-label">车辆状态</label>
				<div class="col-sm-7">
					<label class="control-label-text-bootstrap">
						<%= location.status %>
					</label>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-sm-3">
			<div class="form-group">
				<label class="col-sm-5 control-label">车辆警情</label>
				<div class="col-sm-7">
					<label class="control-label-text-bootstrap" title="<%= location.alarmDesc %>">
						<%= location.alarmDesc %>
					</label>
				</div>
			</div>
		</div>
		<div class="col-sm-3">
			<div class="form-group">
				<label class="col-sm-5 control-label">当日里程</label>
				<div class="col-sm-7">
					<label class="control-label-text-bootstrap">
						<%= location.mileage %>Km
					</label>
				</div>
			</div>
		</div>
		<div class="col-sm-3">
			<div class="form-group">
				<label class="col-sm-5 control-label">累计里程</label>
				<div class="col-sm-7">
					<label class="control-label-text-bootstrap">
						<%= location.totalMileage %>Km
					</label>
				</div>
			</div>
		</div>
		<div class="col-sm-3">
			<div class="form-group">
				<label class="col-sm-5 control-label">车辆位置</label>
				<div class="col-sm-7">
					<label class="control-label-text-bootstrap" title="<%= location.location %>">
						<%= location.location %>
					</label>
				</div>
			</div>
		</div>
	</div>
</form>