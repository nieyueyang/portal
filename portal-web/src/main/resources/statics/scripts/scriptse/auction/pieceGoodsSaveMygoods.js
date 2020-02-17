/**
 * 标段下货品存为我的货品功能js
 * 
 * @author chengy
 */

/**
 * 编辑输入框dialog
 */
$(function() {
	$("#saveMygoodsDialog").dialog({
		autoOpen : false,
		bgiframe : true,
		modal : true,
		width : 820,
		buttons : {
			"确认" : function() {
				// $("#editDialogForm").submit();
				if (editDialogValidator.form()) {
					saveMygoodsData();
					$(this).dialog("close");
				}
			},
			"取消" : function() {
				$(this).dialog("close");
			}
		}
	});

	$("#saveMygoodsDialog").bind("dialogclose", function(event, ui) {
		$("select").show();
		$("#saveMygoodsDialog").html("");
	});
});

/**
 * 保存为我的货品
 */
function saveMygoodsData() {
	var trId = $("#editDialogForm input[name='trId']").val();
	var goodsJson = $("#tr" + trId).children("td").eq(0).html();
	var goods = [];
	if (goodsJson != null && jQuery.trim(goodsJson) != "") {
		goods = JSON.parse(goodsJson);
	}
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
	$.post(appServer + "/ajax/saveMyGoods.htm", {
		"goodsJson" : JSON.stringify(goods)
	}, function(result, status) {
		if (result == "success") {
			alert("保存成功！");
		} else {
			alert("保存失败！");
		}
	});

}

/**
 * 读取列表数据至编辑表单
 * 
 * @param trId
 */
function saveMygoods(trId) {
	$("select").hide();
	var goodsJson = $("#tr" + trId).children("td").eq(0).html();
	var goods = []
	if (goodsJson != null && jQuery.trim(goodsJson) != "") {
		goods = JSON.parse(goodsJson);
	}
	$("#saveMygoodsDialog")
			.load(
					appServer + "/ajax/goods_dialog_input_" + goods.varietyCode
							+ ".htm?t=" + new Date().getTime(),
					null,
					function() {
						$("#editDialogForm input[name='varietyName']").val(
								goods.varietyName);
						$("#editDialogForm input[name='varietyCode']").val(
								goods.varietyCode);
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
						$("#editDialogForm input[name='productionDate']").val(
								goods.productionDate);
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
																$(this).val(),
																goods.varieties[i].varietyTypeValue)) {
															$(this).attr(
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
						$("#editDialogForm input[name='trId']").val(trId);
						// 载入完才显示.
						$("#saveMygoodsDialog").dialog("open");
					});
}