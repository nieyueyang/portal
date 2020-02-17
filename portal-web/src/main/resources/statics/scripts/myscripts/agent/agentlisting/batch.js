$(document).ready(function(){
    //jQuery.metadata.setType("attr", "validate");
    /** js验证 */
    jQuery.validator.setDefaults({
        submitHandler: function(form) {
			$("#subBtn").attr("disabled", true).attr("value","正在提交...");
	        form.submit();
        }
    });

    $('#form_batch').validate({
        errorPlacement: function(error, element) {
            element.siblings("span").css({"color":"red"}).text(error.text());
        },
        success: function(label) {
            label.text("");
        }
    });
    
});


