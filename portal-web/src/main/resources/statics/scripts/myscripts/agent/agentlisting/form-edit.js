


var formHtml;
var appendHtml = '';

jQuery(function(){
	
	createTableByVariety(null,null,null,null,null,chanageSubmit);
})

//提交
function chanageSubmit(){
	
	var form = $('#form_edit').validateForm({
			errorPlacement: function(error, element) {
	            element.siblings("span").css({"color":"red"}).text(error.text());
	        },
	        success: function(label) {
	            label.text("");
	        },
	        rules:{
	        	'realTotalPriceAmt' : {
	        		 'required':true,
					'min' : 0.01,
					'max' : 9999999999
				},
	        	'listUnitPriceAmt':{'min':0.01,'max':9999999999},
	        	'firstPayAmt':{'min':0,'max':9999999999}, //首付款金额
	        	'listNum':{'min':1,'max':9999999999},
	        	'manufacuturer':{'maxlength':40},
	        	'grade':{'maxlength':40},
	        	'orgin':{'maxlength':30},
	        	'brand':{'maxlength':10},
	        	'standard':{'maxlength':40},
	        	'packing':{'maxlength':80},
	        	'warehouseCmpNameS':{'maxlength':25},
	        	'length':{'maxlength':12},
	        	'width':{'maxlength':12},
	        	'thickness':{'maxlength':12},
	        	'listNum':{'maxlength':9},
	        	'listWeight':{'min':0.001,'max':99999999999},
	        	'minWeight':{'min':0.001,'max':99999999999},
	        	'batchNo':{'maxlength':40}
	        },
	        submitHandler:function(f) {
	        	//setAgentPayedAmt();
	        	if(setAgentPayedAmt()&&validateForm()){
	        		f.submit();
	        	}
	        }
	    });
}
//校验数据
function validateForm(){
	  var listUnitPrice = $('input[name=listUnitPrice]').val();
	  var listNum = $('input[name=listNum]').val();
	  var minWeight = $('input[name=minWeight]').val();
	  var listWeight = $('input[name=listWeight]').val();
	  var warehouseCmp =  $("#warehouseCmp").val();
	  var image =  $('input[name=image_file]').val();
	  var agentContractDeadline = $('input[name=agentContractDeadline]').val();
	  var patn = /\.jpg$|\.jpeg$|\.gif$|\.png$/i;

	  if(typeof(image) != "undefined" && image!=""){
		  var img = image.split(".");
		  if(!patn.test("."+img[1])){ 
			  	 alert("只能上传jpg，jpeg或gif格式的图片！");
	             return false;
		  }
		 
	  }
	  if(Number(listWeight)<=0){
		  alert("挂牌量不能小于0！");
		  $('input[name=listWeight]').focus();
		  return;
	  }
	  if(Number(listUnitPrice)<=0){
		  alert("挂牌单价不能小于0！");
		  $('input[name=listUnitPrice]').focus();
		  return;
	  }
	  if(Number(minWeight)<=0){
		  alert("最小购买量不能小于0！");
		  $('input[name=minWeight]').focus();
		  return;
	  }
	  if(listNum!=""){
		  if((/^(\+|-)?\d+$/.test(listNum)) && listNum>=0){
			  if(listNum!="" && Number(listNum)<0){
				  alert("数量量不能小于0！");
				  $('input[name=listNum]').focus();
				  return;
			  }
		  }else{
			  alert("数量只能是正整数");
			  return ;
		 }
	  }
	  if(Number(minWeight)>Number(listWeight)){
		  alert("最小购买量不能大于挂牌量！");
		  $('input[name=minWeight]').focus();
		  return;
	  }
	  
	  //交收仓库(三方仓库)不能为空 warehouseCmp
	  	var warehouseCmp =  $("#warehouseCmp").val();
	  	if(warehouseCmp == null){
	  		  alert("请选择交收仓库！");
			//  $('input[name=agentContractDeadline]').focus();
			  return;
	  	}
	  		  //委托人
		  var directUserCompanyName = $('input[name=directUserCompanyName]').val();
	 		//委托人不能为空 directUserCompanyName
		 if (directUserCompanyName == "" || directUserCompanyName == null) {
			alert("委托人信息不能为空！");
			  $('input[name=directUserCompanyName]').focus();
			return;
		}
	  
	   
	 //校验 费率 天数
	//var agentDays = document.getElementsByTagName("repayCompleteDay");
	//var agentDayRate = document.getElementsByTagName("feeRate");
	var isRightAgentRate = true;
	$("input[name^='repayCompleteDay']").each(function(i, obj) {
				var value = $(obj).val();

				var sp = $(obj).next();
				if (sp.attr("class") == 'red') {
					sp.remove();
				}
				
				if (value == null || value == "") {
					var errMsg = $("<span class='red'>请输入天数</span>");
					errMsg.insertAfter($(obj));
					$(obj).focus();
					isRightAgentRate = false;
					return false;
				}

				var agentPayDay = $("#agentContractDeadline").val();
				if (agentPayDay == null || agentPayDay == "") {
					alert("请先输入最长垫款期限!");
					$(obj).focus();
					isRightAgentRate = false;
					return false;
				}
				// 必须为整数
				if ((/^(\+|-)?\d+$/.test(value)) && value > 0) {
				} else {
					// append 一行红字
					var errMsg = $("<span class='red'>请输入正整数</span>");
					errMsg.insertAfter($(obj));
					$(obj).focus();
					isRightAgentRate = false;
					return false;
				}

			if (parseInt("99999") < parseInt(value)) {
					// append 一行红字
					var errMsg = $("<span class='red'>天数不能大于99999</span>");
					errMsg.insertAfter($(obj));
					$(obj).focus();
					isRightAgentRate = false;
					return false;
				}
				
				// 小于最长垫款期限
				if (parseInt(agentPayDay) < parseInt(value)) {
					// append 一行红字
					var errMsg = $("<span class='red'>天数不能大于最长垫款期限</span>");
					errMsg.insertAfter($(obj));
					$(obj).focus();
					isRightAgentRate = false;
					return false;
				}

			});
		
			$("input[name^='feeRate']").each(function(i, obj) {
				var value = $(obj).val();

				var sp = $(obj).next();
				if (sp.attr("class") == 'red') {
					sp.remove();
				}

				if (value == null || value == "") {
					var errMsg = $("<span class='red'>请输入费率</span>");
					errMsg.insertAfter($(obj));
					$(obj).focus();
					isRightAgentRate = false;
					return false;
				}

				if (isNaN(value)) {
					// append 一行红字
					var errMsg = $("<span class='red'>格式不正确</span>");
					errMsg.insertAfter($(obj));
					$(obj).focus();
					isRightAgentRate = false;
					return false;
				}

				if (value < 0) {
					// append 一行红字
					var errMsg = $("<span class='red'>请输入大于0的数字</span>");
					errMsg.insertAfter($(obj));
					$(obj).focus();
					isRightAgentRate = false;
					return false;
				}
				
				
			  //保留两位小数
				value = parseFloat(value).toFixed(2);
				if (parseFloat(value) > parseFloat("9999999999.99")) {
					// append 一行红字
					var errMsg = $("<span class='red'>请输入小于9999999999.99%的数字</span>");
					errMsg.insertAfter($(obj));
					$(obj).focus();
					isRightAgentRate = false;
					return false;
				}
				
				$(obj).val(value);

			});
			
	   if(!isRightAgentRate){
	   		return;
	   }
 
	  var error = '';
		$('font.error[required]').each(function(){	
			var name = $(this).attr('for');	
			var clength = $('input[name="'+name+'"]:checked').length;
			if(clength==0){
				var title = $(this).attr('forTitle');	
				error +=  title +'至少选择一个选项!\n'
			}
		});
		if (error) {
			alert(error);
			return;
		}
		
	  return true;
}

