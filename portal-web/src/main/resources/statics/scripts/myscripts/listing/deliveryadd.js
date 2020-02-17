var deliveryTypeStatus = function() {
	if ($("input[name='deliveryType']:checked").val() == "1") {
		$(".selfDeliverDiv").show();
		$(".logisticsDeliverDiv").hide();
		$("select[name='logisticsCompanyId']").removeClass("required");
		$("select[name='logisticsCompanyId']").val("");
	} else {
		$(".selfDeliverDiv").hide();
		$(".logisticsDeliverDiv").show();
		$("select[name='logisticsCompanyId']").addClass("required");
	}
}
var editDialogValidator;
$(function() {

	// 身份证正则表达式(15位)
	var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
	// 身份证正则表达式(18位)
	var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
	$.validator.addMethod("identityNo", function(value, element) {
		return this.optional(element)
				|| (isIDCard1.test(value) || isIDCard2.test(value));
	}, "请正确填写此项");
	// 手机号码
	var mobileReg = /^[0-9]{11}/;
	$.validator.addMethod("mobile", function(value, element) {
		return this.optional(element) || mobileReg.test(value);
	}, "请正确填写此项");

	// 浮点数格式
	$.validator
			.addMethod(
					"weight",
					function(value, element) {
						return (this.optional(element) || /^((((\+?[1-9][0-9]{0,7})|0)\.[0-9]{1,3})|((\+?[1-9][0-9]{0,7})|0))$/
								.test(value));
					}, "请正确填写提货重量");

	// 地区
	$.validator.addMethod("province", function(value, element) {
		return $.trim(jQuery("#provinceCode").val()) != "";
	}, "请选择省份");
	$.validator.addMethod("city", function(value, element) {
		return $.trim(jQuery("#cityCode").val()) != "";
	}, "请选择城市");
	$.validator.addMethod("district", function(value, element) {
		return $.trim(jQuery("#districtCode").val()) != "";
	}, "请选择地区");
	$.validator.addMethod("lastAddr", function(value, element) {
		return $.trim(jQuery("#lastAddr").val()) != "";
	}, "请填写详细地址");
	// qq
	$.validator.addMethod("qq", function(value, element) {
		return (this.optional(element) || /^[1-9][0-9]{4,}$/.test(value));
	}, "请正确填写qq号");

	editDialogValidator = $("#inputDialogDeliveryPersonCarForm").validate({
		submitHandler : function(form) {

		},
		rules : {
			name : {
				required : true,
				maxlength : 10
			},
			identityNo : {
				required : true,
				maxlength : 18,
				identityNo : true
			},
			mobile : {
				required : true,
				maxlength : 11,
				mobile : true
			},
			carNo : {
				required : true,
				maxlength : 10
			},
			carDesc : {
				maxlength : 80
			},
			comments : {
				maxlength : 150
			}
		},
		errorPlacement : function(error, element) {
			(element.parent().find("span.error")).replaceWith(error);
		},
		errorElement : "span"
	});

	logisticsDeliverValidator = $("#logisticsDeliverInputForm").validate({
		showErrors : function(errorMap, errorList) {
			var msg = "";
			jQuery.each(errorList, function(i, v) {
				msg += (v.message + "\r\n");
			});
			if (msg != "") {
				alert(msg);
			}
		},
		onsubmit : true,
		onfocusout : false,
		onkeyup : false
	});

	selfDeliverValidator = $("#selfDeliverInputForm").validate({
		showErrors : function(errorMap, errorList) {
			var msg = "";
			jQuery.each(errorList, function(i, v) {
				msg += (v.message + "\r\n");
			});
			if (msg != "") {
				alert(msg);
			}
		},
		onsubmit : true,
		onfocusout : false,
		onkeyup : false
	});

	preDialogValidator = $("#preInputForm").validate({
		submitHandler : function(form) {

		},
		rules : {
			lastAddr : {
				province : true,
				city : true,
				district : true,
				lastAddr : true,
				maxlength : 80
			},
			contacts : {
				required : true,
				maxlength : 20
			},
			mobile : {
				required : true,
				maxlength : 11,
				mobile : true
			},
			qq : {
				maxlength : 20,
				qq : true
			},
			comments : {
				maxlength : 80
			}
		},
		messages : {
			lastAddr : {
				required : "请填写详细地址"
			},
			logisticsCompanyId : {
				required : "提货方式为物流配送时此项必填"
			},
			comments : {
				maxlength : "不超过80个字"
			}
		},
		errorPlacement : function(error, element) {
			(element.parent().find("span.error")).replaceWith(error);
		},
		errorElement : "span"
	});

	new deliveryTypeStatus();

	$("input[name='deliveryType']").change(function() {
		new deliveryTypeStatus();
		logisticsDeliverValidator.resetForm();
		selfDeliverValidator.resetForm();
	});

	// 运费确认提示窗
	$("#dialog-feeconfirm").dialog(
			{
				autoOpen : false,
				bgiframe : true,
				modal : true,
				resizable : false,
				height : 200,
				buttons : {
					"确认" : function() {
						location.href = "feeConfirm.htm?deliveryId="
								+ $("#ajaxDeliveryId").val();
					},
					"取消" : function() {
						$(this).dialog("close");
					}
				}
			});

	$("#dialog-feeconfirm")
			.bind(
					"dialogopen",
					function(event, ui) {
						$("#dialog-feeconfirm")
								.load(
										appServer
												+ "/listing/delivery/buyer/ajax/feeInfo.htm?deliveryId="
												+ $("#ajaxDeliveryId").val()
												+ "&t=" + new Date().getTime());
					});

	// 收货确认提示窗
	$("#dialog-receiptconfirm").dialog(
			{
				autoOpen : false,
				bgiframe : true,
				modal : true,
				resizable : false,
				height : 200,
				buttons : {
					"确认" : function() {
						location.href = "receiptConfirm.htm?deliveryId="
								+ $("#ajaxDeliveryId").val();
					},
					"取消" : function() {
						$(this).dialog("close");
					}
				}
			});

	$("#dialog-receiptconfirm")
			.bind(
					"dialogopen",
					function(event, ui) {
						$("#dialog-receiptconfirm")
								.load(
										appServer
												+ "/listing/delivery/buyer/ajax/receiptInfo.htm?deliveryId="
												+ $("#ajaxDeliveryId").val());
					});

	// 申请详情
	$("#dialog-detail").dialog({
		autoOpen : false,
		bgiframe : true,
		modal : true,
		resizable : true,
		width : 800,
		height : 500,
		buttons : {
			"确定" : function() {
				$(this).dialog("close");
			}
		}
	});

	$("#dialog-detail")
			.bind(
					"dialogopen",
					function(event, ui) {
						$("#dialog-detail")
								.load(
										appServer
												+ "/listing/delivery/buyer/ajax/detail.htm?deliveryId="
												+ $("#ajaxDeliveryId").val()
												+ "&t=" + new Date().getTime());
					});

	$("#inputDialogDeliveryPersonCar")
			.dialog(
					{
						autoOpen : false,
						bgiframe : true,
						modal : true,
						width : 800,
						buttons : {
							"确认" : function() {
								if (editDialogValidator.form()) {
									var record = {
										"name" : $(
												"#inputDialogDeliveryPersonCar input[name='name']")
												.val(),
										"mobile" : $(
												"#inputDialogDeliveryPersonCar input[name='mobile']")
												.val(),
										"identityNo" : $(
												"#inputDialogDeliveryPersonCar input[name='identityNo']")
												.val(),
										"carNo" : $(
												"#inputDialogDeliveryPersonCar input[name='carNo']")
												.val(),
										"carDesc" : $(
												"#inputDialogDeliveryPersonCar textarea[name='carDesc']")
												.val(),
										"comments" : $(
												"#inputDialogDeliveryPersonCar textarea[name='comments']")
												.val()

									}
									var indexCount = parseInt($(
											"#inputDialogDeliveryPersonCar input[name='indexCount']")
											.val());
									var trCount = parseInt($(
											"#inputDialogDeliveryPersonCar input[name='trCount']")
											.val());
									if (isNaN(trCount)) {
										varietyRecordList[indexCount]
												.push(record);
									} else {
										varietyRecordList[indexCount][trCount] = record;
									}
									$("#deliveryTbody" + indexCount).html(
											getDeliveryTable(indexCount));
									$(
											"input[name='varietyList["
													+ indexCount
													+ "].recordsJsonData']")
											.val(
													JSON
															.stringify(varietyRecordList[indexCount]));
									$(this).dialog("close");
								}

							},
							"取消" : function() {
								$(this).dialog("close");
							}
						}
					});

	$("#inputDialogDeliveryPersonCar").bind("dialogclose", function(event, ui) {
		cleanInputForm("inputDialogDeliveryPersonCar");
	});

	$("a[name='addDeliveryPerson']").click(
			function() {
				$("#inputDialogDeliveryPersonCar input[name='indexCount']")
						.val(
								$(this).parent().find(
										"input[name='indexCount']").val());
				$("#inputDialogDeliveryPersonCar").dialog("open");
				return false;
			});

	$("#submitBtn")
			.click(
					function() {
						if (!preDialogValidator.form()) {
							return false;
						}
						var formId = "";
						var deliveryType = "";
						if ($("input[name='deliveryType']:checked").val() == "1") {
							formId = "selfDeliverInputForm";
							deliveryType = "self";
							if (!selfDeliverValidator.form()) {
								return false;
							}
						} else {
							formId = "logisticsDeliverInputForm";
							deliveryType = "desc";
							if (!logisticsDeliverValidator.form()) {
								return false;
							}
						}

						var weightCount = 0;
						var okCount = 0;
						var weightFlow = false;
						$("#" + formId + " .weight")
								.each(
										function() {
											if (jQuery.trim($(this).val()) != "") {
												var availableWeigth = 0;
												availableWeigth = parseFloat($(
														this)
														.parent()
														.find(
																"input[name='availableWeight']")
														.val());
												var appWeight = parseFloat(jQuery
														.trim($(this).val()));
												if (appWeight > availableWeigth) {
													weightFlow = true;
													return;
												}
												weightCount += 1;
												if (deliveryType == "self") {
													/*
													 * var jsonData = $(this)
													 * .parent()
													 * .find(".jsonData")
													 * .val();
													 */
													var jsonData = $(
															"input[class='jsonData']")
															.val();
													if (jQuery.trim(jsonData) != ""
															&& jQuery
																	.trim(jsonData) != "[]") {
														okCount += 1;
													}
												}
											}
										});

						if (weightFlow) {
							alert("提货重量不能大于可提重量");
							return false;
						}
						if (weightCount == 0) {
							alert("请输入提货重量");
							return false;
						}
						if (deliveryType == "self" && okCount == 0) {
							alert("请至少添加一组提货人和车辆");
							return false;
						}
						var companyName = $(
								"#preInputForm select[name='logisticsCompanyId'] option:selected")
								.attr("label");
						var companyId = $(
								"#preInputForm select[name='logisticsCompanyId']")
								.val();
						var contacts = $("#preInputForm input[name='contacts']")
								.val();
						var mobile = $("#preInputForm input[name='mobile']")
								.val();
						var qq = $("#preInputForm input[name='qq']").val();
						var province = $(
								"#preInputForm select[name='provinceCode'] option:selected")
								.html();
						var provinceCode = $(
								"#preInputForm select[name='provinceCode']")
								.val();
						var city = $(
								"#preInputForm select[name='cityCode'] option:selected")
								.html();
						var cityCode = $(
								"#preInputForm select[name='cityCode']").val();
						var district = $(
								"#preInputForm select[name='districtCode'] option:selected")
								.html();
						var districtCode = $(
								"#preInputForm select[name='districtCode']")
								.val();
						var firstAddr = province + city + district;
						var lastAddr = $("#preInputForm input[name='lastAddr']")
								.val();
						var buyerCompanyAddress = firstAddr + lastAddr;
						var comments = $(
								"#preInputForm textarea[name='comments']")
								.val();
						$("#" + formId + " input[name='logisticsCompanyId']")
								.val(companyId);
						$("#" + formId + " input[name='logisticsCompanyName']")
								.val(companyName);
						$("#" + formId + " input[name='buyerCompanyAddress']")
								.val(buyerCompanyAddress);
						$("#" + formId + " input[name='contacts']").val(
								contacts);
						$("#" + formId + " input[name='mobile']").val(mobile);
						$("#" + formId + " input[name='qq']").val(qq);
						$("#" + formId + " input[name='provinceCode']").val(
								provinceCode);
						$("#" + formId + " input[name='cityCode']").val(
								cityCode);
						$("#" + formId + " input[name='districtCode']").val(
								districtCode);
						$("#" + formId + " input[name='firstAddr']").val(
								firstAddr);
						$("#" + formId + " input[name='lastAddr']").val(
								lastAddr);
						$("#" + formId + " input[name='comments']").val(
								comments);
						$("#" + formId).submit();
					});

	// 移到上面就显示详情
	/*
	 * $(".operateSpan").hover(function() { var deliveryId =
	 * $(this).find("input[name='operate_id']").val(); detail(deliveryId); },
	 * function() { $("#dialog-detail").dialog("close"); });
	 */

});

