<template>
	<view style="margin-left: 20px;">
		<el-table stripe :data="PayInventoryArray" style="width: 900px">
			<el-table-column prop="schoolYearName" label="学年" width="300"></el-table-column>
			<el-table-column prop="payName" label="欠费类目" width="300"></el-table-column>
			<el-table-column prop="paySum" label="欠费金额 (元)" width="300"></el-table-column>
		</el-table>
	</view>
</template>

<script>
export default {
	data() {
		return {
			PayInventoryArray: [],
		};
	},
	mounted() {
		//欠费明细
		this.getPayInventory();
	},
	methods: {
		/**
		 * 欠费明细
		 */
		getPayInventory() {
			let self = this;
			this.request.post({
				url: 'student/student/pay/history/v1/payHistoryList',
				params: {
					isPay: 0
				},
				success: response => {
					console.log(response);
					self.PayInventoryArray = response.rtData.dts;
				},
				error: error => {
					console(error.errMsg);
				}
			});
		}
	}
};
</script>

<style></style>
