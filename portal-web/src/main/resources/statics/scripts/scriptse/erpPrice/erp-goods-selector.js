/**
* @include "../includes.js"
*/


/**
 * ERP物料选择器
 * @type 
 */
$(function() {
   // 显示回应成员
	$("#erpGoodsDialog").dialog({
		autoOpen : false,
		bgiframe : true,
		modal : true,
		position : [300, 100],
		width : 750,
		minHeight : 450,
		title : "查询ERP系统标识",
		buttons : {
			"取消" : function() {
				$(this).dialog("close");
			}
		}
	});
	$("#erpGoodsDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
	
	$("#erpGoodsDialog").bind("dialogopen", function(event, ui) {
		$("#erpGoodsDialog").load(appServer
				        + "/erpgoodprice/ajax/erp_good_list.htm");
	});	
	
	$("#btnOpenWin").click(showErpGoodsDialog);
})

function showErpGoodsDialog(){
	$("#erpGoodsDialog").dialog("open");
}

function searchGoods(){
	$("#erpGoodsDialog").load(
			appServer
				     + "/erpgoodprice/ajax/erp_good_list.htm",
			$("#searchGoodForm").serializeArray());
}
	
