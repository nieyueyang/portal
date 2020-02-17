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
       /* rules : {
        	sellersMobile : {checkMF:"#sellersPhone"},
        	sellersPhone :{checkMF:"#sellersMobile"}
		},*/
        success: function(label) {
            label.text("");
        }
    });
    
    /**
     * 属性code
     * */
   /* jQuery.validator.addMethod("checkMF", function(value, element,param) {
    	var v2 = $(param).val();
    	if(!value && !v2){
    		return false;
    	}else{
    		return true;
    	}
    }, "手机和固话不能同时为空");*/
    
});

