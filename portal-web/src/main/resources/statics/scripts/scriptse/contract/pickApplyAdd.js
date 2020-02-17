var editDialogValidator;
$(function() {
	for (var i = 0; i < applyRecordList.length; i++) {
		$("#applyItemTbody" + i).html(getApplyItemTable(i));
		$("input[name='applyItemList[" + i + "].recordsJsonData']").val(JSON
				.stringify(applyRecordList[i]));

	}

	// 浮点数格式
	$.validator.addMethod("weight", function(value, element) {
		return (this.optional(element) || (/^((((\+?[1-9][0-9]{0,7})|0)\.[0-9]{1,3})|((\+?[1-9][0-9]{0,7})|0))$/
				.test(value) && parseFloat(value) > 0));
	}, "请正确填写提货重量");

	// 不大于剩余可申购重量
	$.validator.addMethod("weightFlow", function(value, element) {
		return (this.optional(element) || parseFloat(value) <= parseFloat($("#inputDialogApplyItem input[name='supplusWeight']")
				.val()));
	}, "不大于剩余可申购重量");

	//添加验证正整数规则
	jQuery.validator.addMethod("positiveinteger", function(value, element) {
		   var aint=parseInt(value);	
		    return (aint>0&& (aint+"")==value) || ($.trim(value)=="");   
		  }, "请输入正整数");   
	editDialogValidator = $("#inputDialogApplyItemForm").validate({
				submitHandler : function(form) {

				},
				rules : {
					driver : {
						maxlength : 20
					},
					carNo : {
						required : true,
						maxlength : 200
					},
					applyWeight : {
						required : true,
						maxlength : 12,
						weight : true,
						weightFlow : true
					},
					deliveryType : {
						required : true
					},
					deliveryDate : {
						required : true
					},
					deliveryModel : {
						required : true
					},
					quantity : {
						positiveinteger : true
					}
				},
				errorPlacement : function(error, element) {
					(element.parent().find("span.error")).replaceWith(error);
				},
				errorElement : "span"
			});
	$("#inputDialogApplyItem").dialog({
		autoOpen : false,
		bgiframe : true,
		modal : true,
		width : 800,
		buttons : {
			"确认" : function() {
				if (editDialogValidator.form()) {
					var record = {
						"driver" : $("#inputDialogApplyItem input[name='driver']")
								.val(),
						"carNo" : $("#inputDialogApplyItem input[name='carNo']")
								.val(),
						"applyWeight" : $("#inputDialogApplyItem input[name='applyWeight']")
								.val(),
						"deliveryType" : $("#inputDialogApplyItem select[name='deliveryType']")
								.val(),
						"deliveryTypeName" : $("#inputDialogApplyItem select[name='deliveryType']")
								.find('option:selected').text(),
						"deliveryDate" : $("#inputDialogApplyItem input[name='deliveryDate']")
								.val(),
						"deliveryModel" : $("#inputDialogApplyItem select[name='deliveryModel']")
								.val(),
						"deliveryModelName" : $("#inputDialogApplyItem select[name='deliveryModel']")
								.find('option:selected').text(),
						"batchNo" : $("#inputDialogApplyItem input[name='batchNo']")
								.val(),
						"orderNo" : $("#inputDialogApplyItem input[name='orderNo']")
								.val(),
						"unitWeight" : $("#inputDialogApplyItem input[name='unitWeight']")
								.val(),
						"quantity" : $("#inputDialogApplyItem input[name='quantity']")
								.val()
								
					}
					var indexCount = parseInt($("#inputDialogApplyItem input[name='indexCount']")
							.val());
					var trCount = parseInt($("#inputDialogApplyItem input[name='trCount']")
							.val());
					if (isNaN(trCount)) {
						applyRecordList[indexCount].push(record);
					} else {
						applyRecordList[indexCount][trCount] = record;
					}
					$("#applyItemTbody" + indexCount)
							.html(getApplyItemTable(indexCount));
					$("input[name='applyItemList[" + indexCount
							+ "].recordsJsonData']").val(JSON
							.stringify(applyRecordList[indexCount]));

					$(this).dialog("close");
				}
			},
			"取消" : function() {
				$(this).dialog("close");
			}
		}
	});
	$("#inputDialogApplyItem").bind("dialogclose", function(event, ui) {
				cleanInputForm("inputDialogApplyItem");
			});

	$("a[name='addApplyItem']").click(function() {
		var varietyType = $("#varietyType" ).val();
		var erpSystem = $("#erpSystem" ).val();
		var  chenggangErp = $(this).parent().find("input[name='chenggangErp']").val(); //是否为承钢卷板标识
		//卷板提货明细只有一条，必须一次提完
		var  indexCountNu = $(this).parent().find("input[name='indexCount']").val();
		var recordsJson = $("input[name='applyItemList[" + indexCountNu
				+ "].recordsJsonData']").val();
		if(recordsJson != "[]"&&varietyType =="2"){
			alert("卷板提货明细只有一条，必须一次提完!");
			return false;
		}

		$("#inputDialogApplyItem input[name='indexCount']").val($(this)
				.parent().find("input[name='indexCount']").val());
		$("#inputDialogApplyItem input[name='trCount']").val("");
		$("#inputDialogApplyItem input[name='supplusWeight']").val($(this)
				.parent().find("input[name='supplusWeight']").val());
		$("#inputDialogApplyItem input[name='contractGoodsId']").val($(this)
				.parent().find("input[name='contractGoodsId']").val());
		$("#inputDialogApplyItem select[name='deliveryType']").val($(this)
				.parent().find("input[name='deliveryType']").val());
		if(varietyType =="2"){//是卷板时提货重量一次提完
			$("#inputDialogApplyItem input[name='applyWeight']").val($(this).parent().find("input[name='supplusWeight']").val());
			$("#inputDialogApplyItem input[name='applyWeight']").attr({ readonly: 'true' });
		}
		if(chenggangErp =="YES"){ //承钢卷板
			//$("#inputDialogApplyItem .orderNoDiv").css("display","block");
			$("#inputDialogApplyItem input[name='orderNo']").val($(this)
				.parent().find("input[name='orderNo']").val());
		}
		$("#inputDialogApplyItem input[name='unitWeight']").val($(this)
				.parent().find("input[name='unitWeight']").val());
		$("#inputDialogApplyItem").dialog("open");
		return false;
	});

});

