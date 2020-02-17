jQuery.ajaxSetup ({cache:false});
var prjTypeUrl = {
	//nodesURL :appServer +"/listing/loadForTree.htm?isActive=true"
		nodesURL :appServer +"/variety/ajax/getVarietyTypeTree.htm?isActive=true"
	,nodesUserURL :appServer +"/listing/loadForTreeForUser.htm?isActive=true"  //加载会员定制树url
};
var metaErrors = "";
var metaSubmitValue = "";
$(function() {
	metaErrors = $("#metaErrors").val();
	metaSubmitValue = $("#metaSubmitValue").val();
	if (typeof (metaErrors) != 'undefined' && metaErrors && metaErrors != "") {
		metaErrors = eval('(' + metaErrors + ')'); // 动态属性的提示对象
	}
	if (typeof (metaSubmitValue) != 'undefined' && metaSubmitValue
			&& metaSubmitValue != "") {
		metaSubmitValue = eval('(' + metaSubmitValue + ')'); // 属性的上次提交的保存值
	}
});

var a = new Array();
// 类型树数据缓存
var prjTypeTree;

var setting;
var inputText = "<input type=\"text\"  id=\"dicKey\" name=\"dicKey\"  class=\"inpt\" style=\"width:100px;\" /> <button type=\"button\" onclick=\"queryTreeByShortName();\" class=\"button-4\">搜索</button>";
var prjTypeTreeUL_Tmp = $("#prjTypeTreeUL");

var followObjQuery;
var yesFnQuery;
var valueClassQuery;
var nameClassQuery;
var prjTypeMetaBoxIdQuery;
var parCodeQuery;
var companyIdQuery;
var userIdQuery;

/**
 * 
 * @param followObj
 *            弹出层要跟随的按钮或输入框(元素对象,或元素ID)
 * @param yesFn
 *            选择后的回调函数,参数为选中的对象,
 *            结构为{code:value,name:value,parentcode:value,parentcodeShort:value}
 * @param parCode
 *            查询parCode下的品种树
 * @param valueClass
 *            默认处理时,将选择的数据code要放入的HTML标签Class,默认为:projectTypeCode
 * @param nameClass
 *            默认处理时,将选择的数据name要放入的HTML标签Class,默认为:projectTypeName
 * @param prjTypeMetaBoxId
 *            默认处理时,将根据选择的类型,动态请求服务器获取该类型的动态属性表单,请显示在prjTypeMetaBoxId容器中,默认为:prjTypeMetaBox
 * @param companyId: 品种树类型。企业id=会员定制品种数，其它：默认品种数
 * @param userId: 如果不为空，查看操作员的id
 */
function showPrjTypeSel(followObj, yesFn, valueClass, nameClass,
		prjTypeMetaBoxId,parCode,companyId,userId) {
	showPrjTypeArtBox(followObj,
			'<span style="color:green;">正在加载品种信息,请稍候...</span>', function() {
			});
	 followObjQuery = followObj;
	 yesFnQuery = yesFn;
	 valueClassQuery = valueClass;
	 nameClassQuery = nameClass;
	 prjTypeMetaBoxIdQuery =prjTypeMetaBoxId;
	 parCodeQuery = parCode;
	 companyIdQuery = companyId;
	 userIdQuery = userId;
//	var prjTypeTreeUL_Tmp = $("#prjTypeTreeUL");
	if (!prjTypeTreeUL_Tmp || prjTypeTreeUL_Tmp.length == 0) {
		prjTypeTreeUL_Tmp = $('<ul id="prjTypeTreeUL" class="tree" style="display:none;height:220px;width:250px; OVERFLOW:auto;"></ul>');
		$("body").append(prjTypeTreeUL_Tmp);
		prjTypeTree = reloadPrjTypeTree('prjTypeTreeUL', null, function(event,
				treeId, treeNode, msg) {
			showPrjTypeArtBox(followObj, '', yesFn, valueClass, nameClass,
					prjTypeMetaBoxId);
		}, function(event, treeId, treeNode, XMLHttpRequest, textStatus,
				errorThrown) {
			prjTypeTreeUL_Tmp.remove();
			showPrjTypeArtBox(followObj,
					'<span style="color:red;">加载品种信息失败!请稍后再试!</span>',
					function() {
					});
		},null,parCode,companyId,userId,null);
		$('#prjTypeTreeUL').html(inputText);
	} else {
		prjTypeTree.expandAll(false); //全部折叠
		showPrjTypeArtBox(followObj, '', yesFn,valueClass, nameClass,
				prjTypeMetaBoxId);
	}
}
function showPrjTypeArtBox(followObj, content, yesFn, valueClass, nameClass,
		prjTypeMetaBoxId) {
	var op = {
		id : "prjTypeSelBox",
		title : "请选择 品种!",
		drag : true,
		// lock : true,
		padding : 0,
		fixed : true,
		content : document.getElementById('prjTypeTreeUL'),
		yesFn : function() {
			var data = prjTypeTree.getSelectedNode()
		
			if(""==data || null==data || undefined === data){  
				art.dialog({
					id : "chooseOne",
					lock : true,
				    content: '请选择一个具体的品种！',
				    yesFn : true
				});
			  return false;
			}
			
			fn = yesFn || defaultPrjTypeSelYesFn;
			fn(data, valueClass, nameClass, prjTypeMetaBoxId);
		return data;
	},
	noFn : function() {
	}
	};
	if (content)
		op.content = content;
	if (typeof (followObj) == "object")
		op.follow = followObj;
	else if (typeof (followObj) == "string")
		op.follow = document.getElementById(followObj);
	try {
		art.dialog.list['prjTypeSelBox'].close();
	} catch (e) {
	}
	art.dialog(op);
}

