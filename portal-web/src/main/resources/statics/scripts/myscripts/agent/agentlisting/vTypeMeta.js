jQuery.ajaxSetup ({cache:false});
var prjTypeUrl = {
	nodesURL :appServer +"/listing/loadForTree.htm?isActive=true"
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

var currObj  ;

function showPrjTypeSel4ew(followObj, yesFn, valueClass, nameClass,
		prjTypeMetaBoxId,parCode,companyId,userId) {
			currObj  = followObj ;
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
		$("#varietyCode").val(data.code);
		$("#varietyName").val(data.name);
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
	},null,parCodeQuery,companyIdQuery,userIdQuery,encodeURI(shortName)); //encodeURI(shortName)
	$('#prjTypeTreeUL').html(inputText);
	$('input[name=dicKey]').val(shortName);
	}

    var formHtml = "";
	var htmlCode ="";
    var appendHtml = '';
	//选中品种后的回调
function chooseVType(data){
	if(""==data || null==data || undefined === data){
		return
	}
	
	//判断是否存在重复选择的品种
	var row_cur = $(currObj).parent().parent().parent().parent().parent().parent(); //获取列表的row（行） 
	//获取 前面和后面 所有行的 数据
/*	var isExist = false;
	row_cur.nextAll().each(function(){
		var tt= $(this).find("input[name='varietyTypeCode']").val();
		if(tt == data.code){
			isExist = true;
		}
	}
	);
    row_cur.prevAll().each(function(){
		var tt= $(this).find("input[name='varietyTypeCode']").val();
		if(tt == data.code){
			isExist = true;
		}
	}
	);
	
	if(isExist){
		alert("已经添加,请选择其他品种!");
		return;
	}*/
	
    //当前对象时 currObj
	//那就当前对象获取当前行即可 //耦合了代码 
	var mainTab = document.getElementById("mainTab");
	var row = $(currObj).parent("td").parent("tr"); //获取列表的row（行） 
	//往隐藏域中 存放 varietyTypeCode
	row_cur.find("input[name='varietyTypeCode']").val(data.code);
	row.find("input").each(function() {
				var name = $(this).attr("name");
				if("varietyShortName" == name){
					$(this).val(data.name);
				}
			});
	
	//动态拼装 属性框框
			fullName = data.name;
	  $.get(appServer + '/contract/init_Variety.htm?' + Math.round((Math.random()) * 100000000),
	        {"varietyCode":data.code},
    	function(data) {
        	var varietyTypeDTO = data.varietyTypeDTO;
        	var msg = data.msg;
        	if (msg != null) {
            	Hundsun.PopUtil.alert({
            		msg:msg,
                	width: 450,
                	timeout: 800,
                	type: 'warn'
           	 }) 
            	return;
        	}
            if(varietyTypeDTO==null){
	    				 Hundsun.PopUtil.alert({
								msg:"没有找到品种信息！",
								width:450,
								timeout:800,
								type:'warn'
							})
	    				 return;
	    			}
	    	        
	    			//常规物品属性列表
	    			var WP = data.attrData.WP_LIST;
	    			//规格属性列表
	    			var GG = data.attrData.GG_LIST;
	    			//单价单位
	    			var priceUnitType = data.priceUnitType;
	    			//重量单位
	    			var weightUnitType = data.weightUnitType;
	    			
					 htmlCode ="";
 					appendHtml="";
	    			formHtml = "<fieldset><legend>常规物品属性</legend><table width='100%'>";
	    			jQuery(WP).each(function (i){
	    				creatForm(this,i,WP.length,fullName,null);
	    				});
	    			formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;
	    			
	    			formHtml = "<fieldset><legend>物品规格属性</legend><table width='100%'>";
    				jQuery(GG).each(function (i){
	    				creatForm(this,i,GG.length,fullName,null);
	    			});
	             formHtml = formHtml +"</table></fieldset>";
	    		 htmlCode = htmlCode + formHtml;
	    		 
	    		 formHtml = '<fieldset><legend>入库属性</legend><table class="c3">';
	    			
	    		formHtml = formHtml
						+ "<tr><th  width='19%'><span style='color:red'>*</span>入库重量：</th>"
						+ "<td width='36%'>"
						+ "<input type='text'  id='applyWeight' name='applyWeight' "
						+ " onblur='checkApplyWeight(this);' style='width:126px;'/>" + (weightUnitType != null ? weightUnitType : "吨") + "</td>";
			  formHtml = formHtml
						+ "<th  width='19%'>入库数量：</th>"
						+ "<td width='36%'>"
						+ "<input type='text'  id='quantity' name='quantity' "
						+ " onblur='checkQuantity(this);' style='width:126px;' /></td></tr>";	
			    formHtml = formHtml
						+ "<tr><th  width='19%'><span style='color:red'>*</span>入库单价：</th>"
						+ "<td width='36%' >"
						+ "<input type='text'  id='unitPrice' name='unitPrice' "
						+ " onblur='checkUnitPrice(this);' style='width:126px;' />" + (priceUnitType != null ? priceUnitType : "元/吨") + "</td>";			
	
			    formHtml = formHtml
				+ "<th  width='19%'>入库时间：</th>"
				+ "<td width='36%' >"
				+ "<input type='text'  id='enterWhDate' name='enterWhDate' "
				+ " onfocus=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'} );\" style='width:127px;'   /></td></tr>";			
				
/*			    
 *   formHtml = formHtml+
					"<tr><th  width='12%'>备注信息：</th>" +
	    			"<td colspan='3'><textarea name=\"remark\" id=\"remark\" cols=\"80\" rows=\"3\" maxlength=\"340\" title=\"请不要超过340的长度\"></textarea></td></tr>";*/
						
                 formHtml = formHtml +"</table></fieldset>";
	    		 htmlCode = htmlCode + formHtml;
	    		 
	    		  addNew2(row,htmlCode);
   
    });		
    
}

