
//挂牌提交
function submitListing(id){
	var	feeMsg = '确定提交挂牌吗？';
		exeSubmit(id,feeMsg);
	
}
//挂牌提交  代理订货挂牌 需要  cfca验证 ？
function exeSubmit(id,msg){
		Boxy.confirm(msg,function(){
				$("#submitForm").attr("disabled", true).html("正在提交...");
			jQuery.post (
					appServer + '/agentListing/submit_'+id+'.htm',
		        function(v){
		    		if(v.result == 'success'){
		    			$("#submitForm").attr("disabled", true).html("正在提交...");
							Hundsun.PopUtil.alert({
								msg:'提交代理订货挂牌操作成功！正在返回列表...',
								autohide : true,
								width:350,
								timeout:800,
								callback :function(){
									Hundsun.UrlUtil.redirect(appServer + '/agentListingMg/list.htm');
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


//-----------选择、预览合同模板----------
/*function getPreviewHref(){
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
});*/
