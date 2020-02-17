var isSubmit = false;

function toSubmit(rootUrl) {
	var goodsJson = $("#goodsJson").val();
	var goods = {};
	if (goodsJson != null && jQuery.trim(goodsJson) != "") {
		goods = JSON.parse(goodsJson);
	}
	var type = $("#type").val();

	var varietyName = $("#editDialogForm input[name='varietyName']").val();
	goods.varietyName = varietyName;
	var varietyCode = $("#editDialogForm input[name='varietyCode']").val();
	goods.varietyCode = varietyCode;
	var material = $(
			"#editDialogForm input[name='material'],#editDialogForm select[name='material']")
			.val();
	goods.material = material;
	var length = $(
			"#editDialogForm input[name='length'],#editDialogForm select[name='length']")
			.val();
	goods.length = length;
	var width = $(
			"#editDialogForm input[name='width'],#editDialogForm select[name='width']")
			.val();
	goods.width = width;
	var thickness = $(
			"#editDialogForm input[name='thickness'],#editDialogForm select[name='thickness']")
			.val();
	goods.thickness = thickness;
	var weight = $(
			"#editDialogForm input[name='weight'],#editDialogForm select[name='weight']")
			.val();
	goods.weight = weight;
	var manufacturer = $(
			"#editDialogForm input[name='manufacturer'],#editDialogForm select[name='manufacturer']")
			.val();
	goods.manufacturer = manufacturer;
	var origin = $(
			"#editDialogForm input[name='origin'],#editDialogForm select[name='origin']")
			.val();
	goods.origin = origin;
	var quantity = $(
			"#editDialogForm input[name='quantity'],#editDialogForm select[name='quantity']")
			.val();
	goods.quantity = quantity;
	var productionDate = $("#editDialogForm input[name='productionDate']")
			.val();
	goods.productionDate = productionDate;
	var qualityStandard = $(
			"#editDialogForm input[name='standard'],#editDialogForm select[name='standard']")
			.val();
	goods.qualityStandard = qualityStandard;
	var baleNo = $("#editDialogForm input[name='baleNo']").val();
	goods.baleNo = baleNo;
	var comments = $("#editDialogForm textarea[name='comments']").val();
	goods.comments = comments;
	var varieties = [];
	var count = 0;
	$(
			"#propertyGGTable input[type='text'],#propertyGGTable input[type='radio']:checked,#propertyGGTable input[type='checkbox']:checked,#propertyGGTable select")
			.each(
					function() {
						if ($(this).attr("type") == "checkbox") {
							if (count <= 0) {
								count = $(this).parent().find(
										"input[type='checkbox']:checked").length;
								var keyValue = "";
								$(this).parent().find(
										"input[type='checkbox']:checked").each(
										function() {
											keyValue += $(this).attr('value')
													+ ',';
										});
								keyValue = keyValue.substring(0,
										keyValue.length - 1);
								var keyCode = $(this).parent().find(
										"input[name='keyCode']").val();
								var toGroup = $(this).parent().find(
										"input[name='toGroup']").val();
								var groupType = $(this).parent().find(
										"input[name='groupType']").val();
								var keyTitle = $(this).parent().find(
										"input[name='keyTitle']").val();
								var id = $(this).parent().find(
										"input[name='id']").val();
								var keyCode = $(this).parent().find(
										"input[name='keyCode']").val();
								varieties.push({
									"groupType" : groupType,
									"varietyGroup" : toGroup,
									"keyTitle" : keyTitle,
									"varietyTypeId" : id,
									"varietyTypeCode" : keyCode,
									"varietyTypeValue" : keyValue,
									"varietyTypeValueText" : keyValue
								});
								count--;
							} else {
								count--;
							}
						} else {
							var keyValue = $(this).val();
							if (keyValue != null && jQuery.trim(keyValue) != "") {
								var keyCode = $(this).parent().find(
										"input[name='keyCode']").val();
								var toGroup = $(this).parent().find(
										"input[name='toGroup']").val();
								var groupType = $(this).parent().find(
										"input[name='groupType']").val();
								var keyTitle = $(this).parent().find(
										"input[name='keyTitle']").val();
								var id = $(this).parent().find(
										"input[name='id']").val();
								var keyCode = $(this).parent().find(
										"input[name='keyCode']").val();
								varieties.push({
									"groupType" : groupType,
									"varietyGroup" : toGroup,
									"keyTitle" : keyTitle,
									"varietyTypeId" : id,
									"varietyTypeCode" : keyCode,
									"varietyTypeValue" : keyValue,
									"varietyTypeValueText" : keyValue
								});
							}
						}
					});
	count = 0;
	$(
			"#propertyDOTable input[type='text'],#propertyDOTable input[type='radio']:checked,#propertyDOTable input[type='checkbox']:checked,#propertyDOTable select")
			.each(
					function() {
						if ($(this).attr("type") == "checkbox") {
							if (count <= 0) {
								count = $(this).parent().find(
										"input[type='checkbox']:checked").length;
								var keyValue = "";
								$(this).parent().find(
										"input[type='checkbox']:checked").each(
										function() {
											keyValue += $(this).attr('value')
													+ ',';
										});
								keyValue = keyValue.substring(0,
										keyValue.length - 1);
								var keyCode = $(this).parent().find(
										"input[name='keyCode']").val();
								var toGroup = $(this).parent().find(
										"input[name='toGroup']").val();
								var groupType = $(this).parent().find(
										"input[name='groupType']").val();
								var keyTitle = $(this).parent().find(
										"input[name='keyTitle']").val();
								var id = $(this).parent().find(
										"input[name='id']").val();
								var keyCode = $(this).parent().find(
										"input[name='keyCode']").val();
								varieties.push({
									"groupType" : groupType,
									"varietyGroup" : toGroup,
									"keyTitle" : keyTitle,
									"varietyTypeId" : id,
									"varietyTypeCode" : keyCode,
									"varietyTypeValue" : keyValue,
									"varietyTypeValueText" : keyValue
								});
								count--;
							} else {
								count--;
							}
						} else {
							var keyValue = $(this).val();
							if (keyValue != null && jQuery.trim(keyValue) != "") {
								var keyCode = $(this).parent().find(
										"input[name='keyCode']").val();
								var toGroup = $(this).parent().find(
										"input[name='toGroup']").val();
								var groupType = $(this).parent().find(
										"input[name='groupType']").val();
								var keyTitle = $(this).parent().find(
										"input[name='keyTitle']").val();
								var id = $(this).parent().find(
										"input[name='id']").val();
								var keyCode = $(this).parent().find(
										"input[name='keyCode']").val();
								varieties.push({
									"groupType" : groupType,
									"varietyGroup" : toGroup,
									"keyTitle" : keyTitle,
									"varietyTypeId" : id,
									"varietyTypeCode" : keyCode,
									"varietyTypeValue" : keyValue,
									"varietyTypeValueText" : keyValue
								});
							}
						}
					});
	goods.varieties = varieties;
	var specification = getSpecification(goods);
	goods.specification = specification;
	$("#editDialogForm input[name='goodsJson']").val(JSON.stringify(goods));
	if (type == "mod") {
		$("#editDialogForm").attr("action",
				rootUrl + "/auction/myGoods/modify.htm");
	} else {
		$("#editDialogForm").attr("action",
				rootUrl + "/auction/myGoods/add.htm");
	}
	$("#editDialogForm input[name='isSubmit']").val("1");
	$("#editDialogForm").submit();
}

