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
		$(obj).attr("onclick", "removeTr(this,\"1\")");
		ind = i;
		var tr = "<tr>"
			+"<td class=\"cen w95\"> <select  class=\"{required:true,messages:{required:' *'}} inpt w95\"  style=\"width:71px\" name = \"cooperationList["+ind+"].year\" ><option value=\"\">请选择</option>"
			 +	"<option value="+list[0]+">"+list[0]+"</option>" 
			 +	"<option value="+list[1]+">"+list[1]+"</option>" 
			 +	"<option value="+list[2]+">"+list[2]+"</option>" 
			 +			"</select>  </td>"
			  +"<td class=\"cen w95\"><input class=\"{required:true,messages:{required:'*'}} inpt w75\" style=\"width:75px\"   name = \"cooperationList["+ind+"].varietyName\"  type=\"text\" /></td>"
		      +"<td class=\"cen w90\"><input class=\"{required:true,messages:{required:'*'}} inpt w80\"  name = \"cooperationList["+ind+"].requirement\"  type=\"text\"/></td>"
		      +"<td class=\"cen w90\"><input class=\"{required:true,messages:{required:'*'}} inpt w80\"  name = \"cooperationList["+ind+"].supplyQuantity\"  type=\"text\" /></td>"
		      +"<td class=\"cen w95\"><input class=\"{number:true,messages:{number:''}} inpt w85\"  name = \"cooperationList["+ind+"].supplyRatio\"  type=\"text\" /></td>"
		      +"<td class=\"cen w95\"><input class=\"{required:true,messages:{required:'*'}} inpt w85\" name = \"cooperationList["+ind+"].nextYearDemand\"  type=\"text\" /></td>"
		      +"<td class=\"cen w95\"><input class=\"{required:true,messages:{required:'*'}} inpt w85\" name = \"cooperationList["+ind+"].targetSupplyQuantity\"  type=\"text\" /></td>"
		      +"<td class=\"cen w95\"><input class=\"{number:true,messages:{number:''}} inpt w85\" name = \"cooperationList["+ind+"].nextYeaySupplyRatio\"  type=\"text\" /></td>"
		      +"<td class=\"cen w95\"><input class=\"{number:true,messages:{number:''}} inpt w85\" name = \"cooperationList["+ind+"].protocolQuantity\"  type=\"text\" /></td>"
		      +"<td class=\"cen w95\"><input class=\"inpt w85\" name = \"cooperationList["+ind+"].competitorName\"  type=\"text\" /></td>"
		      +"<td class=\"cen w95\"><input class=\"inpt w85\" name = \"cooperationList["+ind+"].competitorSupplyQuantity\"  type=\"text\" /></td>"
		      +"<td class=\"cen w105\"><input class=\"{number:true,messages:{number:''}} inpt w85\" name = \"cooperationList["+ind+"].competitorSupplyRatio\"  type=\"text\" /></td>"
			  +"<td class=\"cen w70\">"
				 +"<input type=\"button\" id=\"saveBtn\" class=\"button-4\" value=\"新增\" onclick=\"addtr(this,"+type+")\"/> "
		      +"</td>"
		      +"</tr>"
		      i++;
	}else{
		//$(obj).remove();
		ind = _index;
		var tr = "<tr>"
			+"<td class=\"cen w95\"> <select  class=\"{required:true,messages:{required:' *'}} inpt w95\"  style=\"width:71px\" name = \"cooperationList["+ind+"].year\" ><option value=\"\">请选择</option>"
			 +	"<option value="+list[0]+">"+list[0]+"</option>" 
			 +	"<option value="+list[1]+">"+list[1]+"</option>" 
			 +	"<option value="+list[2]+">"+list[2]+"</option>" 
			 +			"</select>  </td>"
			  +"<td class=\"cen w95\"><input class=\"{required:true,messages:{required:'*'}} inpt w75\" style=\"width:75px\"  name = \"cooperationList["+ind+"].varietyName\"  type=\"text\" /></td>"
		      +"<td class=\"cen w90\"><input class=\"{required:true,messages:{required:'*'}} inpt w80\"  name = \"cooperationList["+ind+"].requirement\"  type=\"text\"/></td>"
		      +"<td class=\"cen w90\"><input class=\"{required:true,messages:{required:'*'}} inpt w80\"  name = \"cooperationList["+ind+"].supplyQuantity\"  type=\"text\" /></td>"
		      +"<td class=\"cen w95\"><input class=\"{number:true,messages:{number:''}} inpt w85\"  name = \"cooperationList["+ind+"].supplyRatio\"  type=\"text\" /></td>"
		      +"<td class=\"cen w95\"><input class=\"{required:true,messages:{required:'*'}} inpt w85\" name = \"cooperationList["+ind+"].nextYearDemand\"  type=\"text\" /></td>"
		      +"<td class=\"cen w95\"><input class=\"{required:true,messages:{required:'*'}} inpt w85\" name = \"cooperationList["+ind+"].targetSupplyQuantity\"  type=\"text\" /></td>"
		      +"<td class=\"cen w95\"><input class=\"{number:true,messages:{number:''}} inpt w85\" name = \"cooperationList["+ind+"].nextYeaySupplyRatio\"  type=\"text\" /></td>"
		      +"<td class=\"cen w95\"><input class=\"{number:true,messages:{number:''}} inpt w85\" name = \"cooperationList["+ind+"].protocolQuantity\"  type=\"text\" /></td>"
		      +"<td class=\"cen w95\"><input class=\"inpt w85\" name = \"cooperationList["+ind+"].competitorName\"  type=\"text\" /></td>"
		      +"<td class=\"cen w95\"><input class=\"inpt w85\" name = \"cooperationList["+ind+"].competitorSupplyQuantity\"  type=\"text\" /></td>"
		      +"<td class=\"cen w105\"><input class=\"{number:true,messages:{number:''}} inpt w85\" name = \"cooperationList["+ind+"].competitorSupplyRatio\"  type=\"text\" /></td>"
			  +"<td class=\"cen w70\">"
				
		      +"<input type=\"button\" id=\"deleteBtn\" class=\"button-4\" value=\"删除\" onclick=\"removeTr(this,"+type+")\"/></td>"
		      +"</tr>"
		      _index++;
	}
      $("#cooperationTable").append(tr);
}

//删除一行
function removeTr(obj,type) {
	// 移除当前行
	$(obj).parent().parent().remove();
	// 刷新下标
	flushIndex();
	if(type == 1){
		i--;
	}else{
		_index--;
	}
}
// 刷新下标
function flushIndex() {
	// 遍历tr
	$("#cooperationTable").find("tr:gt(0)").each(function(index, element) {
		// 遍历td，
		$(element).find("td").each(function(index1, element1) {
			// 过滤掉 “按钮” 所在的td
			if (0==index1) {
				// 获取input
				var inp = $(element1).find("select");
				inp[0].name = inp[0].name.replace(/[^\[]+(?=\])/g, index);
				console.log(index);
			}
			if (index1 <11&&0<index1) {
				// 获取input
				var inp = $(element1).find("input[type='text']");
				inp[0].name = inp[0].name.replace(/[^\[]+(?=\])/g, index);
				console.log(index);
			}
			;
		});
	});
}


function next_step(obj) {
	var form = $("#saveForm").validate();
	if (!form.form()) {
		return false;
	} else {
		obj.submit();
	}
}

function miss(infoId){
	window.location.href = "miss.htm?infoId="+infoId;
}

function jump_over(){
	var infoId = $("#customerInformationId").val();
	var url = "jumpOver.htm?infoId=";
	window.location.href = url+infoId;
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
