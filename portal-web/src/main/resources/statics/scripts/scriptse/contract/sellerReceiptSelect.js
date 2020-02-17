$(function() {
	// 选择买家的dialog
	$("#sellerReceiptSelectDialog")
			.dialog(
					{
						autoOpen : false,
						bgiframe : true,
						modal : true,
						position : [ 100, 100 ],
						width : 750,
						title : "仓单选择",
						buttons : {
							"确认" : function() {
								var isChecked = true;
								var receiptId = 0;
								var allOpt = $(".list-table input[name='mainSel']:checked");
								 
								 
								if (allOpt.length == 0) {
									alert("请选择仓单!");
									return;
								}   
								var check = $("input:checked"); 
								var isSuccess = true;
								
								check.each(function(i){   
									receiptId = $(this).parent().parent().find("td").eq(1).text();
									receiptNo = $(this).parent().parent().find("td").eq(9).text();
									 
								    var varietyCode = $("#varietyCode").val();
								    var varietyCode1 = $(this).parent().parent().find("td").eq(3).text();
								    if(varietyCode!='')
								    {
								    	if(varietyCode.toUpperCase()!=varietyCode1.toUpperCase()){
								    		alert("品种编码不一致");
								    		isSuccess = false;
								    		return false;
								    	}
								    }
								    var material = $("#material").val();
								    var material1 = $(this).parent().parent().find("td").eq(4).text();
								    if(material!='')
								    {
								    	if(material.toUpperCase()!=material1.toUpperCase()){
								    		alert("材质不一致");
								    		isSuccess = false;
								    		return false;
								    	}
								    }
								    
								    var manufacturer = $("#manufacturer").val();
								    var manufacturer1 = $(this).parent().parent().find("td").eq(6).text();
								    if(manufacturer!='')
								    {
								    	if(manufacturer.toUpperCase()!=manufacturer1.toUpperCase()){
								    		alert("厂家不一致");
								    		isSuccess = false;
								    		return false;
								    	}
								    }
								    
								   
								    
								    var origin = $("#origin").val();
								    var origin1 = $(this).parent().parent().find("td").eq(7).text();
								    if(origin!='')
								    {
								    	if(origin.toUpperCase()!=origin1.toUpperCase()){
								    		alert("产地不一致");
								    		isSuccess = false;
								    		return false;
								    	}
								    }
								    
								    var weight = $("#weight").val();
								    if(weight<=0)
								    {
								    	alert("要补的仓单重量不能小于0");
							    		isSuccess = false;
							    		return false;
								    }
								    var weight1 = parseFloat($(this).parent().parent().find("td").eq(8).text());
								     
								    if(parseFloat(weight)>weight1){
								    		alert("仓单可用重量少于货物重量");
								    		isSuccess = false;
								    		return false;
								    }
								    
									 
								});
								 
								if(isSuccess){ 
									var id = $("#id").val();
									var goodsId = $("#goodsId").val();
									var weight = $("#weight").val();
									 
									$("#submitForm").append("<input id='id' name='id' type='text' value="+id+" />");
									$("#submitForm").append("<input id='goodsId' name='goodsId' type='text' value="+goodsId+" />");
									$("#submitForm").append("<input id='receiptId' name='receiptId' type='text' value="+receiptId+" />");
									$("#submitForm").append("<input id='receiptNo' name='receiptNo' type='text' value="+receiptNo+" />");
									$("#submitForm").append("<input id='weight' name='weight' type='text' value="+weight+" />");
									$("#submitForm").submit();
								    $(this).dialog("close");
								}
							},
							"取消" : function() {
								$(this).dialog("close");
							}
						}
					});
	$("a[name='selectBuyerReceipt']").click(function() {
		//给表单赋值
		var varietyCode = $(this).parent().parent().find("td").eq(0).text();
		var varietyName = $(this).parent().parent().find("td").eq(1).text();
		var material = $(this).parent().parent().find("td").eq(2).text();
		
		var weight = $(this).parent().parent().find("td").eq(4).text();
		var manufacturer = $(this).parent().parent().find("td").eq(5).text();
		var origin = $(this).parent().parent().find("td").eq(6).text();
		var goodsId = $(this).parent().parent().find("td").eq(7).text();
		 $("#varietyCode").val(varietyCode);
		 $("#varietyName").val(varietyName);
		 $("#material").val(material);
		
		 $("#weight").val(weight);
		 $("#manufacturer").val(manufacturer);
		 $("#origin").val(origin);
		 $("#goodsId").val(goodsId);
		$("#sellerReceiptSelectDialog").dialog("open");
	});
	$("#sellerReceiptSelectDialog").bind(
			"dialogopen",
			function(event, ui) {
				$("#sellerReceiptSelectDialog").load(
						
						appServer + "/ajax/receipt/receiptList.htm", $("#sellerSelectDialogForm").serializeArray(),
						function() {
						      
						});
			});
	$("#sellerReceiptSelectDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
	 
});