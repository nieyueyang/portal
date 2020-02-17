
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
								form.submit();
							}
						},
						rules : {
							name : {
								required : true,
								maxlength : 25
							},
							noticeDate : {
								required : true,
								afterYesterday : true
							},
							auctionDate : {
								required : true,
								afterYesterday : true,
								auctionDate : true
							},
							beginTimeStr : {
								required : true,
								afterCurrentTime:true,
								spaceForbidTime:true
							},
							endTimeStr : {
								required : true,
								endTime : true,
								tradeTime : true,
								beforeEnd : true
							},
							deliveryType : {
								required : true
							},
							buyerDepositShow : {
								required : true,
								price : true
							},
							deliveryDate : {
								required : true,
								afterYesterday : true,
								deliveryDate : true
							},
							deliveryTimeNew : {
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
							noticeDate : {
								required : "该项不能为空"
							},
							auctionDate : {
								required : "该项不能为空"
							},
							beginTimeStr : {
								required : "该项不能为空"
							},
							endTimeStr : {
								required : "该项不能为空"
							},
							deliveryType : {
								required : "该项不能为空"
							},
							buyerDeposit : {
								required : "该项不能为空"
							},
							deliveryDate : {
								required : "该项不能为空"
							},
							buyerDepositShow : {
								required : "该项不能为空"
							},
							warehouseCmpIdShow : {
								required : "该项不能为空"
							},
							warehouseCmpAddressSelect : {
								required : "该项不能为空"
							},
							warehouseCmpNameInput : {
								required : "该项不能为空"
							},
							warehouseCmpAddressInput : {
								required : "该项不能为空"
							},
							comments : {
								maxlength : "最多1200个字符"
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
