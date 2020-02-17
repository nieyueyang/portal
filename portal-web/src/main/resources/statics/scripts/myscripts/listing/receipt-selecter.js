// recIdList: 一维数组，存放选择仓单的id
// buyerList: 二维数组，存放用于列表显示的仓单信息
var recIdList = [];
var receiptList = [];
$(function() {
	// 选择仓单的dialog
	$("#receiptSelectDialog")
			.dialog({
						autoOpen : false,
						bgiframe : true,
						modal : true,
						position : [ 130, 100 ],
						width : 750,
						title : "选择仓单",
						buttons : {
							"确认" : function() {
								var isChecked = true;
								var allOpt = $(".list-table input[name='selOpt']:checked");
								
								if (allOpt.length == 0) {
									alert("请选择仓单!");
									return;
								}
								
								if(allOpt.length>1){
									alert("只能选择一条仓单!");
									return;
								}else{
									for ( var i = 0; i < allOpt.length; i++) {
										var id = allOpt[i].getAttribute("value");
										recIdList.push(id);
										var td = $(allOpt[i]).parent();
										var no = td.parent().find("td.no").text();
										var availableWeight =td.parent().find("td.availableWeight").text();
										var availableCount = td.parent().find("td.availableCount").text();
										var varietyCode = td.parent().find("td.varietyCode").text();
										var varietyName = td.parent().find("td.varietyName").text();
										var material = td.parent().find("td.material").text();
										var listWeight = td.parent().find('input[name=listWeight]').val();
										var listNum = td.parent().find('input[name=listNum]').val();
										var batchNo = td.parent().find("input[name='batchNo']").val();
										
										if(Number(listWeight)<=0){
											alert("您输入的量必须大于0！");
											return ;
										}else if(Number(availableWeight)<Number(listWeight)){
											alert("您输入的量不能大于可用量！");
											return ;
										}else if((/^(\+|-)?\d+$/.test(listNum)) && listNum>=0){
											 if(Number(availableCount)<Number(listNum)){
													alert("您输入的数量不能大于可用数量！");
													return ;
											  }
										 }else{
											  alert("数量不能小于0");
											  return ;
										 }
										choiceBack(id,no,varietyCode,varietyName,material,listWeight,listNum,batchNo)
									}
								}
								
								$(this).dialog("close");
							},
							"取消" : function() {
								$(this).dialog("close");
							}
						}
					});
	
	$("#receiptSelectDialog").bind(
			"dialogopen",
			function(event, ui) {
				$("#receiptSelectDialog").load(
						appServer + "/listingRemoting/list_receipts.htm?"+Math.round((Math.random()) * 100000000), null,
						function() {
							checkSelect();
						});
			});
	$("#receiptSelectDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
	$("#receiptSelectDialogForm a[id=listReceipts]").live(
			"click",
			function() {
				$.ajax({
					contentType : "application/json; charset=gbk",
					cache : false
				})

				$("#receiptSelectDialog").load(
						appServer + "/listingRemoting/list_receipts.htm?"+Math.round((Math.random()) * 100000000),
						$("#receiptSelectDialogForm").serializeArray(), function() {
							checkSelect();
						});

			});
	
	// 检查所有列表选择项，挑上并disable已选择的仓单
	function checkSelect() {
		$(".list-table input[name='selOpt']").each(function() {
			var selectedId = this.getAttribute("value");
			if (recIdList.in_array(selectedId)) {
				$(this).attr("checked", "checked");
				//$(this).attr("disabled", true);
			}
		});

	}
	
	// 判断某数组是否包含某元素
	Array.prototype.S = String.fromCharCode(2);
	Array.prototype.in_array = function(e) {
		var r = new RegExp(this.S + e + this.S);
		return (r.test(this.S + this.join(this.S) + this.S));
	}

});


function selectReceiptClick(){
	$("#receiptSelectDialog").dialog("open");
}
