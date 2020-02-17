//添加进入购物车
function addCart(tradeId,tradeType,listTotalWeight,wholeOrder,listTotalNum){
	art.dialog({
			id:'addCart',
			title:'请填写必要信息',
			lock: true,
		    content: '<span style="color:red">*</span>摘牌量：</th><td ><input id="totalWeight" name="totalWeight" type="text" value="" maxlength="15"/> 吨',
		    yesFn:function(){
				var totalWeight = $("#totalWeight").val();
				
				if(Hundsun.StringUtil.trim(totalWeight)==""){   			//排除空格
					art.dialog({
						id : "doNotNull",
						lock : true,
						opacity: 0.5,
					    content: '摘牌量不能为空！',
					    yesFn : true
					});
					  $('input[name=totalWeight]').focus();
					  return false;
				  }
				
				if(!Hundsun.Validate.isNumber(totalWeight)){
					art.dialog({
						id : "doNum",
						lock : true,
						opacity: 0.5,
					    content: '请填写数字！',
					    yesFn : true
					});
					  $('input[name=totalWeight]').focus();
					  return false;
				}
				
				var decimal = totalWeight.split(".");
				if(decimal.length==1){
				}else{
					if(decimal.length>2 || decimal[1].length>3){
						art.dialog({
							id : "decimal",
							lock : true,
							opacity: 0.5,
						    content: '请注意填写的格式正确，且小数点后不超过3位',
						    yesFn : true
						});
						  $('input[name=totalWeight]').focus();
						  return false;
					}
				}
				
				if(!(accSub(totalWeight,0.001)>=0 && accSub(999999999,totalWeight)>=0)){
					art.dialog({
						id : "SuitNum",
						lock : true,
						opacity: 0.5,
					    content: '请填写适当的摘牌量',
					    yesFn : true
					});
					  $('input[name=totalWeight]').focus();
					  return false;
				}
				
				if(!checkWeight(listTotalWeight,wholeOrder,listTotalNum)){  			 //整件下单时的摘牌控制
					art.dialog({
						id : "NoSuitWeight",
						lock : true,
						opacity: 0.5,
					    content: '此挂牌为整件下单,不可拆分单件；<br />下单量应大致为单件量的整数倍(浮动量为正负"'+floatWeight+'"吨),<br />其中单件量大致为 "'+oneWeight+'"吨',
					    yesFn : true
					});
					  $('input[name=totalWeight]').focus();
					  return false;
				  }
				postOrder(tradeId,tradeType,totalWeight);
				
		    },
			noFn:function(){}
		});
}

/**
 * 把摘牌信息提交到后台
 * @param tradeId
 * @param tradeType,交易方式
 * @param totalWeight
 * @param isTips;是否弹出提示信息 N=不提示;
 * @param num;全选加入购物车时，执行到个数;
 */
