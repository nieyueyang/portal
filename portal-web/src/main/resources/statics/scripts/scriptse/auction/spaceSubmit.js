$(function() {
	var spaceId = $("input[name='spaceId']").val();
	// 提交场次的dialog
	$("#spaceSubmitDialog").dialog(
			{
				autoOpen : false,
				bgiframe : true,
				modal : true,
				position : [ 350, 100 ],
				width : 460,
				title : "提交场次",
				buttons : {
					"确认" : function() {
						if($("select[name='contractTemplateId']").val()!=""){
							$('#spaceSubmitForm').submit();
						}else{
							alert("请选择合同模板后提交");
						}
					},
					"取消" : function() {
						location.href = appServer
								+ "/auction/space/seller/detail.htm?spaceId="
								+ spaceId;
					}
				}
			});
	$("#spaceSubmitDialog")
			.bind(
					"dialogopen",
					function(event, ui) {
						$("#spaceSubmitDialog")
								.load(
										appServer
												+ "/auction/space/seller/preSubmitSpace.htm?spaceId="
												+ spaceId + "&t="
												+ new Date().getTime());
					});
	$("#spaceSubmitDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});

	$("#spaceSubmit").click(function() {
		$("#spaceSubmitDialog").dialog("open");
	});

});