function getDeliveryTable(index) {
	var htmlStr = "";
	if (varietyRecordList[index].length > 0) {
		for ( var i = 0; i < varietyRecordList[index].length; i++) {
			htmlStr += "<tr name='";
			htmlStr += "tr" + i + "'>";
			htmlStr += "<td>";
			htmlStr += varietyRecordList[index][i].name;
			htmlStr += "</td>";
			htmlStr += "<td>";
			htmlStr += varietyRecordList[index][i].carNo;
			htmlStr += "</td>";
			htmlStr += "<td>"
			htmlStr += varietyRecordList[index][i].comments;
			htmlStr += "</td>";
			htmlStr += "<td style='display:none;'>"
			htmlStr += JSON.stringify(varietyRecordList[index][i]);
			htmlStr += "<td>";
			htmlStr += "<a title='修改提货人和车辆' onclick='editDelivery(" + index
					+ "," + i + ")'>";
			htmlStr += "<img src='" + imageServer
					+ "/images/role_edit.gif?t=13.gif'>编辑";
			htmlStr += "&nbsp;&nbsp;"
			htmlStr += "<a title='删除提货人和车辆' onclick='deleteDelivery(" + index
					+ "," + i + ")'>";
			htmlStr += "<img src='" + imageServer
					+ "/images/role_delete.gif?t=13.gif'>删除";

			htmlStr += "</a></td></tr>"
		}
	} else {
		htmlStr += "<tr><td colspan='4'  align='center'>无记录</td></tr>"
	}
	return htmlStr;
}