function checkTheSameDay(obj1){
	var day = $(obj1).val();
	
	var sp = $(obj1).next();
	if (sp.attr("class") == 'red') {
		sp.remove();
	}
	
	if(day!=null && day!=""){
		$("input[name^='repayCompleteDay']").each(function(i, obj) {
				var value = $(obj).val();
				if($(obj1).attr("id") != $(obj).attr("id")){
					
					if(value!=null && value!=""){
						if(value == day ){
							var errMsg = $("<span class='red'>天数不能重复</span>");
							errMsg.insertAfter($(obj1));
							$(obj1).focus();
							return false;
						}
					}	
					
				}
				
			});
		
	}
}


//填充 已垫付金额
function setAgentPayedAmt(){
	//货款金额 - 首付款金额
	var firstPayAmt_f = $('input[name=firstPayAmt]').val();

	//var listTotalPriceAmt = $('input[name=listTotalPriceAmt]').val();
	var realTotalPriceAmt = $('input[name=realTotalPriceAmt]').val();
	var agentPayedAmt_f = $('input[name=agentPayedAmt]').val();
	if (!isNaN(agentPayedAmt_f) && agentPayedAmt_f != '') {
		if (!isNaN(realTotalPriceAmt) && realTotalPriceAmt != '') {
			if (Number(firstPayAmt_f) != parseFloat(accSubtr(Number(realTotalPriceAmt),Number(agentPayedAmt_f))).toFixed(2)) {
				Hundsun.PopUtil.alert({
					msg : "已垫款额不等于挂牌实际总价与首付款之差！",
					width : 450,
					timeout : 800,
					type : 'warn'
				});
				return false;
			}
		}/* else {
			if (Number(firstPayAmt_f) != parseFloat(Number(listTotalPriceAmt)
					- Number(agentPayedAmt_f)).toFixed(2)) {
				Hundsun.PopUtil.alert({
					msg : "已垫款额不等于挂牌总价与首付款之差！",
					width : 450,
					timeout : 800,
					type : 'warn'
				});
				return false;
			}
		}*/

	}
	if (!isNaN(realTotalPriceAmt) && realTotalPriceAmt != '') {
		var agentPayedAmt = accSubtr(realTotalPriceAmt,firstPayAmt_f) ;
		agentPayedAmt = parseFloat(agentPayedAmt).toFixed(2);
		$('input[name=agentPayedAmt]').val(agentPayedAmt);
	} /*else {
		var agentPayedAmt = listTotalPriceAmt - firstPayAmt_f;
		agentPayedAmt = parseFloat(agentPayedAmt).toFixed(2);
		$('input[name=agentPayedAmt]').val(agentPayedAmt);
	}*/
	return true;
	 
}
//当挂牌总价变动时，改变挂牌单价
function changeForListUnitPrice() {
	var agentDepositeRate = $('input[name=agentDepositeRate]').val();
	var listWeight = $('input[name=listWeight]').val();
	var listTotalPriceAmt_f = $('input[name=listTotalPriceAmt]').val();
	// 保留2位小数
	// if
	(!isNaN(agentDepositeRate) && agentDepositeRate != "")
	{
		agentDepositeRate = parseFloat(agentDepositeRate).toFixed(2);
		$('input[name=agentDepositeRate]').val(agentDepositeRate);
	}
	if (!isNaN(listWeight) && !isNaN(agentDepositeRate)
			&& !isNaN(listTotalPriceAmt_f)) {
		if (listTotalPriceAmt_f.length >= 15) {
			return;
		}
		if (Number(listTotalPriceAmt_f) <= 0) {
			return;
		}
		if (Number(listWeight) <= 0) {
			return;
		}
		listTotalPriceAmt_f = parseFloat(listTotalPriceAmt_f).toFixed(2);
		$('input[name=listTotalPriceAmt]').val(listTotalPriceAmt_f);

		var listUnitPriceAmt_f = parseFloat(
				Number(accDiv(listTotalPriceAmt_f,listWeight))).toFixed(2);
		$('input[name=listUnitPriceAmt]').val(listUnitPriceAmt_f);
		var agentDepositeRate_ = parseFloat(Number(accDiv(agentDepositeRate,100)))
				.toFixed(4);
		var firstPayAmt_f = parseFloat(accMul(agentDepositeRate_,listTotalPriceAmt_f))
				.toFixed(2);
		$('input[name=firstPayAmt]').val(firstPayAmt_f);
		$('input[name=agentPayedAmt]').val("");
		$('input[name=realTotalPriceAmt]').val(listTotalPriceAmt_f);
	}
}


//填写挂牌量时，自动填充自小购买量(自动四舍五入保留3位小数)
function changeForminWeight(obj){
	var listWeight = obj.value;
	if (!isNaN(listWeight)) {
		if (Number(listWeight) <= 0) {
			return;
		}
		if (listWeight.length <= 12) {
			listWeight = parseFloat(listWeight).toFixed(3);
			$("input[name=listWeight]").val(listWeight);
			$("input[name=minWeight]").val(listWeight);
		}
	}

	// 如果 单价和保证金比例不为空 ，则自动计算出 首付款金额
	var agentDepositeRate = $('input[name=agentDepositeRate]').val();

	var listUnitPriceAmt_f = $('input[name=listUnitPriceAmt]').val();
	if (!isNaN(listUnitPriceAmt_f) && listUnitPriceAmt_f != "") {
		var totalPriceAmt = parseFloat(accMul(listWeight,listUnitPriceAmt_f))
				.toFixed(2);
		$('input[name=realTotalPriceAmt]').val(totalPriceAmt);
		$('input[name=listTotalPriceAmt]').val(totalPriceAmt);
		if (!isNaN(agentDepositeRate) && agentDepositeRate != "") {
			var agentDepositeRate_ = parseFloat(Number(accDiv(agentDepositeRate,100)))
					.toFixed(4);
			var firstPayAmt_f = parseFloat(
					accMul(agentDepositeRate_,totalPriceAmt))
					.toFixed(2);
			$('input[name=firstPayAmt]').val(firstPayAmt_f);
			$('input[name=agentPayedAmt]').val("");
		}
	}
}

//格式化 参考市场行情,自动保留2位小数
function changeForReferencePrice(){
	var referencePrice = $('input[name=referencePrice]').val();
	if(referencePrice == null || referencePrice == ""){
		return;
	}
		if(!isNaN(referencePrice)){
		referencePrice = parseFloat(referencePrice).toFixed(2);
		$('input[name=referencePrice]').val(referencePrice);
	}
	
}

//当挂牌单价改变时，自动计算首付款
function changeForfirstPayAmt_f(){
	var listUnitPriceAmt_f = $('input[name=listUnitPriceAmt]').val();
	var agentDepositeRate = $('input[name=agentDepositeRate]').val();
	var listWeight = $('input[name=listWeight]').val();
	var realTotalPriceAmt = $('input[name=realTotalPriceAmt]').val();

	// 将首付款比例 保留2位小数
	if (!isNaN(agentDepositeRate) && agentDepositeRate != "") {
		agentDepositeRate = parseFloat(agentDepositeRate).toFixed(2);
		$('input[name=agentDepositeRate]').val(agentDepositeRate);
	}

	if (!isNaN(listWeight) && !isNaN(agentDepositeRate)
			&& !isNaN(listUnitPriceAmt_f)) {
		if (listUnitPriceAmt_f.length >= 15) {
			return;
		}
		if (Number(listUnitPriceAmt_f) <= 0) {
			return;
		}
		if (Number(listWeight) <= 0) {
			return;
		}
		listUnitPriceAmt_f = parseFloat(listUnitPriceAmt_f).toFixed(2);
		$('input[name=listUnitPriceAmt]').val(listUnitPriceAmt_f);

		var listTotalPriceAmt_f = parseFloat(
				Number(accMul(listUnitPriceAmt_f,listWeight))).toFixed(2);
		$('input[name=listTotalPriceAmt]').val(listTotalPriceAmt_f);
		$('input[name=realTotalPriceAmt]').val(listTotalPriceAmt_f);
		var agentDepositeRate_ = parseFloat(Number(accDiv(agentDepositeRate,100)))
				.toFixed(4);
		var firstPayAmt_f = parseFloat(accMul(agentDepositeRate_,listTotalPriceAmt_f))
				.toFixed(2);
		$('input[name=firstPayAmt]').val(firstPayAmt_f);
		$('input[name=agentPayedAmt]').val("");

	}

}

