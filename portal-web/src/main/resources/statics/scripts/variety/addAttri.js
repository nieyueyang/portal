function   trim(str)  {return   str.replace(/(^\s*)|(\s*$)/g, "");}  //去掉首尾空格
function   replaceSpace(str)  {return   str.replace(/\s*/g, "");}  //去掉所有空格

function isEmpty(v){
	if(undefined==v || "undefined"==v){return true;}
	if(/^\s*$/g.test(v)){
		return true;
	}else{
		return false;
	}
}

function isNumber(v){
	//var reg = /^\d+$/;
	if(undefined==v || "undefined"==v){return false;}
	if(/^\d+$/g.test(v)){
		return true;
	}else{
		return false;
	}
}

/**
 * 预设值格式
 * */
jQuery.validator.addMethod("textFormat", function(value, element) {
	var ktype = $("#keyType").val();
	if(ktype=="checkbox" || ktype=="CHECKBOX" || ktype=="radio" || ktype=="RADIO" || ktype=="select" || ktype=="SELECT"){
		if(isEmpty(value))
			return false;
		else{
			var flag = true;
			value = trim(value);
			var arrayV = value == null? "": value.split("\n");
			var formatAV = new Array(); //格式化后的预设值
			var keyArray = new Array();
			var errorArry = new Array();
			jQuery(arrayV).each(function(i){
				var e = replaceSpace(arrayV[i]);
				if(isEmpty(e)==false){
					var arrayE = e.split("|");
					var lengthE = arrayE.length;
					if(lengthE==1){ 
						if(isEmpty(arrayE[0]) || arrayE[0].length > 20){
							errorArry[errorArry.length] = "\""+e+"\"，预设值必填且不允许超过20个字符;";
							flag = false;
						}
						if(isEmpty(keyArray[arrayE[0]])==false){
							errorArry[errorArry.length] = "\""+e+"\"，code重复";
							flag = false;
						}
						formatAV[formatAV.length] = e+"|"+e;
						keyArray[arrayE[0]]=arrayE[0];
					}else if(lengthE==2){  //code和name相同
						if(isEmpty(arrayE[0]) || arrayE[0].length > 20 || arrayE[1].length > 20){
							errorArry[errorArry.length] = "\""+e+"\"，预设值必填且不允许超过20个字符;";
							flag = false;
						}
						if(isEmpty(keyArray[arrayE[0]])==false){
							//alert("预设值code不允许重复！但code：\""+arrayE[0]+"\"重复！");
							errorArry[errorArry.length] = "\""+e+"\"，code重复;";
							flag = false;
						}
						if(isEmpty(arrayE[1])){
							arrayE[1] = arrayE[0];
						}
						formatAV[formatAV.length] = arrayE[0]+"|"+arrayE[1];
						keyArray[arrayE[0]]=arrayE[0];
					}else{
						errorArry[errorArry.length] = "\""+e+"\"，预设值里面只允许包含0个或1个'|';";
						flag = false;
					}
				}
			});
			if(flag==false){
				alert(errorArry.join("\n")+"\n\n以上几行数据错误！");
			}
			$("#text").val(formatAV.join("\n"));
			//var reg = /^[a-zA-Z0-9\*\-\#_—\u4e00-\u9fa5]+(\|)[a-zA-Z0-9\*\-\#_—\u4e00-\u9fa5]+([\r\n][a-zA-Z0-9\*\-\#_—\u4e00-\u9fa5]+(\|)[a-zA-Z0-9\*\-\#_—\u4e00-\u9fa5]+)*$/;
			return  flag; //this.optional(element) ||
		}
	}else{
		$("#text").val(value);
		/*if(isEmpty(value)==false && value.length>20){
			alert("预设值长度不能超过20");
			return false;
		}else*/
			return true;
	}
	
}, "请输入符合要求的预设值");

$(document).ready(function(){
    //jQuery.metadata.setType("attr", "validate");
    /** js验证 */
    jQuery.validator.setDefaults({
        submitHandler: function(form) {
        	var r = getValidateValue();
        	if(r==true){
        		$("#submitBtn").attr("disabled", true).attr("value","正在提交...");
                form.submit();
        	}
        }
    });

    $('#addForm').validate({
        errorPlacement: function(error, element) {
            element.siblings("span").css({"color":"red"}).text(error.text());
        },
        success: function(label) {
            label.text("");
        }
    });
    
});

