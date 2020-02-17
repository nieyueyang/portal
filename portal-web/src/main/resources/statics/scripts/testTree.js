var zTree,rMenu;
$(document).ready(function() {
	loadTree();
	var opMsg = $("#opMsg").is(":hidden");// 是否隐藏
	if(!opMsg){
		setTimeout("$(\"#opMsg\").attr(\"style\",\"display:none\")",2000);//2秒，可以改动
	}
	$("#addParent").bind("click", addGroup);
	$("#addCrew").bind("click", addCrew);
	$("#batchAddCrew").bind("click",batchAddCrew);
	$("#edit").bind("click", editDirName);
	$("#move").bind("click", moveForm);
	rMenu = $("#rMenu");
	zTree = $.fn.zTree.getZTreeObj("treeDemo");
});

function loadTree() {
	var setting = {
		async : {
			enable : true,
			url : "ajax/getTree.htm",
			autoParam : [ "parentId" ],
			dataFilter : filter
		},
		view : {
			expandSpeed : "1000",
		},
		data : { // 必须使用data
			simpleData : {
				enable : true,
				idKey : "id", // id编号命名
				pIdKey : "parentId", // 父id编号命名
				rootPId : "-1"
			}
		},
		callback : {
			onClick : onClick,
			onRightClick: OnRightClick
		}
	};
	/**
	 * 过滤数据
	 * @param treeId
	 * @param parentNode
	 * @param childNodes
	 * @returns
	 */
	function filter(treeId, parentNode, childNodes) {
		if (!childNodes)
			return null;
		for ( var i = 0, l = childNodes.length; i < l; i++) {
			childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
			if (childNodes[i].parentId == "-1") {
				childNodes[i].open = true;
			}
		}
		return childNodes;
	}
	/**
	 * 节点点击事件
	 * @param event
	 * @param treeId
	 * @param treeNode
	 * @param clickFlag
	 */
	function onClick(event, treeId, treeNode, clickFlag) {
		var groupForm = $("#saveGroupForm").is(":hidden");// 是否隐藏
		var crewForm = $("#crewForm").is(":hidden");// 是否隐藏
		var batchAddCrew = $("#memberImport").is(":hidden");// 是否隐藏
		var dirForm = $("#dirForm").is(":hidden");// 是否隐藏
		var moveForm = $("#moveForm").is(":hidden");// 是否隐藏
		if (!groupForm) {
			addGroupNode(treeNode);
		} else if (!crewForm) {
			addCrewNode(treeNode);
		} else if (!dirForm) {
			editDirNode(treeNode);
		} else if (!batchAddCrew) {
			batchAddCrewNode(treeNode);
		} else if (!moveForm) {
			moveNode(treeNode);
		}

	}
	// 初始化树
	$.fn.zTree.init($("#treeDemo"), setting);
}
/** ***********************************************************新增目录****************************** */
/*
 * [新增目录]点击事件
 */
function addGroup() {
	$("#impotMsg").attr("style","display:none");
	$("#saveGroupForm").show();
	$("#crewForm").hide();
	$("#dirForm").hide();
	$("#memberImport").hide();
	$("#moveForm").hide();
	 $(":text").attr("value","");
	$(":radio").change(function() {
		var id = $(this).attr("id");
		if (id == "levelB") {
			$("#pd").hide();
		}
		if (id == "levelA") {
			$("#pd").show();
		}
	})
}
/**
 * 新增目录
 * @param treeNode
 */
function addGroupNode(treeNode) {
	if (treeNode.level < 2) {
		$("#parentId").val(treeNode.id);
		$("#parentName").val(treeNode.name);
	} else {
		alert("只支持三级目录");
		return;
	}
}
/**
 * 新增目录前提交检查
 * @param a
 */
function groupSubmit(a) {
	
	if (($("#groupName").attr("value")).length < 1) {
		alert("目录名不能为空!");
		return;
	}
	if ($("#levelA").attr("checked")) {
		var parentName = $("#parentName").val();
		if (parentName.length <= 0) {
			alert("请选择父目录!");
			return;
		}
	}
	if ($("#levelB").attr("checked")) {
		$("#parentName").val("")
		$("#parentId").val("")
	}
	avoidDuplicateSubmit('A');
	$(a).submit();
}

/** ***********************************************************新增组员****************************** */
function addCrew() {
	$("#impotMsg").attr("style","display:none");
	$("#saveGroupForm").hide();
	$("#dirForm").hide();
	$("#memberImport").hide();
	$("#moveForm").hide();
	$("#crewForm").show();
	 $(":text").attr("value","");
}