//格式化 跌价保证金比例数字为 2位小数
function formattePricefallDepositeRate() {
	var pricefallDepositeRate = $('input[name=pricefallDepositeRate]').val();
	if (!isNaN(pricefallDepositeRate) && pricefallDepositeRate != "") {
		pricefallDepositeRate = parseFloat(pricefallDepositeRate).toFixed(2);
		$('input[name=pricefallDepositeRate]').val(pricefallDepositeRate);
	}
}

//格式化 逾期违约金比例数字为 2位小数
function formatteOverduePayRate() {
	var overduePayRate = $('input[name=overduePayRate]').val();
	if (!isNaN(overduePayRate) && overduePayRate != "") {
		overduePayRate = parseFloat(overduePayRate).toFixed(2);
		$('input[name=overduePayRate]').val(overduePayRate);
	}
}

//已垫付金额  
function formatAgentPayedAmt() {
	var agentPayedAmt = $('input[name=agentPayedAmt]').val();
	var firstPayAmt_f = $('input[name=firstPayAmt]').val();
	// var listTotalPriceAmt = $('input[name=listTotalPriceAmt]').val();
	var realTotalPriceAmt = $('input[name=realTotalPriceAmt]').val();
	if (isNaN(realTotalPriceAmt) || realTotalPriceAmt == '') {
		return;
	}

	if (!isNaN(agentPayedAmt) && agentPayedAmt != '') {
		if (Number(agentPayedAmt) <= 0) {
			return;
		}
		if (agentPayedAmt.length >= 15) {
			return;
		}

		if (Number(agentPayedAmt) != parseFloat(accSubtr(Number(realTotalPriceAmt),Number(firstPayAmt_f))).toFixed(2)) {
			Hundsun.PopUtil.alert({
				msg : "已垫款额不等于挂牌总价与首付款之差！",
				width : 450,
				timeout : 800,
				type : 'warn'
			});
			$('input[name=agentPayedAmt]').val('');
			return;
		}

		agentPayedAmt = parseFloat(agentPayedAmt).toFixed(2);
		$('input[name=agentPayedAmt]').val(agentPayedAmt);
	}


}

//firstPayAmt 格式化
function formatfirstPayAmt() {
	var firstPayAmt = $('input[name=firstPayAmt]').val();
	if (!isNaN(firstPayAmt)) {
		if (Number(firstPayAmt) <= 0) {
			return;
		}

		if (firstPayAmt.length >= 15) {
			return;
		}

		firstPayAmt = parseFloat(firstPayAmt).toFixed(2);
		/*
		 * var listUnitPriceAmt_f = $('input[name=listUnitPriceAmt]').val(); var
		 * listWeight = $('input[name=listWeight]').val();
		 */
		// var listPrice = $('input[name=listTotalPriceAmt]').val();
		var realListPrice = $('input[name=realTotalPriceAmt]').val();

		if (!isNaN(realListPrice) && realListPrice != "") {
			var sumAmt = parseFloat(realListPrice).toFixed(2);
			if (parseFloat(firstPayAmt) > parseFloat(sumAmt)) {
				alert("首付款金额不能大于总货款");
				$('input[name=firstPayAmt]').val("");
				$('input[name=firstPayAmt]').focus();
				return;
			}
		}else{
			return;
		}
		$('input[name=firstPayAmt]').val(firstPayAmt);
		var firstPayRadio = parseFloat(accMul(accDiv(firstPayAmt,realListPrice),100))
				.toFixed(2);
		$('input[name=agentDepositeRate]').val(firstPayRadio);
	}
}


//选择定向采购商
function isDirectClick(){
		var isDirect= $('input[name=isDirect]:checked').val();
		if (isDirect == "1") {
			$("#selectBuyerDiv").show();
		} else {
			$("#selectBuyerDiv").hide();
		}
}


//选择仓库
function setWHCvalue(){
	var warehouseCmp=  $("#warehouseCmp").val();
	var warehouseCmpName=   $("#warehouseCmp").find("option:selected").text();
	if(warehouseCmp !=null){
		var str = warehouseCmp.split("|");
		if(str[0]=="-1"){
			document.getElementById("warehouseCmpName").readOnly=false;
			$('input[name=warehouseCmpName]').val("");
		}else{
			document.getElementById("warehouseCmpName").readOnly=true;
			$('input[name=warehouseCmpName]').val(warehouseCmpName);
		}
		$('input[name=warehouseCmpId]').val(str[0]);
		$('input[name=warehouseCmpAddress]').val(str[1]);
		$('input[name=settlementAddr]').val(str[1]);
	}
}


//检查挂牌重量与最小购买量是否相等，相等时只能整件下单且不能修改
function checkWeight(){
	  var listWeight = $('input[name=listWeight]').val();
	  var minWeight = $('input[name=minWeight]').val();
	  if(Number(minWeight)>Number(listWeight)){
		  alert("最小购买量不能大于挂牌量！");
		  $('input[name=minWeight]').focus();
		  return;
	  }
	  
	  if(Number(minWeight)==Number(listWeight)){
		  document.getElementById("isWholeOrder0").disabled=true;
		  $("input[name=isWholeOrder]:eq(1)").attr("checked",'checked');
	  }else{
		  document.getElementById("isWholeOrder0").disabled=false;
	  }
}

//指定交收库
var oldSelwhname = "",oldSelwhAddr = "",oldwhId="-1" ;  //已填写交收库的名称和地址
function isDirectWH(){
	var isDirectWhc= $('input[name=isDirectWhc]:checked').val();
	if (isDirectWhc == "1") {
		$("input[name=warehouseCmpId]").val(oldwhId);
		$('input[name=warehouseCmpAddress]').val(oldSelwhAddr);
		$('input[name=settlementAddr]').val(oldSelwhAddr);
		$('input[name=warehouseCmpName]').val(oldSelwhname);
		
		document.getElementById("warehouseCmpTd").style.display="";
		document.getElementById("whcmpInfo").style.display="none";
		//$('#warehouseCmp').val("");
		
		$('input[name=deliveryType]').each(function(){
			if($(this).val()=="1"){
				if($(this).is(":hidden")){
					$(this).show();
					$(this).attr("checked", false);
					$(this).next().show();
				}
			}
		});
	}else{
		oldSelwhname = $('input[name=warehouseCmpName]').val();
		oldSelwhAddr = $('input[name=settlementAddr]').val();
		oldwhId = $("input[name=warehouseCmpId]").val();
		
		//$("input[name=warehouseCmpId]").val("-1");
		document.getElementById("warehouseCmpTd").style.display="none";
		document.getElementById("whcmpInfo").style.display="";
		document.getElementById("warehouseCmpNameS").readOnly=false;
		document.getElementById("settlementAddrS").readOnly=false;
		
		$('input[name=deliveryType]').each(function(){  //非指定交收库，不能选择场内交收 add by housl 2014-3-27
			if($(this).val()=="1"){
				$(this).attr("checked", false);
				$(this).next().hide();
				$(this).hide();
			}
		});
	}
}


