$(function() {
	$("#city").citySelect();
});


function next_step(form) {
	var flag = $("#basicInfoForm").validate();
	var cooperationSubsidiaryId = $("#cooperationSubsidiaryId").val();
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
	if (null == cooperationSubsidiaryId) {
		$("#cooperationSubsidiaryId_ms").attr("style",
				"width: 155px;border-color:red");
		return false;
	} else {
		$("#cooperationSubsidiaryId_ms").attr("style", "width:155px");
	}
	if($(".star").val()==""||null==$(".star").val()){
		$(".spanX").html("<span  style=\"color:red;float:left\">*</span>");
		return;
	}
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
