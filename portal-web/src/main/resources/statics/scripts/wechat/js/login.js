/**
* @include "../includes.js"
*/

if(window != top ){
	top.location.href = window.location.href;
}

jQuery(function(){
	var account = Hundsun.CookieUtil.readCookie('account');
	
	if(account){
		$('#account').val(account);
	}
	
	jQuery('#form1').validate({
		messages:{
			account:{required:'账号不能为空'},
			password:{required:'密码不能为空'}
		},
		submitHandler:function(form){//form jquery验证通过之后提交之前执行
			form.submit();
		},
		onfocusout:false,
		onkeyup:false,
		onclick:false,
		showErrors:function(errorMap,errorList){
			var msg = '';
			$.each(errorList,function(){
				msg += '<br/>&nbsp;--' + this.message ;			
			});
			//console.log(msg);
			if(msg){
				msg = '非常抱歉，登录失败，可能的原因：' + msg;
				Hundsun.PopUtil.alert({type: 'warn', msg: msg});
			}			
		}
	});
});