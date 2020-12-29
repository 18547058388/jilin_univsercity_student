// 接口返回状态码
export default {
	// 成功
	success: '00000',
	// 会员不存在
	user_not_exist: '40204',
	// 需要重新授权
	unauthorized: '40007',
	// 支付成功，但微信没有回调
	pay_success_without_callback: '50401',
	// 活动支付成功，单微信没有回调
	activity_pay_success_without_callback: '50411',
};
