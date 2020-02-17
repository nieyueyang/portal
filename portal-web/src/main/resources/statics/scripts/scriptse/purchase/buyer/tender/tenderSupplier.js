/**
 * 一维数组，存放选择买家的id
 */
var idList = [];

/**
 * buyerList: 二维数组，存放用于列表显示的买家信息
 */
var buyerList = [];
$(function() {
	// 先加载一遍数据
	var jsonData = $("#companysJsonData").val();
	if (jsonData != null && jQuery.trim(jsonData) != "") {
		buyerList = JSON.parse(jsonData);
		$("#buyerList").html(getBuyer());
		$("#userCount").html(buyerList.length);
		refreshData();
	}
	// 选择买家的dialog
	$("#supplierSelectDialog")
			.dialog(
					{
						autoOpen : false,
						bgiframe : true,
						modal : true,
						position : [ 350, 50 ],
						width : 750,
						minHeight : 450,
						resizable : false,
						title : "买家选择",
						buttons : {
							"确认" : function() {
								var isChecked = true;
								var allOpt = $(".list-table input[name='selOpt']:checked");
								for ( var i = 0; i < allOpt.length; i++) {
									var element = allOpt[i]
											.getAttribute("value");
									if (!idList.in_array(element)) {
										idList.push(element);
										buyerList.push({
											companyId : element,
											companyName : $(allOpt[i]).parent()
													.siblings("td:eq(0)")
													.text()
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
	$("#selectBuyer").click(function() {
		$("select").hide();
		$("#supplierSelectDialog").dialog("open");
		return false;
	});
	$("#supplierSelectDialog").bind(
			"dialogopen",
			function(event, ui) {
				$("#supplierSelectDialog").load(
						appServer + "/ajax/uc/supplierMultiplyList.htm?t="
								+ new Date().getTime(), null, function() {
							check();
						});
			});
	$("#supplierSelectDialog").bind("dialogclose", function(event, ui) {
		$("select").show();
		$(this).empty();
	});
	
	$("#supplierSelectDialogForm a[id=listSupplier]").live(
			"click",
			function() {
				$.ajax({
					contentType : "application/json; charset=gbk",
					cache : false
				})

				$("#supplierSelectDialog").load(
						appServer + "/ajax/uc/supplierMultiplyList.htm?"+Math.round((Math.random()) * 100000000),
						$("#supplierSelectDialogForm").serializeArray(), function() {
							check();
						});

			});
	/*
	 * $("#buyerSelectDialogForm a[id=listBuyers]").live( "click", function() {
	 * $.ajax({ contentType : "application/json; charset=gbk", cache : false })
	 * 
	 * $("#buyerSelectDialog").load( appServer + "/ajax/uc/directuserList.htm",
	 * $("#buysupplierSelectDialogFormserializeArray(), function() { check(); });
	 * 
	 * });
	 */

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

	/**
	 * 判断某数组是否包含某元素
	 */
	Array.prototype.S = String.fromCharCode(2);
	Array.prototype.in_array = function(e) {
		var r = new RegExp(this.S + e + this.S);
		return (r.test(this.S + this.join(this.S) + this.S));
	}

	/**
	 * 已选买家dialog
	 */
	$("#supplierViewDialog").dialog({
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

	/**
	 * 查看已选择的买家
	 */
	$("#viewBuyer").click(function() {
		if (idList.length > 0) {
			$("#buyerList").html(getBuyer());
			$("#supplierViewDialog").dialog("open");
		} else {
			alert("请选择买家！");
		}
		return false;
	});

	/**
	 * 得到已选择买家页面html
	 */
	function getBuyer() {
		var htmlStr = "";
		htmlStr += "<table class='c3 list-table'><tr><th class='tc' style='display:none;'>id</th><th class='tc' style='display:none;'>企业id</th><th class='tc' width='80%'>企业名称</th><th class='tc'>操作</th></tr>";
		for ( var i = 0; i < buyerList.length; i++) {
			htmlStr += "<tr name='data' id='";
			htmlStr += "tr" + buyerList[i].companyId + "'";
			if (i % 2 == 0) {
				htmlStr += " class='bg' ";
			}
			htmlStr += ">";
			htmlStr += "<td class='tc' style='display:none;'></td>";
			htmlStr += "<td class='tc' style='display:none;'>";
			htmlStr += buyerList[i].companyId;
			htmlStr += "</td>";
			htmlStr += "<td class='tc'>";
			htmlStr += buyerList[i].companyName;
			htmlStr += "</td>";
			htmlStr += "<td class='tc'>";
			htmlStr += "<a href='javascript:removeTr(" + buyerList[i].companyId
					+ ");'>删除</a>";
			htmlStr += "</td>";
			htmlStr += "</tr>"
		}
		htmlStr += "</table>";
		return htmlStr;
	}

});

/**
 * 买家查看删除操作
 * 
 * @param trId
 */
function removeTr(trId) {
	$("#tr" + trId).remove();
	refreshData();
}

/**
 * 刷新数组数据
 */
function refreshData() {
	// 清空2个数组
	idList = [];
	buyerList = [];
	// 重新push
	$("#supplierViewDialog tr[name='data']").each(function() {
		var id = $(this).children("td").eq(0).html();
		var companyId = $(this).children("td").eq(1).html();
		var companyName = $(this).children("td").eq(2).html();
		idList.push(companyId);
		buyerList.push({
			companyId : companyId,
			companyName : companyName,
			id : id
		});
	})
	var jsonData = JSON.stringify(buyerList);
	$("#companysJsonData").val(jsonData);
	$("#userCount").html(buyerList.length);
}