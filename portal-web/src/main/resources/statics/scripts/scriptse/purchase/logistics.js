var arrayVariety = new Array();　
$(function() {
	$("input[type='text']").blur(function(){
		this.value=$.trim(this.value);
	});
})

function getMinDate() {
	var date = new Date();;
	return formatDate(date, "yyyy-MM");
}


function toSubmit(rootUrl,companyAttr,urlType){
	var ids = "";
	var ischecked = true;
	$('input[name=supplier]').each(function(){
		if(this.checked) {
			ischecked = false;
			if(ids.indexOf(this.value)==-1){
				ids = ids + this.value + ",";
			}
		}
	});
	$("#categoryMsg").html("");
	$("#purchaseNumberMsg").html("");
	
	$("#lengthMsg").html("");
	$("#widthMsg").html("");
	$("#thicknessMsg").html("");
	$("#weightMsg").html("");
	$("#quantityMsg").html("");
	$("#commentsMsg").html("");
	$("#manufacturerMsg").html("");
	$("#weightMsg").html("");
	$("#qualityStandardMsg").html("");
	$("#originMsg").html("");
	$("#supplierList").html("");
	$("#planAuthorMobileMsg").html("");
	
	for(var i=0;i<arrayVariety.length;i++){
		var varietyTypeCode=arrayVariety[i][0];    
    	$("#"+varietyTypeCode+"Msg").html("");
	} 
	
	if( $("#varietyName").val()==null||$("#varietyName").val()==''){
		$("#categoryMsg").html("<font color='red'>请选择物料</font>");
		return;
	}
	if( $("#purchaseNumber").val()==null||$("#purchaseNumber").val()==''){
		$("#purchaseNumberMsg").html("<font color='red'>此项为必填项</font>");
		return;
	}
	if(ischecked) {
		$("#supplierList").html("<font color='red'>请选择供方</font>");
		return;
	}
	
	 var patn1=/^\d+(\.\d+)?$/;
	 var patn2=/^\d+$/;
     var patn3=/^((((\+?[1-9][0-9]{0,7})|0)\.[0-9]{1,3})|((\+?[1-9][0-9]{0,7})|0))$/;
     var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
     
     var mobilepatn=/^1[3|4|5|8][0-9]\d{8}$/;
     if( $("#planAuthorMobile").val()!=''&&!reg.test(  $("#planAuthorMobile").val() ) )
     {  
	   	   $("#planAuthorMobileMsg").html("手机号码格式不正确");
	   		return;
     }  
     var patn3=/^((((\+?[0-9]{0,15})|0)\.[0-9]{0,2})|((\+?[0-9]{0,15})))$/;
 	if( !(patn3.test(  $("#purchaseNumber").val() ) && parseFloat($("#purchaseNumber").val())>0)){
 		$("#purchaseNumberMsg").html("<font color='red'>必须是大于0的数字,且最多有2位小数</font>");
 		return;
 	}
 	if( !(patn3.test(  $("#basePrice").val() ) && parseFloat($("#basePrice").val())>0)){
 		$("#basePriceMsg").html("<font color='red'>必须是大于0的数字,且最多有2位小数</font>");
 		return;
 	}
    /* if( $("#purchaseNumber").val()!=''&&!patn3.test(  $("#purchaseNumber").val() ) )
     {  
	   	   $("#purchaseNumberMsg").html("必须是数字,长度不能超过8位");
	   		return;
     }    
     if( $("#purchaseNumber").val()<=0){
    	 $("#purchaseNumberMsg").html("必须大于0");
	   		return;
     }
     if( $("#basePrice").val()!=''&&!patn3.test(  $("#basePrice").val() ) )
     {  
	   	   $("#basePriceMsg").html("必须是数字,长度不能超过8位");
	   		return;
     }  
     if( $("#basePrice").val()==''){
    	 $("#basePriceMsg").html("<font color='red'>此项为必填项</font>");
	   		return;
     }*/
	 if($("#goodsName").val()==''){
		 $("#goodsNameMsg").html("<font color='red'>此项为必填项</font>");
	   		return;
	 }
	 if($("#startPlace").val()==''){
		 $("#startPlaceMsg").html("<font color='red'>此项为必填项</font>");
	   		return;
	 }
	 if($("#endPlace").val()==''){
		 $("#endPlaceMsg").html("<font color='red'>此项为必填项</font>");
	   		return;
	 }
	 if($("#basePrice").val()!=''){
		 	var basePriceYuan = new Number($("#basePrice").val());
			var basePriceCent = basePriceYuan * 100 ;
			$("#basePrice").val(basePriceCent.toFixed(0)); 
	 }
	var variety="";
    for(var i=0;i<arrayVariety.length;i++){
		
			var varietyTypeCode=arrayVariety[i][0];    
			var keyTitle=arrayVariety[i][1];    
			var isRequired=arrayVariety[i][2];    
			var varietyTypeId=arrayVariety[i][3];    
			var groupType=arrayVariety[i][4];    
			var varietyGroup=arrayVariety[i][5] ;   
			var inputType =arrayVariety[i][8] ; 
			
			var varietyTypeValue='';
			if(inputType!='' && inputType=="RADIO"){
				 varietyTypeValue=getRadioValue(varietyTypeCode);
				
			}else{
				 varietyTypeValue=$("#"+varietyTypeCode).val();
			}
		    if(varietyTypeValue==''||varietyTypeValue==null){
		    	varietyTypeValue=' ';
		    }
		    
			variety=variety+groupType+"&"+varietyGroup+"&"+keyTitle+"&"+varietyTypeId+"&"+varietyTypeCode+"&"+varietyTypeValue+"&"+inputType+"#";
			
	       if (isRequired == "1" && varietyTypeValue=='') {
	    	   $("#"+varietyTypeCode+"Msg").html("<font color='red'>此项为必填项</font>");
	   			return;
	       }
		
	} 
    $("#variety").val(variety);
    $("#type").val(urlType);
    $("#supplierCompanyIds").val(ids);
	var type=$("#type").val();
	if(type=="mod"){
		$("#planForm").attr("action",rootUrl+"/logistics/buyer/plan/modifyLogistics.htm");
	}else{
		$("#planForm").attr("action",rootUrl+"/logistics/buyer/plan/addLogistics.htm");
	}
	$("#planForm").submit();
}

