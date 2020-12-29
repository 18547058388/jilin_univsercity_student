export default {
	/**
	 * 转换会员卡优惠描述
	 */
	getCheapTypeDesc: function(mscard) {
		// 优惠类型
		switch (mscard.cheapType) {
			// 折扣
			case 1:
			let cheapTypeDesc = '';
				if (mscard.minSumLimit != -1) {
					cheapTypeDesc =  '满' + mscard.minSumLimit + '元打' + mscard.cardDiscount + '折';
				} else {
					cheapTypeDesc = mscard.cardDiscount + '折';
				}
				
				if (mscard.maxSumLimit != -1) {
					cheapTypeDesc += '，超过' + mscard.maxSumLimit + '元的部分不参与打折。'
				}
				
				return cheapTypeDesc;
				
				// 满减
			case 2:
				return '满' + mscard.cardReachSum + '元减' + mscard.cardReduceSum + '元';
			default:
				return '';
		}
	},

	getUseTimeLimitDesc: function(mscard) {
		// 有效期
		switch (mscard.useTimeLimit) {
			// 永久
			case 1:
				return '永久';
				// 时间范围
			case 2:
				return mscard.useStartTime + ' 至 ' + mscard.useEndTime;
			case 3:
				return '自发放日期起' + mscard.useTime + '天内有效';
		}
	}
};
