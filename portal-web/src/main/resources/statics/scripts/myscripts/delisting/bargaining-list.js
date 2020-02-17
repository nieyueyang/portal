//取消议价申请
function cancelBargaining(bargainingId){
	art.dialog({
		id : "cancelBargaining",
		lock : true,
	    content: '确定要取消该议价请求吗?',
	    yesFn : function(){
		jQuery.ajax({
			type : "POST",
			url : appServer + "/delisting/buyer/cancel.htm",
			data : {
				"bargainingId" : bargainingId
			},
			success : function(result) {
				if(typeof(result)=="string"){
					 alert("您还没有登录,请点击左上角的登录条进行登录,再进行议价请求,谢谢.");
		    		 if((undefined!=result.loginUrl) && ("undefined"!=result.loginUrl) && (/^\s*$/g.test(result.loginUrl)==false)){
		    			//跳转到登录页面
		    			 window.open (result.loginUrl) ;
		    		 }
		    		 
		    	 }else{
		    		 if(result.doCancel){
		    			 	clearMsg()
				 	 		art.dialog({
								id : "cancelSuccess",
								lock : true,
							    content: "议价请求取消成功！",
							    yesFn : function(){
				 	 			$('#searchForm').submit();
				    		 }
							});
				     }else{
				    	 var errorMsg = (!result.msg) ? "" : result.msg;
			    		 art.dialog({
								id : "cancelFalse",
								lock : true,
							    content: errorMsg,
							    yesFn : function(){
			    			 		if((undefined!=result.loginUrl) && ("undefined"!=result.loginUrl) && (/^\s*$/g.test(result.loginUrl)==false)){
					    			//跳转到登录页面
					    			 window.open (result.loginUrl) ;
					    		 }
		    		 		}
							});
				     }
		    	 }
		},
			error:function(){
				art.dialog({
					id : "timeOut",
					lock : true,
					content: '网络超时,请重试',
					yesFn : true
				});
			}
		});
		},
		noFn: true
	});
}

//卖家拒绝议价申请
function refuseBargaining(bargainingId){
	art.dialog({
		id : "cancelBargaining",
		lock : true,
		title: '确定要拒绝该议价申请吗?',
	    content: '<span> 拒绝原因：<textarea name="cause" id="cause" cols="35" rows="4" maxlength="600" title="最多输入600个字"></textarea></span>',
	    yesFn : function(){
		var cause = $("#cause").val();
		jQuery.ajax({
			type : "POST",
			url : appServer + "/delisting/seller/cancel.htm",
			data : {
				"cause" : cause,
				"bargainingId" : bargainingId
			},
			success : function(result) {
				if(typeof(result)=="string"){
					 alert("您还没有登录,请点击左上角的登录条进行登录,再进行议价请求,谢谢.");
		    		 if((undefined!=result.loginUrl) && ("undefined"!=result.loginUrl) && (/^\s*$/g.test(result.loginUrl)==false)){
		    			//跳转到登录页面
		    			 window.open (result.loginUrl) ;
		    		 }
		    		 
		    	 }else{
		    		 if(result.doCancel){
		    			 	clearMsg()
				 	 		art.dialog({
								id : "cancelSuccess",
								lock : true,
							    content: "拒绝议价请求成功！",
							    yesFn : function(){
				 	 				$('#searchForm').submit();
					    		 }
							});
				     }else{
				    	 var errorMsg = (!result.msg) ? "" : result.msg;
			    		 art.dialog({
								id : "cancelFalse",
								lock : true,
							    content: errorMsg,
							    yesFn : function(){
			    			 		if((undefined!=result.loginUrl) && ("undefined"!=result.loginUrl) && (/^\s*$/g.test(result.loginUrl)==false)){
					    			//跳转到登录页面
					    			 window.open (result.loginUrl) ;
					    		 }
		    		 		}
							});
				     }
		    	 }
			},
			error:function(){
				art.dialog({
					id : "timeOut",
					lock : true,
					content: '网络超时,请重试',
					yesFn : true
				});
			}
		});
		},
		noFn: true
	});
}

//卖家同意议价申请
function agreeBargaining(bargainingId){
	art.dialog({
		id : "cancelBargaining",
		lock : true,
	    content: '确定要同意该议价申请吗?',
	    yesFn : function(){
		jQuery.ajax({
			type : "POST",
			url : appServer + "/delisting/seller/agree.htm",
			data : {
				"bargainingId" : bargainingId
			},
			success : function(result) {
				if(typeof(result)=="string"){
					 alert("您还没有登录,请点击左上角的登录条进行登录,再进行议价请求,谢谢.");
		    		 if((undefined!=result.loginUrl) && ("undefined"!=result.loginUrl) && (/^\s*$/g.test(result.loginUrl)==false)){
		    			//跳转到登录页面
		    			 window.open (result.loginUrl) ;
		    		 }
		    		 
		    	 }else{
		    		 if(result.doAgree){
		    			 	clearMsg()
				 	 		art.dialog({
								id : "agreeSuccess",
								lock : true,
							    content: "同意议价请求成功！",
							    yesFn : function(){
				 	 				$('#searchForm').submit();
				 	 			}
							});
				     }else{
				    	 var errorMsg = (!result.msg) ? "" : result.msg;
			    		 art.dialog({
								id : "agreeFalse",
								lock : true,
							    content: errorMsg,
							    yesFn : function(){
			    			 		if((undefined!=result.loginUrl) && ("undefined"!=result.loginUrl) && (/^\s*$/g.test(result.loginUrl)==false)){
					    			//跳转到登录页面
					    			 window.open (result.loginUrl) ;
					    		 }
		    		 		}
							});
				     }
		    	 }
		},
			error:function(){
				art.dialog({
					id : "timeOut",
					lock : true,
					content: '网络超时,请重试',
					yesFn : true
				});
			}
		});
		},
		noFn: true
	});
}

function clearMsg(){
	$("#varietyName").attr("value","");
	$("#specification").attr("value","");
	$("#material").attr("value","");
	$("#projectCode").attr("value","");
	$("#status").attr("value","");
	$(".select").attr("value","");
	if(null==$("#sellerCompanyName").val() || undefined === $("#sellerCompanyName").val() ){
	}else{
		$("#sellerCompanyName").attr("value","");
	}
	if(null==$("#buyerCompanyName").val() || undefined === $("#buyerCompanyName").val() ){
	}else{
		$("#buyerCompanyName").attr("value","");
	}
}
