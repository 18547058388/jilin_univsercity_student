<template>
	<!-- 审批学生违纪 -->
	<el-table :data="tableData" border stripe style="width:100%" height="750">
		<el-table-column prop="createTime" label="日期" width="100"></el-table-column>
		<el-table-column prop="realName" label="姓名" width="120"></el-table-column>
		<el-table-column prop="disciplineDetail" label="违纪原因" width="200"></el-table-column>
		<el-table-column prop="shepi" label="操作" width="170">
			<template slot-scope="scope">
				<view style="display: flex;">
					<el-button
						@click="handleClick(scope.$index)"
						v-if="tableData[scope.$index].approvalStatus == 1"
						type="primary"
						size="small"
						style="margin-left: 10px;margin-bottom: 5px;"
					>
						同意
					</el-button>
					<el-button
						@click="jujueClick(scope.$index)"
						v-if="tableData[scope.$index].approvalStatus == 1"
						type="danger"
						size="small"
						style="margin-left: 10px;margin-bottom: 5px;"
					>
						拒绝
					</el-button>
					<el-button type="warning" v-if="tableData[scope.$index].approvalStatus == 2" style="margin-left: 10px;" size="small">已取消</el-button>
					<el-button type="success" v-if="tableData[scope.$index].approvalStatus == 3" style="margin-left: 10px;" size="small">审核通过</el-button>
					<el-button type="danger" v-if="tableData[scope.$index].approvalStatus == 4" style="margin-left: 10px;" size="small">审核驳回</el-button>
				</view>
			</template>
		</el-table-column>
	</el-table>
</template>
<script>
export default {
	methods: {
		handleClick(row) {
			this.request.post({
				url: 'teacher/teacher/discipline/history/v1/approval',
				params: {
					disciplineHistoryId: this.tableData[row].disciplineHistoryId,
					teacherId: '1252040511921938433',
					checkReason:'同意'
				},
				success: res => {
					console.log(res);
					this.request.post({
						url: 'teacher/teacher/discipline/history/v1/list',
						params: {},
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
			});
		},
		jujueClick(row) {
			this.$prompt('请输入驳回理由', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputType:"textarea"
			})
				.then(({ value }) => {
					if (value == '' || value == null) {
						this.$message('必须输入驳回理由');
					} else {
						this.request.post({
							url: 'teacher/teacher/discipline/history/v1/approval',
							params: {
								disciplineHistoryId: this.tableData[row].disciplineHistoryId,
								approvalStatus: 4,
								teacherId: '1252040511921938433',
								checkReason:value
							},
							success: res => {
								console.log(res);
								this.request.post({
									url: 'teacher/teacher/discipline/history/v1/list',
									params: {
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
						});

						this.$message({
							type: 'success',
							message: '驳回成功'
						});
					}
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
		}
	},
	data() {
		return {
			tableData: []
		};
	},
	mounted() {
		uni.showLoading({
			mask: true
		});
		this.request.post({
			url: 'teacher/teacher/discipline/history/v1/list',
			params: {},
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
		uni.hideLoading();
	}
};
</script>
