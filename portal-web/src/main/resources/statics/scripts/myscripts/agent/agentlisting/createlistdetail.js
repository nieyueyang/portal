//在线代理订货挂牌 详情页面  
var formHtml;
var appendHtml = '';

jQuery(function($) {
	// 页面加载后即 创建表单，表单创建成功后加载验证
	createTableByVariety(function() { // 添加匿名函数，验证表单
		var form = $('#form_step2').validateForm({
			errorPlacement : function(error, element) {
				element.siblings("span").css({
					"color" : "red"
				}).text(error.text());
			},
			success : function(label) {
				label.text("");
			},
			rules : {
				'realTotalPriceAmt' : {
					'required' : true,
					'min' : 0.01,
					'max' : 9999999999
				},
				'listUnitPriceAmt' : {
					'min' : 0.01,
					'max' : 9999999999
				}, // 挂牌单价
				'firstPayAmt' : {
					'min' : 0,
					'max' : 9999999999
				}, // 首付款金额
				'agentPayedAmt' : {
					'min' : 0.01,
					'max' : 9999999999
				}, // 已垫付金额
				'listNum' : {
					'min' : 1,
					'max' : 9999999999
				},// 挂牌数量
				'manufacuturer' : {
					'maxlength' : 40
				}, // 生成厂家
				'grade' : {
					'maxlength' : 40
				},// 等级
				'orgin' : {
					'maxlength' : 30
				},// 生产地区 产地
				'brand' : {
					'maxlength' : 10
				},// 商标
				'standard' : {
					'maxlength' : 40
				},// 标准
				'packing' : {
					'maxlength' : 80
				},// 包装
				'length' : {
					'maxlength' : 12
				},// 长
				'width' : {
					'maxlength' : 12
				},// 宽
				'thickness' : {
					'maxlength' : 12
				},// 高
				'listNum' : {
					'maxlength' : 9
				}, // 数量
				'listWeight' : {
					'min' : 0.001,
					'max' : 99999999999
				},// 挂牌量
				'minWeight' : {
					'min' : 0.001,
					'max' : 99999999999
				}, // 最小购买量
				'batchNo' : {
					'maxlength' : 40
				}
			// 批次号
			},
			submitHandler : function(f) {
				// unDirectWH();
				if (setAgentPayedAmt() && validateForm()) {
					f.submit();
				}
			}
		});// end validateForm

	});// end createTableByVariety

	// 校验数据
	function validateForm() {
		var listUnitPrice = $('input[name=listUnitPriceAmt]').val();// 挂牌单价
		var listWeight = $('input[name=listWeight]').val();// 挂牌 重量
		var minWeight = $('input[name=minWeight]').val();// 最小购买量
		var listNum = $('input[name=listNum]').val(); // 数量
		// 合同期限
		// var agentContractDeadline =
		// $('input[name=agentContractDeadline]').val();
		// 委托人
		var directUserCompanyName = $('input[name=directUserCompanyName]')
				.val();
		// 交收仓库 warehouseCmp warehouseCmpName
		var warehouseCmpName = $('input[name=warehouseCmpName]').val();
		// 图片
		var image = $('input[name=image_file]').val();
		var patn = /\.jpg$|\.jpeg$|\.gif$|\.png$/i;
		if (typeof(image) != "undefined" && image != "") {
			var img = image.split(".");
			if (!patn.test("." + img[1])) {
				alert("只能上传jpg，jpeg或gif格式的图片！");
				return false;
			}
		}
		/*
		 * if(Number(listWeight)<=0){ alert("挂牌量不能小于0！");
		 * $('input[name=listWeight]').focus(); return; }
		 */
		/*
		 * if(Number(listUnitPrice)<=0){ alert("挂牌单价不能小于0！");
		 * $('input[name=listUnitPrice]').focus(); return; }
		 */

		if (listNum != "") {
			if ((/^(\+|-)?\d+$/.test(listNum)) && listNum > 0) {
				if (listNum != "" && Number(listNum) < 0) {
					alert("数量不能小于0！");
					$('input[name=listNum]').focus();
					return;
				}
			} else {
				alert("数量只能是正整数");
				return;
			}
		}

		/*
		 * if(Number(minWeight)>Number(listWeight)){ alert("最小购买量不能大于挂牌量！");
		 * $('input[name=minWeight]').focus(); return; }
		 */

		// 委托人不能为空 directUserCompanyName
		if (directUserCompanyName == "" || directUserCompanyName == null) {
			alert("委托人信息不能为空！");
			$('input[name=directUserCompanyName]').focus();
			return;
		}

		// 交收仓库不能为空
		if (warehouseCmpName == "" || warehouseCmpName == null) {
			alert("请选择交收仓库！");
			// $('input[name=warehouseCmpName]').focus();
			return;
		}

		// 校验 费率 天数
		// var agentDays = document.getElementsByTagName("repayCompleteDay");
		// var agentDayRate = document.getElementsByTagName("feeRate");
		var isRightAgentRate = true;
		$("input[name^='repayCompleteDay']").each(function(i, obj) {
			var value = $(obj).val();

			var sp = $(obj).next();
			if (sp.attr("class") == 'red') {
				sp.remove();
			}

			if (value == null || value == "") {
				var errMsg = $("<span class='red'>请输入天数</span>");
				errMsg.insertAfter($(obj));
				$(obj).focus();
				isRightAgentRate = false;
				return false;
			}

			var agentPayDay = $("#agentContractDeadline").val();
			if (agentPayDay == null || agentPayDay == "") {
				alert("请先输入最长垫款期限!");
				$(obj).focus();
				isRightAgentRate = false;
				return false;
			}
			// 必须为整数
			if ((/^(\+|-)?\d+$/.test(value)) && value > 0) {
			} else {
				// append 一行红字
				var errMsg = $("<span class='red'>请输入正整数</span>");
				errMsg.insertAfter($(obj));
				$(obj).focus();
				isRightAgentRate = false;
				return false;
			}

			if (parseInt("99999") < parseInt(value)) {
				// append 一行红字
				var errMsg = $("<span class='red'>天数不能大于99999</span>");
				errMsg.insertAfter($(obj));
				$(obj).focus();
				isRightAgentRate = false;
				return false;
			}

			// 小于最长垫款期限
			if (parseInt(agentPayDay) < parseInt(value)) {
				// append 一行红字
				var errMsg = $("<span class='red'>天数不能大于最长垫款期限</span>");
				errMsg.insertAfter($(obj));
				$(obj).focus();
				isRightAgentRate = false;
				return false;
			}

		});

		$("input[name^='feeRate']")
				.each(
						function(i, obj) {
							var value = $(obj).val();
							var sp = $(obj).next();
							if (sp.attr("class") == 'red') {
								sp.remove();
							}

							if (value == null || value == "") {
								var errMsg = $("<span class='red'>请输入费率</span>");
								errMsg.insertAfter($(obj));
								$(obj).focus();
								isRightAgentRate = false;
								return false;
							}

							if (isNaN(value)) {
								// append 一行红字
								var errMsg = $("<span class='red'>格式不正确</span>");
								errMsg.insertAfter($(obj));
								$(obj).focus();
								isRightAgentRate = false;
								return false;
							}

							if (value < 0) {
								// append 一行红字
								var errMsg = $("<span class='red'>请输入大于0的数字</span>");
								errMsg.insertAfter($(obj));
								$(obj).focus();
								isRightAgentRate = false;
								return false;
							}

							// 保留两位小数
							value = parseFloat(value).toFixed(2);
							if (parseFloat(value) > parseFloat("9999999999.99")) {
								// append 一行红字
								var errMsg = $("<span class='red'>请输入小于9999999999.99%的数字</span>");
								errMsg.insertAfter($(obj));
								$(obj).focus();
								isRightAgentRate = false;
								return false;
							}
							$(obj).val(value);
						});

		if (!isRightAgentRate) {
			return;
		}

		var error = '';
		$('font.error[required]').each(function() {
			var name = $(this).attr('for');
			var clength = $('input[name="' + name + '"]:checked').length;
			if (clength == 0) {
				var title = $(this).attr('forTitle');
				error += title + '至少选择一个选项!\n'
			}
		});
		if (error) {
			alert(error);
			return;
		}
		return true;
	}// end validateForm

})// end function($)

