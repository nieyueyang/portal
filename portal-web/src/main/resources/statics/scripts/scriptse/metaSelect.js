var prjTypeUrl = {
	//nodesURL : appServer + "/user/load_for_tree.htm"
	nodesURL : appServer + "/listing/loadForTreeForUser.htm?isActive=true&parCode=20"
};

var prjTypeTree;
var inputText = "<input type=\"text\"  id=\"dicKey\" name=\"dicKey\"  class=\"inpt\" style=\"width:100px;\" /> <button type=\"button\" onclick=\"queryTreeByShortName();\" class=\"button-4\">搜索</button>";
jQuery(function(){
	jQuery("#checkAll").click(function(){
		var checkFlag = jQuery("#checkFlag").val();
		if(checkFlag == "1") {
			prjTypeTree.checkAllNodes(false);
			jQuery("#checkFlag").val("0");
			jQuery("#checkAll").html("全选");
		} else {
			prjTypeTree.checkAllNodes(true);
			jQuery("#checkFlag").val("1");
			jQuery("#checkAll").html("反选");
		}
	})
});
 

/**
 * 加载品种树
 * @param treeYesFn 成功加载品种信息后的回调函数
 * @param treeNoFn 加载品种失败后的回调函数
 * @param meterialFlag 物料标志位，如true，相关文案将由“品种”→“物料”
 * @author tanhl
 */
function showVarietyTree(treeYesFn, treeNoFn, meterialFlag, url) {
	var tip = "正在加载品种信息，请稍候...";
	var title;
	if(meterialFlag) {
		tip = "正在加载物料信息，请稍候...";
		title = "物料选择";
	}
	if(url != "" && url != undefined) {
		prjTypeUrl.nodesURL = url;
	}
	 showCustomAlert(tip, ""); //显示正在加载的提示信息
	var treeBox = jQuery("#prjTypeTreeUL");
	if(!treeBox || treeBox.length == 0 || treeBox.html() == "") {
		//如果树形结构里没内容，表示第一次加载，异步取数据
		jQuery("#varietyDialog").append('<ul id="prjTypeTreeUL" class="tree" style="display:none;height:230px;width:275px; OVERFLOW:auto;"></ul>');
		var tmpTreeBox = jQuery("#prjTypeTreeUL");
		loadTree(tmpTreeBox, tip, title, treeYesFn, treeNoFn);
		$('#prjTypeTreeUL').html(inputText);
	} else {
		//如果已经加载过，则显示已经加载好的信息，不重新到数据库捞数据
		$("#varietyDialog").dialog("open");
		$("#dialog-confirm").dialog( "close" ); //关闭正在加载的提示信息
	}
	
}

/**
 * 异步加载品种数据
 * @author tanhl
 */
function loadTree(treeBox, tip, title, treeYesFn, treeNoFn) {
	var setting = {
			expandSpeed : "",
			async : true,
			asyncUrl : prjTypeUrl.nodesURL, // 获取节点数据的URL地址
			asyncParam : [ "name", "code" ], // 获取节点数据时，必须的数据名称，例如：id、name
			showLine : true,
			//checkLeafOnly : true,  //added by tanhl 2012-11-21 叶子节点才显示复选框（新增的自定义属性）
			checkFromLevel : 1, //added by tanhl 20130531 客户方需求更改：支持二级节点开始的品种
			isSimpleData : true,
			checkable : true,
			treeNodeKey : "code",
			//Y 属性定义 CheckBox 被勾选后的情况；N 属性定义 CheckBox 取消勾选后的情况；
			//"p" 表示操作会影响父级节点；"s表明操作会影响子级节点。
			//added by tanhl 2012-11-21
			checkType : { "Y": "s", "N": "p" }, 
			treeNodeParentKey : "parentcode",
			callback : {
				asyncSuccess : function () {
 					
					if(prjTypeTree.getNodes().length == 0) {
						 showCustomAlert("没有可添加的品种！");
						//  <a href='#' style='color:gray'>去维护>></a>
					} else {
						 
						//若返回的树节点不为0，即不为空
						//prjTypeTree.expandAll(true); //展开树的所有节点
						$("#dialog-confirm").dialog( "close" ); //关闭正在加载的提示信息
						showTreeDialog("", title, "", treeYesFn);
					}
				},
				asyncError : function () {
					showTreeDialog("数据加载失败，请稍后再试！", title);
					if(treeNoFn != undefined) {
						treeNoFn();
					}
				}
			}
		};
	var prjTypeTreeNodes = [];
	//返回生成好的tree
	prjTypeTree =  treeBox.zTree(setting, prjTypeTreeNodes);
	 
}

