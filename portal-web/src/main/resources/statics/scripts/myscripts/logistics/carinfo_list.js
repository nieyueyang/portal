jQuery(document).keydown(function(event){ 
	if(event.keyCode == 13){ //绑定回车 
		$('#submitButton').click(); //触发按钮事件 
	} 
});

function toQuery() {
	$("#carForm").attr("action","list.htm");
	$("#carForm").submit();
}

function allcheck() {
	$("input[name='ids']").each(function(){
		this.checked = $('#allcheck').attr('checked');
	});
}

function clearMsg(){
	$("#startPlace").val("");
	$("#endPlace").val("");
	$("#sendDateBegin").val(""); 
	$("#sendDateEnd").val("");
	$("#effectiveStartBegin").val("");
	$("#effectiveStartEnd").val("");
	$("#effectiveEndBegin").val("");
	$("#effectiveEndEnd").val("");
	$("#varietyName").val("");
	$("#infoType").val("");
	$("#sourceType").val("");
	$("#isDisplay").val("");
	$("#status").val("");
}

function delMsg(id){
	Boxy.confirm("确认要删除吗",function(){
		jQuery.post (
			appServer + '/logistics/carinfo/delete.htm',
			{"id":id},
	        function(v){
	    		if(v.result == 'success'){
						Hundsun.PopUtil.alert({
							msg:'操作成功！',
							autohide : true,
							width:350,
							timeout:800,
							callback :function(){		
								$("#carForm").submit();;
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

function cancelMsg(id){
	Boxy.confirm("确定要撤销吗",function(){
		jQuery.post (
			appServer + '/logistics/carinfo/cancelcarinfo.htm',
			{"id":id},
	        function(v){
	    		if(v.result == 'success'){
						Hundsun.PopUtil.alert({
							msg:'操作成功！',
							autohide : true,
							width:350,
							timeout:800,
							callback :function(){		
								$("#carForm").submit();;
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

function publicMsgBS(){
	alert("已过了有效期结束时间");
	return;
}

function publicMsg(id){
	Boxy.confirm("确定要发布吗",function(){
		jQuery.post (
			appServer + '/logistics/carinfo/publiccarinfo.htm',
			{"id":id},
	        function(v){
	    		if(v.result == 'success'){
						Hundsun.PopUtil.alert({
							msg:'操作成功！',
							autohide : true,
							width:350,
							timeout:800,
							callback :function(){		
								$("#carForm").submit();;
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