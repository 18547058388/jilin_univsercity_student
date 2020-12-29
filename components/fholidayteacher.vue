<template>
	<!-- 查阅学生假日去向 -->
  <el-table
    :data="tableData"
    border
	stripe
    style="width: 100%">
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
      label="假日去向"
      width="200">
    </el-table-column>
    <el-table-column
      prop="shepi"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="primary" size="small" style="margin-left: 10px;margin-bottom: 5px;">同意</el-button>
        <el-button @click="handleClick(scope.row)" type="danger" size="small">拒绝</el-button>
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
		  //列表数组
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