
//挂牌提交
function submitListing(id,listingType){
	
	var feeMsg ="";
	if(listingType =="D" || listingType =="F"){
		document.getElementById("bondInfo").style.display="";
		document.getElementById("feeInfo").style.display="";
		jQuery.post (
				appServer +'/listing/loadListingFee_'+id+'.htm',
		        function(v){
		    		if(v.result == 'success'){
		    			document.getElementById("feeInfo").innerHTML=v.msg;
		    			feeMsg = '<font color="red"><strong>'+v.msg+'</strong></font>'+";确定提交挂牌吗？";	
		    			exeSubmit(id,feeMsg)
					 }else{
						 document.getElementById("feeInfo").style.display="none";
						 Hundsun.PopUtil.alert({
								msg:v.msg,
								width:450,
								timeout:800,
								type:'warn'
							})
					 }
				},
				'json'
		    );
	}else{
		document.getElementById("bondInfo").style.display="none";
		document.getElementById("feeInfo").style.display="none";
		feeMsg = '确定提交挂牌吗？';
		exeSubmit(id,feeMsg);
	}
}
//挂牌提交
function exeSubmit(id,msg){
	var templateId=$("select[name='contractTemplateId']").val();
	var showCFCA = $("#showCFCA").val()=="true" ? true : false;
	var cfcaResult = true;
	if($("#goodsType").val()=="5" && showCFCA){
		cfcaResult = SelectCertificate(showCFCA);
	}
	if(cfcaResult){  //cfca验证
		Boxy.confirm(msg,function(){
			jQuery.post (
					appServer + '/listing/submit_'+id+'.htm',
					{"contractTemplateId":templateId,"cfcaDN":$("#TextSelectedCertificateSubjectDN").val(),"cfcaSignData":$("#textareaSignature").val()},
		        function(v){
		    		if(v.result == 'success'){
							Hundsun.PopUtil.alert({
								msg:'提交挂牌操作成功！正在返回列表...',
								autohide : true,
								width:350,
								timeout:800,
								callback :function(){		
									Hundsun.UrlUtil.redirect(appServer + '/listing/list.htm');
								}
							})
							
					 }else{
						 Hundsun.PopUtil.alert({
								msg:v.msg,
								width:450,
								timeout:800,
								type:'warn'
							})
					 }
				},
				'json'
		    );
		  })
	}
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
