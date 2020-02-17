var goodsList = [];

function len(s) {
	var l = 0;
	var a = s.split("");
	for ( var i = 0; i < a.length; i++) {
		if (a[i].charCodeAt(0) < 299) {
			l++;
		} else {
			l += 3;
		}
	}
	return l;
}

$(function() {

	var jsonData = $("#goodsJsonData").val();
	if (jsonData != null && jQuery.trim(jsonData) != "") {
		goodsList = JSON.parse(jsonData);
		$("#listTbody").html(getGoodsSelectedTable());
		goodsList = [];
		myGoodsIdList = [];
		receiptIdList = [];
		repushData();
	} else {
		$("#listTbody").html(getGoodsSelectedTable());
	}

	// 浮点数格式
	$.validator
			.addMethod(
					"floatFormat",
					function(value, element) {
						return this.optional(element)
								|| /^((((\+?[1-9][0-9]{0,7})|0)\.[0-9]{1,3})|((\+?[1-9][0-9]{0,7})|0))$/
										.test(value);
					}, "请正确填写此项");

	// 整数格式
	$.validator.addMethod("intFormat", function(value, element) {
		return this.optional(element)
				|| /^(((\+?[1-9][0-9]{0,11})|0))$/.test(value);
	}, "请正确填写此项");

});

/**
 * 得到已选货品table
 * 
 * @returns {String}
 */
function getGoodsSelectedTable() {
	var htmlStr = "";
	var bidType = $("#bidType").val();
	if (goodsList.length > 0) {
		$("#beginPrice").empty();
		$("#bidGrade").empty();
		$("#basePrice").empty();
		if(bidType!=''&&bidType==1){
			$("#beginPrice").append(formatField(goodsList[0].unitPrice));
			$("#bidGrade").append(formatField(goodsList[0].unitPrice));
			$("#basePrice").append(formatField(goodsList[0].unitPrice));
		}else{
			$("#beginPrice").append("元");
			$("#bidGrade").append("元");
			$("#basePrice").append("元");
		}
		$("#unit").val(goodsList[0].unit);
		for ( var i = 0; i < goodsList.length; i++) {
			htmlStr += "<tr name='data' id='";
			htmlStr += "tr" + i + "'";
			if (i % 2 == 0) {
				htmlStr += " class='bg' ";
			}
			htmlStr += ">";
			htmlStr += "<td class='tc' style='display:none;'>"
					+ JSON.stringify(goodsList[i]) + "</td>";
			htmlStr += "<td class='tc'>"
					+ formatField(goodsList[i].varietyName) + "</td>";
			htmlStr += "<td class='tc'>" + formatField(goodsList[i].material)
					+ "</td>";
			htmlStr += "<td class='tc'>" + getSpecification(goodsList[i])
					+ "</td>";
			htmlStr += "<td class='tc'>" + formatField(goodsList[i].weight)+ formatField(goodsList[i].unit) 
					+ "</td>";
			htmlStr += "<td class='tc'>"
					+ formatField(goodsList[i].manufacturer) + "</td>";
			htmlStr += "<td class='tc'>" + formatField(goodsList[i].origin)
					+ "</td>";
			htmlStr += "<td class='tc'>";
			htmlStr += "<span class='button-9'><a href='javascript:editTr(" + i
					+ ");'>编辑</a></span>";
			htmlStr += "<span class='button-9'><a href='javascript:removeTr("
					+ i + ");'>删除</a></span>";
			htmlStr += "<span class='button-9'><a href='javascript:saveMygoods("
					+ i + ");'>存为商品</a></span>";
			htmlStr += "</td>";
			htmlStr += "</tr>"
		}
	} else {
		htmlStr += "<tr><td colspan='9'  align='center'>无记录</td></tr>"
	}
	return htmlStr;
}

function formatField(field) {
	if (typeof (field) == "undefined") {
		return "";
	} else {
		return field
	}
}

/**
 * 删除货品
 * 
 * @param trId
 */
function removeTr(trId) {
	if (confirm("你确定要删除该条记录吗?")) {
		$("#tr" + trId).remove();
		goodsList = [];
		myGoodsIdList = [];
		receiptIdList = [];
		repushData();
		$("#listTbody").html(getGoodsSelectedTable());
	}
}

/**
 * 刷新数据
 */