function addNew2(row,htmlCode) {

	var table1 = $("#mainTab");
	var row1 = $("<tr></tr>"); //第一行为主要信息
	var td1 = $("<td></td>");
	td1.append(htmlCode);
	
	row1.append(td1);
	
	//table1.append(row1);
	
	var t = row.next();
	t.find("td").eq(0).html(htmlCode);
} 

function creatForm(attr,i,length,varietyFullName,project){
	var inputType = attr.keyType;//类型
	var isRequired = attr.isRequired;//是否必选
	var groupType = attr.groupType;//属性组类型；F=常规；D=动态
	var valueValidate = attr.valueValidate ==null?"":attr.valueValidate;//验证表达式
	var clas = isRequired == "1" ? "required":"";//验证样式
	clas = clas+"  "+valueValidate;
	var value="",readOnly="",unitType="";

	
		if(i%2==0){
			appendHtml = '<tr>';
		}
		
	if(attr.keyCode=="productionDate" || attr.keyCode=="image"){
		return;		
		}
		//判断是否必填
		if(isRequired == "1"){
			appendHtml = appendHtml + " <th  width=\"19%\">"+"\<span style=\"color:red\">*</span>"+attr.keyTitle+"：</th>";
		}else{
			appendHtml = appendHtml + " <th  width=\"19%\">"+attr.keyTitle+"：</th>";
		}
		
		if(attr.keyCode=="varietyCode"){
			value =varietyFullName;
			attr.keyCode = "varietyName";
		}
		if(attr.keyCode=="listUnitPrice"){
			attr.keyCode = "listUnitPrice_num";
		}
		
		if(attr.unitType ==null || typeof attr.unitType == "undefined"){
			unitType="";
		}else{
			unitType=attr.unitType;
		}
		
		//新增时品种属性设置默认值.挂牌常规属性的value为挂牌主表的对应字段值
		if(groupType=="F"){//常规属性
			if(project && project.listingType =="C"){
				value = project[attr.keyCode]== null ? "":project[attr.keyCode];
				if(attr.keyCode!="minWeight" && attr.keyCode!="settlementDate" && attr.keyCode!="billRemark" && attr.keyCode!="listUnitPrice_num" ){
					readOnly = "readOnly";
				}
			}else{
				if(attr.keyCode =="varietyName"){
					readOnly = "readOnly";
				}
			}
			if(project &&( project.listingType =="W"  || project.listingType =="F")){
				value = project[attr.keyCode]== null ? "":project[attr.keyCode];
			}
		}
		
		if(value==""){
			if(attr.text ==null || typeof attr.text == "undefined"){
				value="";
			}else{
				value =attr.text;
			}
		}

	appendHtml = appendHtml + "<td width=\"36%\">";
	//输入框为文本框 
	if(inputType == "TEXT"){
		var onblurFunc="";
		if(attr.keyCode=="listWeight" || attr.keyCode=="minWeight"){
			onblurFunc = 'onblur="checkWeight();"';
			var listingType = $("#listingType").val();
			if(listingType =="W" && attr.keyCode=="listWeight"){readOnly = "readOnly";}
		}
		if(attr.keyCode =="listUnitPrice_num"&& $("#listUnitPriceF").val()!=""){
			value = parseFloat(Number($("#listUnitPriceF").val()/100)).toFixed(2)+"";
		}
		appendHtml = appendHtml + "<input type=\"text\"  id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\" value=\""+value+"\"  "+ readOnly+" "+ onblurFunc+" class=\"inpt  "+clas+"\" style=\"width:126px;\" />"+unitType+" <span class=\"red\"></span>";
	}
	else if(inputType == "DATE"){
		//格式日期
		if((value+"").indexOf("-")>=0){
	    	
	    }else{
	    	value = Hundsun.formatDate(value,"yyyy-MM-dd")
	    }
		if(project && project.listingType =="C" && attr.keyCode!="settlementDate" && attr.keyCode=="productionDate"){
			appendHtml = appendHtml + "<input type=\"text\" maxlength=\"100\" id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\" readOnly  value=\""+value+"\"  "+ readOnly+" class=\"inpt "+clas+"\" style=\"width:126px;\" /> <span class=\"red\"></span>";
		}else{
			appendHtml = appendHtml + "<input type=\"text\" maxlength=\"100\" id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\" readOnly onClick=\"WdatePicker()\" value=\""+value+"\"  "+ readOnly+" class=\"inpt "+clas+"\" style=\"width:126px;\" /> <span class=\"red\"></span>";
		}
	}else if(inputType == "TEXTAREA"){//输入框为文本域 
			appendHtml = appendHtml + "<textarea rows=\"2\" cols=\"30\"  id=\""+attr.keyCode+"\" name=\""+attr.keyCode+ "\" class=\"inpt "+clas+"\" >"+value+"</textarea><span class=\"red\"></span>";
	}else if(inputType == "DATETIME"){
		//格式日期
		if((value+"").indexOf("-")>=0){
	    	
	    }else{
	    	value = Hundsun.formatDate(value,"yyyy-MM-dd HH:mm:ss")
	    }
		appendHtml = appendHtml + "<input type=\"text\" maxlength=\"100\" id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\" readOnly onClick=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})\" value=\""+value+"\"  "+ readOnly+" class=\"inpt "+clas+"\" style=\"width:126px;\" /> <span class=\"red\"></span>";
	//选择框	
	}else if(inputType == "CHECKBOX" || inputType == "SELECT" || inputType == "RADIO"){
		var attr_values = attr.text == null? "": attr.text.split("\n");
		if(inputType == "CHECKBOX"){
			var clickFunc ="";
			if(attr.keyCode=="deliveryType"){
				clickFunc = 'onclick="setWHValue();"';
			}
			
			jQuery(attr_values).each(function(j){
				var arrval = attr_values[j]== null? "": attr_values[j].split("|");
				//设置CHECKBOX默认选择项
				if(value && value.indexOf(arrval[0])>=0){
					appendHtml = appendHtml + "<input type=\"checkbox\" name=\""+attr.keyCode+"\" value=\""+arrval[0]+"\" "+clickFunc+" class=\"inp \" /> <font>" + arrval[1]+"</font>";
				}else{
					appendHtml = appendHtml + "<input type=\"checkbox\" name=\""+attr.keyCode+"\" value=\""+arrval[0]+"\" "+clickFunc+" class=\"inp \" /> <font>" + arrval[1]+"</font>";
				}
				
			});
			if (isRequired == "1") {
				appendHtml += '<font class="error" required generate"true" style="display:none" for="'+attr.keyCode+'" forTitle="'+attr.keyTitle+'">至少选择一个选项</font>';
			}
		}else if(inputType == "SELECT"){
			var clickFunc ="";
			if(attr.keyCode=="deliveryType"){
				clickFunc = 'onchange="setWHValue();"';
			}
			//下拉框
			appendHtml = appendHtml + "<select id=\""+attr.keyCode+"\"  name=\""+attr.keyCode+"\" class=\"select  "+clas+"\" "+clickFunc+" style=\"width:130px;\">";
			//appendHtml = appendHtml + "<option value=\"\">请选择</option>";
			jQuery(attr_values).each(function(j){
				var arrval = attr_values[j]== null? "": attr_values[j].split("|");
				//修改时设置SELECT默认选择项
				if(value ==arrval[0]){
					appendHtml = appendHtml + "<option value=\""+arrval[0]+"\" selected>"+arrval[1]+"</option>";
				}else{
					appendHtml = appendHtml + "<option value=\""+arrval[0]+"\">"+arrval[1]+"</option>";
				}
			});
			appendHtml = appendHtml + "</select><span id=\""+attr.keyCode+"_select\"></span><span class=\"red\"></span>";
		}else if(inputType == "RADIO"){ //console.log(attr_values);
				//单选按钮
				jQuery(attr_values).each(function(j){
				var arrval = attr_values[j]== null? "": attr_values[j].split("|");
				var clickFunc ="";
				if(attr.keyCode=="deliveryType"){
					clickFunc = 'onclick="setWHValue();"';
				}
				//修改时设置RADIO默认选择项
				if(value ==arrval[0]){
					appendHtml = appendHtml + "<input type=\"radio\" id=\""+attr.keyCode+j+"\" name=\""+attr.keyCode+"\" value=\""+arrval[0]+"\"  "+clickFunc+"  checked class=\"inp\" /> " + arrval[1]+"&nbsp;&nbsp;";
				}else{
					appendHtml = appendHtml + "<input type=\"radio\" id=\""+attr.keyCode+j+"\" name=\""+attr.keyCode+"\" value=\""+arrval[0]+"\"   "+clickFunc+" class=\"inp\" /> " + arrval[1]+"&nbsp;&nbsp;";
				}
			});
			appendHtml = appendHtml + "<span class=\"red\"></span>";
			if (isRequired == "1") {
				appendHtml += '<font class="error" required generate"true" style="display:none" for="'+attr.keyCode+'" forTitle="'+attr.keyTitle+'">至少选择一个选项</font>';
			}
		}
		//文件类型	
	} else if(inputType == "FILE"){
		appendHtml = appendHtml + "<input type=\"file\" maxlength=\"255\" name=\""+attr.keyCode+"_file\" value=\""+value+"\" class=\"inpt  "+clas+"\" style=\"width:126px;\" /><span  style=\"margin-left:70px;\" class=\"red\"></span>";
	}
	
	appendHtml = appendHtml + "</td>";
	if(i%2==1 || i == length-1){
		appendHtml = appendHtml + "</tr>";
		formHtml = formHtml + appendHtml;
	}
}
