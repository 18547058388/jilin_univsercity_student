<template>
	<view>
		<el-button icon="el-icon-back" circle type="primary" size="small" @click="goBack"></el-button>
		<el-table :data="studentChoiceList" stripe style="margin-top: 20px;">
			<el-table-column prop="schoolMajorName" label="专业"></el-table-column>
			<el-table-column prop="realName" label="姓名"></el-table-column>
			<el-table-column prop="createTime" label="选课时间"></el-table-column>
			<el-table-column prop="approvalStatus" label="状态">
				<template slot-scope="scope">
					<em v-if="scope.row.applyStatus == 1">待审核</em>
					<em v-if="scope.row.applyStatus == 2">已取消</em>
					<em v-if="scope.row.applyStatus == 3" style="color:#67C23A;">审核通过</em>
					<em v-if="scope.row.applyStatus == 4" style="color: #F56C6C;">审核驳回</em>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="驳回理由">
				<template slot-scope="scope">
					<view v-if="scope.row.applyStatus == 4">{{ scope.row.checkReason }}</view>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作">
				<template slot-scope="scope">
					<view style="display: flex;">
						<el-button v-if="scope.row.applyStatus == 1" @click="status(scope.row)" type="primary">通过</el-button>
						<el-button v-if="scope.row.applyStatus == 1" type="danger" @click="open(scope.row)">驳回</el-button>
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
			studentChoiceList: []
		};
	},
	mounted() {
		this.studentChoice();
	},
	props: {
		teacherCourseId: String
	},
	methods: {
		//返回
		goBack() {
			console.log(2561);
			uni.navigateBack();
		},
		/*
		 *选课详情
		 * teacherCourseId	教师关联课程主键
		 */
		studentChoice() {
			let self = this;
			this.loading = true;
			this.request.post({
				url: 'teacher/teacher/course/v1/student/choice',
				params: {
					teacherCourseId: this.teacherCourseId
				},
				success: response => {
					console.log(response);
					self.studentChoiceList = response.rtData.dts;
				},
				error: error => {
					console.log(error.errMsg);
				}
			});
		},
		/*
		 *通过
		 * studentCourseId 学生选课主键
		 * approvalStatus  审核状态
		 */
		status(scope) {
			console.log(scope);
			let self = this;
			this.loading = true;
			this.request.post({
				url: 'teacher/teacher/course/v1/approval',
				params: {
					studentCourseId: scope.studentCourseId,
					applyStatus: 3
				},
				success: response => {
					console.log(response);
					this.alert.showMessage('审批成功');
					 history.go(0);
				},
				error: error => {
					console.log(error.errMsg);
				}
			});
		},
		/*
		 *驳回
		 * studentCourseId 学生选课主键
		 * approvalStatus 审核状态
		 * checkReason	审核理由
		 */
		open(scope) {
			this.$prompt('请填写驳回理由', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputType:"textarea"
			}).then(({ value }) => {
				this.$message({
					type: 'success',
					message: '驳回成功'
				});
				let self = this;
				this.loading = true;
				this.request.post({
					url: 'teacher/teacher/course/v1/approval',
					params: {
						studentCourseId: scope.studentCourseId,
						applyStatus: 4,
						checkReason: value
					},
					success: response => {
						console.log(response);
						history.go(0);
					},
					error: error => {
						console.log(error.errMsg);
					}
				});
			});
			// .catch(() => {
			// 	this.$message({
			// 		type: 'info',
			// 		message: '取消输入'
			// 	});
			// });
		}
	}
};
</script>

<style></style>
