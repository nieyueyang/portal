function getMinDate(dateArray, addDayCountArray, todayAddCount) {
	var date = addDays(sysdate, todayAddCount);
	for ( var i = 0; i < dateArray.length; i++) {
		var dateTemp = convertDate($("#" + dateArray[i]).val());
		if (dateTemp != null) {
			dateTemp = addDays(dateTemp, addDayCountArray[i]);
			if (dateTemp > date) {
				date = dateTemp;
			}
		}
	}

	return formatDate(date, "yyyy-MM-dd");
}

function getMaxDate(dateArray, addDayCountArray) {
	var date = "";
	for ( var i = 0; i < dateArray.length; i++) {
		var dateTemp = convertDate($("#" + dateArray[i]).val());
		if (dateTemp != null) {
			dateTemp = addDays(dateTemp, -addDayCountArray[i]);
			if (date == "" || dateTemp < date) {
				date = dateTemp;
			}
		}
	}
	if (date != "") {
		return formatDate(date, "yyyy-MM-dd");
	} else {
		return "";
	}
}

/**
 * 判断是否date1小于date2
 * 
 * @param dateId1
 * @param dateId2
 * @param canEqual
 *            是否能相等
 */
function compareDate(dateId1, dateId2, canEqual) {
	var date1Str = $("#" + dateId1).val();
	var date2Str = $("#" + dateId2).val();
	if (date1Str == null || date1Str == "" || date2Str == null
			|| date2Str == "") {
		return true;
	}
	var date1 = convertDate(date1Str);
	var date2 = convertDate(date2Str);
	if (canEqual) {
		return date1 <= date2;
	} else {
		return date1 < date2;
	}
}

function compareTime(timeId1, timeId2, canEqual) {
	var time1Str = $("#" + timeId1).val();
	var time2Str = $("#" + timeId2).val();
	if (time1Str == null || time1Str == "" || time2Str == null
			|| time2Str == "") {
		return true;
	}
	var time1 = getTime(time1Str);
	var time2 = getTime(time2Str);
	time2.setDate(time1.getDate());
	time2.setMonth(time1.getMonth());
	time2.setFullYear(time1.getFullYear());
	time2.setSeconds(0);
	time2.setMilliseconds(0);
	if (canEqual) {
		return time1 <= time2;
	} else {
		return time1 < time2;
	}
}

function compareTime5Min(timeId1, timeId2, canEqual) {
	var time1Str = $("#" + timeId1).val();
	var time2Str = $("#" + timeId2).val();
	if (time1Str == null || time1Str == "" || time2Str == null
			|| time2Str == "") {
		return true;
	}
	var time1 = getDateTime(time1Str);
	var time2 = getDateTime(time2Str);
	if (canEqual) {
		return time1 <= addMinutes(time2, -5);
	} else {
		return time1 < addMinutes(time2, -5);
	}
}

function compareDateTime(dateId1, timeId2, canEqual, isLess) {
	var date1Str = $("#" + dateId1).val();
	var time2Str = $("#" + timeId2).val();
	if (date1Str == null || date1Str == "" || time2Str == null
			|| time2Str == "") {
		return true;
	}
	var date1 = convertDate(date1Str);
	var date2 = getDateLong(time2Str);
	if (canEqual) {
		if (isLess) {
			return date1 <= date2;
		} else {
			return date1 >= date2;
		}
	} else {
		if (isLess) {
			return date1 < date2;
		} else {
			return date1 > date2;
		}
	}
}

function getTime(timeStr) {
	var timeArray = timeStr.split(":");
	var time = new Date();
	time.setHours(timeArray[0]);
	time.setMinutes(timeArray[1]);
	time.setSeconds(0);
	time.setMilliseconds(0);
	return time;
}

function getDateTime(dateTimeStr) {
	var dateTimeArray = dateTimeStr.split(" ");
	var dateStr = dateTimeArray[0];
	var timeStr = dateTimeArray[1];
	var dateArray = dateStr.split("-");
	var timeArray = timeStr.split(":");
	var dateTime = new Date();
	dateTime.setFullYear(dateArray[0]);
	dateTime.setMonth(dateArray[1]);
	dateTime.setDate(dateArray[2]);
	dateTime.setHours(timeArray[0]);
	dateTime.setMinutes(timeArray[1]);
	dateTime.setSeconds(0);
	dateTime.setMilliseconds(0);
	return dateTime;
}

