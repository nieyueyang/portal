var bidGradeStatus = function() {
	if (auctionMode == "2") {
		$(".div_bidGrade").hide();
		$("input[name='bidGradeShow']").val("");
		$("#bidGrade").removeClass("required");
	} else {
		$(".div_bidGrade").show();
		$("#bidGrade").addClass("required");
	}
}

$(function() {
	new bidGradeStatus();
	$("input[type='text']").blur(function() {
		this.value = this.value.trim();
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
	// 整数格式
	$.validator.addMethod("intFormat", function(value, element) {
		return this.optional(element)
				|| /^(((\+?[1-9][0-9]{0,11})|0))$/.test(value);
	}, "请正确填写此项");

	// 大于0
	$.validator.addMethod("greatThanZero", function(value, element) {
		return this.optional(element) || parseFloat(value) > 0;
	}, "必须大于0");

	$.validator.addMethod("basePriceFlow", function(value, element) {
		var beginPrice = $("input[name='beginPriceShow']").val();
		return parseFloat(value) >= parseFloat(beginPrice);
	}, "不小于起拍价");

	$("#pieceForm")
			.validate(
					{
						submitHandler : function(form) {
							if (goodsList.length <= 0) {
								alert("请至少添加一个货品");
							} else if (isUnitPriceBid && goodsList.length > 1) {
								alert("单品竞每个标段只能添加一个货品")
							} else {
								// js修改金额到分
								var beginPriceYuan = new Number(
										$(
												"#pieceForm input[name='beginPriceShow']")
												.val());
								var beginPriceCent = beginPriceYuan * 100
								$("#pieceForm input[name='beginPrice']").val(
										beginPriceCent.toFixed(0));
								var basePriceYuan = new Number(
										$(
												"#pieceForm input[name='basePriceShow']")
												.val());
								var basePriceCent = basePriceYuan * 100
								$("#pieceForm input[name='basePrice']").val(
										basePriceCent.toFixed(0));
								var bidGradeYuan = new Number(
										$(
												"#pieceForm input[name='bidGradeShow']")
												.val());
								var bidGradeCent = bidGradeYuan * 100
								$("#pieceForm input[name='bidGrade']").val(
										bidGradeCent.toFixed(0));
								var buyerPieceDepositYuan = new Number(
										$(
												"#pieceForm input[name='buyerPieceDepositShow']")
												.val());
								var buyerPieceDepositCent = buyerPieceDepositYuan * 100
								$("#pieceForm input[name='buyerPieceDeposit']")
										.val(buyerPieceDepositCent.toFixed(0));
								form.submit();
							}
						},
						rules : {
							beginPriceShow : {
								required : true,
								price : true
							},
							bidGradeShow : {
								required : true,
								price : true,
								priceLower : true
							},
							basePriceShow : {
								price : true
							},
							pieceName : {
								required : true,
								maxlength : 40
							},
							quantity : {
								required : true,
								intFormat : true,
								greatThanZero : true
							},
							buyerPieceDepositShow : {
								required : true,
								price : true
							}

						},
						messages : {
							beginPriceShow : {
								required : "该项不能为空"
							},
							bidGradeShow : {
								required : "该项不能为空"
							},
							basePriceShow : {
								required : "该项不能为空"
							},
							pieceName : {
								required : "该项不能为空"
							},
							quantity : {
								required : "该项不能为空"
							},
							buyerPieceDepositShow : {
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
