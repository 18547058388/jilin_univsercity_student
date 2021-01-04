<template>
	<!-- 审批学生请假 -->
	<el-table :data="tableData" border stripe height="750" style="width: 100%">
		<el-table-column prop="createTime" label="日期" width="100"></el-table-column>
		<el-table-column prop="realName" label="姓名" width="120"></el-table-column>
		<el-table-column prop="applyReason" label="请假原因" width="200"></el-table-column>
		<el-table-column prop="shepi" label="操作" width="170">
			<template slot-scope="scope">
				<view style="display: flex;">
					<el-button @click="handleClick(scope.$index)" v-if="tableData[scope.$index].applyStatus==1" type="primary" size="small" style="margin-left: 10px;margin-bottom: 5px;">同意</el-button>
					<el-button @click="handleClickjujue(scope.$index)"  v-if="tableData[scope.$index].applyStatus==1" type="danger" size="small" style="margin-left: 10px;margin-bottom: 5px;">拒绝</el-button>
					<el-button type="warning" v-if="tableData[scope.$index].applyStatus==2" style="margin-left: 10px;" size="small">已取消</el-button>
					<el-button type="success" v-if="tableData[scope.$index].applyStatus==3" style="margin-left: 10px;" size="small">审核通过</el-button>
					<el-button type="danger" v-if="tableData[scope.$index].applyStatus==4"  style="margin-left: 10px;" size="small">审核驳回</el-button>
				</view>
			</template>
		</el-table-column>
	</el-table>
</template>
<script>
export default {
	methods: {
		handleClickjujue(row) {
			this.$prompt('请输入驳回理由', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
					  inputType:"textarea"
			          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
			          // inputErrorMessage: '邮箱格式不正确'
			        })
					.then(({ value }) => {
						if(value==''||value==null){
							this.$message("必须输入驳回原因");
						}
						else{
							
							uni.showLoading({
								mask:true
							})
							this.request.post({
								url: 'teacher/teacher/approval/v1/apply',
								params: {
									applyStatus: 4,
									studentApplyId: this.tableData[row].studentApplyId,
														checkReason:value
								},
								success: res => {
									console.log(res);
							this.$message({
							  type: 'success',
							  message: '驳回成功'
							});
									uni.showLoading({
										mask: true
									});
									this.request.post({
										url: 'teacher/teacher/approval/v1/list',
										params: {
											teacher: '1252040511921938433',
											applyType: 5
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
							
							
							
						}
						
						
						
						
						
			         
					  
					  
					  
					  
			        })
					.catch(() => {
			          this.$message({
			            type: 'info',
			            message: '取消输入'
			          });       
			        });
		
			// console.log(row);
			// console.log(this.tableData[row].studentApplyId);
			// uni.hideLoading();
		},
		handleClick(row) {
			this.request.post({
				url: 'teacher/teacher/approval/v1/apply',
				params: {
					applyStatus: 3,
					studentApplyId: this.tableData[row].studentApplyId,
					checkReason:'同意'
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
							applyType: 5
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
				applyType: '5'
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
