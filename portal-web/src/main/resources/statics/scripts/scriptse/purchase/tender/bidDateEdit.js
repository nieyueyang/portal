$(function() {
	$("#editBidBeginDateDialog").dialog({
		autoOpen : false,
		bgiframe : true,
		modal : true,
		position : [ 450, 150 ],
		width : 250,
		minHeight : 130,
		title : "修改投标开始时间",
		open : function() {
			// jquery之dialog的键盘事件(输入完毕回车检索)
			$(this).bind("keypress.ui-dialog", function(event) {
				if (event.keyCode == $.ui.keyCode.ENTER) {
					$(".ui-dialog-buttonpane button").first().click();
					return false;
				}
			});
		},
		buttons : {
			"确认" : function() {
				$("#editBidBeginDateForm").submit();
				$(this).dialog("close");
			},
			"取消" : function() {
				$(this).dialog("close");
			}
		}
	});

	$("#editBidEndDateDialog").dialog({
		autoOpen : false,
		bgiframe : true,
		modal : true,
		position : [ 450, 150 ],
		width : 250,
		minHeight : 130,
		title : "修改投标结束时间",
		open : function() {
			// jquery之dialog的键盘事件(输入完毕回车检索)
			$(this).bind("keypress.ui-dialog", function(event) {
				if (event.keyCode == $.ui.keyCode.ENTER) {
					$(".ui-dialog-buttonpane button").first().click();
					return false;
				}
			});
		},
		buttons : {
			"确认" : function() {
				$("#editBidEndDateForm").submit();
				$(this).dialog("close");
			},
			"取消" : function() {
				$(this).dialog("close");
			}
		}
	});
	
	$("#editSecondBidDialog").dialog({
		autoOpen : false,
		bgiframe : true,
		modal : true,
		position : [ 400, 150 ],
		width : 680,
		minHeight : 130,
		title : "再次投标设置",
		open : function() {
			// jquery之dialog的键盘事件(输入完毕回车检索)
			$(this).bind("keypress.ui-dialog", function(event) {
				if (event.keyCode == $.ui.keyCode.ENTER) {
					$(".ui-dialog-buttonpane button").first().click();
					return false;
				}
			});
		},
		buttons : {
			"确认" : function() {
				$("#secondPriceMsg").html("");
				$("#secondBidBeginDateMsg").html("");
				$("#secondBidEndDateMsg").html("");
				 var patn3=/^((((\+?[1-9][0-9]{0,10})|0)\.[0-9]{1,2})|((\+?[1-9][0-9]{0,7})|0))$/;
				 var btime = $("#secondBidBeginDate").val();
				 var etime = $("#secondBidEndDate").val();
				 var time = new Date();
				 btime = getTime($("#secondBidBeginDate").val());
				 etime  = getTime($("#secondBidEndDate").val());
				 if(etime<time){
					 $("#secondBidEndDateMsg").html("结束时间必须大于当前时间");
					 return false;
				 }else{
					 $("#secondBidEndDateMsg").html("");
				 }
				 if(btime>etime){
					 $("#secondBidBeginDateMsg").html("开始时间必须大于结束时间");
					 return false;
				 }else{
					 $("#secondBidBeginDateMsg").html("");
				 }
				 var secondPriceArr = $(":input[name='secondLowPrice']");
				 var secondPriceMsgArr = $(".secondPriceMsg");
				 var flag = true;
				 for(var i=0;i<secondPriceArr.length;i++) {
					 if(secondPriceArr[i].value=='' || !patn3.test(secondPriceArr[i].value)) {
						 secondPriceMsgArr[i].innerHTML = "此项格式不正确";
						 flag = false;
					 } else {
						 secondPriceMsgArr[i].innerHTML = "";
					 }
				 }
				 var objName = $(":input[name='supplierId']");
				 var checkNum = 0;
				 for (i=0; i<objName.length; i++){  
	                if (objName[i].type=="checkbox" && objName[i].checked){
	                	checkNum++;
	                }
		        }
				 if(checkNum==0){
					 alert('必须选择一个供方');
					 return;
					 
				 }
				 if(!flag) {
					 return;
				 } else {
					 for(var i=0;i<secondPriceArr.length;i++) {
						 secondPriceArr[i].value = (secondPriceArr[i].value*100).toFixed(0);
					 }
				 }
				$("#editSecondBidForm").submit();
				$(this).dialog("close");
			},
			"取消" : function() {
				$(this).dialog("close");
			}
		}
	});

});

