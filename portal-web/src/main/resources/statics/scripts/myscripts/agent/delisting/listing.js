/*function resetForm(){
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
}*/

//查看详情
function listingDetail(id){
	window.location.href= appServer+"/entrustDelisting/view_"+id+".htm";
}

//摘牌
function delistingView(id){
	//先进行判断是否已经摘过牌
	jQuery.get(appServer + '/entrustDelisting/whetherDelisting_'+id+'.htm',
	        function(v){
	    		if(v.result == 'false'){
						Hundsun.PopUtil.alert({
							msg:v.msg,
							autohide : true,
							width:200,
							hight:200,
							timeout:900,
							type:'warn'
						})
						
				 }else{
					window.location.href= appServer +"/entrustDelisting/delistingView_" + id + ".htm";
				 }
			},
			'json'
	    );
	
}


//删除撤牌的挂牌(逻辑删除)
function updateDeleteStatus(id){ 
	Boxy.confirm('确定删除吗？',function(){
		jQuery.post (
				appServer + '/agentListing/updateDeleteStatus_'+id+'.htm',
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

//挂牌删除(物理删除)
function deleteListing(id){
	Boxy.confirm("确定删除挂牌吗？",function(){
		jQuery.post (
				appServer +'/agentListing/delete_'+id+'.htm',
	        {'id':id},
	        function(v){
	    		if(v.result == 'true'){
						Hundsun.PopUtil.alert({
							msg:'挂牌删除成功......',
							autohide : true,
							width:350,
							timeout:800,
							callback :function(){	
								document.getElementById("searchForm").submit();
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