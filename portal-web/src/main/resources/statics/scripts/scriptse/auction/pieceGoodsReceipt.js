/**
 * 添加标段下货品，从我的仓单选择
 * @author chengy
 */

/**
 * 记录已选的仓单id
 */
receiptIdList = [];
/**
 * 选择仓单的dialog
 */
$(function() {
	$("#inputDialogReceipt")
			.dialog(
					{
						autoOpen : false,
						bgiframe : true,
						modal : true,
						position : [ 350, 50 ],
						width : 750,
						minHeight : 400,
						resizable : false,
						title : "选择我的货品",
						buttons : {
							"确认" : function() {
								var allOpt = $("#inputDialogReceipt input[name='selOpt']:checked");
								if (isUnitPriceBid
										&& (goodsList.length
												+ $("#inputDialogReceipt input[name='selOpt']:enabled:checked").length > 1)) {
									if (isSpecial) {
										alert("专场竞买每个标段只能添加一个货品");
									} else {
										alert("单价报盘每个标段只能添加一个货品");
									}
								} else {
									for ( var i = 0; i < allOpt.length; i++) {
										var element = allOpt[i]
												.getAttribute("value");
										if (!receiptIdList.in_array(element)) {
											receiptIdList.push(element);
											goodsList.push({
												varietyName : $(allOpt[i])
														.parent().siblings(
																"td:eq(0)")
														.text(),
												varietyCode : $(allOpt[i])
														.parent().siblings(
																"td:eq(1)")
														.text(),
												material : $(allOpt[i])
														.parent().siblings(
																"td:eq(2)")
														.text(),
												length : $(allOpt[i]).parent()
														.siblings("td:eq(3)")
														.text(),
												width : $(allOpt[i]).parent()
														.siblings("td:eq(4)")
														.text(),
												thickness : $(allOpt[i])
														.parent().siblings(
																"td:eq(5)")
														.text(),
												weight : $(allOpt[i]).parent()
														.siblings("td:eq(6)")
														.text(),
												manufacturer : $(allOpt[i])
														.parent().siblings(
																"td:eq(7)")
														.text(),
												origin : $(allOpt[i]).parent()
														.siblings("td:eq(8)")
														.text(),
												receiptId : $(allOpt[i])
														.parent().siblings(
																"td:eq(9)")
														.text(),
												receiptNo : $(allOpt[i])
														.parent().siblings(
																"td:eq(10)")
														.text(),
												quantity : $(allOpt[i])
														.parent().siblings(
																"td:eq(11)")
														.text(),
												productionDate : $(allOpt[i])
														.parent().siblings(
																"td:eq(12)")
														.text(),
												qualityStandard : $(allOpt[i])
														.parent().siblings(
																"td:eq(13)")
														.text(),
												baleNo : $(allOpt[i]).parent()
														.siblings("td:eq(14)")
														.text(),
												comments : $(allOpt[i])
														.parent().siblings(
																"td:eq(15)")
														.text(),
												myGoodsId : "",
												id : ""
											});
										}
									}
									if (allOpt.length == 0) {
										alert("请选择仓单!");
										return;
									}
									$("#goodsJsonData").val(
											JSON.stringify(goodsList));
									$("#listTbody").html(
											getGoodsSelectedTable());
									$(this).dialog("close");
								}
							},
							"取消" : function() {
								$(this).dialog("close");
							}
						}
					});
	$("#btn_receipt").click(function() {
		$("select").hide();
		$("#inputDialogReceipt").dialog("open");
	});
	$("#inputDialogReceipt")
			.bind(
					"dialogopen",
					function(event, ui) {
						var pieceVarietyCode = $(
								"select[name='pieceVarietyCode'],input[name='pieceVarietyCode']")
								.val();
						$("#inputDialogReceipt").load(
								appServer + "/ajax/myReceiptList.htm?t="
										+ new Date().getTime() + "&whCmpId="
										+ spaceWarehouseCmpId + "&parCode="
										+ pieceVarietyCode, null, function() {
									receiptCheck();
								});
					});
	$("#inputDialogReceipt").bind("dialogclose", function(event, ui) {
		$("select").show();
		$(this).empty();
	});
	$("#myReceiptSelectDialogForm a[id=listMyReceipt]").live(
			"click",
			function() {
				$.ajax({
					contentType : "application/json; charset=gbk",
					cache : false
				})

				$("#inputDialogReceipt").load(
						appServer + "/ajax/myReceiptList.htm",
						$("#myReceiptSelectDialogForm").serializeArray(),
						function() {
							receiptCheck();
						});

			});
	/**
	 * 检查所有列表选择项，挑上并disable已选择的买家
	 */
	function receiptCheck() {
		$("#inputDialogReceipt input[name='selOpt']").each(function() {
			var selectedId = this.getAttribute("value");
			if (receiptIdList.in_array(selectedId)) {
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
});