function rePushJsData(index) {
	varietyRecordList[index] = new Array();
	$("#deliveryTbody" + index + " tr").each(function() {
		var recordJson = $(this).children("td").eq(3).html();
		var record = [];
		if (recordJson != null && jQuery.trim(recordJson) != "") {
			record = JSON.parse(recordJson);
		}
		varietyRecordList[index].push(record);
	});
	$("input[name='varietyList[" + index + "].recordsJsonData']").val(
			JSON.stringify(varietyRecordList[index]));
}

function deleteDelivery(x, y) {
	if (confirm("你确定要删除该条记录吗?")) {
		$("#deliveryTbody" + x + " tr[name='tr" + y + "']").remove();
		rePushJsData(x);
		$("#deliveryTbody" + x).html(getDeliveryTable(x));
	}
}

function editDelivery(x, y) {
	var recordJson = $("#deliveryTbody" + x + " tr[name='tr" + y + "']")
			.children("td").eq(3).html();
	var record = [];
	if (recordJson != null && jQuery.trim(recordJson) != "") {
		record = JSON.parse(recordJson);
	}
	$("#inputDialogDeliveryPersonCar input[name='indexCount']").val(x);
	$("#inputDialogDeliveryPersonCar input[name='trCount']").val(y);
	$("#inputDialogDeliveryPersonCar input[name='name']").val(record.name);
	$("#inputDialogDeliveryPersonCar input[name='identityNo']").val(
			record.identityNo);
	$("#inputDialogDeliveryPersonCar input[name='mobile']").val(record.mobile);
	$("#inputDialogDeliveryPersonCar input[name='carNo']").val(record.carNo);
	$("#inputDialogDeliveryPersonCar textarea[name='carDesc']").val(
			record.carDesc);
	$("#inputDialogDeliveryPersonCar textarea[name='comments']").val(
			record.comments);
	$("#inputDialogDeliveryPersonCar").dialog("open");
}

