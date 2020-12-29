<template>
	<!-- 审批违纪解除 -->
	<el-table :data="tableData" border stripe height="750" style="width: 100%">
		<el-table-column prop="date" label="日期" width="100"></el-table-column>
		<el-table-column prop="name" label="姓名" width="120"></el-table-column>
		<el-table-column prop="applyReason" label="违纪解除原因" width="200"></el-table-column>
		<el-table-column prop="shepi" label="操作" width="170">
			<template slot-scope="scope">
				<view style="display: flex;">
					<el-button @click="handleClick(scope.row)" type="primary" size="small" style="margin-left: 10px;margin-bottom: 5px;">同意</el-button>
					<el-button @click="handleClick(scope.row)" type="danger" size="small" style="margin-left: 10px;margin-bottom: 5px;">拒绝</el-button>
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
				applyType: 14
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
