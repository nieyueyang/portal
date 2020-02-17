var contractId = "";
var type = "";
var flag = "";
$(function(){ 
	$("#checkDialog").dialog({
		autoOpen : false,
		bgiframe : true,
		modal : true,
		position : [ 450, 150 ],
		width : 350,
		height:320,
		title : "合同审核",
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

function checkPurchase(cId, operator,isList){
	contractId = cId;
	type = operator;
	flag = isList;
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
	var postUrl = "";
	if("buyer" == type) {
		postUrl = "/purchase/rule/ajax/checkContract.htm";
	} else if("seller" == type) {
		postUrl = "/purchase/rule/seller/ajax/checkContract.htm";
	}
	//Boxy.confirm("评价："+remarkDesc,function(){
		jQuery.post (
				appServer + postUrl + '?now='+ new Date().getTime(),
				{"contractId":contractId,"checkResult":$("#checkResult").val(),"checkRemark":checkRemark},
	        function(v){
				$(":button").slice(0,1).show();
				$("#checkDialog").dialog("close");
	    		if(v.result == 'success'){
						/*Hundsun.PopUtil.alert({
							msg:'操作成功！',autohide : false,width:350,timeout:800,
							callback :function(){
								toQuery();
							}
						});*/
	    			   if("1" ==flag) //列表刷新
	    				   toQuery();
	    			   else if("2" ==flag){//详情页面刷行
	    				   //var currentPage = $("#queryItem input[name='currentPage']").val();
	    					//var pageSize = $("#queryItem input[name='pageSize']").val();
	    				  //$('#queryItem').attr('action', 'view.htm?id='+contractId+'&currentPage='+currentPage+'&pageSize='+pageSize); 
	    					$('#queryItem').submit();
	    			   } 
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