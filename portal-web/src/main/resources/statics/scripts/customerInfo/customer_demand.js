var i = 1;
// 新增一行
function addtr(obj,type) {
	var form = $("#saveForm").validate();
	if (!form.form()) {
		return false;
	}
	if (i > 10) {
		alert("一次最多只能新增10条记录!");
		return false;
	}
	$(":input").attr("readonly", "readonly");
	var ind = 0;
	if(type==1){
		$(obj).attr("value", "删除");
		$(obj).attr("onclick", "removeTr(this,'1')");
		ind = i;
		var tr = "<tr >"
			+"<td class=\"cen w120\"><input type=\"text\" class=\"{required:true,messages:{required:'*'}} inpt w150\" id=\"demandList["+ind+"].varietyName\" name=\"demandList["+ind+"].varietyName\"  /></td>"
			+"<td class=\"cen w120\"><input type=\"text\" class=\"{required:true,number:true,messages:{required:'*',number:''}} inpt w150\" id=\"demandList["+ind+"].annualDemand\" name=\"demandList["+ind+"].annualDemand\"/></td>"
			+"<td class=\"cen w120\"><input type=\"text\"  name=\"demandList["+ind+"].varietyProportion\" class=\"inpt w150\"/></td>"
			+"<td class=\"cen w120\"><input type=\"text\"  name=\"demandList["+ind+"].majorBrand\" class=\"inpt w150\"/></td>"
			+"<td class=\"width:200px\">" 
			+"<textarea name=\"demandList["+ind+"].purchasingStrategy\"></textarea>"
			+"</td>"
			+"<td class=\"cen\"><input type=\"button\" id=\"saveBtn\" class=\"button-4\" value=\"新增\" onclick=\"addtr(this,"+type+")\"/></td></tr>"
			i++;
	}else{
		//$(obj).remove();
		ind = _index;
		var tr = "<tr >"
			+"<td class=\"cen w120\"><input type=\"text\" class=\"{required:true,messages:{required:'*'}} inpt w150\" id=\"demandList["+ind+"].varietyName\" name=\"demandList["+ind+"].varietyName\"  /></td>"
			+"<td class=\"cen w120\"><input type=\"text\" class=\"{required:true,number:true,messages:{required:'*',number:''}} inpt w150\" id=\"demandList["+ind+"].annualDemand\" name=\"demandList["+ind+"].annualDemand\"/></td>"
			+"<td class=\"cen w120\"><input type=\"text\"  name=\"demandList["+ind+"].varietyProportion\" class=\"inpt w150\"/></td>"
			+"<td class=\"cen w120\"><input type=\"text\"  name=\"demandList["+ind+"].majorBrand\" class=\"inpt w150\"/>"
			+"<td class=\"width:200px\">" 
			+"<textarea name=\"demandList["+ind+"].purchasingStrategy\"></textarea>"
			+"</td>"
			+"<td class=\"cen w120\">"
			+"<input type=\"button\" id=\"deleteBtn\" class=\"button-4\" value=\"删除\" onclick=\"removeTr(this,"+type+")\"/></td>"
			+"</tr> "
			_index++;
	}
	
		$("#demandTable").append(tr);
	
}

//删除一行
function removeTr(obj,type) {
	// 移除当前行
	$(obj).parent().parent().remove();
	// 刷新下标
	flushIndex();
	if(type==1){
		i--;
	}else{
		_index--;
	}
}
// 刷新下标
function flushIndex() {
	// 遍历tr
	$("#demandTable").find("tr:gt(0)").each(function(index, element) {
		// 遍历td，
		$(element).find("td").each(function(index1, element1) {
			// 过滤掉 “按钮” 所在的td
			if (index1 < 4) {
				// 获取input
				var inp = $(element1).find("input[type='text']");
				inp[0].name = inp[0].name.replace(/[^\[]+(?=\])/g, index);
			}else if(index1 == 4){
				var area = $(element1).find("textarea");
				area[0].name = area[0].name.replace(/[^\[]+(?=\])/g, index);
				console.log(area);
			}else{
				
			}
			;
		});
	});

}
//下一步
function next_step(obj) {
	var form = $("#saveForm").validate();
	if (!form.form()) {
		return false;
	} else {
		obj.submit();
	}
}
//跳过
function jump_over(){
	var infoId = $("#customerInformationId").val();
	var url = "jumpOver.htm?infoId=";
	window.location.href = url+infoId;
}

function miss(infoId){
	window.location.href = "miss.htm?infoId="+infoId;
}
function deleteTr(obj,id){
	$.ajax({ 
		 type: "POST",
         url: "deleteById.htm?id="+id,
         success: function(){
		  		//先清空
        	 removeTr(obj,'2');
        	 flushIndex();
         }
      });
	
}