function getDateLong(dateTimeStr) {
	var dateTimeArray = dateTimeStr.split(" ");
	var dateStr = dateTimeArray[0];
	var dateArray = dateStr.split("-");
	var dateTime = new Date();
	dateTime.setFullYear(dateArray[0]);
	dateTime.setMonth(dateArray[1]);
	dateTime.setDate(dateArray[2]);
	dateTime.setHours(0);
	dateTime.setMinutes(0);
	dateTime.setSeconds(0);
	dateTime.setMilliseconds(0);
	return dateTime;
}

function getDateShort(dateStr) {
	var dateArray = dateStr.split("-");
	var dateTime = new Date();
	dateTime.setFullYear(dateArray[0]);
	dateTime.setMonth(dateArray[1]);
	dateTime.setDate(dateArray[2]);
	dateTime.setHours(0);
	dateTime.setMinutes(0);
	dateTime.setSeconds(0);
	dateTime.setMilliseconds(0);
	return dateTime;
}

function isSameDay(timeId1, timeId2) {
	var time1Str = $("#" + timeId1).val();
	var time2Str = $("#" + timeId2).val();
	if (time1Str == null || time1Str == "" || time2Str == null
			|| time2Str == "") {
		return true;
	}
	var date1 = getDateLong(time1Str);
	var date2 = getDateLong(time2Str);
	return isDateEquals(date1, date2);
}

function isTradeTime(timeId1, timeId2) {
	var time1Str = $("#" + timeId1).val();
	var time2Str = $("#" + timeId2).val();
	if (time1Str == null || time1Str == "" || time2Str == null
			|| time2Str == "") {
		return true;
	}
	var currentTime = new Date();
	var time1 = getTime(time1Str);
	var time2 = getTime(time2Str);
	time2.setDate(time1.getDate());
	time2.setMonth(time1.getMonth());
	time2.setFullYear(time1.getFullYear());
	time2.setSeconds(0);
	time2.setMilliseconds(0);
	for ( var i = 0; i < tradeTimes.length; i++) {
		var timeStart = formatTradeTime(tradeTimes[i].gmtStart);
		timeStart.setDate(time1.getDate());
		timeStart.setMonth(time1.getMonth());
		timeStart.setFullYear(time1.getFullYear());
		timeStart.setSeconds(0);
		timeStart.setMilliseconds(0);
		var timeEnd = formatTradeTime(tradeTimes[i].gmtEnd);
		timeEnd.setDate(time1.getDate());
		timeEnd.setMonth(time1.getMonth());
		timeEnd.setFullYear(time1.getFullYear());
		timeEnd.setSeconds(0);
		timeEnd.setMilliseconds(0);
		if (timeStart <= time1 && timeEnd >= time2) {
			if (i == tradeTimes.length - 1) {
				var timeEndNew = new Date();
				timeEndNew.setTime(timeEnd.getTime() - 1000 * 60 * 30);// 少30分钟
				if (timeEndNew < time2) {
					return 1;
				}
			}
			return 0;
		}
	}
	return 2;
}

function formatTradeTime(timeStr) {
	hourStr = timeStr.substr(0, 2);
	minStr = timeStr.substr(2, 2);
	var time = new Date();
	time.setHours(hourStr);
	time.setMinutes(minStr);
	return time;
}

