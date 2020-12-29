<template>
	<view>
		<!-- 学生日常请假 -->
		<el-input style="width: 30vw;margin-top: 1vw;" type="textarea" :autosize="{ minRows: 6, maxRows: 8 }" placeholder="请输入请假原因" v-model="reason"></el-input>
		<div class="block">
			<span class="demonstration">请假开始时间</span>
			<el-date-picker style="margin-left: 1vw;" v-model="starttime" type="datetime" placeholder="选择日期时间"></el-date-picker>
		</div>
		<div class="block">
			<span class="demonstration">请假结束时间</span>
			<el-date-picker style="margin-left: 1vw;" v-model="endtime" type="datetime" placeholder="选择日期时间"></el-date-picker>
		</div>

		<view class="btn">
			<el-button type=" infor">取消申请</el-button>
			<el-button type="primary" @click="commit">提交申请</el-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//用户输入
			reason: '',
			//请假开始时间
			starttime: '',
			//结束时间
			endtime: ''
		};
	},
	methods: {
		commit() {
			if(this.reason==""){
				this.$message("请输入请假原因")
			}else{
			this.$confirm('是否确认提交?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.request.post({
						url: 'student/student/apply/v1/total',
						params: {
							studentId: 1244506336535629826,
							applyType: 5,
							applyReason: this.reason
						},
						success: res => {
							this.reason = '';
							this.$message('提交成功');
						}
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '取消提交'
					});
					// this.starttime='';
					// this.endtime='';
					// this.jiariquxiang='';
					// this.inputblock=false;
					// this.value='';
				});
		}
		}
	}
};
</script>

<style>
.btn {
	display: flex;
	margin-top: 2vw;
	width: 30vw;
	justify-content: flex-end;
	box-sizing: border-box;
}
.demonstration {
	color: #808080;
}
.block {
	margin-top: 1vw;
}
</style>
