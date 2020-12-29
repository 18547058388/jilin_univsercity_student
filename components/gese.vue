<template>
	<view>
	<el-table
	    :data="tableData"
	    stripe
	    style="width: 600px;margin-left: 20px;">
	    <el-table-column
	      prop="date"
	      label="学年"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="address"
	      label="课程名称"
		  width="150">
	    </el-table-column>
		<el-table-column
		  prop="xuefen"
		  label="学分"
		  width="150">
		</el-table-column>
		<el-table-column
		  prop="chengji"
		  label="成绩"
		  width="150">
		</el-table-column>
	  </el-table>
	</view>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2018-2019',
          address: '网页设计',
		  xuefen:'2.5',
		  chengji:'90'
        }, {
          date: '2018-2019',
          address: '网页设计',
		  xuefen:'2.5',
		  chengji:'90'
        }, {
          date: '2018-2019',
          address: '网页设计',
		  xuefen:'2.5',
		  chengji:'90'
        }, {
          date: '2018-2019',
          address: '网页设计',
		  xuefen:'2.5',
		  chengji:'90'
        },]
      }
    }
  }
</script>

<style>
</style>
