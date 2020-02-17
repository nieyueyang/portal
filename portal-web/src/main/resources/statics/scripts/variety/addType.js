$(document).ready(function(){
    //jQuery.metadata.setType("attr", "validate");
    /** js验证 */
    jQuery.validator.setDefaults({
        submitHandler: function(form) {

            $("#submitBtn").attr("disabled", true).attr("value","正在提交...");
            form.submit();
        }
    });

    $('#addForm').validate({
        errorPlacement: function(error, element) {
            element.siblings("span").css({"color":"red"}).text(error.text());
        },
        success: function(label) {
            label.text("");
        },
        rules:{
        	'remark':{'maxlength':300}
        }
    });
    
});

/**
 * 清空属性设置
 * @param vCode
 */
function deleteAttr(vCode){
	if(confirm("品种的常规属性和动态属性都会被删除，\n确认删除吗？")){
		window.location.href=appServer+"/variety/deleteAttri.htm?vCode="+vCode;
	}
	
}

function ajaxFileUpload(obj,imgName,code) {
	var objId = $(obj).attr("id");
	var objName = $(obj).attr("name");
	var imgObj = $("#" + imgName);
	$.ajaxFileUpload({
		url : appServer+"/variety/ajax/uploadPicTemp.htm?objName=" + objName + "&code=" + code,
        secureuri : false,
        fileElementId : objId,
        dataType : 'text',
        success : function(data, status) {
			var imgUrl = uploadServer + "/" + data;
			imgObj.attr("src", imgUrl);
			return false;
        },  
        error : function(data, status, e) {  
            alert("error");
        }  
    });  
    return false;
}
