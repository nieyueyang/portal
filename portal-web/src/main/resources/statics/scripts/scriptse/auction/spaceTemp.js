function resetForm(){
	$("#tempName").val("");
	$("#sDate").val("");
	$("#eDate").val("");
}

//一键挂牌
function auctionSuper(id,type){
	window.location.href= appServer+"/auction/space/seller/superSpaceTemp.htm?id="+id+"&auctionType="+type;
}

//删除挂牌模板
function deleteModel(id){
	if(confirm("是否确定删除该模板")){
		window.location.href= appServer+"/auction/space/seller/spaceDelTemp.htm?id="+id;
   }else{
		return false;
	}
	
}