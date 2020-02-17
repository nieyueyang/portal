jQuery(function($) {
	var form = $('#theForm').validateForm(
			{
				// valedateHidden:true,
				ignore : ':hidden',// 不校验隐藏元素
				submitHandler : function(f) {
					var supplyAmt = $("#supplyAmt").val();
					Hundsun.PopUtil.confirm({
						width : 500,
						msg : "您补缴的货款金额为" + supplyAmt +"元，确认提交吗？" ,
						autohide : false
					}, function() {
						$('input[type=submit]', $(f)).attr('disabled', 'disabled');
						_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
						$(f).ajaxSubmit(function(result) {
							 callbackforadd(result);
						});
					});

				}
			});
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
		//params.msg = '<span style="color:green;font-size:14px;font-weight:bold;">添加成功!</span> 您可以' +
				//'<ul style="margin-top:5px;"><li> - <a href="/contract/entrust/list.htm">返回合同列表</a></li>',
		params.msg = '<span style="color:green;font-size:14px;font-weight:bold;">补缴成功!</span>';
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
	$('form :submit').attr('disabled',false);
	return params;
}
 

