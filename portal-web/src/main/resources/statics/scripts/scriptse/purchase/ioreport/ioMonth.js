$(function() {
	// 专业公司月进耗存数据数组
	var ioMonthArray = [];
	ioMonthsJsonData = $("#ioMonthsJson").val();
	if (ioMonthsJsonData != null && jQuery.trim(ioMonthsJsonData) != "") {
		ioMonthArray = JSON.parse(ioMonthsJsonData);
	}
	// 专业公司月进耗存数据绑定定义
	var ioMonthLineKO = function(item) {
		var self = this;
		// 使用单位名称（下属钢厂名称）
		self.userCompanyName = ko.observable(item.userCompanyName);
		// 物料名称
		self.varietyName = ko.observable(item.varietyName);
		// 月初库存
		self.beginBalance = ko.observable(item.beginBalance);
		// 当月采购价格
		self.purchasePriceMonth = ko.observable(item.purchasePriceMonth);
		// 累计采购价格
		self.purchasePriceYear = ko.observable(item.purchasePriceYear);
		// 当月合同数量
		self.contractNumMonth = ko.observable(item.contractNumMonth);
		// 累计合同数量
		self.contractNumYear = ko.observable(item.contractNumYear);
		// 当月实际采购
		self.realPurchaseMonth = ko.observable(item.realPurchaseMonth);
		// 累计实际采购
		self.realPurchaseYear = ko.observable(item.realPurchaseYear);
		// 当月实际消耗
		self.realUseMonth = ko.observable(item.realUseMonth);
		// 累计实际消耗
		self.realUseYear = ko.observable(item.realUseYear);
		// 期末库存
		self.endBalance = ko.observable(item.endBalance);
		// 累计采购总金额
		self.purchaseTotalPriceYear = ko
				.observable(item.purchaseTotalPriceYear);
	};

	var ioMonthSumLineKO = function(ioMonthKOArray) {
		var self = this;
		self.ioMonthKOs = ko.observableArray(ioMonthKOArray);
		// 物料名称
		self.varietyName = ko.computed(function() {
			var varietyName = "";
			$.each(self.ioMonthKOs(), function() {
				if (typeof (this.varietyName()) != "undefined") {
					varietyName = this.varietyName();
					return false;
				}

			})
			return varietyName;
		});
		// “合计”
		self.sumName = ko.observable("合计");
		// 月初库存
		self.beginBalance = ko.computed(function() {
			var total = 0;
			$.each(self.ioMonthKOs(), function() {
				total += isNaN(this.beginBalance()) ? 0 : parseInt(this
						.beginBalance());
			})
			return total;
		});
		// 累计采购价格
		self.purchasePriceYear = ko.computed(function() {
			var totalPrice = 0;
			var totalPurchase = 0;
			$.each(self.ioMonthKOs(), function() {

				var linePurchase = isNaN(this.realPurchaseYear()) ? 0
						: parseInt(this.realPurchaseYear());
				var linePrice = isNaN(this.purchaseTotalPriceYear()) ? 0
						: parseInt(this.purchaseTotalPriceYear());
				totalPrice += linePrice;
				totalPurchase += linePurchase;
			})
			return totalPurchase == 0 ? 0 : (totalPrice / totalPurchase)
					.toFixed(0);
		});
		// 当月合同数量
		self.contractNumMonth = ko.computed(function() {
			var total = 0;
			$.each(self.ioMonthKOs(), function() {
				total += isNaN(this.contractNumMonth()) ? 0 : parseInt(this
						.contractNumMonth());
			})
			return total;
		});
		// 累计合同数量
		self.contractNumYear = ko.computed(function() {
			var total = 0;
			$.each(self.ioMonthKOs(), function() {
				total += isNaN(this.contractNumYear()) ? 0 : parseInt(this
						.contractNumYear());
			})
			return total;
		});
		// 当月实际采购
		self.realPurchaseMonth = ko.computed(function() {
			var total = 0;
			$.each(self.ioMonthKOs(), function() {
				total += isNaN(this.realPurchaseMonth()) ? 0 : parseInt(this
						.realPurchaseMonth());
			})
			return total;
		});
		// 累计实际采购
		self.realPurchaseYear = ko.computed(function() {
			var total = 0;
			$.each(self.ioMonthKOs(), function() {
				total += isNaN(this.realPurchaseYear()) ? 0 : parseInt(this
						.realPurchaseYear());
			})
			return total;
		});
		// 当月实际消耗
		self.realUseMonth = ko.computed(function() {
			var total = 0;
			$.each(self.ioMonthKOs(), function() {
				total += isNaN(this.realUseMonth()) ? 0 : parseInt(this
						.realUseMonth());
			})
			return total;
		});
		// 累计实际消耗
		self.realUseYear = ko.computed(function() {
			var total = 0;
			$.each(self.ioMonthKOs(), function() {
				total += isNaN(this.realUseYear()) ? 0 : parseInt(this
						.realUseYear());
			})
			return total;
		});
		// 期末库存
		self.endBalance = ko.computed(function() {
			var total = 0;
			$.each(self.ioMonthKOs(), function() {
				total += isNaN(this.endBalance()) ? 0 : parseInt(this
						.endBalance());
			})
			return total;
		});
	}

	// 具体数据绑定操作
	var ioMonthSumLineKOs = new Array();
	var ioMonthLineKOs = new Array();
	var count = 0;
	for ( var i = 0; i < ioMonthArray.length; i++) {
		if (count == 0) {
			count = ioMonthArray[i].companyCount;
		}
		var iMKO = new ioMonthLineKO(ioMonthArray[i]);
		ioMonthLineKOs.push(iMKO);
		count--;
		if (count == 0) {
			ioMonthSumLineKOs.push(ioMonthLineKOs);
			ioMonthLineKOs = new Array();
		}
	}

	var ioMonthKOs = new Array();
	for ( var j = 0; j < ioMonthSumLineKOs.length; j++) {
		var iMKO = new ioMonthSumLineKO(ioMonthSumLineKOs[j]);
		ioMonthKOs.push(iMKO);
	}

	var ioMonthMV = function(ioMonths) {
		var self = this;
		self.ioMonths = ko.observableArray(ioMonths);
	}
	// 完成绑定
	ko.applyBindings(new ioMonthMV(ioMonthKOs));
});

// 月份格式化
function formatMonth(day) {
	return day.substring(5, day.indexOf("-", 5)) + "月";
}

// 价格格式化
function formatPrice(price) {
	return (price / 100).toFixed(2);
}
