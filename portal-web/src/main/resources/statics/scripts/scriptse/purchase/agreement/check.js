var agreementId = "";
$(function(){ 
	$("#checkDialog").dialog({
		autoOpen : false,
		bgiframe : true,
		modal : true,
		position : [ 450, 150 ],
		width : 350,
		height:320,
		title : "补充条款审核",
		buttons : {
			"确认" : function() {
				saveRemark();
			},
			"取消" : function() {
				$(this).dialog("close");
			}
		}
	});
});

function checkPurchase(cId){
	agreementId = cId;
	$("#checkDialog").dialog("open");
}
function saveRemark(){
	
	//$(":button").attr("disabled","disabled"); 
	$(":button").slice(0,1).hide(); 
	
	var checkRemark = $("#checkRemark").val();
	if(checkRemark.length > 170){ //
		msgTips("评价内容输入过长!","warn");
		$(":button").slice(0,1).show();
		return ;
	}
	//Boxy.confirm("评价："+remarkDesc,function(){
		jQuery.post (
				appServer + '/ajax/checkAgreement.htm?now='+ new Date().getTime(),
				{"agreementId":agreementId,"checkResult":$("#checkResult").val(),"checkRemark":checkRemark},
	        function(v){
				$(":button").slice(0,1).show();
				$("#checkDialog").dialog("close");
	    		if(v.result == 'success'){
						Hundsun.PopUtil.alert({
							msg:'操作成功！',autohide : true,width:350,timeout:800,
							callback :function(){
								toQuery();
							}
						});
						
				 }else{
					 msgTips(v.msg,'warn');
				 }
			},
			'json'
	    );
	  //})
}

function msgTips(msg,type){
	Hundsun.PopUtil.alert({
		msg:msg,
		width:450,
		timeout:800,
		type:type
	});
}