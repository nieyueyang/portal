// 提供给非同域下选择品种用. 采用跨域脚本解决方案.
$(function() {
		});

// 类型树数据缓存
var prjTypeTree;
/**
 * 
 * @param followObj
 *            弹出层要跟随的按钮或输入框(元素对象,或元素ID)
 * @param yesFn
 *            选择后的回调函数,参数为选中的对象,
 *            结构为{code:value,name:value,parentcode:value,parentcodeShort:value}
 */
function showPrjTypeSel(followObj, yesFn) {
	showPrjTypeArtBox(followObj,
			'<span style="color:green;">正在加载品种信息,请稍候...</span>', function() {
			});
	var prjTypeTreeUL_Tmp = $("#prjTypeTreeUL");

	if (!prjTypeTreeUL_Tmp || prjTypeTreeUL_Tmp.length == 0) {
		prjTypeTreeUL_Tmp = $('<ul id="prjTypeTreeUL" class="tree" style="display:none;height:220px;width:250px; OVERFLOW:auto;"></ul>');
		$("body").append(prjTypeTreeUL_Tmp);
		prjTypeTree = reloadPrjTypeTree('prjTypeTreeUL');
		showPrjTypeArtBox(followObj,
				'<span style="color:red;">加载品种信息失败!请刷新页面后再试!</span>',
				function() {
				});
	}

	showPrjTypeArtBox(followObj, '', yesFn);
}
function showPrjTypeArtBox(followObj, content, yesFn) {
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
			fn(data);
			return data;
		},
		noFn : function() {
		}
	};
	if (content)
		op.content = content;
	if (typeof(followObj) == "object")
		op.follow = followObj;
	else if (typeof(followObj) == "string")
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
 */
function reloadPrjTypeTree(boxID) {

	var treeBox = $("#" + boxID);
	var curLi;// 根据curValue设置当前值样式
	if (!treeBox)
		return;
	if (curLi)
		curLi.removeClass("focus");
	var setting = {
		expandSpeed : "",
		asyncParam : ["name", "code"], // 获取节点数据时，必须的数据名称，例如：id、name
		showLine : true,
		isSimpleData : true,
		treeNodeKey : "code",
		treeNodeParentKey : "parentcodeShort"
	};
	if (curLi)
		curLi.addClass("focus");
	/**
	 * 类型树JSON数据
	 */
	// var prjTypeTreeNodes = [];
	var prjTypeTree = treeBox.zTree(setting, varietyData);
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
		for (var k in jsonObj) {
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
 */
function defaultPrjTypeSelYesFn(data) {
	if (!data) {
		// alert("您没有选择品种!");
	} else {
		$("#varietyCode").val(data.code);
		$("#varietyName").val(data.name);
	}

}
