$(document).ready(function() {		  

		  var listUnitPrice = $('input[name=listUnitPrice_num]').val();
		  var listWeight = $('input[name=listWeight]').val();
		  var minWeight = $('input[name=minWeight]').val();
		  var listNum = $('input[name=listNum]').val();
		  var listingDatesStr = $('input[name=listingDatesStr]').val();
		  var listingDateeStr = $('input[name=listingDateeStr]').val();
		  var settlementDate = $('input[name=settlementDate]').val();

	 $('#formEasy').validateForm( {
		errorPlacement : function(error, element) {
			element.siblings("span[class='red']").text(error.text());
		},
		success : function(label) {
			label.text("");
		},

		rules : {
			'listUnitPrice_num':{'number':true,'max':9999999999,'min':0.01,decimalPlaces:2},
        	'listNum':{'max':9999999999,'min':1,'maxlength':9},
        	'listWeight':{'number':true,'max':99999999999,'min':0.001,decimalPlaces:3},
        	'minWeight':{'number':true,'max':99999999999,'min':0.001,decimalPlaces:3},
        	'batchNo':{'maxlength':40}
		},
		messages: {
			'listUnitPrice_num':{decimalPlaces:"请输入两位小数"},
			'listWeight':{decimalPlaces:"请输入三位小数"},
			'minWeight':{decimalPlaces:"请输入三位小数"}
		},
		 submitHandler:function(f) {
        	if(validateForm()){
        		f.submit();
        	}
        }
	});

//校验数据
function validateForm(){
	  var listUnitPrice = $('input[name=listUnitPrice_num]').val();
	  var listWeight = $('input[name=listWeight]').val();
	  var minWeight = $('input[name=minWeight]').val();
	  var listNum = $('input[name=listNum]').val();
	  var listingDatesStr = $('input[name=listingDatesStr]').val();
	  var listingDateeStr = $('input[name=listingDateeStr]').val();
	  var settlementDate = $('input[name=settlementDate]').val();
	  
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
		  if((/^(\+|-)?\d+$/.test(listNum)) && listNum>0){
			  if(listNum!="" && Number(listNum)<0){
				  alert("数量不能小于0！");
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
	  if(listingDatesStr!=""){
		  if(listingDatesStr< Hundsun.formatDate(new Date(),"yyyy-MM-dd")){
			  alert("挂牌开始时间不能小于当前时间！");
			  $('input[name=listingDatesStr]').focus();
			  return;
		  }
		  
		  if(listingDateeStr<listingDatesStr){
			  alert("挂牌结束时间必须大于等于开始时间！");
			  $('input[name=listingDateeStr]').focus();
			  return;
		  }
		  
		  if(settlementDate<=listingDateeStr){
			  alert("交收日期必须大于挂牌结束日期！");
			  $('input[name=settlementDate]').focus();
			  return;
		  }
	  }else{
			  alert("挂牌开始日期不能为空！");
			  $('input[name=listingDatesStr]').focus();
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

});

//检查挂牌重量与最小购买量是否相等，相等时只能整件下单且不能修改
function checkWeight(){
	 var listWeight = $('input[name=listWeight]').val();
	 var minWeight = $('input[name=minWeight]').val();
	  
		if(Number(minWeight)>Number(listWeight)){
			  alert("最小购买量不能大于挂牌量！");
			  $('input[name=minWeight]').focus();
			  return;
		  }
}

function setListWeight() {
	var listWeight = $("#listWeightS").val();
	var minWeight = $("#minWeight").val();
	if(minWeight == null || $.trim(minWeight) == "") {
		minWeight = "a";
	}
	var listNum = $("#listNum").val();
	var newListWeight = accMul(minWeight,listNum);
	if($("#listingType").val() == "W" && newListWeight > listWeight) {
		alert("您输入的件数过大，导致总重量已超出库存重量！");
		return false;
	}
	if(!isNaN(newListWeight)) {
		$("#listWeight").val(newListWeight);
	}
}

function accMul(arg1,arg2) 
{ 
	var m=0,s1=arg1.toString(),s2=arg2.toString(); 
	try{m+=s1.split(".")[1].length}catch(e){} 
	try{m+=s2.split(".")[1].length}catch(e){} 
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
} 