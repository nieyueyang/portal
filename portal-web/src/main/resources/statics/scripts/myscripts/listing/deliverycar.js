$(function() {
	$("#inputForm").validate({
		rules : {
			carNo : {
				required : true,
				maxlength : 10
			}
		},
		errorPlacement : function(error, element) {
			(element.parent().find("span.error")).replaceWith(error);
		},
		errorElement : "span",
		onsubmit : true,
		onkeyup : false,
		onclick : false,
		onfocusout : false,
	});

})