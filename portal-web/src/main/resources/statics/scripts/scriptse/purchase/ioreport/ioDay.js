$(function() {
	// 供应商日耗数据数组
	var ioDayArray = [];
	ioDaysJsonData = $("#ioDaysJson").val();
	if (ioDaysJsonData != null && jQuery.trim(ioDaysJsonData) != "") {
		ioDayArray = JSON.parse(ioDaysJsonData);
	}
	// 供应商日耗数据绑定定义
	var ioDayLine = function(item) {
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
		// 期初库存
		self.beginBalance = ko.observable(item.beginBalance);
		// 合同数量
		self.contractWeight = ko.observable(item.contractWeight);
		// 上月合同到货
		self.lastMonArrive = ko.observable(item.lastMonArrive);
		// 上月合同在途
		self.lastMonOnway = ko.observable(item.lastMonOnway);
		// 当日进厂汽运汇总
		self.currentDayTruck = ko.observable(item.currentDayTruck);
		// 当日进厂路运汇总
		self.currentDayTrain = ko.observable(item.currentDayTrain);
		// 当日进厂合计汇总
		self.currentDayTotal = ko.observable(item.currentDayTotal);
		// 累计进厂汽运
		self.currentMonTruck = ko.observable(item.currentMonTruck);
		// 累计进厂路运
		self.currentMonTrain = ko.observable(item.currentMonTrain);
		// 累计进场合计
		self.currentMonTotal = ko.observable(item.currentMonTotal);
		// 日耗
		self.currentDayConsume = ko.observable(item.currentDayConsume);
		// 累耗
		self.currentMonResume = ko.observable(item.currentMonResume);
		// 合同履约率
		self.contractPerformance = ko.observable(item.contractPerformance);
		// 实时库存
		self.realtimeBalance = ko.observable(item.realtimeBalance);
		// 本月在途
		self.currMonOnway = ko.observable(item.currMonOnway);
		// 可用天数
		self.canUseDays = ko.observable(item.canUseDays);
		// 单位数量
		self.companyCount = ko.observable(item.companyCount);
	};

	var ioDaySum = function(ioDayKOArray) {
		var self = this;
		self.ioDayKOs = ko.observableArray(ioDayKOArray);
		// 物料名称
		self.varietyName = ko.computed(function() {
			var varietyName = "";
			$.each(self.ioDayKOs(), function() {
				if (typeof (this.varietyName()) != "undefined") {
					varietyName = this.varietyName();
					return false;
				}

			})
			return varietyName;
		});
		// “合计”
		self.sumName = ko.observable("合计");
		// 合同数量
		self.contractWeight = ko.computed(function() {
			var total = 0;
			$.each(self.ioDayKOs(), function() {
				total += isNaN(this.contractWeight()) ? 0 : parseInt(this
						.contractWeight());
			})
			return total;
		});
		// 期初库存
		self.beginBalance = ko.computed(function() {
			var total = 0;
			$.each(self.ioDayKOs(), function() {
				total += isNaN(this.beginBalance()) ? 0 : parseInt(this
						.beginBalance());
			})
			return total;
		});
		// 上月合同到货
		self.lastMonArrive = ko.computed(function() {
			var total = 0;
			$.each(self.ioDayKOs(), function() {
				total += isNaN(this.lastMonArrive()) ? 0 : parseInt(this
						.lastMonArrive());
			})
			return total;
		});
		// 当日进厂合计汇总
		self.currentDayTotal = ko.computed(function() {
			var total = 0;
			$.each(self.ioDayKOs(), function() {
				total += isNaN(this.currentDayTotal()) ? 0 : parseInt(this
						.currentDayTotal());
			})
			return total;
		});
		// 累计进场合计
		self.currentMonTotal = ko.computed(function() {
			var total = 0;
			$.each(self.ioDayKOs(), function() {
				total += isNaN(this.currentMonTotal()) ? 0 : parseInt(this
						.currentMonTotal());
			})
			return total;
		});
		// 日耗
		self.currentDayConsume = ko.computed(function() {
			var total = 0;
			$.each(self.ioDayKOs(), function() {
				total += isNaN(this.currentDayConsume()) ? 0 : parseInt(this
						.currentDayConsume());
			})
			return total;
		});
		// 累耗
		self.currentMonResume = ko.computed(function() {
			var total = 0;
			$.each(self.ioDayKOs(), function() {
				total += isNaN(this.currentMonResume()) ? 0 : parseInt(this
						.currentMonResume());
			})
			return total;
		});

		// 实时库存
		self.realtimeBalance = ko.computed(function() {
			var total = 0;
			$.each(self.ioDayKOs(), function() {
				total += isNaN(this.realtimeBalance()) ? 0 : parseInt(this
						.realtimeBalance());
			})
			return total;
		});

		// 本月在途
		self.currMonOnway = ko.computed(function() {
			var total = 0;
			$.each(self.ioDayKOs(), function() {
				total += isNaN(this.currMonOnway()) ? 0 : parseInt(this
						.currMonOnway());
			})
			return total;
		});
	}

	// 具体数据绑定操作
	var ioDayKOs = new Array();
	var ioDayLineKOs = new Array();
	var count = 0;
	for ( var i = 0; i < ioDayArray.length; i++) {
		if (count == 0) {
			count = ioDayArray[i].companyCount;
		}
		var ioDayLineKO = new ioDayLine(ioDayArray[i]);
		ioDayLineKOs.push(ioDayLineKO);
		count--;
		if (count == 0) {
			ioDayKOs.push(ioDayLineKOs);
			ioDayLineKOs = new Array();
		}
	}

	var ioDays = new Array();
	for ( var j = 0; j < ioDayKOs.length; j++) {
		var ioDay = new ioDaySum(ioDayKOs[j]);
		ioDays.push(ioDay);
	}

	var ioDaysMV = function(ioDays) {
		var self = this;

		self.ioDays = ko.observableArray(ioDays);
	}

	// 完成绑定
	ko.applyBindings(new ioDaysMV(ioDays));
});

// 月份格式化
function formatMonth(day) {
	return day.substring(5, day.indexOf("-", 5)) + "月";
}
