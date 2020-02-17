/**
 * 展示或者收藏申请明细信息
 * 
 * @param element
 */
function showApplyDetail(element) {
	var detailTr = $(element).parent().parent().next();
	var imgSrc = $(element).attr("src");
	if (imgSrc.endWith("plus_noLine.gif")) {
		$(element).attr("src",
				appServer + "/scripts/zTree/zTreeStyle/img/minus_noLine.gif");
		$(detailTr).show();
	} else {
		$(detailTr).hide();
		$(element).attr("src",
				appServer + "/scripts/zTree/zTreeStyle/img/plus_noLine.gif");
	}
}

/**
 * 全选
 * added by zhulj 2014.05.14
 */
function check_all(){
	var checked = $("#check_all").attr("checked");
	var items = $("input[name=check_item][type=checkbox]");
	$.each(items ,function(){
		this.checked = checked;
	});
}

function getSelectedValuesString(name){
	var chkItems = $('input[name='+ name +'][type=checkbox]');
	var valuesString = '';
	$.each(chkItems,function(){
		if(this.checked){
			valuesString += ","  + this.value;
		}
	});
	if(valuesString.length > 0){
		valuesString = valuesString.substring(1);
	}
	return valuesString;
}



/**
 * 卖家提交申请
 * 
 * @param id
 */
function submitApply(id) {
	Boxy.confirm("确定要提交吗", function() {
		jQuery.post(appServer + '/contract/seller/submitApply.htm', {
			"id" : id
		}, function(v) {
			if (v.result == 'true') {
				Hundsun.PopUtil.alert({
					msg : '操作成功！',
					autohide : true,
					width : 350,
					timeout : 800,
					callback : function() {
						$(".inpt").val("");
						$("#searchForm").submit();
						;
					}
				})

			} else {
				Hundsun.PopUtil.alert({
					msg : v.msg,
					width : 450,
					timeout : 800,
					type : 'warn'
				})
			}
		}, 'json');
	})
}

/**
 * 买家提交申请
 * 
 * @param id
 */
function buyerSubmitApply(id) {
	Boxy.confirm("确定要提交吗", function() {
		jQuery.post(appServer + '/contract/buyer/buyerSubmitApply.htm', {
			"id" : id
		}, function(v) {
			if (v.result == 'true') {
				Hundsun.PopUtil.alert({
					msg : '操作成功！',
					autohide : true,
					width : 350,
					timeout : 800,
					callback : function() {
						$(".inpt").val("");
						$("#searchForm").submit();
						;
					}
				})
				
			} else {
				Hundsun.PopUtil.alert({
					msg : v.msg,
					width : 450,
					timeout : 800,
					type : 'warn'
				})
			}
		}, 'json');
	})
}

//====================审核
$(function(){ 
	$("#checkDialog").dialog({
		autoOpen : false,
		bgiframe : true,
		modal : true,
		position : [ 350, 200 ],
		width : 450,
		height:150,
		title : "审核",
		buttons : {
			"确认" : function() {
				saveCheckResult();
			},
			"取消" : function() {
				$(this).dialog("close");
			}
		}
	});
});

/**
 * 保存审核结果
 * @param id
 */
function saveCheckResult() {
	var checkStatus = $("#checkStatus").val();
	jQuery.post(appServer + '/contract/seller/saveCheckResult.htm', {
		"id" : applyId,"checkStatus":checkStatus
	}, function(v) {
		if (v.result == 'true') {
			Hundsun.PopUtil.alert({
				msg : '操作成功！',
				autohide : true,
				width : 350,
				timeout : 800,
				callback : function() {
					$(".inpt").val("");
					$("#searchForm").submit();
					;
				}
			})

		} else {
			Hundsun.PopUtil.alert({
				msg : v.msg,
				width : 450,
				timeout : 800,
				type : 'warn'
			})
		}
	}, 'json');
}

var applyId = 0;
/**
 * 审核
 * 
 * @param id
 */
function toCheckApply(id) {
	applyId = id;
	$("#checkDialog").dialog("open");
}

function getNotice(id,erpsystem) {
	window.open(appServer +"/contract/seller/"+erpsystem+"_applyNotice.htm?id=" + id);
}

String.prototype.endWith = function(str) {
	var reg = new RegExp(str + "$");
	return reg.test(this);
}

function isEmpty(v) {
	if (undefined == v || "undefined" == v) {
		return true;
	}
	if (/^\s*$/g.test(v)) {
		return true;
	} else {
		return false;
	}
}




function saveApply4Edit() {
	var applyWeightSum = 0.0;
	var applyItemCount = 0;
	for ( var i = 0; i < applyRecordList.length; i++) {
		var remainWeight = parseFloat($("#supplusWeight" + i).val());
		var applyWeight = 0.0;
		if (applyRecordList[i].length > 0) {
			for ( var j = 0; j < applyRecordList[i].length; j++) {
				applyWeight = accAdd(applyWeight,parseFloat(applyRecordList[i][j].applyWeight));
				applyWeightSum = accAdd(applyWeightSum,parseFloat(applyRecordList[i][j].applyWeight));
				applyItemCount += 1;
			}
		}
		if (applyWeight > remainWeight) {
			Hundsun.PopUtil.alert({
				msg : "提货重量不能大于可申请重量",
				width : 450,
				timeout : 800,
				type : 'warn'
			})
			return;
		}
	}
	if (applyWeightSum == 0.0) {
		Hundsun.PopUtil.alert({
			msg : "请添加一条明细后保存",
			width : 450,
			timeout : 800,
			type : 'warn'
		})
		return;
	}
	if (applyItemCount > 1) {
		Hundsun.PopUtil.alert({
			msg : "最多添加一条明细",
			width : 450,
			timeout : 800,
			type : 'warn'
		})
		return;
	}
	$('#searchForm').attr('action', 'editApply.htm');
	$('#searchForm').submit();

}

/**
 * 编辑申请
 * 
 * @param id
 */
function editApply(id) {
	location.href = appServer + '/contract/seller/editApply.htm?id=' + id;
}

/**
 * 删除
 * 
 * @param id
 */
function deleteApply(id) {
	Boxy.confirm("确定要删除吗", function() {
		jQuery.post(appServer + '/contract/seller/deleteApply.htm', {
			"id" : id
		}, function(v) {
			if (v.result == 'true') {
				Hundsun.PopUtil.alert({
					msg : '操作成功！',
					autohide : true,
					width : 350,
					timeout : 800,
					callback : function() {
						$(".inpt").val("");
						$("#searchForm").submit();
						;
					}
				})

			} else {
				Hundsun.PopUtil.alert({
					msg : v.msg,
					width : 450,
					timeout : 800,
					type : 'warn'
				})
			}
		}, 'json');
	})
}