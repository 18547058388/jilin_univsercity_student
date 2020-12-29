<template>
	<!-- 学生证补办审批 -->
  <el-table
   stripe
    :data="tableData"
    border
    style="width: 100%;">
	<el-table-column
	  prop="province"
	  label="头像"
	  width="115">
	  <image class="userimg" src="../static/logo.png"></image>
	</el-table-column>
    <el-table-column
      prop="date"
      label="日期"
      width="100">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="年级"
      width="200">
    </el-table-column>
	<el-table-column
	  prop="province"
	  label="导员"
	  width="200">
	</el-table-column>
    <el-table-column
      prop="shepi"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="primary" size="small" style="margin-left: 10px;margin-bottom: 5px;">同意</el-button>
        <el-button @click="handleClick(scope.row)" type="warning" size="small">拒绝</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
		  
        },{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
		  
        },{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
		  
        }
		]
      }
    }
  }
</script>
<style>
	.userimg{
		width: 90px;
		height:120px;
	}
</style>