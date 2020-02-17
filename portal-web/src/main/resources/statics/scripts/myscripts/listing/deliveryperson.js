$(function() {
	// 身份证正则表达式(15位)
	var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
	// 身份证正则表达式(18位)
	var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
	$.validator.addMethod("identityNo", function(value, element) {
		return this.optional(element)
				|| (isIDCard1.test(value) || isIDCard2.test(value));
	}, "请正确填写此项");
	// 手机号码
	var mobileReg = /^[0-9]{11}/;
	$.validator.addMethod("mobile", function(value, element) {
		return this.optional(element) || mobileReg.test(value);
	}, "请正确填写此项");

	$("#inputForm").validate({
		rules : {
			name : {
				required : true,
				maxlength : 10
			},
			identityNo : {
				required : true,
				maxlength : 18,
				identityNo : true
			},
			mobile : {
				required : true,
				maxlength : 11,
				mobile : true
			}
		},
		messages : {
			name : {
				required : "该项不能为空"
			},
			identityNo : {
				required : "该项不能为空"
			},
			mobile : {
				required : "该项不能为空"
			}
		},
		errorPlacement : function(error, element) {
			(element.parent().find("span.error")).replaceWith(error);
		},
		errorElement : "span"
	});

})