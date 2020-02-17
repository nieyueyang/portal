 var onlinrepayment =  onlinrepayment || {
	 validate:function(){
		 jQuery("#form_add").validate({
			 submitHandler: function(form) 
			   {      
				 var params = {
						 "agentRepayType":"1"//还款类型
						, "agentContractId":$("#agentContractId").val() //合同ID
				 		,"repayAmt":$(".repayAmt").val()//总额
				 		,"goodsRepaymentAmt":$("input[name='goodsRepaymentAmt']").val()  //货款
				 		,"isLastFlag":$("input[name='isLastFlag']").val()//是否最后一次
				 		,"remark":$("#remark").val()//备注
				 		,"interestAmt": $("input[name='interestAmt']").val()
				 		,"interestByDayAmt":$("input[name='interestByDayAmt']").val()
				 		,"needToRetireAmt":$("input[name='needToRetireAmt']").val()//需要退还的代理费
				 };
				 _msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
				 jQuery.post(appServer + '/contract/agent/apply.htm',params, function(v) {
					 if (v.success == true) {
							Hundsun.PopUtil.alert({
								msg : '操作成功！',
								autohide : true,
								type:'success',
								width : 350,
								timeout : 800,
								callback : function() {
									$(".repayAmt").val("");
									$("input[name='goodsRepaymentAmt']").val("");
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
	            rules:{
	            	goodsRepaymentAmt:{
	                    required:true,
	                    pointNum2:true
	                },
	                repayAmt:{
	                    required:true,
	                    pointNum2:true
	                },
	                remark:{
	                	maxlength:150
	                }
	            },
	            messages:{
	            	goodsRepaymentAmt:{
		                required:"请输入货款金额",
		                pointNum2:"金额必须是数字类型,最多带两位小数"
	                },
	                repayAmt:{
		                required:"请输入总款金额",
		                pointNum2:"金额必须是数字类型,最多带两位小数"
	                },
	                remark:{
	                	maxlength:"最大长度不能超过150"
	                }
	            }
	        });
	 },
	 repay:function(){
		 $(".goodsRepaymentAmt").blur(function(){
			 var agentContractId  = $("#agentContractId").val();
			 var goodsAmt = $(this).val();
			 $("#showSurplusRateFee").hide();
			 document.getElementById('showFirstPayRepay').style.display = 'none';
			 
			//先判断数字格式
			 if(goodsAmt!=""&& !onlinrepayment.validate2num(goodsAmt)||goodsAmt<=0){
					alert("货款格式不正确，只能为两位小数的正数，且不能为0");
					return false;
				}
			 if(parseFloat(goodsAmt)>parseFloat($(this).attr("surplusAdvancesAmt"))){
				 alert("本次所还货款不能大于最多可还货款！请按[实际需还货款]："+$(this).attr("surplusAdvancesAmt")+"来进行还款！");
				 //$(this).focus();
				 $(".repayAmt").val("");
				 $(".yb").html("");
				 $(".tz").html("");
			 }else  if(parseFloat(goodsAmt)==parseFloat($(this).attr("surplusAdvancesAmt"))){
				 //alert("刚好还清");
				 $(".repayAmt").val($(".repayAmt").attr("repayAmt"));
				 $(".yb").html($(".ybdlf").html());
				 $(".tz").html($(".tzdlf").html());
				 $("#isLastFlag").val("Y");
				 document.getElementById('showFirstPayRepay').style.display = '';
				 $("input[name='interestAmt']").val($(".ybdlf").html());
				 $("input[name='interestByDayAmt']").val($(".tzdlf").html());
			 	 //显示多收的代理费
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
				 $(".repayAmt").val("");
				 $(".yb").html("");
				 $(".tz").html("");
				 //按照最大利率算出总额，利息。
				 _msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
				 jQuery.post(appServer + '/contract/agent/computingTotalAmt.htm', {"agentContractId":agentContractId ,"goodsRepaymentAmt":goodsAmt}, function(v) {
					 if(parseFloat(v.repayAmt)>parseFloat($(".repayAmt").attr("repayAmt"))){
						 $(".repayAmt").val("");
						 alert("算出总款已经超过最后一次所还总款的金额，不建议这样还款。");
						 if(_msg) {_msg.hide();}
						 return false;
					 }
					 if(_msg) {_msg.hide();}
					 $(".repayAmt").val(v.repayAmt);
					 $(".yb").html(v.interestAmtRate);
					 $("input[name='interestAmt']").val(v.interestAmtRate);
					 $(".tz").html(v.interestByDayAmtRate);
					 $("input[name='interestByDayAmt']").val(v.interestByDayAmtRate);
					 $("#isLastFlag").val("N");
					}, 'json');
			 }
		 });
		 
		 $(".repayAmt").blur(function(){
			 var agentContractId  = $("#agentContractId").val();
			 document.getElementById('showFirstPayRepay').style.display = 'none';
			 $("#showSurplusRateFee").hide();
			 //先判断数字格式
			if($(this).val()!=""&&! onlinrepayment.validate2num($(this).val())||$(this).val()<=0){
				alert("总款格式不正确，只能为两位小数的正数，且不能为0");
				return false;
			}
			 if(parseFloat($(this).val())>parseFloat($(this).attr("repayAmt"))){
				 alert("所还总款不能大于最多可还总款！实际需还总款："+$(this).attr("repayAmt"));
				 //$(this).focus();
				 $(".goodsRepaymentAmt").val("");
				 $(".yb").html("");
				 $(".tz").html("");
			 }else  if(parseFloat($(this).val())==parseFloat($(this).attr("repayAmt"))){
				 //alert("刚好还清");
				 $(".goodsRepaymentAmt").val($(".goodsRepaymentAmt").attr("surplusAdvancesAmt"));
				 $(".yb").html($(".ybdlf").html());
				 $(".tz").html($(".tzdlf").html());
				 $("#isLastFlag").val("Y");
				 document.getElementById('showFirstPayRepay').style.display = '';
				 $("input[name='interestAmt']").val($(".ybdlf").html());
				 $("input[name='interestByDayAmt']").val($(".tzdlf").html());
				 
				 //显示多收的代理费
				 //已还货款  x (最大费率 - 最后一次还款的费率 )% = goodsAmt x ($("#maxRate") - $("#currentRate"))
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
				 $(".goodsRepaymentAmt").val("");
				 $(".yb").html("");
				 $(".tz").html("");
				 //按照最大利率算出总额，利息。
				 var repayAmt = $(this).val();
				 _msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
				 jQuery.post(appServer + '/contract/agent/computingGoodsAmt.htm', {"agentContractId":agentContractId ,"repayAmt":repayAmt}, function(v) {
					 if(_msg) {_msg.hide();}
					 if(v.goodsAmt> $(".goodsRepaymentAmt").attr("surplusadvancesamt")){
						 alert("计算出所还货款超过最后一次所欠货款："+$(".goodsRepaymentAmt").attr("surplusadvancesamt")+",不支持这样还款");
						 $(".goodsRepaymentAmt").val("");
						 return false;
					 }
					 $(".goodsRepaymentAmt").val(v.goodsAmt);
					 $(".yb").html(v.interestAmtRate);
					 $("input[name='interestAmt']").val(v.interestAmtRate);
					 $(".tz").html(v.interestByDayAmtRate);
					 $("input[name='interestByDayAmt']").val(v.interestByDayAmtRate);
					 $("#isLastFlag").val("N");
					}, 'json');
			 }
		 });
	 },
	 validate2num : function(num){
			var reg = /^[+]?\d*\.?\d{1,2}$/;  
			return reg.test(num);
		}
 }

jQuery(function () {
	onlinrepayment.validate();
	onlinrepayment.repay();
	$("#showSurplusRateFee").hide();
    });