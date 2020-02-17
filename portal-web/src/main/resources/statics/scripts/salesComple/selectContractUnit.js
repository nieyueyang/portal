//弹窗打开后页面使用
jQuery(function() {
		jQuery("#unit0").bigAutocomplete({
			width : 250,
			data : _contractUnit,
			callback : function(data) {
			}
		});
})

//新增一行
var i = 0;
function addtr(obj) {
	if (i > 8) {
		alert("最多添加8个合同单位");
		return false;
	}
	var checkNull = $("#unit" + i).val();
	var tr = "";
	if (null == checkNull || "" == checkNull) {
		alert("请先选择合同单位后再选择新增!");
	} else {
		i++;
		tr = "<tr><td class=\"w300\" align=\"center\">"
				+ "<input type=\"text\" class=\"inpt w250\" id=\"unit"+i+ "\" style=\"height:21px\"/>&nbsp;"
				+ "<input type=\"button\" class=\"button-4 ml10\" value=\"删除\" onclick=\"removeTr(this)\"/>"
				+ "</td></tr>"
	}

	$("#conUnitTable").append(tr);
	jQuery("#unit" + i).bigAutocomplete({
		width : 250,
		data : _contractUnit,
		callback : function(data) {
		}
	});
}
//删除一行
function removeTr(obj) {
	// 移除当前行
	$(obj).parent().parent().remove();
	// 刷新下标
	flushIndex();
	i--;
}
// 刷新下标
function flushIndex() {
	// 遍历tr
	$("#conUnitTable").find("tr").each(function(index, element) {
		// 遍历td，
		$(element).find("td").each(function(index1, element1) {
			// 过滤掉 “按钮” 所在的td
				// 获取input
				var inp = $(element1).find("input[type='text']");
				inp[0].id = inp[0].id.replace(/\d+/g, index);
		});
	});
}


function returnChecked(){
	
	var param = "";
	var flag = false;
	// 遍历tr
	$("#conUnitTable").find("tr").each(function(index, element) {
		// 遍历td，
		$(element).find("td").each(function(index1, element1) {
			// 过滤掉 “按钮” 所在的td
				// 获取input
				var inp = $(element1).find("input[type='text']");
				var value = inp[0].value;
				if(null!=value && flag){
					param += ",";
				}
				param += inp[0].value;
				flag = true;
		});
	});
	return param;
}


