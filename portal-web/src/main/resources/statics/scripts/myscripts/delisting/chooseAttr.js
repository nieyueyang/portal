/**
 * 选择品种后，动态设置品种对应的材质下拉选择框
 */
function chooseVType(data){
	if(!data){
		//alert("您没有选择品种!");
	}else{
		$("#varietyCode").val(data.code);
		$("#varietyName").val(data.name);
		var varietyCode = data.code;
		$.ajax({
			   type: "POST",
			   url: appServer+"/ajax/getMaterial.htm",
			   data: "varietyCode="+varietyCode+"&keyText=material",
			   success: function(result){
				   var m = result.keyText;
				   if((isEmpty(m)==false) && (typeof(m)=="string") && (m.length > 0)){
					   var selector = $("#material")
					   $(selector).empty();
					   selector.append('<option value="">请选择</option>');  
					   var arr = m.split("\n");
					   for(var i=0; i<arr.length; i++){
						   var t = arr[i].split("|");
						   selector.append('<option value="'+t[0]+'">'+t[1]+'</option>');  
					   }
				   }
			   },
			   error:function (xhr, ajaxOptions, thrownError){
			         /*alert(xhr.status);
			         alert(xhr.statusText);
			         alert(xhr.responseText)*/;
			     }
			});
	}
	
}

function isEmpty(v){
	if(undefined==v || "undefined"==v){return true;}
	if(/^\s*$/g.test(v)){
		return true;
	}else{
		return false;
	}
}