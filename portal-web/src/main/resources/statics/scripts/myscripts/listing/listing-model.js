function resetForm(){
	$("#title").val("");
	$("#gmtCreateL").val("");
	$("#gmtCreateR").val("");
}

//快速挂牌
function listingQuick(id){
	window.location.href= appServer+"/listing/quickListing_"+id+".htm";
}

//一键挂牌
function listingSuper(id){
	window.location.href= appServer+"/listing/superListing_"+id+".htm";
}

//删除挂牌模板
function deleteModel(id){
	art.dialog({
		id : "delModel",
		lock : true,
	    content: '确定要删除挂牌模版吗?',
	    yesFn : function(){
			$.post(appServer+"/listing/model/delete_"+id+".htm", 
				   function(data){
					if("success"==data){
						art.dialog({
							id : "delSuccess",
						    content: '模版删除成功',
						    time: 3
						});
						$("#searchForm").submit();
					}else if("error"==data){
						art.dialog({
							id : "doNotLimit",
							lock : true,
						    content: '您没有该操作的权限！',
						    yesFn : true
						});
					}else{
						art.dialog({
							id : "delFaile",
							lock : true,
						    content: '模版删除失败',
						    yesFn : true
						});
					}
				   });
		},
		noFn: true
	});
	
}