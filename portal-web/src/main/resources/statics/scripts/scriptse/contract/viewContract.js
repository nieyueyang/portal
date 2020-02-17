function setSellersId(cid){
	var selSellersId = $("#selSellersId").val();
	var selSellersName = $("#selSellersId").find("option:selected").text();
	if(!selSellersId) msg = "确定不设置服务人员吗？";
	else msg = "确定设置\""+selSellersName+"\"为服务人员吗？";
	Boxy.confirm(msg,function(){
		jQuery.post (
				appServer + '/listing/seller/setContractSellerId.htm?now='+ new Date().getTime(),
				{"cid":cid,"sellerId":selSellersId},
	        function(v){
	    		if(v.result == 'success'){
						Hundsun.PopUtil.alert({
							msg:'操作成功！',
							autohide : true,
							width:350,
							timeout:800
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

//=====================保存评价信息===================
$(function(){ 
	$("#remarkDialog").dialog({
		autoOpen : false,
		bgiframe : true,
		modal : true,
		position : [ 450, 350 ],
		width : 350,
		height:320,
		title : "客户评价",
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

function doRemark(){
	$("#remarkDialog").dialog("open");
}

function saveRemark(){
	var remarkCode = $("#remarkCode").val();
	var remarkComments = $("#remarkComments").val();
	var remarkDesc = $("#remarkCode").find("option:selected").text();
	var remarkId = $("#remarkId").val();
	var contractId = $("#contractId").val();
	if(!remarkCode){
		msgTips("请选择评价结果","warn");
		return ;
	}
	if(remarkCode=="4" && !remarkComments){
		msgTips("您对本次交易不满意，请把您的建议或者意见反馈给我们,以便我们后期改进，谢谢!","warn");
		return ;
	}
	if(remarkComments.length > 170){
		msgTips("评价内容输入过长!","warn");
		return ;
	}
	if(remarkComments.length > 0 && isEmpty(remarkComments)){
		msgTips("请输入有效的评价内容!","warn");
		return ;
	}
	//Boxy.confirm("评价："+remarkDesc,function(){
		jQuery.post (
				appServer + '/ajax/remark.htm?now='+ new Date().getTime(),
				{"id":remarkId,"contractId":contractId,"remarkCode":remarkCode,"remarkComments":remarkComments,"remarkDesc":remarkDesc},
	        function(v){
	    		if(v.result == 'success'){
						Hundsun.PopUtil.alert({
							msg:'操作成功！',
							autohide : true,
							width:350,
							timeout:800
						});
						$("#remarkDialog").dialog("close");
						//页面显示最新的评价
						$("#remarkCode").val(remarkCode);
						$("#remarkComments").val(remarkComments);
						$("#remarkId").val(v.remarkId);
						
						var showRemark = " 评价结果："+remarkDesc+"   " +
								"<div>评价内容："+remarkComments+"</div>";
						$("#showRemarkDiv").html(showRemark);
						
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


function isEmpty(v){
	if(undefined==v || "undefined"==v){return true;}
	if(/^\s*$/g.test(v)){
		return true;
	}else{
		return false;
	}
}