// 选择节点后的回调函数
function chooseVType(data) {
	if (data == null) {
		return;
	}

	$("#inputDiv").load(
			appServer + "/ajax/goods_dialog_input_" + data.code + ".htm?t="
					+ new Date().getTime(), null, function() {
				$("#editDialogForm input[name='varietyName']").val(data.name);
				$("#editDialogForm input[name='varietyCode']").val(data.code);
				$("#fileImg").hide();
				$("#fileImgs").hide();
			});
}

function getSpecification(goods) {
	var specification = "";
	if (typeof (goods.thickness) != "undefined" && goods.thickness != "") {
		specification += goods.thickness + "*";
	}
	if (typeof (goods.width) != "undefined" && goods.width != "") {
		specification += goods.width + "*";
	}
	if (typeof (goods.length) != "undefined" && goods.length != "") {
		specification += goods.length + "*";
	}
	if (typeof (goods.varieties) != "undefined" && goods.varieties.length > 0) {
		for ( var i = 0; i < goods.varieties.length; i++) {
			if (goods.varieties[i].varietyGroup == "GG"
					&& goods.varieties[i].groupType == "D")
				specification += goods.varieties[i].varietyTypeValueText + "*";
		}
	}
	return specification.substr(0, specification.length - 1);
}

$(function() {

	// 浮点数格式
	$.validator
			.addMethod(
					"floatFormat",
					function(value, element) {
						return this.optional(element)
								|| /^((((\+?[1-9][0-9]{0,7})|0)\.[0-9]{1,3})|((\+?[1-9][0-9]{0,7})|0))$/
										.test(value);
					}, "请正确填写此项");

	// 整数格式
	$.validator.addMethod("intFormat", function(value, element) {
		return this.optional(element)
				|| /^(((\+?[1-9][0-9]{0,11})|0))$/.test(value);
	}, "请正确填写此项");

	// 长宽厚
	$.validator.addMethod("charLength", function(value, element) {
		return this.optional(element) || len(value) <= 12;
	}, "请正确填写此项");

	var goodsJson = $("#goodsJson").val();
	if (jQuery.trim(goodsJson) != "") {
		var goods = []
		if (goodsJson != null && jQuery.trim(goodsJson) != "") {
			goods = JSON.parse(goodsJson);
		}
		$("#inputDiv")
				.load(
						appServer + "/ajax/goods_dialog_input_"
								+ goods.varietyCode + ".htm?t="
								+ new Date().getTime(),
						null,
						function() {
							$("#editDialogForm input[name='varietyName']").val(
									goods.varietyName);
							$("#editDialogForm input[name='varietyCode']").val(
									goods.varietyCode);
							$("#fileImg").hide();
							$("#fileImgs").hide();
							$(
									"#editDialogForm input[name='material'],#editDialogForm select[name='material']")
									.val(goods.material);
							$(
									"#editDialogForm input[name='length'],#editDialogForm select[name='length']")
									.val(goods.length);
							$(
									"#editDialogForm input[name='width'],#editDialogForm select[name='width']")
									.val(goods.width);
							$(
									"#editDialogForm input[name='thickness'],#editDialogForm select[name='thickness']")
									.val(goods.thickness);
							$(
									"#editDialogForm input[name='origin'],#editDialogForm select[name='origin']")
									.val(goods.origin);
							$(
									"#editDialogForm input[name='manufacturer'],#editDialogForm select[name='manufacturer']")
									.val(goods.manufacturer);
							$("#editDialogForm input[name='weight']").val(
									goods.weight);
							$("#editDialogForm input[name='quantity']").val(
									goods.quantity);
							$("#editDialogForm input[name='productionDate']")
									.val(goods.productionDate);
							$(
									"#editDialogForm input[name='standard'],#editDialogForm select[name='standard']")
									.val(goods.qualityStandard);
							$("#editDialogForm input[name='baleNo']").val(
									goods.baleNo);
							$("#editDialogForm textarea[name='comments']").val(
									goods.comments);
							if (typeof (goods.varieties) != "undefined") {
								for ( var i = 0; i < goods.varieties.length; i++) {
									var type = $(
											"#editDialogForm input[name='"
													+ goods.varieties[i].varietyTypeCode
													+ "'],#editDialogForm select[name='"
													+ goods.varieties[i].varietyTypeCode
													+ "']").attr("type");
									if (type == "checkbox" || type == "radio") {
										$(
												"#editDialogForm input[name='"
														+ goods.varieties[i].varietyTypeCode
														+ "'],#editDialogForm select[name='"
														+ goods.varieties[i].varietyTypeCode
														+ "']")
												.each(
														function() {
															if (isIn(
																	$(this)
																			.val(),
																	goods.varieties[i].varietyTypeValue)) {
																$(this)
																		.attr(
																				"checked",
																				"checked");
															}

														});
									} else {

										$(
												"#editDialogForm input[name='"
														+ goods.varieties[i].varietyTypeCode
														+ "'],#editDialogForm select[name='"
														+ goods.varieties[i].varietyTypeCode
														+ "']")
												.val(
														goods.varieties[i].varietyTypeValue);
									}
								}
							}
						});
	} else {
		$("#inputDiv").load(
				appServer
						+ "/common/ajax/seller/goods-dialog-input-blank.htm?t="
						+ new Date().getTime());
	}

});

function isIn(a, b) {
	var barray = b.split(",");
	if (barray.length > 0) {
		for ( var i = 0; i < barray.length; i++) {
			if (a == barray[i]) {
				return true;
			}
		}
	}
	return false;
}
