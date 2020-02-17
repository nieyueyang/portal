function overdue(id) {
	var url = appServer + "/contract/agent/overdue_" + id + ".htm";
	var msg = "你确定要逾期终止合同，该操作一旦成功，合同就此作废";
	Boxy.confirm(msg, function() {
		var _msg = Hundsun.PopUtil.loading();
		jQuery.post(url, function(v) {
			if (v.result == 'success') {
				_msg.hide();
				Hundsun.PopUtil.alert({
					msg : '操作成功......',
					autohide : true,
					width : 280,
					callback : function() {
						// document.getElementById("searchForm").submit();;
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

var repay = repay ||{
	//还款审核通过
	repaymentAuditPass:function(){
		$(".repaymentAuditPass").click(function(){
			var id = $("#agentId").val();
			var url = appServer + "/contract/agent/repaymentAudit.htm";
			var msg = "你确定还款审核通过，请确认您有没有收到款！";
			Boxy.confirm(msg, function() {
				 var params = {
						 "id":id,
						 "status":2,
						 "repayAmt":$(".repayAmt").val(),
						 "goodsRepaymentAmt":$("input[name='goodsRepaymentAmt']").val(),
						 "interestAmt":$("input[name='interestAmt']").val(),
						 "interestByDayAmt":$("input[name='interestByDayAmt']").val()
				 }
				_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
				jQuery.post(url, params,function(v) {
					if (v.success == true) {
						Hundsun.PopUtil.alert({
							msg : '操作成功......',
							autohide : true,
							width : 280,
							callback : function() {
								Hundsun.UrlUtil.refresh();
							}
						});
					} else {
						if(_msg) {_msg.hide();}
						Hundsun.PopUtil.alert({
							msg : v.message,
							autohide : false,
							width : 450,
							type : 'warn'
						});
					}
				}, 'json');
			});
		});
	},
	//还款审核不通过
	repaymentAuditNoPass:function(){
		$(".repaymentAuditNoPass").click(function(){
			var id = $("#agentId").val();
			var url = appServer + "/contract/agent/repaymentAudit.htm";
			var msg = "你确定还款审核不通过！";
			Boxy.confirm(msg, function() {
				_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
				jQuery.post(url, {"id":id,"status":3},function(v) {
					if (v.success == true) {
						Hundsun.PopUtil.alert({
							msg : '操作成功......',
							autohide : true,
							width : 280,
							callback : function() {
								//if(_msg) {_msg.hide();}
								Hundsun.UrlUtil.refresh();
							}
						});
					} else {
						if(_msg) {_msg.hide();}
						Hundsun.PopUtil.alert({
							msg : v.message,
							autohide : false,
							width : 450,
							type : 'warn'
						});
					}
				}, 'json');
			});
		});
	}
	
};

$(function(){
	repay.repaymentAuditPass();
	repay.repaymentAuditNoPass();
});