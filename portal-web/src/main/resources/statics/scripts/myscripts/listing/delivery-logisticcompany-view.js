function showLogisticsCompany() {
	var companyId = $("#preInputForm select[name='logisticsCompanyId']").val();
	if (companyId == "") {
		alert("请选择相应的物流公司后再查看");
	} else {
		$("#dialog-logisticscompany").dialog("open");
	}
	return false;
}

$(function() {
	$("#dialog-logisticscompany").dialog({
		autoOpen : false,
		bgiframe : true,
		modal : true,
		position : [ 350, 50 ],
		width : 350,
		minHeight : 230,
		title : "物流公司信息",
		buttons : {
			"确定" : function() {
				$(this).dialog("close");
			}
		}
	});

	$("#dialog-logisticscompany")
			.bind(
					"dialogopen",
					function(event, ui) {
						var companyId = $(
								"#preInputForm select[name='logisticsCompanyId']")
								.val();
						var date = new Date().getTime();
						$("#dialog-logisticscompany")
								.load(
										appServer
												+ "/listing/delivery/buyer/ajax/logisticsCompany_view.htm?t="
												+ date + "&companyId="
												+ companyId);
					});
	$("#dialog-logisticscompany").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});

	new showLogisticsInfo();
	
	$("select[name='logisticsCompanyId']").change(function() {
		new showLogisticsInfo();
	});
});
function showLogisticsInfo() {
	var companyId = $("#preInputForm select[name='logisticsCompanyId']").val();
	if ($.trim(companyId) == "") {
		$("#logistics-info-div").empty();
	} else {
		$("#logistics-info-div")
				.load(
						appServer
								+ "/listing/delivery/buyer/ajax/logisticsCompany_view.htm?&companyId="
								+ companyId);
	}

}