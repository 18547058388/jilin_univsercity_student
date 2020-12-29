<template>
	<!-- 查阅学生假日去向 -->
	<el-table :data="tableData" border stripe height="750" style="width: 100%">
		<!-- 以下的prop绑定的是接口返回的数组中对象的key -->
		<el-table-column prop="createTime" label="日期" width="100"></el-table-column>
		<el-table-column prop="realName" label="姓名" width="120"></el-table-column>
		<el-table-column prop="applyReason" label="假日去向" width="200"></el-table-column>
		<el-table-column prop="shepi" label="操作" width="170">
			<template slot-scope="scope">
				<view style="display: flex;">
					<el-button @click="handleClick(scope.$index)" type="primary" size="small" style="margin-left: 10px;margin-bottom: 5px;">同意</el-button>
					<el-button @click="handleClickjujue(scope.$index)" type="danger" size="small" style="margin-left: 10px;margin-bottom: 5px;">拒绝</el-button>
				</view>
			</template>
		</el-table-column>
	</el-table>
</template>
<script>
export default {
	methods: {
		handleClickjujue(row) {
			this.request.post({
				url: 'teacher/teacher/approval/v1/apply',
				params: {
					applyStatus: 4,
					studentApplyId: this.tableData[row].studentApplyId
				},
				success: res => {
					console.log(res);

					uni.showLoading({
						mask: true
					});
					this.request.post({
						url: 'teacher/teacher/approval/v1/list',
						params: {
							teacher: '1252040511921938433',
							applyStatus: 1,
							applyType: 4
						},
						success: res => {
							console.log(res);
							if (res.rtData.dts == '') {
								this.tableData = '';
							} else {
								this.tableData = res.rtData.dts;
							}
							uni.hideLoading();
						},
						error: err => {
							console.log(err);
						}
					});
				},
				error: err => {
					console.log(err);
				}
			});
			console.log(row);
			console.log(this.tableData[row].studentApplyId);
		},
		handleClick(row) {
			this.request.post({
				url: 'teacher/teacher/approval/v1/apply',
				params: {
					applyStatus: 3,
					studentApplyId: this.tableData[row].studentApplyId
				},
				success: res => {
					console.log(res);

					uni.showLoading({
						mask: true
					});
					this.request.post({
						url: 'teacher/teacher/approval/v1/list',
						params: {
							teacher: '1252040511921938433',
							applyStatus: 1,
							applyType: 4
						},
						success: res => {
							console.log(res);
							if (res.rtData.dts == '') {
								this.tableData = '';
							} else {
								this.tableData = res.rtData.dts;
							}
							uni.hideLoading();
						},
						error: err => {
							console.log(err);
						}
					});
				},
				error: err => {
					console.log(err);
				}
			});
			console.log(row);
			console.log(this.tableData[row].studentApplyId);
		}
	},
	data() {
		return {
			//列表数组
			tableData: []
		};
	},
	mounted() {
		uni.showLoading({
			mask: true
		});
		this.request.post({
			url: 'teacher/teacher/approval/v1/list',
			params: {
				teacher: '1252040511921938433',
				applyStatus: 1,
				applyType: 4
			},
			success: res => {
				console.log(res);
				if (res.rtData.dts == '') {
					this.tableData = '';
				} else {
					this.tableData = res.rtData.dts;
				}
				uni.hideLoading();
			},
			error: err => {
				console.log(err);
			}
		});
	}
};
</script>
