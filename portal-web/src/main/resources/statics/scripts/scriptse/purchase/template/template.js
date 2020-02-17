

function toSubmit(rootUrl){
	 
	$("#templateNameMsg").html(""); 
	$("#itemsMsg").html("");
	$("#titleMsg").html("");
	
	if( $("#templateName").val()==null ||$("#templateName").val()==''){
		$("#templateNameMsg").html("<font color='red'>此项为必填项</font>");
		return;
	}
	
	if( $("#templateName").val()!=null&&$("#templateName").val().length>30){
		$("#templateNameMsg").html("<font color='red'>长度须小于30字</font>");
		return;
	}
	
	if( $("#title").val()==null ||$("#title").val()==''){
		$("#titleMsg").html("<font color='red'>此项为必填项</font>");
		return;
	}
	
	if( $("#title").val()!=null&&$("#title").val().length>30){
		$("#titleMsg").html("<font color='red'>长度须小于30字</font>");
		return;
	}
	
	if( $("#purchaseName").val()==null ||$("#purchaseName").val()==''){
		$("#purchaseNameMsg").html("<font color='red'>此项为必填项</font>");
		return;
	}

	if( $("#purchaseName").val()!=null&&$("#purchaseName").val().length>80){
		$("#purchaseNameMsg").html("<font color='red'>长度须小于80字</font>");
		return;
	}

	if( $("#items").val()!=null&&$("#items").val().length>4000){
		$("#itemsMsg").html("<font color='red'>长度须小于4000字</font>");
		return;
	}
	
	
	//var verName=$("#"+$("#varietyCode").val()+"_opt").attr("label");
	
	//$("#varietyName").val( verName);
	
	var type=$("#type").val();
	if(type=="mod"){
		$("#addForm").attr("action",rootUrl+"/purchase/template/modify.htm?type=mod");
	}else{
		$("#addForm").attr("action",rootUrl+"/purchase/template/add.htm?type=add");
	}
	$("#addForm").submit();
}

function chooseVType(data){
	if(!data){
	}else{
		if(data.code.length==2){
			Hundsun.PopUtil.alert({
				msg:"请不要选择最顶级品种!<br />您可以选择除了顶级品种外的任意品种!",width:450,timeout:800,type:"warn"
			});
		}else{
			$("#varietyCode").val(data.code);
			$("#varietyName").val(data.name);
		}
	}
}