function checkTheSameDay(obj1) {
	var day = $(obj1).val();

	var sp = $(obj1).next();
	if (sp.attr("class") == 'red') {
		sp.remove();
	}

	if (day != null && day != "") {
		$("input[name^='repayCompleteDay']").each(function(i, obj) {
			var value = $(obj).val();
			if ($(obj1).attr("id") != $(obj).attr("id")) {

				if (value != null && value != "") {
					if (value == day) {
						var errMsg = $("<span class='red'>天数不能重复</span>");
						errMsg.insertAfter($(obj1));
						$(obj1).focus();
						return false;
					}
				}

			}

		});

	}
}

// 填充 已垫付金额
function setAgentPayedAmt() {
	// 货款金额 - 首付款金额
	var firstPayAmt_f = $('input[name=firstPayAmt]').val();

	// var listTotalPriceAmt = $('input[name=listTotalPriceAmt]').val();
	var realTotalPriceAmt = $('input[name=realTotalPriceAmt]').val();
	var agentPayedAmt_f = $('input[name=agentPayedAmt]').val();
	if (!isNaN(agentPayedAmt_f) && agentPayedAmt_f != '') {
		if (!isNaN(realTotalPriceAmt) && realTotalPriceAmt != '') {
			if (Number(firstPayAmt_f) != parseFloat(
					accSubtr(Number(realTotalPriceAmt),Number(agentPayedAmt_f)))
					.toFixed(2)) {
				Hundsun.PopUtil.alert({
					msg : "已垫款额不等于挂牌付款金额与首付款之差！",
					width : 450,
					timeout : 800,
					type : 'warn'
				});
				return false;
			}
		} else {
			if (Number(firstPayAmt_f) != parseFloat(
					accSubtr(Number(listTotalPriceAmt),Number(agentPayedAmt_f)))
					.toFixed(2)) {
				Hundsun.PopUtil.alert({
					msg : "已垫款额不等于挂牌总价与首付款之差！",
					width : 450,
					timeout : 800,
					type : 'warn'
				});
				return false;
			}
		}

	}
	if (!isNaN(realTotalPriceAmt) && realTotalPriceAmt != '') {
		var agentPayedAmt = accSubtr(realTotalPriceAmt,firstPayAmt_f);
		agentPayedAmt = parseFloat(agentPayedAmt).toFixed(2);
		$('input[name=agentPayedAmt]').val(agentPayedAmt);
	} 
	return true;

}

// 填写挂牌量时，自动填充自小购买量(自动四舍五入保留3位小数)
function changeForminWeight(obj) {
	var listWeight = obj.value;
	if (!isNaN(listWeight)) {
		if (Number(listWeight) <= 0) {
			return;
		}
		if (listWeight.length <= 12) {
			listWeight = parseFloat(listWeight).toFixed(3);
			$("input[name=listWeight]").val(listWeight);
			$("input[name=minWeight]").val(listWeight);
		}
	}

	// 如果 单价和保证金比例不为空 ，则自动计算出 首付款金额
	var agentDepositeRate = $('input[name=agentDepositeRate]').val();

	var listUnitPriceAmt_f = $('input[name=listUnitPriceAmt]').val();
	if (!isNaN(listUnitPriceAmt_f) && listUnitPriceAmt_f != "") {
		var totalPriceAmt = parseFloat(accMul(listWeight,listUnitPriceAmt_f))
				.toFixed(2);
		$('input[name=realTotalPriceAmt]').val(totalPriceAmt);
		$('input[name=listTotalPriceAmt]').val(totalPriceAmt);
		if (!isNaN(agentDepositeRate) && agentDepositeRate != "") {
			var agentDepositeRate_ = parseFloat(Number(accDiv(agentDepositeRate,100)))
					.toFixed(4);
			var firstPayAmt_f = parseFloat(
					accMul(agentDepositeRate_ ,totalPriceAmt))
					.toFixed(2);
			$('input[name=firstPayAmt]').val(firstPayAmt_f);
			$('input[name=agentPayedAmt]').val("");
		}
	}
}

// 格式化 参考市场行情,自动保留2位小数
function changeForReferencePrice() {
	var referencePrice = $('input[name=referencePrice]').val();
	if (referencePrice == null || referencePrice == "") {
		return;
	}
	if (!isNaN(referencePrice)) {
		referencePrice = parseFloat(referencePrice).toFixed(2);
		$('input[name=referencePrice]').val(referencePrice);
	}

}

// 当挂牌单价改变时，自动计算首付款
function changeForfirstPayAmt_f() {
	var listUnitPriceAmt_f = $('input[name=listUnitPriceAmt]').val();
	var agentDepositeRate = $('input[name=agentDepositeRate]').val();
	var listWeight = $('input[name=listWeight]').val();
	var realTotalPriceAmt = $('input[name=realTotalPriceAmt]').val();

	// 将首付款比例 保留2位小数
	if (!isNaN(agentDepositeRate) && agentDepositeRate != "") {
		agentDepositeRate = parseFloat(agentDepositeRate).toFixed(2);
		$('input[name=agentDepositeRate]').val(agentDepositeRate);
	}

	if (!isNaN(listWeight) && !isNaN(agentDepositeRate)
			&& !isNaN(listUnitPriceAmt_f)) {
		if (listUnitPriceAmt_f.length >= 15) {
			return;
		}
		if (Number(listUnitPriceAmt_f) <= 0) {
			return;
		}
		if (Number(listWeight) <= 0) {
			return;
		}
		listUnitPriceAmt_f = parseFloat(listUnitPriceAmt_f).toFixed(2);
		$('input[name=listUnitPriceAmt]').val(listUnitPriceAmt_f);

		var listTotalPriceAmt_f = parseFloat(
				Number(accMul(listUnitPriceAmt_f ,listWeight))).toFixed(2);
		$('input[name=listTotalPriceAmt]').val(listTotalPriceAmt_f);
		$('input[name=realTotalPriceAmt]').val(listTotalPriceAmt_f);
		var agentDepositeRate_ = parseFloat(Number(accDiv(agentDepositeRate ,100)))
				.toFixed(4);
		var firstPayAmt_f = parseFloat(accMul(agentDepositeRate_ ,listTotalPriceAmt_f))
				.toFixed(2);
		$('input[name=firstPayAmt]').val(firstPayAmt_f);
		$('input[name=agentPayedAmt]').val("");

	}

}
// 当挂牌总价变动时，改变挂牌单价