function repushData() {
	// 重新push
	$("#pieceForm tr[name='data']").each(function() {
		var goodsJson = $(this).children("td").eq(0).html();
		var goods = [];
		if (goodsJson != null && jQuery.trim(goodsJson) != "") {
			goods = JSON.parse(goodsJson);
		}
		goodsList.push(goods);
		if (typeof (goods.myGoodsId) != "undefined" && goods.myGoodsId != "") {
			myGoodsIdList.push(goods.myGoodsId);
		}
		if (typeof (goods.receiptId) != "undefined" && goods.receiptId != "") {
			receiptIdList.push(goods.receiptId);
		}
	})
	var jsonData = JSON.stringify(goodsList);
	$("#goodsJsonData").val(jsonData);
}

/**
 * 生成一个必填的红*符号
 * 
 * @returns {String}
 */
function createRequired() {
	return " <span class=\"red\">*</span> <span class=\"error\"></span>";
}
/**
 * 生成一个error span
 * 
 * @returns {String}
 */
function createErrorSpan() {
	return " <span class=\"error\"></span>";
}

/**
 * 判断是否需要替换td里的内容
 */
function isNeedReplace(obj) {
	var inputType = obj.keyType;
	if (inputType == "CHECKBOX" || inputType == "SELECT"
			|| inputType == "RADIO" || inputType == "TEXT") {
		return true;
	} else {
		return false;
	}
}

function getSpecification(goods) {
	var specification = "";
	if (typeof (goods.thickness) != "undefined" && goods.thickness != "") {
		specification += goods.thickness + "*";
	}
	if (typeof (goods.width) != "undefined" && goods.width != "") {
		specification += goods.width + "*";
	}
	if (typeof (goods.length) != "undefined" && goods.length != "") {
		specification += goods.length + "*";
	}
	if (typeof (goods.varieties) != "undefined" && goods.varieties.length > 0) {
		for ( var i = 0; i < goods.varieties.length; i++) {
			if (goods.varieties[i].varietyGroup == "GG"
					&& goods.varieties[i].groupType == "D")
				specification += goods.varieties[i].varietyTypeValueText + "*";
		}
	}
	return specification.substr(0, specification.length - 1);
}

/**
 * 生成td里的内容
 * 
 * @param obj
 * @param length
 *            字段长度
 * @returns {String}
 */
function createTd(obj, length) {
	var requiredHtml = createRequired();
	var errorHtml = createErrorSpan();
	var appendHtml = "";
	var inputType = obj.keyType;
	var inputCode = obj.keyCode;
	if (inputCode == "manufacuturer") {
		inputCode = "manufacturer";
	}
	var attr_values = obj.text == null ? "" : obj.text.split("\n");
	var requiredAppend = "";
	if (obj.isRequired == "1") {
		requiredAppend = " required";
	}
	if (inputType == "CHECKBOX" || inputType == "SELECT"
			|| inputType == "RADIO") {
		if (inputType == "CHECKBOX") {
			jQuery(attr_values).each(
					function(j) {
						var arrval = attr_values[j] == null ? ""
								: attr_values[j].split("|");
						appendHtml = appendHtml
								+ "<input type=\"checkbox\" name=\""
								+ inputCode + "\" value=\"" + arrval[0]
								+ "\" class=\"form_t" + requiredAppend
								+ "\" /> " + "<span>" + arrval[1] + "</span>";
					});
		} else if (inputType == "SELECT") {
			// 下拉框
			appendHtml = appendHtml + "<select name=\"" + inputCode
					+ "\" class=\"select " + requiredAppend
					+ "\" style=\"width:100px;\">";
			jQuery(attr_values).each(
					function(j) {
						var arrval = attr_values[j] == null ? ""
								: attr_values[j].split("|");
						appendHtml = appendHtml + "<option value=\""
								+ arrval[0] + "\">" + arrval[1] + "</option>";
					});
			appendHtml = appendHtml + "</select>";
		} else if (inputType == "RADIO") {
			// 单选按钮
			jQuery(attr_values).each(
					function(j) {
						var arrval = attr_values[j] == null ? ""
								: attr_values[j].split("|");
						appendHtml = appendHtml
								+ "<input type=\"radio\" name=\"" + inputCode
								+ "\" value=\"" + arrval[0]
								+ "\" class=\"form_t" + requiredAppend
								+ "\" /> " + "<span>" + arrval[1] + "</span>";
					});
		}
	} else {
		appendHtml = appendHtml + "<input type=\"text\" name=\"" + inputCode
				+ "\" maxlength=\"" + length + "\" class=\"inpt"
				+ requiredAppend + "\" />";
	}
	if (obj.isRequired == "1") {
		appendHtml += requiredHtml;
	} else {
		appendHtml += errorHtml;
	}
	return appendHtml;

}