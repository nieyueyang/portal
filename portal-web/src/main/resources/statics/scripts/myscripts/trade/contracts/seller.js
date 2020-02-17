  
    jQuery.validator.addMethod("isContractPhone", function(value, element) {
        var reg = /^([0-9]{2}-)?(0?[0-9]{2,3}\-)?[1-9]?[0-9]{7}$/;
        return this.optional(element) || reg.test(value);
    }, "固定电话号码格式不正确,可输入数字或连字符（-），32字符以内");
    
    jQuery.validator.addMethod("isContractMobile", function(value, element) {
        var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
        return this.optional(element) || reg.test(value);
    }, "手机号码格式不正确");

$(document).ready(function(){
    //jQuery.metadata.setType("attr", "validate");
    /** js验证 */
    jQuery.validator.setDefaults({
        submitHandler: function(form) {
    		$("#subBtn").attr("disabled", true).attr("value","正在提交...");
            form.submit();
        }
    });

    $('#addForm').validate({
        errorPlacement: function(error, element) {
            element.siblings("span").css({"color":"red"}).text(error.text());
        },
        rules : {
        	contactsMobile : "isContractMobile",
        	contactsPhone :"isContractPhone"
		},
        success: function(label) {
            label.text("");
        }
    });
    

    
});

