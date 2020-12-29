import weixin from 'jweixin-module';

export default class WechatJS {
	constructor() {
		this.weixin = weixin;
		this.forceRefresh = 1;
	}

	/**
	 * 单例
	 */
	static getInstance() {
		if (!this.instance) {
			this.instance = new WechatJS();
		}
		return this.instance;
	}

	/**
	 * 初始化微信jssdk
	 * 
	 * @param {Number} forceRefresh 强制刷新token状态 0.不刷新；1.刷新；
	 */
	async init(forceRefresh = 0) {
		if (this.vm.vuex_user.memberId == '') {
			return;
		}
		this.wxConfig = await this.getWechatJsInitParams(forceRefresh);
		this.weixin.config({
			// 是否开启调试模式
			debug: false,
			// 必填，公众号的唯一标识
			appId: this.wxConfig.appId,
			// 必填，生成签名的时间戳
			timestamp: this.wxConfig.timestamp,
			// 必填，生成签名的随机串
			nonceStr: this.wxConfig.nonceStr,
			// 必填，签名
			signature: this.wxConfig.signature,
			// 必填，需要使用的JS接口列表
			jsApiList: [
				'chooseImage', // 选取图片
				'previewImage', // 预览图片
				'scanQRCode', // 扫一扫
				'chooseWXPay', // 支付
				'openAddress', // 共享收货地址
				'updateAppMessageShareData', // “分享给朋友”及“分享到QQ”
				'updateTimelineShareData', // “分享到朋友圈”及“分享到QQ空间”
				'openLocation', // 使用微信内置地图查看位置接口
				'getLocation', // 获取地理位置接口
				'hideMenuItems',
				'openBusinessView'
			]
		});
		let self = this;
		this.weixin.ready(() => {
			console.log('wechat-js初始化成功');
			self.weixin.hideMenuItems({
				menuList: [
					'menuItem:share:qq',
					'menuItem:share:weiboApp',
					'menuItem:share:facebook',
					'menuItem:share:QZone',
					'menuItem:copyUrl',
					'menuItem:openWithQQBrowser',
					'menuItem:openWithSafari'
				]
			});
		});
		this.weixin.error(res => {
			console.log('wechat-js初始化异常');
			console.log(res);
			if (self.forceRefresh == 1) {
				self.init(self.forceRefresh);
				self.forceRefresh--;
			}
		});
	}

	/**
	 * 公众号授权(拉取用户信息)
	 */
	async authorizeForUserInfo(state) {
		// 查询微信平台配置
		let weixinConfig = await this.getWeixinConfig();
		// 回调网址
		let redirectUri = this.vm.config.snsapiUserinfoUrl + '?jyKey=' + this.vm.vuex_jyKey;

		if (Object.keys(state).length > 1) {
			for (let key in state) {
				if (key !== 'mt' && key !== 'jyKey' && key != 'mid') {
					redirectUri += '&' + key + '=' + state[key]
				}
			}
		}

		// 授权网址
		let authorizeURL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + weixinConfig.appid +
			'&redirect_uri=' + encodeURIComponent(redirectUri) +
			'&response_type=code&scope=snsapi_userinfo&state=' + state.mt + '#wechat_redirect';

		// 跳转到授权网址
		window.location.href = authorizeURL;
	}

	/**
	 * 公众号授权(静默授权，只获取openid)
	 */
	async authorizeForBase(state) {
		// 查询微信平台配置
		let weixinConfig = await this.getWeixinConfig();
		// 回调网址
		let redirectUri = this.vm.config.snsapiBaseUrl + '?jyKey=' + this.vm.vuex_jyKey;

		if (Object.keys(state).length > 1) {
			for (let key in state) {
				if (key !== 'mt' && key !== 'jyKey' && key != 'mid') {
					redirectUri += '&' + key + '=' + state[key];
				}
			}
		}

		// 授权网址
		let authorizeURL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + weixinConfig.appid +
			'&redirect_uri=' + encodeURIComponent(redirectUri) +
			'&response_type=code&scope=snsapi_base&state=' + state.mt + '#wechat_redirect';

		// 跳转到授权网址
		window.location.href = authorizeURL;
	}

	/**
	 * 查询微信平台配置
	 */
	getWeixinConfig() {
		return this.vm.request.postWithPromise({
			url: 'superSkl/api/v1/getWxConfig',
			params: {
				device: 'wxmp'
			}
		});
	}


