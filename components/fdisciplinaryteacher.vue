<template>
	<!-- 审批学生违纪 -->
	<el-table :data="tableData" border stripe style="width:100%">
		<el-table-column prop="date" label="日期" width="100"></el-table-column>
		<el-table-column prop="name" label="姓名" width="120"></el-table-column>
		<el-table-column prop="applyReason" label="违纪原因" width="1350"></el-table-column>
		<el-table-column prop="shepi" label="操作" width="100">
			<template slot-scope="scope">
				<el-button @click="handleClick(scope.$index)"
				 type="primary" size="small"
				  style="margin-left: 10px;margin-bottom: 5px;">
				  同意</el-button>
				<el-button @click="jujueClick(scope.$index)" type="warning" size="small">拒绝</el-button>
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
					date: '2016-05-02',
					name: '王小虎',
					applyReason: '抽烟'
				},
				{
					date: '2016-07-05',
					name: '王小虎',
					applyReason: '喝酒'
				},
				{
					date: '2016-09-20',
					name: '王小虎',
					applyReason: '烫头'
				}
			]
		};
	}
};
</script>
