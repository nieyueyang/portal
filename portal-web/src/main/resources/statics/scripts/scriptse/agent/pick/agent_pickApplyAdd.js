$(function(){
	$(".subwarehouse").click(function(){
		var id = $(this).attr("val");
		Boxy.confirm("确定要提交审核吗", function() {
			_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
			jQuery.post(appServer + '/contract/agent/dowarewhouse_'+id+'.htm', {
			}, function(v) {
				if (v.success == true) {
					Hundsun.PopUtil.alert({
						msg : '操作成功！',
						autohide : true,
						type:'success',
						width : 350,
						timeout : 800,
						callback : function() {
							 location.reload() 
						}
					});

				} else {
					if(_msg) {_msg.hide();}
					Hundsun.PopUtil.alert({
						msg : v.msg,
						width : 450,
						timeout : 800,
						type : 'warn'
					})
				}
			}, 'json');
		});
	});
	
});



function saveApply() {
    var count = $("input[name='applyWeight']");//总记录数
    //var remainWeight  = 0.0;  //总重量
    var applyItemCount = 0;
  //  var applyWeight = 0;//申请重量
    var swappedFlag = 0;//是否有提货商品
    var whid = 0;//仓库ID
	var numflag = 0;//是否有大于可提货重量的数据
	var nummsg = "";
    $(count).each(function(i,d){
    	if($(d).val()!=""&&validate3num($(d).val())&&$(d).val()>0){
    		
			applyItemCount = 1;
			if ($(d).val() - $(d).attr("val") > 0) {//当前提货重量大于可提货重量
				numflag = 1;
				nummsg += (parseInt(i)+parseInt(1))+",";
			}
			//判断仓库ID是否相同
			if(whid==0){
				whid = $(d).attr("whid");
			}
    	}
	  });
    
    
    if(applyItemCount==0){
    		Hundsun.PopUtil.alert({
				msg : "请输入要提货的重量,或输入的格式不正确！",
				width : 450,
				timeout : 800,
				type : 'warn'
			})
			return false;
    	}
    $(count).each(function(i,d){
		if($(d).val()!=""){
			if(whid!=$(d).attr("whid")){
				alert("只能选择一个仓库的数据提货！");
				applyItemCount=0;
				return false;
			}
		}
	});
    
    if(applyItemCount==1){
		if(numflag==1){
			nummsg = "第"+nummsg+"条数据不能大于剩余重量！";
		}
		Boxy.confirm(nummsg+"确定要提货吗？", function() {
			_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
			$('#pickapplyForm').submit();
		});
    }
}

validate3num = function(num){
	var reg = /^[+]?\d*\.?\d{1,3}$/;  
	return reg.test(num);
}