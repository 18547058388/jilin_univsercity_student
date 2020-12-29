import mqtt from 'mqtt/dist/mqtt.js';

export default class SptMqtt {
	constructor(type) {
		this.client = null;
		this.topic = '';
	}

	/**
	 * 开启连接
	 * 
	 * @param {Object} options
	 */
	connect(options) {
		this.client = mqtt.connect(this.vm.config.mqttUrl);

		switch (options.type) {
			// 买单
			case 'checkout':
				this.topic = this.vm.vuex_jyKey + '/consume/card';
				break;
				// 核销
			case 'consume':
				this.topic = this.vm.vuex_jyKey + '/consume/coupon';
				break;
		}

		let self = this;

		this.client.on('connect', () => {
			self.client.subscribe(this.topic, error => {
				if (!error) {
					console.log("MQTT ----> 连接成功");
					if (options.success && typeof options.success == 'function') {
						options.success();
					}
				} else {
					console.log("error: " + JSON.stringify(error));
				}
			});
		}).on('reconnect', function() {
			console.log("MQTT ----> 重新连接");
		}).on('error', error => {
			console.log("MQTT ----> 异常");
			console.log("error: " + error);
		}).on('end', function() {
			console.log("MQTT ----> 连接断开");
		}).on('message', (topic, response) => {
			let message = JSON.parse(response.toString());
			console.log("MQTT ----> 收到消息");
			console.log("topic: " + topic);
			console.log("message: " + JSON.stringify(message));
			console.log("message.wsData.memberId: " + JSON.stringify(message.wsData.memberId));
			console.log("self.vm.vuex_user.memberId: " + JSON.stringify(self.vm.vuex_user.memberId));
			if (message.wsData && message.wsData.memberId == self.vm.vuex_user.memberId) {
				
				if (options.message && typeof options.message == 'function') {
					options.message(message);
				}
			}
		});
	}
	
	/**
	 * 断开连接
	 */
	disconnect() {
		this.client.end();
	}

	get vm() {
		// #ifdef MP-WEIXIN
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
