<template>
	<el-container style="height: 1000px; border: 1px solid #eee">
		<el-aside width="200px" style="background-color: rgb(238, 241, 246)">
			<el-menu>
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-message"></i>
						课程情况（学生）
					</template>
					<el-menu-item-group><el-menu-item index="101" @click="makeup($event.index)">课程表</el-menu-item></el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-menu"></i>
						成绩管理
					</template>
					<el-menu-item-group>
						<el-menu-item index="201" @click="makeup($event.index)">基础成绩</el-menu-item>
						<el-menu-item index="202" @click="makeup($event.index)">成绩查询</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-setting"></i>
						缴费信息
					</template>
					<el-menu-item-group>
						<el-menu-item index="301" @click="makeup($event.index)">在校缴费清单</el-menu-item>
						<el-menu-item index="302" @click="makeup($event.index)">欠费情况</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="4">
					<template slot="title">
						<i class="el-icon-setting"></i>
						寝室管理
					</template>
					<el-menu-item-group>
						<!-- <template slot="title">分组一</template> -->
						<el-menu-item index="401" @click="makeup($event.index)">学生宿舍信息</el-menu-item>
						<el-menu-item index="402" @click="makeup($event.index)">宿舍调整管理</el-menu-item>
						<el-menu-item index="403" @click="makeup($event.index)">宿舍违纪管理</el-menu-item>
						<el-menu-item index="404" @click="makeup($event.index)">宿舍报修管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="5">
					<template slot="title">
						<i class="el-icon-setting"></i>
						学生事务管理
					</template>
					<el-menu-item-group>
						<!--  <template slot="title">分组一</template> -->
						<el-menu-item index="501" @click="makeup($event.index)">违纪管理</el-menu-item>
						<el-menu-item index="502" @click="makeup($event.index)">申诉管理</el-menu-item>
						<el-menu-item index="503" @click="makeup($event.index)">违纪解除</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="6">
					<template slot="title">
						<i class="el-icon-setting"></i>
						学生请假管理
					</template>
					<el-menu-item-group>
						<el-menu-item index="601" @click="makeup($event.index)">日常请假管理</el-menu-item>
						<el-menu-item index="602" @click="makeup($event.index)">节日去向管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="7">
					<template slot="title">
						<i class="el-icon-setting"></i>
						学生证补办管理
					</template>
					<el-menu-item-group><el-menu-item index="701" @click="makeup($event.index)">学生证补办申请</el-menu-item></el-menu-item-group>
				</el-submenu>
				<el-submenu index="8">
					<template slot="title">
						<i class="el-icon-setting"></i>
						课程情况（教师）
					</template>
					<el-menu-item-group><el-menu-item index="801" @click="makeup($event.index)">课程表</el-menu-item></el-menu-item-group>
				</el-submenu>
				<el-submenu index="9">
					<template slot="title">
						<i class="el-icon-message"></i>
						学生事务管理（教师）
					</template>
					<el-menu-item-group>
						<el-menu-item index="901" @click="makeup($event.index)">违纪管理</el-menu-item>
						<el-menu-item index="902" @click="makeup($event.index)">申诉管理</el-menu-item>
						<el-menu-item index="903" @click="makeup($event.index)">违纪解除</el-menu-item>
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
					 <el-dropdown-menu> </el-dropdown-menu> 
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>查看</el-dropdown-item>
						<el-dropdown-item>新增</el-dropdown-item>
						<el-dropdown-item>删除</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<span><i class="el-icon-setting" style="margin-right: 15px"></i>王小虎</span>
			</el-header>
			<el-main>
				<timetableS v-if="num == 101"></timetableS>
				<pay v-if="num == 301"></pay>
				<arrears v-if="num == 302"></arrears>
				<timetableT v-if="num == 801"></timetableT>
				<result v-if="num == 201"></result>
				<gese v-if="num == 202"></gese>
				<csrm v-if="num == 401"></csrm>
				<cchange v-if="num == 402"></cchange>
				<crvp v-if="num == 403"></crvp>
				<crepair v-if="num == 404"></crepair>
				<cviolation v-if="num == 501"></cviolation>
				<cappeal v-if="num == 502"></cappeal>
				<crelieve v-if="num == 503"></crelieve>
				<fmakeup v-if="num == 701"></fmakeup>
				<fmakeupteacher v-if="num == 1101"></fmakeupteacher>
				<fdailyleave v-if="num == 601"></fdailyleave>
				<fappealteacher v-if="num == 903"></fappealteacher>
				<fviolationteacher v-if="num == 902"></fviolationteacher>
				<fdisciplinaryteacher v-if="num == 901"></fdisciplinaryteacher>
				<fleaveteacher v-if="num == 1001"></fleaveteacher>
				<fholidayteacher v-if="num == 1002"></fholidayteacher>
				<fholidaydestination v-if="num == 602"></fholidaydestination>
			</el-main>
		</el-container>
	</el-container>
</template>
<script>
/*申诉管理*/
import cappeal from '../../components/cappeal.vue';
/*违纪解除*/
import crelieve from '../../components/crelieve.vue';
/*违纪管理*/
import cviolation from '../../components/cviolation.vue';
/*寝室报修管理*/
import crepair from '../../components/crepair.vue';
/*寝室违纪管理*/
import crvp from '../../components/crvp.vue';
/*学生宿舍信息*/
import csrm from '../../components/csrm.vue';
/*宿舍调整管理*/
import cchange from '../../components/cchange.vue';
/*学生证补办申请*/
import fmakeup from '../../components/fmakeup.vue';
/*学生证补办审批*/
import fmakeupteacher from '../../components/fmakeupteacher.vue';
/*学生日常请假*/
import fdailyleave from '../../components/fdailyleave.vue';
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
/*学生假日去向*/
import fholidaydestination from '../../components/fholidaydestination.vue';
// 在线缴费清单
import pay from '../../components/payInventory.vue';
// 欠费情况
import arrears from '../../components/arrears.vue';
// 课程表(学生)
import timetableS from '../../components/timetableS.vue';
// 课程表(教师)
import timetableT from '../../components/timetableT.vue';
// 基础成绩
import result from '../../components/result.vue';
// 成绩查询
import gese from '../../components/gese.vue';

export default {
	data() {
		return {
			num: 0
		};
	},
	methods: {
		makeup(index) {
			this.num = index;
			console.log(index);
		}
	},
	components: {
		fmakeup,
		fmakeupteacher,
		fdailyleave,
		fappealteacher,
		fviolationteacher,
		fdisciplinaryteacher,
		fleaveteacher,
		fholidayteacher,
		fholidaydestination,
		cappeal,
		crelieve,
		cviolation,
		crepair,
		crvp,
		csrm,
		cchange,
		pay,
		arrears,
		timetableS,
		timetableT,
		result,
		gese
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
