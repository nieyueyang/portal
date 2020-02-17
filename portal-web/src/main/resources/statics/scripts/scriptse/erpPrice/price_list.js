
var _msg;
function exportExcel(){
    if(!$("#size").val() || $("#size").val() == 0){
			alert("没有符合条件的数据！");
			return false;
     }
	 var actionUrl = appServer + '/erpgoodprice/exportExcel.htm';
	 $("#export_form").attr("action", actionUrl);
	 $("#export_form").submit();
	return true;
}

function batchInvalid(size){
	 if(!$("#erpNo").val()){
		alert("ERP物料编码查询条件不能为空");
		return false;
	 }
	 if(!$("#bDateStr").val()){
		alert("生效开始时间查询条件不能为空");
		return false;
	 }
	 Hundsun.PopUtil.confirm(
		{msg:"总共" + size + "条;确认这批数据要批量失效，请谨慎操作！",width:350},
			function(){
			  _msg = Hundsun.PopUtil.loading();	//渲染提示"系统正在处理请稍候"
			 jQuery.post(       
					 "batchInvalid.htm",
				     Hundsun.FormUtils.getFormValues('searchForm'),       
				     function(result){
						callbackforInvalid(result);	
				    }
			      )
			 }
	 );
	 return true; 
}

/**
 * 
 * @param  params {object} 			 
 * 			<li>msg {string}</li>
 * 			<li>type {string} success,error</li> 
 */
function callbackforInvalid(result){	
	if(_msg) {_msg.hide();}	
	
	result = initMsg(result);
	var params = {type:result.type};
	
	if(params.type == 'error' || params.type == 'warn'){	
		params = setByError(params,result);
		params.callback = function(){
			location.reload();
		}
	}else{
		params.msg = '批量失效成功! 正在返回列表......',
		params.autohide = true,
		params.timeout = 1000,			
		params.callback = function(){
			Hundsun.UrlUtil.refresh();
		}		
	}
	Hundsun.PopUtil.alert(params);
}

function initMsg(result){
	if(!result){
		result = {};
		result.type = 'success';
	}else if(typeof(result)=='string'){
		result = $.parseJSON(result);
	}
	return result;
}

function setByError(params,result){
	if(result.title){
		params.msg = result.title;
	}else{
		params.msg = '非常抱歉，系统出错，请稍候再试！';
	}
	params.autohide = false;
	return params;
}