//选择交收方式
function setWHValue(){
	var deliveryType= getDeliveryTypeCKValue();  
	var listingType = $('input[name=listingType]:checked').val();
	if(listingType!="W" && listingType!="F"){
		if(deliveryType.indexOf("1")>=0){
			$("input[name=isDirectWhc]:eq(1)").attr("checked",'checked');
			document.getElementById("isDirectWhc1").disabled=true;
			document.getElementById("isDirectWhc0").disabled=true;
		}else{
			document.getElementById("isDirectWhc1").disabled=false;
			document.getElementById("isDirectWhc0").disabled=false;
		}
		
		oldSelwhname = $('input[name=warehouseCmpName]').val();
		oldSelwhAddr = $('input[name=settlementAddr]').val();
		oldwhId = $("input[name=warehouseCmpId]").val();
		
		isDirectWH();
	}
}


// 创建表单
function createTableByVariety(varietyCode,varietyName,listWeight,listNum,fn){
	
	var id = $("input[name=id]").val();
    var weightUnitType = $("input[name=weightUnitType]").val();//从隐藏域中获取 重量单位
	var priceUnitType = $("input[name=priceUnitType]").val();//从隐藏域中获取 金额单位
	 jQuery.get(       
			 	appServer + '/agentListing/load_detail_'+id+'_edit_' +varietyCode+'.htm?' + Math.round((Math.random()) * 100000000),
			 	{'listWeightS':listWeight,'listNumS':listNum},
	    		function(data){
			 		var htmlCode='';
	    			var project = data.tradeListingProject;
	    			var agentDirectUser = data.agentDirectUser;
	    			var rateItemList = data.rateItemList;
	    			$("input[name=directUserCompanyId]").val(agentDirectUser.companyId);
	    			   // tradeListingProject
	    			
	    			//设置单选按钮的默认选中
	    			var isDirect0="",isDirect1="";//是否定向
	    			var buyTypeM="",buyTypeC="",buyTypeD="";//购买方式
	    			var listingTypeD="",listingTypeG="",listingTypeC="";//挂牌类型
	    			var buyerDivDisplay = ""; //定向会员的display属性 
	    			var buyerCount=0; //已选择的定向会员个数
	    			//var listingType = $('input[name=listingType]:checked').val();
	    			var dirUserLists =[];
	    			/*if(listingType){
	    				project.listingType=listingType;
	    			}*/
	    			//常规物品属性列表
	    			var WP = data.WP_LIST;
	    			//规格属性列表
	    			var GG = data.GG_LIST;
	    			//交易属性列表
	    			//var JY = data.JY_LIST;
	    			//交收属性列表
	    			//var JS = data.JS_LIST;
	    			//交收库
	    			var WHCk = data.whclist;
	    			var msg = data.msg;
	    			if(msg!=null){
	    				 Hundsun.PopUtil.alert({
								msg:msg,
								width:450,
								timeout:800,
								type:'warn'
							})
						 document.getElementById("form_edit_submit").style.display="none";	
	    				 return;
	    			}
	    			if(WHCk==null){
	    				 Hundsun.PopUtil.alert({
								msg:"未加载到交收库信息，不能挂牌！",
								width:450,
								timeout:800,
								type:'warn'
							})
						document.getElementById("form_edit_submit").style.display="none";	
	    				 return;
	    			}
	    			
	    			if(varietyName){
	    				$("input[name=varietyName]").val(varietyName);
	    			}else{
	    				$("input[name=varietyName]").val(project.varietyName);
	    			}
	    			
	    			$("input[name=warehouseCmp]").val(project.warehouseCmpId);
	    			
	    			formHtml = '<fieldset><legend>常规物品属性</legend><table class="c3">';
	    			jQuery(WP).each(function (i){creatForm(this,i,WP.length,project)});
	    			
                    formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;
	    			
	    			formHtml = '<fieldset><legend>物品规格属性</legend><table class="c3">';
	    			jQuery(GG).each(function (i){creatForm(this,i,GG.length,project)});
	    		/*	if($('input[name=listingType]:checked').val() =="W" || $('input[name=listingType]:checked').val() =="F"){  //库存挂牌,只显示“规格”属性，不显示长、宽、厚等
	    				formHtml += "<tr><th width=\"14%\">规格:</th><td ><input type='text'  name='specification' value='"+project.specification+"'  class=\"inpt \" style=\"width:126px;\" /></td></tr>";
	    			}*/
	    			formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;

	    			formHtml = '<fieldset><legend>委托代理属性</legend><table class="c3">';
	    			/*jQuery(JY).each(function (i){creatForm(this,i,JY.length,project)});*/
	    			
	    			formHtml = formHtml
						+ "<tr><th  width=\"15%\"><span style=\"color:red\">*</span>挂牌量 ：</th>"
						+ "<td width=\"25%\">"
						+ "<input type=\"text\"  id=\"listWeight\" name=\"listWeight\" "
						+ "value=\""
						+ project.listWeight
						+ "\"  onblur=\"changeForminWeight(this);\" "
						+ "class=\"inpt required {minlength:0,maxlength:12,number:true,min:0,max:99999999.999}\" style=\"width:126px;\" /> "
						+ (weightUnitType == null ? "吨" : weightUnitType)
						+ " <span class=\"red\"></span>" + "</td>";

					formHtml = formHtml
						+ "<th  width=\"15%\"><span style=\"color:red\">*</span>挂牌单价 ：</th>"
						+ " <td width=\"25%\">"
						+ "<input type=\"text\"  id=\"listUnitPriceAmt\" name=\"listUnitPriceAmt\" "
						+ "value=\""
						+ project.listUnitPriceAmt
						+ "\" onblur=\"changeForfirstPayAmt_f();\" "
						+ "class=\"inpt required {minlength:0,maxlength:15,number:true,min:0,max:999999999999.99}\" style=\"width:126px;\" /> "
						+ (priceUnitType == null ? "元/吨" : priceUnitType)
						+ "<span class=\"red\"></span>" + "</td> </tr>";
					formHtml = formHtml
							+ "<th  width=\"12%\"><span style=\"color:red\">*</span>挂牌总价：</th>"
							+ " <td width=\"25%\">"
							+ "<input type=\"text\"  id=\"listTotalPriceAmt\" name=\"listTotalPriceAmt\" "
							+ "value=\""
							+ project.listTotalPriceAmt
							+ "\" onblur=\"changeForListUnitPrice();\" "
							+ "class=\"inpt required {minlength:0,maxlength:15,number:true,min:0,max:999999999999.99}\" style=\"width:126px;\" /> "
							+ "元" + " <span class=\"red\"></span>" + "</td>";
					formHtml = formHtml
					
							+ "<th  width=\"12%\"><span style=\"color:red\">*</span>付款金额：</th>"
							+ " <td width=\"25%\" >"
							+ "<input type=\"text\"  id=\"realTotalPriceAmt\" name=\"realTotalPriceAmt\" "
							+ "value=\""
							+ 
							(project.realTotalPriceAmt == null
									? ""
									: project.realTotalPriceAmt)
							+"\"  onblur=\"changeForfirstPay();\" "
							+ "class=\"inpt {minlength:0,maxlength:15,number:true,min:0,max:999999999999.99}\" style=\"width:126px;\" />"
							+ " 元 <span class=\"red\"></span>"
							+ "</td> </tr>";
				// 最小购买量 等于 挂牌量 .
				formHtml = formHtml
						+ "<tr><th  width=\"15%\"><span style=\"color:red\">*</span>最小购买量:</th>"
						+ "<td width=\"25%\">"
						+ "<input type=\"text\"  id=\"minWeight\" name=\"minWeight\" readOnly=\"false\" "
						+ "value=\""
						+ project.minWeight
						+ "\"   "
						+ "class=\"inpt required {minlength:0,maxlength:12,number:true,min:0,max:99999999.999}\" style=\"width:126px;\" /> "
						+ (weightUnitType == null ? "吨" : weightUnitType)
						+ " <span class=\"red\"></span>" + "</td>";

				formHtml = formHtml
						+ "<th  width=\"15%\">数量 ：</th>"
						+ " <td width=\"25%\" >"
						+ "<input type=\"text\"  id=\"listNum\" name=\"listNum\" "
						+ "value=\""
						+ (project.listNum == null ? "" : project.listNum)
						+ "\"  "
						+ "class=\"inpt {minlength:0,maxlength:12,number:true,min:1,max:99999999.999}\" style=\"width:126px;\" /><span class=\"red\"></span>"
						+ "</td> </tr>";

				formHtml = formHtml
						+ "<tr><th  width=\"15%\"><span style=\"color:red\">*</span>首付款金额:</th>"
						+ "<td width=\"25%\">"
						+ "<input type=\"text\"  id=\"firstPayAmt\" name=\"firstPayAmt\" "
						+ "value=\""
						+ project.firstPayAmt
						+ "\" onblur=\"formatfirstPayAmt();\" "
						+ "class=\"inpt required {minlength:0,maxlength:15,number:true,min:0,max:999999999999.99}\" style=\"width:126px;\" /> 元 <span class=\"red\"></span>"
						+ "</td>";
						
				var firstPayPaytypeSelect = "<select id='firstPayPaytype' name='firstPayPaytype'><option value='0'>线上支付</option><option value='1'>线下支付</option></select>";
				if (project.firstPayPaytype == "0") {
					firstPayPaytypeSelect = "<select id='firstPayPaytype' name='firstPayPaytype'><option value='0' selected>线上支付</option><option value='1'>线下支付</option></select>";
				} else {
					firstPayPaytypeSelect = "<select id='firstPayPaytype' name='firstPayPaytype'><option value='0' >线上支付</option><option value='1' selected>线下支付</option></select>";
				}
				formHtml = formHtml
						+ "<th  width=\"15%\"><span style=\"color:red\">*</span>首付款比例 ：</th>"
						+ " <td width=\"25%\">"
						+ "<input type=\"text\"  id=\"agentDepositeRate\" name=\"agentDepositeRate\" "
						+ "value=\""
						+ project.agentDepositeRate
						+ "\" onblur=\"changeForfirstPayAmt_ff();\" "
						+ "class=\"inpt required {minlength:0,maxlength:10,number:true,min:0.01,max:100.00}\" style=\"width:126px;\" /> %<span class=\"red\"></span>"
						+ firstPayPaytypeSelect +"</td> </tr>";

				formHtml = formHtml
						+ "<tr><th  width=\"15%\">已垫款金额 ：</th>"
						+ "<td width=\"25%\">"
						+ "<input type=\"text\"  id=\"agentPayedAmt\" name=\"agentPayedAmt\"  "
						+ "value=\""
						+ (project.agentPayedAmt == null
								? ""
								: project.agentPayedAmt)
						+ "\" onblur=\"formatAgentPayedAmt();\" "
						+ "class=\"inpt {minlength:0,maxlength:15,number:true,min:0,max:999999999999.99} \" style=\"width:126px;\" /> 元<span class=\"red\"></span>"
						+ "</td>";
						
					formHtml = formHtml
						+ "<th  width=\"12%\"><span style=\"color:red\">*</span>最长垫款期限：</th>"
						+ " <td width=\"30%\">"
						+ "<input type=\"text\"  id=\"agentContractDeadline\" name=\"agentContractDeadline\" "
						+ "value=\"" + project.agentContractDeadline + "\" "
						+ "class=\"inpt required {minlength:0,maxlength:10,digits:true,min:1,max:999}\"  style=\"width:126px;\" />天<span class=\"red\"></span></td> </tr>"; 
	    		   
	    		    
	    		    formHtml = formHtml
						+ "<tr><th  width=\"15%\"><span style=\"color:red\">*</span>跌价保证金比例:</th>"
						+ " <td width=\"25%\">"
						+ "<input type=\"text\"  id=\"pricefallDepositeRate\" name=\"pricefallDepositeRate\" onblur=\"formattePricefallDepositeRate();\" "
						+ "value=\"" + project.pricefallDepositeRate + "\"  "
						+ "class=\"inpt required {minlength:0,maxlength:10,number:true,min:0.01,max:999999999999.99} \" style=\"width:126px;\" /> %<span class=\"red\"></span>"
						+ "</td> "; 	
	    		    			  
				  formHtml = formHtml
						+ "<th width=\"12%\"><span style=\"color:red\">*</span>逾期违约金比例:</th>"
						+ " <td width=\"30%\">"
						+ "<input type=\"text\"  id=\"overduePayRate\" name=\"overduePayRate\" onblur=\"formatteOverduePayRate();\" "
						+ "value=\""+ project.overduePayRate +"\" "
						+ "class=\"inpt required {minlength:0,maxlength:10,number:true,min:0.01,max:999999999999.99}\" style=\"width:126px;\" /> <font style='font-family:Lucida Sans Unicode' size='2'>&#8241;</font><span class=\"red\"></span>"
						+ "</td>  </tr>"; 		
						
	    		    // 指定委托人			  
	    			formHtml = formHtml
						+ "<tr><th width=\"15%\"><span style=\"color:red\">*</span>指定委托人： </th><td width=\"25%\">"
						+ "<input name=\"directUserCompanyName\" readOnly=\"false\" class=\"inpt required \" type=\"text\" id=\"directUserCompanyName\" value=\""
						+ agentDirectUser.companyName + "\"  /> "
						+ "<a href=\"javascript:void(0);\" class=\"button-2\" id=\"selectBuyer\" onclick=\"selectBuyerClick();return false; \">选择</a>"
						+ "<span class=\"red\"></span></td>";
                   
                   	var ops ="<option value=\"\">--请选择--</option>";
	   				jQuery(WHCk).each(function(n){
	    				var tmpAddr = WHCk[n].address;    
	    				if(tmpAddr == null){
	    					tmpAddr="";
	    				}
	    				tmpAddr = tmpAddr.replace(/null/g,"");
	    				if( (project !=null && project.warehouseCmpId ==WHCk[n].id)){
	    					ops = ops +"<option selected value=\""+WHCk[n].id+"|"+tmpAddr+"\">"+WHCk[n].name+"</option>";
	    					$('input[name=warehouseCmpAddress]').val(tmpAddr);
	    					$('input[name=warehouseCmpId]').val(WHCk[n].id);
	    					$('input[name=warehouseCmpName]').val(WHCk[n].name);
	    					
	    				}else{
	    					ops = ops +"<option value=\""+WHCk[n].id+"|"+tmpAddr+"\">"+WHCk[n].name+"</option>";
	    				}
	    			})
	    			
                	formHtml = formHtml+"<th width=\"15%\">交收仓库：</th>" +
                 	   		"<td width=\"25%\" id = \"warehouseCmpTd\"><select id = \"warehouseCmp\" name = \"warehouseCmp\" onchange=\"setWHCvalue();\"   style=\"width:150px;\"  class=\" required  \">" +
	    			ops+"</select><span class=\"red\"></span></td></tr>" ;
		    			
	    	    var referencePrice = "";//参考市场行情
				if (project.referencePrice != null) {
					referencePrice = project.referencePrice;
				}
	    			
	    		formHtml = formHtml
						+ "<tr><th  width=\"15%\"><span style=\"color:red\">*</span>参考市场行情:</th>"
						+ " <td width='80%' colspan='3'>"
					+ "<textarea name=\"referencePrice\"  class='required' id=\"referencePrice\" cols=\"45\" rows=\"2\" maxlength=\"30\" >" + referencePrice + "</textarea><span class=\"red\"></span>"
					+ "</td> </tr>";
	    			formHtml = formHtml +"</table></fieldset>";
		    		htmlCode = htmlCode + formHtml;
		    		
		    		formHtml = "<fieldset><legend>代理费率属性</legend><table class='c3'><tr><th width=\"100\" style='vertical-align:middle;'><span class='red'>*</span>  一般代理费：</th><td colspan='3'>";
		    		if(rateItemList.length > 0) {
		    			var isOnlyExistRateTypeis01  = true;
		    			for(var i = 0; i < rateItemList.length; i++) {
		    				if(rateItemList[i].rateType == "01") {//一般代理费率
		    					if(i < rateItemList.length - 1 && rateItemList[i+1].rateType != "02" ) {
		    						isOnlyExistRateTypeis01 = false;
		    						if(i == 0){
		    							formHtml += "<p style='margin-top:5px;'>天数：<input type='text' class='inpt' name='repayCompleteDay' id='" + i + "' onblur='checkTheSameDay(this)'  value='"+rateItemList[i].repayCompleteDay+"' />&nbsp;&nbsp;" +
			    						"<input type='hidden' name='rateItemId' value='"+rateItemList[i].id+"' /><input type='hidden' name='rateType' value='01' />" +
		    							"费率：<input type='text' class='inpt' name='feeRate' value='"+rateItemList[i].feeRate+"' />%&nbsp;&nbsp;" +
			    						"<a href='javascript:void(0);' class='button-2' onclick='addNewRateItem(this)' name='addItem' style='display:none;'>增加明细</a></p>"
		    						}else{
		    							formHtml += "<p style='margin-top:5px;'>天数：<input type='text' class='inpt' name='repayCompleteDay' id='" + i + "' onblur='checkTheSameDay(this)'  value='"+rateItemList[i].repayCompleteDay+"' />&nbsp;&nbsp;" +
			    						"<input type='hidden' name='rateItemId' value='"+rateItemList[i].id+"' /><input type='hidden' name='rateType' value='01' />" +
		    							"费率：<input type='text' class='inpt' name='feeRate' value='"+rateItemList[i].feeRate+"' />%&nbsp;&nbsp;" +
			    						"<a href='javascript:void(0);' class='button-2' onclick='deleteItem(this)' >删除本行</a>" +
			    						"<a href='javascript:void(0);' class='button-2' onclick='addNewRateItem(this)' name='addItem' style='display:none;'>增加明细</a></p>"
		    						}
		    					}  else {//一般代理 费率的最后一个 
		    						//如果一进来就是最后一个，此时不显示删除按钮
		    						if(isOnlyExistRateTypeis01){
		    							formHtml += "<p id='rateItem' style='margin-top:5px;'>天数：<input type='text' class='inpt' id='" + i + "' onblur='checkTheSameDay(this)' name='repayCompleteDay' value='"+rateItemList[i].repayCompleteDay+"' />&nbsp;&nbsp;" +
		    							"<input type='hidden' name='rateItemId' value='"+rateItemList[i].id+"' /><input type='hidden' name='rateType' value='01' />" +
		    							"费率：<input type='text' class='inpt' name='feeRate' value='"+rateItemList[i].feeRate+"' />%&nbsp;&nbsp;" +
			    						"<a href='javascript:void(0);' class='button-2' onclick='addNewRateItem(this)' name='addItem' style='margin-left:10px;'>增加明细</a></p></td></tr>"
		    						}else{
		    							formHtml += "<p id='rateItem' style='margin-top:5px;'>天数：<input type='text' class='inpt' id='" + i + "' onblur='checkTheSameDay(this)' name='repayCompleteDay' value='"+rateItemList[i].repayCompleteDay+"' />&nbsp;&nbsp;" +
		    							"<input type='hidden' name='rateItemId' value='"+rateItemList[i].id+"' /><input type='hidden' name='rateType' value='01' />" +
		    							"费率：<input type='text' class='inpt' name='feeRate' value='"+rateItemList[i].feeRate+"' />%&nbsp;&nbsp;" +
			    						"<a href='javascript:void(0);' class='button-2' onclick='deleteItem(this)' >删除本行</a>" +
			    						"<a href='javascript:void(0);' class='button-2' onclick='addNewRateItem(this)' name='addItem' style='margin-left:10px;'>增加明细</a></p></td></tr>"
		    						}
		    					}
		    					if(i == rateItemList.length - 1) {
		    						formHtml += "<tr><th width=\"100\"><span class='red'>*</span> 调增代理费：<input type='hidden' name='rateType' value='02' /></th>" +
		    								"<td colspan='3'><input type='hidden' name='rateType' value='02' />" +
		    								"费率：<input type='text' class='inpt'  name='feeRate' />%</td></tr>"; 
		    					}
		    				} else if(rateItemList[i].rateType == "02") {
		    					if(i == 0) {
		    						formHtml += "<p id='rateItem'><input type='hidden' name='rateType' value='01' />天数：<input type='text' id='" + i + "' class='inpt' onblur='checkTheSameDay(this)' name='repayCompleteDay' />&nbsp;&nbsp;费率：<input type='text' class='inpt'  name='feeRate' />%&nbsp;&nbsp;" +
		    		    			"<a href='javascript:void(0);' class='button-2' onclick='addNewRateItem(this)' name='addItem'>增加明细</a></p></td></tr>"
		    					}
		    					formHtml += "<tr><th width=\"100\"><span class='red'>*</span> 调增代理费：</th><td colspan='3'>" +
		    					"<input type='hidden' name='rateItemId' value='"+rateItemList[i].id+"' /><input type='hidden' name='rateType' value='02' />"  +
		    					"费率：<input type='text' class='inpt'  name='feeRate' value='"+rateItemList[rateItemList.length-1].feeRate+"' />%</td></tr>"
		    				}
		    			}
		    		} else {
		    			formHtml += "<p id='rateItem'>天数：<input type='text' class='inpt' onblur='checkTheSameDay(this)' name='repayCompleteDay' />&nbsp;&nbsp;费率：<input type='text' class='inpt'  name='feeRate' />%&nbsp;&nbsp;" +
		    			"<a href='javascript:void(0);' class='button-2'  name='addItem'>增加明细</a></p></td></tr>" +
		    			"<tr><th width=\"100\"><span class='red'>*</span> 调增代理费：<input type='hidden' name='rateType' value='02' /></th><td colspan='3'>费率：<input type='text' class='inpt'  name='feeRate' />%</td></tr>"; 
		    		}
					formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;
	    			
		    	var remark = "";// 备注
				if (project.remark != null) {
					remark = project.remark;
				}
		    		formHtml = '<fieldset><legend>其他属性</legend><table class="c3">'+
	    			"<tr><th width=\"125px\">备注信息：</th>" +
	    			"<td><textarea name=\"remark\" id=\"remark\" cols=\"80\" rows=\"4\"  maxlength=\"340\"  title=\"请不要超过340的长度\">"+remark+"</textarea><span class=\"red\"></span></td></tr>"; 
	    			formHtml = formHtml +"</table></fieldset>";
	    			
	    			htmlCode = htmlCode + formHtml;
	    			
	    			$('#listingTable').html(htmlCode);
	    			
	    			document.getElementById("varietyName_text").innerHTML=$("input[name=varietyName]").val();
	    			
	    			document.getElementById("varietyCode").style.display="none";
	    	
	    			if(fn){
	    				fn.call();
	    			}
	    			
	    			chanageSubmit();
	    			
	    			if($("#manufacuturer")){//选择生产商
	    				var readAttr = $("#manufacuturer").attr("readOnly");
	    				if(readAttr && (readAttr=="readOnly" || readAttr=="readonly" || readAttr=="true")){}
	    				else
	    				{$("#manufacuturer").after(" <a href='#0' class='producer' id='btn_open' onclick='selectCoop();'>选择</a>&nbsp;&nbsp;<a href='#0' class='producer' id='btn_open' onclick='saveProducers();'>保存</a>");}
	    			}
	    		}    	
	        );
	 			
}

