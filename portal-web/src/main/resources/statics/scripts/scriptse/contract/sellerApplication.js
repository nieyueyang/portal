/*
 * 提交申请
 *
function subApplication() {
	var goodsPickedStr = ""; // 合同货品的提货申请重量字符串，格式：合同货品id|申请重量,合同货品id|申请重量....
	var pickWeight = 0;
	var checkFlag = true;
	$("input[name='pickWeight']").each(function() {
		var v = this.value;
		if (!isEmpty(v)) {
			var reg = eval("/^[\\-+]?\\d+\\.?\\d{0,3}[0]*$/");// N位有效小数
			if (reg.test(v)) {
				if (parseFloat(v) < 0) {
					Hundsun.PopUtil.alert({
						msg : '本次申请提货重量不能为负数;',
						width : 450,
						timeout : 800,
						type : 'warn'
					})
					checkFlag = false;
					return;
				}
				var supplusW = $(this).parent().next().text();
				if (parseFloat(v) > parseFloat(supplusW)) {
					Hundsun.PopUtil.alert({
						msg : '本次申请提货重量不能大于剩余重量;',
						width : 450,
						timeout : 800,
						type : 'warn'
					})
					checkFlag = false;
					return;
				}
			} else {
				Hundsun.PopUtil.alert({
					msg : '本次申请提货重量输入错误;请输入正确的数字，且小数位数不超过3位;',
					width : 450,
					timeout : 800,
					type : 'warn'
				})
				checkFlag = false;
				return;
			}
			pickWeight += parseFloat(v);
			goodsPickedStr += this.id + "|" + v + ",";
		}
	});
	if (checkFlag == false) {
		return;
	} // 参数输入错误
	if (pickWeight == 0) {
		Hundsun.PopUtil.alert({
			msg : "请填写提货重量",
			width : 450,
			timeout : 800,
			type : 'warn'
		});
		return;
	}
	Boxy.confirm("申请提货" + pickWeight + "吨，<br />确认执行改操作吗？", function() {
		jQuery.post(appServer + '/contract/seller/applicationDo.htm', {
			"driver" : $("#driver").val(),
			"carNo" : $("#carNo").val(),
			"goodsPickedStr" : goodsPickedStr,
			"contractNo" : $("#contractNo").val(),
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
 */
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
		//$(n).attr('checked', checked);
	});
}

/*判断是否可提交或可回传
function isAccess(items, statuses){
	var access = false;
	alert(1);
	$.each(items ,function(){
		alert(1);
		var status = $(this).attr('dataStatus');
		alert(status);
		//$.each(statuses ,function(){
			alert(this);
			//if(status != $(this)){

			//}
		//}
	});
	return access;
}*/
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
 * 批量提交
 * added by zhulj 2014.05.14
 */
function batch_submitApply(){
	var items = $(':checkbox[name=check_item]:checked');
	if(!items.length){
		Hundsun.PopUtil.alert({msg : '请选择需提交的记录！',width : 450,timeout : 800,type : 'warn'});
		return false;
	}
	var flag = true;
	$.each(items ,function(){
		var isSubmit = $(this).attr('isSubmit');
		if(isSubmit == "false"){
			flag = false;
			return false;//跳出each循环
		}
	});
	if(flag){//可以提交
		var ids = getSelectedValuesString('check_item');
		if(!ids){
			Hundsun.PopUtil.alert({msg : '系统异常，请稍后再试！',width : 450,timeout : 800,type : 'error'});
			return false;
		}
		Boxy.confirm("确定要批量提交吗", function() {
			jQuery.post(appServer + '/contract/seller/batch_submitApply.htm', {
				"ids" : ids
			}, function(v) {
				if (v.result == 'true') {
					Hundsun.PopUtil.alert({msg : '操作成功！',autohide : true,width : 350,timeout : 800,
						callback : function() {
							$(".inpt").val("");
							$("#searchForm").submit();
						}
					});
				} else {
					Hundsun.PopUtil.alert({msg : v.msg,width : 450,timeout : 800,type : 'warn'})
				}
			}, 'json');
		});
	}else{
		Hundsun.PopUtil.alert({msg : '勾选的提货申请记录中有不能进行提交操作的记录<br/>请重新选择！',width : 450,timeout : 800,type : 'error'});
	}
}

/**
 * 批量回传
 * added by zhulj 2014.05.14
 */
