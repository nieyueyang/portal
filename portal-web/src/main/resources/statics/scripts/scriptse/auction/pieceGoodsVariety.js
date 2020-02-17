/**
 * 标段货品的添加js，通过品种选择的添加方式
 * 
 * @author chengy
 */

/**
 * 类型树数据缓存
 */
var prjTypeTree;
/**
 * 货品信息的dialog
 */
$(function() {
	$("#inputDialogVariety")
			.dialog(
					{
						autoOpen : false,
						bgiframe : true,
						modal : true,
						width : 1000,
						buttons : {
							"确认" : function() {
								//$("#editDialogForm").submit();
								var fileName = $("#editDialogForm input[name='attachFileName']").val();
								/*if(auctionType =="2"&&fileName==""){
									Hundsun.PopUtil.alert({msg : "上传附件不能为空！",width : 450,timeout : 800,type : 'warn'})
									return;
								}*/
								if(fileName.split("|").length>3){
									Hundsun.PopUtil.alert({msg : "上传附件不能超多3个！",width : 450,timeout : 800,type : 'warn'})
									return;
								}
								if (editDialogValidator.form()) {
									updateTrs();
									$(this).dialog("close");
								}
							},
							"取消" : function() {
								$(this).dialog("close");
							}
						}
					});
	$("#btn_variety")
			.click(
					function() {
						$("select").hide();
						$("#inputDiv")
								.load(
										appServer
												+ "/common/ajax/seller/goods-dialog-input-blank.htm?t="
												+ new Date().getTime(),
										null,
										function() {
											// 载入完才显示.
											$("#inputDialogVariety").dialog(
													"open");
										});

					});
	$("#inputDialogVariety").bind("dialogopen", function(event, ui) {
		showPrjTypeSel();
	});
	$("#inputDialogVariety").bind("dialogclose", function(event, ui) {
		$("select").show();
		$("#inputDiv").html("");
	});

});

function updateTrs() {
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
	var material = $(
			"#editDialogForm input[name='material'],#editDialogForm select[name='material']")
			.val();
	var length = $(
			"#editDialogForm input[name='length'],#editDialogForm select[name='length']")
			.val();
	var width = $(
			"#editDialogForm input[name='width'],#editDialogForm select[name='width']")
			.val();

	var thickness = $(
			"#editDialogForm input[name='thickness'],#editDialogForm select[name='thickness']")
			.val();

	var weight = $(
			"#editDialogForm input[name='weight'],#editDialogForm select[name='weight']")
			.val();
	var keyType = $(
			"#editDialogForm input[name='keyType'],#editDialogForm select[name='keyType']")
			.val(); 
	var selectUnit = $(
			"#editDialogForm input[name='selectUnit'],#editDialogForm select[name='selectUnit'],#selectUnit")
			.val(); 
	var unit  =  $(
			"#editDialogForm input[name='unit'],#editDialogForm select[name='unit']")
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
	var manufacturer = $(
			"#editDialogForm input[name='manufacturer'],#editDialogForm select[name='manufacturer']")
			.val();

	var origin = $(
			"#editDialogForm input[name='origin'],#editDialogForm select[name='origin']")
			.val();

	var quantity = $(
			"#editDialogForm input[name='quantity'],#editDialogForm select[name='quantity']")
			.val();

	var productionDate = $("#editDialogForm input[name='productionDate']")
			.val();

	var qualityStandard = $(
			"#editDialogForm input[name='standard'],#editDialogForm select[name='standard']")
			.val();

	var baleNo = $("#editDialogForm input[name='baleNo']").val();

	var comments = $("#editDialogForm textarea[name='comments']").val();

	var varietyName = $("#editDialogForm input[name='varietyName']").val();
	var varietyCode = $("#editDialogForm input[name='varietyCode']").val();
	
	var attachFileName = $("#editDialogForm input[name='attachFileName']").val(); //附件名
	var goods = {
		"varietyName" : varietyName,
		"varietyCode" : varietyCode,
		"varieties" : varieties,
		"material" : material,
		"length" : length,
		"width" : width,
		"unit":unit,
		"unitPrice":unitPrice,
		"thickness" : thickness,
		"weight" : weight,
		"manufacturer" : manufacturer,
		"origin" : origin,
		"quantity" : quantity,
		"productionDate" : productionDate,
		"qualityStandard" : qualityStandard,
		"baleNo" : baleNo,
		"comments" : comments,
		"attachFileName" : attachFileName,
		"specification" : ""
	};
	var specification = getSpecification(goods);
	goods.specification = specification;
	
	goodsList.push(goods);
	$("#listTbody").html(getGoodsSelectedTable());
	goodsList = [];
	myGoodsIdList = [];
	receiptIdList = [];
	repushData();
}

