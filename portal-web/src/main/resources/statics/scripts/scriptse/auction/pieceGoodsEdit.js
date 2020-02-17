/**
 * 标段下货品编辑相关js
 * 
 * @author chengy
 */

/**
 * 编辑输入框dialog
 */

$(function() {
	$("#editDialog").dialog({
		autoOpen : false,
		bgiframe : true,
		modal : true,
		width : 820,
		position : [ 400, 150 ],
		buttons : {
			"确认" : function() {
				$("#editDialogForm input[name='isSubmit']").val("0");
				// $("#editDialogForm").submit();
				var fileName = $("#editDialogForm input[name='attachFileName']").val();
				/*if(auctionType =="2"&&fileName==""){
					Hundsun.PopUtil.alert({msg : "上传附件不能为空！",width : 450,timeout : 800,type : 'warn'})
					return;
				}*/
				if(fileName.split("|").length>3){
					Hundsun.PopUtil.alert({msg : "上传附件不能超多3个！",width : 450,timeout : 800,type : 'warn'})
					return;
				}
				// 更新数据
				if (editDialogValidator.form()) {
					updateTrData();
					$(this).dialog("close");
				}
			},
			"取消" : function() {
				$(this).dialog("close");
			}
		}
	});

	$("#editDialog").bind("dialogclose", function(event, ui) {
		$("select").show();
		$("#editDialog").html("");
	});

});

/**
 * 更新列表数据内容
 */
function updateTrData() {
	var trId = $("#editDialog input[name='trId']").val();
	var goodsJson = $("#tr" + trId).children("td").eq(0).html();
	var goods = [];
	if (goodsJson != null && jQuery.trim(goodsJson) != "") {
		goods = JSON.parse(goodsJson);
	}
	var material = $(
			"#editDialog input[name='material'],#editDialog select[name='material']")
			.val();
	goods.material = material;
	var length = $(
			"#editDialog input[name='length'],#editDialog select[name='length']")
			.val();
	goods.length = length;
	var width = $(
			"#editDialog input[name='width'],#editDialog select[name='width']")
			.val();
	goods.width = width;
	var thickness = $(
			"#editDialog input[name='thickness'],#editDialog select[name='thickness']")
			.val();
	goods.thickness = thickness;
	var weight = $(
			"#editDialog input[name='weight'],#editDialog select[name='weight']")
			.val();
	goods.weight = weight;
	var manufacturer = $(
			"#editDialog input[name='manufacturer'],#editDialog select[name='manufacturer']")
			.val();
	goods.manufacturer = manufacturer;
	var origin = $(
			"#editDialog input[name='origin'],#editDialog select[name='origin']")
			.val();
	goods.origin = origin;
	var quantity = $(
			"#editDialog input[name='quantity'],#editDialog select[name='quantity']")
			.val();
	goods.quantity = quantity;
	var keyType = $(
			"#editDialog input[name='keyType'],#editDialog select[name='keyType']")
			.val();
	var unit = $(
	"#editDialog input[name='unit'],#editDialog select[name='unit']")
	.val();
	var selectUnit = $(
	"#editDialog input[name='selectUnit'],#editDialog select[name='selectUnit'],#selectUnit")
	.val();
	var unitPrice  =  $(
	"#editDialogForm input[name='unitPrice'],#editDialogForm select[name='unitPrice']")
	.val();
	if("SELECT"==keyType){
		unit = selectUnit;
		if(unitPrice==''){
			unitPrice = "元/"+unit;
		}
	}
	goods.unit = unit;
	goods.unitPrice = unitPrice;
	var bidType = $("#bidType").val();
	$("#beginPrice").empty();
	$("#bidGrade").empty();
	$("#basePrice").empty();
	if(bidType!=''&&bidType==1){
		$("#beginPrice").append(unitPrice);
		$("#bidGrade").append(unitPrice);
		$("#basePrice").append(unitPrice);
	}else{
		$("#beginPrice").append("元");
		$("#bidGrade").append("元");
		$("#basePrice").append("元");
	}
	$("#unit").val(unit);
	var productionDate = $("#editDialog input[name='productionDate']").val();
	goods.productionDate = productionDate;
	var qualityStandard = $(
			"#editDialog input[name='standard'],#editDialog select[name='standard']")
			.val();
	goods.qualityStandard = qualityStandard;
	var baleNo = $("#editDialog input[name='baleNo']").val();
	goods.baleNo = baleNo;
	var comments = $("#editDialog textarea[name='comments']").val();
	goods.comments = comments;
	var attachFileName = $("#editDialogForm input[name='attachFileName']").val(); //附件名
	goods.attachFileName = attachFileName;
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
								count = count - 1;
							} else {
								count = count - 1;
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
	$("#tr" + trId).children("td").eq(0).html(JSON.stringify(goods));
	updateTr(trId, goods);

	goodsList = [];
	myGoodsIdList = [];
	receiptIdList = [];
	repushData();
}

function updateTr(trId, goods) {
	$("#tr" + trId).children("td").eq(2).html(formatField(goods.material));
	$("#tr" + trId).children("td").eq(3).html(getSpecification(goods));
	$("#tr" + trId).children("td").eq(4).html(formatField(goods.weight)+""+formatField(goods.unit));
	$("#tr" + trId).children("td").eq(5).html(formatField(goods.manufacturer));
	$("#tr" + trId).children("td").eq(6).html(formatField(goods.origin));
}

/**
 * 编辑列表数据
 * 
 * @param trId
 */
function editTr(trId) {
	$("select").hide();
	var goodsJson = $("#tr" + trId).children("td").eq(0).html();
	var goods = []
	if (goodsJson != null && jQuery.trim(goodsJson) != "") {
		goods = JSON.parse(goodsJson);
	}
	$("#editDialog")
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
						if (typeof (goods.attachFileName) != "undefined" && goods.attachFileName!='') {
							var space_Id =  $("#spaceId").val();
							var pieceId =  $("#id").val();
							var goodsId = goods.id;
							var htmlStr = "";
							if (typeof (pieceId) == "undefined") 
								pieceId="";
							if (typeof (goodsId) == "undefined") 
								goodsId="";
							var name = goods.attachFileName.split("|");
							for(var i = 0; i < name.length; i++){
    							htmlStr +="<span class=\"parent1\"><a onclick=\"deleteGoodsAttach(this,'"+space_Id+"','2');\" title=\"删除附件\"><img src=\"/images/delete.gif\"/></a> <a href=\"downloadGoodsAttach.htm?spaceId="+space_Id+"&goodsId="+goodsId+"&fileName="+name[i]+"\">"+name[i]+"</a></br></span>";
							}
    						$("#fileList").html(htmlStr);
							$("#editDialogForm input[name='attachFileName']").val(goods.attachFileName);
						}
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
						$("#editDialog").dialog("open");
					});

}

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