/**
 * 显示类型树
 * 
 * @param boxID
 *            树容器的ID
 * @param parCode
 *            查询parCode下的品种树
 * @param {}
 *            beforeAsyncFn 在请求数据前的回调
 * @param {}
 *            asyncSuccessFn 加载数据成功后的回调
 * @param {}
 *            asyncErrorFn 请求出错时的回调
 * @param curValue
 *            当前值,方便在树中高亮当前值
 * @param companyId: 品种树类型。U=会员定制品种数，其它：默认品种数
 * @param userId: 会员没有设置品种时，是否显示默认品种。true=显示（默认）。false=不显示
 */
function reloadPrjTypeTree(boxID,beforeAsyncFn, asyncSuccessFn, asyncErrorFn,
		curValue,parCode,companyId,userId,shortName) {
	if(undefined==parCode || "undefined"==parCode){parCode="";}
	if(/^\s*$/g.test(parCode)){parCode="";}
	var url = prjTypeUrl.nodesURL;
	if(isEmpty(companyId)==false){
		url = prjTypeUrl.nodesUserURL+"&companyId="+companyId;
	}
	/*if(isEmpty(userId)==false && (userId=="false" || userId==false)){
		url = prjTypeUrl.nodesUserURL+"&companyId="+companyId+"&userId="+userId;
	}*/
	if(shortName !=null)
		url= url+"&shortName="+shortName;
	var treeBox = $("#" + boxID);
	var curLi;// 根据curValue设置当前值样式
	if (!treeBox)
		return;
	if (curLi)
		curLi.removeClass("focus");
	var setting = {
		expandSpeed : "",
		async : true,
		asyncUrl : url+"&parCode="+parCode, // 获取节点数据的URL地址
		asyncParam : [ "name", "code" ], // 获取节点数据时，必须的数据名称，例如：id、name
		showLine : true,
		isSimpleData : true,
		treeNodeKey : "code",
		treeNodeParentKey : "parentcodeShort",
		callback : {
			// beforeAsync : beforeAsyncFn,//好像无效
			asyncSuccess : asyncSuccessFn,
			asyncError : asyncErrorFn
		}
	};
	if (curLi)
		curLi.addClass("focus");
	/**
	 * 类型树JSON数据
	 */
	var prjTypeTreeNodes = [];
	var prjTypeTree = treeBox.zTree(setting, prjTypeTreeNodes);
	return prjTypeTree;
}

/**
 * 复制数据 treeBox.zTree(setting, clone(prjTypeTreeNodes));
 * 
 * @param jsonObj
 * @param newName
 * @return newName
 */
function clone(jsonObj, newName) {
	var buf;
	if (jsonObj instanceof Array) {
		buf = [];
		var i = jsonObj.length;
		while (i--) {
			buf[i] = clone(jsonObj[i], newName);
		}
		return buf;
	} else if (typeof jsonObj == "function") {
		return jsonObj;
	} else if (jsonObj instanceof Object) {
		buf = {};
		for ( var k in jsonObj) {
			if (k != "parentNode") {
				buf[k] = clone(jsonObj[k], newName);
				if (newName && k == "name")
					buf[k] += newName;
			}
		}
		return buf;
	} else {
		return jsonObj;
	}
}


/**
 * 默认的选择后确定按钮处理
 * 
 * @param data
 *            结构为{code:value,name:value,parentcode:value,parentcodeShort:value}
 * @param valueClassDefault
 *            默认处理时,将选择的数据code要放入的HTML标签Class,默认为:projectTypeCode
 * @param nameClassDefault
 *            默认处理时,将选择的数据name要放入的HTML标签Class,默认为:projectTypeName
 * @param prjTypeMetaBoxId
 *            默认处理时,将根据选择的类型,动态请求服务器获取该类型的动态属性表单,请显示在prjTypeMetaBoxId容器中,默认为:prjTypeMetaBox
 */
function defaultPrjTypeSelYesFn(data, valueClass, nameClass, prjTypeMetaBoxId) {
	if(!data){
		//alert("您没有选择品种!");
	}else{
		$(followObjQuery).prev('input').val(data.code);
		$(followObjQuery).val(data.name);
		//$("#varietyCode").val(data.code);
		//$("#varietyName").val(data.name);
	}
	
}

function isEmpty(v){
	if(undefined==v || "undefined"==v){return true;}
	if(/^\s*$/g.test(v)){
		return true;
	}else{
		return false;
	}
}


//搜索品种
function queryTreeByShortName() {     
	var shortName =  $("#dicKey").val();
	prjTypeTree = reloadPrjTypeTree('prjTypeTreeUL', null, function(event,
			treeId, treeNode, msg) {
		showPrjTypeArtBox(followObjQuery, '', yesFnQuery, valueClassQuery, nameClassQuery,
				prjTypeMetaBoxIdQuery);
		if(shortName !="")
			prjTypeTree.expandAll(true); //全部展开
	}, function(event, treeId, treeNode, XMLHttpRequest, textStatus,
			errorThrown) {
		prjTypeTreeUL_Tmp.remove();
		showPrjTypeArtBox(followObj,
				'<span style="color:red;">加载品种信息失败!请稍后再试!</span>',
				function() {
				});
	},null,parCodeQuery,companyIdQuery,userIdQuery,encodeURI(encodeURI(shortName))); //encodeURI(shortName)
	$('#prjTypeTreeUL').html(inputText);
	$('input[name=dicKey]').val(shortName);
	}

