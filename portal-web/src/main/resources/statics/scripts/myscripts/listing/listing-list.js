function resetForm(){
	$("#varietyCode").val("");
	$("#varietyName").val("");
	$("#specification").val("");
	$("#material").val("");
	$("#status").val("");
	$("#listingDates").val("");
	$("#listingDatee").val("");
	$("#listingType").val("");
	$("#companyName").val("");
	$("#dealStatus").val("");
	$("#goodsType").val("");
	$("#batchNo").val("");
}
//查看详情
function listingDetail(id){
	window.location.href= appServer+"/listing/detail_"+id+".htm";
}
//修改挂牌
function editListing(id){
	window.location.href= appServer +"/listing/edit_"+id+".htm";
}
//提交挂牌
function listingSubmit(id){
	window.location.href= appServer+"/listing/detailSubmit_"+id+".htm";
}

//挂牌中、未成交的挂牌，修改挂牌价格
function listingEditPrice(id){
	window.location.href= appServer+"/listing/editPrice_"+id+".htm";
}

//快速挂牌
function listingQuick(id){
	window.location.href= appServer+"/listing/quickListing_"+id+".htm";
}

//部分撤牌
function listingClose(id){
	window.location.href= appServer +"/listing/close_"+id+".htm";
}

////挂牌提交
//function listingClose(id){
//	Boxy.confirm('确定撤牌吗？',function(){
//		jQuery.post (
//				appServer + '/listing/close_'+id+'.htm',
//	        function(v){
//	    		if(v.result == 'success'){
//						Hundsun.PopUtil.alert({
//							msg:'提交撤牌操作成功！',
//							autohide : true,
//							width:350,
//							timeout:800,
//							callback :function(){		
//								document.getElementById("searchForm").submit();;
//							}
//						})
//						
//				 }else{
//					 Hundsun.PopUtil.alert({
//							msg:v.msg,
//							width:450,
//							timeout:800,
//							type:'warn'
//						})
//				 }
//			},
//			'json'
//	    );
//	  })
//}

