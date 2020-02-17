function selectMyDeliveryPerson() {
	$("#dialog-deliveryperson-selecter").dialog("open");
	return false;
}

$(function() {
	$("#dialog-deliveryperson-selecter")
			.dialog(
					{
						autoOpen : false,
						bgiframe : true,
						modal : true,
						position : [ 350, 50 ],
						width : 750,
						minHeight : 530,
						title : "我的提货人",
						open : function() {
							// jquery之dialog的键盘事件(输入完毕回车检索)
							$(this)
									.bind(
											"keypress.ui-dialog",
											function(event) {
												if (event.keyCode == $.ui.keyCode.ENTER) {
													$(
															"#dialogSearchFormDeliveryPerson a[id=dialogSearchBtnDeliveryPerson]")
															.click();
													return false;
												}
											});
						},
						buttons : {
							"确认" : function() {
								var isChecked = true;
								var allOpt = $("#dialog-deliveryperson-selecter input[name='selOpt']:checked");
								if (allOpt.length == 0) {
									alert("请选择提货人!");
									return;
								}
								$(
										"#inputDialogDeliveryPersonCarForm input[name='name']")
										.val(
												allOpt.parent().parent().find(
														"td").eq(1).html());
								$(
										"#inputDialogDeliveryPersonCarForm input[name='mobile']")
										.val(
												allOpt.parent().parent().find(
														"td").eq(2).html());
								$(
										"#inputDialogDeliveryPersonCarForm input[name='identityNo']")
										.val(
												allOpt.parent().parent().find(
														"td").eq(3).html());
								$(this).dialog("close");
							},
							"取消" : function() {
								$(this).dialog("close");
							}
						}
					});

	$("#dialog-deliveryperson-selecter").bind(
			"dialogopen",
			function(event, ui) {
				var date = new Date().getTime();
				$("#dialog-deliveryperson-selecter").load(
						appServer + "/listing/deliveryPerson/ajax/list.htm?t="
								+ date);
			});
	$("#dialog-deliveryperson-selecter").bind("dialogclose",
			function(event, ui) {
				$(this).empty();
			});
	$("#dialogSearchFormDeliveryPerson a[id=dialogSearchBtnDeliveryPerson]")
			.live(
					"click",
					function() {
						$.ajax({
							contentType : "application/json; charset=gbk",
							cache : false
						})

						$("#dialog-deliveryperson-selecter")
								.load(
										appServer
												+ "/listing/deliveryPerson/ajax/list.htm?t="
												+ new Date().getTime(),
										$("#dialogSearchFormDeliveryPerson")
												.serializeArray(), null);

					});
});