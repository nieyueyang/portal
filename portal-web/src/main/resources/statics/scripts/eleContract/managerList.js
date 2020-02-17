/**
 * 生成电子合同
 * 
 * @param contractNo
 *            合同号
 */
var templateType;
var contractNo;
var selected = new Array();
function select_all() {
	var check = $('#selectAll').attr("checked");
	if (check) {
		$("[name='contractNos']").attr("checked", 'true');
	} else if (!check) {
		$("[name='contractNos']").removeAttr("checked");
	}
}
function generate(cNo) {

	var iWidth = 500; // 弹出窗口的宽度;
	var iHeight = 220; // 弹出窗口的高度;
	var iTop = (window.screen.availHeight - 30 - iHeight) / 2; // 获得窗口的垂直位置;
	var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; // 获得窗口的水平位置;
	var companyId = $("#companyId").val();
	window
			.open(
					"selectTemplateType.htm?companyId=" + companyId,
					"",
					"height="
							+ iHeight
							+ ",width="
							+ iWidth
							+ ",top="
							+ iTop
							+ ",left="
							+ iLeft
							+ ",toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no");
	contractNo = cNo;
}

function batchGenerate() {
	var all = $("input[name='contractNos']:checked");
	if (all.length <= 0) {
		art.dialog({
			content : '至少选中一项',
			icon : 'warning',
			yesFn : function() {
			}
		})
		return;
	} else {

		for ( var i = 0; i < all.length; i++) {
			selected.push($(all[i]).val());
		}
		var iWidth = 500; // 弹出窗口的宽度;
		var iHeight = 220; // 弹出窗口的高度;
		var iTop = (window.screen.availHeight - 30 - iHeight) / 2; // 获得窗口的垂直位置;
		var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; // 获得窗口的水平位置;
		var companyId = $("#companyId").val();
		window
				.open(
						"selectTemplateType.htm?companyId=" + companyId,
						"",
						"height="
								+ iHeight
								+ ",width="
								+ iWidth
								+ ",top="
								+ iTop
								+ ",left="
								+ iLeft
								+ ",toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no");
	}

}
// 选择器返回方法
function returnMethod(param) {
	loadPopup('loading');
	centerPopup();
	if (null != param) {
		templateType = param;
	} else {
		art.dialog({
			content : '未选择合同模版,请选择'
		})
	}
	if (null != contractNo && "" != contractNo && null != templateType
			&& "" != templateType) {
		disablePopup();
		$("#dialogMsg").text("合同生成中,请等待.....");
		jQuery.post("ajax/generate.htm", {
			"contractNo" : contractNo,
			"templateType" : templateType
		}, function(data) {
			$("#dialogMsg").text("页面加载中,请等待.....");
			disablePopup();
			if (data.indexOf("成功") > -1) {
				art.dialog({
					title : '电子合同生成操作提示',
					content : data,
					icon : 'succeed',
					modal : true,
					yesFn : function() {
						loadPopup('loading');
						centerPopup();
						$('#searchForm').submit();
					}
				});
			} else {
				art.dialog({
					title : '电子合同生成操作提示',
					content : data,
					icon : 'error',
					modal : true,
					yesFn : function() {
						loadPopup('loading');
						centerPopup();
						$('#searchForm').submit();
					}
				});
			}

		});
	}

	if (null != templateType && "" != templateType) {
		if (selected.length > 0) {
			console.log(selected.toString());
			console.log("----------------------------");
			disablePopup();
			$("#dialogMsg").text("合同生成中,请等待.....");
			jQuery.post("ajax/generate.htm", {
				"contractNos" : selected.toString(),
				"templateType" : templateType
			}, function(data) {
				$("#dialogMsg").text("页面加载中,请等待.....");
				disablePopup();
				if (data.indexOf("成功") > -1) {
					art.dialog({
						title : '电子合同生成操作提示',
						content : data,
						icon : 'succeed',
						modal : true,
						yesFn : function() {
							loadPopup('loading');
							centerPopup();
							$('#searchForm').submit();
						}
					});
				} else {
					art.dialog({
						title : '电子合同生成操作提示',
						content : data,
						icon : 'error',
						modal : true,
						yesFn : function() {
							loadPopup('loading');
							centerPopup();
							$('#searchForm').submit();
						}
					});
				}

			});

		}
	}

}