function changeForListUnitPrice() {
	var agentDepositeRate = $('input[name=agentDepositeRate]').val();
	var listWeight = $('input[name=listWeight]').val();
	var listTotalPriceAmt_f = $('input[name=listTotalPriceAmt]').val();
	// 保留2位小数
	// if
	(!isNaN(agentDepositeRate) && agentDepositeRate != "")
	{
		agentDepositeRate = parseFloat(agentDepositeRate).toFixed(2);
		$('input[name=agentDepositeRate]').val(agentDepositeRate);
	}
	if (!isNaN(listWeight) && !isNaN(agentDepositeRate)
			&& !isNaN(listTotalPriceAmt_f)) {
		if (listTotalPriceAmt_f.length >= 15) {
			return;
		}
		if (Number(listTotalPriceAmt_f) <= 0) {
			return;
		}
		if (Number(listWeight) <= 0) {
			return;
		}
		listTotalPriceAmt_f = parseFloat(listTotalPriceAmt_f).toFixed(2);
		$('input[name=listTotalPriceAmt]').val(listTotalPriceAmt_f);

		var listUnitPriceAmt_f = parseFloat(
				Number(accDiv(listTotalPriceAmt_f ,listWeight))).toFixed(2);
		$('input[name=listUnitPriceAmt]').val(listUnitPriceAmt_f);
		var agentDepositeRate_ = parseFloat(Number(accDiv(agentDepositeRate ,100)))
				.toFixed(4);
		var firstPayAmt_f = parseFloat(
				accMul(agentDepositeRate_ ,listTotalPriceAmt_f) )
				.toFixed(2);
		$('input[name=firstPayAmt]').val(firstPayAmt_f);
		$('input[name=agentPayedAmt]').val("");
		$('input[name=realTotalPriceAmt]').val(listTotalPriceAmt_f);
	}
}

function changeForfirstPay() {
	var agentDepositeRate = $('input[name=agentDepositeRate]').val();
	// var listTotalPriceAmt = $('input[name=listTotalPriceAmt]').val();
	var listRealPriceAmt_f = $('input[name=realTotalPriceAmt]').val();
	if (listRealPriceAmt_f == "" || isNaN(listRealPriceAmt_f)) {
		return;
	}
	// 将首付款比例 保留2位小数
	if (!isNaN(agentDepositeRate) && agentDepositeRate != "") {
		agentDepositeRate = parseFloat(agentDepositeRate).toFixed(2);
		$('input[name=agentDepositeRate]').val(agentDepositeRate);
	}
	if (!isNaN(agentDepositeRate) && !isNaN(listRealPriceAmt_f)) {
		if (listRealPriceAmt_f.length >= 15) {
			return;
		}
		var agentDepositeRate_ = parseFloat(Number(accDiv(agentDepositeRate ,100)))
				.toFixed(4);
		if (Number(listRealPriceAmt_f) <= 0) {
			var firstPayAmt_f = parseFloat(
					accMul(agentDepositeRate_ ,listTotalPriceAmt)).toFixed(2);
			$('input[name=firstPayAmt]').val(firstPayAmt_f);
			return;
		}
		listRealPriceAmt_f = parseFloat(listRealPriceAmt_f).toFixed(2);
		$('input[name=realTotalPriceAmt]').val(listRealPriceAmt_f);
		var firstPayAmt_f = parseFloat(accMul(agentDepositeRate_ ,listRealPriceAmt_f))
				.toFixed(2);
		$('input[name=firstPayAmt]').val(firstPayAmt_f);
		$('input[name=agentPayedAmt]').val("");
	}
}

// 格式化 跌价保证金比例数字为 2位小数
function formattePricefallDepositeRate() {
	var pricefallDepositeRate = $('input[name=pricefallDepositeRate]').val();
	if (!isNaN(pricefallDepositeRate) && pricefallDepositeRate != "") {
		pricefallDepositeRate = parseFloat(pricefallDepositeRate).toFixed(2);
		$('input[name=pricefallDepositeRate]').val(pricefallDepositeRate);
	}
}

// 格式化 逾期违约金比例数字为 2位小数
function formatteOverduePayRate() {
	var overduePayRate = $('input[name=overduePayRate]').val();
	if (!isNaN(overduePayRate) && overduePayRate != "") {
		overduePayRate = parseFloat(overduePayRate).toFixed(2);
		$('input[name=overduePayRate]').val(overduePayRate);
	}
}

// 已垫付金额
function formatAgentPayedAmt() {
	var agentPayedAmt = $('input[name=agentPayedAmt]').val();
	var firstPayAmt_f = $('input[name=firstPayAmt]').val();
	// var listTotalPriceAmt = $('input[name=listTotalPriceAmt]').val();
	var realTotalPriceAmt = $('input[name=realTotalPriceAmt]').val();
	if (isNaN(realTotalPriceAmt) || realTotalPriceAmt == '') {
		return;
	}

	if (!isNaN(agentPayedAmt) && agentPayedAmt != '') {
		if (Number(agentPayedAmt) <= 0) {
			return;
		}
		if (agentPayedAmt.length >= 15) {
			return;
		}

		if (Number(agentPayedAmt) != parseFloat(
				accSubtr(Number(realTotalPriceAmt) ,Number(firstPayAmt_f))).toFixed(2)) {
			Hundsun.PopUtil.alert({
				msg : "已垫款额不等于挂牌总价与首付款之差！",
				width : 450,
				timeout : 800,
				type : 'warn'
			});
			$('input[name=agentPayedAmt]').val('');
			return;
		}

		agentPayedAmt = parseFloat(agentPayedAmt).toFixed(2);
		$('input[name=agentPayedAmt]').val(agentPayedAmt);
	}

}

// firstPayAmt 格式化
function formatfirstPayAmt() {
	var firstPayAmt = $('input[name=firstPayAmt]').val();
	if (!isNaN(firstPayAmt)) {
		if (Number(firstPayAmt) <= 0) {
			return;
		}

		if (firstPayAmt.length >= 15) {
			return;
		}

		firstPayAmt = parseFloat(firstPayAmt).toFixed(2);
		/*
		 * var listUnitPriceAmt_f = $('input[name=listUnitPriceAmt]').val(); var
		 * listWeight = $('input[name=listWeight]').val();
		 */
		// var listPrice = $('input[name=listTotalPriceAmt]').val();
		var realListPrice = $('input[name=realTotalPriceAmt]').val();

		if (!isNaN(realListPrice) && realListPrice != "") {
			var sumAmt = parseFloat(realListPrice).toFixed(2);
			if (parseFloat(firstPayAmt) > parseFloat(sumAmt)) {
				alert("首付款金额不能大于总货款");
				$('input[name=firstPayAmt]').val("");
				$('input[name=firstPayAmt]').focus();
				return;
			}
		}else{
			return;
		}
		$('input[name=firstPayAmt]').val(firstPayAmt);
		var firstPayRadio = parseFloat(accMul(accDiv(firstPayAmt,realListPrice),100))
				.toFixed(2);
		$('input[name=agentDepositeRate]').val(firstPayRadio);
	}
}

