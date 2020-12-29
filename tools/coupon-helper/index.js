/**
 * 优惠券辅助类
 */
export default class CouponHelper {
	/**
	 * 返回优惠描述
	 * 
	 * @param {Object} coupon 优惠券对象
	 */
	static getCheapTypeDesc(coupon) {
		// 优惠类型
		switch (coupon.cheapType) {
			// 折扣
			case 1:
				return coupon.couponDiscount + '折';
				// 满减
			case 2:
				return '满' + coupon.couponReachSum + '元减' + coupon.couponReduceSum + '元';
				// 免费
			case 3:
				return '兑换礼品';
				// 次数
			case 4:
				return '×' + coupon.couponTimesNum + '次';
			default:
				return '';
		}
	}

	/**
	 * 返回我的优惠券优惠标题
	 * 
	 * @param {Object} coupon 优惠券对象
	 */
	static getMyCouponCheapTitle(coupon) {
		// 优惠类型
		switch (coupon.cheapType) {
			// 折扣
			case 1:
				return coupon.couponDiscount;
				// 满减
			case 2:
				return coupon.couponReduceSum;
				// 免费
			case 3:
				return '兑换';
				// 次数
			case 4:
				return coupon.couponTimesNum + '/' + coupon.couponTimesTotalNum;
			default:
				return '';
		}
	}

	/**
	 * 返回我的优惠券优惠描述
	 *
	 * @param {Object} coupon 优惠券对象
	 */
	static getMyCouponCheapDesc(coupon) {
		// 优惠类型
		switch (coupon.cheapType) {
			// 满减
			case 2:
				return '满' + coupon.couponReachSum + '元可用';
			default:
				return '';
		}
	}

	/**
	 * 返回优惠券有效期
	 * 
	 * @param {Object} coupon 优惠券对象
	 */
	static getUseTimeLimitDesc(coupon) {
		// 有效期
		switch (coupon.useTimeLimit) {
			// 永久
			case 1:
				return '永久有效';
				// 时间范围
			case 2:
				return coupon.useStartTime + ' 至 ' + coupon.useEndTime;
			case 3:
				return '自发放日期起' + coupon.useTime + '天内有效';
			default:
				return '永久有效';
		}
	}

	/**
	 * 返回我的优惠券有效期描述
	 * 
	 * @param {Object} coupon 优惠券对象
	 */
	static getMyCouponUseTimeLimitDesc(coupon) {
		if (this.isFriendCoupon(coupon)) {
			return coupon.effectEndTime + '前完成任务激活';
		}
		// 有效期
		switch (coupon.useTimeLimit) {
			// 时间范围
			case 2:
			case 3:
				let now = new Date();
				let startDate = new Date(coupon.useStartTime.replace(/-/g, '/'));
				if (now.getTime() > startDate.getTime()) {
					return '有效期至' + coupon.useEndTime;
				}
				return coupon.useStartTime + ' 至 ' + coupon.useEndTime;
			default:
				return '永久有效';
		}
	}

	/**
	 * 是否为好友券
	 * 
	 * @param {Object} coupon 优惠券对象
	 */
	static isFriendCoupon(coupon) {
		return coupon.effectType == 2 || coupon.effectType == 3;
	}
};
