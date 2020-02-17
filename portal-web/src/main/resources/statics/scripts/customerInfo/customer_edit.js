

function next_step(form) {
	var flag = $("#basicInfoForm").validate();
	if ($("#companyProfile")) {
		if ($("#companyProfile").val().length > 1000) {
			alert("企业介绍字数超限" + $("#companyProfile").val().length);
			return false;
		}
	}
	if ($("#mainProducts")) {
		if ($("#mainProducts").val().length > 1000) {
			alert("主要产品字数超限" + $("#mainProducts").val().length);
			return false;
		}
	}
	if ($("#cooperationProcess")) {
		if ($("#cooperationProcess").val().length > 1000) {
			alert("合作历程字数超限" + $("#cooperationProcess").val().length);
			return false;
		}
	}
	if($(".star").val()==""||null==$(".star").val()){
		$(".spanX").html("<span  style=\"color:red;float:left\">*</span>");
		return;
	}
	var checkedFlag = false;
	var cooperationSubsidiaryId ="";
	$("input:checkbox[name='cooperationSubsidiaryIds']:checked").each(function() { // 遍历name=test的多选框
		if(checkedFlag){
			cooperationSubsidiaryId +=","	
		}
		cooperationSubsidiaryId += $(this).val();  // 每一个被选中项的值
		checkedFlag = true;
	});
	$("#cooperationSubsidiaryId").val(cooperationSubsidiaryId);
	
	if (flag) {
		 $("#basicInfoForm").submit();
	}
}

function miss(infoId){
	window.location.href ="miss.htm?infoId="+infoId;
}

function clear_step(){
	   window.location.href="about:blank";
	   window.opener = null;
	   window.open("", "_self");
	   window.close();
}
