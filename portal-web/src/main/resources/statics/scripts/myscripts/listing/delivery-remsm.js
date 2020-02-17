function remsm(deliveryId) {
	$("#ajaxDeliveryId").val(deliveryId);
	$("#dialog-remsm").dialog("open");
	return false;
}

$(function() {
	$("#dialog-remsm")
			.dialog(
					{
						autoOpen : false,
						bgiframe : true,
						modal : true,
						position : [ 350, 50 ],
						width : 400,
						minHeight : 230,
						title : "物流公司信息",
						buttons : {
							"确定" : function() {
								var allOpt = $(".list-table input[name='selOpt']:checked");
								var recordIds = new Array();
								for ( var i = 0; i < allOpt.length; i++) {
									var recordId = allOpt[i]
											.getAttribute("value");
									recordIds.push(recordId);

								}
								if (allOpt.length == 0) {
									alert("请选择提货人!");
									return false;
								}
								alert("系统将重发短信");
								$
										.ajax({
											url : appServer
													+ "/listing/delivery/buyer/remsm.htm?t="
													+ new Date().getTime()
													+ "&recordIds="
													+ recordIds.join(",")
										});
								$(this).dialog("close");
							},
							"取消" : function() {
								$(this).dialog("close");
							}
						}
					});

	$("#dialog-remsm").bind(
			"dialogopen",
			function(event, ui) {
				var deliveryId = $("#ajaxDeliveryId").val();
				var date = new Date().getTime();
				$("#dialog-remsm").load(
						appServer + "/listing/delivery/buyer/ajax/remsm.htm?t="
								+ date + "&deliveryId=" + deliveryId);
			});
	$("#dialog-remsm").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
});