// 检查挂牌重量与最小购买量是否相等，相等时只能整件下单且不能修改
function checkWeight() {
	var listWeight = $('input[name=listWeight]').val();
	var minWeight = $('input[name=minWeight]').val();
	if (Number(minWeight) > Number(listWeight)) {
		alert("最小购买量不能大于挂牌量！");
		$('input[name=minWeight]').focus();
		return;
	}

	if (Number(minWeight) == Number(listWeight)) {
		document.getElementById("isWholeOrder0").disabled = true;
		$("input[name=isWholeOrder]:eq(1)").attr("checked", 'checked');
	} else {
		document.getElementById("isWholeOrder0").disabled = false;
	}
}

// 选择交收仓库
function setWHCvalue() {
	var warehouseCmp = $("#warehouseCmp").val();
	var warehouseCmpAddress = $("#warehouseCmp").find("option:selected").text();

	if (warehouseCmp != null) {
		var str = warehouseCmp.split("|");
		/*
		 * if(str[0]=="-1"){
		 * document.getElementById("warehouseCmpName").readOnly=false;
		 * $('input[name=warehouseCmpName]').val(""); }else{
		 * document.getElementById("warehouseCmpName").readOnly=true;
		 * $('input[name=warehouseCmpName]').val(warehouseCmpAddress); }
		 */
		$('input[name=warehouseCmpId]').val(str[0]);
		$('input[name=warehouseCmpAddress]').val(str[1]);
		$('input[name=warehouseCmpName]').val(warehouseCmpAddress);
		$('input[name=settlementAddr]').val(str[1]);
	}
}

// 指定交收库,交收仓库切换时，可以记录之前的输入值
var oldSelwhname = "", oldSelwhAddr = "", oldwhId = "-1"; // 已填写交收库的名称和地址
function isDirectWH() {
	var isDirectWhc = $('input[name=isDirectWhc]:checked').val();
	if (isDirectWhc == "1") { // 指定交收库
		$("input[name=warehouseCmpId]").val(oldwhId);
		$('input[name=warehouseCmpAddress]').val(oldSelwhAddr);
		$('input[name=settlementAddr]').val(oldSelwhAddr);
		$('input[name=warehouseCmpName]').val(oldSelwhname);

		document.getElementById("warehouseCmpTd").style.display = "";
		document.getElementById("whcmpInfo").style.display = "none";
		// $('#warehouseCmp').val("");

		$('input[name=deliveryType]').each(function() {
			if ($(this).val() == "1") {
				if ($(this).is(":hidden")) {
					$(this).show();
					$(this).attr("checked", false);
					$(this).next().show();
				}
			}
		});
	} else {
		oldSelwhname = $('input[name=warehouseCmpName]').val();
		oldSelwhAddr = $('input[name=settlementAddr]').val();
		oldwhId = $("input[name=warehouseCmpId]").val();

		document.getElementById("warehouseCmpTd").style.display = "none";
		document.getElementById("whcmpInfo").style.display = "";
		document.getElementById("warehouseCmpNameS").readOnly = false;
		document.getElementById("settlementAddrS").readOnly = false;

		$('input[name=deliveryType]').each(function() { // 非指定交收库，不能选择场内交收 add
			// by housl 2014-3-27
			if ($(this).val() == "1") {
				$(this).attr("checked", false);
				$(this).next().hide();
				$(this).hide();
			}
		});
	}
}

// 提交前，如果是非指定交收库，设置交收库名称和地址
/*
 * function unDirectWH(){ var isDirectWhc=
 * $('input[name=isDirectWhc]:checked').val(); if(isDirectWhc=="0"){ //非指定交收库
 * $("input[name=warehouseCmpId]").val("-1");
 * $('input[name=warehouseCmpAddress]').val($('input[name=settlementAddrS]').val());
 * $('input[name=settlementAddr]').val($('input[name=settlementAddrS]').val());
 * $('input[name=warehouseCmpName]').val($('input[name=warehouseCmpNameS]').val()); } }
 */

// 选择交收方式
function setWHValue() {
	var deliveryType = getDeliveryTypeCKValue(); // $('#deliveryType').val();
	var listingType = $("#listingType").val();
	if (listingType != "W" && listingType != "F") {
		if (deliveryType.indexOf("1") >= 0) {
			$("input[name=isDirectWhc]:eq(1)").attr("checked", 'checked');
			document.getElementById("isDirectWhc1").disabled = true;
			document.getElementById("isDirectWhc0").disabled = true;
		} else {
			document.getElementById("isDirectWhc1").disabled = false;
			document.getElementById("isDirectWhc0").disabled = false;
		}

		oldSelwhname = $('input[name=warehouseCmpName]').val();
		oldSelwhAddr = $('input[name=settlementAddr]').val();
		oldwhId = $("input[name=warehouseCmpId]").val();

		isDirectWH();
	}
}

