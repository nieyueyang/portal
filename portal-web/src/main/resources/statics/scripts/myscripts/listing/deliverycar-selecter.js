function selectMyDeliveryCar() {
	$("#dialog-deliverycar-selecter").dialog("open");
	return false;
}

$(function() {
	$("#dialog-deliverycar-selecter")
			.dialog(
					{
						autoOpen : false,
						bgiframe : true,
						modal : true,
						position : [ 350, 50 ],
						width : 750,
						minHeight : 530,
						title : "我的提货车辆",
						open : function() {
							// jquery之dialog的键盘事件(输入完毕回车检索)
							$(this)
									.bind(
											"keypress.ui-dialog",
											function(event) {
												if (event.keyCode == $.ui.keyCode.ENTER) {
													$(
															"#dialogSearchForm a[id=dialogSearchBtn]")
															.click();
													return false;
												}
											});
						},
						buttons : {
							"确认" : function() {
								var isChecked = true;
								var allOpt = $("#dialog-deliverycar-selecter input[name='selOpt']:checked");
								if (allOpt.length == 0) {
									alert("请选择提货车辆!");
									return;
								}
								$(
										"#inputDialogDeliveryPersonCarForm input[name='carNo']")
										.val(
												allOpt.parent().parent().find(
														"td").eq(1).html());
								$(
										"#inputDialogDeliveryPersonCarForm textarea[name='carDesc']")
										.val(
												allOpt.parent().parent().find(
														"td").eq(2).html());
								$(this).dialog("close");
							},
							"取消" : function() {
								$(this).dialog("close");
							}
						}
					});

	$("#dialog-deliverycar-selecter").bind(
			"dialogopen",
			function(event, ui) {
				var date = new Date().getTime();
				$("#dialog-deliverycar-selecter").load(
						appServer + "/listing/deliveryCar/ajax/list.htm?t="
								+ date);
			});
	$("#dialog-deliverycar-selecter").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
	$("#dialogSearchForm a[id=dialogSearchBtn]").live(
			"click",
			function() {
				$.ajax({
					contentType : "application/json; charset=gbk",
					cache : false
				})

				$("#dialog-deliverycar-selecter").load(
						appServer + "/listing/deliveryCar/ajax/list.htm?t="
								+ new Date().getTime(),
						$("#dialogSearchForm").serializeArray(), null);

			});
});