function cleanInputForm(formId) {
	$("#" + formId + " input[type='text']").val("");
	$("#" + formId + " input[type='hidden']").val("");
	$("#" + formId + " textarea[name='carDesc']").val("");
	$("#" + formId + " textarea[name='comments']").val("");
	editDialogValidator.resetForm();

}

function feeconfirm(deliveryId) {
	$("#ajaxDeliveryId").val(deliveryId);
	$("#dialog-feeconfirm").dialog("open");
	return false;
}

function receiptconfirm(deliveryId) {
	$("#ajaxDeliveryId").val(deliveryId);
	$("#dialog-receiptconfirm").dialog("open");
	return false;
}

function detail(deliveryId) {
	$("#ajaxDeliveryId").val(deliveryId);
	$("#dialog-detail").dialog("open");
	return false;
}

function deliverAll() {
	var formId = "";
	if ($("input[name='deliveryType']:checked").val() == "1") {
		formId = "selfDeliverInputForm";
	} else {
		formId = "logisticsDeliverInputForm";
	}
	$("#" + formId + " .weight").each(
			function() {
				var availableWeigth = 0;
				availableWeigth = parseFloat($(this).parent().find(
						"input[name='availableWeight']").val());
				$(this).val(availableWeigth);
			});
}
function clearAll() {
	var formId = "";
	if ($("input[name='deliveryType']:checked").val() == "1") {
		formId = "selfDeliverInputForm";
	} else {
		formId = "logisticsDeliverInputForm";
	}
	$("#" + formId + " .weight").each(function() {
		$(this).val("");
	});
}

/*
 * function showDetail(item, deliveryId) { $(".showDetailDiv").empty();
 * $(item).find(".showDetailDiv").load( appServer +
 * "/listing/delivery/buyer/ajax/detail.htm?deliveryId=" + deliveryId + "&t=" +
 * new Date().getTime()); }
 * 
 * function closeDetail(item){ $(item).find(".showDetailDiv").empty(); }
 */

$(function() {
	$(".recordTd td")
			.mouseover(
					function() {
						var deliveryId = $(this).find(
								"input[name='operate_id']").val();
						$(this)
								.find(".showDetailDiv")
								.load(
										appServer
												+ "/listing/delivery/ajax/detail.htm?deliveryId="
												+ deliveryId);
						$(this).find(".showDetailDiv").show();
					})
	$(".recordTd td").mouseleave(function() {
		$(".showDetailDiv").hide();
	})

})