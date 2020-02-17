
//选择节点后的回调函数
function chooseVType(data){
	if(data==null){
		return;
	}
	$("#varietyName").html("品种名称: "+data.name);
	$("#varietyCode").html("编码: "+data.code);
	$("#code").val(data.code);
	$("#name").val(data.name);
	
	jQuery.get('/ajax/query_variety_' + data.code + '.htm', null,
			function(data) {
				createForm(data);
				
	});
	
	
}

/**
* 生成表单里的内容
* 
* @param data
*/
function createForm(data) {
	var appendHtml = "<tr><td colspan=\"4\"  >模板参考字段</td></tr><tr><th width=\"75px\">字段名</th><th >表头</th><th width=\"48px\">是否必填</th>";
	appendHtml+="<th >备注,选项(显示名,对应值) </th></tr>"
	appendHtml+="<tr><td>挂牌方式</td><td>listingType</td><td>必填</td><td>选项: (保证金挂牌 , D) (信用挂牌 , G) </td></tr>";
	//appendHtml+="<tr><td>仓库名称</td><td>warehouseCmpName</td><td></td><td>仓库名称和仓库ID必须填一个,仓库名称填了必须填交收地址；如果交收方式是“线上结算场内交收”,则仓库ID必填，其它交收方式需要填仓库名称和交收地址</td></tr>";
	//appendHtml+="<tr><td>仓库ID</td><td>warehouseCmpId</td><td></td><td>"+$("#wareStr").val()+"</td></tr>";
	appendHtml+="<tr><td>挂牌开始日期</td><td>listingDates</td><td>必填</td><td>不能小于当前日期，且不能大于挂牌结束日期；格式如:2012-01-01</td></tr>";
	appendHtml+="<tr><td>挂牌结束日期</td><td>listingDatee</td><td>必填</td><td>格式如:2012-01-01</td></tr>";
	appendHtml+="<tr><td>价格审批编号</td><td>priceApproval</td><td></td><td> </td></tr>";
	appendHtml+="<tr><td>备注</td><td>remark</td><td></td><td> </td></tr>";
	var titleHtml="<th class=\"nowrap\">序号</th><th>listingType</th><th>warehouseCmpName</th><th>warehouseCmpId</th><th>listingDates</th><th>listingDatee</th><th>priceApproval</th><th>remark</th>"; 	
	var titleHtml2="<th >序号</th><th>挂牌方式</th><th>仓库名称</th><th>仓库ID</th><th class=\"nowrap\">挂牌开始日期</th><th class=\"nowrap\">挂牌结束日期</th><th class=\"nowrap\">价格审批编号</th><th class=\"nowrap\">备注</th>"; 	
	
	jQuery(data).each(function (i){
			if(data[i].keyType=="FILE"){
				return;
			}
			titleHtml+="<th>"+data[i].keyCode+"</th>";
			titleHtml2+="<th class=\"nowrap\">"+data[i].keyTitle+"</th>";
			
			//将仓库名称、仓库ID字段移到交收地址字段前面，使这些有关字段放在一起
			var varietyTypeCode=data[i].keyCode;
			
			if(varietyTypeCode=="settlementAddr"){
				appendHtml+="<tr><td>仓库名称</td><td>warehouseCmpName</td><td></td><td>当交收仓库是非指定交收库时，必须填写仓库名称和交收地址</td></tr>";
				appendHtml+="<tr><td>仓库ID</td><td>warehouseCmpId</td><td></td><td>当交收仓库是指定交收库时，必须填写仓库ID。交收库选项:"+$("#wareStr").val()+"</td></tr>";
			}
			
			appendHtml = appendHtml+'<tr>';
		
			appendHtml=appendHtml+createTd(data[i]);
		
			appendHtml = appendHtml + "</tr>";
		
	});
	$("#titleHtml").html(titleHtml);
	$("#titleHtml2").html(titleHtml2);
    $("#varietyHtml").html(appendHtml);
}


/**
* 生成td里的内容
* @param obj
* @returns {String}
*/
function createTd(obj) {
	var lenght=100;
	var appendHtml = "";
	var inputType = obj.keyType;
	var isRequired=obj.isRequired;
	var varietyTypeCode=obj.keyCode;
	var groupType=obj.groupType;
	var varietyGroup=obj.toGroup;
	var keyTitle=obj.keyTitle;
	var varietyTypeId=obj.id;
	var varietyTypeValue=obj.value;
	var varietyTypeValueText=obj.text;
	var unitType=obj.unitType;
	
	var noticeStr="";
	var isRequiredStr="";
	if (isRequired == "1") {
		isRequiredStr = "必填";
	}
	if(varietyTypeCode=="minWeight"){
		noticeStr += "不能大于挂牌量;";
	}
	if(varietyTypeCode=="settlementDate"){
		noticeStr += "必须大于挂牌结束日期;";
	}
	if(varietyTypeCode=="varietyCode"){
		noticeStr += "填写品种编码";
	}
	if(varietyTypeCode=="specification"){
		noticeStr += "不用填写，由“厚度*宽度*长度*动态规格属性”组合生成";
	}
	
	var attr_values = obj.text == null ? "" : obj.text.split("\n");
	appendHtml+="<td >"+keyTitle+"</td>";
	appendHtml+="<td >"+varietyTypeCode+"</td>";
	appendHtml+="<td >"+isRequiredStr+"</td>";
	if (inputType == "CHECKBOX" || inputType == "SELECT"
			|| inputType == "RADIO") {
		noticeStr+="选项: ";
		if (inputType == "CHECKBOX" || inputType == "SELECT" || inputType == "RADIO") {
			jQuery(attr_values).each(
					function(j) {
						var arrval = attr_values[j] == null ? ""
								: attr_values[j].split("|");
						noticeStr+= " ("+arrval[1] +" , "+arrval[0]+")";
							
					});
		} 
	}
	if (inputType == "DATE"){
		noticeStr+="格式如:2012-01-01";
	}
	if(unitType!='' && unitType!=null){
		noticeStr+="单位:"+unitType;
	}
	
	if(varietyTypeCode=="deliveryType"){
		noticeStr += "。交收方式1只支持指定交收库交收，0、1、3支持指定和非指定交收库"
	}
	appendHtml+="<td >"+noticeStr+"</td>";
	return appendHtml+"</td>";
}