$(function() {
	// 买方保证金
	$.validator
			.addMethod(
					"price",
					function(value, element) {
						return this.optional(element)
								|| /^((((\+?[1-9][0-9]{0,7})|0)\.[0-9]{1,2})|((\+?[1-9][0-9]{0,7})|0))$/
										.test(value);
					}, "请正确填写此项");
	// 大于今天
	$.validator.addMethod("afterYesterday", function(value, element) {
		var today = sysdate;
		var dateTemp = convertDate(value);
		if (dateTemp != null) {
			return today <= dateTemp;
		} else {
			return true;
		}
	}, "必须不小于今天");
	// 大于今天
	$.validator.addMethod("afterToday", function(value, element) {
		var today = sysdate;
		var dateTemp = convertDate(value);
		if (dateTemp != null) {
			return today < dateTemp;
		} else {
			return true;
		}
	}, "必须大于今天");
	// 大于明天
	$.validator.addMethod("afterTomorrow", function(value, element) {
		var tomorrow = addDays(sysdate, 1);
		var dateTemp = convertDate(value);
		if (dateTemp != null) {
			return tomorrow < dateTemp;
		} else {
			return true;
		}
	}, "必须大于明天");
	// 大于后天
	$.validator.addMethod("afterTheDayAfterTomorrow", function(value, element) {
		var tomorrow = addDays(sysdate, 1);
		tomorrow = addDays(tomorrow, 1);
		var dateTemp = convertDate(value);
		if (dateTemp != null) {
			return tomorrow < dateTemp;
		} else {
			return true;
		}
	}, "必须在3天之后");

	// 竞买日期大于等于公告日期
	$.validator.addMethod("auctionDate", function(value, element) {
		return compareDate("noticeDate", "auctionDate", true);
	}, "不小于公告日期");

	// 交收日期大于等于竞买日期
	$.validator.addMethod("deliveryDate", function(value, element) {
		return compareDate("auctionDate", "deliveryDate", true);
	}, "不小于竞买日期");
	/*
	 * // 竞买结束时间大于竞买开始时间 $.validator.addMethod("isSameDay", function(value,
	 * element) { return isSameDay("beginTime", "endTime"); }, "与竞买开始时间同一天");
	 */

	// 竞买结束时间大于竞买开始时间
	$.validator.addMethod("endTime", function(value, element) {
		return compareTime("beginTimeStr", "endTimeStr", false);
	}, "大于竞买开始时间");

	// 是否在竞买时间端内
	$.validator.addMethod("tradeTime", function(value, element) {
		var b = isTradeTime("beginTimeStr", "endTimeStr");
		return b == 1 || b == 0;
	}, "不在交易时间段内");
	$.validator.addMethod("afterCurrentTime", function(value, element) {
		var begintTimeStr = $("#auctionDate").val();
		if(begintTimeStr!=""){
			    begintTimeStr =begintTimeStr +" "+value;
				var cuuretTime = Hundsun.formatDate(new Date(),"yyyy-MM-dd hh:mm");
				var date1 = convertDate(begintTimeStr);
				var date2 = convertDate(cuuretTime);
				return date1 > date2;
		}
		return true;
	}, "不小于当前时间");
	
	
	$.validator.addMethod("auctionTime", function(value, element) {
		if($("#beginTimeStr").val()!=''||$("#endTimeStr").val()!=''){
			if($("#auctionDate").val()!=''){
				return true;
			}
		}else{
			return true;
		}
	}, "竞买日期不能为空");

	// 是否在闭市时间前30分钟
	$.validator.addMethod("beforeEnd", function(value, element) {
		if(value==''){
			return true;
		}
		var b = isTradeTime("beginTimeStr", "endTimeStr");
		return b == 0;
	}, "不晚于闭市前30分钟");
	
	$.validator.addMethod("Mobil", function(value, element) {
		var b = isMobil($("#telePhone").val());
		return b;
	}, "电话格式不正确");
	
	$.validator.addMethod("NotZero", function(value, element) {
		if(value==''){
			return true;
		}
		var b = isNotZero($("#responseNum").val());
		return b;
	}, "数字格式不正确,且不能为0");
});

var isDirectStatus = function() {
	if (parseInt($("input[name='isDirect']:checked").val()) == 1) {
		$("#selectBuyerDiv").show();
	} else {
		$("#selectBuyerDiv").hide();
	}
}

var deliveryTypeStatus = function() {
	if ($("input[name='deliveryTypeShow']:checked").val() == "1") {
		$("input[name='warehouseCmpType']").eq(0).click();
		new warehouseCmpTypeStatus();
		$("input[name='warehouseCmpType']").attr("disabled", "disabled")
	} else {
		$("input[name='warehouseCmpType']").removeAttr("disabled", "disabled")
	}
	$("input[name='deliveryType']").val(
			$("input[name='deliveryTypeShow']:checked").val());
}

var warehouseCmpTypeStatus = function() {
	if ($("input[name='warehouseCmpType']:checked").val() == "1") {
		$(".div_warehouseInput").show();
		//$("#warehouseCmpNameInput").addClass("required");
		//$("#warehouseCmpAddressInput").addClass("required");
		//$("#warehouseCmpIdShow").removeClass("required");
		$(".div_warehouseSelect").hide();
		$("#warehouseCmpId").val("");
	} else {
		$(".div_warehouseInput").hide();
		$("#warehouseCmpNameInput").removeClass("required");
		$("#warehouseCmpAddressInput").removeClass("required");
		$("#warehouseCmpIdShow").addClass("required");
		$(".div_warehouseSelect").show();
	}
	$("input[name='deliveryType']").val(
			$("input[name='deliveryTypeShow']:checked").val());
	new warehouseCmpIdShowStatus();
}

