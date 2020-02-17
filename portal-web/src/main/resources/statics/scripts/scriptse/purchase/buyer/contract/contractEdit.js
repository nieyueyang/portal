function submitOnly() {
	$("#contractForm").submit();
}

function accMul(arg1,arg2) {   
    var m=0,s1=arg1.toString(),s2=arg2.toString();   
    try{m+=s1.split(".")[1].length}catch(e){}   
    try{m+=s2.split(".")[1].length}catch(e){}   
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}

function calcBargainPrice(){
	var bargainPriceYuan = new Number($("#contractForm input[name='bargainPriceShow']").val());
	if(bargainPriceYuan == '' || bargainPriceYuan==null){
		$("#contractForm input[name='bargainPrice']").val('');
	}else{
		var bargainPriceCent = accMul(bargainPriceYuan,100);
		$("#contractForm input[name='bargainPrice']").val(bargainPriceCent.toFixed(0));
	}
	if($("#contractForm input[name='bargainPriceShow']").val()=='0'){
		$("#contractForm input[name='bargainPrice']").val('0');
	}
}

function calcTotalPrice(){
	var bargainPriceYuan = new Number($("#contractForm input[name='bargainPriceShow']").val());
	var weight = new Number($("#contractForm input[name='bargainNumber']").val());
	if(bargainPriceYuan != null && bargainPriceYuan != '' && weight != null && weight != ''){
		var totalPriceYuan = accMul(bargainPriceYuan,weight);
		var totalPriceCent = accMul(totalPriceYuan,100);
		$("#contractForm input[name='totalPriceShow']").val(totalPriceYuan.toFixed(2));
		$("#contractForm input[name='totalPrice']").val(totalPriceCent.toFixed(0));
	}
}

$(function() {
	var weight = new Number($("#contractForm input[name='bargainNumber']").val());
	$("#contractForm input[name='bargainNumber']").val(weight)
	$("#contractForm").validate({
		submitHandler : function(form) {	
			calcBargainPrice();
			calcTotalPrice();
			form.submit();
		},
		rules : {
			bargainNumber : {
				required : true,
				weight : true
			},
			bargainPriceShow : {
				required : true,
				goodsPrice : true
			},
			totalPriceShow : {
				required : true,
				goodsPrice : true
			},
			userMobile : {
				required : true,
				mobile	: true
			},
			stationInfo : {
				required : false,
				maxlength : 150
			}
		},
		messages : {
			userMobile : {
				required : "该项不能为空"
			},
			comments : {
				maxlength : "最多300个字符"
			}
		},
		errorPlacement : function(error, element) {
			(element.parent().find("span.error"))
					.replaceWith(error);
		},
		errorElement : "span"
	});
})