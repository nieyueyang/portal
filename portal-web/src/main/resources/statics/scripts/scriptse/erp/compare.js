$(function() {

//	$.validator.addMethod("erpNo", function(value, element) {
//		return this.optional(element) || /^[A-Za-z0-9]+$/.test(value);
//	}, "只能为数字和字母");
	$("#inputForm").validate({
		rules : {
			erpNo : {
				required : true,
//				erpNo : true,
				maxlength : 30
			},
			erpDesc : {
				required : true,
				maxlength : 40
			},
			varietyName : {
				required : true
			},
			manufacturer : {
				required : true,
				maxlength : 20
			},
			specification : {
				maxlength : 40
			},
			material : {
				maxlength : 30
			},
			qualityStandard : {
				maxlength : 80
			}
		},
		messages : {
			erpNo : {
				required : "该项不能为空",
				maxlength : "最大长度30"
			},
			erpDesc : {
				required : "该项不能为空",
				maxlength : "最大长度40"
			},
			varietyName : {
				required : "该项不能为空"
			},
			manufacturer : {
				required : "该项不能为空",
				maxlength : "最大长度20"
			},
			specification : {
				required : "该项不能为空",
				maxlength : "最大长度40"
			},
			material : {
				required : "该项不能为空",
				maxlength : "最大长度30"
			},
			qualityStandard : {
				required : "该项不能为空",
				maxlength : "最大长度80"
			}
		},
		errorPlacement : function(error, element) {
			(element.parent().find("span.error")).replaceWith(error);
		},
		errorElement : "span"
	});
});