function creatForm(attr,i,length,project){
	var inputType = attr.keyType;//类型
	var isRequired = attr.isRequired;//是否必选
	var groupType = attr.groupType;//属性组类型；F=常规；D=动态
	var valueValidate = attr.valueValidate ==null?"":attr.valueValidate;//验证表达式
	var clas = isRequired == "1" ? "required":"";//验证样式
	clas = clas+"  "+valueValidate;
	var value="",readOnly="",unitType="";
	
	if(i%2==0){
		appendHtml = '<tr>';
	}
	//如果是常规属性,value为挂牌主表的对应字段值
	if(groupType=="D"){
		value = attr.value ;
	}else{
		value = project[attr.keyCode] ;
	}
	
	//判断是否必填
	if(isRequired == "1"){
		appendHtml = appendHtml + " <th width=\"15%\">"+"\<span style=\"color:red\">*</span>" + attr.keyTitle + "：</th>";
	}else{
		appendHtml = appendHtml + " <th width=\"15%\">" + attr.keyTitle + "：</th>";
	}
	//如果是新建表单，value为空；如果是修改判断是否常规属性，常规属性的value为挂牌主表的对应字段值
	if(attr.keyCode=="listUnitPrice"){
		attr.keyCode = "listUnitPrice_num";
	}
	
	if(groupType=="D"){
		value = attr.value ;
	}else{
		value = project[attr.keyCode] ;
	}
	if(value ==null || typeof value == "undefined"){
		value="";
	}
	if(attr.unitType ==null || typeof attr.unitType == "undefined"){
		unitType="";
	}else{
		unitType=attr.unitType;
	}
	//新增时品种属性设置默认值,仓单挂牌常规属性的value为挂牌主表的对应字段值
	if(groupType=="F"){
		if(project && project.listingType =="C"){
			value = project[attr.keyCode]== null ? "":project[attr.keyCode];
			if(attr.keyCode!="minWeight" && attr.keyCode!="settlementDate" && attr.keyCode!="billRemark" && attr.keyCode!="listUnitPrice_num" ){
				readOnly = "readOnly";
			}
		}else{
			if(attr.keyCode =="varietyCode"){
				readOnly = "readOnly";
			}
		}
	}
	
	appendHtml = appendHtml + "<td width=\"25%\">";
	//输入框为文本框
	if(inputType == "TEXT"){
		var onblurFunc="";
		if(attr.keyCode=="listWeight" || attr.keyCode=="minWeight"){
			onblurFunc = 'onblur="checkWeight();"';
			//if(project.listingType =="W" && attr.keyCode=="listWeight"){readOnly = "readOnly";}
		}

		if(attr.keyCode=="varietyCode"){// varietyCode 显示名称
			appendHtml = appendHtml + "<span id=\"varietyName_text\"></span> "+unitType+" <span class=\"red\"></span>";
		}else{
			appendHtml = appendHtml + "<input type=\"text\"  id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\" value=\""+value+"\"   "+ readOnly+" "+ onblurFunc+" class=\"inpt  "+clas+"\" style=\"width:126px;\" />"+unitType+" <span class=\"red\"></span>";
		}
		
	}else if(inputType == "TEXTAREA"){//输入框为文本域 
		appendHtml = appendHtml + "<textarea rows=\"2\" cols=\"60\"  id=\""+attr.keyCode+"\" name=\""+attr.keyCode+ "\" class=\"inpt "+clas+"\" >"+value+"</textarea><span class=\"red\"></span>";
	}else if(inputType == "DATETIME"){
		//格式日期
		if((value+"").indexOf("-")>=0){
	    	
	    }else{
	    	value = Hundsun.formatDate(value,"yyyy-MM-dd HH:mm:ss")
	    }
		//格式日期
		appendHtml = appendHtml + "<input type=\"text\" maxlength=\"100\" id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\" readOnly onClick=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})\" value=\""+value+"\"  "+ readOnly+" class=\"inpt "+clas+"\" style=\"width:126px;\"/> <span class=\"red\"></span>";
	//选择框	
	}else if(inputType == "DATE"){
		if((value+"").indexOf("-")>=0){
	    	
	    }else{
	    	value = Hundsun.formatDate(value,"yyyy-MM-dd")
	    }
		//格式日期
		if(project && project.listingType =="C" && attr.keyCode=="productionDate"){
			appendHtml = appendHtml + "<input type=\"text\" maxlength=\"100\" id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\"   readOnly  value=\""+value+"\" class=\"inpt "+clas+"\" style=\"width:126px;\" /><span class=\"red\"></span>";
		}else{
			appendHtml = appendHtml + "<input type=\"text\" maxlength=\"100\" id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\"  readOnly  onClick=\"WdatePicker()\"  value=\""+value+"\" class=\"inpt "+clas+"\" style=\"width:126px;\" /><span class=\"red\"></span>";
		}
		//选择框	
	}else if(inputType == "CHECKBOX" || inputType == "SELECT" || inputType == "RADIO"){
		var attr_values = attr.text == null? "": attr.text.split("\n");
		if(inputType == "CHECKBOX"){
			var clickFunc ="";
			if(attr.keyCode=="deliveryType"){
				clickFunc = 'onclick="setWHValue();"';
			}
			
			jQuery(attr_values).each(function(j){
				var arrval = attr_values[j]== null? "": attr_values[j].split("|");
				//修改时设置CHECKBOX默认选择项
				if(value && (value+",").indexOf(arrval[0]+",")>=0){  //   value==arrval[0]
					appendHtml = appendHtml + "<input type=\"checkbox\" name=\""+attr.keyCode+"\" value=\""+arrval[0]+"\" "+clickFunc+"checked class=\"inp \" /> <font>" + arrval[1]+"</font>";
				}else{
					appendHtml = appendHtml + "<input type=\"checkbox\" name=\""+attr.keyCode+"\" value=\""+arrval[0]+"\" "+clickFunc+"class=\"inp \" /> <font>" + arrval[1]+"</font>";
				}
			});
			if (isRequired == "1") {
				appendHtml += '<font class="error" required generate"true" style="display:none" for="'+attr.keyCode+'" forTitle="'+attr.keyTitle+'">至少选择一个选项</font>';
			}
		}else if(inputType == "SELECT"){
			var clickFunc ="";
			if(attr.keyCode=="deliveryType"){
				clickFunc = 'onchange="setWHValue();"';
			}
			//下拉框
			appendHtml = appendHtml + "<select id=\""+attr.keyCode+"\"  name=\""+attr.keyCode+"\" class=\"select "+clas+"\" "+clickFunc+" style=\"width:130px;\">";
			jQuery(attr_values).each(function(j){
				var arrval = attr_values[j]== null? "": attr_values[j].split("|");
				//修改时设置SELECT默认选择项
				if(value ==arrval[0]){
					appendHtml = appendHtml + "<option value=\""+arrval[0]+"\" selected>"+arrval[1]+"</option>";
				}else{
					appendHtml = appendHtml + "<option value=\""+arrval[0]+"\">"+arrval[1]+"</option>";
				}
				
			});
			appendHtml = appendHtml + "</select><span id=\""+attr.keyCode+"_select\"></span><span class=\"red\"></span>";
		}else if(inputType == "RADIO"){
				//单选按钮
				jQuery(attr_values).each(function(j){
				var arrval = attr_values[j]== null? "": attr_values[j].split("|");
				var clickFunc ="";
				if(attr.keyCode=="deliveryType"){
					clickFunc = 'onclick="setWHValue();"';
				}
				//修改时设置RADIO默认选择项
				if(value ==arrval[0]){
					appendHtml = appendHtml + "<input type=\"radio\" id=\""+attr.keyCode+j+"\" name=\""+attr.keyCode+"\" value=\""+arrval[0]+"\"  "+clickFunc+"  checked class=\"inp\" /> " + arrval[1];
				}else{
					appendHtml = appendHtml + "<input type=\"radio\" id=\""+attr.keyCode+j+"\" name=\""+attr.keyCode+"\" value=\""+arrval[0]+"\"   "+clickFunc+" class=\"inp\" /> " + arrval[1];
				}
				if (isRequired == "1") {
					appendHtml += '<font class="error" required generate"true" style="display:none" for="'+attr.keyCode+'" forTitle="'+attr.keyTitle+'">至少选择一个选项</font>';
				}
		   });
		}
		//文件类型	
	}else if(inputType == "FILE"){
		appendHtml = appendHtml + "<input type=\"file\" maxlength=\"255\" name=\""+attr.keyCode+"_file\"  value=\""+value+"\" class=\"inpt "+clas+"\" style=\"width:126px;\" /><span style=\"margin-left:70px;\"  class=\"red\"></span>";
	}
	appendHtml = appendHtml + "</td>";
	if(i%2==1 || i == length-1){
		appendHtml = appendHtml + "</tr>";
		formHtml = formHtml+appendHtml;
	}
}



