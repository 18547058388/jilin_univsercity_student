<template>
	<view>
		<el-input
			placeholder="请输入学生姓名"
			v-model="inputsname"
			clearable
			style="width: 150px; margin-right: 20px;margin-bottom: 10px;"
		></el-input>
		<el-input
			placeholder="请输入学院名称"
			v-model="inputschool"
			clearable
			style="width: 150px; margin-right: 20px; margin-bottom: 10px;"
		></el-input>
		<el-select
			@change="onSpecialityIDChange($event, gradeId)"
			value-key="gradeId"
			v-model="gradeId"
			placeholder="按学年查询"
			clearable
			filterable
			style="width: 150px;margin-right: 20px; margin-bottom: 10px;"
		>
			<el-option v-for="(item, index) in yearList" :key="index" :label="item.gradeName" :value="item.gradeId"></el-option>
		</el-select>
		<el-button type="success" icon="el-icon-search" @click="getcchange">搜 &nbsp;索</el-button>
		<br />
		<el-input placeholder="请输入楼栋号" v-model="num" clearable style="width: 150px; margin-right: 20px; "></el-input>
		<el-input placeholder="请输入单元号" v-model="dnum" clearable style="width: 150px; margin-right: 20px;"></el-input>
		<el-input placeholder="请输入寝室号" v-model="rnum" clearable style="width: 150px; margin-right: 20px;"></el-input>
		<el-button type="primary" @click="getcchange">查询所有</el-button>
		<el-table :data="messList" stripe style="width: 100%">
			<el-table-column prop="realName" label="姓名" width="180"></el-table-column>
			<el-table-column prop="schoolName" label="学院" width="180"></el-table-column>
			<el-table-column prop="gradeName" label="年级"></el-table-column>
			<el-table-column prop="buildingNo" label="楼栋号"></el-table-column>
			<el-table-column prop="dormitoryNo" label="寝室号"></el-table-column>
		</el-table>
	</view>
</template>

<script>
export default {
	data() {
		return {
			inputsname: '',
			inputschool: '',
			num: '',
			dnum: '',
			rnum: '',
			messList: '',
			gradeId:'',
			schoolYearvalue: '',
			yearList: []
		};
	},
	mounted() {
		this.getschoolYear();
	},
	methods: {
		onSpecialityIDChange(value, gradeId) {
			console.log(value);
			this.gradeId = value;
		},

		getschoolYear() {
			let self = this;
			self.request.post({
				url: 'teacher/teacher/grade/v1/list',
				params: {
					/* "gradeId":gradeId, */
				},
				success: response => {
					self.yearList = response.rtData.dts;
				},

				error: error => {
					console(error.errMsg);
				}
			});
		},
		getcchange() {
			let self = this;
			self.request.post({
				url: 'teacher/teacher/student/v1/selectDormitory',
				params: {
					/* 姓名 */
					realName: this.inputsname,
					schoolName: this.inputschool,
					dormitoryNo: this.rnum,
					buildingNo:this.num,
					
					gradeId:this.gradeId,
				
					unitNo:this.dnum, 
				},
				success: response => {
					self.messList = response.rtData.dts;
				},

				error: error => {
					console(error.errMsg);
				}
			});
		}
	}
};
</script>
<style></style>
