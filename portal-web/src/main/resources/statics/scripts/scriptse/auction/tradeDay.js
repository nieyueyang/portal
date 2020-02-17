var currentDay;
var nextDay;
var tradeDays = [];
var tradeTimes = [];
$(function() {
	currentDay = $("#currentDay").val();
	nextDay = $("#nextDay").val();
	tradeTimes = JSON.parse($("#tradeTimes").val());
	var tr = "";
	for ( var i = 0; i < tradeTimes.length; i++) {
		var timeStart = tradeTimes[i].gmtStart;
		timeStart = timeStart.substr(0, 2) + ":" + timeStart.substr(2, 2);
		var timeEnd = tradeTimes[i].gmtEnd;
		timeEnd = timeEnd.substr(0, 2) + ":" + timeEnd.substr(2, 2);
		tr = tr + "<tr><th width='90'>时间段" + (i + 1) + "：</th><td>" + timeStart
				+ " - " + timeEnd + "</td></tr>";

	}
	$("#tradeTimeTable").html(tr);
	jQuery.ajax({
		type : "POST",
		url : appServer + "/ajax/tradeDay/getTradeDay.htm?t="
				+ new Date().getTime(),
		dataType : "json",
		success : function(data) {
			tradeDays = JSON.parse(data.tradeDays);
		},
		error : function() {
			tr = "<tr><td>交易时间信息载入失败，请稍后再试...</td></tr>";
			$("#tradeTimeTable").html(tr);
		}
	});

});