//选择节点后的回调函数
/*function chooseVType(data){
	var varietyCode = $("input[name=varietyCode]").val();
	
	$("input[name=varietyCode]").val(data.code);
	$("input[name=varietyName]").val(data.name);
	if(varietyCode !=data.code){
		 jQuery.get(       
				 appServer + '/listingRemoting/load_variety_'+data.code+'.htm',
		    		function(data){
					    var WP = data.F_WP;
		    			if(WP==""){
		    				 Hundsun.PopUtil.alert({
									msg:"该品种未配置属性，不能挂牌！",
									width:450,
									timeout:800,
									type:'warn'
								})
							document.getElementById("form_edit_submit").style.display="none";	
		    				 return;
		    			}else{
		    				createTableByVariety(null,data.code,data.name,null,null,null);
		    				document.getElementById("form_edit_submit").style.display="";	
		    			}
				    }
			)
	}
	
}*/

//获取选择的交收方式的值
function getDeliveryTypeCKValue(){
	var arr_v = new Array(); 

	$('input[name=deliveryType]:checked').each(function(){ 
	     arr_v.push($(this).val()); 
	}); 
	return  arr_v.join(','); 
}

//修改实际总价时
function changeForfirstPay() {
	var agentDepositeRate = $('input[name=agentDepositeRate]').val();
	// var listTotalPriceAmt = $('input[name=listTotalPriceAmt]').val();
	var listRealPriceAmt_f = $('input[name=realTotalPriceAmt]').val();
	if (listRealPriceAmt_f == "" || isNaN(listRealPriceAmt_f)) {
		return;
	}
	// 将首付款比例 保留2位小数
	if (!isNaN(agentDepositeRate) && agentDepositeRate != "") {
		agentDepositeRate = parseFloat(agentDepositeRate).toFixed(2);
		$('input[name=agentDepositeRate]').val(agentDepositeRate);
	}
	if (!isNaN(agentDepositeRate) && !isNaN(listRealPriceAmt_f)) {
		if (listRealPriceAmt_f.length >= 15) {
			return;
		}
		var agentDepositeRate_ = parseFloat(Number(accDiv(agentDepositeRate ,100))).toFixed(4);
		if (Number(listRealPriceAmt_f) <= 0) {
			var firstPayAmt_f = parseFloat(accMul(
					agentDepositeRate_ ,listTotalPriceAmt)).toFixed(2);
			$('input[name=firstPayAmt]').val(firstPayAmt_f);
			return;
		}
		listRealPriceAmt_f = parseFloat(listRealPriceAmt_f).toFixed(2);
		$('input[name=realTotalPriceAmt]').val(listRealPriceAmt_f);
		var firstPayAmt_f = parseFloat(accMul(agentDepositeRate_ ,listRealPriceAmt_f))
				.toFixed(2);
		$('input[name=firstPayAmt]').val(firstPayAmt_f);
		$('input[name=agentPayedAmt]').val("");
	}
}


