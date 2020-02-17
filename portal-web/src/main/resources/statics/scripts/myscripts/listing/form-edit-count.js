jQuery.ajaxSetup ({cache:false});

$(document).ready(function(){
	
	/** js验证 */
    jQuery.validator.setDefaults({
        submitHandler: function(form) {
    		var closeWeight = $("#closeWeight").val(); //撤牌量
        	var surplusWeight = $("#surplusWeight").val(); //剩余挂牌量
        	var minWeight = $("#minWeight").val(); //最小成交量
        
        	var reg = eval("/^[\\-+]?\\d+\\.?\\d{0,3}[0]*$/");//N位有效小数
        	if(reg.test(closeWeight)){
	        	if(parseFloat(accSubtr(Number(surplusWeight),Number(closeWeight)))<minWeight){
	        		Boxy.confirm('剩余挂牌量小于最小成交量，是否执行撤牌操作！',function(){
	            		$("#submitForm").attr("disabled", true).html("正在提交...");
	            		form.submit();
	        	  })
	        	}else{
	        		$("#submitForm").attr("disabled", true).html("正在提交...");
	        		form.submit();
	        	}
        	}else{
        		//autohide : true,
        		Hundsun.PopUtil.alert({msg:'撤牌重量输入错误;请输入正确的数字，且小数位数不超过3位;',width:450,timeout:800,type:'warn'})
        	}
        }
    });

    $('#form_editPrice').validate({
        errorPlacement: function(error, element) {
            element.siblings("span").css({"color":"red"}).text(error.text());
        },
        success: function(label) {
            label.text("");
        }
    });
	
});
