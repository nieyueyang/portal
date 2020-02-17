var id ;
var type; //type=1(更新垫款日期) 0:更新合同名称和编号 
var firstPayAmt;
var agentPayedAmt;
$(function(){
	$("#updateAgentDate").hide();
	$("#updateGoodSettlePrice").hide();
	$("#updateGoodSettlePriceDiv").hide();
	$("#updateContractDiv").hide();
	$("#agentDate_tip").hide();
	$("#goodSettleUnitPrice_tip").hide();
	$("#updateContract_tip").hide();
	id = $("#contractId").val();
	type="0";
	
	firstPayAmt = $("#firstPayAmt").val();
	agentPayedAmt = $("#agentPayedAmt").val();
	
	//getPriceAndWeight();
});
//首付款发生变化时，修改合同总额
function changeContactPrice(){
	firstPayAmt = $("#firstPayAmt").val();
	if(firstPayAmt=='' || isNaN(firstPayAmt)){
		$('input[name=firstPayAmt]').focus();
		$('input[name=firstPayAmt]').val('');
		return;
	}
	if(Number(agentPayedAmt) == 0){
		return;
	}
	firstPayAmt = parseFloat(firstPayAmt).toFixed(2);
	$("#firstPayAmt").val(firstPayAmt);
	var totalPrice = parseFloat(accAdd(Number(firstPayAmt),Number(agentPayedAmt))).toFixed(2);
	$("#totalPrice").val(totalPrice);
}
//货品价格或数量变化时，修改合同挂牌总价
function changeContractListPrice(){
	var listTotalPrice = cacluateListPrice();
	if(listTotalPrice > 0){
	$("#listTotalPrice").val(listTotalPrice);
	}
}

function changeFirstPayAmt(){
	var totalPrice = $("#totalPrice").val();
	if(totalPrice=='' || isNaN(totalPrice)){
		$('input[name=totalPrice]').val('');
		$('input[name=totalPrice]').focus();
		return;
	}
	if(Number(totalPrice) == 0){
		return;
	}
	totalPrice = parseFloat(totalPrice).toFixed(2);
	$("#totalPrice").val(totalPrice)
	var firstPayAmt = parseFloat(accSubtr(Number(totalPrice),Number(agentPayedAmt))).toFixed(2);
	if(firstPayAmt <= 0){
		alert("合同金额必须大于已垫款额");
		$('input[name=totalPrice]').val('');
		$('input[name=totalPrice]').focus();
		return;
	}
	$("#firstPayAmt").val(firstPayAmt);
}

function cacluateListPrice(){
	var inputList = $("tr[id='goodsList']");
	var listPrice = 0;
	$(inputList).each(
	function(i, a){
		var unitPrice = $(a).find("input[id='unitPrice']").val();
		var weight = $(a).find("input[id='weight']").val();
		if(unitPrice > 0 && weight > 0){
			listPrice = accAdd(listPrice,accMul(unitPrice ,weight));
			
		}else{
			alert("单价或重量必须为正数");
			return 0;
		}
	});
	return parseFloat(listPrice).toFixed(2);
}

//获取所有的合同货品的价格和重量
function getPriceAndWeight(){
	var inputList = $("tr[id='goodsList']");
	var goodsList = [];
	
	$(inputList).each(
	function(i, a){
		var goods = {};
		goods.goodId = $(a).find("input[id='id']").val();
		goods.unitPrice = parseFloat($(a).find("input[id='unitPrice']").val()).toFixed(2);
		goods.weight = parseFloat($(a).find("input[id='weight']").val()).toFixed(3);
		if(goods.unitPrice == "" || goods.unitPrice <=0 || goods.weight=="" || goods.weight <=0){
			alert("单价或重量必须为正数");
			return "";
		}
		goodsList.push(goods);
	});
	return goodsList;
	
	
}
 
