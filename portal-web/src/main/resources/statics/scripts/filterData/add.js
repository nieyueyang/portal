var i = 0;
var j = 0;
function add() {
	$("#saveForm").valid();
	if ($("#saveForm").valid()) {
		// 存储表格数据
		var newTr = $("<tr id='" + j + "'></tr>");
		newTr.append("<td align='center' title='" + $("#subName").val()	+ "' class='" + $("#subName").val() + "'>"+ xzzs($("#subName").val(), 10) + "</td>");
		newTr.append("<td align='center' class='" + $("#productLine").val()	+ "'>" + $("#productLine").val() + "</td>");
		newTr.append("<td align='center' class='" + $("#contractUnit").val()+ "'>" + $("#contractUnit").val() + "</td>");
		newTr.append("<td align='center'><a href='javascript:edit(" + j	+ ")'>修改</a>&nbsp;&nbsp<a href='javascript:del(" + j+ ")'>删除</a></td>");
		$("#addData").append(newTr);

		// 存储表单数据
		var newDiv = $("<div id=\"delInput" + j + "\"></div>");
		newDiv.append("<input type='text' name='cfd[" + i+ "].companyId' value='" + $("#companyId").val() + "' />");
		newDiv.append("<input type='text' name='cfd[" + i+ "].productLine' value='" + $("#productLine").val() + "' />");
		newDiv.append("<input type='text' name='cfd[" + i+ "].dataName' value='" + $("#contractUnit").val()+ "' />");
		newDiv.append("<input type='text' name='cfd[" + i+ "].dataType' value='1' />");

		$("#subForm").append(newDiv);
		i++;
		j++;
		$("#saveForm")[0].reset();
	} else {
		alert("带*的必填项不能为空!");
	}
}
// 限制字数
function xzzs(s, len) {
	if (s == "" || s == null || s.length <= len) {
		return s;
	} else {
		return s.substring(0, 7) + "..";
	}
}
function getSubName(obj) {
	var companyId = obj.value;
	var name = '';
	if (companyId == '9580') {
		name = '河钢唐钢';
	} else if (companyId == '9727') {
		name = '河钢邯钢';
	} else if (companyId == '7778') {
		name = '河钢邯宝';
	} else if (companyId == '9193') {
		name = '河钢宣钢';
	} else if (companyId == '9196') {
		name = '河钢承钢';
	} else if (companyId == '1932') {
		name = '河钢舞钢';
	} else if (companyId == '8110') {
		name = '河钢石钢';
	} else if (companyId == '8493') {
		name = '河钢衡板';
	}
	$("#subName").val(name);
}
//刷新隐藏表单的input的name的下标[i]
function flushXb() {
	// 遍历Div
	$("#subForm").find("div").each(function(t, e) {
		// 遍历input
		$(e).find("input").each(function(t1, e1) {
			e1.name = e1.name.replace(/[^\[]+(?=\])/g, t);
		});
	});
	i = $("#subForm").find("div").length;
}

//修改数据
function edit(inx) {
	var tds = $("#" + inx).find("td");
	$(tds).each(function(t, v) {
		if (t < tds.length - 1) {
			$(".s" + t).val($(v).attr("class"));
		}
	});
	$("#" + inx).remove();
	$("#delInput" + inx).remove();
	flushXb();
}
//删除
function del(inx) {
	$("#" + inx).remove();
	$("#delInput" + inx).remove();
	flushXb();
}
function save(){
	if($("#addData").find("tr").length>0){
		$("#subForm").submit();
	}else{
		alert("请先新增数据!");
	}
}
function back(){
	window.location.href="query_list.htm";
}