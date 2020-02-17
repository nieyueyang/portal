function search() {
	$("#searchForm").submit();
}
function deleteData(id) {
	art.dialog.confirm("确定要删除该数据吗？", function() {
		$.ajax({
			url : "ajax/deleteData.htm",
			async : false,
			data : {
				id : id
			},
			success : function(result) {
				if(result="S"){
					art.dialog({
						title : '操作提示',
						content : "删除成功!",
						icon : 'succeed',
						modal : true,
						yesFn : function() {
							$("#searchForm").submit();
						},
					})
				}else{
					art.dialog({
						title : '操作提示',
						content : "删除失败!",
						icon : 'error',
						modal : true,
						yesFn : function() {
							$("#searchForm").submit();
						},
					})
				}
			},
			error : function(result) {
				art.dialog({
					title : '操作提示',
					content : "删除失败!",
					icon : 'error',
					modal : true,
					yesFn : function() {
						$("#searchForm").submit();
					},

				})
			}
		});
	});
}

function updateData(id) {
	window.location.href = "toUpdate.htm?id=" + id;
}
function changeStatus(id,status,title){
	art.dialog.confirm("确定要【"+title+"】该数据吗？", function() {
		$.ajax({
			url : "ajax/changeStatus.htm",
			async : false,
			data : {
				id : id,
				status:status
			},
			success : function(result) {
				if(result="S"){
					art.dialog({
						title : '操作提示',
						content : "【"+title+"】成功!",
						icon : 'succeed',
						modal : true,
						yesFn : function() {
							$("#searchForm").submit();
						},
					})
				}else{
					art.dialog({
						title : '操作提示',
						content : "【"+title+"】失败!",
						icon : 'error',
						modal : true,
						yesFn : function() {
							$("#searchForm").submit();
						},
					})
				}
			},
			error : function(result) {
				art.dialog({
					title : '操作提示',
					content : "系统异常",
					icon : 'error',
					modal : true,
					yesFn : function() {
						$("#searchForm").submit();
					},

				})
			}
		});
	});

}