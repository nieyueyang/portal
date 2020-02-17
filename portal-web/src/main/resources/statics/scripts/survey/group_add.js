var i = 0;
$(function() {
	/**
	 * 新增
	 */
	$("#add").click(function() {
		if($("#saveForm").valid()){
			var code = $("#groupCode").val() ;
			var name = $("#groupName").val() ;
			checkCode(code , name);
		}
	});
	/**
	 * 保存
	 */
	$("#save").click(function (){
		if(null==$("#newForm").find("input").html()){
			art.dialog.alert('先新增后保存');
			return false;
		}
		//alert($("#newForm").html());
		$("#newForm").submit();
	});
	/**
	 * 返回
	 */
	$("#back").click(function() {
		window.location.href = "groupList.htm";
	});
});

function checkCode(groupCode , groupName){
	jQuery.ajax({
			type:"post",
			url:"ajax/checkCode.htm",
			data:"groupCode="+groupCode+"&groupName="+groupName,
			success:function(result){
				console.log(result)
				if(result!='false'){
					$("#groupCode").val("");
					$("#groupName").val("");
					art.dialog.alert(result);
					//art.dialog.alert('小组编码已存在，请重新输入');
				}else{
					var newForm = "<div id=\"delInput" + i + "\">";
					var tr = "<tr id=\"mytr" + i + "\">" // 每行元素
					/*$("#saveForm").find("select").each(function(index, element) {
						//** 子公司 *//*
						if (index == 0) {
							newForm += "<input  value=\"" + $(this).val() + "\" name=\"items[" + i + "].companyId\" >";
							newForm += "<input  value=\"" + $("#companyId").find("option:selected").text() + "\" name=\"items[" + i + "].companyName\" >";
							tr += "<td align='center'>"+ $("#companyId").find("option:selected").text() + "</td>";
						}
						//** 产品类别 *//*
						if (index == 1) {
							newForm += "<input  value=\"" + $(this).val() + "\" name=\"items[" + i + "].productCode\" >";
							newForm += "<input  value=\"" + $("#productCode").find("option:selected").text() + "\" name=\"items[" + i + "].productClass\" >";
							tr += "<td align='center'>"	+ $("#productCode").find("option:selected").text() + "</td>";
						}
					});*/
					$("#saveForm").find("input").each(function(index, element) {
						/** 小组编码 */
						if (index == 0) {
							newForm += "<input  value=\"" + $(this).val() + "\" name=\"items[" + i + "].groupCode\" >";
							tr += "<td align='center'>" + $(this).val()	+ "</td>";
						}
						/** 小组名称 */
						if (index == 1) {
							newForm += "<input  value=\"" + $(this).val() + "\" name=\"items[" + i + "].groupName\" >";
							tr += "<td align='center'>" + $(this).val()	+ "</td>";
						}
					});
					tr += "<td align='center'><a href=\"javascript: deleted("+i+")\">删除</a>&nbsp;&nbsp<a href=\"javascript:modify("+i+")\">修改</a></td></tr>";

					$("#addData").append(tr);
					sortTable('tblSort', 0, 'String');
					$("#newForm").append(newForm);
					/*$("#saveForm").find("select").each(function(index, element) {
						$(this).val("");
					})*/
					$("#saveForm").find("input").each(function(index, element) {
						$(this).val("");
					})
					i++;
				}
			}
		});
}
/**
 * 删除
 */
function deleted(i){
	art.dialog.confirm("确认删除该数据？",function(){
		 $("#mytr"+i).remove();
		 $("#delInput"+i).remove();
		 sortTable('tblSort',0,'string');
	})
}
/**
 * 修改
 */
function modify(a) {
	$("#delInput" + a).find("input").each(function(index, ele) {
		console.log(index + "---" + $(this).val())
		/*if (index == 0) {
			$("#companyId").find("option[value='" + $(this).val().trim() + "']").attr("selected", true);
		} else if (index == 1) {
			$("#productCode").find("option[value='" + $(this).val().trim() + "']").attr("selected", true);
		} else {
			$("#saveForm input:eq(" + (index - 4) + ")").val($(this).val().trim());
		}*/
		if(index == 0){
			$("#saveForm input:eq(0)").val($(this).val().trim());
		}else {
			$("#saveForm input:eq(" + index  + ")").val($(this).val().trim());
		}
	})
	$("#mytr" + a).remove();
	$("#delInput"+a).remove();
	sortTable('tblSort', 0, 'string');
}