// 选择品种后 创建表单.
function createTableByVariety(fn) {
	var varietyTypeCode = $("input[name=varietyCode]").val();// 从隐藏域中获取 品种编码
	var weightUnitType = $("input[name=weightUnitType]").val();// 从隐藏域中获取 重量单位
	var priceUnitType = $("input[name=priceUnitType]").val();// 从隐藏域中获取 金额单位
	// alert(priceUnitType);
	jQuery
			.get(
					appServer + '/agentListing/init_form.htm?'
							+ Math.round((Math.random()) * 100000000), // url
					Hundsun.FormUtils.getFormValues('form_step2'), // 待发送
					// Key/value
					// 参数
					function(data) { // callback 载入成功时回调函数。
						var htmlCode = '', fullName = "";
						var varietyTypeDTO = data.varietyTypeDTO;
						var project = data.listingProject;
						var msg = data.msg;
						if (msg != null) {
							Hundsun.PopUtil.alert({
								msg : msg,
								width : 450,
								timeout : 800,
								type : 'warn'
							})
							document.getElementById("form_step2_submit").style.display = "none";
							return;
						}
						if (varietyTypeDTO == null) {
							Hundsun.PopUtil.alert({
								msg : "没有找到品种信息，不能挂牌！",
								width : 450,
								timeout : 800,
								type : 'warn'
							})
							document.getElementById("form_step2_submit").style.display = "none";
							return;
						} else {
							fullName = varietyTypeDTO.shortName;
							$('#varietyType').html(varietyTypeDTO.fullName);
							$('#varietyName').html(varietyTypeDTO.name);
						}

						// 常规物品属性列表
						var WP = data.attrData.WP_LIST;
						// 规格属性列表
						var GG = data.attrData.GG_LIST;
						// 交易属性列表(只显示一部分)
						var JY = data.attrData.JY_LIST;
						// 交收属性列表
						// var JS = data.attrData.JS_LIST;
						// 交收库
						var WHCk = data.whclist;

						if (WP == "") {
							Hundsun.PopUtil.alert({
								msg : "该品种未配置属性，不能挂牌！",
								width : 450,
								timeout : 800,
								type : 'warn'
							})
							document.getElementById("form_step2_submit").style.display = "none";
							return;
						}
						if (WHCk == "") {
							Hundsun.PopUtil.alert({
								msg : "未加载到交收库信息，不能挂牌！",
								width : 450,
								timeout : 800,
								type : 'warn'
							})
							document.getElementById("form_step2_submit").style.display = "none";
							return;
						}

						formHtml = '<fieldset><legend>常规物品属性</legend><table class="c3">';
						jQuery(WP).each(function(i) {
							creatForm(this, i, WP.length, fullName, project);
						});
						formHtml = formHtml + "</table></fieldset>";
						htmlCode = htmlCode + formHtml;

						formHtml = '<fieldset><legend>物品规格属性</legend><table class="c3">';
						jQuery(GG).each(function(i) {
							creatForm(this, i, GG.length, fullName, project);
						});

						formHtml = formHtml + "</table></fieldset>";

						htmlCode = htmlCode + formHtml;

						formHtml = '<fieldset><legend>委托代理属性</legend><table class="c3">';
						// jQuery(JY).each(function
						// (i){creatForm(this,i,JY.length,fullName,project)});

						formHtml = formHtml
								+ "<tr><th  width=\"12%\"><span style=\"color:red\">*</span>挂牌量：</th>"
								+ "<td width=\"30%\">"
								+ "<input type=\"text\"  id=\"listWeight\" name=\"listWeight\" "
								+ "value=\"\"  onblur=\"changeForminWeight(this);\" "
								+ "class=\"inpt required {minlength:0,maxlength:12,number:true,min:0,max:99999999.999}\" style=\"width:126px;\" /> "
								+ (weightUnitType == null ? "吨"
										: weightUnitType)
								+ " <span class=\"red\"></span>" + "</td>";

						formHtml = formHtml
								+ "<th  width=\"12%\"><span style=\"color:red\">*</span>挂牌单价：</th>"
								+ " <td width=\"30%\">"
								+ "<input type=\"text\"  id=\"listUnitPriceAmt\" name=\"listUnitPriceAmt\" "
								+ "value=\"\" onblur=\"changeForfirstPayAmt_f();\" "
								+ "class=\"inpt required {minlength:0,maxlength:15,number:true,min:0,max:999999999999.99}\" style=\"width:126px;\" /> "
								+ (priceUnitType == null ? "元/吨"
										: priceUnitType)
								+ " <span class=\"re\"></span>" + "</td> </tr>";

						formHtml = formHtml
								+ "<th  width=\"12%\"><span style=\"color:red\">*</span>挂牌总价：</th>"
								+ "<td width=\"25%\">"
								+ "<input type=\"text\" id=\"listTotalPriceAmt\" name=\"listTotalPriceAmt\" "
								+ "value=\"\" onblur=\"changeForListUnitPrice();\" "
								+ "class=\"inpt required {minlength:0,maxlength:15,number:true,min:0,max:999999999999.99}\" style=\"width:126px;\" /> "
								+ " 元" + " <span class=\"red\"></span>"
								+ "</td>";

						formHtml = formHtml
								+ "<th  width=\"12%\"><span style=\"color:red\">*</span>付款金额：</th>"
								+ " <td width=\"25%\" >"
								+ "<input type=\"text\"  id=\"realTotalPriceAmt\" name=\"realTotalPriceAmt\" "
								+ "value=\"\"  onblur=\"changeForfirstPay();\" "
								+ "class=\"inpt {minlength:0,maxlength:15,number:true,min:0,max:999999999999.99}\" style=\"width:126px;\" />"
								+ " 元" + " <span class=\"red\"></span>"
								+ "</td> </tr>";

						// 最小购买量 等于 挂牌量 .
						formHtml = formHtml
								+ "<tr><th  width=\"12%\"><span style=\"color:red\">*</span>最小购买量:</th>"
								+ "<td width=\"30%\">"
								+ "<input type=\"text\"  id=\"minWeight\" name=\"minWeight\" "
								+ "value=\"\"  readOnly=\"false\" "
								+ "class=\"inpt required {minlength:0,maxlength:12,number:true,min:0,max:99999999.999}\" style=\"width:126px;\" /> "
								+ (weightUnitType == null ? "吨"
										: weightUnitType)
								+ " <span class=\"red\"></span>" + "</td>";

						formHtml = formHtml
								+ "<th  width=\"12%\">数量 ：</th>"
								+ " <td width=\"30%\" >"
								+ "<input type=\"text\"  id=\"listNum\" name=\"listNum\" "
								+ "value=\"\"  "
								+ "class=\"inpt {minlength:0,maxlength:10,digits:true,min:1,max:9999999999}\" style=\"width:126px;\" /><span class=\"red\"></span>"
								+ "</td> </tr>";

						formHtml = formHtml
								+ "<tr><th  width=\"12%\"><span style=\"color:red\">*</span>首付款金额:</th>"
								+ "<td width=\"30%\">"
								+ "<input type=\"text\"  id=\"firstPayAmt\" name=\"firstPayAmt\" "
								+ "value=\"\" onblur=\"formatfirstPayAmt();\" "
								+ "class=\"inpt required {minlength:0,maxlength:15,number:true,min:0,max:999999999999.99}\" style=\"width:126px;\" /> 元 <span class=\"red\"></span>"
								+ "</td>";

						formHtml = formHtml
								+ "<th  width=\"12%\"><span style=\"color:red\">*</span>首付款比例 ：</th>"
								+ " <td width=\"30%\">"
								+ "<input type=\"text\"  id=\"agentDepositeRate\" name=\"agentDepositeRate\" "
								+ "value=\"20\" onblur=\"changeForfirstPayAmt_ff();\" "
								+ "class=\"inpt required {minlength:0,maxlength:10,number:true,min:0.01,max:100.00}\" style=\"width:126px;\" /> %<span class=\"red\"></span>"
								+ " <select id='firstPayPaytype' name='firstPayPaytype'><option value='0'>线上支付</option><option value='1'>线下支付</option></select>  "// 支付方式
								+ "</td> </tr>";

						formHtml = formHtml
								+ "<tr><th  width=\"12%\"> 已垫款金额：</th>"
								+ "<td width=\"30%\">"
								+ "<input type=\"text\"  id=\"agentPayedAmt\" name=\"agentPayedAmt\" "
								+ "value=\"\" onblur=\"formatAgentPayedAmt();\" "
								+ "class=\"inpt {minlength:0,maxlength:15,number:true,min:0,max:999999999999.99} \" style=\"width:126px;\" /> 元<span class=\"red\"></span>"
								+ "</td>";

						formHtml = formHtml
								+ "<th  width=\"12%\"><span style=\"color:red\">*</span>最长垫款期限：</th>"
								+ " <td width=\"30%\">"
								+ "<input type=\"text\"  id=\"agentContractDeadline\" name=\"agentContractDeadline\" "
								+ "value=\"\" "
								+ "class=\"inpt required {minlength:0,maxlength:10,digits:true,min:1,max:999}\"  style=\"width:126px;\" />天<span class=\"red\"></span></td> </tr>";

						formHtml = formHtml
								+ "<tr><th width=\"12%\"><span style=\"color:red\">*</span>跌价保证金比例:</th>"
								+ " <td width=\"30%\">"
								+ "<input type=\"text\" id=\"pricefallDepositeRate\" name=\"pricefallDepositeRate\" onblur=\"formattePricefallDepositeRate();\" "
								+ "class=\"inpt required {minlength:0,maxlength:10,number:true,min:0.01,max:999999999999.99}\" style=\"width:126px;\" /> %<span class=\"red\"></span>"
								+ "</td> ";

						formHtml = formHtml
								+ "<th width=\"12%\"><span style=\"color:red\">*</span>逾期违约金比例:</th>"
								+ " <td width=\"30%\">"
								+ "<input type=\"text\"  id=\"overduePayRate\" name=\"overduePayRate\" onblur=\"formatteOverduePayRate();\" "
								+ "class=\"inpt required {minlength:0,maxlength:10,number:true,min:0.01,max:999999999999.99}\" style=\"width:126px;\" /> <font style='font-family:Lucida Sans Unicode' size='2'>&#8241;</font><span class=\"red\"></span>"
								+ "</td>  </tr>";

						// 指定委托人
						formHtml = formHtml
								+ "<tr><th width=\"12%\"><span style=\"color:red\">*</span>指定委托人： </th>"
								+ "<td width=\"30%\">"
								+ "<input name=\"directUserCompanyName\" readOnly=\"false\" class=\"inpt required \" style=\"width:80px;\" type=\"text\" id=\"directUserCompanyName\" /> "
								+ "<a href=\"javascript:void(0);\" class=\"button-2\" id=\"selectBuyer\" onclick=\"selectBuyerClick();return false; \">选择</a>"
								+ "<span class=\"red\"></span></td>";

						var ops = "<option value=\"\">--请选择--</option>";
						jQuery(WHCk)
								.each(
										function(n) {// 此时查询的是 WH_WAREHOUSE表
											var tmpAddr = WHCk[n].address;
											if (tmpAddr == null) {
												tmpAddr = "";
											}
											tmpAddr = tmpAddr.replace(/null/g,
													"");
											if ((project != null && project.warehouseCmpId == WHCk[n].id)) {
												ops = ops
														+ "<option selected value=\""
														+ WHCk[n].id + "|"
														+ tmpAddr + "\">"
														+ WHCk[n].name
														+ "</option>";
												$(
														'input[name=warehouseCmpAddress]')
														.val(tmpAddr);
												$('input[name=settlementAddr]')
														.val(tmpAddr);
												$('input[name=warehouseCmpId]')
														.val(WHCk[n].id);
												$(
														'input[name=warehouseCmpName]')
														.val(WHCk[n].name);
											} else {
												ops = ops + "<option value=\""
														+ WHCk[n].id + "|"
														+ tmpAddr + "\">"
														+ WHCk[n].name
														+ "</option>";
											}
										})

						formHtml = formHtml
								+ "<th width=\"12%\"><span style=\"color:red\">*</span>交收仓库：</th>"
								+ "<td width=\"30%\" id = \"warehouseCmpTd\"><select id = \"warehouseCmp\" name = \"warehouseCmp\" onchange=\"setWHCvalue();\"   style=\"width:126px;\"  class=\" required  \">"
								+ ops
								+ "</select><span class=\"red\"></span></td></tr>";

						formHtml = formHtml
								+ "<tr><th width=\"12%\"><span style=\"color:red\">*</span>参考市场行情:</th>"
								+ "<td width='80%' colspan='3'>"
								+ "<textarea name=\"referencePrice\"  class='required' id=\"referencePrice\" cols=\"45\" rows=\"2\" maxlength=\"30\" ></textarea><span class=\"red\"></span>"
								+ "</td></tr>";

						formHtml = formHtml + "</table></fieldset>";

						htmlCode = htmlCode + formHtml;

						formHtml = '<fieldset><legend>代理费率属性</legend><table class="c3">'
								+ "<tr><th width=\"100\" style='vertical-align:middle;'>一般代理费：<input type='hidden'  name='rateType' value='01' /></th><td colspan='3'>"
								+ "<p id='rateItem'>天数：<input type='text' class='inpt' id='0' name='repayCompleteDay' onblur='checkTheSameDay(this)' />&nbsp;&nbsp;费率：<input type='text' class='inpt' name='feeRate' />%&nbsp;&nbsp;"
								+ "<a href='javascript:void(0);' class='button-2' onclick='addNewRateItem(this)' name='addItem'>增加明细</a></p></td></tr>"
								+ "<tr><th width=\"100\">调增代理费：<input type='hidden' name='rateType' value='02' /></th><td colspan='3'>费率：<input type='text' class='inpt' name='feeRate' />%</td></tr>";
						formHtml = formHtml + "</table></fieldset>";
						htmlCode = htmlCode + formHtml;

						formHtml = '<fieldset><legend>其他属性</legend><table class="c3">'
								+ "<tr><th width=\"100px\">备注信息：</th>"
								+ "<td><textarea name=\"remark\" id=\"remark\" cols=\"80\" rows=\"4\" maxlength=\"340\" title=\"请不要超过340的长度\"></textarea><span class=\"red\"></span></td></tr>";
						formHtml = formHtml + "</table></fieldset>";

						htmlCode = htmlCode + formHtml;

						// alert(htmlCode);

						$('#listingTable').html(htmlCode);

						/*
						 * $("input[name=isWholeOrder][value=0]").attr("checked",true);
						 */
						// 交收截止日期默认为当前日期+1
						var settlementDate = getSettleDate();
						addDays(settlementDate, 1);
						$("#settlementDate").val(
								Hundsun
										.formatDate(settlementDate,
												"yyyy-MM-dd"));

						// 判断交收方式，是否可以选择“全款结算场外交收”，
						// 只有信用卖家,且具有全款支付功能，在用保证金挂牌和信用挂牌时能选择。add by hsl
						// 2012-12-04
						// 库存挂牌时可以具有全款支付功能 add by hsl
						// 2013-6-17；非库存现有量挂牌挂牌与库存挂牌相同
						/*
						 * var deliveryType3Show = false; if(
						 * $("#isFullPayment").val()=="1" &&
						 * $("#isCreditTrade").val()=="1"){
						 * if($("#listingType").val() =="D" ||
						 * $("#listingType").val() =="G" ||
						 * $("#listingType").val() =="W" ||
						 * $("#listingType").val() =="F"){
						 * deliveryType3Show=true; } }
						 * 
						 * if(deliveryType3Show==false){
						 * $('input[name=deliveryType]').each(function(){
						 * if($(this).val()=="3"){ $(this).next().hide();
						 * $(this).remove(); } }); }
						 */

						if (fn) {
							fn.call();
							/*
							 * var projectListingType= null==project ? "" :
							 * project.listingType; if((receiptId!=null &&
							 * receiptId!="") || projectListingType=="W" ||
							 * projectListingType=="F"){
							 * //如果是非库存现有量挂牌，只能选择指定交收仓库
							 * if(projectListingType!="F"){
							 * document.getElementById("warehouseCmp").disabled=true;
							 * document.getElementById("warehouseCmpTd").style.display=""; }
							 * document.getElementById("whcmpInfo").style.display="none";
							 * $("input[name=isDirectWhc]:eq(1)").attr("checked",'checked');
							 * if(projectListingType!="F"){
							 * document.getElementById("isDirectWhc1").disabled=true; }
							 * document.getElementById("isDirectWhc0").disabled=true;
							 * 
							 * if(projectListingType=="W" ||
							 * projectListingType=="F"){
							 * //库存挂牌，只允许全款结算场外交收和线下结算场外交收，再加个预付款结算
							 * $('input[name=deliveryType]').each(function(){
							 * if($(this).val()=="1" || $(this).val()=="2"){
							 * $(this).next().hide(); $(this).remove(); } }); }
							 * 
							 * if(receiptId!=null && receiptId!=""){
							 * document.getElementById("material").style.display="none";
							 * var material=
							 * $("#material").find("option:selected").text();
							 * document.getElementById("material_select").innerHTML=material;
							 * //仓单挂牌时，交收库和交收默认选择
							 * $('input[name=deliveryType]').each(function(){
							 * if($(this).val()!="1"){ $(this).next().hide();
							 * $(this).remove(); } }); } }
							 */
						}
						if ($("#manufacuturer")) {// 选择生产商
							var readAttr = $("#manufacuturer").attr("readOnly");
							if (readAttr
									&& (readAttr == "readOnly"
											|| readAttr == "readonly" || readAttr == "true")) {
							} else {
								$("#manufacuturer")
										.after(
												" <a href='#0' class='producer' id='btn_open' onclick='selectCoop();'>选择</a>&nbsp;&nbsp;<a href='#0' class='producer' id='btn_open' onclick='saveProducers();'>保存</a>");
							}
						}

					} // end callback
			);
}

