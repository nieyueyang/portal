

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


	if( $("#items").val()!=null&&$("#items").val().length>4000){
		$("#itemsMsg").html("<font color='red'>长度须小于4000字</font>");
		return;
	}
	
	
	var verName=$("#"+$("#varietyCode").val()+"_opt").attr("label");
	
	$("#varietyName").val( verName);
	
	var type=$("#type").val();
	if(type=="mod"){
		$("#addForm").attr("action",rootUrl+"/contract/template/modify.htm?type=mod");
	}else{
		$("#addForm").attr("action",rootUrl+"/contract/template/add.htm?type=add");
	}
	$("#addForm").submit();
}










