var _msg;
function resetForm(){
	$("#varietyCode").val("");
	$("#varietyName").val("");
	$("#specification").val("");
	$("#material").val("");
	$("#status").val("");
	$("#listingDates").val("");
	$("#listingDatee").val("");
	$("#companyName").val("");
	$("#dealStatus").val("");
	$("#batchNo").val("");
}
//查看详情
function listingDetail(id){
	window.location.href= appServer+"/agentListing/detailSubmit_"+id+"_view.htm";
}
//修改挂牌
function editListing(id){
	window.location.href= appServer +"/agentListing/edit_"+id+".htm";
}
//提交挂牌
function listingSubmit(id){
	window.location.href= appServer+"/agentListing/detailSubmit_"+id+"_submit.htm";
}

//挂牌中、未成交的挂牌(还没有生成合同的挂牌)，修改挂牌价格
function listingEditPrice(id){
	window.location.href= appServer+"/agentListing/editPrice_"+id+".htm";
}

//快速挂牌
/*function listingQuick(id){
	window.location.href= appServer+"/listing/quickListing_"+id+".htm";
}*/

//部分撤牌
/*function listingClose(id){
	window.location.href= appServer +"/agentListing/close_"+id+".htm";
}*/

//撤牌(全部撤牌)
function closeListing(id){
	Boxy.confirm('确定撤牌吗？',function(){
		 _msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
		jQuery.post (
				appServer + '/agentListingMg/listingCancel_'+id+'.htm',
	        function(v){
	    		if(v.result == 'true'){
						Hundsun.PopUtil.alert({
							msg:'撤牌成功,马上刷新列表...',
							autohide : true,
							width:350,
							timeout:800,
							callback :function(){		
								document.getElementById("searchForm").submit();
							}
						})
						
				 }else{
				 	   if (_msg) {_msg.hide();}
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


//删除撤牌的挂牌(逻辑删除)
function updateDeleteStatus(id){
	Boxy.confirm('确定删除吗？',function(){
		_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
		jQuery.post (
				appServer + '/agentListing/updateDeleteStatus_'+id+'.htm',
	        function(v){
	    		if(v.result == 'true'){
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
				 	 if (_msg) {_msg.hide();}
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

//挂牌删除(物理删除)
function deleteListing(id){
	Boxy.confirm("确定删除挂牌吗？",function(){
		_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
		jQuery.post (
				appServer +'/agentListing/delete_'+id+'.htm',
	        {'id':id},
	        function(v){
	    		if(v.result == 'true'){
						Hundsun.PopUtil.alert({
							msg:'挂牌删除成功.....',
							autohide : true,
							width:350,
							timeout:800,
							callback :function(){	
								document.getElementById("searchForm").submit();
							}
						})
				 }else{
				 	if (_msg) {_msg.hide();}
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
/*function listingModel(id){
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
}*/

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