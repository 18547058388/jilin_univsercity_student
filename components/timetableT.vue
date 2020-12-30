<template>
	<view>
		<el-button @click="openCourse">查询课程安排</el-button>
		<el-button @click="openVariable">在线选课</el-button>
		<el-button @click="openSpeciality">在线查询各专业当前学期的课程信息</el-button>
		<view v-if="show == 1" style="margin-left: 20px;margin-top: 20px;">
			<div class="block">
			    <el-date-picker
			      v-model="nowTimevalue"
			      type="datetime"
			      placeholder="选择日期时间">
			    </el-date-picker>
				<el-button type="primary" style="margin-left: 20px;" @click="ClassPlan">查询</el-button>
			  </div>
			<el-table :data="ClassPlanList" style="width: 450px;margin-top: 20px;">
				<el-table-column fixed prop="week" label="星期" width="150"></el-table-column>
				<el-table-column prop="universitySchoolMajorId" label="科目" width="150"></el-table-column>
				<el-table-column prop="address" label="教学地址" width="150"></el-table-column>
			</el-table>
		</view>
		<view v-if="show == 2" border style="margin-left: 20px;margin-top: 20px;">
			<view type="text">
				<el-button icon="el-icon-plus" circle type="primary" @click="add"></el-button>
				<view v-for="(select, index) in selectArray" :key="index">
					<el-select
						v-model="select.schoolyearvalue"
						clearable
						value-key="schoolyearvalue"
						placeholder="请选择学年"
						style="width: 150px;"
						@change="onSchoolYearChange($event, select)"
					>
						<el-option v-for="(item, index) in SchoolYearList" :key="index" :value="item.schoolYearName"></el-option>
					</el-select>
					<el-select
						v-model="select.specialityvalue"
						clearable
						placeholder="请选择专业"
						style="width: 150px;margin-left: 20px;"
						@change="onSpecialityChange($event, select)"
						value-key="specialityvalue"
					>
						<el-option v-for="(item, index) in SpecialityList" :key="index" :value="item.majorName"></el-option>
					</el-select>
					<el-select
						v-model="select.coursevalue"
						clearable
						placeholder="请选择课程"
						style="margin-top: 20px;margin-left: 20px;width: 150px;"
						@change="onCourseChange($event, select)"
						value-key="coursevalue"
					>
						<el-option v-for="(item, index) in CourseList" :key="index" :value="item.courseName"></el-option>
					</el-select>
					<el-select
						v-model="select.week"
						clearable
						placeholder="请选择星期"
						style="margin-top: 20px;margin-left: 20px;width: 150px;"
						@change="onWeekChange($event, select)"
						value-key="week"
					>
						<el-option v-for="(item, index) in WeekList" :key="index" :value="item.weeklabel"></el-option>
					</el-select>
					<el-select
						v-model="select.lesson"
						clearable
						placeholder="请选择课节"
						style="margin-top: 20px;margin-left: 20px;width: 150px;"
						@change="onLessonChange($event, select)"
						value-key="lesson"
					>
						<el-option v-for="(item, index) in LessonList" :key="index" :value="item.lessonlabel"></el-option>
					</el-select>
					<el-input
						placeholder="请填写教学地址"
						v-model="select.classroom"
						clearable
						style="width: 150px;margin-top: 20px;margin-left: 20px;"
						@change="onClassRoomChange($event, select)"
						value-key="classroom"
					></el-input>
					<el-button icon="el-icon-delete" circle type="danger" @click="deletes" style="margin-left: 20px;"></el-button>
				</view>
				<el-button type="primary" style="width: 100px;margin-top: 20px;" @click="conserve">保存</el-button>
			</view>
		</view>
		<view v-if="show == 3">
			<view style="margin-top: 20px;">
				<el-select v-model="speciality" clearable placeholder="请选择专业" @change="onSpecialityIDChange($event, speciality)"value-key="speciality">
					<el-option
						v-for="(item, index) in SpecialityList"
						:key="index"
						:label="item.majorName"
						:value="item.universitySchoolMajorId"
					></el-option>
				</el-select>
				<el-select v-model="course" clearable placeholder="请选择课程" style="margin-left: 20px;" @change="onCourseIDChange($event, course)"value-key="course">
					<el-option v-for="(item, index) in CourseList" :key="index" :label="item.courseName" :value="item.courseId"></el-option>
				</el-select>
				<el-button icon="el-icon-search" type="success" style="margin-left: 20px;width: 120px;" @click="getClassMessage">搜索</el-button>
				<el-table :data="ClassMessageList" style="width: 1050px;margin-top: 20px;">
					<el-table-column fixed prop="schoolYearName" label="学年" width="150"></el-table-column>
					<el-table-column prop="majorName" label="专业" width="150"></el-table-column>
					<el-table-column prop="courseName" label="科目" width="150"></el-table-column>
					<el-table-column prop="week" label="星期" width="150"></el-table-column>
					<el-table-column prop="classNum" label="课节" width="150"></el-table-column>
					<el-table-column prop="address" label="教室" width="150"></el-table-column>
					<el-table-column prop="realName" label="教师" width="150"></el-table-column>
				</el-table>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//课程安排数组
			ClassPlanList:[],
			 nowTimevalue: '',
			//选课数组
			selectArray: [],
			//星期
			WeekList: [{ weeklabel: '1' }, { weeklabel: '2' }, { weeklabel: '3' }, { weeklabel: '4' }, { weeklabel: '5' }, { weeklabel: '6' }],
			//课节
			LessonList: [{ lessonlabel: '1' }, { lessonlabel: '2' }, { lessonlabel: '3' }, { lessonlabel: '4' }],
			//教室
			classroom: '',
			//学年数组
			SchoolYearList: [],
			//拿到学年的值
			schoolyearvalue: '',
			//专业数组
			SpecialityList: [],
			//拿到专业的值
			specialityvalue: '',
			//课程数组
			CourseList: [],
			//拿到课程的值
			coursevalue: '',
			//默认显示页面
			show: 1,
			//课程信息
			ClassMessageList: [],
             //第三页面拿到专业的值
			speciality: '',
			//第三页面拿到的值
			course: ''
		};
	},
	mounted() {
		this.getClassMessage();
	},
	methods: {
		//确定按钮事件
		ClassPlan(){
			this.ClassPlan();
		},
		/*
		*课程安排
		* 
		*/
		ClassPlan(){
			let self = this;
			this.request.post({
				url: 'teacher/teacher/course/v1/arrange',
				params:{
				"nowTime":this.nowTimevalue,
				"teacherId":"1252040511921938433"
				},
				success: response => {
					console.log(response);
					self.ClassPlanList = response.rtData.dts;
				},
				error: error => {
					console.log(error.errMsg);
				}
			});
		},
		//添加按钮
		add() {
			this.selectArray.push({
				//学年
				schoolyearvalue: '',
				//专业
				specialityvalue: '',
				//课程
				coursevalue: '',
				//星期
				week: '',
				//课节
				lesson: '',
				//教室
				classroom: ''
			});
		},
		//删除按钮
		deletes() {
			this.selectArray.splice(0, 1);
		},
		//学年
		onSchoolYearChange(value, select) {
			console.log('value: ' + JSON.stringify(value));
			select.schoolyearvalue = value;
			this.schoolyearvalue = value;
		},
		//专业名称
		onSpecialityChange(value, select) {
			select.specialityvalue = value;
			this.specialityvalue = value;
		},
		//课程
		onCourseChange(value, select) {
			select.coursevalue = value;
			this.coursevalue = value;
		},
		//星期
		onWeekChange(value, select) {
			select.week = value;
			this.week = value;
		},
		//课节
		onLessonChange(value, select) {
			select.lesson = value;
			this.lesson = value;
		},
		//教室
		onClassRoomChange(value, select) {
			select.classroom = value;
			this.classroom = value;
		},
		//专业id
		onSpecialityIDChange(value,speciality){
			console.log(value)
			this.speciality=value;
		},
		//课程id
		onCourseIDChange(value,course){
			console.log(value)
			this.course=value;
		},
		//保存按钮
		conserve() {
			if (this.schoolyearvalue.length == 0) {
				this.alert.showMessage('请选择学年');
				return false;
			}
			if (this.specialityvalue.length == 0) {
				this.alert.showMessage('请选择专业');
				return;
			}
			if (this.coursevalue.length == 0) {
				this.alert.showMessage('请选择课程');
				return;
			}
			if (this.week.length == 0) {
				this.alert.showMessage('请填写星期');
				return;
			}
			if (this.lesson.length == 0) {
				this.alert.showMessage('请填写课节');
				return;
			}
			if (this.lesson.length == 0) {
				this.alert.showMessage('请填写教学地址');
				return;
			}
			let self = this;
			this.request.post({
				url: 'teacher/teacher/course/v1/add',
				params: {
					teacherCourseList: [
						{
							teacherId: '1252040511921938433',
							universitySchoolMajorId: this.schoolyearvalue,
							courseId: this.coursevalue,
							schoolYearId: this.schoolyearvalue,
							week: this.week,
							classNum: this.lesson,
							address: this.classroom
						}
					]
				},
				success: response => {
					console.log(33333);
					console.log(response);
					this.alert.showMessage('选课成功');
				},
				error: error => {
					console.log(error.errMsg);
				}
			});
		},
		/**
		 *学年数组
		 */
		getschoolyear() {
			let self = this;
			this.request.post({
				url: 'teacher/teacher/school/year/v1/list',
				success: response => {
					console.log(response);
					self.SchoolYearList = response.rtData.dts;
				},
				error: error => {
					console.log(error.errMsg);
				}
			});
		},
		/**
		 *专业数组
		 */
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
		/*
		 *课程数组
		 */
		getcourse() {
			let self = this;
			this.request.post({
				url: 'teacher/teacher/course/v1/list',
				success: response => {
					console.log(response);
					self.CourseList = response.rtData.dts;
				},
				error: error => {
					console.log(error.errMsg);
				}
			});
		},

		handleClick(row) {
			console.log(row);
		},
		//查询课程安排页面
		openCourse() {
			this.show = 1;
		},
		//在线选课页面
		openVariable() {
			this.show = 2;
			this.getspeciality();
			this.getcourse();
			this.getschoolyear();
		},
		//课程信息页面
		openSpeciality() {
			this.show = 3;
			this.getspeciality();
			this.getcourse();
		},
		/*
		 *课程信息
		 * teacherId，教师主键
		 * universitySchoolMajorId，专业主键
		 * courseId，课程主键
		 */
		getClassMessage() {
			let self = this;
			this.request.post({
				url: 'teacher/teacher/course/v1/major',
				params: {
					// "teacherId":,
					"universitySchoolMajorId":this.speciality,
					"courseId":this.course,
				},
				success: response => {
					console.log(response);
					self.ClassMessageList = response.rtData.dts;
				},
				error: error => {
					console.log(error.errMsg);
				}
			});
		}
	}
};
</script>

<style></style>
