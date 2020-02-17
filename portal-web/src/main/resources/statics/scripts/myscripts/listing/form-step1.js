jQuery(function(){
//	var isCreditTrade = $("input[name=isCreditTrade]").val();
//	if(isCreditTrade=="1"){
//		document.getElementById("listingTypeC").style.display="";
//	}else{
//		document.getElementById("listingTypeC").style.display="none";
//	}
})

function isEmpty(v){
	if(undefined==v || "undefined"==v){return true;}
	if(/^\s*$/g.test(v)){
		return true;
	}else{
		return false;
	}
}
//仓单挂牌时显示仓单选择信息
function showDivInfo(receipt,bond){
	$("#erpInfo").hide();
	$("#erpInfo").next().show();
	if(receipt =='true'){
		document.getElementById("receiptInfo").style.display="";
		document.getElementById("varietyButton").style.display="none";
	}else{
		document.getElementById("receiptInfo").style.display="none";
		document.getElementById("varietyButton").style.display="";
		$('#receiptId').val("");
	}
	
	if(bond =='true'){
		document.getElementById("bondInfo").style.display="";
	}else{
		document.getElementById("bondInfo").style.display="none";
	}
} 

/**
 * 非库存现有量挂牌，显示相应的选择
 */
function showErpInfo(){
	$("#receiptInfo").hide();
	$("#varietyButton").hide();
	$("#bondInfo").hide();
	$("#erpInfo").show();
	$("#erpInfo").next().hide();
}

/**
 * 根据输入的erp关键字，搜索对应的erp信息
 */
function searchErp(){
	var erpNoSearch = $("#erpNoSearch").val(); //用于查询的erpno
	if(isEmpty(erpNoSearch) || erpNoSearch.length<4){
		Hundsun.PopUtil.alert({msg:"请填写要查询的ERP物料编码(4位长度以上)！",width:450,timeout:800,type:'warn'});
		return;
	}
	var tip = Hundsun.PopUtil.loading();
	jQuery.post (
		appServer + "/erp/erpList.htm",
		{"erpNo":erpNoSearch,"erpSystem":$("#erpSystem").val()},
        function(v){
    		if(v.result == 'success'){
    			if(isEmpty(v.erpMsg) ){
    				Hundsun.PopUtil.alert({msg:"根据您输入的ERP物料编码，没有查找到ERP物料信息！",width:450,timeout:800,type:'warn'});
    				tip.hide();
    				return;
    			}
    			$("#erpSel").html("");
    			var erpArray = v.erpMsg.split("\n");
    			for(var i=0; i<erpArray.length; i++){
    				if(!isEmpty(erpArray[i])){
    					var o = erpArray[i].split(":");
        				$("#erpSel").append("<option value='"+o[0]+"'>"+o[1]+"</option>");
    				}
    			}
			 }else{
				 Hundsun.PopUtil.alert({msg:v.msg,width:450,timeout:800,type:'warn'})
			 }
    		tip.hide();
		},
		'json'
    );
}

/**
 * 
 * @param data
 */

//选择节点后的回调函数
function chooseVType(data){
	if(""==data || null==data || undefined === data){
		return
	}
	$("input[name=varietyTypeId]").val(data.id);
	$("input[name=varietyTypeCode]").val(data.code);
	$("input[name=varietyShortName]").val(data.name);
	$("input[name=varietyFullName]").val(data.name);
}

/**
 * 下一步操作
 */
function nextStep(){
	 var varietyTypeCode = $("input[name=varietyTypeCode]").val();
	 var listingType= $('input[name=listingType]:checked').val();
	 var receiptId= $('input[name=receiptId]').val();
	 var listWeight= $('input[name=listWeight]').val();
	 var listNum= $('input[name=listNum]').val();
	 var erpId = $("#erpSel").val();
	 
	 if(isEmpty(listingType)){
			alert("请选择挂牌类型!");
			return;
	 }else if(varietyTypeCode =="" && listingType!="F"){
			alert("请选择挂牌品种!");
			return;
	 } else if(listingType =="C"){
		 if(receiptId =="" || receiptId ==null){
			 alert("请选择的挂牌类型为仓单挂牌，请选择仓单!");
			 return; 
		 }else{
			 $("#toStep2").attr("action",appServer +"/listing/create_step2_"+varietyTypeCode+"_"+listingType+"_"+receiptId+"_"+listWeight+"_"+listNum+"_"+erpId+".htm");
			 $("#toStep2").submit();
		 }
	 }else if(listingType=="F"){  //非库存现有量挂牌
		 if(isEmpty(erpId)){
			 alert("请选择ERP物料编码!");
			 return;
		 }
		 if(erpId.length!=1){
			 alert("ERP物料编码只能选择一个!");
			 return;
		 }
		 $("#toStep2").attr("action",appServer +"/listing/create_step2_"+varietyTypeCode+"_"+listingType+"_"+receiptId+"_"+listWeight+"_"+listNum+"_"+erpId+".htm");
		 $("#toStep2").submit();
	 }else{
		 $("#toStep2").attr("action",appServer +"/listing/create_step2_"+varietyTypeCode+"_"+listingType+"_"+receiptId+"_"+listWeight+"_"+listNum+"_"+erpId+".htm");
		 $("#toStep2").submit();
	 }
}

//选择仓单后
function choiceBack(id,no,varietyCode,varietyName,material,listWeight,listNum,batchNo){
	$("input[name=receiptId]").val(id);
	$("input[name=varietyTypeCode]").val(varietyCode);
	$("input[name=varietyShortName]").val(varietyName);
	$("input[name=listWeight]").val(listWeight);
	$("input[name=listNum]").val(listNum);  
	$("input[name=batchNo]").val(batchNo);
	var  datahtml= '<tr>';
	datahtml += '<td align="center">'+no+'</td>';
	datahtml += '<td align="center">'+varietyName+'</td>';
	datahtml += '<td align="center">'+material +'</td>';
	datahtml += '<td align="center">'+batchNo +'</td>';
	datahtml += '<td align="center">'+listWeight +'</td>';
	datahtml += '<td align="center">'+listNum+'</td>'; 
	datahtml += '</tr>';
	$('#receiptData').html(datahtml);
}

//防止点击浏览器后退按钮后出现的错误
$(function(){
		$("#default").click();
		jQuery("#varietyTypeCode").attr("value","");
		jQuery("#varietyShortName").attr("value","");
		jQuery("#receiptId").attr("value","");
		jQuery("#listWeight").attr("value","");
		jQuery("#listNum").attr("value","");
})