function creatForm(attr, i, length, varietyFullName, project) {
	var inputType = attr.keyType;// 类型
	var isRequired = attr.isRequired;// 是否必选
	var groupType = attr.groupType;// 属性组类型；F=常规；D=动态
	var valueValidate = attr.valueValidate == null ? "" : attr.valueValidate;// 验证表达式
	var clas = isRequired == "1" ? "required" : "";// 验证样式
	clas = clas + "  " + valueValidate;
	var value = "", readOnly = "", unitType = "";

	if (i % 2 == 0) {
		appendHtml = '<tr>';
	}
	// 判断是否必填
	if (isRequired == "1") {
		appendHtml = appendHtml + " <th  width=\"12%\">"
				+ "\<span style=\"color:red\">*</span>" + attr.keyTitle
				+ "：</th>";
	} else {
		appendHtml = appendHtml + " <th  width=\"12%\">" + attr.keyTitle
				+ "：</th>";
	}

	if (attr.keyCode == "varietyCode") {
		value = varietyFullName;
		attr.keyCode = "varietyName";
	}
	if (attr.keyCode == "listUnitPrice") {
		attr.keyCode = "listUnitPrice_num";
	}

	if (attr.unitType == null || typeof attr.unitType == "undefined") {
		unitType = "";
	} else {
		unitType = attr.unitType;
	}

	// 新增时品种属性设置默认值.挂牌常规属性的value为挂牌主表的对应字段值
	if (groupType == "F") {// 常规属性
		if (project && project.listingType == "C") {
			value = project[attr.keyCode] == null ? "" : project[attr.keyCode];
			if (attr.keyCode != "minWeight" && attr.keyCode != "settlementDate"
					&& attr.keyCode != "billRemark"
					&& attr.keyCode != "listUnitPrice_num") {
				readOnly = "readOnly";
			}
		} else {
			if (attr.keyCode == "varietyName") {
				readOnly = "readOnly";
			}
		}
		if (project
				&& (project.listingType == "W" || project.listingType == "F")) {
			value = project[attr.keyCode] == null ? "" : project[attr.keyCode];
		}
	}

	if (value == "") {
		if (attr.text == null || typeof attr.text == "undefined") {
			value = "";
		} else {
			value = attr.text;
		}
	}

	appendHtml = appendHtml + "<td width=\"30%\">";
	// 输入框为文本框
	if (inputType == "TEXT") {
		var onblurFunc = "";
		if (attr.keyCode == "listWeight" || attr.keyCode == "minWeight") {
			onblurFunc = 'onblur="checkWeight();"';
			var listingType = $("#listingType").val();
			if (listingType == "W" && attr.keyCode == "listWeight") {
				readOnly = "readOnly";
			}
		}
		if (attr.keyCode == "listUnitPrice_num"
				&& $("#listUnitPriceF").val() != "") {
			value = parseFloat(Number($("#listUnitPriceF").val() / 100))
					.toFixed(2)
					+ "";
		}
		appendHtml = appendHtml + "<input type=\"text\"  id=\"" + attr.keyCode
				+ "\" name=\"" + attr.keyCode + "\" value=\"" + value + "\"  "
				+ readOnly + " " + onblurFunc + " class=\"inpt  " + clas
				+ "\" style=\"width:126px;\" />" + unitType
				+ " <span class=\"red\"></span>";
	} else if (inputType == "DATE") {
		// 格式日期
		if ((value + "").indexOf("-") >= 0) {

		} else {
			value = Hundsun.formatDate(value, "yyyy-MM-dd")
		}
		if (project && project.listingType == "C"
				&& attr.keyCode != "settlementDate"
				&& attr.keyCode == "productionDate") {
			appendHtml = appendHtml
					+ "<input type=\"text\" maxlength=\"100\" id=\""
					+ attr.keyCode
					+ "\" name=\""
					+ attr.keyCode
					+ "\" readOnly  value=\""
					+ value
					+ "\"  "
					+ readOnly
					+ " class=\"inpt "
					+ clas
					+ "\" style=\"width:126px;\" /> <span class=\"red\"></span>";
		} else {
			appendHtml = appendHtml
					+ "<input type=\"text\" maxlength=\"100\" id=\""
					+ attr.keyCode
					+ "\" name=\""
					+ attr.keyCode
					+ "\" readOnly onClick=\"WdatePicker()\" value=\""
					+ value
					+ "\"  "
					+ readOnly
					+ " class=\"inpt "
					+ clas
					+ "\" style=\"width:126px;\" /> <span class=\"red\"></span>";
		}
	} else if (inputType == "TEXTAREA") {// 输入框为文本域
		appendHtml = appendHtml + "<textarea rows=\"2\" cols=\"30\"  id=\""
				+ attr.keyCode + "\" name=\"" + attr.keyCode
				+ "\" class=\"inpt " + clas + "\" >" + value
				+ "</textarea><span class=\"red\"></span>";
	} else if (inputType == "DATETIME") {
		// 格式日期
		if ((value + "").indexOf("-") >= 0) {

		} else {
			value = Hundsun.formatDate(value, "yyyy-MM-dd HH:mm:ss")
		}
		appendHtml = appendHtml
				+ "<input type=\"text\" maxlength=\"100\" id=\""
				+ attr.keyCode
				+ "\" name=\""
				+ attr.keyCode
				+ "\" readOnly onClick=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})\" value=\""
				+ value + "\"  " + readOnly + " class=\"inpt " + clas
				+ "\" style=\"width:126px;\" /> <span class=\"red\"></span>";
		// 选择框
	} else if (inputType == "CHECKBOX" || inputType == "SELECT"
			|| inputType == "RADIO") {
		var attr_values = attr.text == null ? "" : attr.text.split("\n");
		if (inputType == "CHECKBOX") {
			var clickFunc = "";
			if (attr.keyCode == "deliveryType") {
				clickFunc = 'onclick="setWHValue();"';
			}

			jQuery(attr_values).each(
					function(j) {
						var arrval = attr_values[j] == null ? ""
								: attr_values[j].split("|");
						// 设置CHECKBOX默认选择项
						if (value && value.indexOf(arrval[0]) >= 0) {
							appendHtml = appendHtml
									+ "<input type=\"checkbox\" name=\""
									+ attr.keyCode + "\" value=\"" + arrval[0]
									+ "\" " + clickFunc
									+ " class=\"inp \" /> <font>" + arrval[1]
									+ "</font>";
						} else {
							appendHtml = appendHtml
									+ "<input type=\"checkbox\" name=\""
									+ attr.keyCode + "\" value=\"" + arrval[0]
									+ "\" " + clickFunc
									+ " class=\"inp \" /> <font>" + arrval[1]
									+ "</font>";
						}

					});
			if (isRequired == "1") {
				appendHtml += '<font class="error" required generate"true" style="display:none" for="'
						+ attr.keyCode
						+ '" forTitle="'
						+ attr.keyTitle
						+ '">至少选择一个选项</font>';
			}
		} else if (inputType == "SELECT") {
			var clickFunc = "";
			if (attr.keyCode == "deliveryType") {
				clickFunc = 'onchange="setWHValue();"';
			}
			// 下拉框
			appendHtml = appendHtml + "<select id=\"" + attr.keyCode
					+ "\"  name=\"" + attr.keyCode + "\" class=\"select  "
					+ clas + "\" " + clickFunc + " style=\"width:130px;\">";
			// appendHtml = appendHtml + "<option value=\"\">请选择</option>";
			jQuery(attr_values).each(
					function(j) {
						var arrval = attr_values[j] == null ? ""
								: attr_values[j].split("|");
						// 修改时设置SELECT默认选择项
						if (value == arrval[0]) {
							appendHtml = appendHtml + "<option value=\""
									+ arrval[0] + "\" selected>" + arrval[1]
									+ "</option>";
						} else {
							appendHtml = appendHtml + "<option value=\""
									+ arrval[0] + "\">" + arrval[1]
									+ "</option>";
						}
					});
			appendHtml = appendHtml + "</select><span id=\"" + attr.keyCode
					+ "_select\"></span><span class=\"red\"></span>";
		} else if (inputType == "RADIO") { // console.log(attr_values);
			// 单选按钮
			jQuery(attr_values).each(
					function(j) {
						var arrval = attr_values[j] == null ? ""
								: attr_values[j].split("|");
						var clickFunc = "";
						if (attr.keyCode == "deliveryType") {
							clickFunc = 'onclick="setWHValue();"';
						}
						// 修改时设置RADIO默认选择项
						if (value == arrval[0]) {
							appendHtml = appendHtml
									+ "<input type=\"radio\" id=\""
									+ attr.keyCode + j + "\" name=\""
									+ attr.keyCode + "\" value=\"" + arrval[0]
									+ "\"  " + clickFunc
									+ "  checked class=\"inp\" /> " + arrval[1]
									+ "&nbsp;&nbsp;";
						} else {
							appendHtml = appendHtml
									+ "<input type=\"radio\" id=\""
									+ attr.keyCode + j + "\" name=\""
									+ attr.keyCode + "\" value=\"" + arrval[0]
									+ "\"   " + clickFunc
									+ " class=\"inp\" /> " + arrval[1]
									+ "&nbsp;&nbsp;";
						}
					});
			appendHtml = appendHtml + "<span class=\"red\"></span>";
			if (isRequired == "1") {
				appendHtml += '<font class="error" required generate"true" style="display:none" for="'
						+ attr.keyCode
						+ '" forTitle="'
						+ attr.keyTitle
						+ '">至少选择一个选项</font>';
			}
		}
		// 文件类型
	} else if (inputType == "FILE") {
		appendHtml = appendHtml
				+ "<input type=\"file\" maxlength=\"255\" name=\""
				+ attr.keyCode
				+ "_file\" value=\""
				+ value
				+ "\" class=\"inpt  "
				+ clas
				+ "\" style=\"width:126px;\" /><span  style=\"margin-left:70px;\" class=\"red\"></span>";
	}
	appendHtml = appendHtml + "</td>";
	if (i % 2 == 1 || i == length - 1) {
		appendHtml = appendHtml + "</tr>";
		formHtml = formHtml + appendHtml;
	}
}

