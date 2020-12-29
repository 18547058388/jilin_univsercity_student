<template>
	<!-- 学生证补办审批 -->
	<el-table stripe :data="tableData" border height="750" style="width: 100%;">
		<el-table-column prop="createTime" label="日期" width="100"></el-table-column>
		<el-table-column prop="realName" label="姓名" width="120"></el-table-column>
		<el-table-column prop="cellphone" label="电话号码" width="140"></el-table-column>
		<el-table-column prop="applyReason" label="申请原因" width="120"></el-table-column>
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
						applyType:14
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
						applyType: 14
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
			tableData: [
			
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
				teacher:"1252040511921938433",
				applyStatus: "1",
				applyType:"14"
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
<style>
.userimg {
	width: 90px;
	height: 120px;
}
</style>
