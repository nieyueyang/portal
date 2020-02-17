//删除数据
function deleteById(id) {
	if (confirm("确定删除该客户？")) {
		window.location.href = "delete.htm?id=" + id;
	}
}
//修改数据
function updateById(id){
	window.location.href = "update.htm?id=" + id ;
}


//查看详细信息
function detail(id){
	window.open("detail.htm?id=" + id);//window.location.href = "detail.htm?id=" + id;
}
//client查看详细信息
function clientDetail(id){
	window.open("clientDetail.htm?id=" + id);
}
//下载到excel
function downloadById(id){
	window.location.href = "downloadById.htm?id=" + id;
}
//client下载到excel
function clientDownloadById(id){
	window.location.href = "clientDownloadById.htm?id=" + id;
}

