/**
 * 下单
 */
function orderC(){
	art.dialog({
		id : "order",
		title:"下单确认",
		lock : true,
	    content: '同卖家,同品种,同交收方式,同交收仓库,<br />同挂牌方式,同交收截止日期,同挂牌类型和<br />同合同模板的商品会合并成一个合同，<br />确定要下单吗？',
	    yesFn : function(){
	    	orderDo();
		},
		noFn: true
	});
}

/**
 * 普通方式删除
 * @param cartId
 * @param type
 * @param companyId
 * @return
 */
function orderDo(){
	$("#orderBtn1").text("下单处理中");
	$("#orderBtn1").attr("disabled",true);
	$("#orderBtn2").text("下单处理中");
	$("#orderBtn2").attr("disabled",true);
	var cartJsonList = [];  //购物车列表
	var selNum = 0;
	var isNeedUkey = false; //是否需要ukey验证，如果有产能摘牌时，需要ukey验证
	$("input[name='input2']:checked").each( function(i,o){
		selNum++;
		var parE = $(this).parent();
		var cartJson = {
				"id":o.value,
				"tradeType":"1",
				"tradeId":parE.find("input[name='tradeId']").val(),
				"price":parE.find("input[name='price']").val(),
				"bargainingPrice":parE.find("input[name='bargainingPrice']").val(),
				"totlePrice":parE.find("input[name='totlePrice']").val(),
				"totalWeight":parE.find("input[name='totalWeight']").val(),
				"totalNum":parE.find("input[name='totalNum']").val()
				,"buyDeliveryType":parE.parent().find("select[name='buyDeliveryType']").val()
				//,"companyId":parE.find("input[name='companyId']").val()
		}
		cartJsonList.push(cartJson);
		
		//判断如果有产能挂牌，需要输入ukey进行验证
		if(parE.find("input[name='goodsType']").val()=="5"){
			isNeedUkey = true;
		}
	});
	//alert("selNum="+selNum+";操作中断！"+cartJsonList);selNum=0;
	
	if(selNum==0){
		art.dialog({id : "noGood",lock : true,content: '请先选择下单商品！'});
	}else{
		var cartListStr = JSON.stringify(cartJsonList);
		$("#cartJsonListStr").val(cartListStr);
		var showCFCA = $("#showCFCA").val()=="true" ? true : false;
		if(showCFCA && isNeedUkey){ //需要ukey验证
			$("#isNeedUkey").val("YES");
			cfcaResult = SelectCertificate(showCFCA);
			if( SelectCertificate($("#showCFCA").val())){
				$("#orderFrom").submit();
			}
		}else{
			$("#isNeedUkey").val("NO");
			$("#orderFrom").submit();
		}
		
	}
	$("#orderBtn1").text("下单");
	$("#orderBtn1").attr("disabled",false);
	$("#orderBtn2").text("下单");
	$("#orderBtn2").attr("disabled",false);
}

