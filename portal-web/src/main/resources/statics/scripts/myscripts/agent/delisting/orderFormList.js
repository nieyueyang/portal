
//查看挂牌详情
function viewListing(id){
	window.location.href= appServer+"/entrustDelisting/view_"+id+".htm";
}


function ontopcheck(obj){
     	if(obj.checked){
     		$(".listBox table").find(":checkbox").attr("checked","checked");
    	}
   	 	else
    	{ 
	    	$(".listBox table").find(":checkbox").removeAttr("checked");
		}
}

function onmidcheck(obj){
     	if(obj.checked){
     		$(obj).parentsUntil("table").nextUntil(".cc").find(":checkbox").attr("checked","checked");
    	}
    	else
    	{ 
	  	 $(obj).parentsUntil("table").nextUntil(".cc").find(":checkbox").removeAttr("checked");
		}
}

$(function(){
		$(".cc tr th span").toggle(
		function () {
    		$(this).parentsUntil("table").nextUntil(".cc").hide();
  		},
  		function () {
    		$(this).parentsUntil("table").nextUntil(".cc").show();
  		}
		)
		InitializationTotal();
})

/**
 * 初始化合计价格和重量
 * @return
 */
function InitializationTotal(){
	var calculateTotalPrice = 0;
	var calculateTotalWeight = 0;
	var calculateFirstPayAmt = 0;
	$("#calculateTotalPrice").text(calculateTotalPrice);
	$("#calculateTotalWeight").text(calculateTotalWeight);
	$("#calculateTotalPrice2").text(calculateTotalPrice);
	$("#calculateTotalWeight2").text(calculateTotalWeight);
	$("#calculateFirstPayAmt2").text(calculateFirstPayAmt);
}

$(function(){
	$(":checkbox").click(
		function() {
			calculate(); //金额以及重量的汇总计算
		}
	)
})

function calculate(){
	var calculateTotalPrice = 0;
	var calculateTotalWeight = 0;
	var calculateFirstPayAmt = 0;
	for(var i=0; i< $(".calculate:checked").size(); i++){
		var id = $($(".calculate:checked").get(i)).attr("id");
		calculateTotalPrice = accAdd(calculateTotalPrice, $("#totlePrice_"+id).val());
		calculateTotalWeight = accAdd(calculateTotalWeight, $("#totalWeight_"+id).val());
		calculateFirstPayAmt = accAdd(calculateFirstPayAmt, $("#firstPayAmt_"+id).val());
	}
	$("#calculateTotalPrice").text(calculateTotalPrice);
	$("#calculateTotalWeight").text(calculateTotalWeight);
	$("#calculateTotalPrice2").text(calculateTotalPrice);
	$("#calculateTotalWeight2").text(calculateTotalWeight);
	$("#calculateFirstPayAmt2").text(calculateFirstPayAmt);
}

/**
 * 批量删除订单
 */
function batchDelete(){
	if(0==$(".calculate:checked").size()){
		art.dialog({
			id : "NotNull",
			lock : true,
			content:  "请勾选您要删除的订单信息",
			yesFn : true
		});
	}else{
		var cartId = ""
			for(var i=0; i< $(".calculate:checked").size(); i++){
				cartId +=";" + $($(".calculate:checked").get(i)).attr("value").toString() ;
			}
			
			art.dialog({
				id : "del",
				lock : true,
			    content: '确定要删除这些信息吗?',
			    yesFn : function(){
				jQuery.ajax({
					type : "POST",
					url : appServer + "/entrustListing/deleteBatch.htm",
					data : {
						"cartId" : cartId
					},
					success : function(data) {
							if(true == data.result){
									art.dialog({
										id : "delSuccess",
										lock : true,
										content: "订单删除成功！",
										yesFn : function(){
											var cartId = data.deletedCartId.split(";");
											for(var i=0; i< cartId.length; i++){
												var deleteId = cartId[i]
												$("input[value="+deleteId+"]").parentsUntil("table").remove();
											}
											window.location.reload();
										}
									});
									
							}else{
								var errorMsg = (!data.msg) ? "" : data.msg;
								art.dialog({
										id : "delFalse",
										lock : true,
										content: errorMsg,
										yesFn : function() {
							
									// 去除null等情况
									if ("" != cartId && null != cartId) {
										var cartId = data.deletedCartId.split(";");
										for (var i = 0; i < cartId.length; i++) {
											var deleteId = cartId[i]
											$("input[value=" + deleteId + "]").parentsUntil("table").remove();
										}
									}
									window.location.reload();
								}
									});
							}
					},
					error:function(){
						art.dialog({
							id : "timeOut",
							lock : true,
							content: '网络超时,请重试',
							yesFn : true
						});
					}
				});
				},
				noFn: true
			});
	}
}

/**
 * 普通方式删除
 * @param cartId
 * @param type : orderFromId(删除指定的订单) ,companyId(删除代理单位下的订单)
 * @param companyId
 * @return
 */