	/**
	 * 获取初始化微信js-sdk初始化参数
	 * 
	 * @param {Number} forceRefresh 强制刷新token状态 0.不刷新；1.刷新；
	 */
	getWechatJsInitParams(forceRefresh = 0) {
		this.jssdkUrl = location.href.split('#')[0];

		return this.vm.request.postWithPromise({
			url: 'superSkl/api/member/v1/initJssdk',
			params: {
				memberId: this.vm.vuex_user.memberId,
				jssdkUrl: this.jssdkUrl,
				forceRefresh: forceRefresh
			}
		});
	}

	/**
	 * 微信公众号支付
	 * 
	 * @param {String}   option.orderInfo 预支付信息
	 * @param {Function} option.success 支付成功的回调
	 * @param {Function} option.failed  支付失败的回调
	 */
	async pay(option) {
		// 检查支付api是否可用
		var canUse = await this.checkJsApi('chooseWXPay');
		if (!canUse) {
			this.vm.alert.showMessage('当前版本不支持微信支付');
			if (option.failed) {
				option.failed({
					errMsg: '当前版本不支持微信支付'
				});
			}
			return;
		}
		// 获取微信预支付订单信息
		// var orderInfo = await this.preparePay(option.orderId);

		// 调起微信公众号支付
		this.weixin.chooseWXPay({
			timestamp: option.orderInfo.timestamp,
			nonceStr: option.orderInfo.nonceStr,
			'package': option.orderInfo['package'],
			signType: option.orderInfo.signType,
			paySign: option.orderInfo.paySign,
			success: response => {
				// 支付成功的回调
				if (option.success) {
					option.success(response);
				}
			},
			fail: response => {
				// 支付取消的回调
				if (option.failed) {
					option.failed(response);
				}
			}
		});
	}


	/**
	 * 微信选取图片
	 * 
	 * @param {Number}   option.count   选取的图片数量
	 * @param {Function} option.success 调用成功的回调
	 */
	async chooseImage(option) {
		// 检查支付api是否可用
		let canUse = await this.checkJsApi('chooseImage');
		if (!canUse) {
			getApp().alert.showMessage('当前版本不支持选取图片');
			return;
		}
		this.weixin.chooseImage({
			count: option.count,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: function(res) {
				console.log(res);
				var localIds = res.localIds;
				if (option.success) {
					option.success(res);
				}
			}
		});
	}

	/**
	 * 预览图片
	 * 
	 * @param {Array}    option.urls    图片数组
	 * @param {Number}   option.current 当前显示的图片索引
	 * @param {Function} option.success 调用成功的回调
	 */
	async previewImage(option) {
		// 检查支付api是否可用
		let canUse = await this.checkJsApi('previewImage');
		if (!canUse) {
			return;
		}
		this.weixin.previewImage({
			// 当前显示图片的http链接
			current: option.urls[option.current],
			// 需要预览的图片http链接列表
			urls: option.urls
		});
	}

	/**
	 * 扫一扫
	 * @param {Function} success 调用成功的回调
	 */
	scanQRCode(success) {
		// 调起微信扫一扫
		this.weixin.scanQRCode({
			// 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			needResult: 1,
			// 可以指定扫二维码还是一维码，默认二者都有
			scanType: ['qrCode'],
			success: function(response) {
				// 开发环境
				if (process.env.NODE_ENV === 'development') {
					console.log('微信扫一扫调用成功：' + JSON.stringify(response));
				}
				if (success) {
					success(response.resultStr)
				}
			}
		});
	}

	/**
	 * 分享到好物圈
	 *  
	 * @param {Object} productObject 商品对象
	 */
	async openBusinessView(productObject) {
		// 检查接口是否可用
		let canUse = await this.checkJsApi('openBusinessView');
		if (!canUse) {
			this.vm.alert.showMessage('当前微信版本不支持推荐到好物圈');
			return;
		}

		this.vm.alert.showLoading();
		this.wxConfig = await this.getWechatJsInitParams();
		let jsCheckObject = {
			appid: this.wxConfig.appId,
			timestamp: this.wxConfig.timestamp,
			noncestr: this.wxConfig.nonceStr,
			signature: this.wxConfig.signature,
			url: this.jssdkUrl
		};
		this.vm.alert.hideLoading();

		let self = this;
		this.weixin.openBusinessView({
			businessType: 'friendGoodsRecommend',
			queryString: `jsCheck=${encodeURIComponent(JSON.stringify(jsCheckObject))}&product=${encodeURIComponent(JSON.stringify(productObject))}`,
			success(res) {
				console.log("res: " + JSON.stringify(res));
			},
			fail(res) {
				self.vm.alert.showDialog({
					title: '提示',
					message: JSON.stringify(res)
				})
				console.log("res: " + JSON.stringify(res));
			}
		});
	}

