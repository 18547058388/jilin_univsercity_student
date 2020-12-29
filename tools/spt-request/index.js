import rtcode from './rtcode.js';
import config from '@/config/config.js';

export default class Request {
	constructor() {
		this.baseUrl = config.requestUrl;
		this.clientKey = config.clientKey;
	}

	/**
	 * 单例
	 */
	static getInstance() {
		if (!this.instance) {
			this.instance = new Request();
		}
		return this.instance;
	}

	/**
	 * post请求
	 *
	 * @param {String}   options.url      请求网址
	 * @param {Object}   options.params   参数
	 * @param {Function} options.success  请求成功的回调
	 * @param {Function} options.failed   请求失败的回调
	 * @param {Function} options.error    请求错误的回调
	 * @param {Function} options.complete 请求完成的回调（无论成功或失败，都会调用）
	 */
	post(options) {
		this.request({
			method: 'POST',
			...options
		});
	}

	/**
	 * get请求
	 *
	 * @param {String}   options.url      请求网址
	 * @param {Object}   options.params   参数
	 * @param {Function} options.success  请求成功的回调
	 * @param {Function} options.failed   请求失败的回调
	 * @param {Function} options.error    请求错误的回调
	 * @param {Function} options.complete 请求完成的回调（无论成功或失败，都会调用）
	 */
	get(options) {
		this.request({
			method: 'GET',
			...options
		});
	}

	/**
	 * post请求
	 *
	 * @param {String}   option.url      请求网址
	 * @param {Object}   option.params   参数
	 * @param {Function} option.success  请求成功的回调
	 * @param {Function} option.fail     请求失败的回调
	 * @param {Function} option.error    请求错误的回调
	 * @param {Function} option.complete 请求完成的回调（无论成功或失败，都会调用）
	 */
	postWithPromise(options) {
		let self = this;
		return new Promise(resolve => {
			self.post({
				baseUrl: options.baseUrl,
				url: options.url,
				params: options.params || {},
				success: response => {
					if (response.rtData.dtObj) {
						resolve(response.rtData.dtObj);
					} else if (response.rtData.dts) {
						resolve(response.rtData.dts);
					} else if (response.rtData.dtStr) {
						resolve(response.rtData.dtStr);
					} else if (response.rtData.extMap) {
						resolve(response.rtData.extMap);
					} else {
						// self.vm.alert.showMessage(response.rtMsg);
						resolve(null);
					}
				},
				failed: response => {
					self.vm.alert.showMessage(response.rtMsg);
					resolve(null);
				},
				error: error => {
					self.vm.alert.showMessage(error.errMsg);
					resolve(null);
				}
			});
		});
	}

	/**
	 * get请求(Promise)
	 *
	 * @param {String}   option.url      请求网址
	 * @param {Object}   option.params   参数
	 * @param {Function} option.success  请求成功的回调
	 * @param {Function} option.fail     请求失败的回调
	 * @param {Function} option.error    请求错误的回调
	 * @param {Function} option.complete 请求完成的回调（无论成功或失败，都会调用）
	 */
	getWithPromise(options) {
		let self = this;
		return new Promise(resolve => {
			self.get({
				baseUrl: options.baseUrl,
				url: options.url,
				params: options.params || {},
				success: response => {
					if (response.rtData.dtObj) {
						resolve(response.rtData.dtObj);
					} else if (response.rtData.dts) {
						resolve(response.rtData.dts);
					} else if (response.rtData.dtStr) {
						resolve(response.rtData.dtStr);
					} else if (response.rtData.extMap) {
						resolve(response.rtData.extMap);
					} else {
						// self.vm.alert.showMessage(response.rtMsg);
						resolve(null);
					}
				},
				failed: response => {
					self.vm.alert.showMessage(response.rtMsg);
					resolve(null);
				},
				error: error => {
					self.vm.alert.showMessage(error.errMsg);
					resolve(null);
				}
			});
		});
	}



	/**
	 * request请求
	 *
	 * @param {String}   option.url      请求网址
	 * @param {String}   option.method   请求方式'POST'或'GET'
	 * @param {Object}   option.params   参数
	 * @param {Function} option.success  请求成功的回调
	 * @param {Function} option.fail     请求失败的回调
	 * @param {Function} option.error    请求错误的回调
	 * @param {Function} option.complete 请求完成的回调（无论成功或失败，都会调用）
	 */
	request(options) {
		let url = '';
		if (options.baseUrl != undefined) {
			url = options.baseUrl + options.url;
		} else {
			url = this.baseUrl + options.url;
		}

		// 打印入参
		if (process.env.NODE_ENV === 'development') {
			console.log("url: " + url);
			console.log('入参：' + JSON.stringify(options.params));
		}

		let self = this;
		// 发起请求
		uni.request({
			url: url,
			header: this.getHeader(),
			data: this.getParams(options.params),
			method: options.method,
			/* 请求成功 */
			success: response => {
				let data = response.data;
				switch (response.statusCode) {
					case 404:
						self.vm.alert.showMessage('无法访问此接口，请联系客服反馈');
						break;
					case 502:
						self.vm.alert.showMessage('暂时无法连接服务器，请稍后再试');
						break;
					case 500:
						self.vm.alert.showMessage('服务器开了个小差，请稍后再试');
						break;
					default:
						// 打印回参
						if (process.env.NODE_ENV === 'development') {
							console.log('回参：' + JSON.stringify(data));
						}
						// 根据rtCode做处理
						self.processWithRtcode({
							data: data,
							success: options.success,
							failed: options.failed
						});
						break;
				}
			},
			/* 请求异常 */
			fail: error => {
				if (process.env.NODE_ENV === 'development') {
					console.log('请求失败：' + JSON.stringify(error));
				}
				if (options.error != undefined && typeof options.error == 'function') {
					options.error(error);
				} else {
					self.processWithErrMsg(error.errMsg);
				}
			},
			/* 请求执行结束 */
			complete: function() {
				if (options.complete != undefined && typeof options.error == 'function') {
					options.complete();
				}
			}
		});
	}

