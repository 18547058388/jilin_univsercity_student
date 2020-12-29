<template>
	<view>
		<el-button @click="openCourse">查询课程安排</el-button>
		<el-button @click="openVariable">在线选课</el-button>
		<el-button @click="openSpeciality">在线查询各专业当前学期的课程信息</el-button>
		<view v-if="show == 1" style="margin-left: 20px;margin-top: 20px;"></view>
		<view v-if="show == 2" border style="margin-left: 20px;margin-top: 20px;">
			<el-table :data="tableData02" style="width: 700px">
				<el-table-column fixed prop="date" label="课程名称" width="150"></el-table-column>
				<el-table-column prop="name" label="课程周期" width="150"></el-table-column>
				<el-table-column prop="province" label="课程时间" width="150"></el-table-column>
				<el-table-column prop="city" label="专业" width="150"></el-table-column>
				<el-table-column label="操作" width="100">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text">选中</el-button>
					</template>
				</el-table-column>
			</el-table>
		</view>
		<view v-if="show == 3">
			<view style="margin-top: 20px;">
				<el-select v-model="specialityvalue" clearable placeholder="请选择专业">
					<el-option v-for="(item, index) in SpecialityList" :key="index" :label="item.majorName" :value="item.majorName"></el-option>
				</el-select>
				<el-select v-model="coursevalue" clearable placeholder="请选择课程" style="margin-left: 20px;">
					<el-option v-for="(item,index) in CourseList" :key="index" :label="item.courseName" :value="item.courseName"></el-option>
				</el-select>
				<el-button icon="el-icon-search" type="success" style="margin-left: 20px;width: 120px;" @click="getPayInventory">搜索</el-button>
				<el-table :data="tableData01" style="width: 900px;margin-top: 20px;">
					<el-table-column fixed prop="date" label="时间" width="150"></el-table-column>
					<el-table-column prop="name" label="星期一" width="150"></el-table-column>
					<el-table-column prop="province" label="星期二" width="150"></el-table-column>
					<el-table-column prop="city" label="星期三" width="150"></el-table-column>
					<el-table-column prop="address" label="星期四" width="150"></el-table-column>
					<el-table-column prop="zip" label="星期五" width="150"></el-table-column>
				</el-table>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			SpecialityList: [],
            CourseList:[],
			specialityvalue:'',
			coursevalue: '',
			show: 1,
			tableData01: [
				{
					date: '第一节',
					name: '语文',
					province: '数学',
					city: '英语',
					address: '体育',
					zip: '政治'
				},
				{
					date: '第二节',
					name: '历史',
					province: '地理',
					city: '物理(教学楼205)',
					address: '化学',
					zip: '生物'
				},
				{
					date: '第三节',
					name: '政治',
					province: '数学',
					city: '物理',
					address: '英语',
					zip: '历史'
				},
				{
					date: '第四节',
					name: '英语',
					province: '体育',
					city: '美术',
					address: '数学',
					zip: '化学'
				},
				{
					date: '第五节',
					name: '音乐',
					province: '英语',
					city: '计算机',
					address: '网络安全',
					zip: '语文'
				}
			],
			tableData02: [
				{
					date: '网络安全',
					name: '星期二',
					province: '第一节',
					city: '计算机专业'
				},
				{
					date: '民族舞',
					name: '星期三',
					province: '第四节',
					city: '云计算'
				},
				{
					date: '足球裁判法',
					name: '星期四',
					province: '第三节',
					city: '室内设计'
				}
			]
		};
	},
	mounted() {
	},
	methods: {
		getspeciality() {
			let self = this;
			this.request.post({
				url: 'teacher/teacher/university/school/major/v1/list',
				success: response => {
					console.log(response);
					self.SpecialityList = response.rtData.dts;
				},
				error: error => {
					console.log(error.errMsg);
				}
			});
		},
		getcourse(){
			let self= this;
			this.request.post({
				url:'teacher/teacher/course/v1/list',
				success:response=>{
					console.log(response);
					self.CourseList=response.rtData.dts;
				},
				error:error=>{
					console.log(error.errMsg);
				}
			})
		},
		handleClick(row) {
			console.log(row);
		},
		openCourse() {
			this.show = 1;
		},
		openVariable() {
			this.show = 2;
		},
		openSpeciality() {
			this.show = 3;
			this.getspeciality();
			this.getcourse();
		}
	}
};
</script>

<style></style>
