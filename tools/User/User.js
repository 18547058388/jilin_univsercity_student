/**
 * 用户相关信息
 * 
 * @type {Object} 保存、读取本地的用户信息
 */
export default class User {
	/**
	 * 单例
	 */
	static getInstance() {
		if (!this.instance) {
			this.instance = new User();
		}
		return this.instance;
	}
	
	/**
	 * 保存用户信息
	 * 
	 * @param {Object} userInfo
	 */
	saveUserInfo(userInfo) {
		for (let key in userInfo) {
			this.vm.$u.vuex('vuex_user.' + key, userInfo[key]);
		}
	}
	
	/**
	 * 清空用户信息
	 */
	clearUserInfo(userInfo) {
		for (let key in this.vm.vuex_user) {
			this.vm.$u.vuex('vuex_user.' + key, '');
		}
	}
	
	/**
	 * 判断是否需要授权拉取用户信息
	 */
	needAuthorizeWithSnsapiUserinfo(options) {
		// #ifdef MP-WEIXIN
		if (this.vm.vuex_user.snsWxMiniUserinfo == 0) {
			this.vm.navigation.push({
				url: '/pages/index/login',
				query: {
					login: true
				}
			});
			return true;
		}
		// #endif
		
		// #ifdef MP-TOUTIAO
		if (this.vm.vuex_user.snsBytedanceAuth == 0) {
			this.vm.navigation.push({
				url: '/pages/index/login',
				query: {
					login: true
				}
			});
			return true;
		}
		// #endif
		
		// #ifdef H5
		if (this.vm.vuex_user.snsapiUserinfo == 0) {
			this.vm.wechatJS.authorizeForUserInfo(options);
			return true;
		}
		// #endif
		
		return false;
	}
	
	/**
	 * 是否需要绑定手机号
	 */
	needBindCellphone() {
		if (this.vm.vuex_user.cellphone == '') {
			let self = this;
			this.vm.alert.showDialog({
				title: '温馨提示',
				message: '为了确保能联系到您，需要您在下单前绑定手机号码',
				confirmText: '前往绑定',
				confirm: () => {
					self.vm.navigation.push({
						url: '/mine/account/bind-cellphone/index'
					});
				}
			});
			return true;
		}
		return false;
	}
	
	get vm() {
		// #ifdef MP-WEIXIN || MP-TOUTIAO
		return getApp().$vm;
		// #endif
		// #ifdef H5
		return getApp();
		// #endif
		// #ifdef APP-PLUS
		return getApp();
		// #endif
	}
}