function getApplyItemTable(index) {
	var htmlStr = "";
	if (applyRecordList[index].length > 0) {
		for (var i = 0; i < applyRecordList[index].length; i++) {
			htmlStr += "<tr name='";
			htmlStr += "tr" + i + "'>";
			htmlStr += "<td>";
			htmlStr += applyRecordList[index][i].driver;
			htmlStr += "</td>";
			htmlStr += "<td style='width:232px;word-break:break-all;overflow:auto;'>";
			htmlStr += applyRecordList[index][i].carNo;
			htmlStr += "</td>";
			htmlStr += "<td>"
			htmlStr += applyRecordList[index][i].applyWeight;
			htmlStr += "</td>";
			htmlStr += "<td>"
			htmlStr += applyRecordList[index][i].deliveryTypeName;
			htmlStr += "</td>";
			htmlStr += "<td>"
			htmlStr += applyRecordList[index][i].deliveryDate;
			htmlStr += "</td>";
			htmlStr += "<td>"
			htmlStr += applyRecordList[index][i].deliveryModelName;
			htmlStr += "</td>";
			htmlStr += "<td style='display:none;'>"
			htmlStr += JSON.stringify(applyRecordList[index][i]);
			htmlStr += "<td>";
			htmlStr += "<a title='修改' onclick='editApplyItem(" + index + ","
					+ i + ")'>";
			htmlStr += "<img src='" + imageServer
					+ "/images/role_edit.gif?t=13.gif'>编辑";
			htmlStr += "&nbsp;&nbsp;"
			htmlStr += "<a title='删除' onclick='deleteApplyItem(" + index + ","
					+ i + ")'>";
			htmlStr += "<img src='" + imageServer
					+ "/images/role_delete.gif?t=13.gif'>删除";

			htmlStr += "</a></td></tr>"
		}
	} else {
		htmlStr += "<tr><td colspan='8'  align='center'>无记录</td></tr>"
	}
	return htmlStr;
}

