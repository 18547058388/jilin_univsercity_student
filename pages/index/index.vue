<template>
	<el-container style="height: 1000px; border: 1px solid #eee">
		<el-aside width="230px" style="background-color: rgb(238, 241, 246)">
			<el-menu>
				<el-submenu index="8">
					<template slot="title">
						<i class="el-icon-setting"></i>
						课程情况（教师）
					</template>
					<el-menu-item-group><el-menu-item index="801" @click="makeup($event.index)">课程表</el-menu-item></el-menu-item-group>
				</el-submenu>
			 	<el-submenu index="5">
					<template slot="title">
						<i class="el-icon-setting"></i>
						寝室管理（教师）
					</template>
					<el-menu-item-group><el-menu-item index="501" @click="makeup($event.index)">学生宿舍查询</el-menu-item></el-menu-item-group>
					<el-menu-item-group><el-menu-item index="504" @click="makeup($event.index)">学生寝室调整</el-menu-item></el-menu-item-group>
					
				</el-submenu> 
				<el-submenu index="9">
					<template slot="title">
						<i class="el-icon-message"></i>
						学生事务管理（教师）
					</template>
					<el-menu-item-group>
						<el-menu-item index="901" @click="makeup($event.index)">违纪管理</el-menu-item>
						<el-menu-item index="902" @click="makeup($event.index)">申诉管理</el-menu-item>
						<!-- <el-menu-item index="903" @click="makeup($event.index)">违纪解除</el-menu-item> -->
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="10">
					<template slot="title">
						<i class="el-icon-message"></i>
						学生请假管理（教师）
					</template>
					<el-menu-item-group>
						<el-menu-item index="1001" @click="makeup($event.index)">日常请假管理</el-menu-item>
						<el-menu-item index="1002" @click="makeup($event.index)">节假日去向管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="11">
					<template slot="title">
						<i class="el-icon-message"></i>
						学生证补办管理（教师）
					</template>
					<el-menu-item-group><el-menu-item index="1101" @click="makeup($event.index)">学生证补办申请审批</el-menu-item></el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-aside>
		<el-container>
			<!-- 右上按钮 -->
			<el-header style="text-align: right; font-size: 12px;display: flex;justify-content: space-between;">
				<el-breadcrumb separator-class="el-icon-arrow-right" style=" padding-top: 1.5vw;color: #000000;">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/' }">活动列表</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/' }">活动详情</el-breadcrumb-item>
				</el-breadcrumb>
				<el-dropdown>
					<el-dropdown-menu></el-dropdown-menu>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>查看</el-dropdown-item>
						<el-dropdown-item>新增</el-dropdown-item>
						<el-dropdown-item>删除</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<span>
					<i class="el-icon-setting" style="margin-right: 15px"></i>
					王小虎
				</span>
			</el-header>
			<el-main>
				<timetableT v-if="num == 801"></timetableT>
				<approve v-if="num == 802" :teacherCourseId="teacherCourseId"></approve>
				<cviolation v-if="num == 501"></cviolation>
				<cappeal v-if="num == 502"></cappeal>
				<crelieve v-if="num == 503"></crelieve>
				<manage v-if="num == 504"></manage>
				<fmakeupteacher v-if="num == 1101"></fmakeupteacher>
				<fappealteacher v-if="num == 903"></fappealteacher>
				<fviolationteacher v-if="num == 902"></fviolationteacher>
				<fdisciplinaryteacher v-if="num == 901"></fdisciplinaryteacher>
				<fleaveteacher v-if="num == 1001"></fleaveteacher>
				<fholidayteacher v-if="num == 1002"></fholidayteacher>
			</el-main>
		</el-container>
	</el-container>
</template>
<script>
/*违纪管理*/
import cviolation from '../../components/cviolation.vue';
/*学生证补办审批*/
import fmakeupteacher from '../../components/fmakeupteacher.vue';
/*审批学生违纪解除*/
import fappealteacher from '../../components/fappealteacher.vue';
/*审批学生申诉*/
import fviolationteacher from '../../components/fviolationteacher.vue';
/*审批学生违纪情况*/
import fdisciplinaryteacher from '../../components/fdisciplinaryteacher.vue';
/*审批学生请假*/
import fleaveteacher from '../../components/fleaveteacher.vue';
/*查阅学生节日去向信息*/
import fholidayteacher from '../../components/fholidayteacher.vue';
// 课程表(教师)
import timetableT from '../../components/timetableT.vue';
//寝室调整管理
import manage from '../../components/manage.vue';
//在线审批
import approve from '../../components/approve.vue';

export default {
	data() {
		return {
			num: 0,
			teacherCourseId:'',
		};
	},
	methods: {
		makeup(index) {
			this.num = index;
			console.log(index);
		}
	},
	components: {
		fmakeupteacher,
		fappealteacher,
		fviolationteacher,
		fdisciplinaryteacher,
		fleaveteacher,
		fholidayteacher,
		cviolation,
		timetableT,
		manage,
		approve,
	},
	mounted() {
		uni.$on('approve',callback=>{
			this.teacherCourseId=callback.teacherCourseId;
			console.log(this.teacherCourseId)
			this.num=802;
		})
	}
};
</script>
<style>
.el-header {
	background-color: #b3c0d1;
	color: #333;
	line-height: 60px;
}

.el-aside {
	color: #333;
}
</style>
