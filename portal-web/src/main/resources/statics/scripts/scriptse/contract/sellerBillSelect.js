function submitInvoice(id,currentPage){
	$("#id").val(id);
	$("#currentPage").val(currentPage);
	$("#sellerBillSelectDialog").dialog("open");
}

function pickupGoods(id,currentPage){
	$("#id").val(id);
	$("#currentPage").val(currentPage);
	$("#pickupGoodsSelectDialog").dialog("open");
}
function fillGoodsInfo(id){
	$("#id").val(id);
	//$("#currentPage").val(currentPage);
	$("#goodsmentDialog").dialog("open");
}

$(function() {
	
	$("#sellerBillSelectDialog").dialog(
			{
				autoOpen : false,
				bgiframe : true,
				modal : true,
				width : 600,
				title : "发票信息",
				buttons : {
					"确认" : function() {

						var invoiceDesc = $.trim($("#invoiceDesc").val());

						var id = $("#id").val();
						$("#id").val(id);
						var currentPage = $("#currentPage").val();
						$("#currentPage").val(currentPage);
						if (invoiceDesc == '') {
							alert('发票信息不能为空');
							return false;
						}
						if (invoiceDesc.length > 64) {
							alert('发票信息不能超过64个字符');
							return false;
						}
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

	$("#sellerBillSelectDialog").bind(
			"dialogopen",
			function(event, ui) {
				$("#sellerBillSelectDialog").load(

				appServer + "/ajax/bill/editBill.htm",
						$("#sellerSelectDialogForm").serializeArray());
			});
	$("#sellerBillSelectDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
	
	
	$("#pickupGoodsSelectDialog").dialog(
			{
				autoOpen : false,
				bgiframe : true,
				modal : true,
				width : 600,
				title : "提货信息",
				buttons : {
					"确认" : function() {
						var val=$('input:radio[name="selGoods"]:checked').val();
						if(val==null){
							alert("请选择合同行!");
							return false;
						}
						var t = $("#bidType").val();
						if(t=='1'){
							if ($("#deliveryWeight").val() == '' || isNaN($("#deliveryWeight").val()) || $("#deliveryWeight").val() < 0) {
								alert('提货重量格式不正确');
								return false;
							}else{
								var wnum = $("#deliveryWeight").val();
								var snum = $("#weight").val();
								if(Number(wnum)>Number(snum)){
									alert('提货重量不能超过'+snum);
									return false;
								}
							}
						}
						if ($("#deliveryAmount").val() == '' || isNaN($("#deliveryAmount").val()) || $("#deliveryAmount").val() < 0) {
							alert('提货金额格式不正确');
							return false;
						}else{
							var danum = $("#deliveryAmount").val();
							var anum = $("#amount").val();
							if(Number(danum)>Number(anum)){
								alert('提货金额不能超过'+anum);
								return false;
							}
						}
						$("#pickupForm").submit();
						$(this).dialog("close");

					},
					"取消" : function() {
						$(this).dialog("close");
					}
				}
			});

	$("#pickupGoodsSelectDialog").bind(
			"dialogopen",
			function(event, ui) {
				$("#pickupGoodsSelectDialog").load(

				appServer + "/ajax/seller/pickupGoods.htm",
						$("#sellerSelectDialogForm").serializeArray());
			});
	$("#pickupGoodsSelectDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
	
	$("#goodsmentDialog").bind(
			"dialogopen",
			function(event, ui) {
				$("#goodsmentDialog").load(

				appServer + "/contract/seller/pickupGoodsManager.htm?id="+$("#id").val()+"&t="+(new Date()).getTime());
	});
	$("#goodsmentDialog").dialog(
			{
				autoOpen : false,
				bgiframe : true,
				modal : true,

				width : 1000,
				title : "确认数量",
				buttons : {
					"确认" : function() {
 						var g =  $("input[name='goodsId']:hidden");
 						var inputStrTemp="";
 						for(var i = 0 ; i<g.length;i++){
 							var realWeight = $('#realWeight_'+g[i].value).val();
 							if(realWeight == '' || isNaN(realWeight) || realWeight <= 0){
 								$('#message_'+g[i].value).html('请正确填写【交货数量】');
 								return;
 							}
 							inputStrTemp += g[i].value+"&"+realWeight;
 							if(i<g.length-1){
 								inputStrTemp +=",";
 							}
 						}
 						$('#inputStr').val(inputStrTemp);
//						if("9"==s){
//							$(this).dialog("close");
//						}
//						if($('#supplyAmount').val() == '' || isNaN($('#supplyAmount').val()) || $('#supplyAmount').val() <= 0){
//							$('#message').html('请正确填写【补款金额】');
//							return;
//						}else if($('#supplyAmount').val().length>13){
//							$('#message').html('补款金额数值太大');
//							return;
//						}
//						var num = new Number($('#supplyAmount').val());
//						$('#supplyAmount').val(num.toFixed(2));
 						$("#goods_form").submit();
						$(this).dialog("close");

					},
					"取消" : function() {
						$(this).dialog("close");
					}
				}
	 });
	$("#goodsmentDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});

});



