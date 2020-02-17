var i = 1;
//新增一行

function addtr(obj,type){
	var form = $("#saveForm").validate();
	 if(!form.form()){
		return false; 
	 }
	if(i>10){
		alert("一次最多只能新增10条记录!");
		return false;
	}
 	$(":input").attr("readonly","readonly");
 	
 	var ind = 0;
 	if(type ==1){
 		$(obj).attr("value","删除");
 	 	$(obj).attr("onclick","removeTr(this,\"1\")");
 	 	ind = i;
 	 	var tr ="<tr>"
 	 		+"<td class=\"cen\"><select  class=\"{required:true,messages:{required:''}} inpt w120\" id=\"teamList["+ind+"].teamPosition\" name=\"teamList["+ind+"].teamPosition\" style=\"width:120px\"  onchange=\"changeName(this)\"><option value=\"\">请选择</option><option value=\"1\">客户经理</option><option value=\"2\">客户代表</option><option value=\"3\">业务支撑</option></select></td>"
 	 		+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,messages:{required:' *'}} inpt w120  name\" name=\"teamList["+ind+"].name\"  AUTOCOMPLETE=\"off\"   style=\"height:17px;width:120px;border:1px solid #f1bd62\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,messages:{required:' *'}} inpt w120\" name=\"teamList["+ind+"].workUnit\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,messages:{required:' *'}} inpt w120\" name=\"teamList["+ind+"].unitPosition\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" placeholder=\"格式:xxxx-xxxxxxxx\" class=\"{required:true,checkTel:true,messages:{required:'*',checkTel:''}} inpt w120\" name=\"teamList["+ind+"].workPhone\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,checkMobile:true,messages:{required:'*',checkMobile:' 格式错误'}} inpt w120\"  name=\"teamList["+ind+"].phoneNumber\"/></td>"
			+"<td ><input type=\"button\" id=\"saveBtn\" class=\"button-4\" value=\"新增\" onclick=\"addtr(this,"+type+")\"/></td>"
			+"</tr>"
			i++;
 	}else{
 		//$(obj).remove();
 		ind = _index;
 		var tr ="<tr>"
 			+"<td class=\"cen\"><select  class=\"{required:true,messages:{required:''}} inpt w120\" id=\"teamList["+ind+"].teamPosition\" name=\"teamList["+ind+"].teamPosition\" style=\"width:120px\"  onchange=\"changeName(this)\"><option value=\"\">请选择</option><option value=\"1\">客户经理</option><option value=\"2\">客户代表</option><option value=\"3\">业务支撑</option></select></td>"
 			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,messages:{required:' *'}} inpt w120 name\" name=\"teamList["+ind+"].name\"  AUTOCOMPLETE=\"off\"   style=\"height:17px;width:120px;border:1px solid #f1bd62\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,messages:{required:' *'}} inpt w120\" name=\"teamList["+ind+"].workUnit\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,messages:{required:' *'}} inpt w120\" name=\"teamList["+ind+"].unitPosition\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" placeholder=\"格式:xxxx-xxxxxxxx\" class=\"{required:true,checkTel:true,messages:{required:'*',checkTel:''}} inpt w120\" name=\"teamList["+ind+"].workPhone\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,checkMobile:true,messages:{required:'*',checkMobile:' 格式错误'}} inpt w120\"  name=\"teamList["+ind+"].phoneNumber\"/></td>"
			+"<td class=\"cen\">"
			+"<input type=\"button\" id=\"deleteBtn\" class=\"button-4\" value=\"删除\" onclick=\"removeTr(this,"+type+")\"/></td>"
			+"</tr>"
			_index++;
 	}
	$("#teamTable").append(tr);
}
//删除一行
function removeTr(obj,type) {
		//移除当前行
		$(obj).parent().parent().remove();
		//刷新下标
		flushIndex();
		if(type ==1){
			i--;
		}else{
			_index--;
		}
}
//刷新下标
function flushIndex(){
	//遍历tr
	$("#teamTable").find("tr:gt(0)").each(function(index,element){
		//遍历td，
			$(element).find("td").each(function(index1,element1){
				//过滤掉  “按钮” 所在的td
				if(index1==0){
					var inp= $(element1).find("select");
					inp[0].name = inp[0].name.replace(/[^\[]+(?=\])/g, index);
				}else if(index1<6&&index>0){
					//获取input
					var inp= $(element1).find("input[type='text']");
					inp[0].name = inp[0].name.replace(/[^\[]+(?=\])/g, index);
				}
				//if(index1!=6){
					//获取input
					///var inp= $(element1).find("input[type='text']");
				//	inp[0].name = inp[0].name.replace(/[^\[]+(?=\])/g, index);
				//};
			});
	  });
	
}


function save_step(obj){
	var form = $("#saveForm").validate();
	if(!form.form()){
		return false; 
	 }else{
		 obj.submit();
	 }
}

function clear_step(){
	   window.location.href="about:blank";
	   window.opener = null;
	   window.open("", "_self");
	   window.close();
}

function deleteTr(obj,id){
	$.ajax({ 
		 type: "POST",
         url: "deleteById.htm?id="+id,
         success: function(){
		  		//先清空
        	 removeTr(obj,'2');
         }
      });
	
}

jQuery.validator.addMethod("checkTel", function(value, element) {
	var pattern = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
	if (value != '') {
		if (!pattern.exec(value)) {
			return false;
		}
	}
	return true;
}, "请输入有效的固定电话");

function miss(){
	window.location.href="miss.htm";
}

jQuery.validator
		.addMethod(
				"checkMobile",
				function(value, element) {
					var length = value.length;
					var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
					return this.optional(element)
							|| (length == 11 && mobile.test(value));
				}, "请正确填写您的手机号码");


