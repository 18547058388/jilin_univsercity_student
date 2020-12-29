export default class SPTAudioManager {
	constructor() {
		this.audioContext = null;
		this.autoplay = true;
		this.src = '';
		this.loop = false;
	}
	
	/**
	 * 单例
	 */
	static getInstance() {
		if (!this.instance) {
			this.instance = new Navigation();
		}
		return this.instance;
	}
	
	init(options) {
		if (!this.audioContext) {
			this.audioContext = uni.createInnerAudioContext();
		}
		
		if (typeof options.autoplay == 'boolean') {
			this.autoplay = options.autoplay;
		}
		this.src = '';
		this.loop = options.autoplay || false;
	}
}