	/**
	 * 检查API是否可用
	 * 
	 * @param {String} apiName JS接口名称
	 */
	checkJsApi(apiName) {
		if (!this.isWeiXinH5) {
			return false;
		}
		let self = this;
		return new Promise(function(resolve, reject) {
			console.log(apiName);
			self.weixin.checkJsApi({
				jsApiList: [apiName],
				success: function(res) {
					console.log("res: " + JSON.stringify(res));
					// 开发环境
					if (process.env.NODE_ENV === 'development') {
						console.log('微信js-sdk-checkJsApi：' + JSON.stringify(res));
					}
					resolve(res.checkResult[apiName]);
				}
			});
		});
	}

	/**
	 * 同步微信收货地址
	 */
	openAddress(success) {
		this.weixin.openAddress({
			success: response => {
				success(response);
			}
		});
	}


	/**
	 * 公共分享设置
	 */
	setShareInfoForCommon() {
		this.setShareInfo({
			title: this.vm.vuex_company.sklH5SiteName,
			desc: '来自好友' + this.vm.vuex_user.nickName + '的分享',
			link: this.vm.config.baseUrl + 'skl/index',
			imgUrl: this.vm.vuex_company.sklH5SiteSharePic
		});
	}

	/**
	 * 设置分享内容
	 * 
	 * @param {String}   option.title   分享标题
	 * @param {String}   option.desc    分享描述
	 * @param {String}   option.link    分享链接
	 * @param {Object}   option.parms   分享链接中的参数对象
	 * @param {String}   option.imgUrl  分享图片
	 * @param {Function} option.success 分享成功回调
	 */
	setShareInfo(option) {
		let shareParams = '';
		let questionMark = true;
		if (option.params) {
			for (let key in option.params) {
				if (key != 'jyKey' && key != 'smid' && key != 'mid') {
					if (questionMark) {
						shareParams += '?';
						questionMark = false;
					} else {
						shareParams += '&';
					}

					shareParams += key + '=' + option.params[key];
				}
			}
		}

		if (questionMark) {
			shareParams += '?jyKey=' + this.vm.vuex_company.jyKey;
			questionMark = false;
		} else {
			shareParams += '&jyKey=' + this.vm.vuex_company.jyKey;
		}
		shareParams += '&smid=' + this.vm.vuex_user.memberId + '&reset=true';
		let self = this;
		this.weixin.ready(function() {
			self.weixin.hideMenuItems({
				menuList: [
					'menuItem:share:qq',
					'menuItem:share:weiboApp',
					'menuItem:share:facebook',
					'menuItem:share:QZone',
					'menuItem:copyUrl',
					'menuItem:openWithQQBrowser',
					'menuItem:openWithSafari'
				]
			});

			// 分享给朋友
			self.weixin.updateAppMessageShareData({
				title: option.title,
				desc: option.desc,
				link: option.link + shareParams,
				imgUrl: option.imgUrl,
				success: function() {
					if (option.success) {
						option.success();
					}
				}
			});

			// 分享到朋友圈
			self.weixin.updateTimelineShareData({
				title: option.title,
				link: option.link + shareParams,
				imgUrl: option.imgUrl,
				success: function() {
					if (option.success) {
						option.success();
					}
				}
			});
		});
	}

	/**
	 * 判断是否在微信内置浏览器中打开
	 * 
	 * return {Boolean} 是否是微信内置浏览器
	 */
	get isWeiXinH5() {
		let ua = window.navigator.userAgent.toLowerCase();
		let index = ua.indexOf('micromessenger');
		return index >= 0;
	}

	get vm() {
		// #ifdef APP-PLUS
		return getApp();
		// #endif
		// #ifdef MP
		return getApp().$vm;
		// #endif
		// #ifdef H5
		return getApp();
		// #endif

	}
}