/**//***************************************************************************
     * 排序的主方法，有三个形参，STableTd,iCol,sDataType分别为需要排序的表格ID，
     * 需要排序的表格列号，所在列的数据类型（支持int,float,date,string四种数据类型)
     **************************************************************************/
var k = 0;
function sortTable(sTableId, iCol, sDataType) {
	var oTable = document.getElementById(sTableId);// 获取表格的ID
	console.log(oTable);
	var oTbody = oTable.tBodies[0]; // 获取表格的tbody
	console.log(oTbody);
	var colDataRows = oTbody.rows; // 获取tbody里的所有行的引用, 注意rows从tBodies[0]中取
	console.log(colDataRows);
	var aTRs = new Array(); // 定义aTRs数组用于存放tbody里的行
	for (var i = 0; i < colDataRows.length; i++){
		// 依次把所有行放如aTRs数组
		aTRs.push(colDataRows[i]);
	}
	console.log(aTRs);
	/**//*******************************************************************
	     * sortCol属性是额外给table添加的属性，用于作顺反两种顺序排序时的判断，区分 首次排序和后面的有序反转
	     ******************************************************************/
	aTRs.sort(generateCompareTRs(iCol, sDataType));
	console.log(aTRs);
	var oFragment = document.createDocumentFragment(); // 创建文档碎片
	// 把排序过的aTRs数组成员依次添加到文档碎片,
	// 注意是tr是引用的,
	// 所以相当直接把页面的tr拿走,加到了oFragment中
	for (var i = 0; i < aTRs.length; i++) {
		oFragment.appendChild(aTRs[i]);
	}
	oTbody.appendChild(oFragment); // 把文档碎片添加到tbody,完成排序后的显示更新
	oTable.sortCol = iCol; // 把当前列号赋值给sortCol,以此来区分首次排序和非首次排序,//sortCol的默认值为-1
	var arr = [];
	$('#tblSort tr').each(function(i, v) {
		if (i != 0) {
			arr.push($(this).children().eq(7).text().substr(0, 7));
		}
	});
	console.log(arr);
};

// 比较函数，用于两项之间的排序
// 升序
function generateCompareTRs(iCol, sDataType) {
	return function compareTRs(oTR1, oTR2) {
		var v1 = 0;
		var v2 = 0;
		/*if(isNaN(oTR1.cells[iCol].firstChild.nodeValue)){
			alert(1);
			v1 = 1;
		}
		if(isNaN(oTR2.cells[iCol].firstChild.nodeValue)){
			v2 = 1;
		}
		if(!isNaN(oTR1.cells[iCol].firstChild.nodeValue)){
			alert(2);
			v1 = 2;
		}
		if(!isNaN(oTR2.cells[iCol].firstChild.nodeValue)){
			v2 = 2;
		}*/
		if (oTR1.cells[iCol].firstChild.nodeValue == '河钢唐钢') {
			v1 = 1;
		}
		if (oTR2.cells[iCol].firstChild.nodeValue == '河钢唐钢') {
			v2 = 1;
		}
		if (oTR1.cells[iCol].firstChild.nodeValue == '河钢邯钢') {
			v1 = 2;
		}
		if (oTR2.cells[iCol].firstChild.nodeValue == '河钢邯钢') {
			v2 = 2;
		}
		if (oTR1.cells[iCol].firstChild.nodeValue == '河钢邯宝') {
			v1 = 3;
		}
		if (oTR2.cells[iCol].firstChild.nodeValue == '河钢邯宝') {
			v2 = 3;
		}
		if (oTR1.cells[iCol].firstChild.nodeValue == '河钢宣钢') {
			v1 = 4;
		}
		if (oTR2.cells[iCol].firstChild.nodeValue == '河钢宣钢') {
			v2 = 4;
		}
		if (oTR1.cells[iCol].firstChild.nodeValue == '河钢承钢') {
			v1 = 5;
		}
		if (oTR2.cells[iCol].firstChild.nodeValue == '河钢承钢') {
			v2 = 5;
		}
		if (oTR1.cells[iCol].firstChild.nodeValue == '河钢舞钢') {
			v1 = 6;
		}
		if (oTR2.cells[iCol].firstChild.nodeValue == '河钢舞钢') {
			v2 = 6;
		}
		if (oTR1.cells[iCol].firstChild.nodeValue == '河钢石钢') {
			v1 = 7;
		}
		if (oTR2.cells[iCol].firstChild.nodeValue == '河钢石钢') {
			v2 = 7;
		}
		if (oTR1.cells[iCol].firstChild.nodeValue == '河钢衡板') {
			v1 = 8;
		}
		if (oTR2.cells[iCol].firstChild.nodeValue == '河钢衡板') {
			v2 = 8;
		}
		var vValue1 = convert(v1, sDataType);
		var vValue2 = convert(v2, sDataType);

		if (vValue1 < vValue2) {
			return -1;
		} else if (vValue1 > vValue2) {
			return 1;
		} else {
			return 0;
		}
	};
};

