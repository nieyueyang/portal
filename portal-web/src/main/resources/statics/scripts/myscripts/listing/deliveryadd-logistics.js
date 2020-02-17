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
								.test(value))
								&& parseFloat(value) > 0;
					}, "请正确填写提货重量");

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
									var indexCount = $(
											"#inputDialogDeliveryPersonCarForm input[name=indexCount]")
											.val();
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
									if(indexCount=="")
										varietyRecordList.push(record);
									else {
										varietyRecordList[indexCount] = record;
									}
									$("#deliveryTbody")
											.html(getDeliveryTable());
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

	$("a[name='addDeliveryPerson']").click(function() {
		$("#inputDialogDeliveryPersonCar input[name='indexCount']").val("");
		$("#inputDialogDeliveryPersonCar").dialog("open");
		return false;
	});

	$("#submitBtn")
			.click(
					function() {
						var pass = true;
						$(".deliveryTbody").each(function() {
							var hadData = false;
							$(this).children("tr").each(function() {
								if ($(this).attr("class") == 'datatr')
									hadData = true;
							});
							if (!hadData) {
								alert('每种货品至少要录入一组提货人和车辆信息');
								pass = false;
								return false;
							}
						});
						if (pass) {
							var i = 0;
							$(".data")
									.each(
											function() {
												$(this)
														.children(
																"input[name='name']")
														.attr(
																"name",
																"recordList["
																		+ i
																		+ "].name");
												$(this)
														.children(
																"input[name='carNo']")
														.attr(
																"name",
																"recordList["
																		+ i
																		+ "].carNo");
												$(this)
														.children(
																"input[name='carDesc']")
														.attr(
																"name",
																"recordList["
																		+ i
																		+ "].carDesc");
												$(this)
														.children(
																"input[name='identityNo']")
														.attr(
																"name",
																"recordList["
																		+ i
																		+ "].identityNo");
												$(this)
														.children(
																"input[name='mobile']")
														.attr(
																"name",
																"recordList["
																		+ i
																		+ "].mobile");
												$(this)
														.children(
																"input[name='comments']")
														.attr(
																"name",
																"recordList["
																		+ i
																		+ "].comments");
												$(this)
														.children(
																"input[name='varietyId']")
														.attr(
																"name",
																"recordList["
																		+ i
																		+ "].varietyId");
												i++;
											});
							$("#deliveryRecordForm").submit();
						}
					});

});

function getDeliveryTable() {
	var htmlStr = "";
	if (varietyRecordList.length > 0) {
		for ( var i = 0; i < varietyRecordList.length; i++) {
			htmlStr += "<tr name='";
			htmlStr += "tr" + i + "' class='datatr'>";
			htmlStr += "<td class='tc'>";
			htmlStr += varietyRecordList[i].name;
			htmlStr += "</td>";
			htmlStr += "<td class='tc'>";
			htmlStr += varietyRecordList[i].carNo;
			htmlStr += "</td>";
			htmlStr += "<td class='tc' colspan='2'>"
			htmlStr += varietyRecordList[i].comments;
			htmlStr += "</td>";
			htmlStr += "<td style='display:none;'>"
			htmlStr += JSON.stringify(varietyRecordList[i]);
			htmlStr += "<td>";
			htmlStr += "<a title='修改提货人和车辆' onclick='editDelivery(" + i + ")'>";
			htmlStr += "<img src='" + imageServer
					+ "/images/role_edit.gif?t=13.gif'>编辑";
			htmlStr += "&nbsp;&nbsp;"
			htmlStr += "<a title='删除提货人和车辆' onclick='deleteDelivery(" + i
					+ ")'>";
			htmlStr += "<img src='" + imageServer
					+ "/images/role_delete.gif?t=13.gif'>删除";
			htmlStr += "</a></td><td class='data' style='display:none'>";
			htmlStr += "<input type='hidden' name='name' value='"
					+ varietyRecordList[i].name + "' />";
			htmlStr += "<input type='hidden' name='carNo' value='"
					+ varietyRecordList[i].carNo + "' />";
			htmlStr += "<input type='hidden' name='comments' value='"
					+ varietyRecordList[i].comments + "' />";
			htmlStr += "<input type='hidden' name='mobile' value='"
					+ varietyRecordList[i].mobile + "' />";
			htmlStr += "<input type='hidden' name='identityNo' value='"
					+ varietyRecordList[i].identityNo + "' />";
			htmlStr += "<input type='hidden' name='carDesc' value='"
					+ varietyRecordList[i].carDesc + "' />";
			htmlStr += "</tr>"
		}
	} else {
		htmlStr += "<tr><td colspan='4'  align='center'>无记录</td></tr>"
	}
	return htmlStr;
}

function rePushJsData(index) {
	varietyRecordList = new Array();
	$("#deliveryTbody tr").each(function() {
		var recordJson = $(this).children("td").eq(3).html();
		var record = new Object();
		if (recordJson != null && jQuery.trim(recordJson) != "") {
			record = JSON.parse(recordJson);
		}
		varietyRecordList.push(record);
	});
}

function deleteDelivery(x) {
	if (confirm("你确定要删除该条记录吗?")) {
		$("#deliveryTbody tr[name='tr" + x + "']").remove();
		rePushJsData(x);
		$("#deliveryTbody").html(getDeliveryTable(x));
	}
}

function editDelivery(x) {
	var recordJson = $("#deliveryTbody tr[name='tr" + x + "']").children("td")
			.eq(3).html();
	var record = new Object();
	if (recordJson != null && jQuery.trim(recordJson) != "") {
		record = JSON.parse(recordJson);
	}
	$("#inputDialogDeliveryPersonCarForm input[name=indexCount]").val(x);
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