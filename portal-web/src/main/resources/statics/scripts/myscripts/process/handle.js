function handleNode(instanceId, nodeId, nodeCode) {
	var htmlCode = $("#handleDialog").html();
	htmlCode += "<input type='hidden' name='procInstId' value='"+instanceId+"' />";
	htmlCode += "<input type='hidden' name='id' value='"+nodeId+"' />";
	htmlCode += "<input type='hidden' name='nodeCode' value='"+nodeCode+"' />";
	art.dialog({
		id:'setUser',
		title:'处理当前节点',
		lock: true,
		content: "<div id='handleBox'><form name='handleForm' action='' method='post'  enctype='multipart/form-data'>" +htmlCode+ "</form></div>",
		yesFn:function(){
			var handleForm = $("#handleBox").find("form[name='handleForm']");
			var nodeStatus = $("#handleBox").find("select[name='status']").val();
			var detailText = $(handleForm).find("textarea").val();
			var refundAmount =  $("#handleBox").find("input[name='refundAmount']").val();
			var procResult = $("#handleBox").find("input[name='procResult']:checked").val();
			var procResultValue = $("#handleBox").find("input[name='procResult']:checked").val();
			if(detailText.length > 200) {
				$(handleForm).find("textarea").parent().find("span").html("<strong>长度不可超过200！</strong>");
				return false;
			}
			if(procResult == "1" && nodeStatus == "1") {
				if(isNaN(refundAmount) || refundAmount <=0 || refundAmount >= 1000000000000000) {
					$("#handleBox").find("input[name='refundAmount']").next().html("请输入1至一千万亿之间的合法数字！")
					return false;
				}
			}
			if(null == detailText || undefined == detailText || "" == detailText.trim()) {
				if(null != procResult && undefined != procResult && "" != procResult) {
					$(handleForm).find("textarea").parent().find("span").html("<strong>当前节点为最终节点，必须填写详情！</strong>");
					$(handleForm).find("textarea").parent().find("span").append("<br/>");
					return false;
				}
			}
			if(nodeStatus == "1") {
				$(handleForm).attr("action", "passCurrentNode.htm");
			} else if(nodeStatus == "2") {
				if(null == detailText || undefined == detailText || "" == detailText.trim()) {
					$(handleForm).find("textarea").parent().find("span").html("<strong>由于执行终止操作，必须填写详情！</strong>");
					$(handleForm).find("textarea").parent().find("span").append("<br/>");
					return false;
				}
				$(handleForm).attr("action", "endCurrentNode.htm");
			}
			if($("#handleBox").find("input[name='uploadFile']").val() != null && 
					$("#handleBox").find("input[name='uploadFile']").val() != "" &&
					$("#handleBox").find("input[name='uploadFile']").val() != undefined){
				var fileName = $("#handleBox").find("input[name='uploadFile']").val();
				//获取文件后缀名
				var fileExtArr = fileName.split(".");
				var fileExt = fileExtArr[fileExtArr.length - 1];
				if(fileExt!='doc' && fileExt!='docx'){
					$("#handleBox").find("input[name='uploadFile']").parent().find("span").html("<strong>请上传word文档！</strong>");
					return false;
				}
			}
			$(handleForm).submit();
		},
		noFn:function(){}
	});
}

function displayRefundAmount(element) {
	var procResultValue = $("#handleBox").find("input[name='procResult']:checked").val();
	if (procResultValue == "1") {
		$(element).parent().parent().next().show();
	} else {
		$(element).parent().parent().next().hide();
	}
}

function hideProdResult(element) {
	var nextRowContent = $(element).parent().parent().next().children(":first").html();
	var element1 = $("#handleBox").find("input[name='procResult']:checked");
	if(nextRowContent == "异议处理结果：") {
		if($(element).val() == "2") {
			if($(element1).val() == "1") {
				$(element1).parent().parent().next().hide();
			}
			$(element).parent().parent().next().hide();
		} else {
			//$(handleForm).find("textarea").parent().find("span").html("");
			$(element).parent().parent().next().show();
			if($(element1).val() == "1") {
				$(element1).parent().parent().next().show();
			}
		}
		if($(element).val() == "1") {
			$(handleForm).find("textarea").parent().find("span").html("");
		}
	}
}