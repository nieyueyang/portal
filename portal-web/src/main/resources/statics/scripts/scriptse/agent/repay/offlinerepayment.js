var offlin = offlin || {
	validate:function(){
		jQuery("#form_add").validate({
			 submitHandler: function(form) 
			   {      
				 var params = {
						 "agentRepayType":"2"//还款类型
						, "agentContractId":$("#agentContractId").val() //合同ID
				 		,"repayAmt":$(".repayAmt").val()//总额
				 		,"goodsRepaymentAmt":$("input[name='goodsRepaymentAmt']").val()  //货款
				 		,"isLastFlag":$("select[name='isLastFlag']").val()//是否最后一次
				 		,"remark":$("#remark").val()//备注
				 		,"interestAmt": $("input[name='interestAmt']").val()
				 		,"interestByDayAmt":$("input[name='interestByDayAmt']").val()
				 		,"repayMethod":$("select[name='payType']").val()//还款类型
				 		,"acceptBank":$("select[name='acceptBank']").val()//银行
				 		,"acceptDate":$("input[name='acceptDate']").val()//承兑日期
				 		,"discountAmt":$("input[name='discountAmt']").val()//贴息金额
				 		,"cashDate":$("input[name='cashDate']").val()//到款日期
				 		,"interestAmt":$("input[name='interestAmt']").val()//一般代理费
				 		,"interestByDayAmt":$("input[name='interestByDayAmt']").val()//调增代理费
				 };
				 if($("#isSub").val()=="N" && parseFloat($("#goodsRepaymentAmt").val())>= parseFloat($("#qianKuan").val()) ){
					 alert("由于所还总款可以还清！请选择为最后一次还款!");
					 return false;
				 }
				 _msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
				 jQuery.post(appServer + '/contract/agent/applyOffline.htm',params, function(v) {
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
								msg : v.message,
								width : 450,
								timeout : 800,
								type : 'warn'
							})
						}
				 }, 'json');
			   },
			   ignore: ".ignore",
            rules:{
            	acceptDate:{
                    required:true
                },
                acceptBank:{
                	 required:true
                },
                discountAmt:{
                	required:true
                },
                cashDate:{
                	required:true
                },
                goodsRepaymentAmt:{
                	required:true
                },
                repayAmt:{
                	required:true
                },
                interestAmt:{
                	required:true
                },
                interestByDayAmt:{
                	required:true
                },
                remark:{
                	maxlength:150
                }
            },
            messages:{
            	acceptDate:{
            		required:"请选择承兑日期"
                },
                acceptBank:{
                	required:"请选择银行"
                },
                discountAmt:{
                	required:"请输入贴息金额"
                },
                cashDate:{
                	required:"请选择到款日期"
                },
                goodsRepaymentAmt:{
                	required:"通过还总款计算得出"
                },
                repayAmt:{
                	required:"请输入还总款金额"
                },
                interestAmt:{
                	required:"通过还总款计算得出"
                },
                interestByDayAmt:{
                	required:"通过还总款计算得出"
                },
                remark:{
                	maxlength:"最大长度不能超过150"
                }
            }
        });
	},
	modifyPayType:function(){
		$(".modifyPayType").change(function(){
			 var type = $(this).val();
			 if(type==1){
				 $("input:[name='acceptDate ']").val("");
				 $("#acceptBank option[value='']").attr("selected",true)
				 $("input:[name='discountAmt']").val("");
				 $(".acceptDiv").hide();
				 $(".accept").addClass("ignore");
				 
				 $(".repayAmtTitle").html("还总款金额(元)");
			 }else{
				 $(".acceptDiv").show();
				 $(".accept").removeClass("ignore");
				 $(".repayAmtTitle").html("贴息后金额(元)");
			 }
		});
	},
	isLastFlag:function(){
		$(".isLastFlag").change(function(){
			var val = $(this).val();
			if(val=='Y'){
				$(".interestAmt").attr("readonly",false);
				$(".interestByDayAmt").attr("readonly",false);
				//显示 是否存在 多收的代理费 
				 $("#showSurplusRateFee").hide();
				 var maxRate  = $("#maxRate").val();
				 maxRate = parseFloat(maxRate);
				 var currentRate  = $("#currentRate").val();
				 currentRate = parseFloat(currentRate);
				 var totalRepaymentGoodsAmt = $("#totalRepaymentGoodsAmt").val();
				 totalRepaymentGoodsAmt = accDiv(parseFloat(totalRepaymentGoodsAmt),parseFloat(100));
				 
				 var surplusRateFee = 0; //多收的代理费
				 if((accSubtr(maxRate,currentRate)) > 0 ){
				 	var diff = accSubtr(maxRate,currentRate) ;
				 	diff = accDiv(parseFloat(diff),parseFloat(100));
				 	surplusRateFee = accMul(parseFloat(totalRepaymentGoodsAmt),diff) ;
				 	surplusRateFee = parseFloat(surplusRateFee).toFixed(2);
				 	$("#surplusRateFee").html(surplusRateFee);
				 	$("#showSurplusRateFee").show();
				  	 var currentSpan = $("#surplusRateFee");
				 	//将后面存在的span去掉
				 	 currentSpan.nextAll().remove();
				 	var tip = $("<span style='color:#669966;font-weight: bold;'>(本次为最后一次还款)</span>");
					 tip.insertAfter(currentSpan);
				 	//needToRetireAmt 需退金额
				 	$("#needToRetireAmt").val(surplusRateFee);
				 }
				
			}else{
				 $("#showSurplusRateFee").hide();
				 //needToRetireAmt 需退金额
				 $("#needToRetireAmt").val("0");
				$(".interestAmt").attr("readonly",true);
				$(".interestByDayAmt").attr("readonly",true);
			}
			offlin.repay();
		});
	},
	repayBlur:function(){
		 $(".repayAmt").blur(function(){
			 offlin.repay();
		 });
	},
	goodsRepayBlur:function(){
		 $(".goodsRepaymentAmt").blur(function(){
			 offlin.goodsRepay();
		 });
	},
	 repay:function(){
			 var agentContractId  = $("#agentContractId").val();
			 var repayAmt = $(":input[name='repayAmt']").val();
			 var cashDate  = $("#cashDate").val();
			 var isLastFlag = $("#isLastFlag").val();
			 if(repayAmt==""){
				 return false;
			 }
			 if(cashDate==''){
				 //alert("请先输入到款日期，否刚无法计算金额！");
				 return false;
			 }
			 //先判断数字格式
			if(repayAmt!=""&&! offlin.validate2num(repayAmt)||repayAmt<=0){
				alert("总款格式不正确，只能为两位小数的正数，且不能为0");
				$(".goodsRepaymentAmt").val("");
				 $(".interestAmt").val("");
				 $(".interestByDayAmt").val("");
				return false;
			}
				 $(".goodsRepaymentAmt").val("");
				 $(".interestAmt").val("");
				 $(".interestByDayAmt").val("");
				 //按照最大利率算出总额，利息。
				 _msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
				 jQuery.post(appServer + '/contract/agent/computingGoodsAmt.htm', {"agentContractId":agentContractId ,"repayAmt":repayAmt,"cashDate":cashDate,"isLastFlag":isLastFlag}, function(v) {
					 if(_msg) {_msg.hide();}
					 $(".goodsRepaymentAmt").val(v.goodsAmt);
					 $("input[name='interestAmt']").val(v.interestAmtRate);
					 $("input[name='interestByDayAmt']").val(v.interestByDayAmtRate);
					 $("#isSub").val(v.isSub);
					}, 'json');
	 },
	 goodsRepay:function(){
			 var agentContractId  = $("#agentContractId").val();
			// var repayAmt = $(":input[name='repayAmt']").val();
			 var goodsRepaymentAmt = $(":input[name='goodsRepaymentAmt']").val();//还货款金额
			 var cashDate  = $("#cashDate").val();
			 var isLastFlag = $("#isLastFlag").val();
			 if(goodsRepaymentAmt==""){
				 return false;
			 }
			 if(cashDate==''){
				 return false;
			 }
			 //先判断数字格式
			if(goodsRepaymentAmt!=""&&! offlin.validate2num(goodsRepaymentAmt)||goodsRepaymentAmt<=0){
				alert("【还货款金额】格式不正确，只能为两位小数的正数，且不能为0");
				$(".goodsRepaymentAmt").val("");
				$(".repayAmt").val("");
				 $(".interestAmt").val("");
				 $(".interestByDayAmt").val("");
				return false;
			}
				   //根据还货款金额 计算总额和代理费
		 	 		$(".repayAmt").val("");
			 		$(".interestAmt").val("");
			 		$(".interestByDayAmt").val("");
			 	
			 		//按照最大利率算出总额，利息。
			 		_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
			 		jQuery.post(appServer + '/contract/agent/computingTotalAmtOffLine.htm', {"agentContractId":agentContractId ,"goodsRepaymentAmt":goodsRepaymentAmt,"cashDate":cashDate,"isLastFlag":isLastFlag}, function(v) {
				 	if(_msg) {_msg.hide();}
				 	$(".repayAmt").val(v.repayAmt);
				 	$("input[name='interestAmt']").val(v.interestAmtRate);
				 	$("input[name='interestByDayAmt']").val(v.interestByDayAmtRate);
				 	 $("#isSub").val(v.isSub);
					}, 'json');	
	 },
	 dateRepay:function(){//选择日期时，根据还总款金额 反向 计算出 货款和代理费;同时如果 还总款金额为空，根据 还货款金额 计算出 总款金额和代理费
		 var agentContractId  = $("#agentContractId").val();
		 var repayAmt = $(":input[name='repayAmt']").val();
		 var goodsRepaymentAmt = $(":input[name='goodsRepaymentAmt']").val();//还货款金额
		 var isLastFlag = $("#isLastFlag").val();
		 var cashDate = $dp.cal.getNewDateStr();
		 
		  if(cashDate==''){
			 //alert("请先输入到款日期，否刚无法计算金额！");
			 return false;
		 }
		 
		 //总款金额为空 + 货款金额不为空
		 if((repayAmt == "") && goodsRepaymentAmt != ""){
		 	if(!offlin.validate2num(goodsRepaymentAmt) || goodsRepaymentAmt<=0){
			 	    alert("【还货款金额】格式不正确，只能为两位小数的正数，且不能为0");
			 		$(".repayAmt").val("");
			 		$(".goodsRepaymentAmt").val("");
			 		$(".interestAmt").val("");
			 		$(".interestByDayAmt").val("");
		 			return false;
		 		}else {
		 		   //根据还货款金额 计算总额和代理费
		 	 		$(".repayAmt").val("");
			 		$(".interestAmt").val("");
			 		$(".interestByDayAmt").val("");
			 	
			 		//按照最大利率算出总额，利息。
			 		_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
			 		jQuery.post(appServer + '/contract/agent/computingTotalAmtOffLine.htm', {"agentContractId":agentContractId ,"goodsRepaymentAmt":goodsRepaymentAmt,"cashDate":cashDate,"isLastFlag":isLastFlag}, function(v) {
				 	if(_msg) {_msg.hide();}
				 	$(".repayAmt").val(v.repayAmt);
				 	$("input[name='interestAmt']").val(v.interestAmtRate);
				 	$("input[name='interestByDayAmt']").val(v.interestByDayAmtRate);
					}, 'json');
					
		 		}
		 }else if(repayAmt!="" && goodsRepaymentAmt ==""){
			if(repayAmt!=""&&! offlin.validate2num(repayAmt)||repayAmt<=0){
			  alert("总款格式不正确，只能为两位小数的正数，且不能为0");
			  $(".goodsRepaymentAmt").val("");
			  $(".interestAmt").val("");
			  $(".interestByDayAmt").val("");
			 return false;
			}	
			
			 $(".goodsRepaymentAmt").val("");
			 $(".interestAmt").val("");
			 $(".interestByDayAmt").val("");
			 
			 //按照最大利率算出总额，利息。
			 _msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
			 jQuery.post(appServer + '/contract/agent/computingGoodsAmt.htm', {"agentContractId":agentContractId ,"repayAmt":repayAmt,"cashDate":cashDate,"isLastFlag":isLastFlag}, function(v) {
				 if(_msg) {_msg.hide();}
				 $(".goodsRepaymentAmt").val(v.goodsAmt);
				 $("input[name='interestAmt']").val(v.interestAmtRate);
				 $("input[name='interestByDayAmt']").val(v.interestByDayAmtRate);
				}, 'json');
		 }else if(repayAmt =="" && goodsRepaymentAmt ==""){
		 	return false;
		 }else if(repayAmt !="" && goodsRepaymentAmt !=""){
		 	if(repayAmt!=""&&! offlin.validate2num(repayAmt)||repayAmt<=0){
			  alert("总款格式不正确，只能为两位小数的正数，且不能为0");
			  $(".goodsRepaymentAmt").val("");
			  $(".interestAmt").val("");
			  $(".interestByDayAmt").val("");
			 return false;
			}	
			 $(".goodsRepaymentAmt").val("");
			 $(".interestAmt").val("");
			 $(".interestByDayAmt").val("");
			 //按照最大利率算出总额，利息。
			 _msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
			 jQuery.post(appServer + '/contract/agent/computingGoodsAmt.htm', {"agentContractId":agentContractId ,"repayAmt":repayAmt,"cashDate":cashDate,"isLastFlag":isLastFlag}, function(v) {
				 if(_msg) {_msg.hide();}
				 $(".goodsRepaymentAmt").val(v.goodsAmt);
				 $("input[name='interestAmt']").val(v.interestAmtRate);
				 $("input[name='interestByDayAmt']").val(v.interestByDayAmtRate);
				}, 'json');
		 }
			
	 },
	 validate2num : function(num){
			var reg = /^[+]?\d*\.?\d{1,2}$/;  
			return reg.test(num);
		}
}

jQuery(function () {
	offlin.validate();
	offlin.modifyPayType();
	offlin.isLastFlag();
	offlin.repayBlur();
	offlin.goodsRepayBlur();
	$("#showSurplusRateFee").hide();
    });