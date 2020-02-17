
//摘牌按钮提交
function delistingSubmit(id){
	Boxy.confirm('确定提交吗？',function(){
		document.getElementById("form_delisting_submit").disabled="disabled";
		
		jQuery.post (
				appServer + '/entrustDelisting/delistingSubmit_'+id+'.htm',
	        function(v){
	    		if(v.result == 'true'){
						Hundsun.PopUtil.alert({
							msg:'摘牌成功,稍候返回定向邀请列表！',
							autohide : true,
							width:350,
							timeout:800,
							callback :function(){
								document.getElementById("form_step2").submit();
							}
						})
						
				 }else{
					 document.getElementById("form_delisting_submit").disabled="";
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
	  })
}



