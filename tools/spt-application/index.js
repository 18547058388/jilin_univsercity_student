/**
 * 全局Application, 用于解决App.vue中onLaunch中执行异步方法时, 确保页面的onLoad在onLaunch后执行
 */
export default class Application {
	/**
	 * 构造方法
	 */
	constructor() {
		// 应用是否初始化完成
		this._launched = false;
		// 是否设置完option
		this._setOnLoadCallBack = false;
		// 页面初始化完成时的操作回调
		this.onLoadCallback = null;
		// 应用初始化完成时的操作回调
		this.onLaunchCallback = null;
	}

	/**
	 * 单例
	 */
	static getInstance() {
		if (!this.instance) {
			this.instance = new Application();
		}
		return this.instance;
	}

	set launched(newValue) {
		this._launched = newValue;
		if (this.onLoadCallback) {
			this.onLoadCallback();
		}
	}
	get launched() {
		return this._launched;
	}

	set setOnLoadCallBack(newValue) {
		this._setOnLoadCallBack = newValue;
		if (newValue && this.onLaunchCallback) {
			this.onLaunchCallback();
		}
	}
	get setOnLoadCallBack() {
		return this._setOnLoadCallBack;
	}

	/**
	 * 应用初始化完成时调用
	 * 
	 * @param {Function} onLaunchCallback 在app.vue中的onLaunch()中所执行的操作
	 */
	onLaunch(onLaunchCallback) {
		if (this.setOnLoadCallBack) {
			onLaunchCallback();
		} else {
			this.onLaunchCallback = onLaunchCallback;
		}
	}

	/**
	 * 页面初始化完成时调用
	 * 
	 * @param {Function} onLoadCallback 在页面的onLoad()中所执行的操作
	 */
	onLoad(onLoadCallback) {
		if (this.launched) {
			onLoadCallback();
		} else {
			this.onLoadCallback = onLoadCallback;
			this.setOnLoadCallBack = true;
		}
	}

	/**
	 * 是否首次打开app
	 */
	set firstOpen(newValue) {
		uni.setStorageSync('JYCLOUD_SUOKELIAN_APP_FIRST_OPEN', newValue ? 'true' : 'false');
	}
	get firstOpen() {
		if (uni.getStorageSync('JYCLOUD_SUOKELIAN_APP_FIRST_OPEN')) {
			return uni.getStorageSync('JYCLOUD_SUOKELIAN_APP_FIRST_OPEN') == 'true';
		}
		return true;
	}

	// 运行平台
	get platform() {
		// #ifdef H5
		return '1';
		// #endif

		// #ifdef APP-PLUS
		switch (plus.os.name) {
			case 'Android':
				return '2';
			case 'iOS':
				return '3';
		}
		// #endif

		// #ifdef MP-WEIXIN
		return '7';
		// #endif
		
		return '3';
	}

	/**
	 * 是否在微信浏览器中
	 */
	get isWechartBrowser() {
		// #ifdef H5
		var userAgent = window.navigator.userAgent.toLowerCase();
		var index = userAgent.indexOf('micromessenger');
		return index >= 0;
		// #endif

		// #ifndef H5
		return false;
		// #endif
	}

	/**
	 * 修改页面标题（针对iOS版微信）
	 * @param {Object} title 标题
	 */
	setTitle(title) {
		// #ifdef H5
		document.title = title;
		let userAgent = window.navigator.userAgent.toLowerCase();
		let isiOS = userAgent.indexOf('applewebkit') >= 0;
		let isWechat = userAgent.indexOf('micromessenger') >= 0;
		if (isiOS && isWechat) {
			let iframe = document.createElement('iframe');
			iframe.style.display = 'none';
			document.body.appendChild(iframe);
			iframe.onload = function() {
				setTimeout(function() {
					iframe.remove();
				}, 0)
			}
		}
		// #endif

		// #ifndef H5
		uni.setNavigationBarTitle({
			title: title
		});
		// #endif
	}
};
