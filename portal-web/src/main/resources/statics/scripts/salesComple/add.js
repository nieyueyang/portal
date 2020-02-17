

// 弹窗选择器
function selectDialog(url) {
	window.open(url,'newwindow','height=600, width=440, top=60,left=500, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no').focus();
}

// 弹窗选择后返回
function returnMethod(value) {
	var oldValue = $("#contractUnit").val();
	var newValue = "";
	if (null != oldValue && "" != oldValue) {
		newValue = oldValue + "," + value;
	} else {
		newValue = value;
	}
	$("#contractUnit").val(newValue);
}
// 保存信息
function save() {
	if (jQuery("#saveForm").valid()) {
		$("#saveForm").attr("action",
				"#getAppServer()/crmSalesCompletion/add.htm")
		$("#saveForm").submit();
	} else {
	}
}
// 检索
function retrieval() {
	var endUserName = $("#endUserName").val().replace(/^\s+|\s+$/g,"");
	var name =  encodeURIComponent(endUserName);
	if(null!=name&&""!=name){
		jQuery.ajax({
	        type: "post",
	        url: "ajax/retrieval.htm",
	        data: "endUserName=" + name,
	        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        success: function (result) {
	        	if(result.status=="0"){
	        		$("#accountTypesCode").attr("value",result.accountTypesCode);
		        	$("#accountManager").attr("value",result.accountManager);
		        	$("#contractUnit").attr("value",result.contractUnit);
		        	$("#cooperateSubsidiaryId").attr("value",result.cooperateSubsidiaryId);
		        	$("#productCategoriesCode").attr("value",result.productCategoriesCode);
		        	$("#cooperateState").attr("value",result.cooperateState);
		        	$("#monthAgreementAmount").attr("value",result.monthAgreementAmount);
		        	$("#monthGoalAmount").attr("value",result.monthGoalAmount);
		        	$("#productionLine").attr("value",result.productionLine);
		        	selectCx({"value":result.cooperateSubsidiaryId});
	        	}else{
	        		alert("未发现该终端用户相关记录");
	        	}
	        	
	        }
	    });
	}else{
		alert("请选择终端用户后，再使用检索");
	}
}

jQuery(function() {
	jQuery.validator.addMethod("lrunlv", function(value, element) {         
	    return this.optional(element) || /^\d+(\.\d{1,3})?$/.test(value);         
	}, "小数位不能超过三位"); 
})


function back(){
	window.location.href="list.htm";
}