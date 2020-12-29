<template>
	<view style="min-width: 600px;">
		<el-select v-model="schoolYearvalue" placeholder="按学年查询" clearable filterable style="width: 150px;margin-top: 20px;">
			<el-option v-for="item in schoolYearoptions" :key="item.schoolYearvalue" :value="item.schoolYearlabel"></el-option>
		</el-select>
		<el-select v-model="payNamevalue" placeholder="按缴费类目查询" clearable filterable style="width: 150px;margin-left: 20px;">
			<el-option v-for="item in payNameoptions" :key="item.payNamevalue" :value="item.payNamelabel"></el-option>
		</el-select>
		<el-button icon="el-icon-search" type="success" style="margin-left: 20px;width: 120px;" @click="getPayInventory">搜索</el-button>
		<view class="tabel" style="margin-top: 20px;margin-left: 20px;">
			<el-table :data="PayInventoryArray" stripe style="width: 900px">
				<el-table-column prop="schoolYearName" label="学年" width="300"></el-table-column>
				<el-table-column prop="payName" label="缴费类目" width="300"></el-table-column>
				<el-table-column prop="paySum" label="金额 (元)" width="300"></el-table-column>
			</el-table>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//缴费清单数组
			PayInventoryArray: [],
			//学年数组
			schoolYearoptions: [
				{
					schoolYearlabel: '大一'
				},
				{
					schoolYearlabel: '大二'
				},
				{
					schoolYearlabel: '大三'
				},
				{
					schoolYearlabel: '大四'
				}
			],
			//拿到学年的值
			schoolYearvalue: '',
			//缴费类目数组
			payNameoptions: [
				{
					payNamelabel: '学费'
				},
				{
					payNamelabel: '住宿费'
				},
				{
					payNamelabel: '书本费'
				},
				{
					payNamelabel: '学杂费'
				}
			],
			//缴费类目的值
			payNamevalue: ''
		};
	},
	mounted() {
		//缴费清单
		this.getPayInventory();
	},
	methods: {
		/*
		 *查询已缴费情况具体清单
		 * */
		getPayInventory() {
			let self = this;
			this.request.post({
				url: 'student/student/pay/history/v1/payHistoryList',
				params: {
					isPay: 1,
					payName: this.payNamevalue,
					schoolYearName: this.schoolYearvalue
				},
				success: response => {
					console.log(response);
					self.PayInventoryArray = response.rtData.dts;
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
