 //点击 补缴信息设置 标签 
function clickSupplySet(){
		$("#repayOffline").removeClass("cursor");//线下还款
		$("#repaymentAudit").removeClass("cursor");//还款审核
		$("#enterWahourse").removeClass("cursor");//入库申请
		$("#contractAdudit").removeClass("cursor");//合同审核
		$("#repayFirstPay").removeClass("cursor");
		$("#supplySet").addClass("cursor");
		//跳转页面    
		location.href = appServer + "/agent/supplyset/add.htm?contractId="+ $("#contractId").val()+"&startCreateDate="
			+ $("#startCreateDate").val() + "&endCreateDate="
			+ $("#endCreateDate").val() + "&buyerCompanyName="
			+ $("#buyerCompanyName").val() + "&contractNo="
			+ $("#contractNo").val() + "&status=" + $("#status").val()
			+ "&currentPage=" + $("#currentPage").val();
  }
//点击 首付款退款
function clickRepayFirstPay(){
	$("#repayOffline").removeClass("cursor");//线下还款
	$("#repaymentAudit").removeClass("cursor");//还款审核
	$("#enterWahourse").removeClass("cursor");//入库申请
	$("#contractAdudit").removeClass("cursor");//合同审核
	$("#repayFirstPay").addClass("cursor");
	$("#supplySet").removeClass("cursor");
	//跳转页面    
	location.href = appServer + "/contract/agent/repayfp/offline.htm?contractId="+ $("#contractId").val()+"&startCreateDate="
		+ $("#startCreateDate").val() + "&endCreateDate="
		+ $("#endCreateDate").val() + "&buyerCompanyName="
		+ $("#buyerCompanyName").val() + "&contractNo="
		+ $("#contractNo").val() + "&status=" + $("#status").val()
		+ "&currentPage=" + $("#currentPage").val();
}
	
	//点击 线下还款  标签
	function clickRepayOffline(){
		$("#supplySet").removeClass("cursor");//补缴信息设置
		$("#repaymentAudit").removeClass("cursor");//还款审核
		$("#enterWahourse").removeClass("cursor");//入库申请
		$("#contractAdudit").removeClass("cursor");//合同审核
		$("#repayFirstPay").removeClass("cursor");
		$("#repayOffline").addClass("cursor");
		//跳转页面
		location.href = appServer + "/contract/agent/applyOffline.htm?contractId="
			+ $("#contractId").val() + "&repayType=2&startCreateDate="
			+ $("#startCreateDate").val() + "&endCreateDate="
			+ $("#endCreateDate").val() + "&buyerCompanyName="
			+ $("#buyerCompanyName").val() + "&contractNo="
			+ $("#contractNo").val() + "&status=" + $("#status").val()
			+ "&currentPage=" + $("#currentPage").val();
	}
	
	//点击 还款审核  标签
	function clickRepaymentAudit(){
		$("#supplySet").removeClass("cursor");//补缴信息设置
		$("#repayOffline").removeClass("cursor");//线下还款
		$("#enterWahourse").removeClass("cursor");//入库申请
	    $("#contractAdudit").removeClass("cursor");//合同审核
		$("#repaymentAudit").addClass("cursor");
		$("#repayFirstPay").removeClass("cursor");
		//跳转页面
		location.href = appServer + "/contract/agent/repaymentAudit_" + $("#contractId").val() + ".htm?" 
			+ "&startCreateDate=" + $("#startCreateDate").val() + "&endCreateDate="
			+ $("#endCreateDate").val() + "&buyerCompanyName="
			+ $("#buyerCompanyName").val() + "&contractNo="
			+ $("#contractNo").val() + "&status=" + $("#status").val()
			+ "&currentPage=" + $("#currentPage").val();
	}
	
	//点击 入库申请 标签
	function clickenterWahourse(){
		$("#supplySet").removeClass("cursor");//补缴信息设置
		$("#repayOffline").removeClass("cursor");//线下还款
		$("#repaymentAudit").removeClass("cursor");//还款审核
		$("#contractAdudit").removeClass("cursor");//合同审核
		$("#enterWahourse").addClass("cursor");
		$("#repayFirstPay").removeClass("cursor");
	   //跳转页面    
		location.href = appServer + "/contract/agent/enterWarhourse.htm?contractId="+ $("#contractId").val()+"&startCreateDate="
			+ $("#startCreateDate").val() + "&endCreateDate="
			+ $("#endCreateDate").val() + "&buyerCompanyName="
			+ $("#buyerCompanyName").val() + "&contractNo="
			+ $("#contractNo").val() + "&status=" + $("#status").val()
			+ "&currentPage=" + $("#currentPage").val();
	}
	
	//点击合同审核标签
	function clickContractAdudit(){
		$("#supplySet").removeClass("cursor");//补缴信息设置
		$("#repayOffline").removeClass("cursor");//线下还款
		$("#repaymentAudit").removeClass("cursor");//还款审核
		$("#enterWahourse").removeClass("cursor");//入库申请
		$("#contractAdudit").addClass("cursor");
		$("#repayFirstPay").removeClass("cursor");
		//跳转页面    
		location.href = appServer + "/contract/agent/contractAudit.htm?contractId="+ $("#contractId").val()+"&startCreateDate="
			+ $("#startCreateDate").val() + "&endCreateDate="
			+ $("#endCreateDate").val() + "&buyerCompanyName="
			+ $("#buyerCompanyName").val() + "&contractNo="
			+ $("#contractNo").val() + "&status=" + $("#status").val()
			+ "&currentPage=" + $("#currentPage").val();
			
  }
  
  //合同审核提交
  function auditDo(){
		Boxy.confirm("确定提交吗?",function(){
				_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
			jQuery.post (
					appServer + '/contract/agent/contractAuditDo.htm',
					{"auditStatus":$("#auditStatus").val(),
					"remarker":$("#remarker").val(),
					"contractNo":$("#contractNo").val()},
		        function(v){
		    		if(v.result == 'success'){
							Hundsun.PopUtil.alert({
								msg:'本次审核操作成功!',
								autohide : true,
								width:350,
								timeout:800,
								callback :function(){
									location.href = appServer + "/contract/agent/list.htm?contractId="+ $("#contractId").val()+"&startCreateDate="
										+ $("#startCreateDate").val() + "&endCreateDate="
											+ $("#endCreateDate").val() + "&buyerCompanyName="
											+ $("#buyerCompanyName").val() + "&contractNo="
											+ $("#contractNo").val() + "&status=" + $("#status").val()
											+ "&currentPage=" + $("#currentPage").val();
								}
							})
					 }else{
						 Hundsun.PopUtil.alert({
								msg:v.msg,
								width:450,
								timeout:800,
								type:'warn'
							})
							_msg.hide();
					 }
				},
				'json'
		    );
		  })
}
  
	
	