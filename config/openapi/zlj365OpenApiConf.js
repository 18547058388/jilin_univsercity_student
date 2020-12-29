export default {
	/* 根地址 */
	// requestUrl: 'https://www.zlj365.net/zhongljFront/aapi', // 开发
	requestUrl: 'https://www.zlj365.com/zhongljFront/aapi', // 生产

	/* 请求uri */
	citiesForGardenMethod: '/citiesForGarden', // 获取城市列表
	gardensMethod: '/gardens', // 获取全部小区
	gardenGridsMethod: '/gardenGrids', // 获取指定小区的楼房/单元/房间列表
	bindingRoomMethod: '/bindingRoom', // 【微信小程序】绑定房间
	getBindingRoomMethod: '/getBindingRoom', // 【微信小程序】获取绑定房间信息
	getGardenMethod: '/getGarden', // 【微信小程序】获取指定小区信息
  getzhongljFrontMethod:'/mini/login', //小程序授权登录
		getSelfGardensMethod:'/self/gardens',//获取当前用户所有小区列表
		getUserGardenGridsMethod:'/user/gardenGrids',//添加小区信息
		getRoomOwnerMethod:'/roomOwner',//获取房屋业主信息
		getSendRoomOwnerSmsMethod:'/sendRoomOwnerSms',//绑定房间发送验证码
	/* 页面 */
	pages_zlj365_my_house_list: '/pages/zlj365/my-house/list',
	pages_zlj365_my_house_edit: '/pages/zlj365/my-house/edit',
};