function addCrewNode(treeNode) {
	if (treeNode.level == 3) {
		alert("此目录无法添加成员");
		return;
	} else {
		$("#firstMenuNumber").val(treeNode.id);
		$("#firstMenuName").val(treeNode.name);
	}
}
function crewSubmit(a) {
	if (($("#firstMenuName").val()).length < 1) {
		alert("父目录名不能为空!");
		return;
	}
	if (($("#customerName").val()).length < 1) {
		alert("客户名称不能为空");
		return;
	}
	if (($("#customerTelephone").val()).length < 1) {
		alert("客户号码不能为空");
		return;
	}
	if ($("#customerTelephone").val().trim() == "") {
		alert("客户号码不能为空!");
		return;
	}
	if ($("#customerTelephone").val().trim().length > 22) {
		alert("客户号码不符合要求!");
		return;
	}
	if (!/^\d+$/.test($("#customerTelephone").val().trim())) {
		alert("客户号码格式不正确!");
		return;
	}
	if ($("#customerTelephone").val().trim() < 7) {
		alert("客户号码不符合要求!");
		return;
	}
	avoidDuplicateSubmit('B');
	$(a).submit();
}
String.prototype.trim = function () {
	return this .replace(/^\s*((?:[\S\s]*\S)?)\s*$/, '$1' );
	 }
function batchAddCrew(){
	$("#impotMsg").attr("style","display:none");
	$("#saveGroupForm").hide();
	$("#dirForm").hide();
	$("#crewForm").hide();
	$("#moveForm").hide();
	$("#memberImport").show();
	 $(":text").attr("value","");
}
function batchAddCrewNode (treeNode){
	if (treeNode.level == 3) {
		alert("此目录无法添加成员");
		return;
	} else {
		$("#batchId").val(treeNode.id);
		$("#batchFirstMenuName").val(treeNode.name);
	}
}
//校验格式
function checkXls(obj){
	var id = obj.id;
	var regex = /.(xls)$/i;
	var value = jQuery("#" + id).val();
	if("" == value) {
		jQuery("#"+id+"_file_span").html("*&nbsp;&nbsp;&nbsp;请上传xls格式的模版文件");
		return false;
	} else if(!regex.test(value)) {
		jQuery("#"+id+"_file_span").html("*&nbsp;&nbsp;&nbsp;上传模版文件的格式错误");
		return false;
	} else {
		jQuery("#"+id+"_file_span").html("*");
		return true;
	}
}
function submitTradeOrder(){
	var flag = true;
	if(!checkXls(document.getElementById("memberFile"))) {
		flag = false;
		return false;
	}
	if(($("#batchId").val()).length<1){
		alert("请选择小组");
		flag = false;
		return ;
	}
	if(flag){
		document.getElementById("saveBtnC").removeAttribute("onclick");
		jQuery("#saveBtnC").attr("disabled", "disabled");
		jQuery("#saveBtnC").attr("value", "导入中...");
		var id = $("#batchId").val()
		avoidDuplicateSubmit('C');
		$("#memberImport").attr("action","membersBatchImport.htm?id="+id);
		$("#memberImport").submit();
	}else{
		duplicateSubmit("C");
	}
	
}
jQuery(function(){
	$( "#dialog-confirm" ).dialog({
		autoOpen: false,
		resizable: false,
		height:380,
		width:600,
		modal: true,
		buttons: {
			"关闭": function() {
				$( this ).dialog( "close" );
			}
		}
	});
})
function showErrMsg(){ 
	$( "#dialog-confirm" ).dialog( "open" );
	$(".sEMsg").removeAttr("hidden")
}
/** *********************************************修改目录名称******************************* */
function editDirName() {
	$("#impotMsg").attr("style","display:none");
	$("#saveGroupForm").hide();
	$("#crewForm").hide();
	$("#memberImport").hide();
	$("#moveForm").hide();
	$("#dirForm").show();
	 $(":text").attr("value","");
}
function editDirNode(treeNode) {
	$("#oldName").val(treeNode.name);
	$("#dirId").val(treeNode.id);
	$("#dirPhone").val(treeNode.customerTelephone);
	$("#dirLevel").val(treeNode.level);
}
function dirSubmit(a) {
	if (($("#oldName").val()).length < 1) {
		alert("请选择需要修改的目录");
		return;
	}
	if (($("#dirGroupName").val()).length < 1) {
		alert("新名称不能为空!");
		return;
	}
	avoidDuplicateSubmit('D');
	$(a).submit();
}
/***********************************************移动目录********************************************/
function moveForm(){
	$("#impotMsg").attr("style","display:none");
	$("#saveGroupForm").hide();
	$("#crewForm").hide();
	$("#memberImport").hide();
	$("#dirForm").hide();
	$("#moveForm").show();
	 $(":text").attr("value","");
}
var le;
function moveNode(treeNode) {
	if (($("#oldDir").val()).length < 1) {
		le = treeNode.level;
		$("#oldDir").val(treeNode.name);
		$("#oldDirId").val(treeNode.id);
		$("#phone").val(treeNode.customerTelephone);
		$("#oldDirLevel").val(treeNode.level);
	} else {
		if (treeNode.level == le) {
			alert("同级目录，不能移动");
			$(":text").attr("value", "");
			return;
		} else if (treeNode.level >= le) {
			alert("不能作为目标目录");
			$(":text").attr("value", "");
			return;
		} else {
			$("#tarDirName").val(treeNode.name);
			$("#tarDirId").val(treeNode.id);
		}
	}
}
function moveSubmit(a) {
	if (($("#oldDir").val()).length < 1) {
		alert("请选择源目录");
		return;
	}
	if (($("#tarDirName").val()).length < 1) {
		alert("请选择目标目录");
		return;
	}
	avoidDuplicateSubmit('E');
	$(a).submit();
}




