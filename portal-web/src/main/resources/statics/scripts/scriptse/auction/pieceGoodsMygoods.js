/**
 * 添加标段下货品，从我的货品中选择
 */

/**
 * 记录已选的我的货品id
 */
myGoodsIdList = [];

/**
 * 选择货品的dialog
 */
$(function() {
	$("#inputDialogMygoods")
			.dialog(
					{
						autoOpen : false,
						bgiframe : true,
						modal : true,
						position : [ 350, 50 ],
						width : 750,
						minHeight : 530,
						resizable : false,
						title : "选择我的货品",
						open : function() {
							// jquery之dialog的键盘事件(输入完毕回车检索)
							$(this)
									.bind(
											"keypress.ui-dialog",
											function(event) {
												if (event.keyCode == $.ui.keyCode.ENTER) {
													$(
															"#myGoodsSelectDialogForm a[id=listMyGoods]")
															.click();
													return false;
												}
											});
						},
						buttons : {
							"确认" : function() {
								var isChecked = true;
								var allOpt = $("#inputDialogMygoods input[name='selOpt']:checked");
								if (isUnitPriceBid
										&& (goodsList.length
												+ $("#inputDialogMygoods input[name='selOpt']:enabled:checked").length > 1)) {
									if (isSpecial) {
										alert("专场竞买每个标段只能添加一个货品");
									} else {
										alert("单价报盘每个标段只能添加一个货品");
									}
								} else {
									for ( var i = 0; i < allOpt.length; i++) {
										var element = allOpt[i]
												.getAttribute("value");
										if (!myGoodsIdList.in_array(element)) {
											myGoodsIdList.push(element);
											var goodsJson = $(allOpt[i])
													.parent().siblings(
															"td:eq(0)").text();
											var goods = JSON.parse(goodsJson);
											goods.myGoodsId = element;
											goods.id = "";
											goodsList.push(goods);
										}
									}
									if (allOpt.length == 0) {
										alert("请选择货品!");
										return;
									}
									$("#goodsJsonData").val(
											JSON.stringify(goodsList));
									$("#listTbody").html(
											getGoodsSelectedTable());
									goodsList = [];
									myGoodsIdList = [];
									receiptIdList = [];
									repushData();
									$(this).dialog("close");
								}
							},
							"取消" : function() {
								$(this).dialog("close");
							}
						}
					});
	$("#btn_mygoods").click(function() {
		$("select").hide();
		$("#inputDialogMygoods").dialog("open");
	});
	$("#inputDialogMygoods")
			.bind(
					"dialogopen",
					function(event, ui) {
						var pieceVarietyCode = $(
								"select[name='pieceVarietyCode'],input[name='pieceVarietyCode']")
								.val();
						var date = new Date().getTime();
						$("#inputDialogMygoods").load(
								appServer + "/ajax/myGoodsList.htm?t=" + date
										+ "&parCode=" + pieceVarietyCode, null,
								function() {
									check();
								});
					});
	$("#inputDialogMygoods").bind("dialogclose", function(event, ui) {
		$("select").show();
		$(this).empty();
	});
	$("#myGoodsSelectDialogForm a[id=listMyGoods]").live(
			"click",
			function() {
				$.ajax({
					contentType : "application/json; charset=gbk",
					cache : false
				})

				$("#inputDialogMygoods").load(
						appServer + "/ajax/myGoodsList.htm?t="
								+ new Date().getTime(),
						$("#myGoodsSelectDialogForm").serializeArray(),
						function() {
							check();
						});

			});
	/**
	 * 检查所有列表选择项，挑上并disable已选择的买家
	 */
	function check() {
		$("#inputDialogMygoods input[name='selOpt']").each(function() {
			var selectedId = this.getAttribute("value");
			if (myGoodsIdList.in_array(selectedId)) {
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