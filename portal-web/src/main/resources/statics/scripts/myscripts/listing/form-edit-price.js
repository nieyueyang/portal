jQuery.ajaxSetup ({cache:false});

function formatFloatV(v){
	if(undefined==v || "undefined"==v){return 0;}
	if(/^\s*$/g.test(v)){
		return 0;
	}else{
		if(isNaN(v)){
			return 0;
		}else{
			return parseFloat(v);
		}
	}
}

$(document).ready(function(){
	
	/** js验证 */
    jQuery.validator.setDefaults({
        submitHandler: function(form) {
    		var oldPrice = formatFloatV($("#listUnitPriceD").val());
        	var newPrice = formatFloatV($("#listPrice").val());
        	if(oldPrice == newPrice){
        		alert("修改后价格与原价格相同，无需提交！");
        	}else{
        		$("#submitForm").attr("disabled", true).html("正在提交...");
        		form.submit();
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
	
	//价格修改，重新计算需要的保证金
	$("#listPrice").change(function(){
		var v = $(this).val();
		var id = $("#id").val();
		var listingType = $("#listingType").val();
		if(listingType == "D"){  //保证金挂牌
			if($("#listPrice").valid()){
				jQuery.post (
						appServer +'/listing/updatePrice_'+id+'_'+v+'.htm',
				        function(v){
				    		if(v.result == 'success'){
				    			document.getElementById("feeInfo").innerHTML=v.freezeFee;
							 }else{
								 Hundsun.PopUtil.alert({
										msg:v.msg,
										width:450,
										timeout:800,
										type:'warn'
									})
							 }
						},
						'json'
				    );
			}
		}
		
	});
});