function batch_toErp(){
	var items = $(':checkbox[name=check_item]:checked');
	if(!items.length){
		Hundsun.PopUtil.alert({msg : '请选择需回传的记录！',width : 450,timeout : 800,type : 'warn'});
		return false;
	}
	var flag = true;
	$.each(items ,function(){
		var isToErp = $(this).attr('isToErp');
		if(isToErp == "false"){
			flag = false;
			return false;//跳出each循环
		}
	});
	if(flag){//可以回传
		var ids = getSelectedValuesString('check_item');
		if(!ids){
			Hundsun.PopUtil.alert({msg : '系统异常，请稍后再试！',width : 450,timeout : 800,type : 'error'});
			return false;
		}
		Boxy.confirm("确定要批量回传ERP系统吗", function() {
			jQuery.post(appServer + '/contract/seller/batch_toERP.htm', {
				"ids" : ids
			}, function(v) {
				if (v.result == 'true') {
					Hundsun.PopUtil.alert({msg : '操作成功！',autohide : true,width : 350,timeout : 800,
						callback : function() {
							$(".inpt").val("");
							$("#searchForm").submit();
						}
					});
				} else {
					Hundsun.PopUtil.alert({msg : v.msg,width : 450,timeout : 800,type : 'warn'})
				}
			}, 'json');
		});
	}else{
		Hundsun.PopUtil.alert({msg : '勾选的提货申请记录中有不能进行回传ERP操作的记录<br/>请重新选择！',width : 450,timeout : 800,type : 'error'});
	}
}

/**
 * 撤回
 *
 * @param id
 */
function toBack(id) {
	Boxy.confirm("确定要撤回吗", function() {
		jQuery.post(appServer + '/contract/seller/toBack.htm', {
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
 * 回传ERP
 *
 * @param id
 */
function toERP(id) {
	Boxy.confirm("确定要把提货信息回传ERP系统吗？", function() {
		jQuery.post(appServer + '/contract/seller/toERP.htm', {
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

function saveApply() {
	var applyWeightSum = 0.0;
	var applyItemCount = 0;
	for ( var i = 0; i < applyRecordList.length; i++) {
		var remainWeight = parseFloat($("#supplusWeight" + i).val());
		var applyWeight = 0.0;
		if (applyRecordList[i].length > 0) {
			for ( var j = 0; j < applyRecordList[i].length; j++) {
				//applyWeight += parseFloat(applyRecordList[i][j].applyWeight);
				applyWeight=accAdd(applyWeight, parseFloat(applyRecordList[i][j].applyWeight));
				applyWeightSum += parseFloat(applyRecordList[i][j].applyWeight);
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
	/*
	if (applyItemCount > 1) {
		Hundsun.PopUtil.alert({
			msg : "最多添加一条明细",
			width : 450,
			timeout : 800,
			type : 'warn'
		})
		return;
	}
	*/
	$('#searchForm').attr('action', appServer+'/contract/seller/saveApply.htm');
	$('#searchForm').submit();

}


function saveApply4Edit() {
	var applyWeightSum = 0.0;
	var applyItemCount = 0;
	for ( var i = 0; i < applyRecordList.length; i++) {
		var remainWeight = parseFloat($("#supplusWeight" + i).val());
		var applyWeight = 0.0;
		if (applyRecordList[i].length > 0) {
			for ( var j = 0; j < applyRecordList[i].length; j++) {
				applyWeight=accAdd(applyWeight,parseFloat(applyRecordList[i][j].applyWeight));
				//applyWeight += parseFloat(applyRecordList[i][j].applyWeight);
				applyWeightSum += parseFloat(applyRecordList[i][j].applyWeight);
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
	/*
	if (applyItemCount > 1) {
		Hundsun.PopUtil.alert({
			msg : "最多添加一条明细",
			width : 450,
			timeout : 800,
			type : 'warn'
		})
		return;
	}
	*/
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




/**
 * 承钢卷板回传ERP
 *
 * @param id
 */
function chenggangErp(id,applyType) {
	Boxy.confirm("确定要把提货信息回传ERP系统吗？", function() {
		jQuery.post(appServer + '/contract/seller/chenggangErp.htm', {
			"id" : id,
			"applyType" :applyType
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
//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(arg1, arg2) {
	var t1 = 0, t2 = 0, r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length
	} catch (e) {
	}
	try {
		t2 = arg2.toString().split(".")[1].length
	} catch (e) {
	}
	with (Math) {
		r1 = Number(arg1.toString().replace(".", ""))
		r2 = Number(arg2.toString().replace(".", ""))
		return (r1 / r2) * pow(10, t2 - t1);
	}
}

//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1, arg2) {
	var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {
	}
	try {
		m += s2.split(".")[1].length
	} catch (e) {
	}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
			/ Math.pow(10, m)
}

//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2));

	return accDiv((accMul(arg1, m) + accMul(arg2, m)), m);
}

//减法函数
function accSub(arg1, arg2) {
	return accAdd(arg1, -arg2);
}