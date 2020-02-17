var arrayVariety = new Array();　
$(function() {
	$("input[type='text']").blur(function(){
		this.value=$.trim(this.value);
	});
	
	$("#beginBalance").change(function(){
		computerEndBalance();
	});
	$("#purchaseNumber").change(function(){
		computerEndBalance();
	});
	$("#currentConsume").change(function(){
		computerEndBalance();
	});
	 
})

function getMinDate() {
	var date = new Date();;

	return formatDate(date, "yyyy-MM");
}

// 计算期末库存
function computerEndBalance(){
	if($("#beginBalance").val()=='' || $("#purchaseNumber").val()=='' || $("#currentConsume").val()==''){
		$("#endBalance").val("");
		$("#endUseDay").val('');
		return;
	}	  

	
	var patn1=/^\d+(\.\d+)?$/;
	 var patn2=/^\d+$/;
	 var patn3=/^((((\+?[0-9]{0,15})|0)\.[0-9]{0,2})|((\+?[0-9]{0,15})))$/;
  	if( !(patn3.test(  $("#purchaseNumber").val() ) && parseFloat($("#purchaseNumber").val())>0)){
  		$("#endUseDay").val('');
   		return;
  	}
  	if($("#beginBalance").val()!=''&& !(patn3.test(  $("#beginBalance").val() ) && parseFloat($("#beginBalance").val())>0)){
  		$("#endUseDay").val('');
   		return;
  	}
  	if($("#currentConsume").val()!=''&& !(patn3.test(  $("#currentConsume").val() ) && parseFloat($("#currentConsume").val())>0)){
  		$("#endUseDay").val('');
   		return;
  	}
    /*var patn3=/^((((\+?[1-9][0-9]{0,7})|0)\.[0-9]{1,3})|((\+?[1-9][0-9]{0,7})|0))$/;
    if( $("#purchaseNumber").val()!=''&&!patn1.test(  $("#purchaseNumber").val() ) )
    {  
    	$("#endUseDay").val('');
	   		return;
    }    
	  if( $("#beginBalance").val()!=''&&!patn1.test(  $("#beginBalance").val() ) )
     {  
		  $("#endUseDay").val('');
	   		return;
     }    
	
	  if( $("#currentConsume").val()!=''&&!patn1.test(  $("#currentConsume").val() ) )
     {  
		  $("#endUseDay").val('');
	   		return;
     } */

	var beginBalance=parseFloat($("#beginBalance").val());
	var purchaseNumber=parseFloat($("#purchaseNumber").val());
	var currentConsume=parseFloat($("#currentConsume").val());
	var endBalance=accSubtr(accAdd(beginBalance,purchaseNumber),currentConsume);
	$("#endBalance").val(endBalance);
	var avgDayConsume = accDiv(currentConsume,dayNumOfCurrentMonth());
	if(avgDayConsume == 0){
		$("#endUseDay").val('');
	}else {
		var avgConsume=accDiv(endBalance,avgDayConsume);
		avgConsume = parseInt(avgConsume);
		if(avgConsume < 0){
			$("#endUseDay").val(0);
		}else{
			$("#endUseDay").val(avgConsume);
		}
	}
}

/**
 * 得到当月的天数
 * 
 * @param Year
 * @param Month
 * @returns
 */