function clickUpdateContract(){
	$("#nameDate").removeClass("cursor");
	$("#goodSettleUnitPrice").removeClass("cursor");
	$("#agentDate").removeClass("cursor");
	$("#updateNameDate").hide(); 
	$("#updateGoodSettlePriceDiv").hide();
	$("#updateGoodSettlePrice").hide();
	$("#updateContractDiv").show();
	
	$("#nameDate_tip").hide();
	$("#goodSettleUnitPrice_tip").hide();
	$("#updateContract_tip").show();
	$("#agentDate_tip").hide();
	
	$("#updateContract").addClass("cursor");
	$("#updateAgentDate").hide();
	$("#updateName_AgentDateDiv").show();
	$("#submitForm").show();
	
	type="3";
}

function clickAgentDate(){
	$("#nameDate").removeClass("cursor");
	$("#goodSettleUnitPrice").removeClass("cursor");
	$("#updateNameDate").hide(); 
	$("#updateGoodSettlePriceDiv").hide();
	$("#updateGoodSettlePrice").hide();
	$("#updateContract").removeClass("cursor");
	$("#updateContractDiv").hide();
	
	$("#nameDate_tip").hide();
	$("#goodSettleUnitPrice_tip").hide();
	$("#updateContract_tip").hide();
	$("#agentDate_tip").show();
	
	$("#agentDate").addClass("cursor");
	$("#updateAgentDate").show();
	$("#updateName_AgentDateDiv").show();
	
	var agentPayDate = $("#advancesDate").val();
	if(agentPayDate != null && agentPayDate != ""){
		$("#submitForm").hide();
		$("#agentPayDate").attr({"readonly":true});
	    $("#agentPayDate").removeAttr("onclick");
	}
	type="1";
}

function clickNameDate(){
	$("#agentDate").removeClass("cursor");
	$("#goodSettleUnitPrice").removeClass("cursor");
	$("#updateAgentDate").hide();
	$("#goodSettleUnitPrice").removeClass("cursor");
	$("#updateGoodSettlePrice").hide();
	$("#updateGoodSettlePriceDiv").hide();
	$("#updateContract").removeClass("cursor");
	$("#updateContractDiv").hide();
	
	$("#agentDate_tip").hide();
	$("#goodSettleUnitPrice_tip").hide();
	$("#nameDate_tip").show();
	$("#updateContract_tip").hide();
	
	$("#nameDate").addClass("cursor");
	$("#updateNameDate").show();
	$("#submitForm").show();

	$("#updateName_AgentDateDiv").show();
	type="0";
	$("#submitForm").removeAttr("disabled");//将按钮可用
}

function clickGoodSettleUnitPrice(){
	$("#nameDate").removeClass("cursor");
	$("#updateNameDate").hide();
	$("#agentDate").removeClass("cursor");
	$("#updateAgentDate").hide();
	//updateName_AgentDateDiv
	$("#updateName_AgentDateDiv").hide();
	$("#updateContract").removeClass("cursor");
	$("#updateContractDiv").hide();
	
	$("#nameDate_tip").hide();
	$("#agentDate_tip").hide();
	$("#goodSettleUnitPrice_tip").show();
	$("#updateContract_tip").hide();
	
	$("#goodSettleUnitPrice").addClass("cursor");
	$("#updateGoodSettlePrice").show();
	$("#updateGoodSettlePriceDiv").show();
}