// 降序
function generateCompareTRs1(iCol, sDataType) {
	return function compareTRs(oTR1, oTR2) {
		alert(oTR1.cells[iCol].firstChild.nodeValue);
		var v1 = 0;
		var v2 = 0;
		if (oTR1.cells[iCol].firstChild.nodeValue == '河钢唐钢') {
			v1 = 1;
		}
		if (oTR2.cells[iCol].firstChild.nodeValue == '河钢唐钢') {
			v2 = 1;
		}
		if (oTR1.cells[iCol].firstChild.nodeValue == '河钢邯钢') {
			v1 = 2;
		}
		if (oTR2.cells[iCol].firstChild.nodeValue == '河钢邯钢') {
			v2 = 2;
		}
		if (oTR1.cells[iCol].firstChild.nodeValue == '河钢邯宝') {
			v1 = 3;
		}
		if (oTR2.cells[iCol].firstChild.nodeValue == '河钢邯宝') {
			v2 = 3;
		}
		if (oTR1.cells[iCol].firstChild.nodeValue == '河钢宣钢') {
			v1 = 4;
		}
		if (oTR2.cells[iCol].firstChild.nodeValue == '河钢宣钢') {
			v2 = 4;
		}
		if (oTR1.cells[iCol].firstChild.nodeValue == '河钢承钢') {
			v1 = 5;
		}
		if (oTR2.cells[iCol].firstChild.nodeValue == '河钢承钢') {
			v2 = 5;
		}
		if (oTR1.cells[iCol].firstChild.nodeValue == '河钢舞钢') {
			v1 = 6;
		}
		if (oTR2.cells[iCol].firstChild.nodeValue == '河钢舞钢') {
			v2 = 6;
		}
		if (oTR1.cells[iCol].firstChild.nodeValue == '河钢石钢') {
			v1 = 7;
		}
		if (oTR2.cells[iCol].firstChild.nodeValue == '河钢石钢') {
			v2 = 7;
		}
		if (oTR1.cells[iCol].firstChild.nodeValue == '河钢衡板') {
			v1 = 8;
		}
		if (oTR2.cells[iCol].firstChild.nodeValue == '河钢衡板') {
			v2 = 8;
		}

		var vValue1 = convert(v1, sDataType);
		var vValue2 = convert(v2, sDataType);
		if (vValue1 > vValue2) {
			return -1;
		} else if (vValue1 < vValue2) {
			return 1;
		} else {
			return 0;
		}
	};
};
// 数据类型转换函数
function convert(sValue, sDataType) {
	switch (sDataType) {
		case "int" :
			return parseInt(sValue);
		case "float" :
			return parseFloat(sValue);
		case "date" :
			return new Date(Date.parse(sValue));
		default :
			return sValue.toString();
	}
};