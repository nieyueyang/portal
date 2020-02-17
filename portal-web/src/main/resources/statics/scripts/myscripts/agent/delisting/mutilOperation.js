 //点击 补缴货款 标签 
function clickSupplySet(){
		$("#repayOnline").removeClass("cursor");//还款
		$("#pickGoods").removeClass("cursor");//提货申请
		$("#replacement").removeClass("cursor");//换货
		$("#contractAdudit").removeClass("cursor");//合同审核
		$("#supplySet").addClass("cursor");
		
		//跳转页面    
		location.href = appServer + "/supply/buyerSupplyRequest.htm?contractId="+ $("#contractId").val()+"&startCreateDate="
			+ $("#startCreateDate").val() + "&endCreateDate="
			+ $("#endCreateDate").val() + "&buyerCompanyName="
			+ $("#buyerCompanyName").val() + "&contractNo="
			+ $("#contractNo").val() + "&status=" + $("#status").val()
			+ "&currentPage=" + $("#currentPage").val();
  }
	
	//点击 还款  标签
	function clickRepayOnline(){
		$("#supplySet").removeClass("cursor");//补缴信息设置
		$("#pickGoods").removeClass("cursor");//提货申请
		$("#replacement").removeClass("cursor");//换货
	$("#contractAdudit").removeClass("cursor");//合同审核
		$("#repayOnline").addClass("cursor");
		//跳转页面
		location.href = appServer + "/contract/agent/apply.htm?contractId="
			+ $("#contractId").val() + "&repayType=1&startCreateDate="
			+ $("#startCreateDate").val() + "&endCreateDate="
			+ $("#endCreateDate").val() + "&buyerCompanyName="
			+ $("#buyerCompanyName").val() + "&contractNo="
			+ $("#contractNo").val() + "&status=" + $("#status").val()
			+ "&currentPage=" + $("#currentPage").val();
	}
	
	//点击 提货申请   标签
	function clickPickGoods(){
		$("#supplySet").removeClass("cursor");//补缴
		$("#repayOnline").removeClass("cursor");//还款申请
		$("#replacement").removeClass("cursor");//换货
	$("#contractAdudit").removeClass("cursor");//合同审核
		$("#pickGoods").addClass("cursor");
		
		//跳转页面
		location.href = appServer + "/entrust/pick/list.htm?contractId="+ $("#contractId").val()+"&startCreateDate="
			+ $("#startCreateDate").val() + "&endCreateDate="
			+ $("#endCreateDate").val() + "&buyerCompanyName="
			+ $("#buyerCompanyName").val() + "&contractNo="
			+ $("#contractNo").val() + "&status=" + $("#status").val()
			+ "&currentPage=" + $("#currentPage").val();
	}
	
	//点击 换货申请 标签
	function clickReplacement(){
		$("#supplySet").removeClass("cursor");//补缴
		$("#repayOnline").removeClass("cursor");//还款
		$("#pickGoods").removeClass("cursor");//提货
		$("#contractAdudit").removeClass("cursor");//合同审核
		$("#replacement").addClass("cursor");
		
	   //跳转页面    
		location.href = appServer + "/contract/agent/toreplacement_" + $("#contractId").val() + ".htm?" 
			+ "&startCreateDate=" + $("#startCreateDate").val() + "&endCreateDate="
			+ $("#endCreateDate").val() + "&buyerCompanyName="
			+ $("#buyerCompanyName").val() + "&contractNo="
			+ $("#contractNo").val() + "&status=" + $("#status").val()
			+ "&currentPage=" + $("#currentPage").val();
	}
	
  //点击合同审核标签
	function clickContractAdudit(){
		//alert("点击合同审核按钮");
		$("#supplySet").removeClass("cursor");//补缴
		$("#repayOnline").removeClass("cursor");//还款
		$("#pickGoods").removeClass("cursor");//提货
		$("#replacement").removeClass("cursor");//换货
		$("#contractAdudit").addClass("cursor");
		//跳转页面    
		location.href = appServer + "/contract/entrust/contractAudit.htm?contractId="+ $("#contractId").val()+"&startCreateDate="
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
					appServer + '/contract/entrust/contractAuditDo.htm',
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
									location.href = appServer + "/contract/entrust/list.htm?contractId="+ $("#contractId").val()+"&startCreateDate="
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
	
	