function getRadioValue(RadioName){
    var obj;   
    obj=document.getElementsByName(RadioName);
    if(obj!=null){
        var i;
        for(i=0;i<obj.length;i++){
            if(obj[i].checked){
                return obj[i].value;           
            }
        }
    }
    return null;
}

// 选择节点后的回调函数
function chooseVType(data){
	if(data==null){
		return;
	}
	/*if(data.isParent==true){
		alert("请选择子节点");
		return;
	}*/
	$("#varietyCategory").val( "" );
	$("#varietyCategoryName").val( "" );
	$("#varietyCode").val( "" );
	$("#varietyName").val( "" );
	
	$("#varietyCategory_show").html( "" );
	$("#varietyCategoryName_show").html( "" );
	$("#varietyCode_show").html( "" );
	$("#varietyName_show").html( "" );
	
	$("input[name=varietyCategory]").val(data.parentNode.code);
	$("input[name=varietyCategoryName]").val(data.parentNode.name);
	$("input[name=varietyCode]").val(data.code);
	$("input[name=varietyName]").val(data.name);
	
	$("#varietyCategory_show").html(data.parentNode.code);
	$("#varietyCategoryName_show").html(data.parentNode.name);
	$("#varietyCode_show").html(data.code);
	$("#varietyName_show").html(data.name);
	arrayVariety = new Array();　
	jQuery.get('/ajax/plans_variety_' + data.code + '.htm', null,
			function(data) {
				createForm(data);
	});
	jQuery.get('/ajax/logistics_plan_' + data.code + '.htm', null,
			function(data) {
				creatUnit(data,null);
	});
	
	
}

/**
 * 根据物料类型变换计量单位
 * @param data
 * @returns
 */
function creatUnit(data,unit){
	if(data!=null){
		for(var i in data){
			if(i=='TEXT'){
				$("#divUnit").empty();
				$("#divUnit").append("<input type=\"text\" id=\"purchaseUnit\" class=\"inpt\" "
						+"name=\"purchaseUnit\" value="+data[i]+" maxlength=\"4\" />");
			}else if(i=='SELECT'){
				$("#divUnit").empty();
				var html="";
				var attr_values = data[i] == null ? "" : data[i].split("\n");
				html = "<select style=\"width:100px;\" id=\"selectUnit\" class=\"select\" name=\"purchaseUnit\" "+ "\">";
				jQuery(attr_values).each(
					function(j) {
						var arrval = attr_values[j] == null ? "" : attr_values[j].split("|");
						if(unit == arrval[0]){
							html = html + "<option selected = \"selected\"  value=\""
							+ arrval[0] + "\">" + arrval[1] + "</option>";
						}else{
							html = html + "<option value=\""
							+ arrval[0] + "\">" + arrval[1] + "</option>";
						}
					});
				html = html + "</select>";
				$("#divUnit").append(html);
			}
		}
	}
}