var _msg;
function modifyContract() {
    var purchaseContractName = $("#purchaseContractNameNew").val();
    var purchaseContractNo = $("#purchaseContractNoNew").val();
    var agentPayDate = $("#agentPayDate").val();
    
    var contractNo = $("#contractNo").val();
    var buyerCompanyName = $("#buyerCompanyName").val();
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    var status = $("#status").val();
    var currentPage = $("#currentPage").val();
    var updateFirstPayAmt = $("#firstPayAmt").val();
    var updateTotalPrice = $("#totalPrice").val();
    var updateListTotalPrice = $("#listTotalPrice").val();
    
    
    if (type == 0 && (purchaseContractName == null || purchaseContractName == "")) {
            alert("采购合同名称不能为空!");
            $('input[name=purchaseContractName]').focus();
            return;
        }
 
        
     if (type == 0 && (purchaseContractNo == null || purchaseContractNo == "")) {
            alert("采购合同编号不能为空!")
            $('input[name=purchaseContractNo]').focus();
            return;
        }
        
       if (type == 1 && (agentPayDate == null || agentPayDate == "")) {
            alert("垫款日期不能为空!")
            $('input[name=agentPayDate]').focus();
            return;
        }

    var message = "确定提交吗？";
    if(type == "1"){
    	message = "垫款日期仅能维护一次,确定提交吗 ？";
    }
    if(type=='1'||type=='0'){
	    Boxy.confirm(message,
	    function() {
	    	 _msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
	        jQuery.post(appServer + '/contract/agent/modifyContract_' + id + '_'+type+'.htm', 
	        	{"purchaseContractName": purchaseContractName,"purchaseContractNo": purchaseContractNo,"agentPayDate":agentPayDate},
	       	 function(v) {
	            if (v.result == 'true') {
	                Hundsun.PopUtil.alert({
	                    msg: '维护成功！',
	                    autohide: true,
	                    width: 350,
	                    timeout: 800,
	                    callback: function() {
	                        window.location.href = appServer + "/contract/agent/list.htm?contractNo=" + $("#contractNo").val() + "&buyerCompanyName=" + $("#buyerCompanyName").val() + "&startCreateDate=" + $("#startCreateDate").val() + "&endCreateDate=" + $("#endCreateDate").val() + "&status=" + $("#status").val() + "&currentPage=" + $("#currentPage").val();
	                    }
	                })
	
	            } else {
	            	  if (_msg) {
								_msg.hide();
								}
	                Hundsun.PopUtil.alert({
	                    msg: v.msg,
	                    width: 450,
	                    timeout: 800,
	                    type: 'warn'
	                })
	            }
	        },
	        'json');
	    });
    }
    if(type=='3'){
    	 if (updateFirstPayAmt == null || updateFirstPayAmt == "" || updateFirstPayAmt <=0) {
             alert("首付款金额必须为正数!")
             $('input[name=firstPayAmt]').focus();
             return;
         }
    	 
    	 if (updateTotalPrice == null || updateTotalPrice == "" ||updateTotalPrice<=0) {
             alert("实际金额必须为正数!")
             $('input[name=totalPrice]').focus();
             return;
         }
    	 if (updateListTotalPrice == null || updateListTotalPrice == "" ||updateListTotalPrice<=0) {
             alert("合同金额必须为正数!")
             $('input[name=listTotalPrice]').focus();
             return;
         }
    	
    	
    	var goodsList = getPriceAndWeight();
    	if(goodsList==""){
    		return;
    	}
    	 var listTotalPrice = cacluateListPrice();
    	 if(Number(listTotalPrice)!=Number(updateListTotalPrice)){
    		 alert("合同金额与货品明细总额不等，请重新计算!")
             $('input[name=listTotalPrice]').focus();
             return;
    	 }
    	message="确定要修改合同价格吗？";
    	Boxy.confirm(message,
    		    function() {
    		    	 _msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
    		        jQuery.post(appServer + '/contract/agent/updatepw_' + id + '.htm', 
    		        	{"fp": updateFirstPayAmt,"contractGoods": JSON.stringify(goodsList)},
    		       	 function(v) {
    		            if (v.result == 'true') {
    		                Hundsun.PopUtil.alert({
    		                    msg: '维护成功！',
    		                    autohide: true,
    		                    width: 350,
    		                    timeout: 800,
    		                    callback: function() {
    		                        window.location.href = appServer + "/contract/agent/list.htm?contractNo=" + $("#contractNo").val() + "&buyerCompanyName=" + $("#buyerCompanyName").val() + "&startCreateDate=" + $("#startCreateDate").val() + "&endCreateDate=" + $("#endCreateDate").val() + "&status=" + $("#status").val() + "&currentPage=" + $("#currentPage").val();
    		                    }
    		                })
    		
    		            } else {
    		            	  if (_msg) {
    									_msg.hide();
    									}
    		                Hundsun.PopUtil.alert({
    		                    msg: v.msg,
    		                    width: 450,
    		                    timeout: 800,
    		                    type: 'warn'
    		                })
    		            }
    		        },
    		        'json');
    		    });
    }
}