function editApplyItem(x, y) {
	var varietyType = $("#varietyType" ).val();
	var erpSystem = $("#erpSystem" ).val();
	var recordJson = $("#applyItemTbody" + x + " tr[name='tr" + y + "']")
			.children("td").eq(6).html();
	var record = [];
	if (recordJson != null && jQuery.trim(recordJson) != "") {
		record = JSON.parse(recordJson);
	}
	$("#inputDialogApplyItem input[name='indexCount']").val(x);
	$("#inputDialogApplyItem input[name='trCount']").val(y);
	$("#inputDialogApplyItem input[name='driver']").val(record.driver);
	$("#inputDialogApplyItem input[name='carNo']").val(record.carNo);
	$("#inputDialogApplyItem input[name='applyWeight']")
			.val(record.applyWeight);
	$("#inputDialogApplyItem select[name='deliveryType']")
			.val(record.deliveryType);
	$("#inputDialogApplyItem input[name='deliveryDate']")
			.val(record.deliveryDate);
	$("#inputDialogApplyItem select[name='deliveryModel']")
			.val(record.deliveryModel);
	$("#inputDialogApplyItem input[name='supplusWeight']")
			.val($("#supplusWeight" + x).val());
	$("#inputDialogApplyItem input[name='batchNo']").val(record.batchNo); //批次号
	if(varietyType =="2"){//是卷板时提货重量一次提完
		$("#inputDialogApplyItem input[name='applyWeight']").attr({ readonly: 'true' });
	}
	$("#inputDialogApplyItem input[name='orderNo']").val(record.orderNo);
	$("#inputDialogApplyItem input[name='unitWeight']").val(record.unitWeight);
	$("#inputDialogApplyItem input[name='quantity']").val(record.quantity);
	$("#inputDialogApplyItem").dialog("open");
}

function deleteApplyItem(x, y) {
	if (confirm("你确定要删除该条记录吗?")) {
		$("#applyItemTbody" + x + " tr[name='tr" + y + "']").remove();
		rePushJsData(x);
		$("#applyItemTbody" + x).html(getApplyItemTable(x));
	}
}

function cleanInputForm(formId) {
	$("#" + formId + " input[type='text']").val("");
	$("#" + formId + " input[type='hidden']").val("");
	$("#" + formId + " textarea[name='carDesc']").val("");
	$("#" + formId + " textarea[name='comments']").val("");
	editDialogValidator.resetForm();

}

function rePushJsData(index) {
	applyRecordList[index] = new Array();
	$("#applyItemTbody" + index + " tr").each(function() {
				var recordJson = $(this).children("td").eq(6).html();
				var record = [];
				if (recordJson != null && jQuery.trim(recordJson) != "") {
					record = JSON.parse(recordJson);
				}
				applyRecordList[index].push(record);
			});
	$("input[name='applyItemList[" + index + "].recordsJsonData']").val(JSON
			.stringify(applyRecordList[index]));
}

function setPickWeight() {
	var unitWeight = $("#inputDialogApplyItem").find("input[name='unitWeight']").val();
	if($.trim(unitWeight) == "" || unitWeight == null) {
		unitWeight = "a";
	}
	var quantity = $("#inputDialogApplyItem").find("input[name='quantity']").val();
	if($.trim(quantity) == "" || quantity == null) {
		quantity = "a";
	}
	var pickWeight = accMul(unitWeight,quantity);
	if(!isNaN(pickWeight)) {
		$("#inputDialogApplyItem").find("input[name='applyWeight']").val(pickWeight);
	}
}

function accMul(arg1,arg2) 
{ 
	var m=0,s1=arg1.toString(),s2=arg2.toString(); 
	try{m+=s1.split(".")[1].length}catch(e){} 
	try{m+=s2.split(".")[1].length}catch(e){} 
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
} 