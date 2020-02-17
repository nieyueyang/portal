var performanceTypeStatus = function() {
	if (parseInt($("input[name='performanceType']:checked").val()) == 3) {
		$("input[name='deliveryTypeShow']").eq(0).click();
		new deliveryTypeStatus();
		$("input[name='deliveryTypeShow']").attr("disabled", "disabled")
	} else {
		$("input[name='deliveryTypeShow']").removeAttr("disabled")
	}
	$("input[name='deliveryType']").val(
			$("input[name='deliveryTypeShow']:checked").val());
}

function submitOnly() {
	$("#spaceForm input[name='isContinue']").val("false");
	$("#spaceForm").submit();
}

function submitToPiecePage() {
	$("#spaceForm input[name='isContinue']").val("true");
	$("#spaceForm").submit();
}

$(function() {

	$("#spaceForm")
			.validate(
					{
						submitHandler : function(form) {
							if (buyerList.length <= 1
									&& $(
											"#spaceForm input[name='isDirect']:checked")
											.val() == "1") {
								alert("定向竞买需至少指定两个买家");
							} else {
								// 仓库名称和仓库地址
								// 指定交收库
								if ($("input[name='warehouseCmpType']:checked")
										.val() == "0") {
									var warehouseCmpId = $(
											"#warehouseCmpIdShow").find(
											'option:selected').val();
									var warehouseCmpAddress = $(
											"#warehouseCmpAddressSelect").val();
									var warehouseCmpName = $(
											"#warehouseCmpIdShow").find(
											'option:selected').html();
									$("#warehouseCmpAddress").val(
											warehouseCmpAddress);
									$("#warehouseCmpName")
											.val(warehouseCmpName);
									$("#warehouseCmpId").val(warehouseCmpId);

								}
								// 非指定交收库
								else {
									var warehouseCmpAddress = $(
											"#warehouseCmpAddressInput").val();
									var warehouseCmpName = $(
											"#warehouseCmpNameInput").val();
									$("#warehouseCmpAddress").val(
											warehouseCmpAddress);
									$("#warehouseCmpName")
											.val(warehouseCmpName);
								}
								
								var buyerDepositYuan = new Number(
										$("#spaceForm input[name='buyerDepositShow']")
												.val());
								if(buyerDepositYuan==''||buyerDepositYuan==null){
									$("#spaceForm input[name='buyerDeposit']").val(
											'');
								}else{
									var buyerDepositCent = buyerDepositYuan * 100
									$("#spaceForm input[name='buyerDeposit']").val(
											buyerDepositCent.toFixed(0));
								}
								if($("#spaceForm input[name='buyerDepositShow']")
										.val()=='0'){
									$("#spaceForm input[name='buyerDeposit']").val(
									'0');
								}
								form.submit();
							}
						},
						rules : {
							name : {
								required : true,
								maxlength : 25
							},
							buyerDepositShow : {
								price : true
							},
							noticeDate : {
								afterYesterday : true
							},
							auctionDate : {
								afterYesterday : true,
								auctionDate : true,
								auctionTime :true
							},
							beginTimeStr : {
								afterCurrentTime:true,
								spaceForbidTime:true
							},
							endTimeStr : {
								endTime : true,
								tradeTime : true,
								beforeEnd : true
							},
							deliveryType : {
								required : true
							},
							deliveryDate : {
								afterYesterday : true,
								deliveryDate : true
							},
							deliveryTime : {
								required : true,
								afterYesterday : true
							},
							deliveryAddress : {
								required : true
							},
							linkMan : {
								required : true
							},
							telePhone : {
								required : true,
								Mobil : true
							},
							deliveryTimeNew : {
								required : true,
								maxlength : 50
							},
							responseNum : {
								NotZero : true
							}
						},
						messages : {
							name : {
								required : "该项不能为空"
							},
							deliveryType : {
								required : "该项不能为空"
							},
							comments : {
								maxlength : "最多1200个字符"
							},
							deliveryTime : {
								required : "该项不能为空"
							},
							deliveryAddress : {
								required : "该项不能为空"
							},
							linkMan : {
								required : "该项不能为空"
							},
							telePhone : {
								required : "该项不能为空"
							},
							deliveryTimeNew : {
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
