var order=order||{};

order.init=function(){
};

//选择部门
order.chooseDType=function chooseDType(data){
	//console.log(data);
	var treeDataArray = treeDataFilter(data);
	if(treeDataArray == null || treeDataArray.length == 0) {		
		showDepartmentAlert("只选择一个部门");		
		return false;
	}
	//jQuery("#kindRange").val(getTreeCodes(treeDataArray));
	var treeCodes = getTreeCodes(treeDataArray);
	var treeNames = getTreeNames(treeDataArray);	
	var treeIds = getTreeIds(treeDataArray);	
	jQuery("#departmentName").val(treeNames);
	jQuery("#departmentCode").val(treeCodes);
	jQuery("#departmentId").val(treeIds);
	jQuery("#departmentName").attr("title", treeNames);
	//添加完毕后校验品种
	return true;
};



