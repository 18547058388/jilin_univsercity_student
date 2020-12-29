export default class Navigation {
	/**
	 * 单例
	 */
	static getInstance() {
		if (!this.instance) {
			this.instance = new Navigation();
		}
		return this.instance;
	}

	/**
	 * 页面跳转，push方式，会加入到页面栈里
	 * 
	 * @param {Object} option 跳转的参数对象，url：跳转的页面path，query：需要传递的参数
	 */
	push(option) {
		uni.navigateTo({
			url: this.formatUrl(option)
		});
	}

	/**
	 * 页面返回
	 * 
	 * @param {Number} delta  返回的页面数，如果 delta 大于现有页面数，则返回到首页。
	 */
	back(delta) {
		uni.navigateBack({
			delta: delta
		});
	}

	/**
	 * 关闭当前页面，跳转到应用内的某个页面。
	 * 
	 * @param {Object} option 跳转的参数对象，url：跳转的页面path，query：需要传递的参数
	 */
	redirect(option) {
		uni.redirectTo({
			url: this.formatUrl(option)
		});
	}

	/**
	 * 关闭所有页面，打开到应用内的某个页面。
	 * 
	 * @param {Object} option 跳转的参数对象，url：跳转的页面path，query：需要传递的参数
	 */
	reLaunch(option) {
		uni.reLaunch({
			url: this.formatUrl(option)
		});
	}

	/**
	 * 处理跳转时的地址和参数
	 * 
	 * @param {String} query.url   页面地址
	 * @param {String} query.query 页面参数
	 */
	formatUrl(option) {
		let index = option.url.indexOf('?');
		let symbol = index > 0 ? '&' : '?';
		let url = option.url;

		// #ifdef H5
		url += symbol + 'jyKey=' + this.vm.vuex_company.jyKey;
		if (this.vm.vuex_user.memberId) {
			url += '&spare_smid=' + this.vm.vuex_user.memberId;
		}
		// #endif

		if (option.query) {
			let queryText = '';
			let question = true;

			for (let key in option.query) {
				if (key == 'spare_smid' || key == 'jyKey') {
					continue;
				}

				// #ifndef H5
				queryText += question ? '?' : '&';
				if (question) question = false;
				// #endif
				// #ifdef H5
				queryText += '&';
				// #endif

				let value = option.query[key];

				if (typeof value == 'object' || typeof value == 'array') {
					queryText += key + '=' + JSON.stringify(value);
				} else {
					queryText += key + '=' + value;
				}
			}

			url += queryText;
		}

		return url;
	}

	/**
	 * 将连接的字符串解析成页面url和参数对象
	 * 
	 * @param {Object} queryString
	 */
	parseQueryString(queryString) {
		let index = queryString.indexOf('?'); // 问号的位置
		let url = ''; // 页面路径
		let params = {}; // 页面参数
		// ’?'在字符串头部
		if (index == 0) {
			let paramsString = queryString.substring(1);
			params = this.parseParamString(paramsString);
		}
		// ’?'在字符串中间
		else if (index > 0 && index < queryString.length - 1) {
			url = queryString.substring(0, index);
			let paramsString = queryString.substring(index + 1);
			params = this.parseParamString(paramsString);
		}
		// ’?'在字符串末尾
		else if (index == queryString.length - 1) {
			url = queryString.substring(0, index);
		}
		// 没有‘?’
		else {
			url = queryString;
		}

		if (url.indexOf('/') != 0) {
			url = '/' + url;
		}

		return {
			url: url,
			query: params
		}
	}

	/**
	 * 解析参数
	 * 
	 * @param {Object} paramString
	 */
	parseParamString(paramString) {
		if (!paramString || typeof paramString != 'string') {
			return {};
		}
		let array = paramString.split('&');
		let params = {};
		array.forEach(item => {
			if (item.indexOf('=') > 0) {
				let itemArray = item.split('=');
				params[itemArray[0]] = itemArray[1];
			}
		});
		return params;
	}

	/**
	 * 判断是push还是back
	 */
	pushOrBack(path) {
		let currentPages = getCurrentPages();
		console.log(currentPages);
		for (let i = 0; i < currentPages.length; i++) {
			let page = currentPages[i];
			if (page.route === path) {
				// 页面是当前的页面，无需跳转
				if (i === currentPages.length - 1) {
					return {
						type: 'current'
					};
				}
				// 页面在currentPages中且不是当前页面，需要回退
				else {
					return {
						type: 'back',
						number: currentPages.length - 1 - i
					};
				}
			}
		}
		// 页面不在currentPages中，需要push
		return {
			type: 'push'
		};
	}

	get vm() {
		// #ifdef MP
		return getApp().$vm;
		// #endif
		// #ifdef H5
		return getApp();
		// #endif
		// #ifdef APP-PLUS
		return getApp().$vm;
		// #endif
	}
}