var inputText = "<input type=\"text\"  id=\"dicKey\" name=\"dicKey\"  class=\"inpt\" style=\"width:100px;\" /> <button type=\"button\" onclick=\"queryTreeByShortName();\" class=\"button-4\">搜索</button>";
/**
 * 显示类型树内容
 */
function showPrjTypeSel() {
	prjTypeTree = reloadPrjTypeTree('prjTypeTreeUL', null, null, function(
			event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
		$("#inputDialogVariety #prjTypeTreeDiv").html(
				'<span style="color:red;">加载品种信息失败!请稍后再试!</span>');
	},null,'');
	$('#prjTypeTreeUL').html(inputText);
}

/**
 * 加载类型树
 * 
 * @param boxID
 *            树容器的ID
 * @param {}
 *            beforeAsyncFn 在请求数据前的回调
 * @param {}
 *            asyncSuccessFn 加载数据成功后的回调
 * @param {}
 *            asyncErrorFn 请求出错时的回调
 * @param curValue
 *            当前值,方便在树中高亮当前值
 */
function reloadPrjTypeTree(boxID, beforeAsyncFn, asyncSuccessFn, asyncErrorFn,
		curValue,shortName) {
	var treeBox = $("#inputDialogVariety #" + boxID);
	var curLi;// 根据curValue设置当前值样式
	if (!treeBox)
		return;
	if (curLi)
		curLi.removeClass("focus");
	// 选择节点后的回调函数
	function zTreeOnClick(event, treeId, treeNode) {
		$("#inputDiv").load(
				appServer + "/ajax/goods_dialog_input_" + treeNode.code
						+ ".htm?t=" + new Date().getTime(),
				null,
				function() {
					if(treeNode.code.length==2){
						return false;
					};
					$("#editDialogForm input[name='varietyName']").val(
							treeNode.name);
					$("#editDialogForm input[name='varietyCode']").val(
							treeNode.code);
				});
	}
	;
	var setting = {
		expandSpeed : "",
		async : true,
		asyncUrl : "/ajax/goods_variety/loadForTreeMulPar.htm?t="
				+ new Date().getTime()
				+ "&parCode="
				+ $(
						"select[name='pieceVarietyCode'],input[name='pieceVarietyCode']")
						.val()+"&shortName="+shortName, // 获取节点数据的URL地址
		asyncParam : [ "name", "code" ], // 获取节点数据时，必须的数据名称，例如：id、name
		showLine : true,
		isSimpleData : true,
		treeNodeKey : "code",
		treeNodeParentKey : "parentcodeShort",
		callback : {
			asyncSuccess : asyncSuccessFn,
			asyncError : asyncErrorFn,
			click : zTreeOnClick
		}
	};
	if (curLi)
		curLi.addClass("focus");
	/**
	 * 类型树JSON数据
	 */
	var prjTypeTreeNodes = [];
	var prjTypeTree = treeBox.zTree(setting, prjTypeTreeNodes);
	return prjTypeTree;
}



//搜索品种
function queryTreeByShortName() {     
	var shortName =  $("#dicKey").val();
//	$('#prjTypeTreeUL').html(inputText);
	prjTypeTree = reloadPrjTypeTree('prjTypeTreeUL', null, function(event,
			treeId, treeNode, msg) {
		if(shortName !="")
			prjTypeTree.expandAll(true); //全部展开
	}, function(
			event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
		$("#inputDialogVariety #prjTypeTreeDiv").html(
				'<span style="color:red;">加载品种信息失败!请稍后再试!</span>');
	},null,encodeURI(encodeURI(shortName)));
	$('#prjTypeTreeUL').html(inputText);
	$('input[name=dicKey]').val(shortName);
	}