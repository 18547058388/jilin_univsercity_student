<template>
	<view>
	<!-- 	<text style="font-size: 15px;">功能管理：</text> -->
		<br />
		<el-button @click="openapply" >宿舍调换申请</el-button>
		<el-button @click="openlist">宿舍调整记录</el-button>
		<el-form v-if="show == 1" ref="form" :model="form" label-width="80px" style="margin-top:20px ;">
			<el-form-item label="申请原因"><el-input v-model="form.name" placeholder="请输入申请原因"></el-input></el-form-item>
			<el-form-item label="寝室公寓"><el-input v-model="form.roomnum" placeholder="请输入寝室号"></el-input></el-form-item>
			<el-form-item label="申请时间">
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11"><el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker></el-col>
			</el-form-item>

			<el-form-item label="寝室图片">
				<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">
						将文件拖到此处，或
						<em>点击上传</em>
					</div>
					<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit">提交申请</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>

		<el-table v-if="show == 2" :data="tableData" style="width: 100%">
			<el-table-column prop="date" label="日期" width="180"></el-table-column>
			<el-table-column prop="name" label="姓名" width="180"></el-table-column>
			<el-table-column prop="rnum" label="原寝室"></el-table-column>
			<el-table-column prop="reason" label="申请原因"></el-table-column>
			<el-table-column prop="nrnum" label="目前所在寝室"></el-table-column>
		</el-table>
	</view>
</template>

<script>
export default {
	data() {
		return {
			 tableData: [{
			            date: '2020-12-26',
			            name: '迟迟',
						reason:'床板损坏',
			            rnum: 'A2020',
						 nrnum: 'A3030',
			          }],
			show: 1,
			prop:{
				/*姓名*/
				name:'',
				/*日期*/
				data:'',
				/*申请原因*/
				reason:'',
				/*目前所在寝室*/
				nrnum:'',
				/*原寝室*/
				rnum:'',
			},
			form: {
				name: '',
				roomnum: '',
				date2: '',
				type: []
			}
		};
	},
	methods: {
		onSubmit() {
			console.log('submit!');
		},

		openapply() {
			this.show = 1;
		},
		openlist() {
			this.show = 2;
		}
	}
};
</script>

<style></style>