//入库明细的结算单价
//返回有效的 单价数字和明细Id
var pirceValues ;
var goodItemIds ;
var isAllNull ;
var isRightSettlePrice ;
function checkSettlePrice(){
		pirceValues="";
		goodItemIds ="" ;
		isAllNull =true;
		isRightSettlePrice = true
	$("input[name^='settleUnitPrice']").each(function(i, obj) {
				var value = $(obj).val();
				// 只判断填值的数据
				if (value != null && value != "") {
					isAllNull = false;
					if (isNaN(value)) {
						Hundsun.PopUtil.alert({
									msg : "请输入数字!",
									width : 200,
									timeout : 800,
									type : 'warn'
								})

						$(obj).focus();
						isRightSettlePrice = false;
						return false;
					}

					if (value <= 0) {
						Hundsun.PopUtil.alert({
									msg : "请输入大于0的数字!",
									width : 200,
									timeout : 800,
									type : 'warn'
								})
						$(obj).focus();
						isRightSettlePrice = false;
						return false;
					}

					// 保留两位小数
					value = parseFloat(value).toFixed(2);
					$(obj).val(value);
					if (parseFloat(value) > parseFloat("9999999999.99")) {
						Hundsun.PopUtil.alert({
									msg : "请输入小于9999999999的数字!",
									width : 200,
									timeout : 800,
									type : 'warn'
								})
						$(obj).focus();
						isRightSettlePrice = false;
						return false;
					}

					if (!isRightSettlePrice) {
						return;
					}

					var itemId = $(obj).next();
					var id = itemId.val();
					pirceValues = pirceValues + value + ";"
					goodItemIds = goodItemIds + id + ";";
				}

			});
					
	
}

function submitSettlePrice()
{
	
	checkSettlePrice();
	
		 if (!isRightSettlePrice) {
				return;
				}
					
		if(isAllNull){
			  Hundsun.PopUtil.alert({
							msg : "请至少录入一条后再提交 !",
							width : 200,
							timeout : 800,
							type : 'warn'
						})
		return;				
			
		}
	
	var message = "结算单价仅能维护一次,确定提交吗 ？";
    
    Boxy.confirm(message,
    function() {
    	 _msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
        jQuery.post(appServer + '/contract/agent/wirteSettlePrice.htm', 
        	{"pirceValues": pirceValues,"goodItemIds": goodItemIds},
       	 function(v) {
            if (v.result == 'true') {
                Hundsun.PopUtil.alert({
                    msg: '录入成功！',
                    autohide: true,
                    width: 350,
                    timeout: 800,
                    callback: function() {
                        window.location.href = appServer + "/contract/agent/list.htm?contractNo=" + $("#contractNo").val() + "&buyerCompanyName=" + $("#buyerCompanyName").val() + "&startCreateDate=" + $("#startCreateDate").val() + "&endCreateDate=" + $("#endCreateDate").val() + "&status=" + $("#status").val() + "&currentPage=" + $("#currentPage").val();
                    }
                })

            } else {
            	  if (_msg) 
            	  	{
						_msg.hide();
					}
                Hundsun.PopUtil.alert({
                    msg: v.msg,
                    width: 450,
                    timeout: 800,
                    type: 'warn'
                })
            }
        },
        'json');
    })
	
	
}

