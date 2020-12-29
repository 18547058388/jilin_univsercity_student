/**
 * 格式化数字, 数字过大时加汉字单位
 */
Number.prototype.format = function() {
	if (isNaN(this)) {
		return '0';
	}
	
	// 小于1万
	if (this < 10000) {
		return this;
	}
	// 大于等于1万,小于1亿
	if (this >= 10000 && this < Math.pow(10, 8)) {
		return parseInt(this / 1000) / 10 + '万+';
	}
	// 大于等于1亿
	return parseInt(this / Math.pow(10, 7)) / 10 + '亿+';
}

/**
 * 格式化金额
 * 
 * return {String} 格式化后的金额
 */
Number.prototype.formatMoney = function() {
	if (this === 'undefined' || this === null || this === '' || !this) {
		return '0.00';
	}
	let string = parseFloat(this).toFixed(2).toString();
	// 取到整数部分
	let intPart = string.substring(0, string.indexOf('.'));
	// 取到小数部分
	let decimalPart = string.substring(string.length, string.indexOf('.'));
	return intPart + decimalPart;
}

/**
 * 格式化金额
 * 
 * return {String} 格式化后的金额
 */
String.prototype.formatMoney = function() {
	if (this === 'undefined' || this === null || this === '' || !this) {
		return '0.00';
	}
	let string = parseFloat(this).toFixed(2).toString();
	// 取到整数部分
	let intPart = string.substring(0, string.indexOf('.'));
	// 取到小数部分
	let decimalPart = string.substring(string.length, string.indexOf('.'));
	return intPart + decimalPart;
}

/**
 * 获取金额的整数部分
 * 
 * return {String} 金额的整数部分
 */
Number.prototype.intPart = function() {
	let string = parseFloat(this).toFixed(2).toString();
	// 取到整数部分
	return string.substring(0, string.indexOf('.'));
}

/**
 * 获取金额的小数部分
 * 
 * return {String} 金额的小数部分
 */
Number.prototype.decimalPart = function() {
	let string = parseFloat(this).toFixed(2).toString();
	// 取到小数部分
	return string.substring(string.length, string.indexOf('.'));
}

/**
 * 金额的小数部分(去掉0)
 * 
 * return {String} 金额的小数部分
 */
Number.prototype.decimalPartWithouZero = function() {
	let string = parseFloat(this).toString();

	if (string.indexOf('.') < 0) {
		return '';
	}
	// 取到小数部分
	return string.substring(string.length, string.indexOf('.'));
}
