jQuery(function($) {
	var form = $('#afterPaymentForm').validateForm(
			{
				// valedateHidden:true,
				ignore : ':hidden',// 不校验隐藏元素
				rules : {
					'supplyFund' : {
						required : true,
						number : true,
						min : 0.01
					}
				},
				messages : {
					'supplyFund' : {
						required : "补缴金额为必填项！",
						number : "金额必须是数字",
						min : "金额输入有误"
					}
				},
				submitHandler : function(f) {
					var contractNo = $("#contractNo").val();
					var buyerDeposit = $("#buyerDepositStr").val();
					var financeMaxAmt = $("#financeMaxAmtStr").val();
					var buyerDelCommission = $("#buyerDelCommission").val();
					financeMaxAmt = financeMaxAmt == "" ? 0 : financeMaxAmt;
					var totalPrice = $("#totalPriceStr").val();
					var affterPay = (Number(totalPrice) + Number(buyerDelCommission) - Number(buyerDeposit) - Number(financeMaxAmt)).toFixed(2);
					affterPay = affterPay > 0 ? affterPay : 0;
					$('input[type=submit]', $(f)).attr('disabled', 'disabled');
					Hundsun.PopUtil.confirm({
						width : 500,
						msg : "该合同总共金额" + totalPrice + "元，交收手续费"+ buyerDelCommission +"元，已冻结预付保证金"
								+ buyerDeposit + "元，本次最大融资额度" + financeMaxAmt
								+ "元，预付款最少需补交" + affterPay + "元!",
						autohide : false
					}, function() {
						_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
						$(f).ajaxSubmit(function(result) {
							callbackforadd(result);
						});
					});

				}
			});
});

function callbackforadd(result) {
	if (_msg) {
		_msg.hide();
	}
	if (result.data != "true") {
		Hundsun.PopUtil.alert({
			msg : '补交货款失败，原因：' + result.data + '。请联系交易中心！',
			type : 'error',
			autohide : false
		});
	} else {
		Hundsun.PopUtil.alert({
			msg : '补交货款成功!',
			type : 'success',
			autohide : false,
			callback : function() {
				Hundsun.UrlUtil
						.redirect("/contract/buyer/goAfterPayment.htm?id="
								+ result.title);
			}
		});
	}

}

function goRekonApplyContract() {
	if (deliveryStatus == 2 || deliveryStatus == 8) {
		alert("当前交收状态不允许发起评估申请");
		return;
	}
	if (buyerDeposit >= buyerDelCommission) {
		location.href = appServer
				+ "/contract/buyer/goRekonApplyContract.htm?id=" + contractId;
	} else {
		alert("保证金不足以缴纳交收手续费，请补交货款后重新发起评估申请");
	}
}