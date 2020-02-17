$(document).ready(function() {
	// jQuery.metadata.setType("attr", "validate");
	$("#sourceType").change(function(){
		var st = $("#sourceType option:selected").val();
		if(st=='2'){
			$("#effectiveStart").removeClass("required");
			$("#effectiveEnd").removeClass("required");
			$("#sred").remove();
			$("#ered").remove();
			$("#timeS").hide();
			$("#timeE").hide();
		}else if(st=='1'){
			$("#effectiveStart").addClass("required");
			$("#effectiveEnd").addClass("required");
			$("#effectiveStart").after("<span class='red' id='sred'>*</span>");
			$("#effectiveEnd").after("<span class='red' id='ered'>*</span>");
			$("#timeS").show();
			$("#timeE").show();
			//$("#effectiveStart").after("<span class='red error' id='timeS'></span>");
			//$("#effectiveEnd").after("<span class='red error' id='timeE'></span>");
		}else if(st=='3')	{
			$("#effectiveStart").addClass("required");
			$("#effectiveEnd").addClass("required");
			$("#effectiveStart").after("<span class='red' id='sred'>*</span>");
			$("#effectiveEnd").after("<span class='red' id='ered'>*</span>");
			$("#timeS").show();
			$("#timeE").show();
		}else if(st=='4'){
			$("#effectiveStart").removeClass("required");
			$("#effectiveEnd").removeClass("required");
			$("#sred").remove();
			$("#ered").remove();
			$("#timeS").hide();
			$("#timeE").hide();
		}else{
			$("#effectiveStart").removeClass("required");
			$("#effectiveEnd").removeClass("required");
			$("#sred").remove();
			$("#ered").remove();
			$("#timeS").hide();
			$("#timeE").hide();
		}
	});
	$("#sourceType").trigger("change");
	
	/** js验证 */
	jQuery.validator.setDefaults( {
		submitHandler : function(form) {
		//var ds = $("#effectiveStart").val();
		//var de = $("#effectiveEnd").val();
		//if(ds>de){
		//	alert("有效时间结束必须大于或等于有效时间开始");
		//	return;
		//}
			//var st = $("#sourceType option:selected").val();
			//if(st=='1'){
			//	if(ds==''||de==''){
			///		return;
			//	}
			//}
			$("#subBtn").attr("disabled", true).attr("value", "正在提交...");
			form.submit();
		}
	});

	$('#addForm').validate( {
		errorPlacement : function(error, element) {
			element.siblings("span.error").css( {
				"color" : "red"
			}).text(error.text());
		},
		/*
		 * rules : { sellersMobile : {checkMF:"#sellersPhone"}, sellersPhone
		 * :{checkMF:"#sellersMobile"} },
		 */
		success : function(label) {
			label.text("");
		}
	});

	/**
	 * 属性code
	 */
	/*
	 * jQuery.validator.addMethod("checkMF", function(value, element,param) {
	 * var v2 = $(param).val(); if(!value && !v2){ return false; }else{ return
	 * true; } }, "手机和固话不能同时为空");
	 */

});

function getMinStartDate() { 
	var str = $("#currentDay").val();
	if(str!=null){
		return str; //return str.substring(0,10)+" 00:00";
	}else{
		return Hundsun.formatDate(new Date(),"yyyy-MM-dd"); //+" 00:00"; 
	}
} 