//删除撤牌的挂牌
function updateDeleteStatus(id){
	Boxy.confirm('确定删除吗？',function(){
		jQuery.post (
				appServer + '/listing/updateDeleteStatus_'+id+'.htm',
	        function(v){
	    		if(v.result == 'success'){
						Hundsun.PopUtil.alert({
							msg:'挂牌删除成功！',
							autohide : true,
							width:350,
							timeout:800,
							callback :function(){		
								document.getElementById("searchForm").submit();;
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

//挂牌删除
function deleteListing(id){
	Boxy.confirm("确定删除挂牌吗（此操作将删除该挂牌对应的模版）？",function(){
		jQuery.post (
				appServer +'/listing/delete_'+id+'.htm',
	        {'id':id},
	        function(v){
	    		if(v.result == 'true'){
						Hundsun.PopUtil.alert({
							msg:'挂牌删除成功......',
							autohide : true,
							width:350,
							timeout:800,
							callback :function(){	
								document.getElementById("searchForm").submit();;
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

//设置挂牌模版
function listingModel(id){
	art.dialog({
			id:'listingModel',
			title:'请填写模版属性',
			lock: true,
		    content: '<table><tr><th><span style="color:red">*</span>模版标题：</th><td ><input id="title" name="title" type="text" value="" maxlength="85" title="最多输入85个字"/></td></tr><br/><tr><th>模版备注：</th><td><textarea name="remark" id="remark" cols="35" rows="4" maxlength="340" title="最多输入340个字"></textarea></td></tr></table>',
		    yesFn:function(){
				var title = $("#title").val();
				var remark = $("#remark").val();
				
				if(Hundsun.StringUtil.trim(title)==""){   //还要排除空格
					art.dialog({
						id : "doNotNull",
						lock : true,
						opacity: 0.5,
					    content: '模版标题不能为空！',
					    yesFn : true
					});
					  $('input[name=title]').focus();
					  return false;
				  }
				
				jQuery.ajax({
					type : "POST",
					url : appServer + "/listing/model_" + id + ".htm",
					data : {
						"title" : title,
						"remark" : remark
					},
					success : function(data) {
						if("success"==data){
							art.dialog({
								id : "addSuccess",
								lock : true,
							    content: '模版设置成功',
							    yesFn : true
							});
						}else if("error"==data){
							art.dialog({
								id : "doNotLimit",
								lock : true,
							    content: '您没有该操作的权限',
							    yesFn : true
							});
						}else{
							art.dialog({
								id : "addSuccess",
								lock : true,
							    content: '模版设置失败',
							    yesFn : true
							});
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
			noFn:function(){}
		});
}

//防止有些浏览器不支持textarea的maxlength
$(function(){ 
     $("textarea[maxlength]").blur(function(){ 
         var area=$(this); 
         var max=parseInt(area.attr("maxlength"),10);   //获取maxlength的值 
         if(max>0){ 
             if(area.val().length>max){                 //textarea的文本长度大于maxlength 
                 area.val(area.val().substr(0,max));    //截断textarea的文本重新赋值             
             } 
         } 
     }); 
 });

function ontopcheck(obj){
 	if(obj.checked){
 		$(".listBox table").find(":checkbox").attr("checked","checked");
	}
	 	else
	{ 
    	$(".listBox table").find(":checkbox").removeAttr("checked");
	}
}

function onmidcheck(obj){
 	if(obj.checked){
 		$(obj).parentsUntil("table").nextUntil(".list_ck").find(":checkbox").attr("checked","checked");
	}
	else
	{ 
  	 $(obj).parentsUntil("table").nextUntil(".list_ck").find(":checkbox").removeAttr("checked");
	}
}

/**
 * 批量提交挂牌信息
 * @return
 *//*
function submitBatch(){
	if(0==$(".tlpinput:checked").size()){
		art.dialog({
			id : "NotNull",
			lock : true,
			content:  "请勾选您要提交的挂牌信息",
			yesFn : true
		});
	}else{
		var idS = ""
			for(var i=0; i< $(".tlpinput:checked").size(); i++){
				idS +="," + $($(".tlpinput:checked").get(i)).attr("value").toString() ;
			}
			art.dialog({
				id : "submit",
				lock : true,
			    content: '确定要提交这些信息吗?',
			    yesFn : function(){
				jQuery.ajax({
					type : "POST",
					url : appServer + "/listing/submitBatch.htm",
					data : {
						"idS" : idS
					},
					success : function(data) {
							if("true"==data.result){
									art.dialog({
										id : "submitSuccess",
										lock : true,
										content: "批量提交成功！",
										yesFn : function(){
											var idArr = data.submitedId.split(",");
											for(var i=0; i< idArr.length; i++){
												var subId = idArr[i]
												$("input[value="+subId+"]").parentsUntil("table").remove();
											}
											window.location.reload();
										}
									});
									
							}else{
								var errorMsg = (!data.msg) ? "" : data.msg;
								art.dialog({
										id : "submitFalse",
										lock : true,
										content: errorMsg,
										yesFn : function(){
											if((undefined!=result.loginUrl) && ("undefined"!=result.loginUrl) && (/^\s*$/g.test(result.loginUrl)==false)){
												//跳转到登录页面
												window.open (result.loginUrl) ;
											}
											//去除null等情况
											if(""!=idArr && null!=idArr){
												var idArr = data.submitedId.split(",");
												for(var i=0; i< idArr.length; i++){
													var subId = idArr[i]
													$("input[value="+subId+"]").parentsUntil("table").remove();
												}
											}
											window.location.reload();
										}
									});
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
}*/

//批量挂牌提交
function submitBatch(){
	if(0==$(".tlpinput:checked").size()){
		art.dialog({
			id : "NotNull",
			lock : true,
			content:  "请勾选您要提交的挂牌信息",
			yesFn : true
		});
	}else{
		document.getElementById("listForm").action = appServer + "/listing/batch/submit.htm";
		document.getElementById("listForm").submit();
	}
}