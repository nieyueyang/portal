var i = 1;
// 新增一行
//type:1:新增页面；2：修改页面
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
	
	var ind=0;
	if(type==1){
		$(obj).attr("value", "删除");
		$(obj).attr("onclick", "removeTr(this,'1')");
		ind = i;
		var tr = "<tr>" 
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,messages:{required:'*'}} inpt w120\" name=\"contactsList["+ind+"].name\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,messages:{required:'*'}} inpt w120\" name=\"contactsList["+ind+"].department\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,messages:{required:'*'}} inpt w120\" name=\"contactsList["+ind+"].post\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,checkTel:true,messages:{required:'*',checkTel:' 格式错误'}} inpt w120\" name=\"contactsList["+ind+"].fixedTelephone\" placeholder=\"格式:xxx/xxxx-xxxxxxxx\" /></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,checkMobile:true,messages:{required:'*',checkMobile:' 格式错误'}} inpt w120\" name=\"contactsList["+ind+"].phoneNumber\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:false,email:true,messages:{email:' 格式错误'}} inpt w120\"  name=\"contactsList["+ind+"].email\"/></td>"
			+"<td><input type=\"button\" id=\"saveBtn\" class=\"button-4\" value=\"新增\" onclick=\"addtr(this,"+type+")\"/></td>"
			+"</tr> "
			i++;
	}else{		
		//$(obj).remove();
		ind= _index;
		var tr = "<tr>" 
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,messages:{required:'*'}} inpt w120\" name=\"contactsList["+ind+"].name\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,messages:{required:'*'}} inpt w120\" name=\"contactsList["+ind+"].department\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,messages:{required:'*'}} inpt w120\" name=\"contactsList["+ind+"].post\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,checkTel:true,messages:{required:'*',checkTel:' 格式错误'}} inpt w120\" name=\"contactsList["+ind+"].fixedTelephone\" placeholder=\"格式:xxx/xxxx-xxxxxxxx\" /></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,checkMobile:true,messages:{required:'*',checkMobile:' 格式错误'}} inpt w120\" name=\"contactsList["+ind+"].phoneNumber\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:false,email:true,messages:{required:'*',email:' 格式错误'}} inpt w120\"  name=\"contactsList["+ind+"].email\"/></td>"
			+"<td>"
			+"<input type=\"button\" id=\"deleteBtn\" class=\"button-4\" value=\"删除\" onclick=\"removeTr(this,"+type+")\"/></td>"
			+"</tr> "
			_index++;
	}
		
	$("#contactTable").append(tr);
	
}
// 删除一行
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
	$("#contactTable").find("tr:gt(0)").each(function(index, element) {
		// 遍历td，
		$(element).find("td").each(function(index1, element1) {
			
			// 过滤掉 “按钮” 所在的td
			if (index1 < 6) {
				// 获取input
				var inp = $(element1).find("input[type='text']");
				inp[0].name = inp[0].name.replace(/[^\[]+(?=\])/g, index);
			}
			;
		});
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

jQuery.validator
		.addMethod(
				"checkMobile",
				function(value, element) {
					var length = value.length;
					var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
					return this.optional(element)
							|| (length == 11 && mobile.test(value));
				}, "请正确填写您的手机号码");


function next_step(obj) {
	var form = $("#saveForm").validate();
	if (!form.form()) {
		return false;
	} else {
		obj.submit();
	}
}

function jump_over(){
	var infoId = $("#customerInformationId").val();
	var url = "jumpOver.htm?infoId=";
	window.location.href = url+infoId;
}

function miss(infoId){
	window.location.href ="miss.htm?infoId="+infoId;
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
