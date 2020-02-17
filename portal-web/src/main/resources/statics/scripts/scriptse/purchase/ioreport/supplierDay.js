$(function() {
	// 分公司日耗数据数组
	var ioDayItem = [];

	ioDaysJsonData = $("#ioDaysJson").val();
	if (ioDaysJsonData != null && jQuery.trim(ioDaysJsonData) != "") {
		ioDaysItem = JSON.parse(ioDaysJsonData);
	}

	// 供应商日耗数据绑定定义
	var ioDays = function(ioDayItems) {
		var self = this;
		self.ioDays = ko.observableArray(ioDayItems);
	}

	// 完成绑定
	ko.applyBindings(new ioDays(ioDaysItem));
});

// 月份格式化
function formatMonth(day) {
	return day.substring(5, day.indexOf("-", 5)) + "月";
}

// 判断是否为0
function isZero(value) {
	return value == 0;
}

// 履约率
function formatPercent(value) {
	return (value / 100).toFixed(2);
}