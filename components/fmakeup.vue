<template>
	<view class="" v-if="shuaxin">
		<view class="content">
			<view class="upimage" @click="chooseimg">
				<i class="el-icon-plus" v-if="imgblock"></i>
				<image :src="imagesrc" v-if="image"></image>
				<view style="color: #808080;margin-bottom: 10px;" v-if="imgblock">点击上传照片</view>
			</view>
			<view class="inputkuang">
				<view style="display: flex;">
					<text>姓名:</text>
					<el-input style="width: 33vw;" v-model="inputname" placeholder="请输入姓名"></el-input>
				</view>
				<view style="display: flex;">
					<text>年级:</text>
					<el-input style="width: 33vw;" v-model="inputgrade" placeholder="请输入年级"></el-input>
				</view>
				<view style="display: flex;">
					<text>原因:</text>
					<el-input style="width: 33vw;" v-model="inputtea" placeholder="请输入申请原因"></el-input>
				</view>
				<view style="margin-left: 26.5vw;">
						<el-button type="infor" @click="chongzhi">重置</el-button>
					<el-button type="primary" @click="tijiao">提交申请</el-button>
				
					</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			shuaxin:true,
			//图片开关
			image: true,
			//输入的教师名称
			inputtea: '',
			//加号图标是否显示
			imgblock: true,
			imagesrc: '',
			//输入的姓名
			inputname: '',
			//输入的年级
			inputgrade: ''
		};
	},
	methods: {
		// 点击提交触发
		tijiao() {
			if (this.inputname == '') {
				this.$message('请输入姓名');
			} else if (this.inputgrade == '') {
				this.$message('请输入年级');
			} else if(this.imagesrc==''){
				this.$message('请选择照片');
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
								applyType:14,
								applyReason:this.inputtea
							},
							success: response => {
							this.imgblock = true;
							this.imagesrc='';
							this.image=false;
							this.inputgrade='';
							this.inputname='';
							this.inputtea='';
							this.$message('提交成功');
								
							}
						});
					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '取消提交'
						});
					});
			}
		},
		chongzhi(){
			this.image=false;
			this.imgblock=true;
			this.inputgrade='';
			this.inputname='';
			this.inputtea='';
		},
		// 点击图相框触发
		chooseimg() {
			uni.chooseImage({
				count: 1,
				success: res => {
					this.image=true;
					this.imagesrc = res.tempFilePaths[0];
					console.log(res);
					this.imgblock = false;
				}
			});
		}
	}
};
</script>

<style>
.content {
	display: flex;
}
.inputkuang {
	display: flex;
	flex-direction: column;
	margin-left: 10px;
	justify-content: space-around;
}

.inputkuang text {
	width: fit-content;
	padding-right: 5px;
	height: 40px;
	margin-left: 10px;
	line-height: 40px;
	color: #808080;
}
.upimage image {
	width: 200px;
	height: 500rpx;
}
.upimage {
	margin-left: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	margin-top: 10px;
	justify-content: space-around;
	width: 200px;
	height: 500rpx;
	border: solid 2px #eee;
}
.el-icon-plus {
	color: #808080;
	margin-top: 60px;
	text-align: center;
	font-size: 80px;
	width: 200px;
	height: 200px;
}
</style>
