function supplyFund(id,currentPage){
	$("#id").val(id);
	$("#currentPage").val(currentPage);
	$("#buyerPaymentDialog").dialog("open");
}

//选择补齐货款方式
function checkSupply(id,currentPage){
	$("#id").val(id);
	$("#currentPage").val(currentPage);
	$("#checkPaymentDialog").dialog("open");
}

function payFinish(id,currentPage,tStatus){
	$("#id").val(id);
	$("#tStatus").val(tStatus);
	$("#currentPage").val(currentPage);
	$("#paymentDialog").dialog("open");
}


$(function() {

	$("#buyerPaymentDialog").dialog(
			{
				autoOpen : false,
				bgiframe : true,
				modal : true,

				width : 400,
				title : "补款信息",
				buttons : {
					"确认" : function() {

						var id = $("#id").val();
						$("#id").val(id);
						
						var currentPage = $("#currentPage").val();
						$("#currentPage").val(currentPage);

						$("#submitForm").append(
								"<input id='id' name='id' type='text' value="
										+ id + " />");
						$("#submitForm").append(
								"<input id='currentPage' name='currentPage' type='text' value="
										+ currentPage + " />");
						$("#submitForm").submit();
						$(this).dialog("close");

					},
					"取消" : function() {
						$(this).dialog("close");
					}
				}
			});

	$("#buyerPaymentDialog").bind(
			"dialogopen",
			function(event, ui) {
				$("#buyerPaymentDialog").load(

				appServer + "/ajax/buyer/buyerPayment.htm",
						$("#buyerSelectDialogForm").serializeArray());
			});
	$("#buyerPaymentDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
	
	$("#paymentDialog").bind(
			"dialogopen",
			function(event, ui) {
				$("#paymentDialog").load(

				appServer + "/contract/buyer/pickupPayment.htm?id="+$("#id").val()+"&t="+(new Date()).getTime());
			});
	$("#paymentDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
	
	$("#paymentDialog").dialog(
			{
				autoOpen : false,
				bgiframe : true,
				modal : true,

				width : 1100,
				title : "补款信息",
				buttons : {
					"确认" : function() {
						var s = $("#tStatus").val();
						if("9"==s){
							$(this).dialog("close");
						}
						if($('#supplyAmount').val() == '' || isNaN($('#supplyAmount').val()) || $('#supplyAmount').val() <= 0){
							$('#message').html('请正确填写【补款金额】');
							return;
						}else if($('#supplyAmount').val().length>13){
							$('#message').html('补款金额数值太大');
							return;
						}
						var num = new Number($('#supplyAmount').val());
						$('#supplyAmount').val(num.toFixed(2));
						$("#payment_form").submit();
						$(this).dialog("close");

					},
					"取消" : function() {
						$(this).dialog("close");
					}
				}
			});
	
	$("#checkPaymentDialog").dialog(
			{
				autoOpen : false,
				bgiframe : true,
				modal : true,

				width : 400,
				title : "补款方式",
				buttons : {
					"确认" : function() {
						var cb = $("input[name='checkType']:checked").val();
						if(cb==1){
							//if(t=="2"){
								$("#paymentDialog").dialog("open");
							//}else{
							//	$("#buyerPaymentDialog").dialog("open");
							//}
						}else{
							$("#payContractId").val($("#id").val());
							var contractId = $("#payContractId").val();
							$('#pay_info_form').attr("action",appServer+"/contract/buyer/buyerOutLinePayment.htm?contractId="+contractId);
							$('#pay_info_form').submit();
						}
						$(this).dialog("close");
					},
					"取消" : function() {
						$(this).dialog("close");
					}
				}
			});
	
	$("#checkPaymentDialog").bind(
			"dialogopen",
			function(event, ui) {
				$("#checkPaymentDialog").append("<input type='radio' name='checkType' checked value='1'>线上支付");
				$("#checkPaymentDialog").append("<input type='radio' name='checkType' value='2'>其它方式支付");
			});
	$("#checkPaymentDialog").bind("dialogclose", function(event, ui) {
		$("#checkPaymentDialog").empty();
	});

	
	
});