//按钮失效
function avoidDuplicateSubmit(sort) {
	jQuery("#saveBtn"+sort).attr("style", "color:gray");
	jQuery("#saveBtn"+sort).attr("disabled", "disabled");
}
//按钮有效
function duplicateSubmit(sort){
	document.getElementById("saveBtn"+sort).removeAttribute("disabled");
	jQuery("#saveBtn"+sort).attr("value", "提交");
}
//右键菜单
function OnRightClick(event, treeId, treeNode){
	if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
		zTree.cancelSelectedNode();
		showRMenu("root", event.clientX, event.clientY);
	} else if (treeNode && !treeNode.noR) {
		zTree.selectNode(treeNode);
		showRMenu("node", event.clientX, event.clientY);
	}
}
//显示邮件菜单
function showRMenu(type, x, y) {
	$("#rMenu ul").show();
	if (type=="root") {
		$("#m_del").hide();
	} else {
		$("#m_del").show();
	}
	rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"});
	$("body").bind("mousedown", onBodyMouseDown);
}
//隐藏右键菜单
function hideRMenu() {
if (rMenu) rMenu.css({"visibility": "hidden"});
	$("body").unbind("mousedown", onBodyMouseDown);
}

function onBodyMouseDown(event){
	if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
		rMenu.css({"visibility" : "hidden"});
	}
}
//删除节点
function removeTreeNode() {
	hideRMenu();
	var nodes = zTree.getSelectedNodes();
	if (nodes && nodes.length>0) {
		if (nodes[0].children && nodes[0].children.length > 0 ) {
			var msg = "此节点是父节点，如果删除将连同子节点一起删除。\n请确认！";
			if (confirm(msg)==true){
				if(null!=nodes[0].id&&""!=nodes[0].id&&"undefined"!=nodes[0].id){
					zTree.removeNode(nodes[0]);
					deleteNodes(nodes[0]);
				}else{
					alert("数据异常，无法删除！")
				}
			}
		} else {
			if(null!=nodes[0].id&&""!=nodes[0].id&&"undefined"!=nodes[0].id){
				zTree.removeNode(nodes[0]);
				deleteNodes(nodes[0]);
			}else{
				alert("数据异常，无法删除！")
			}
		}
		
	}
}
function deleteNodes(node){
	console.log(node);
	$.ajax({
	     type: 'POST',
	     url: "ajax/deleteTeamGroup.htm" ,
	    data: {id:node.id,telphone:node.customerTelephone} ,
	    success: function(data){
	    	if(data){
	    		alert("删除成功");
		    	zTree.reAsyncChildNodes(null, "refresh");
	    	}else{
	    		alert("删除失败");
		    	zTree.reAsyncChildNodes(null, "refresh");
	    	}
	    	
	    } 
	});
}
function moveUpTreeNode(){
	hideRMenu();
	var nodes = zTree.getSelectedNodes();
	if (nodes && nodes.length>0) {
		alert("上移节点【"+nodes[0].name+"】"+nodes[0].id)
	}
}
function moveDownTreeNode(){
	hideRMenu();
	var nodes = zTree.getSelectedNodes();
	if (nodes && nodes.length>0) {
		alert("下移节点【"+nodes[0].name+"】"+nodes[0].id)
	}
}