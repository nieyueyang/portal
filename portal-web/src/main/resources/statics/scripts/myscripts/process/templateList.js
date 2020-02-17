function selectRegion() {
	var _msg = Hundsun.PopUtil.loading();
	jQuery.ajax({
		type : "POST",
		url : appServer + "/process/region/seller/getDialogList.htm",
		data : {},
		success : function(result) {
			_msg.hide();
			var htmlCode = "";
			htmlCode += "<table width='200' id='regionListDialog'><tr><th class='tc'>选择</th><th class='tl'>销售区域</th></tr>";
			for(var i=0; i<result.data.length; i++) {
				var busiRegion = result.data[i].busiRegion;
				htmlCode += "<tr><td class='tc'><input type='radio' name='busiRegion' value='" + busiRegion + "' /></td><td class='tl'>" + busiRegion + "</td></tr>";
			}
			htmlCode += "</table>";
			if(result.type == "success") {
				art.dialog({
					id:'selectRegion',
					title:'选择销售区域',
					lock: true,
					content: htmlCode,
					yesFn:function() {
						var busiRegion = $("#regionListDialog").find("input[type=radio]:checked").val();
						if(undefined == busiRegion || null ==busiRegion || "" == busiRegion.trim()) {
							alert("请选择一个销售区域！");
							return false;
						} else {
							$("#region").val(busiRegion);
						}
					},
					noFn:function(){}
				});
			} else {
				Hundsun.PopUtil.alert({msg:result.title, type:result.type});
			}
		},
		error:function(){
			_msg.hide();
			art.dialog({
				id : "timeOut",
				lock : true,
				content: '网络超时,请重试',
				yesFn : true
			});
		}
	});
}

function acceptFormDialog() {
	
}