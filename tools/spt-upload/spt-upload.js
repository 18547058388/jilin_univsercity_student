import base64 from './base64.js';
import Crypto from './crypto.js';
import './sha1.js'
import './hmac.js'
import config from '@/config/config.js';

export default class SptUpload {
	
	/**
	 * 查询阿里云配置
	 * 
	 * @param {Object} options.file        文件路径
	 * @param {Object} options.purpose     文件用途
	 * @param {Object} options.contentType 文件类型/后缀名
	 * @param {Object} options.fileTypeKey 文件类型key
	 */
	getAliOssConfig(options) {
		return this.vm.request.postWithPromise({
			baseUrl: config.fileUrl,
			url: 'superFile/jycloud/file/v1/selectFileConfig',
			params: {
				fileTypeKey: options.fileTypeKey,
				contentType: options.contentType,
				sourceKey: this.vm.config.clientKey
			}
		});
	}

	/**
	 * 上传文件
	 * 
	 * @param {Object} options.file        文件路径
	 * @param {Object} options.purpose     文件用途
	 * @param {Object} options.contentType 文件类型/后缀名
	 * @param {Object} options.fileTypeKey 文件类型key
	 */
	async uploadFile(options) {
		let ossConfig = await this.getAliOssConfig(options);

		switch (ossConfig.uploadChannel) {
			case 'alioss':
				this.uploadFileWithOSS(ossConfig, options);
				break;
			case 'superFile':
				this.uploadFileWithSuperFile(options);
				break;
		}
	}

	/**
	 * 阿里云OSS文件上传
	 * 
	 * @param {Object} ossConfig 从服务器获取的阿里云OSS配置
	 * @param {String} file      文件路径
	 */
	uploadFileWithOSS(ossConfig, options) {
		let aliyunOss = ossConfig.jycloudFileAliyunOss;
		let policyBase64 = this.getPolicyBase64();
		let signature = this.getSignature(policyBase64, aliyunOss.accessKeySecret);
		let self = this;
		let uploadTask = uni.uploadFile({
			url: ossConfig.fileServer + '/',
			filePath: options.file,
			name: 'file',
			formData: {
				key: ossConfig.fileName, // 文件名
				policy: policyBase64, // 后台获取超时时间
				OSSAccessKeyId: aliyunOss.accessKeyId, // 后台获取临时ID
				success_action_status: '200', // 让服务端返回200,不然，默认会返回204
				signature: signature // 后台获取签名
			},
			success: res => {
				console.log("res: " + JSON.stringify(res));
				if (options.success && typeof options.success == 'function') {
					options.success({
						url: ossConfig.fileServer + '/' + ossConfig.fileName
					});
				}
			},
			fail: err => {
				console.log("err: " + JSON.stringify(err));
				self.vm.alert.hideLoading();
			},
			complete: res => {
				console.log("res: " + JSON.stringify(res));
				if (options.complete && typeof options.complete == 'function') {
					options.complete(res);
				} 
			}
		});

		// 监控上传进度
		if (options.progress && typeof options.progress == 'function') {
			// 上传进度：response.progress
			// 已经上传的数据长度：response.totalBytesSent
			// 预期需要上传的数据总长度：response.totalBytesExpectedToSend
			uploadTask.onProgressUpdate(response => {
				options.progress(response.progress);
			});
		}
	}

	/**
	 * 文件上传
	 * @param {Object} options
	 */
	uploadFileWithSuperFile(options) {
		let self = this;
		this.vm.request.upload({
			path: options.file,
			purpose: options.purpose,
			success: response => {
				if (options.success && typeof options.success == 'function') {
					options.success(response);
				}
			},
			progress: response => {
				if (options.progress && typeof options.progress == 'function') {
					options.progress(response);
				}
			}
		});
	}


	getPolicyBase64() {
		let date = new Date();
		date.setHours(date.getHours() + 87600);
		let srcT = date.toISOString();
		let policyText = {
			"expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 
			"conditions": [
				["content-length-range", 0, 50 * 1024 * 1024] // 设置上传文件的大小限制,50mb
			]
		};

		let policyBase64 = base64.encode(JSON.stringify(policyText));
		console.log(policyBase64);
		return policyBase64;
	}

	getSignature(policyBase64, accessKeySecret) {
		let accesskey = accessKeySecret;

		let bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
			asBytes: true
		});
		let signature = Crypto.util.bytesToBase64(bytes);
		console.log(signature);
		return signature;
	}

	get vm() {
		// #ifdef APP-PLUS || H5
		return getApp();
		// #endif
		// #ifdef MP
		return getApp().$vm;
		// #endif
	}
}
