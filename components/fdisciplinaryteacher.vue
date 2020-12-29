<template>
	<!-- 审批学生违纪 -->
	<el-table :data="tableData" border stripe style="width:100%" height="750">
		<el-table-column prop="date" label="日期" width="100"></el-table-column>
		<el-table-column prop="name" label="姓名" width="120"></el-table-column>
		<el-table-column prop="applyReason" label="违纪原因" width="200"></el-table-column>
		<el-table-column prop="shepi" label="操作" width="170">
			<template slot-scope="scope">
				<view style="display: flex;">
					<el-button @click="handleClick(scope.$index)" type="primary" size="small" style="margin-left: 10px;margin-bottom: 5px;">同意</el-button>
					<el-button @click="jujueClick(scope.$index)" type="danger" size="small" style="margin-left: 10px;margin-bottom: 5px;">拒绝</el-button>
				</view>
			</template>
		</el-table-column>
	</el-table>
</template>
<script>
export default {
	methods: {
		handleClick(row) {
			console.log(row);
		},
		jujueClick(row) {
			console.log(row);
			this.$confirm('是否确认拒绝?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.tableData.splice(row, 1);
					this.$message('已拒绝');
				})
				.catch(() => {
					this.$message('已取消拒绝');
				});
		}
	},
	data() {
		return {
			tableData: [
				{
					date: '',
					name: '',
					applyReason: ''
				}
			]
		};
	},
	mounted() {
		uni.showLoading({
			mask: true
		});
		this.request.post({
			url: 'teacher/teacher/approval/v1/list',
			params: {
				applyStatus: 1,
				applyType: 14 //????????????????????????????教师查询学生违纪
			},
			success: res => {
				console.log(res);
				if (res.rtData.dts == '') {
					this.tableData = '';
				} else {
				this.tableData=res.rtData.dts
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