/**
 * 获取交收截止日期，当前日期从后台获取
 * @returns
 */
function getSettleDate(){
	var str = $("#serverCurrTime").val();
	if(str!=null){
		try{
			var settleDateStr = str.substring(0,10);
			settleDateStr = settleDateStr.replace(/-/g,"/");
			var settleDate = new Date(Date.parse(settleDateStr));
			return  settleDate;
		}catch(e){
			return new Date();
		}
	}else{
		return new Date();
	}
}

var num = 0.6;
function addNewRateItem(a) {
	/*$("#rateItem").append("<p style='margin-top:5px;'><input type='hidden' name='rateType' value='01' />天数：<input type='text' id='" + (num++) + "' class='inpt' onblur='checkTheSameDay(this)'  name='repayCompleteDay' />&nbsp;&nbsp;费率：<input type='text' class='inpt'  name='feeRate' />%&nbsp;&nbsp;" +
	    			"<input type='hidden' name='rateItemId' value='' /><a href='javascript:void(0);' class='button-2' onclick='deleteItem(this)' >删除本行</a>" +
	    			"<a href='javascript:void(0);' class='button-2' onclick='addNewRateItem(this)' style='margin-left:10px;' name='addItem'>增加明细</a></p>")*/
	
	$(a).parent().parent().append("<p style='margin-top:5px;'><input type='hidden' name='rateType' value='01' />天数：<input type='text' id='" + (num++) + "' class='inpt' onblur='checkTheSameDay(this)'  name='repayCompleteDay' />&nbsp;&nbsp;费率：<input type='text' class='inpt'  name='feeRate' />%&nbsp;&nbsp;" +
	    			"<input type='hidden' name='rateItemId' value='' /><a href='javascript:void(0);' class='button-2' onclick='deleteItem(this)' >删除本行</a>" +
	    			"<a href='javascript:void(0);' class='button-2' onclick='addNewRateItem(this)' style='margin-left:10px;' name='addItem'>增加明细</a></p>")
	$(a).hide();
}

