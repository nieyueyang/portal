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
	var ind=0;
	var tr = "";
	if(type==1){
		//$(":input").attr("readonly", "readonly");
		//$(obj).attr("value", "删除");
		//$(obj).attr("onclick", "addtr(this,'1')");
		ind = i;
		tr = "<tr>" 
			+"<td class=\"cen\">" +
			"<input type=\"hidden\"  name=\"items["+ind+"].varietyCode\"/>"+
			"<input type=\"text\" class=\"{required:true,messages:{required:' 必填'}} inpt w150\" name=\"items["+ind+"].varietyName\" readonly   onclick=\"showPrjTypeSel(this); return false;\"/>" +
			"</td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,messages:{required:' 必填'}} inpt w150\" name=\"items["+ind+"].attribute\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,checkNum:true,messages:{required:' 必填',checkNum:'请输入合法数字'}} inpt w150\" name=\"items["+ind+"].orderNumm\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,checkNum:true,messages:{required:' 必填',checkNum:'请输入合法数字'}} inpt w150\" name=\"items["+ind+"].price\" /></td>"
			+"<td><input type=\"button\" id=\"deleteBtn\" class=\"button-4\" value=\"删除\" onclick=\"removeTr(this,"+type+")\"/></td>"
			+"</tr> "
			i++;
	}else{		
		//$(obj).remove();
		ind= _index;
		tr = "<tr>" 
			+"<td class=\"cen\">" +
			"<input type=\"hidden\"  name=\"items["+ind+"].varietyCode\"/>"+
			"<input type=\"text\" class=\"{required:true,messages:{required:' 必填'}} inpt w150\" name=\"items["+ind+"].varietyName\" readonly   onclick=\"showPrjTypeSel(this); return false;\"/>" +
			"</td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,messages:{required:' 必填'}} inpt w150\" name=\"items["+ind+"].attribute\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,checkNum:true,messages:{required:' 必填',checkNum:'请输入合法数字'}} inpt w150\" name=\"items["+ind+"].orderNumm\"/></td>"
			+"<td class=\"cen\"><input type=\"text\" class=\"{required:true,checkNum:true,messages:{required:' 必填',checkNum:'请输入合法数字'}} inpt w150\" name=\"items["+ind+"].price\" /></td>"
			+"<td><input type=\"button\" id=\"deleteBtn\" class=\"button-4\" value=\"删除\" onclick=\"removeTr(this,"+type+")\"/></td>"
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
		console.log(index);
		// 遍历td，
		$(element).find("td").each(function(index1, element1) {
			// 过滤掉 “按钮” 所在的td
			if (index1 < 4) {
				// 获取input
				var inp = $(element1).find("input[type='text']");
				if((inp[0].name).indexOf("varietyName")!=-1){
					$(inp[0]).prev('input').attr("name","items["+index+"].varietyCode");
				}
				inp[0].name = inp[0].name.replace(/[^\[]+(?=\])/g, index);
			}
			;
		});
	});

}


function subForm(obj) {
	var form = $("#saveForm").validate();
	if (!form.form()) {
		return false;
	} else {
		obj.submit();
	}
}

function obl(v){
	$("#forwardCompanyName").val(v);
	$("#payCompanyName").val(v);
	$("#receivingParty").val(v);
	$("#endUserName").val(v);
}

jQuery.validator.addMethod("checkNum", function(value, element) {
	var pattern = /^[0-9]+(.[0-9]{0,3})?$/;
	if (value != '') {
		if (!pattern.exec(value)) {
			return false;
		}
	}
	return true;
}, "请输入合法数字");

jQuery.validator
		.addMethod(
				"checkMobile",
				function(value, element) {
					var length = value.length;
					var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
					return this.optional(element)
							|| (length == 11 && mobile.test(value));
				}, "请正确填写您的手机号码");




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
         }
      });
	
}
