
function getMinDate() {
	var date = new Date();;

	return formatDate(date, "yyyy-MM");
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
	$("#categoryMsg").html("");
	$("#planMonthMsg").html("");
	$("#deliveryDateMsg").html("");
	$("#bargainPriceMsg").html("");
	$("#bargainNumberMsg").html("");
	$("#uploadFileMsg").html("");
	
	if( $("#varietyName").val()==null||$("#varietyName").val()==''){
		$("#categoryMsg").html("<font color='red'>请选择物料</font>");
		return;
	}else{
		$("#categoryMsg").html("");
	}
	if($("#supplierCompanyId").val()==null||$("#supplierCompanyId").val()==''){
		$("#categoryMsg").html("<font color='red'>请选择供方</font>");
		return;
	}else{
		$("#categoryMsg").html("");
	}
	if( $("#planMonth").val()==null||$("#planMonth").val()==''){
		$("#planMonthMsg").html("<font color='red'>此项为必填项</font>");
		return;
	}
	if( $("#deliveryDate").val()==null||$("#deliveryDate").val()==''){
		$("#deliveryDateMsg").html("<font color='red'>必填项</font>");
		return;
	}
	
	 var patn1=/^\d+(\.\d+)?$/;
	 var patn2=/^\d+$/;
     var patn3=/^((((\+?[1-9][0-9]{0,7})|0)\.[0-9]{1,3})|((\+?[1-9][0-9]{0,7})|0))$/;
     var mobilepatn=/^1[3|4|5|8][0-9]\d{8}$/;
     if($("#userMobile").val()!='' && !mobilepatn.test($("#userMobile").val())){
 	 	$("#userMobileMsg").html("手机号码输入有误");
 	 	return;
 	 }else{
 		$("#userMobileMsg").html("");
 	 }
     if( $("#bargainPrice").val()!=''&&!patn3.test(  $("#bargainPrice").val() ) )
     {  
	   	   $("#bargainPriceMsg").html("必须是数字,且只能保留三位小数");
	   		return;
     }
     if( $("#bargainPrice").val()==''){
    	 $("#bargainPriceMsg").html("不能为空");
	   		return;
     }
     if( $("#bargainNumber").val()!=''&&!patn3.test(  $("#bargainNumber").val() ) )
     {  
	   	   $("#bargainNumberMsg").html("必须是数字,且只能保留三位小数");
	   		return;
     }    
     if( $("#bargainNumber").val()<=0){
    	 $("#bargainNumberMsg").html("必须大于0");
	   		return;
     }
	 
    $("#type").val(urlType);
	var type=$("#type").val();
	if(type=="mod"){
		if( $("#uploadFile").val()!=null&&$("#uploadFile").val()!=''){
			var fileExt=$("#uploadFile").val().substring($("#uploadFile").val().lastIndexOf(".")+1,$("#uploadFile").val().length).toLowerCase();//获得文件后缀名
			if(fileExt!='doc'&&fileExt!='docx'){
				$("#uploadFileMsg").html("请上传word文件");
				return ;
			}
		}
		$("#contractForm").attr("action",rootUrl+"/purchase/buyer/contract/update.htm");
	}else{
		if( $("#uploadFile").val()==null&&$("#uploadFile").val()==''){
			$("#uploadFileMsg").html("<font color='red'>此项为必填项</font>");
			return;
		}else{
			var fileExt=$("#uploadFile").val().substring($("#uploadFile").val().lastIndexOf(".")+1,$("#uploadFile").val().length).toLowerCase();//获得文件后缀名
			if(fileExt!='doc'&&fileExt!='docx'){
				$("#uploadFileMsg").html("请上传word文件");
				return ;
			}
		}
		$("#contractForm").attr("action",rootUrl+"/purchase/buyer/contract/save.htm?type="+type);
	}
	$("#contractForm").submit();
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
	if(data.parentNode==null){
		alert("请选择子节点");
		return;
	}
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
	
	$("#supplierCompanyId").val("");
	$("#supplierTradeAccount").val("");
	$("#supplierCompanyName").val("");
	
	arrayVariety = new Array();　
	jQuery.get('/ajax/query_variety_unit_' + data.code + '.htm', null,
			function(data) {
			$("#purchaseUnit").val(data.unit);
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
