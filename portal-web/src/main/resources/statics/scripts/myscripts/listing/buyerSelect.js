// idList: 一维数组，存放选择买家的id
// buyerList: 二维数组，存放用于列表显示的买家信息
var idList = [];
var buyerList = [];
$(function() {
	// 选择买家的dialog
	$("#buyerSelectDialog")
			.dialog(
					{
						autoOpen : false,
						bgiframe : true,
						modal : true,
						position : [ 130, 100 ],
						width : 750,
						height:420,
						title : "买家选择",
						buttons : {
							"确认" : function() {
								var isChecked = true;
								var allOpt = $(".list-table input[name='selOpt']:checked");
								for ( var i = 0; i < allOpt.length; i++) {
									var element = allOpt[i].getAttribute("value");
									if (!idList.in_array(element)) {
										idList.push(element);
										buyerList.push({
											companyId : element,
											companyName : $(allOpt[i]).parent().siblings("td:eq(0)").text()
										});
									}
								}
								$("#userCount").html(buyerList.length);
								if (allOpt.length == 0) {
									alert("请选择买家!");
									return;
								}
								var jsonData = JSON.stringify(buyerList);
								$("#companysJsonData").val(jsonData);
								$(this).dialog("close");
							},
							"取消" : function() {
								$(this).dialog("close");
							}
						}
					});
	
	$("#buyerSelectDialog").bind(
			"dialogopen",
			function(event, ui) {
				$("#buyerSelectDialog").load(
						appServer + "/listingRemoting/list_directMember.htm?"+Math.round((Math.random()) * 100000000), null,
						function() {
							check();
						});
			});
	$("#buyerSelectDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
	$("#buyerSelectDialogForm a[id=listBuyer]").live(
			"click",
			function() {
				$.ajax({
					contentType : "application/json; charset=gbk",
					cache : false
				})

				$("#buyerSelectDialog").load(
						appServer + "/listingRemoting/list_directMember.htm?"+Math.round((Math.random()) * 100000000),
						$("#buyerSelectDialogForm").serializeArray(), function() {
							check();
						});

			});
	
	/**
	 * 检查所有列表选择项，挑上并disable已选择的买家
	 */
	function check() {
		$(".list-table input[name='selOpt']").each(function() {
			var selectedId = this.getAttribute("value");
			if (idList.in_array(selectedId)) {
				$(this).attr("checked", "checked");
				$(this).attr("disabled", true);
			}
		});

	}
	
	// 判断某数组是否包含某元素
	Array.prototype.S = String.fromCharCode(2);
	Array.prototype.in_array = function(e) {
		var r = new RegExp(this.S + e + this.S);
		return (r.test(this.S + this.join(this.S) + this.S));
	}

	/**
	 * 已选买家dialog
	 */
	$("#buyerViewDialog").dialog({
		autoOpen : false,
		bgiframe : true,
		modal : true,
		position : [ 400, 100 ],
		title : "已选买家",
		buttons : {
			"确认" : function() {
				$(this).dialog("close");
			}
		}
	});
	
});
	// 得到已选择买家页面html
	function getBuyer(vType) {
		var htmlStr = "";
		htmlStr += "<table class='c3 list-table'><tr><th class='tc'>企业id</th><th class='tc'>企业名称</th><th class='tc'>操作</th></tr>";
		for ( var i = 0; i < buyerList.length; i++) {
			htmlStr += "<tr name='data' id='";
			htmlStr += "tr" + buyerList[i].companyId + "'";
			if (i % 2 == 0) {
				htmlStr += " class='bg' ";
			}
			htmlStr += ">";
			htmlStr += "<td class='tc'>";
			htmlStr += buyerList[i].companyId;
			htmlStr += "</td>";
			htmlStr += "<td class='tc'>";
			htmlStr += buyerList[i].companyName;
			htmlStr += "</td>";
			htmlStr += "<td class='tc'>";
			if(vType=="V"){
			}else{
				htmlStr += "<a href='javascript:removeTr(" + buyerList[i].companyId
				+ ");'>删除</a>";
			}
			htmlStr += "</td>";
			htmlStr += "</tr>"
		}
		htmlStr += "</table>";
		return htmlStr;
	}



function selectBuyerClick(){
	$("#buyerSelectDialog").dialog("open");
}

// 
/*
 * 查看已选择的买家
 * vType:  V=查看；其它=修改或添加
 */
function viewBuyerClick(vType){
	if(buyerList.length>0){
		$("#buyerList").html(getBuyer(vType));
		$("#buyerViewDialog").dialog("open");
	}else{
		alert("请选择买家！");
	}
}

// 买家查看删除操作
function removeTr(trId) {
	$("#tr" + trId).remove();
	refreshData();
}

// 刷新数组数据
function refreshData(){
	// 清空2个数组
	idList = [];
	buyerList = [];
	// 重新push
	$("#buyerViewDialog tr[name='data']").each(function() {
		var id = $(this).children("td").eq(0).html();
		var name = $(this).children("td").eq(1).html();
		idList.push(id);
		buyerList.push({
			companyId : id,
			companyName : name,
			id : id
		});
	})
	var jsonData = JSON.stringify(buyerList);
	$("#companysJsonData").val(jsonData);
	$("#userCount").html(buyerList.length);
}