/**
 * 日期添加value天
 * 
 * @param date
 * @param value
 */
function addDays(date, value) {
	date.setDate(date.getDate() + value);
}

/**
 * 获取交收截止日期，当前日期从后台获取
 * 
 * @returns
 */
function getSettleDate() {
	var str = $("#serverCurrTime").val();
	if (str != null) {
		try {
			var settleDateStr = str.substring(0, 10);
			settleDateStr = settleDateStr.replace(/-/g, "/");
			var settleDate = new Date(Date.parse(settleDateStr));
			return settleDate;
		} catch (e) {
			return new Date();
		}
	} else {
		return new Date();
	}
}

function defaultEndDate() {
	var str = $("#serverCurrTime").val();
	if (str != null) {
		return str;// return str.substring(0,10)+" 23:59";
	} else {
		return Hundsun.formatDate(new Date(), "yyyy-MM-dd");// +" 23:59";
	}

}

function getMinStartDate() {
	var str = $("#serverCurrTime").val();
	if (str != null) {
		return str; // return str.substring(0,10)+" 00:00";
	} else {
		return Hundsun.formatDate(new Date(), "yyyy-MM-dd"); // +" 00:00";
	}
}

// 获取选择的交收方式的值
function getDeliveryTypeCKValue() {
	var arr_v = new Array();

	$('input[name=deliveryType]:checked').each(function() {
		arr_v.push($(this).val());
	});
	return arr_v.join(',');
}
var num = 0.6
function addNewRateItem(a) {
	$("#rateItem")
			.append(
					"<p style='margin-top:5px;'><input type='hidden' name='rateType' value='01' />天数：<input type='text' id='"
							+ (num++)
							+ "' class='inpt' onblur='checkTheSameDay(this)' name='repayCompleteDay' />&nbsp;&nbsp;费率：<input type='text' class='inpt' name='feeRate' />%&nbsp;&nbsp;"
							+ "<a href='javascript:void(0);' class='button-2' onclick='deleteItem(this)' >删除本行</a>"
							+ "<a href='javascript:void(0);' class='button-2' onclick='addNewRateItem(this)' style='margin-left:10px;' name='addItem'>增加明细</a></p>")
	$(a).hide();
}

