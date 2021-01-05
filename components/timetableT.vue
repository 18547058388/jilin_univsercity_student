<template>
	<view>
		<el-button @click="openVariable">在线排课</el-button>
		<el-button @click="openSpeciality">课程安排</el-button>
		<view v-if="show == 2" border style="margin-left: 20px;margin-top: 20px;">
			<view>
				<el-button icon="el-icon-plus" circle type="primary" @click="add"></el-button>
				<view v-for="(select, index) in teacherCourseList" :key="index">
					<view>
						<el-select v-model="select.schoolYearId" clearable placeholder="请选择学年" style="width: 150px;">
					
							<el-option
								v-for="(item, index) in SchoolYearList"
								:key="index"
								:value="item.schoolYearId"
								:label="item.schoolYearName"
							></el-option>
						</el-select>
						<el-select
							v-model="select.universitySchoolMajorId"
							clearable
							placeholder="请选择专业"
							style="width: 150px;margin-left: 20px;"
						>
							<el-option
								v-for="(item, index) in SpecialityList"
								:key="index"
								:label="item.majorName"
								:value="item.universitySchoolMajorId"
							></el-option>
						</el-select>
						<el-select
							v-model="select.courseId"
							clearable
							placeholder="请选择课程"
							style="margin-top: 20px;margin-left: 20px;width: 150px;"
						>
							<el-option v-for="(item, index) in CourseList" :key="index" :value="item.courseId" :label="item.courseName"></el-option>
						</el-select>
						<el-select v-model="select.week" clearable placeholder="请选择星期" style="margin-top: 20px;margin-left: 20px;width: 150px;">
							<el-option v-for="(item, index) in WeekList" :key="index" :value="item.weeklabel"></el-option>
						</el-select>
						<el-select
							v-model="select.classNum"
							clearable
							placeholder="请选择课节"
							style="margin-top: 20px;margin-left: 20px;width: 150px;"
						>
							<el-option v-for="(item, index) in LessonList" :key="index" :value="item.lessonlabel"></el-option>
						</el-select>
						<el-input
							placeholder="请填写教学地址"
							v-model="select.address"
							clearable
							style="width: 150px;margin-top: 20px;margin-left: 20px;"
						></el-input>
						<el-input
							placeholder="请填写上课人数"
							v-model="select.studentNum"
							clearable
							style="width: 150px;margin-top: 20px;margin-left: 20px;"
						></el-input>
						<el-button icon="el-icon-delete" circle type="danger" @click="deletes" style="margin-left: 20px;"></el-button>
					</view>
				</view>
			</view>
			<el-button type="primary" style="width: 100px;margin-top: 20px;" @click="conserve" :loading="loading">保存</el-button>
		</view>
		<view v-if="show == 3">
			<view style="margin-top: 20px;">
				<el-select
					v-model="universitySchoolMajorId"
					clearable
					placeholder="请选择专业"
					@change="onSpecialityIDChange($event, universitySchoolMajorId)"
					value-key="universitySchoolMajorId"
				>
					<el-option
						v-for="(item, index) in SpecialityList"
						:key="index"
						:label="item.majorName"
						:value="item.universitySchoolMajorId"
					></el-option>
				</el-select>
				<el-select
					v-model="courseId"
					clearable
					placeholder="请选择课程"
					style="margin-left: 20px;"
					@change="onCourseIDChange($event, courseId)"
					value-key="courseId"
				>
					<el-option v-for="(item, index) in CourseList" :key="index" :label="item.courseName" :value="item.courseId"></el-option>
				</el-select>
				<el-button icon="el-icon-search" type="success" style="margin-left: 20px;width: 120px;" @click="getClassMessage">搜索</el-button>
				<el-table :data="ClassMessageList" stripe style="margin-top: 20px;">
					<el-table-column  prop="schoolYearName" label="学年" ></el-table-column>
					<el-table-column prop="majorName" label="专业" ></el-table-column>
					<el-table-column prop="courseName" label="科目" ></el-table-column>
					<el-table-column prop="week" label="星期" ></el-table-column>
					<el-table-column prop="classNum" label="课节" ></el-table-column>
					<el-table-column prop="address" label="教室" ></el-table-column>
					<el-table-column prop="realName" label="教师" ></el-table-column>
					<el-table-column  label="人数" >
						<template slot-scope = "scope">
							{{scope.row.studentCourseNum}}/{{scope.row.studentNum}}
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="200">
						<template slot-scope="scope">
							<el-button  type="text"  @click="gotoDetails(scope.row)">选课详情</el-button>
						</template>
					</el-table-column>
				</el-table>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading:false,
			//选课数组
			teacherCourseList: [],
			//课程安排数组
			ClassPlanList: [],
			//时间
			nowTimevalue: '',
			//星期
			WeekList: [{ weeklabel: '1' }, { weeklabel: '2' }, { weeklabel: '3' }, { weeklabel: '4' }, { weeklabel: '5' }, { weeklabel: '6' }],
			//课节
			LessonList: [{ lessonlabel: '1' }, { lessonlabel: '2' }, { lessonlabel: '3' }, { lessonlabel: '4' }],
			//教室
			classroom: '',
			//学年数组
			SchoolYearList: [],
			//专业数组
			SpecialityList: [],
			//课程数组
			CourseList: [],
			//默认显示页面
			show: 3,
			//课程信息
			ClassMessageList: [],
			//第三页面拿到专业的值
			universitySchoolMajorId: '',
			//第三页面拿到课程的值
			courseId: ''
		};
	},
	mounted() {
		this.getClassMessage();
	},
	methods: {
		//选课详情
		gotoDetails(scope){
			console.log(scope)
			uni.$emit('approve',scope);
		},
	//添加按钮
		add() {
			this.loading=false;
			this.teacherCourseList.push({
				//学年
				schoolYearId: '',
				//专业
				universitySchoolMajorId: '',
				//课程
				courseId: '',
				//星期
				week: '',
				//课节
				classNum: '',
				//教室
				address: '',
				//人数
				studentNum:'',
				teacherId: '1252040511921938433'
			});
		},
		//删除按钮
		deletes() {
			this.teacherCourseList.splice(0, 1);
		},
		//保存按钮
		conserve() {
			let self = this;
			this.loading=true;
			this.request.post({
				url: 'teacher/teacher/course/v1/add',
				params: {
					teacherCourseList: this.teacherCourseList
				},
				success: response => {
					console.log(response);
					this.alert.showMessage('排课成功');
					this.teacherCourseList=[];
					this.loading=false;
				},
				error: error => {
					console.log(error.errMsg);
				}
			});
		},
		//专业id2
		onSpecialityIDChange(value, universitySchoolMajorId) {
			console.log(value);
			this.universitySchoolMajorId = value;
		},
		//课程id2
		onCourseIDChange(value, courseId) {
			console.log(value);
			this.courseId = value;
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
		openApprove() {
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
		 *课程安排
		 * teacherId，教师主键
		 * universitySchoolMajorId，专业主键
		 * courseId，课程主键
		 */
		getClassMessage() {
			let self = this;
			this.request.post({
				url: 'teacher/teacher/course/v1/major',
				params: {
					 school_year_id: "1342639979834384384",
					 "teacherId":"1252040511921938433",
					universitySchoolMajorId: this.universitySchoolMajorId,
					courseId: this.courseId
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
