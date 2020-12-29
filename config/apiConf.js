/** 
 * api地址配置 
 * 20201102 menglt add
 * uri 请求地址
 * pages 调用页面
 */
export default {

	/* 分页查询网店商品列表 http://jyapi.jycloud.xyz/jyapi/document/detailPage?id=842 */
	skl_api_mall_v4_spu_shopMallSpu: {
		uri: 'superSkl/api/mall/v4/spu/shopMallSpu',
		pages: [
			'pages/mall/goods/list', 'skl/home/mixins'
		]
	},

	/* 分页查询门店 http://jyapi.jycloud.xyz/jyapi/document/detailPage?id=347 */
	skl_api_store_v1_page: {
		uri: 'superSkl/api/store/v1/page',
		pages: [
			'skl/home/mixins', 'pages/order/create/mall'
		]
	},

	/* 查询店铺列表 http://jyapi.jycloud.xyz/jyapi/document/detailPage?id=840 */
	skl_api_shop_v1_mallShopList: {
		uri: 'superSkl/api/mall/shop/v1/mallShopList',
		pages: [
			'skl/home/mixins'
		]
	},

	/* 查询快捷入口列表 http://jyapi.jycloud.xyz/jyapi/document/detailPage?id=828 */
	skl_api_v2_entry_list: {
		uri: 'superSkl/api/v2/entry/list',
		pages: [
			'skl/home/mixins', 'skl/mine/mine'
		]
	},

	/* 商城结算 http://jyapi.jycloud.xyz/jyapi/document/detailPage?id=851 */
	skl_api_mall_tradeOrder_v2_preCreate: {
		uri: 'superSkl/api/mall/tradeOrder/v2/preCreate',
		pages: [

		]
	},

	/* 商城下单 http://jyapi.jycloud.xyz/jyapi/document/detailPage?id=852 */
	skl_api_mall_tradeOrder_v3_create: {
		uri: 'superSkl/api/mall/tradeOrder/v3/create',
		pages: [

		]
	},

	/* 查询邮寄方式 http://jyapi.jycloud.xyz/jyapi/document/detailPage?id=850 */
	skl_api_mall_v2_getMallTransport: {
		uri: 'superSkl/api/mall/v2/getMallTransport',
		pages: [
			'pages/order/create/mall'
		]
	},

	/* 查询邮寄方式 http://jyapi.jycloud.xyz/jyapi/document/detailPage?id=850 */
	skl_api_mall_v2_getMallTransport: {
		uri: 'superSkl/api/mall/v2/getMallTransport',
		pages: [
			'pages/order/create/mall'
		]
	},

	/* 查询邮寄方式 http://jyapi.jycloud.xyz/jyapi/document/detailPage?id=850 */
	skl_api_mall_v2_getMallTransport: {
		uri: 'superSkl/api/mall/v2/getMallTransport',
		pages: [
			'pages/order/create/mall'
		]
	},

	/* 获取会员信息 http://jyapi.jycloud.xyz/jyapi/document/detailPage?id=342 */
	skl_api_member_v1_getMemberInfo: {
		uri: 'superSkl/api/member/v1/getMemberInfo',
		pages: [
			'pages/agent/center'
		]
	},

	/* 查询会员区域代理 http://jyapi.jycloud.xyz/jyapi/document/detailPage?id=723 */
	skl_api_area_agent_v1_getAreaAgent: {
		uri: 'superSkl/api/area/agent/v1/getAreaAgent',
		pages: [
			'pages/agent/center'
		]
	},
	
	/* 查询区域代理配置 http://jyapi.jycloud.xyz/jyapi/document/detailPage?id=722 */
	skl_api_area_agent_v1_selectConfig: {
		uri: 'superSkl/api/area/agent/v1/selectConfig',
		pages: [
			'pages/agent/center'
		]
	}
};