/**
 * 删除电子合同
 * 
 * @param contractNo
 *            合同号
 */
function deletes(contractNo) {
	art.dialog.confirm('确认删除电子合同【' + contractNo + '】？', function() {
		jQuery.post("ajax/delete.htm", {
			"contractNo" : contractNo
		}, function(data) {
			if (data) {
				art.dialog({
					title : '电子合同删除操作提示',
					content : '电子合同【' + contractNo + '】删除成功',
					icon : 'succeed',
					modal : true,
					yesFn : function() {
						loadPopup('loading');
						centerPopup();
						$('#searchForm').submit();
					}
				});
			} else {
				art.dialog({
					title : '电子合同删除操作提示',
					content : '电子合同【' + contractNo + '】删除失败',
					icon : 'error',
					modal : true,
					yesFn : function() {
						loadPopup('loading');
						centerPopup();
						$('#searchForm').submit();
					}
				});
			}

		});
	}, function() {
	});
}
/**
 * 下载电子合同
 * 
 * @param contractNo
 *            合同号
 */
function downloadFile(contractNo) {
	art.dialog.confirm('确认下载电子合同【' + contractNo + '】？', function() {
		window.location.href = "download.htm?fileName=" + contractNo;
	}, function() {
	});
}
/**
 * 预览电子合同
 * 
 * @param contractNo
 */

function preview(contractNo) {
	window.open("preview.htm?id=-1&contractNo=" + contractNo);
}

$(function() {
	var companyId = $("#companyId").val();
	if(companyId!=null && companyId!=""){
		initOrderType(companyId);
		getOrderCreateBy(companyId);
	}
	$("#companyId").change(function (){
		var companyId = $("#companyId").val();
		$("#orderTypeDescribe").attr("value","");
		$("#orderCreateBy").attr("value","");
		initOrderType(companyId)
		getOrderCreateBy(companyId);
	});
})
/**
 * 获取订单类型
 * @param companyId
 */
function initOrderType(companyId){
	
	jQuery.ajax({
        type: "POST",
        url: "ajax/selectOrderType.htm",
		data:"companyId="+companyId,
        success: function(data){
        		var orderTypeList=new Array();//订单类型
    			jQuery.each(data,function(index,value){
    				orderTypeList.push({title:value+" "});
    			})
    			$("#orderTypeDescribe").bigAutocomplete({width:200,data:orderTypeList,callback:function(data){}});
    		}
     	});
    }
	
	
	/*jQuery.post("ajax/selectOrderType.htm", {
		"companyId" : companyId
	}, function(data) {
		
		var orderTypeList=new Array();//订单类型
		jQuery.each(data,function(index,value) {
			orderTypeList.push({title:value+" "});
		})
		$("#orderTypeDescribe").bigAutocomplete({width:200,data:orderTypeList,callback:function(data){}});
	});
}*/

function getOrderCreateBy(companyId){
	
	
	jQuery.ajax({
        type: "POST",
        url: "ajax/getCreateBy.htm",
		data:"companyId="+companyId,
        success: function(data){
        	var createList=new Array();//订单类型
    			jQuery.each(data,function(index,value){
    				createList.push({title:value+" "});
    			})
    			$("#orderCreateBy").bigAutocomplete({width:105,data:createList,callback:function(data){}});
    		}
     	});
	
	/*jQuery.post("ajax/getCreateBy.htm", {
		"companyId" : companyId
	}, function(data) {
		var createList=new Array();//订单类型
		jQuery.each(data,function(index,value) {
			createList.push({title:value+" "});
		})
		$("#orderCreateBy").bigAutocomplete({width:105,data:createList,callback:function(data){}});
	});*/
}