/**
 * 过滤树形结构勾选的数据，只筛选出4级节点的数据
 * @param data
 * @returns {Array}
 * @author tanhl
 */
function treeDataFilter(data) {
    var treeDataArray = new Array();
	if(data != null && data != undefined) {
		for(var i=0; i<data.length; i++) {
			//根节点code位数为2，每增加一级结点，code长度加2
			if(data[i].code.length == 8) {
				treeDataArray.push({
			       code : data[i].code,
				   name : data[i].name
				});
			}
		}
	}
	return treeDataArray;
}

/**
 * 返回品种code数组
 * @param treeDataArray
 * @returns {Array}
 * @author tanhl
 */
function getTreeCodes(treeDataArray) {
	var codeArray = new Array();
	if(treeDataArray != null && treeDataArray.length > 0) {
		for(var i=0; i<treeDataArray.length; i++) {
			codeArray.push(treeDataArray[i].code);
		}
	}
	return codeArray;
}

/**
 * 返回品种name数组
 * @param treeDataArray
 * @returns {Array}
 * @author tanhl
 */
function getTreeNames(treeDataArray) {
	var nameArray = new Array();
	if(treeDataArray != null && treeDataArray.length > 0) {
		for(var i=0; i<treeDataArray.length; i++) {
			nameArray.push(treeDataArray[i].name);
		}
	}
	return nameArray;
}

/**
 * 过滤重复的品种code或名称
 * @param kindRange
 * @param treeArray
 * @returns
 * @author tanhl
 */
function filterDuplicateCode(kindRange, treeArray) {
	if(kindRange != undefined && kindRange != "") {
		var kindArray = kindRange.split(',');
		//如果页面已经选择过了数据，将进行比较过滤
		if(kindArray.length > 0) {
			if(treeArray != null && treeArray.length > 0) {
				for(var j=0; j<treeArray.length; j++) {
					//如果选择的品种不存在已选择的input里，则添加
					if(!isExist(treeArray[j], kindArray)) {
						kindArray.push(treeArray[j]);
					}
				}
			}
			return kindArray;
		}
	} else {
		//否则没有选择过数据，将treeArray的值返回
		return treeArray;
	}
	//将过滤后的值返回
	return null;
}

/**
 * 判断元素item是否在给定数组中
 * @param item
 * @param kindArray
 * @returns {Boolean}
 * @author tanhl
 */
function isExist(item, kindArray) {
	if(kindArray != undefined && kindArray.length>0) {
		for(var i=0; i<kindArray.length; i++) {
			if(item == kindArray[i]) {
				return true;
			}
		}
	}
	return false;
}

/**
 * 过滤ajax返回的已经添加的物料name
 * @param queryList
 * @param addedArray
 * @author tanhl
 */
function filterAddedMaterialNames(queryList, addedArray) {
	if(!isBlank(queryList) && !isBlank(addedArray)) {
		for(var i=0; i<queryList.length; i++) {
			//如果存在，则从添加的物料数组中删除
			if(isExist(queryList[i].materielName, addedArray)) {
				removeItem(queryList[i].materielName, addedArray)
			}
		}
	}
}

/**
 * 过滤ajax返回的已经添加的物料code
 * @param queryList
 * @param addedArray
 * @author tanhl
 */
function filterAddedMaterialCodes(queryList, addedArray) {
	if(!isBlank(queryList) && !isBlank(addedArray)) {
		var haveAddedArray = new Array();
		for(var i=0; i<queryList.length; i++) {
			//如果存在，则从添加的物料数组中删除
			if(isExist(queryList[i].materielCode, addedArray)) {
				removeItem(queryList[i].materielCode, addedArray);
				haveAddedArray.push(queryList[i].materielCode);
			}
		}
		return haveAddedArray;
	}
	return null;
}

/**
 * 删除数组中给定的元素
 * @param item
 * @param array
 * @returns
 * @author tanhl
 */
function removeItem(item, nArray) {
	for(var i=0; i<nArray.length; i++) {
		if(nArray[i] == item) {
			nArray.splice(i, 1);
			return;
		}
	}
}

//搜索品种
function queryTreeByShortName() {     
	var shortName =  $("#dicKey").val();
	var url = prjTypeUrl.nodesURL ;
	if(shortName!=null&&shortName!=""){
		 prjTypeUrl.nodesURL = url+"&shortName="+shortName;
	} 
	var tmpTreeBox = jQuery("#prjTypeTreeUL");
	loadTree(tmpTreeBox, "", "", chooseVType, "");
	prjTypeTree.expandAll(true); //全部展开
	prjTypeUrl.nodesURL =url;
	$('#prjTypeTreeUL').html(inputText);
	$('input[name=dicKey]').val(shortName);
}