var warehouseCmpIdShowStatus = function() {
	var warehouseCmpAddress = $("#warehouseCmpIdShow").find('option:selected')
			.attr("name");
	$("#warehouseCmpAddressSelect").val(warehouseCmpAddress);
}

function isMobil(s){
	if (/^0\d{2,3}-?\d{7,8}$/.test(s)||/^1\d{10}$/.test(s)) {
		return true;	
	}
	return false;
}

function isNotZero(s){
	if (/^\+?[1-9][0-9]*$/.test(s)||/^1\d{10}$/.test(s)) {
		return true;	
	}
	return false;
}

$(function() {
	new deliveryTypeStatus();
	new isDirectStatus();
	new warehouseCmpTypeStatus();
	if ($("#warehouseCmpAddressSelect").val() == "") {
		new warehouseCmpIdShowStatus();
	}

	$("input[name='deliveryTypeShow']").change(function() {
		new deliveryTypeStatus();
	});

	$("input[name='isDirect']").click(function() {
		new isDirectStatus();
	});

	$("input[name='warehouseCmpType']").change(function() {
		new warehouseCmpTypeStatus();
	});

	$("select[name='warehouseCmpIdShow']").change(function() {
		new warehouseCmpIdShowStatus();
	});

	$("input[type='text']").blur(function() {
		this.value = this.value.trim();
	});
	
	var customError = "";
	// 闭市前多少分钟不允许提交场次   chengcg 20150416
	$.validator.addMethod("spaceForbidTime", function(value, element) {
		if($("#auctionType").val()=="2" && ($("#beginTimeStr").val()==null||$("#beginTimeStr").val()=="")){
			return true;
		}
		var nValue = $("#auctionForbidTime").val();
		var b = isForbidTime("beginTimeStr",nValue);
		customError = "闭市前"+nValue+"分钟不允许提交场次"
		$.validator.messages.spaceForbidTime = customError;
		return b == 0;
		
	}, ""+customError);
	//chengcg 20150416
	function isForbidTime(beginTimeStr, n) {
		var beginTimeStr = $("#" + beginTimeStr).val();
		if (beginTimeStr == null || beginTimeStr == "" || n == null || n == "") {
			return 4;
		}
		var currentTime = new Date();
		var time1 = getTime(beginTimeStr);
		var timeStart1 = formatTradeTime(tradeTimes[0].gmtStart);
		timeStart1.setDate(time1.getDate());
		timeStart1.setMonth(time1.getMonth());
		timeStart1.setFullYear(time1.getFullYear());
		timeStart1.setSeconds(0);
		timeStart1.setMilliseconds(0);
		var timeEnd1 = formatTradeTime(tradeTimes[0].gmtEnd);
		timeEnd1.setDate(time1.getDate());
		timeEnd1.setMonth(time1.getMonth());
		timeEnd1.setFullYear(time1.getFullYear());
		timeEnd1.setSeconds(0);
		timeEnd1.setMilliseconds(0);
		timeEnd1.setTime(timeEnd1.getTime() - 1000 * 60 * n);// 少n分钟
		var timeStart2 = formatTradeTime(tradeTimes[1].gmtStart);
		timeStart2.setDate(time1.getDate());
		timeStart2.setMonth(time1.getMonth());
		timeStart2.setFullYear(time1.getFullYear());
		timeStart2.setSeconds(0);
		timeStart2.setMilliseconds(0);
		var timeEnd2 = formatTradeTime(tradeTimes[1].gmtEnd);
		timeEnd2.setDate(time1.getDate());
		timeEnd2.setMonth(time1.getMonth());
		timeEnd2.setFullYear(time1.getFullYear());
		timeEnd2.setSeconds(0);
		timeEnd2.setMilliseconds(0);
		timeEnd2.setTime(timeEnd2.getTime() - 1000 * 60 * n);// 少n分钟
		timeStart1 = timeStart1.getTime();
		timeStart2 = timeStart2.getTime();
		timeEnd1 = timeEnd1.getTime();
		timeEnd2 = timeEnd2.getTime();
		time1 = time1.getTime();
		if(time1 < timeStart1){
			return 1;
		}
		if(time1 > timeEnd1){
			if(time1<timeStart2){
				return 2;
			}else if(time1 <= timeEnd2){
				return 0;
			}
		}
		if(time1 > timeEnd2){
			return 3;
		}
		return 0;
	}
	

});