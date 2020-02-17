var supplierDaysArray = new Array();
$(function() {
	ko.validation.init({
		messageTemplate : "errorTemplate"
	});
	// 分公司日耗数据数组
	var ioDayArray = [];

	ioDayJsonData = $("#ioDayJson").val();
	if (ioDayJsonData != null && jQuery.trim(ioDayJsonData) != "") {
		ioDayArray = JSON.parse(ioDayJsonData);
		var supplierDays = ioDayArray.supplierDays;
		if (supplierDays != null && jQuery.trim(supplierDays) != "") {
			supplierDaysArray = ioDayArray.supplierDays;
		}
	}
	// 供应商日耗数据绑定定义
	var supplierDayMV = function(item) {
		var self = this;
		// id
		self.id = ko.observable(item.id);
		// 报表日期
		self.rptDay = ko.observable(item.rptDay);
		// 使用单位CODE（下属钢厂之一）
		self.userCompanyCode = ko.observable(item.userCompanyCode);
		// 使用单位名称（下属钢厂名称）
		self.userCompanyName = ko.observable(item.userCompanyName);
		// 物料编码
		self.varietyCode = ko.observable(item.varietyCode);
		// 物料名称
		self.varietyName = ko.observable(item.varietyName);
		// 供应商id
		self.supplierCompanyId = ko.observable(item.supplierCompanyId);
		// 供应商名称
		self.supplierCompanyName = ko.observable(item.supplierCompanyName);
		// 合同数量
		self.contractWeight = ko.observable(item.contractWeight);
		// 上月合同到货
		self.lastMonArrive = ko.observable(item.lastMonArrive).extend({
			digit : true,
			maxLength : 10
		});
		// 上月合同在途
		self.lastMonOnway = ko.observable(item.lastMonOnway).extend({
			digit : true,
			maxLength : 10
		});
		// 当日进厂汽运
		self.currentDayTruck = ko.observable(item.currentDayTruck).extend({
			digit : true,
			maxLength : 10
		});
		// 当日进厂路运
		self.currentDayTrain = ko.observable(item.currentDayTrain).extend({
			digit : true,
			maxLength : 10
		});
		// 当日进厂合计
		self.currentDayTotal = ko
				.computed(function() {
					var currentDayTruck = isRightNum(self.currentDayTruck()) ? parseInt(self
							.currentDayTruck())
							: 0;
					var currentDayTrain = isRightNum(self.currentDayTrain()) ? parseInt(self
							.currentDayTrain())
							: 0;
					return currentDayTruck + currentDayTrain;
				});
		// 累计进厂汽运
		self.currentMonTruck = ko.observable(item.currentMonTruck).extend({
			digit : true,
			maxLength : 10
		});
		// 累计进厂路运
		self.currentMonTrain = ko.observable(item.currentMonTrain).extend({
			digit : true,
			maxLength : 10
		});
		// 累计进厂合计
		self.currentMonTotal = ko
				.computed(function() {
					var currentMonTruck = isRightNum(self.currentMonTruck()) ? parseInt(self
							.currentMonTruck())
							: 0;
					var currentMonTrain = isRightNum(self.currentMonTrain()) ? parseInt(self
							.currentMonTrain())
							: 0;
					return currentMonTruck + currentMonTrain;
				});
		// 合同履约率
		self.contractPerformance = ko
				.computed(function() {
					var performance = self.currentMonTotal()
							&& self.contractWeight() ? (parseInt(self
							.currentMonTotal())
							/ parseInt(self.contractWeight()) * 10000)
							.toFixed(0) : 0;
					if (performance > 10000) {
						return 10000;
					}
					return performance;
				});
		// 本月在途
		self.currMonOnway = ko.observable(item.currMonOnway).extend({
			digit : true,
			maxLength : 10
		});
		self.errors = ko.validation.group(self);
	};

	// 分公司日耗数据绑定定义
	var ioDayMV = function(item, supplierDayKOArray) {
		var self = this;
		self.supplierDayKOs = ko.observableArray(supplierDayKOArray);
		// id
		self.id = ko.observable(item.id);
		// 报表日期
		self.rptDay = ko.observable(item.rptDay);
		// 使用单位CODE（下属钢厂之一）
		self.userCompanyCode = ko.observable(item.userCompanyCode);
		// 使用单位名称（下属钢厂名称）
		self.userCompanyName = ko.observable(item.userCompanyName);
		// 物料编码
		self.varietyCode = ko.observable(item.varietyCode);
		// 物料名称
		self.varietyName = ko.observable(item.varietyName);
		// 期初库存
		self.beginBalance = ko.observable(item.beginBalance).extend({
			digit : true,
			maxLength : 10
		});
		// 合同数量
		self.contractWeight = ko.computed(function() {
			var total = 0;
			$.each(self.supplierDayKOs(), function() {
				total += isNaN(this.contractWeight()) ? 0 : parseInt(this
						.contractWeight());
			})
			return total;
		});
		// 上月合同到货
		self.lastMonArrive = ko.computed(function() {
			var total = 0;
			$.each(self.supplierDayKOs(), function() {
				total += isNaN(this.lastMonArrive())
						|| this.lastMonArrive() == "" ? 0 : parseInt(this
						.lastMonArrive());
			})
			return total;
		});
		// 上月合同在途
		self.lastMonOnway = ko.computed(function() {
			var total = 0;
			$.each(self.supplierDayKOs(), function() {
				total += isNaN(this.lastMonOnway())
						|| this.lastMonOnway() == "" ? 0 : parseInt(this
						.lastMonOnway());
			})
			return total;
		});
		// 当日进厂汽运汇总
		self.currentDayTruck = ko.computed(function() {
			var total = 0;
			$.each(self.supplierDayKOs(), function() {
				total += isNaN(this.currentDayTruck())
						|| this.currentDayTruck() == "" ? 0 : parseInt(this
						.currentDayTruck());
			})
			return total;
		});
		// 当日进厂路运汇总
		self.currentDayTrain = ko.computed(function() {
			var total = 0;
			$.each(self.supplierDayKOs(), function() {
				total += isNaN(this.currentDayTrain())
						|| this.currentDayTrain() == "" ? 0 : parseInt(this
						.currentDayTrain());
			})
			return total;
		});
		// 当日进厂合计汇总
		self.currentDayTotal = ko.computed(function() {
			var total = 0;
			$.each(self.supplierDayKOs(), function() {
				total += isNaN(this.currentDayTotal())
						|| this.currentDayTotal() == "" ? 0 : parseInt(this
						.currentDayTotal());
			})
			return total;
		});
		// 累计进厂汽运
		self.currentMonTruck = ko.computed(function() {
			var total = 0;
			$.each(self.supplierDayKOs(), function() {
				total += isNaN(this.currentMonTruck())
						|| this.currentMonTruck() == "" ? 0 : parseInt(this
						.currentMonTruck());
			})
			return total;
		});
		// 累计进厂路运
		self.currentMonTrain = ko.computed(function() {
			var total = 0;
			$.each(self.supplierDayKOs(), function() {
				total += isNaN(this.currentMonTrain())
						|| this.currentMonTrain() == "" ? 0 : parseInt(this
						.currentMonTrain());
			})
			return total;
		});
		// 累计进场合计
		self.currentMonTotal = ko.computed(function() {
			var total = 0;
			$.each(self.supplierDayKOs(), function() {
				total += isNaN(this.currentMonTotal())
						|| this.currentMonTotal() == "" ? 0 : parseInt(this
						.currentMonTotal());
			})
			return total;
		});
		// 日耗
		self.currentDayConsume = ko.observable(item.currentDayConsume).extend({
			digit : true,
			maxLength : 10
		});
		// 累耗
		self.currentMonResume = ko.observable(item.currentMonResume).extend({
			digit : true,
			maxLength : 10
		});
		// 合同履约率
		self.contractPerformance = ko
				.computed(function() {
					var performance = self.currentMonTotal()
							&& self.contractWeight() ? (parseInt(self
							.currentMonTotal())
							/ parseInt(self.contractWeight()) * 10000)
							.toFixed(0) : 0;

					if (performance > 10000) {
						return 10000;
					}
					return performance;
				});
		// 实时库存
		self.realtimeBalance = ko.observable(item.realtimeBalance).extend({
			digit : true,
			maxLength : 10
		});
		// 本月在途
		self.currMonOnway = ko.computed(function() {
			var total = 0;
			$.each(self.supplierDayKOs(), function() {
				total += isNaN(this.currMonOnway())
						|| this.currMonOnway() == "" ? 0 : parseInt(this
						.currMonOnway());
			})
			return total;
		});
		// 可用天数
		self.canUseDays = ko
				.computed(function() {
					var day = getDayPassed(self.rptDay());
					return isRightNum(self.currentMonResume())
							&& parseInt(self.currentMonResume()) > 0
							&& isRightNum(self.realtimeBalance()) ? (parseInt(self
							.realtimeBalance()) / (parseFloat(self
							.currentMonResume()) / day)).toFixed(0)
							: 0;
				});
		self.errors = ko.validation.group(self);
		self.saveTotal = function() {

			var ioDay = {
				id : self.id(),
				rptDay : self.rptDay(),
				userCompanyCode : self.userCompanyCode(),
				userCompanyName : self.userCompanyName(),
				varietyCode : self.varietyCode(),
				varietyName : self.varietyName(),
				beginBalance : zeroFormat(self.beginBalance()),
				contractWeight : zeroFormat(self.contractWeight()),
				lastMonArrive : zeroFormat(self.lastMonArrive()),
				lastMonOnway : zeroFormat(self.lastMonOnway()),
				currentDayTruck : zeroFormat(self.currentDayTruck()),
				currentDayTrain : zeroFormat(self.currentDayTrain()),
				currentDayTotal : zeroFormat(self.currentDayTotal()),
				currentMonTruck : zeroFormat(self.currentMonTruck()),
				currentMonTrain : zeroFormat(self.currentMonTrain()),
				currentMonTotal : zeroFormat(self.currentMonTotal()),
				currentDayConsume : zeroFormat(self.currentDayConsume()),
				currentMonResume : zeroFormat(self.currentMonResume()),
				contractPerformance : zeroFormat(self.contractPerformance()),
				realtimeBalance : zeroFormat(self.realtimeBalance()),
				currMonOnway : zeroFormat(self.currMonOnway()),
				canUseDays : zeroFormat(self.canUseDays())
			};
			var isOK = true;
			var supplierDays = $.map(self.supplierDayKOs(),
					function(supplierDayKO) {
						if (supplierDayKO.errors().length > 0) {
							isOK = false;
							supplierDayKO.errors.showAllMessages();
						}
						return {
							id : supplierDayKO.id(),
							rptDay : supplierDayKO.rptDay(),
							userCompanyCode : supplierDayKO.userCompanyCode(),
							userCompanyName : supplierDayKO.userCompanyName(),
							varietyCode : supplierDayKO.varietyCode(),
							varietyName : supplierDayKO.varietyName(),
							supplierCompanyId : supplierDayKO
									.supplierCompanyId(),
							supplierCompanyName : supplierDayKO
									.supplierCompanyName(),
							contractWeight : zeroFormat(supplierDayKO
									.contractWeight()),
							lastMonArrive : zeroFormat(supplierDayKO
									.lastMonArrive()),
							lastMonOnway : zeroFormat(supplierDayKO
									.lastMonOnway()),
							currentDayTruck : zeroFormat(supplierDayKO
									.currentDayTruck()),
							currentDayTrain : zeroFormat(supplierDayKO
									.currentDayTrain()),
							currentDayTotal : zeroFormat(supplierDayKO
									.currentDayTotal()),
							currentMonTruck : zeroFormat(supplierDayKO
									.currentMonTruck()),
							currentMonTrain : zeroFormat(supplierDayKO
									.currentMonTrain()),
							currentMonTotal : zeroFormat(supplierDayKO
									.currentMonTotal()),
							contractPerformance : zeroFormat(supplierDayKO
									.contractPerformance()),
							currMonOnway : zeroFormat(supplierDayKO
									.currMonOnway())
						}
					});
			$("#ioDayJson").val(JSON.stringify(ioDay));
			$("#supplierDaysJson").val(JSON.stringify(supplierDays));
			if (self.errors().length == 0 && isOK == true) {
				$("#inputForm").submit();
			} else {
				self.errors.showAllMessages();
			}
		};
	}

	// 具体数据绑定操作
	var supplierDayKOArray = new Array();
	for ( var i = 0; i < supplierDaysArray.length; i++) {
		var supplierDayKO = new supplierDayMV(supplierDaysArray[i]);
		supplierDayKOArray.push(supplierDayKO);
	}
	var ioDayKO = new ioDayMV(ioDayArray, supplierDayKOArray);
	// 完成绑定
	ko.applyBindings(ioDayKO);

});

// 月份格式化
function formatMonth(day) {
	return day.substring(5, day.indexOf("-", 5)) + "月";
}

// 履约率
function formatPercent(value) {
	return (value / 100).toFixed(2);
}

function getDayPassed(value) {
	var array = value.split("-");
	return parseInt(array[2]);
}

function isRightNum(value) {
	return !isNaN(value) && value != "";
}

function zeroFormat(value) {
	return isRightNum(value) ? value : 0;
}