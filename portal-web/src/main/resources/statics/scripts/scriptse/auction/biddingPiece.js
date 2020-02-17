var bidGradeStatus = function() {
	if (auctionMode == "2") {
		$(".div_bidGrade").hide();
		$("input[name='bidGradeShow']").val("");
		$("#bidGrade").removeClass("required");
	} else {
		$(".div_bidGrade").show();
		$("#bidGrade").addClass("required");
	}
	;
}

$(function() {
	new bidGradeStatus();
	
	$("input[type='text']").blur(function(){
		this.value=this.value.trim();
	});
});

$(function() {

	// 价格
	$.validator.addMethod("priceLower", function(value, element) {
		return this.optional(element) || parseFloat(value) != 0;
	}, "必须大于0");

	// 价格
	$.validator
			.addMethod(
					"price",
					function(value, element) {
						return this.optional(element)
								|| /^((((\+?[1-9][0-9]{0,7})|0)\.[0-9]{1,2})|((\+?[1-9][0-9]{0,7})|0))$/
										.test(value);
					}, "请正确填写此项");

	$.validator.addMethod("basePriceFlow", function(value, element) {
		var beginPrice = $("input[name='beginPriceShow']").val();
		if(value==''){
			return true;
		}
		return parseFloat(value) >= parseFloat(beginPrice);
	}, "不小于起拍价");

	$("#pieceForm")
			.validate(
					{
						submitHandler : function(form) {
							if (goodsList.length <= 0) {
								alert("请至少添加一个货品");
							} else if (isUnitPriceBid && goodsList.length > 1) {
								alert("单价报盘每个标段只能添加一个货品")
							} else {
								// js修改金额到分
								var beginPriceYuan = new Number(
										$(
												"#pieceForm input[name='beginPriceShow']")
												.val()==''?0:$(
												"#pieceForm input[name='beginPriceShow']")
												.val());
								if(beginPriceYuan==0){
									$("#pieceForm input[name='beginPrice']").val(0);
								}else{
									var beginPriceCent = beginPriceYuan * 100
									$("#pieceForm input[name='beginPrice']").val(
											beginPriceCent.toFixed(0));
								}
								var bidGradeYuan = new Number(
										$(
												"#pieceForm input[name='bidGradeShow']")
												.val()==''?0:$(
												"#pieceForm input[name='bidGradeShow']")
												.val());
								if(bidGradeYuan==0){
									$("#pieceForm input[name='bidGrade']").val('');
								}else{
									var bidGradeCent = bidGradeYuan * 100
									$("#pieceForm input[name='bidGrade']").val(
											bidGradeCent.toFixed(0));
								}
								if($("#pieceForm input[name='basePriceShow']").val()==''){
									$("#pieceForm input[name='basePrice']").val('');
								}else{
									var basePriceYuan = new Number($("#pieceForm input[name='basePriceShow']").val());
									var basePriceCent = basePriceYuan * 100
									$("#pieceForm input[name='basePrice']").val(
											basePriceCent.toFixed(0));
								}
								form.submit();
							}
						},
						rules : {
							beginPriceShow : {
								price : true
							},
							bidGradeShow : {
								price : true,
								priceLower : true
							},
							basePriceShow : {
								price : true,
								basePriceFlow : true
							},
							pieceName : {
								required : true,
								maxlength : 40
							}
						},
						messages : {
							pieceName : {
								required : "该项不能为空"
							}
						},
						errorPlacement : function(error, element) {
							(element.parent().find("span.error"))
									.replaceWith(error);
						},
						errorElement : "span"
					});

})

function submitOnly() {
	$("#pieceForm input[name='isContinue']").val("false");
	$("#pieceForm").submit();
}
function submitToPiecePage() {
	$("#pieceForm input[name='isContinue']").val("true");
	$("#pieceForm").submit();
}

$(function() {

	$("#open_bid").dialog({
		autoOpen : false,
		height : 400,
		width : 760,
		modal : true
	});
	$("#btn_open").click(function() {
		$("#open_bid").dialog("open");
	});

})
