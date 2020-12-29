<template>
	<view>
		<el-button @click="openCourse">查询课程安排</el-button>
		<el-button @click="openVariable">在线选课</el-button>
		<el-button @click="openSpeciality">在线查询各专业当前学期的课程信息</el-button>
		<view v-if="show == 1" style="margin-left: 20px;margin-top: 20px;">
			<el-table :data="tableData01" style="width: 900px">
				<el-table-column fixed prop="date" label="时间" width="150"></el-table-column>
				<el-table-column prop="name" label="周一" width="150" ></el-table-column>
				<el-table-column prop="province" label="周二" width="150"></el-table-column>
				<el-table-column prop="city" label="周三" width="150"></el-table-column>
				<el-table-column prop="address" label="周四" width="150"></el-table-column>
				<el-table-column prop="zip" label="周五" width="150"></el-table-column>
			</el-table>
		</view>
		<view v-if="show == 2" style="margin-left: 20px;margin-top: 20px;">
			<el-table :data="tableData02" style="width: 600px" >
				<el-table-column fixed prop="date" label="课程名称" width="150"></el-table-column>
				<el-table-column prop="name" label="课程时间" width="150" ></el-table-column>
				<el-table-column prop="province" label="课程地点" width="150"></el-table-column>
				<el-table-column prop="city" label="课程教师" width="150"></el-table-column>
				
			</el-table>
		</view>
		<view v-if="show == 3">33333333333333</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
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
					name: '周二第四节',
					province: '教学楼209',
					city: '果冻老师',
					
				},
				{
					date: '民族舞',
					name: '周三第二节',
					province: '体育馆101',
					city: '徐老师',
					
				},
				{
					date: '足球裁判法',
					name: '周五第四节',
					province: '教学楼405',
					city: '小孙老师',
					
				}
				
			]
		};
	},
	methods: {
		openCourse() {
			this.show = 1;
		},
		openVariable() {
			this.show = 2;
		},
		openSpeciality(){
			this.show=3;
		}
	}
};
</script>

<style></style>
