/**
 * @include "../includes.js"
 */

var _msg;
jQuery(function($) {
	var form = $('#form').validateForm(
			{
				ignore : ':hidden',// 不校验隐藏元素
				rules : {
					'erp_excel' : {
						required : true
					}
				},
				messages : {
					'erp_excel' : {
						required : "请选择需导入的excel文件"
					}
				},
				submitHandler : function(f) {// form jquery验证通过之后提交之前执行
					$('input[type=submit]', $(f)).attr('disabled', 'disabled');
					_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
					$(f).ajaxSubmit(
							function(result) {
								callbackforadd(result);
							});
				}
			});
	
});


/**
 * 
 * @param result
 *            {object}
 *            <li>title {string}</li>
 *            <li>type {string} success,error</li>
 */
function callbackforadd(result) {
	if (_msg) {
		_msg.hide();
	}

	result = initMsg(result);
	var params = {
		type : result.type
	};

	if (params.type == 'error' || params.type == 'warn') {
		params = setByError(params, result);
		params.callback = function() {
			Hundsun.UrlUtil.redirect('importData.htm');
		}
	} else {
				params.msg = '<span style="color:green;font-size:14px;font-weight:bold;">' + result.title + '</span> 您可以'
						+ '<ul style="margin-top:5px;"><li> - <a href="list.htm">返回列表</a></li>'
						+ '<li> - <a href="importData.htm">继续导入</a></li></ul>',

				params.callback = function() {
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


