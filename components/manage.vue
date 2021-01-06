<template>
	<view>
		<!-- 表格 -->
		<el-table :data="applList" stripe style="width: 100%">
			<el-table-column prop="createTime" label="日期"></el-table-column>
			<el-table-column prop="realName" label="姓名" width="180"></el-table-column>
			<el-table-column prop="schoolMajorName" label="专业" width="180"></el-table-column>
			<el-table-column prop="applyReason" label="申请原因"></el-table-column>
			<el-table-column prop="applyStatus" label="状态">
				<template slot-scope="scope">
					<em v-if="scope.row.applyStatus == 1" style="color: #67C23A;">待审核</em>
					<em v-if="scope.row.applyStatus == 2">已取消</em>
					<em v-if="scope.row.applyStatus == 3" style="color: #67C23A;">审核通过</em>
					<em v-if="scope.row.applyStatus == 4" style="color: #F56C6C;">审核驳回</em>
				</template>
			</el-table-column>
			<!-- 审批 -->
			<el-table-column label="操作">
				<template slot-scope="scope">
					<view v-if="scope.row.applyStatus == 1" style="display: flex;">
						<el-button type="primary" @click="status(scope.row)" size="mini">通过</el-button>
						<el-button type="danger" @click="open(scope.row)" size="mini">驳回</el-button>
					</view>
				</template>
			</el-table-column>
		</el-table>
	</view>
</template>

<script>
export default {
	data() {
		return {
			applList: []
		};
	},
	mounted() {
		this.getcchange();
	},
	methods: {
		/* 调接口，查学生申请 */
		getcchange() {
			let self = this;
			self.request.post({
				url: 'teacher/teacher/approval/v1/list',
				params: {
					applyType: 3
				},
				success: response => {
					self.applList = response.rtData.dts;
				},

				error: error => {
					console(error.errMsg);
				}
			});
		},
		/* 驳回申请 按钮*/
		open(scope) {
			this.$prompt('请填写驳回理由', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputType:"textarea"
			})
				.then(({ value }) => {
					this.$message({
						type: 'success',
						message: '驳回成功'
					});
					let self = this;
					this.loading = true;
					this.request.post({
						url: 'teacher/teacher/approval/v1/apply',
						params: {
							teacherId: 1252040511921938433,
							applyStatus: 4,
							studentApplyId: scope.studentApplyId,
							checkReason: value,
							inputType:"textarea"
						},
						success: response => {
							console.log(response);
						},
						error: error => {
							console.log(error.errMsg);
						}
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
		},
		//审批状态，同意申请
		status(scope) {
			let self = this;
			this.loading = true;
			this.request.post({
				url: 'teacher/teacher/approval/v1/apply',
				params: {
					teacherId: 1252040511921938433,
					applyStatus: 3,
					studentApplyId: scope.studentApplyId,
					checkReason: '同意'
				},
				success: response => {
					console.log(scope.studentApplyId);
					console.log(response);
				},
				error: error => {
					console.log(error.errMsg);
				}
			});
		}
	}
};
</script>

<style></style>