function deleteItem(a) {
	var arr = $(a).parent().parent().find("a[name='addItem']");
	var obj = arr[arr.length - 2];
	Hundsun.PopUtil.confirm({
		msg : "是否要删除本行？"
	}, function() {
		if ($(a).parent().next().html() == null) {
			$(obj).show();
		}
		$(a).parent().remove();
	});
}

function changeForfirstPayAmt_ff() {
	var agentDepositeRate = $('input[name=agentDepositeRate]').val();
	var realTotalPriceAmt = $('input[name=realTotalPriceAmt]').val();

	// 将首付款比例 保留2位小数
	if (!isNaN(agentDepositeRate) && agentDepositeRate != "") {
		agentDepositeRate = parseFloat(agentDepositeRate).toFixed(2);
		$('input[name=agentDepositeRate]').val(agentDepositeRate);
	}

	if (!isNaN(agentDepositeRate) && agentDepositeRate != ""
			&& !isNaN(realTotalPriceAmt) && realTotalPriceAmt != "") {

		var agentDepositeRate_ = parseFloat(Number(accDiv(agentDepositeRate ,100)))
				.toFixed(4);
		var firstPayAmt_f = parseFloat(accMul(agentDepositeRate_ ,realTotalPriceAmt))
				.toFixed(2);
		$('input[name=firstPayAmt]').val(firstPayAmt_f);
		$('input[name=agentPayedAmt]').val("");

	}
}
