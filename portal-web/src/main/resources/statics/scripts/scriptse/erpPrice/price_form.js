jQuery(function($) {
	var form = $('#addForm').validateForm(
			{
				// valedateHidden:true,
				ignore : ':hidden',// 不校验隐藏元素
//				rules : {
//					'erpPrice' : {
//						required : true,
//						number : true,
//						min : 0.01
//					}
//				},
//				messages : {
//					'erpPrice' : {
//						required : "ERP物料价格为必填项！",
//						number : "ERP物料价格必须是数字",
//						min : "ERP物料价格输入有误"
//					}
//				},
				submitHandler : function(f) {
					var priceId = $("#priceId").val();
					Hundsun.PopUtil.confirm({
						width : 500,
						msg : "请仔细填写，确认提交吗？" ,
						autohide : false
					}, function() {
						$('input[type=submit]', $(f)).attr('disabled', 'disabled');
						_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
						$(f).ajaxSubmit(function(result) {
							priceId ? callbackforupdate(result) : callbackforadd(result);
						});
					});

				}
			});
	//jQuery("#btnOpenWin").click(ErpGoodSelector.openSelector);
});


/**
 * 
 * @param  result {object} 			 
 * 			<li>title {string}</li>
 * 			<li>type {string} success,error</li> 
 */
function callbackforadd(result){
	if(_msg) {_msg.hide();}
	result = initMsg(result);
	var params = {type:result.type};
	if(params.type == 'error' || params.type == 'warn'){	
		params = setByError(params,result);	
	}else{	
		params.msg = '<span style="color:green;font-size:14px;font-weight:bold;">添加成功!</span> 您可以' +
				'<ul style="margin-top:5px;"><li> - <a href="list.htm">返回列表</a></li>' +
				'<li> - <a href="add.htm">继续添加</a></li>' +
				'<li> - <a href="view_'+result.data+'.htm">查看添加的数据</a></li></ul>',
			
		params.callback = function(){
			Hundsun.UrlUtil.redirect('list.htm');
		}
	}
	
	Hundsun.PopUtil.alert(params);
} 

/**
 * 
 * @param  params {object} 			 
 * 			<li>msg {string}</li>
 * 			<li>type {string} success,error</li> 
 */
function callbackforupdate(result){	
	if(_msg) {_msg.hide();}	
	
	result = initMsg(result);

	var params = {type:result.type};

	if(params.type == 'error' || params.type == 'warn'){	
		params = setByError(params,result);
	}else{
		params.msg = '修改成功! 正在返回列表......',
		params.autohide = true,
		params.timeout = 1000,			
		params.callback = function(){
			Hundsun.UrlUtil.redirect('list.htm');
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
	$('form :submit').attr('disabled',false);
	return params;
}
 
 function clearV(){
	$(".inpt").val("");
 }
 
 
 function afertSelectedGood(data){
	if(data){
      $("#addForm input[id=erpSystem]").val(data.erpSystem);
      $("#addForm input[id=erpNo]").val(data.erpNo);
      $("#addForm input[id=erpDesc]").val(data.erpDesc);
      $("#erpGoodsDialog").dialog("close");
	}
 }