/**
 * 组装属性的验证规则，以json格式字符串存入表中，同时支持多种验证
 * @returns {Boolean}
 */
function getValidateValue(){
	var json = {};
	var needSetValidate = false;
	var result = true;
	var maxlengthV = 0,maxV=0;
	var minlengthV = 0,minV=0;
	var errorArray = new Array();
	$('input[name="valueValidateCK"]:checked').each(function(){
		var v = $(this).val();
		if("maxlength"==v){ //最大长度限制
			var maxlengthV_unVilid = $("#maxlengthV").val();
			if(isEmpty(maxlengthV_unVilid)){
				errorArray[errorArray.length] = "请输入最大长度限制！";
				result = false;
			}else {
				if(isNumber(maxlengthV_unVilid)==false){
					errorArray[errorArray.length] = "最大长度限制只能输入数字！";
					result = false;
				}else{
					maxlengthV = maxlengthV_unVilid;
				}
			}
			json[v]=maxlengthV;
		}else if("minlength"==v){ //最小长度限制
			var minlengthV_unVilid = $("#minlengthV").val();
			if(isEmpty(minlengthV_unVilid)){
				errorArray[errorArray.length] = "请输入最小长度限制！";
				result = false;
			}else{
				if(isNumber(minlengthV_unVilid)==false){
					errorArray[errorArray.length] = "最小长度限制只能输入数字！";
					result = false;
				}else{
					minlengthV = minlengthV_unVilid;
				}
			}
			json[v]=minlengthV;
		}else if("max"==v){
			var maxV_unVilid = $("#maxV").val();
			if(isEmpty(maxV_unVilid)){
				errorArray[errorArray.length] = "请输入最大数限制！";
				result = false;
			}else {
				if(isNumber(maxV_unVilid)==false){
					errorArray[errorArray.length] = "最大数限制只能输入数字！";
					result = false;
				}else{
					maxV = maxV_unVilid;
				}
			}
			json[v]=maxV;
		}else if("min"==v){
			var minV_unVilid = $("#minV").val();
			if(isEmpty(minV_unVilid)){
				errorArray[errorArray.length] = "请输入最小数限制！";
				result = false;
			}else{
				if(isNumber(minV_unVilid)==false){
					errorArray[errorArray.length] = "最小数限制只能输入数字！";
					result = false;
				}else{
					minV = minV_unVilid;
				}
			}
			json[v]=minV;
		}else{
			json[v] = true;
		}
		needSetValidate = true;
	}); 
	if(parseInt(maxlengthV) < parseInt(minlengthV)){
		errorArray[errorArray.length] = "最大长度限制值不能小于最小长度限制值！";
		result = false;
	}
	if(parseFloat(maxV) < parseFloat(minV)){
		errorArray[errorArray.length] = "最大数限制值不能小于最小数限制值！";
		result = false;
	}
	if(result==false){
		alert(errorArray.join("\n")+"\n验证规则存在以上错误");
	}
	if(needSetValidate){
		var jsonStr = JSON.stringify(json);
		var reg = new RegExp('"',"g");  
		jsonStr = jsonStr.replace(reg, ""); 
		$("#valueValidate").val(jsonStr);
	}else{
		$("#valueValidate").val("");
	}
	return result; 
}

/**
 * 判断验证规则如果选择了数字或者整数，则需要填写最大数和最小数限制
 * @param e
 */
function valueValidateCK_click(e){
	var v = e.value;
	if(v=="number" || v=="digits"){
		if(e.checked){
			$("#min_Div").show();
			$("#max_Div").show();
		}else{
			var hiddenF = 0;
			$('input[name="valueValidateCK"]:checked').each(function(){
				var v = $(this).val();
				if(v=="number" || v=="digits"){
					hiddenF = hiddenF+1;
				}
			});
			if(hiddenF==0){ //数字或者整数的验证规则都没有选
				$("#min_Div").hide();
				$("#max_Div").hide();
			}
		}
	}
	
	
}
	