function postOrder(tradeId,tradeType,totalWeight,isTips,num){
	jQuery.ajax({
		type : "POST",
		url : appServer + "/listing/addCart.htm",
		data : {
			"tradeId" : tradeId,
			"tradeType" : tradeType,
			"totalWeight" : totalWeight
		},
		success : function(result) {
			if(typeof(result)=="string"){
				art.dialog({id : "errorInfo",lock : true,content: '操作失败，请重新登录后再次操作。',yesFn : true});
	    	 }else{
	    		 if(result.doCart){
			    	 if(result.ask){
			    		 var errorMsg = (!result.msg) ? "" : result.msg;
			    		 var weight = result.weight;
			    		 if("N"==isTips){
			    			 combineCart(tradeId,tradeType,weight,isTips)
			    		 }else{
				    		 art.dialog({id : "combineCart",lock : true,content: errorMsg,
								    yesFn : function(){
				    			 		combineCart(tradeId,tradeType,weight,isTips)
				    		 		},
								    noFn : true
							 });
				    	}
			 	 	 }else if(isTips!="N"){
			 	 		try{
			 	 			updateShopCart();
			 	 		}catch(error) {} 
			 	 		art.dialog({id : "addSuccess",lock : true,content: "添加购物车成功！<br />添加量："+totalWeight+"吨", yesFn : true});
			 	 	 }
			     }else{
			    	 var errorMsg = (!result.msg) ? "" : result.msg;
			    	 if("N"==isTips){
			    		 addAllMsg += errorMsg+"<br />";
			    	 }else{
			    		 art.dialog({
								id : "addFalse",lock : true,content: errorMsg,
							    yesFn : function(){
				    			 	if((undefined!=result.loginUrl) && ("undefined"!=result.loginUrl) && (/^\s*$/g.test(result.loginUrl)==false)){
						    			//跳转到登录页面
						    			 window.open (result.loginUrl) ;
						    		 }
			    		 		}
							});
			    	 }
		    		 
			     }
	    	 }
			if("N"==isTips){
				if($("input[name='chk_list']:checked").length==num){addAllTips();}
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
}

/**
 * 全选
 */
function selAllToCart(isCK){
	 $("input[name='chk_list']:not(:disabled)").attr("checked",isCK);
}

/**
 * 全选，加入购物车
 */
var addAllMsg = "";
function addAllToCart(){
	addAllMsg = "";
	var num = 0;
     $("input[name='chk_list']:checked:not(:disabled)").each(function() {
    	 var isDisabled = $(this).attr("disabled");
    	 if(isDisabled && isDisabled=="disabled"){
    	 }else{
    		 var arr=this.value.split(",");
    		 num++;
    		 postOrder(arr[0],1,arr[1],"N",num);
    	 }
     });
     if(num==0){
    	 art.dialog({id : "selNoTips",lock : true,content: "请选择要加入购物车的货品", yesFn : true});
     }
    
}

function addAllTips(num){
	 var msg = addAllMsg.length>0 ? "操作完成，提示：<br />"+addAllMsg : "操作成功";
     art.dialog({id : "addSuccess",lock : true,content: msg,
		    yesFn : function(){parent.updateShopCart();}
	 });
}

//合并购物车信息
function combineCart(tradeId,tradeType,weight,isTips){
	jQuery.ajax({
		type : "POST",
		url : appServer + "/listing/combineCart.htm",
		data : {
			"tradeId" : tradeId,
			"tradeType" : tradeType,
			"weight" : weight
		},
		success : function(result) {
			if(typeof(result)=="string"){
				if((undefined!=loginUrl) && ("undefined"!=loginUrl) && (/^\s*$/g.test(loginUrl)==false)){
					alert("您还没有登录,请点击左上角的登录条进行登录,再进行添加购物车,谢谢.");
					//跳转到登录页面
					window.open (loginUrl) ;
				}else{
					alert("操作失败，请重新登录后再次操作。");
				}
    		 
			}else{
				if(result.doCart){
					try{updateShopCart();}catch(error) {} 
		 	 		if(isTips!="N"){
		 	 			art.dialog({id : "addSuccess",lock : true,content: "添加购物车成功！<br />添加量："+weight+"吨",yesFn : true});
		 	 		}
				}else{
					var errorMsg = (!result.msg) ? "" : result.msg;
					if(isTips=="N"){
						addAllMsg += errorMsg;
					}else{
						art.dialog({id : "addFalse",lock : true,content: errorMsg,yesFn : true});
					}
					
				}
			}
		},
		error:function(){
			art.dialog({id : "timeOut",lock : true,content: '网络超时,请重试',yesFn : true});
		}
	});
}

var startV = 0; //整件摘牌时，摘牌重量的起始范围
var endV = 0;  //整件摘牌时，摘牌重量的结束范围
var oneWeight = 0; //整件摘牌时，计算的单件重量
var floatWeight = 0; //整件摘牌时，重量的浮动范围
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

//功能：将浮点数四舍五入，取小数点后3位   
function toDecimal(x) {   
    var f = parseFloat(x);   
    if (isNaN(f)) {   
        return;   
    }   
    f = Math.round(x*1000)/1000;   
    return f;   
}  

function isEmpty(v){
	if(undefined==v || "undefined"==v){return true;}
	if(/^\s*$/g.test(v)){
		return true;
	}else{
		return false;
	}
}
/**
 * 摘牌时，判断如果是单件整件下单，摘牌重量是否满足以下要求：
 * 单件重量*N-单件重量*10% =< 摘牌重量 <= 单件重量*N+单件重量*10%
 * 单件重量=挂牌总重量/数量
 * 数量没有时, 那就不受这个整件下单限制
 * @returns {Boolean}
 */
function checkWeight(listTotalWeight,wholeOrder,listTotalNum){
	var isWholeOrder = wholeOrder; //是否整件下单
	if((isEmpty(isWholeOrder)==false) && (isWholeOrder=="1")){ //整件下单
		var listNum = listTotalNum; //挂牌数量
		if(isEmpty(listNum) || formatFloatV(listNum)<=0.0){
			return true;
		}else{
			var listWeight = listTotalWeight; //挂牌重量
			var delistWeight = formatFloatV($("#totalWeight").val()); //摘牌重量
			oneWeight = formatFloatV(listWeight) / formatFloatV(listNum);
			floatWeight = toDecimal(oneWeight*0.1); //浮动重量
			oneWeight = toDecimal(oneWeight); //保留3位小数
			var n = parseInt((delistWeight*1000)/(oneWeight*1000)); //摘牌件数，向下取整
			if(0==n){n=1;}
			startV = oneWeight*n-floatWeight;
			endV = oneWeight*n+floatWeight;
			if(startV<=delistWeight && delistWeight<=endV){
				return true;
			}else{
				startV = oneWeight*(n+1)-floatWeight;
				endV = oneWeight*(n+1)+floatWeight;
				if(startV<=delistWeight && delistWeight<=endV){
					return true;
				}else{
					return false;
				}
				
			}
		}
		
	}else{
		return true;
	}
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

//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
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

//减法函数
function accSub(arg1, arg2) {
	return accAdd(arg1, -arg2);
}