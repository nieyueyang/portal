//批量挂牌提交
function exeSubmit(){
	document.getElementById("form_step2").action = appServer + "/listing/batch/submitDo.htm";
	document.getElementById("form_step2").submit();
}


//-----------选择、预览合同模板----------
function getPreviewHref(){
	var templateId=$("select[name='contractTemplateId']").val();
	$("#previewLink").attr("href",appServer+"/contract/template/preview.htm?id="+templateId);
}

$(function() {
	getPreviewHref();
	$("select[name='contractTemplateId']").change(function(){
		getPreviewHref();
	});
	
	
	$("#previewLink").click(function(){
		if($("select[name='contractTemplateId']").val()==""){
			alert("请选择合同模板");
			return false;
		}
		return true;
	});
});