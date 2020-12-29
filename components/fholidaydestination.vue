<template>
	<view>
		<!-- 学生假日去向 -->
		<el-input style="width: 30vw;margin-top: 1vw;" 
		type="textarea" :autosize="{ minRows: 6, maxRows: 8 }"
		 placeholder="请输入假期去向" v-model="jiariquxiang">
		 </el-input>
		<div class="block">
			<span class="demonstration">假期开始时间</span>
			<el-date-picker style="margin-left: 1vw;width: 10vw;" 
			v-model="starttime" type="datetime"
			 placeholder="选择日期时间">
			 </el-date-picker>
			<span style="color: #808080;">至</span>
			<el-date-picker style="margin-left: 1vw;"
			 v-model="endtime" type="datetime"
			  placeholder="选择日期时间"></el-date-picker>
		</div>
		<view style="display: flex;margin-top: 2vw;">
			<span style="color: #808080;text-align: center;line-height:40px;">选择假期类型</span>
			<el-select v-model="value"
			 placeholder="请选择" 
			 style="margin-left: 1vw;"
			  @change="yuanyinshuoming(value)"
			 >
				<el-option v-for="item in options"
				 :key="item.value" :label="item.label" 
				 :value="item.label"
				 >
				  </el-option>
			</el-select>
		</view>
		<view>
		<el-input style="width: 30vw;margin-top: 1vw;" 
		v-if="inputblock"
		type="textarea" :autosize="{ minRows: 6, maxRows: 8 }" 
		placeholder="特殊原因说明" v-model="shuoming">
		</el-input>
		</view>
		<view class="btn">
			<el-button type=" infor" @click="cancle">取消</el-button>
			<el-button type="primary" @click="commit">提交</el-button>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			//用户输入的特殊原因说明
			shuoming:'',
			//特殊原因输入开关
			inputblock:false,
			//假期类型数组
			options: [
				{
					value: '选项1',
					label: '节日放假'
				},
				{
					value: '选项2',
					label: '特殊原因'
				},
				{
					value: '选项3',
					label: '周末休息'
				}
			],
			//用户输入
			jiariquxiang: '',
			//用户选择的假期类型
			value: '',
			//开始时间
			starttime: '',
			//结束时间
			endtime: ''
		};
	},
	methods:{
		yuanyinshuoming(label){
			console.log(label);
			if(label=='特殊原因'){
				this.inputblock=true;
			}else{
				this.inputblock=false;
			}
		},
		cancle(){
			this.starttime='';
			this.endtime='';
			this.jiariquxiang='';
			this.inputblock=false;
			this.value='';
		},
		commit(){
			
			this.$confirm('是否确认提交?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
			.then(()=>{
				this.request.post({
					url: 'student/student/apply/v1/total',
					params: {
						studentId: 1244506336535629826,
						applyType:4,
						applyReason:this.jiariquxiang+'  '+'特殊原因：'+(this.shuoming==''?'无':this.shuoming)
					},
				success:res=>{
					this.starttime='';
					this.endtime='';
					this.jiariquxiang='';
					this.inputblock=false;
					this.value='';
					this.$message('提交成功')
				}
				})
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
};
</script>

<style>
.btn {
	display: flex;
	margin-top: 2vw;
	width: 30vw;
	justify-content: flex-end;
}
.demonstration {
	color: #808080;
}
.block {
	margin-top: 1vw;
}
</style>