function dayNumOfCurrentMonth()
{
	var myDate = new Date(); 
    return 32-new Date(myDate.getYear(),myDate.getMonth(),32).getDate();
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
	$("#beginBalanceMsg").html("");
	
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
	$("#planMonthMsg").html("");
	$("#userMobileMsg").html("");
	$("#supplierList").html("");
	$("#currentConsumeMsg").html("");
	if($("#isSuperDo").attr("checked")=="checked"){		
		$("#isSuperDo").val("1");
	}
	
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
     //var patn3=/^((((\+?[1-9][0-9]{0,7})|0)\.[0-9]{1,3})|((\+?[1-9][0-9]{0,7})|0))$/;
     
     var patn3=/^((((\+?[0-9]{0,15})|0)\.[0-9]{0,2})|((\+?[0-9]{0,15})))$/;
  	if( !(patn3.test(  $("#purchaseNumber").val() ) && parseFloat($("#purchaseNumber").val())>0)){
  		$("#purchaseNumberMsg").html("<font color='red'>必须是大于0的数字,且最多有2位小数</font>");
  		return;
  	}
  	if($("#beginBalance").val()!=''&& !(patn3.test(  $("#beginBalance").val() ) && parseFloat($("#beginBalance").val())>0)){
  		$("#beginBalanceMsg").html("<font color='red'>必须是大于0的数字,且最多有2位小数</font>");
  		return;
  	}
  	if($("#currentConsume").val()!=''&& !(patn3.test(  $("#currentConsume").val() ) && parseFloat($("#currentConsume").val())>0)){
  		$("#currentConsumeMsg").html("<font color='red'>必须是大于0的数字,且最多有2位小数</font>");
  		return;
  	}
     /*if( $("#purchaseNumber").val()!=''&&!patn3.test(  $("#purchaseNumber").val() ) )
     {  
	   	   $("#purchaseNumberMsg").html("必须是数字,长度不能超过8位");
	   		return;
     }    
     if( $("#purchaseNumber").val()<=0){
    	 $("#purchaseNumberMsg").html("必须大于0");
	   		return;
     }
	  if( $("#beginBalance").val()!=''&&!patn3.test(  $("#beginBalance").val() ) )
      {  
	   	   $("#beginBalanceMsg").html("必须是数字,长度不能超过8位");
	   		return;
      }    
	
	  if( $("#currentConsume").val()!=''&&!patn3.test(  $("#currentConsume").val() ) )
      {  
	   	   $("#currentConsumeMsg").html("必须是数字,长度不能超过8位");
	   		return;
      }  */  
  	 var mobilepatn=/^1[3|4|5|8][0-9]\d{8}$/;
	 if($("#planMonth").val()==''){
		 $("#planMonthMsg").html("<font color='red'>此项为必填项</font>");
	   		return;
	 }
	 if($("#userMobile").val()!='' && !mobilepatn.test($("#userMobile").val())){
	 	$("#userMobileMsg").html("手机号码输入有误");
	 	return;
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
		$("#planForm").attr("action",rootUrl+"/purchase/buyer/plan/modify.htm");
	}else{
		$("#planForm").attr("action",rootUrl+"/purchase/buyer/plan/add.htm");
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
	if(data.parentNode==null){
		alert("请选择子节点");
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
	jQuery.get('/ajax/query_variety_unit_' + data.code + '.htm', null,
			function(data) {
			$("#purchaseUnit").val(data.unit);
	});
	
	jQuery.get('/ajax/querySuperCompanyName_' + data.code + '.htm', null,
			function(data) {
				$("#superCompanyName").html(data.name);
				$("#superCompanyName_tmp").val( data.name );
				var sc=$("#superCompanyName_tmp").val();
				if(sc==""){
					$("#isSuperDo").hide();
				}else{
					$("#isSuperDo").show();
				}
	});
	if($("#sbtn").attr("href")==null){
		getLinkInfo();
	}
	
}

function getLinkInfo(){
	var code = $("input[name=varietyCode]").val();
	var companyCode = $("#userCompanyName  option:selected").val();
	if(code==''){
		return false;
	}
	if(companyCode==''||companyCode==null){
		return false;
	}else{
		companyCode = companyCode.split(',')[1];
	}
	jQuery.get('/ajax/queryLinkInfo_' + code + '_'+companyCode+'.htm', null,
			function(data) {
				if(data.mobile!=""&&data.station!=""){
					$("#userMobile").val(data.mobile);
					$("#stationInfo").val(data.station);
				}else{
					$("#userMobile").val("");
					$("#stationInfo").val("");
				}
	});
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
