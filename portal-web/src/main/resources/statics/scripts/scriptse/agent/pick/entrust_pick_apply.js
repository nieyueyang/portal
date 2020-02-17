function saveApply(){
	  var count = $("input[id='applyWeight']");//总记录数
	  var isLast = $("#isLast").val();//是否是最后一次还款
	  var avaliblePrice = $("#totalAvaliable").text();//最大可提货款
	  var totalPrice = 0;
	  var applyItemCount = 0;
	  var unitPriceCount = 0;
	  var swappedFlag = 0;//是否有提货商品
	  var whid = 0;//仓库ID
	  var numflag = 0;//是否有大于可提货重量的数据
	  var nummsg = "";
		  
	      $(count).each(function(i,d){
	    	  if($(d).val()!=""){
	    		var unitPrice = $(d).attr("unitPrice");
	      		if(isNaN(unitPrice)){
	      			unitPrice=0;
	      		}else{
	      			unitPrice = parseFloat(unitPrice);
	      		}
	      		if(!(unitPrice>0 )){
	      			nummsg += (parseInt(i)+parseInt(1))+",";
	      			unitPriceCount=3;
	      		}
	    	  }
	      		
	      	if($(d).val()!=""&&validate3num($(d).val())&&$(d).val()>0){
	      		totalPrice = accAdd(totalPrice,accMul($(d).attr("unitPrice") ,$(d).val()));
	      		applyItemCount = 1;
	  			if(isLast == 'N' || isLast == ''){
	  				if (accSubtr($(d).val(),$(d).attr("max")) > 0) {//当前提货重量大于可提货重量
	  					numflag = 1;
	  					nummsg += (parseInt(i)+parseInt(1))+",";
	  				}
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
	      	};
	      if(unitPriceCount==3){
	      		Hundsun.PopUtil.alert({
	  				msg : "第" + nummsg + "条数据的货品单价为空或者为0，必须先维护结算单价才能提货申请，请联系代理方",
	  				width : 450,
	  				timeout : 800,
	  				type : 'warn'
	  			})
	  			return false;
	      	}
	      $(count).each(function(i,d){
	  		if($(d).val()!=""){
	  			if(whid!=$(d).attr("whid")){
	  				Hundsun.PopUtil.alert({
		  				msg : "只能选择一个仓库的数据提货！",
		  				width : 450,
		  				timeout : 800,
		  				type : 'warn'
		  			})
	  				applyItemCount=0;
	  				return false;
	  			}
	  		}
	  	});
	      
	    if(applyItemCount==1){
	  		
	  		if(isLast == 'N' || isLast == ''){
	  			totalPrice = parseFloat(totalPrice).toFixed(2);
  				nummsg = nummsg.substring(0,nummsg.lastIndexOf(","));
  				if(numflag==1){
  		  			nummsg = "第" + nummsg + "条数据大于库存重量！";
  		  		Hundsun.PopUtil.alert({
	  				msg : nummsg,
	  				width : 450,
	  				timeout : 800,
	  				type : 'warn'
	  			})
					return false;
  		  		}
  		  		
  		  	if (parseFloat(totalPrice) > parseFloat(avaliblePrice)) {
		  			var toPayAmt = parseFloat(accSubtr(parseFloat(totalPrice),parseFloat(avaliblePrice))).toFixed(2);
		  			var msg = "已提货款为" + totalPrice + "元，最大可提货款为" + avaliblePrice + "元，已提货款大于最大可提货款！需要还货款" + parseFloat(parseFloat(totalPrice) - parseFloat(avaliblePrice)) + "元!是否需要进入还款申请？";
		  				Boxy.confirm(msg, function() {
	  						_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
	  						//进入到还款页面
	  						clickRepayOnline();
	  					});
	  		/*		Hundsun.PopUtil.alert({
		  				msg : "已提货款为" + totalPrice + "元，最大可提货款为" + avaliblePrice + "元，已提货款大于最大可提货款！需要还货款" + parseFloat(parseFloat(totalPrice) - parseFloat(avaliblePrice)) + "元" ,
		  				width : 450,
		  				timeout : 800,
		  				type : 'warn'
		  			})*/
  					return false;
  				}
  		  		
  			}else{
  				if(numflag == 1){
  		  			nummsg = "第" + nummsg + "条数据大于库存重量！";
  		  		}
  			}
	  		Boxy.confirm(nummsg + "确定要提货吗？", function() {
	  			_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
	  			$('#pickapplyForm').submit();
	  		});
	      }  
	  
}

/**
 * 展示或者收藏申请明细信息
 * 
 * @param element
 */
function showApplyDetail(element) {
	var detailTr = $(element).parent().parent().next();
	var imgSrc = $(element).attr("src");
	if (imgSrc.match("plus_noLine.gif") != null) {
		$(element).attr("src",
				appServer + "/scripts/zTree/zTreeStyle/img/minus_noLine.gif");
		$(detailTr).show();
	} else {
		$(detailTr).hide();
		$(element).attr("src",
				appServer + "/scripts/zTree/zTreeStyle/img/plus_noLine.gif");
	}
}

/**
 * 提交给仓库
 * 
 * @param url
 */
function submitPickApply(url){
	var msg = "你确定要提交仓库吗？";
	Boxy.confirm(msg, function() {
		var _msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
		jQuery.post(url, function(v) {
			if (v.success == true) {
				_msg.hide();
				Hundsun.PopUtil.alert({
					msg : '操作成功......',
					autohide : true,
					width : 280,
					callback : function() {
						Hundsun.UrlUtil.refresh();
					}
				});
			} else {
				_msg.hide();
				Hundsun.PopUtil.alert({
					msg : v.msg,
					autohide : false,
					width : 450,
					type : 'warn'
				});
			}
		}, 'json');
	});
}

validate3num = function(num){
	var reg = /^[+]?\d*\.?\d{1,3}$/;  
	return reg.test(num);
}