	/**
	 * 上传文件
	 *
	 * @param {String}   option.path     文件地址
	 * @param {String}   option.purpose  文件用途描述
	 * @param {Function} option.seccess  上传成功的回调
	 * @param {Function} option.failed   上传失败的回调
	 * @param {Function} option.error    请求异常的回调
	 * @param {Function} option.complete 上传完成的回调（无论成功或失败，都会调用）
	 * @param {Function} option.progress 上传进度回调
	 */
	upload(option) {
		let self = this;
		let uploadTask = uni.uploadFile({
			url: config.uploadUrl,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'Content-Type': 'multipart/form-data'
			},
			name: 'file',
			formData: {
				fileTypeKey: 'static_pic',
				sourceKey: 'gzhMarket',
				saveTypeKey: 'alioss',
				purpose: option.purpose,
				jyKey: this.vm.vuex_company.jyKey,
			},
			filePath: option.path,
			success: function(response) {
				let data = null;
				try {
					data = JSON.parse(response.data);
				} catch (e) {
					data = response.data;
				}
				// 开发环境
				if (process.env.NODE_ENV === 'development') {
					console.log(response.data);
				}
				self.processWithRtcode({
					data: data,
					success: option.success,
					failed: option.failed
				});
			},
			fail: function(error) {
				console.log(JSON.stringify(error));
				if (option.error) {
					option.error(error);
				} else {
					self.processWithErrMsg(error.errMsg);
				}
			},
			complete: function() {
				if (option.complete) {
					option.complete();
				}
			}
		});

		// 监控上传进度
		if (option.progress) {
			// 上传进度：response.progress
			// 已经上传的数据长度：response.totalBytesSent
			// 预期需要上传的数据总长度：response.totalBytesExpectedToSend
			uploadTask.onProgressUpdate((progress) => {
				option.progress(progress);
			});
		}
	}

	getHeader() {
		return {
			'Content-Type': 'application/json',
			
		};
	}

	/**
	 * 参数转换
	 * 
	 * @param {Object} params
	 */
	getParams(params) {
		let newParams = {};
		// if (this.vm.vuex_student.studentId) {
		// 	newParams.studentId = this.vm.vuex_student.studentId;
		// }
		
		
		if (params) {
			for (let key in params) {
				newParams[key] = params[key];
			}
		}

		return newParams;
	}

	/**
	 * 根据rtcode做处理
	 * 
	 * @param {Object} option.data    
	 * @param {Object} option.success
	 * @param {Object} option.failed
	 */
	processWithRtcode(option) {
		switch (option.data.rtCode) {
			// 请求成功
			case rtcode.success:
				if (option.success) {
					option.success(option.data);
				} else {
					this.vm.alert.hideLoading();
				}
				break;
				// 微信未授权
			case rtcode.unauthorized:
				// 用户不存在
			case rtcode.user_not_exist:
				// 其他返回码
				if (option.failed) {
					option.failed(option.data);
				}
				break;
			default:
				// 其他返回码
				if (option.failed) {
					option.failed(option.data);
				} else {
					this.vm.alert.showMessage(option.data.rtMsg);
				}
				break;
		}
	}

	/**
	 * 根据errMsg做处理
	 */
	processWithErrMsg(errMsg) {
		switch (errMsg) {
			// 无法连接服务器
			case 'request:fail aobort':
				this.vm.alert.showMessage('网络异常，无法连接服务器');
				break;
				// 请求超时
			case 'request:fail timeout':
				this.vm.alert.showMessage('请求超时');
				break;
			default:
				this.vm.alert.showMessage(errMsg);
				break;
		}
	}

	get viewSource() {
		// #ifdef APP-PLUS
		return plus.os.name == 'Android' ? 2 : 3;
		// #endif
		// #ifdef MP-WEIXIN
		return 4;
		// #endif
		// #ifdef MP-TOUTIAO
		return 5;
		// #endif
		// #ifdef H5
		return 1;
		// #endif
	}

	/**
	 * 获取本地缓存数据，兼容微信小程序
	 */
	get vm() {
		// #ifdef APP-PLUS || H5
		return getApp();
		// #endif
		// #ifdef MP
		return getApp().$vm;
		// #endif
	}
};
