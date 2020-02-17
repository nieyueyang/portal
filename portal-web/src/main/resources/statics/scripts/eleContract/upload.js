// 上传文件
function upload() {
		var str = new Array();
		var inputlist = document.getElementsByTagName("input");
		var j = 0;
		for (i = 0; i < inputlist.length; i++) {
			if (inputlist[i].type == "file") {
				str[j] = inputlist[i].name;
				j++;
			}
		}
		jQuery.ajaxFileUpload({
			type : "POST", // 提交方式
			url : 'manyFileUpload.htm',
			secureuri : false,
			dataType : 'json',
			fileElementId : str,
			success : function(data, status) {
				$("#up").attr("style", "color:gray");
				$("#up").attr("disabled", "disabled");
				if (null != data && "" != data) {
					$("#project_document").html(
							"&nbsp;&nbsp;&nbsp;&nbsp;操作提示：上传成功");
					$("#contractPath").html(data);
				} else {
					$("#project_document").html(
							"&nbsp;&nbsp;&nbsp;&nbsp;操作提示：上传失败，请检查文件格式");
					$("#up").removeAttr("style");
					$("#up").removeAttr("disabled");
				}
			},
			error : function(data, status, e) {
				dialog({
					title : '',
					content : '系统报错，稍后重试！' + e,
					ok : function() {
					},
					cancel : false
				}).show();
			}
		});
}

function trim(str, is_global) {
	var result;
	result = str.replace(/(^\s+)|(\s+$)/g, "");
	if (is_global.toLowerCase() == "g") {
		result = result.replace(/\s/g, "");
	}
	return result;
}

function change(obj) {
	var src = obj.target || window.event.srcElement; // 获取事件源，兼容chrome/IE
	var filename = src.value;
	src.previousSibling.previousSibling.value = filename.substring(filename
			.lastIndexOf('\\') + 1);
}



function checkAndUpload() {
	var contractNo = $("#contractNo").val();
	if (null != contractNo && "" != contractNo) {
		jQuery.ajax({
			type : "post",
			url : "ajax/checkContractNo.htm",
			data : "contractNo=" + contractNo,
			success : function(result) {
				if (result) {
					alert("已经存在此订单的合同，无法上传！");
					$("#up").removeAttr("style");
					$("#up").removeAttr("disabled");
				}else{
					upload();
				}
			}
		})
	}else{
		alert("请填写订单号");
		$("#up").removeAttr("style");
		$("#up").removeAttr("disabled");
	}
}
