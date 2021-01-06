<template>
	<!-- 审批学生申诉 -->
	<el-table :data="tableData" border stripe height="750" style="width: 100%">
		<el-table-column prop="createTime" label="日期" width="100"></el-table-column>
		<el-table-column prop="realName" label="姓名" width="120"></el-table-column>
		<el-table-column prop="appealReason" label="申诉原因" width="200"></el-table-column>
		<el-table-column prop="shepi" label="操作" width="170">
			<template slot-scope="scope">
				<view style="display: flex;">
					<el-button @click="handleClick(scope.$index)" v-if="tableData[scope.$index].appealStatus==1" type="primary" size="small" style="margin-left: 10px;margin-bottom: 5px;">同意</el-button>
					<el-button @click="handleClickjujue(scope.$index)" v-if="tableData[scope.$index].appealStatus==1" type="danger" size="small" style="margin-left: 10px;margin-bottom: 5px;">拒绝</el-button>
					<el-button type="warning" v-if="tableData[scope.$index].appealStatus==4" style="margin-left: 10px;" disable>已取消</el-button>
					<el-button type="success" v-if="tableData[scope.$index].appealStatus==2" style="margin-left: 10px;" disable>申诉通过</el-button>
					<el-button type="danger" v-if="tableData[scope.$index].appealStatus==3" style="margin-left: 10px;" disable>审核驳回</el-button>
				</view>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
export default {
	methods: {
		handleClickjujue(row){
			console.log(row);
			
			this.$prompt('请输入驳回理由', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
					  inputType:"textarea"
			        }).then(({ value }) => {
						
						this.request.post({
							url:'teacher/teacher/discipline/appeal/v1/approval',
							params:{
								"disciplineAppealId":this.tableData[row].disciplineAppealId ,
								"appealStatus":3,
								"teacherId":"1252040511921938433",
								checkReason:value
							},
							success:res=>{
								console.log(res);
								
								this.$message({
								  type: 'success',
								  message: '驳回成功'
								});
								//在调一次查询
								
								this.request.post({
									url:"teacher/teacher/discipline/appeal/v1/list",
									params:{
										
									},
									success:res=>{
										console.log(res);
											this.tableData = res.rtData.dts;
									},
									error:err=>{
										console.log(err);
									}
								})
							},
							error:err=>{
								console.log(err);
							}
						})
						
						
					
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '取消输入'
			          });       
			        });
					
					
					
		
		},
		handleClick(row) {
			console.log(this.tableData[row].disciplineAppealId);
			this.request.post({
				url:'teacher/teacher/discipline/appeal/v1/approval',
				params:{
					 "disciplineAppealId":this.tableData[row].disciplineAppealId ,
					"appealStatus":2,
					"teacherId":"1252040511921938433",
					checkReason:'同意'
				},
				success:res=>{
					console.log(res);
					
					//在调一次查询
					this.request.post({
						url:"teacher/teacher/discipline/appeal/v1/list",
						params:{
							
						},
						success:res=>{
							console.log(res);
								this.tableData = res.rtData.dts;
						},
						error:err=>{
							console.log(err);
						}
					})
					
				},
				error:err=>{
					console.log(err);
				}
			})
		}
	},
	data() {
		return {
			tableData: []
		};
	},
	mounted() {
		uni.showLoading({
			mask:true
		})
		this.request.post({
			url:"teacher/teacher/discipline/appeal/v1/list",
			params:{
			},
			success:res=>{
				console.log(res);
				this.tableData = res.rtData.dts;
				uni.hideLoading()
			},
			error:err=>{
				console.log(err);
			}
		})
	}
};
</script>