function editBidBeginDate(tenderId, currentDate, endDate) {
	$("#editBidBeginDateDialog input[name='id']").val(tenderId);
	$("#editBidBeginDateDialog input[name='bidBeginDateStr']").val(currentDate);
	$("#editBidEndDateDialog input[name='bidEndDateStr']").val(endDate);
	$("#editBidBeginDateDialog").dialog("open");
	return false;
}

function editBidEndDate(tenderId, currentDate, beginDate) {
	$("#editBidEndDateDialog input[name='id']").val(tenderId);
	$("#editBidBeginDateDialog input[name='bidBeginDateStr']").val(beginDate);
	$("#editBidEndDateDialog input[name='bidEndDateStr']").val(currentDate);
	$("#editBidEndDateDialog").dialog("open");
	return false;
}

function secondBidBeginDate(tenderId, tenderNo, currentDate, endDate, num) {
	$.ajax({
		url: appServer+"/purchase/buyer/getPlans.htm?tenderNo=" + tenderNo,
		
		success: function (map) {
			$("#editSecondBidDialog input[name='id']").val(tenderId);
			$("#editSecondBidDialog input[name='bidBeginDateStr']").val(currentDate);
			$("#editSecondBidDialog input[name='bidEndDateStr']").val(endDate);
			var str = "";
			var cStr = "";
			$("#plans").html("");
			$("#companyList").html("");
			var list = map.planList;
			var clist = map.supplierList;
			for ( var i=0; i<list.length; i++) {
				var secondPrice =null;
				if(num=="2")
					secondPrice = list[i].secondPrice;
				else if(num=="3")
					secondPrice = list[i].thirdPrice;
				else if(num=="4")
					secondPrice = list[i].fourthPrice;
				
				if(secondPrice == null) {
					secondPrice = "";
				} else {
					secondPrice = secondPrice/100;
				}
				str += "<tr>" +
						"<td>" +
							"<input type='hidden' value='"+list[i].id+"' name='planId' />" +
							"<input type='hidden' value='"+num+"' name='num' />" +
							"<div style='width:180px;float:left;'>计划号：" + list[i].planNo + "</div>" +
							"<div style='width:180px;float:left;'>计划物料：" + list[i].varietyName + "</div>" +
							"<div style='width:270px;float:left;'>目前最低价：<input name='secondLowPrice' class='inpt' type='text' value='"+secondPrice+"'/>" +
							"<span style='color:red'>*</span>" +
							"<span style='color:red' class='secondPriceMsg'></span></div>" +
						"</td>" +
						"</tr>"
			}
			$("#plans").append("<tr>" +
					"<td style='font-weight:bold;'>计划列表：</td>" +
					"</tr>" +
					str);
			for ( var j=0; j<clist.length; j++) {
				if(clist[j].bidCount>0){
					cStr += "<tr>"+
					"<td>" +
					"<div style='width:180px;float:left;'><input type='checkbox' value='"+clist[j].supplierCompanyId+"' name='supplierId' onclick='checks("+clist[j].id+")'/></div>" +
					"<div style='width:270px;float:left;'>企业名称:"+clist[j].supplierCompanyName+"<div style='display:none;'><input type='checkbox' id='c"+clist[j].id+"' value='"+clist[j].supplierCompanyName+"' name='supplierName'/></div></div>" +
					"<div style='width:180px;float:left;'>联系人:"+clist[j].supplierContacts+"</div>" +
					"</td>" +
					"</tr>"
				}
			}
			$("#companyList").append("<tr>" +
					"<td style='font-weight:bold;'>供方列表：</td>" +
					"</tr>" +
					cStr);
			$("#editSecondBidDialog").dialog("open");
		}
	});
	return false;
}
function checks(id){
	$("#c"+id).attr("checked", true);
}

function getTime(dateTimeStr) {
	var dateTimeArray = dateTimeStr.split(" ");
	var dateStr = dateTimeArray[0];
	var timeStr = dateTimeArray[1];
	var dateArray = dateStr.split("-");
	var timeArray = timeStr.split(":");
	var dateTime = new Date();
	dateTime.setFullYear(dateArray[0]);
	if(dateArray[1].charAt(0)=="0") {
		dateArray[1] = dateArray[1].slice(1);
	}
	dateTime.setMonth(parseInt(dateArray[1])-1);
	dateTime.setDate(dateArray[2]);
	dateTime.setHours(timeArray[0]);
	dateTime.setMinutes(timeArray[1]);
	dateTime.setSeconds(0);
	dateTime.setMilliseconds(0);
	return dateTime;
}