function deleteItem(a) {
	
	var arr = $(a).parent().parent().find("a[name='addItem']");
	var obj = arr[arr.length-2];
	Hundsun.PopUtil.confirm({
		msg:"是否要删除本行？"},
		function() {
			if($(a).parent().next().html() == null) {
				$(obj).show();
			}
			$(a).parent().remove();
		});
}

function changeForfirstPayAmt_ff() {
	var agentDepositeRate = $('input[name=agentDepositeRate]').val();
	var realTotalPriceAmt = $('input[name=realTotalPriceAmt]').val();

	// 将首付款比例 保留2位小数
	if (!isNaN(agentDepositeRate) && agentDepositeRate != "") {
		agentDepositeRate = parseFloat(agentDepositeRate).toFixed(2);
		$('input[name=agentDepositeRate]').val(agentDepositeRate);
	}

	if (!isNaN(agentDepositeRate) && agentDepositeRate != ""
			&& !isNaN(realTotalPriceAmt) && realTotalPriceAmt != "") {

		var agentDepositeRate_ = parseFloat(Number(accDiv(agentDepositeRate ,100)))
				.toFixed(4);
		var firstPayAmt_f = parseFloat(accMul(agentDepositeRate_ , realTotalPriceAmt))
				.toFixed(2);
		$('input[name=firstPayAmt]').val(firstPayAmt_f);
		$('input[name=agentPayedAmt]').val("");

	}
}