/**
 * 生成表单里的内容
 * 
 * @param data
 */
function createForm(data) {
	var appendHtml = "";
	
	jQuery(data).each(function (i){
		if(i%2==0){
			appendHtml = appendHtml+'<tr>';
		}
		
		appendHtml=appendHtml+createTd(data[i]);
		if(i%2==1 || i == data.length-1){
			appendHtml = appendHtml + "</tr>";
		}
		
	});
    $("#varietyHtml").html(appendHtml);
}


/**
 * 生成td里的内容
 * 
 * @param obj
 * @returns {String}
 */
function createTd(obj) {
	var lenght=100;
	var appendHtml = "";
	var inputType = obj.keyType;
	var isRequired=obj.isRequired;
	var varietyTypeCode=obj.keyCode;
	var groupType=obj.groupType;
	var varietyGroup=obj.toGroup;
	var keyTitle=obj.keyTitle;
	var varietyTypeId=obj.id;
	var varietyTypeValue=obj.value;
	var varietyTypeValueText=obj.text;
	
	
	var subArr = new Array();
	subArr[0]=varietyTypeCode;
	subArr[1]=keyTitle;
	subArr[2]=isRequired;
	subArr[3]=varietyTypeId;
	subArr[4]=groupType;
	subArr[5]=varietyGroup;
	subArr[6]=varietyTypeValue;
	subArr[7]=varietyTypeValueText;
	subArr[8]=inputType;
	arrayVariety.push(subArr);
	
	var attr_values = obj.text == null ? "" : obj.text.split("\n");
	appendHtml+="<th width=\"160\">"+keyTitle+"：</th><td width=\"210\">";
	
	if (inputType == "CHECKBOX" || inputType == "SELECT"
			|| inputType == "RADIO") {
		if (inputType == "CHECKBOX") {
			jQuery(attr_values).each(
					function(j) {
						var arrval = attr_values[j] == null ? ""
								: attr_values[j].split("|");
						appendHtml = appendHtml
								+ "<input type=\"checkbox\" name=\""
								+ obj.keyCode + "\" id=\""+obj.keyCode+"\" value=\"" + arrval[0]
								+ "\" class=\"form_t\" /> " + "<span>"
								+ arrval[1] + "</span>";
					});
		} else if (inputType == "SELECT") {
			// 下拉框
			appendHtml = appendHtml + "<select name=\"" + obj.keyCode
					+ "\" id=\""+obj.keyCode+"\"class=\"select " + "\" style=\"width:100px;\">";
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
								+ "<input type=\"radio\" name=\""
								+ obj.keyCode + "\" id=\""+obj.keyCode+"\" value=\"" + arrval[1]
								+ "\" class=\"form_t\" ";
						// 默认先选择第一个
						if (j == 0) {
							appendHtml += "checked";
						}
						appendHtml += " /> " 
							+ "<span>"
							+ arrval[1]
							+ "</span>";
					});
		}
	}else if(inputType == "TEXTAREA"){
		//文本域
		var value = (obj.text == null || obj.text == "") ? "" : obj.text;
		appendHtml = appendHtml + "<textarea  name=\"" + obj.keyCode + "\" id=\""+obj.keyCode+"\" maxlength=\""+lenght+"\"  class=\"textarea\" style=\"width: 150px;height: 50px;\" >"+value+"</textarea>";
	}  else {
		// 输入框，text作为默认输入值
		var value = (obj.text == null || obj.text == "") ? "" : obj.text;
		appendHtml = appendHtml + "<input type=\"text\" name=\"" 
				+ obj.keyCode + "\" id=\""+obj.keyCode+"\" class=\"inpt\" value=\""+value+"\" maxlength=\""+lenght+"\"/> ";
	}
	
	if (isRequired == "1") {
		appendHtml = appendHtml +"<span class=\"red\">*</span>";
	}else{
		appendHtml = appendHtml +"<span class=\"red\">&nbsp</span>";
	}
	
	return appendHtml+"<span class=\"error\" id=\""+obj.keyCode+"Msg\"></span></td>";
}