function deleteOne(orderFromId,type,companyId){
	art.dialog({
		id : "del",
		lock : true,
	    content: '确定要删除该条信息吗?',
	    yesFn : function(){
		jQuery.ajax({
			type : "POST",
			url : appServer + "/entrustListing/deleteOne.htm",
			data : {
					"id" : orderFromId,
					"type" : type
			},
			success : function(data) {
					if(data.result){
							art.dialog({
								id : "delSuccess",
								lock : true,
								content: "订单删除成功！",
								yesFn : function(){
									if("companyId"==type){
										$("."+orderFromId).remove();
									}else{
										if(2 == $("."+companyId).size() ){
											$("."+companyId).remove();
										}else{
											$("input[value="+orderFromId+"]").parentsUntil("table").remove();
										}
									}
									calculate();
									//刷新页面
									window.location.reload();
								}
							});
							
					}else{
						var errorMsg = (!data.msg) ? "" : data.msg;
						art.dialog({
								id : "delFalse",
								lock : true,
								content: errorMsg,
								yesFn : function(){
	    			 			if((undefined!=result.loginUrl) && ("undefined"!=result.loginUrl) && (/^\s*$/g.test(result.loginUrl)==false)){
				    				//跳转到登录页面
				    			 	window.open (result.loginUrl) ;
				    		 }else{
				    		 	true;
				    		 }
	    		 			}
							});
					}
			},
			error:function(){
				art.dialog({
					id : "timeOut",
					lock : true,
					content: '网络超时,请重试',
					yesFn : true
				});
			}
		});
		},//end yesFn
		noFn: true
	});
}

/**
 * 批量删除购物车信息后，去除其他的剩余页面信息
 * @return
 */
function deleteCompany(){
	for(var i=0; i< $(".cheCOM:checked").size(); i++){
		if(0==$($(".cheCOM:checked").get(i)).parentsUntil("table").find(".dd").size() ){
			$($(".cheCOM:checked").get(i)).parentsUntil("table").remove();
		}
	}	
}

/**
 * 申请议价
 * @return
 */
function bargaining(tradeId,cartId){
	art.dialog({
		id:'addBargain',
		title:'请填写必要信息',
		lock: true,
	    content: '<span> 议价价格：</span><input id="buyBargainingPrice" name="buyBargainingPrice" type="text" value="" maxlength="15"/> 元/吨',
	    yesFn:function(){
			var buyBargainingPrice = $("#buyBargainingPrice").val();
			
			if(Hundsun.StringUtil.trim(buyBargainingPrice)==""){   			//排除空格
				art.dialog({
					id : "doNotNull",
					lock : true,
					opacity: 0.5,
				    content: '价格不能为空！',
				    yesFn : true
				});
				  return false;
			  }
			
			if(!Hundsun.Validate.isNumber(buyBargainingPrice)){
				art.dialog({
					id : "doNum",
					lock : true,
					opacity: 0.5,
				    content: '请填写数字！',
				    yesFn : true
				});
				  return false;
			}
			
			var decimal = buyBargainingPrice.split(".");
			if(decimal.length=1){
			}else{
				if(decimal.length>2 || decimal[1].length>2){
					art.dialog({
						id : "decimal",
						lock : true,
						opacity: 0.5,
					    content: '请注意填写的格式正确，且小数点后不超过2位',
					    yesFn : true
					});
					  return false;
				}
			}
			
			if(!(accSub(buyBargainingPrice,0.01)>=0 && accSub(999999999,buyBargainingPrice)>=0)){
				art.dialog({
					id : "SuitNum",
					lock : true,
					opacity: 0.5,
				    content: '请填写适当的价格',
				    yesFn : true
				});
				  return false;
			}
			
			jQuery.ajax({
				type : "POST",
				url : appServer + "/delisting/buyer/bargaining.htm",
				data : {
					"tradeId" : tradeId,
					"cartId" : cartId,
					"buyBargainingPrice" : buyBargainingPrice
				},
				success : function(result) {
					if(typeof(result)=="string"){
						 alert("您还没有登录,请点击左上角的登录条进行登录,再进行议价请求,谢谢.");
			    		 if((undefined!=result.loginUrl) && ("undefined"!=result.loginUrl) && (/^\s*$/g.test(result.loginUrl)==false)){
			    			//跳转到登录页面
			    			 window.open (result.loginUrl) ;
			    		 }
			    		 
			    	 }else{
			    		 if(result.doBargain){
					 	 		art.dialog({
									id : "addSuccess",
									lock : true,
								    content: "议价请求成功！",
								    yesFn : true
								});
					     }else{
					    	 var errorMsg = (!result.msg) ? "" : result.msg;
				    		 art.dialog({
									id : "addFalse",
									lock : true,
								    content: errorMsg,
								    yesFn : function(){
				    			 		if((undefined!=result.loginUrl) && ("undefined"!=result.loginUrl) && (/^\s*$/g.test(result.loginUrl)==false)){
						    			//跳转到登录页面
						    			 window.open (result.loginUrl) ;
						    		 }
			    		 		}
								});
					     }
			    	 }
			},
				error:function(){
					art.dialog({
						id : "timeOut",
						lock : true,
						content: '网络超时,请重试',
						yesFn : true
					});
				}
			});
	    },
		noFn:function(){}
	});
}

//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(arg1, arg2) {
	var t1 = 0, t2 = 0, r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length
	} catch (e) {
	}
	try {
		t2 = arg2.toString().split(".")[1].length
	} catch (e) {
	}
	with (Math) {
		r1 = Number(arg1.toString().replace(".", ""))
		r2 = Number(arg2.toString().replace(".", ""))
		return (r1 / r2) * pow(10, t2 - t1);
	}
}

//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1, arg2) {
	var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {
	}
	try {
		m += s2.split(".")[1].length
	} catch (e) {
	}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
			/ Math.pow(10, m)
}

// 加法函数，用来得到精确的加法结果
// 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
// 调用：accAdd(arg1,arg2)
// 返回值：arg1加上arg2的精确结果
function accAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2));

	return accDiv((accMul(arg1, m) + accMul(arg2, m)), m);
}

// 减法函数
function accSub(arg1, arg2) {
	return accAdd(arg1, -arg2);
}