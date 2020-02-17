function pickCompleted(url){
	var msg = "你确定要完成提货操作吗？";
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