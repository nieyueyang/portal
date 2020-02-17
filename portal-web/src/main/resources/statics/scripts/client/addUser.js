/**
 * 
 */
function doSubmit() {
	avoidDuplicateSubmit();
	if (!(checkName() && checkJobNumber() && checkEmail() && checkPhone() && checkMobile())) {
		enableSubmit(); // 校验不通过，再允许提交
		console.log("1")
		return false;
	}
	jQuery("#saveForm").submit();
}

function checkAccount() {
	jQuery("#userAccount_tip").hide();
	jQuery("#userAccount_error").show();
	jQuery("#userAccount_error").html("");
	var account = jQuery.trim(jQuery("#userAccount").val());
	console.log(account)
	var length = account.length;
	//jQuery("#userAccount").val(account);
	var regex = /^([a-z|A-Z|0-9|_])+$/;
	var regex2 = /^[\d]+$/;
	console.log("" == account);
	if ("" == account) {
		jQuery("#userAccount_error").html("请输入登录账号");
		return false;
	} else if (parseInt(length) < parseInt(6) || parseInt(length) > parseInt(20)) {
		jQuery("#userAccount_error").html("登录账号需在6-20字符之间");
		return false;
	} else if (!regex.test(account)) {
		jQuery("#userAccount_error").html("登录账号格式不正确");
		return false;
	} else if (regex2.test(account)) {
		jQuery("#userAccount_error").html("登录账号不能全为数字");
	}
}

function checkPassword() {
	var password = jQuery("#password").val();
	var length = password.length;
	if ("" == password) {
		jQuery("#password_error").html("请输入密码");
		return false;
	} else if (length > 5 && length < 21) {
		jQuery("#password_error").html("");
		return true;
	} else {
		jQuery("#password_error").html("密码需在6-20字符之间");
		return false;
	}
}

function checkRepassword() {
	var repassword = jQuery("#repassword").val();
	if ("" == repassword) {
		jQuery("#repassword_error").html("请再次输入密码");
		return false;
	} else if (repassword != jQuery("#password").val()) {
		jQuery("#repassword_error").html("两次密码输入不一致");
		return false;
	} else {
		jQuery("#repassword_error").html("");
		return true;
	}
}

function checkName() {
	var name = jQuery.trim(jQuery("#name").val());
	jQuery("#name").val(name);
	var regex = /^([\u4E00-\u9FA5\uf900-\ufa2d\w]|[a-z]|[0-9]|[_])+$/i;
	if ("" == name) {
		jQuery("#name_error").html("请输入姓名");
		return false;
	} else if (!regex.test(name)) {
		jQuery("#name_error").html("只能包括中文字、英文字母、数字和下划线");
		return false;
	} else {
		jQuery("#name_error").html("");
		return true;
	}
}

function checkJobNumber() {
	var jobNumber = jQuery.trim(jQuery("#jobNumber").val());
	jQuery("#jobNumber").val(jobNumber);
	var regex = /^[0-9]+$/;
	if ("" == jobNumber) {
		jQuery("#jobNumber_error").html("");
		return true;
	} else if (!regex.test(jobNumber)) {
		jQuery("#jobNumber_error").html("只能输入数字");
		return false;
	}
}

function checkEmail() {
	var email = jQuery.trim(jQuery("#email").val()).toLowerCase();
	var regex = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	jQuery("#email").val(email);
	if ("" == email) {
		jQuery("#email_error").html("");
		return true;
	} else if (!regex.test(email)) {
		jQuery("#email_error").html("电子邮件格式不正确");
		return false;
	} else {
		jQuery("#email_error").html("");
		return true;
	}
}

function checkPhone() {
	var phone = jQuery.trim(jQuery("#phone").val());
	var regex = /^([0-9]{2}-)?(0?[0-9]{2,3}\-)?[1-9]?[0-9]{7}$/;
	jQuery("#phone").val(phone);
	if ("" == phone) {
		jQuery("#phone_error").html("");
		return true;
	} else if (!regex.test(phone)) {
		jQuery("#phone_error").html("电话号码格式不正确");
		return false;
	} else {
		jQuery("#phone_error").html("");
		return true;
	}
}

function checkMobile() {
	var mobile = jQuery.trim(jQuery("#mobile").val());
	var regex = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
	jQuery("#mobile").val(mobile);
	if ("" == mobile) {
		jQuery("#mobile_error").html("请输入手机号码");
		return false;
	} else if (!regex.test(mobile)) {
		jQuery("#mobile_error").html("手机号码格式不正确");
		return false;
	} else {
		jQuery("#mobile_error").html("");
		return true;
	}
}

function checkQQ() {
	var qq = jQuery.trim(jQuery("#qq").val());
	var regex = /^[\d]*$/;
	jQuery("#qq").val(qq);
	if ("" == qq) {
		jQuery("#qq_error").html("");
		return true;
	} else if (!regex.test(qq)) {
		jQuery("#qq_error").html("QQ号码只能输入数字");
		return false;
	} else {
		jQuery("#qq_error").html("");
		return true;
	}
}

function showTip(obj) {
	var id = obj.id;
	jQuery("#" + id + "_tip").show();
	jQuery("#" + id + "_error").hide();
}

function avoidDuplicateSubmit() {
	jQuery("#submitBtn").attr("style", "color:gray");
	jQuery("#submitBtn").attr("disabled", "disabled");
}

function enableSubmit() {
	jQuery("#submitBtn").attr("disabled", "");
	jQuery("#submitBtn").attr("style", "");
}