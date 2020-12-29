export default {
	/**
	 * 手机号验证（1开头的11位数字）
	 * 
	 * @param {String} cellphone 电话号码
	 * 
	 * @return {Boolean} true：手机号正确；false：手机号不正确
	 */
	isCellphone: function(cellphone) {
		if (cellphone.length !== 11) {
			return false;
		}
		return /^(0|86)?(1)[\d]{10}$/.test(cellphone);
	},
	
	/**
	 * 银行卡号验证（非0开头的16位或19位数字）
	 * 
	 * @param {String} bankCardNo 银行卡号
	 * 
	 * @return {Boolean} true：银行卡号正确；false：银行卡号不正确
	 */
	isBankCardNo: function(bankCardNo) {
		if (bankCardNo.length < 16 || bankCardNo.length > 19) {
			return false;
		}
		return /^[1-9]\d*$/.test(bankCardNo);
	}
}