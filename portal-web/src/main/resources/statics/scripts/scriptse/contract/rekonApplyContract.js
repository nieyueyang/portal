$(function() {
	// 改变监管方后获取融资银行列表
	$("#financeMonitorId").bind(
			"change",
			function() {
				var financeMonitorId = $(this).val();
				var contractNo = $("#contractNo").val();
				if (financeMonitorId == "") {
					Hundsun.PopUtil.alert({
						msg : '请选择监管方!',
						autohide : true,
						callback : function() {
							$("#financeBankId").empty();
							$("#financeBankId").append(
									"<option value=''>请先选择融资银行</option>");
						}
					});
				} else {
					$.ajax({
						url : "/contract/buyer/getFinanceBanks.htm",
						type : "GET",
						data : {
							"contractNo" : contractNo,
							"financeMonitorId" : financeMonitorId
						},
						success : function(data) {
							if (data.type != "success") {
								Hundsun.PopUtil.alert({
									msg : data.title,
									type : 'error',
									autohide : false
								});
								$("#financeBankId").empty();
								$("#financeBankId").append(
										"<option value=''>请先选择融资银行</option>");
							} else {
								var bankList = data.data;
								$("#financeBankId").empty();
								for ( var i = 0; i < bankList.length; i++) {
									$("#financeBankId").append(
											"<option value='"
													+ bankList[i].bankId + "'>"
													+ bankList[i].bankName
													+ "</option>");
								}

							}

						}
					});
				}

			});
});
var _msg;

/**
 * 发起用户评估申请
 */
function rekonFinance() {
	var contractNo = $("#contractNo").val();
	var financeMonitorId = $("#financeMonitorId").val();
	var financeMonitorName = $("#financeMonitorId").find("option:selected")
			.text();
	var financeBankId = $("#financeBankId").val();
	var financeBankName = $("#financeBankId").find("option:selected").text();
	if (contractNo == "") {
		$("#contractNo").after(
				'<span id="contractNo_error" class="error">合同编号不能为空</span>');
	} else {
		$("#contractNo_error").empty();
		$("#contractNo_error").remove();
	}
	if (financeMonitorId == "") {
		$("#financeMonitorId_error").remove();
		$("#financeMonitorId")
				.after(
						'<span id="financeMonitorId_error" class="error">监管方不能为空</span>');
	} else {
		$("#financeMonitorId_error").empty();
		$("#financeMonitorId_error").remove();
	}
	if (financeBankId == "") {
		$("#financeBankId_error").remove();
		$("#financeBankId").after(
				'<span id="financeBankId_error" class="error">融资银行不能为空</span>');
	} else {
		$("#financeBankId_error").empty();
		$("#financeBankId_error").remove();
	}
	if (contractNo == "" || financeMonitorId == "" || financeBankId == "")
		return false;
	Hundsun.PopUtil
			.confirm(
					{
						width : 500,
						msg : "融资评估一旦发起，将不允许撤销，您确定还需要发起融资评估吗？",
						autohide : false
					},
					function() {
						var data = {
							"contractNo" : contractNo,
							"financeMonitorId" : financeMonitorId,
							"financeMonitorName" : financeMonitorName,
							"financeBankId" : financeBankId,
							"financeBankName" : financeBankName
						};
						$
							.ajax({
								url : "/contract/buyer/rekonApplyContract.htm",
								type : "POST",
								data : data,
								success : function(data) {
									if (data.data != "true") {
										Hundsun.PopUtil
												.alert({
													msg : '融资评估申请失败，原因：'
															+ data.data
															+ '。请联系中心!',
													type : 'error',
													autohide : false,
													callback : function() {
														Hundsun.UrlUtil
																.redirect("/contract/buyer/contractList.htm");
													}
												});
									} else {
										Hundsun.PopUtil
												.alert({
													msg : '融资评估受理成功!',
													type : 'success',
													autohide : false,
													callback : function() {
														Hundsun.UrlUtil
																.redirect("/contract/buyer/contractList.htm");
													}
												});
									}
								}
							});
					});
}

/**
 * 融资申请
 * 
 * @returns
 */
function financeApply() {

}
/**
 * 重新融资申请
 * 
 * @returns
 */
function reFinanceApply() {

}
