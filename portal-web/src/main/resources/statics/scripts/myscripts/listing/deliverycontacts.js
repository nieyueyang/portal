$(function() {
	contactsDialogValidator = $("#preInputForm").validate({
		submitHandler : function(form) {

		},
		rules : {
			lastAddr : {
				province : true,
				city : true,
				district : true,
				lastAddr : true,
				maxlength : 80
			},
			contacts : {
				required : true,
				maxlength : 20
			},
			mobile : {
				required : true,
				maxlength : 11,
				mobile : true
			},
			qq : {
				maxlength : 20,
				qq : true
			}
		},
		messages : {
			lastAddr : {
				required : "请填写详细地址"
			},
			logisticsCompanyId : {
				required : "提货方式为物流配送时此项必填"
			}
		},
		errorPlacement : function(error, element) {
			(element.parent().find("span.error")).replaceWith(error);
		},
		errorElement : "span"
	});

	if ($.browser.msie) {
		$("input[name='radio_contacts']").click(function() {
			this.blur();
			this.focus();
		});
	}
	
	$("input[name='radio_contacts']").click(function() {
		chooseContacts();
	});
})
function addContacts() {
	var hasRequired = false;
	if ($("select[name='logisticsCompanyId']").hasClass("required")) {
		hasRequired = true;
		$("select[name='logisticsCompanyId']").removeClass("required");
	}
	if (!contactsDialogValidator.form()) {
		if (hasRequired) {
			$("select[name='logisticsCompanyId']").addClass("required");
		}
		return;
	}
	if (hasRequired) {
		$("select[name='logisticsCompanyId']").addClass("required");
	}
	var province = $(
			"#preInputForm select[name='provinceCode'] option:selected").html();
	var city = $("#preInputForm select[name='cityCode'] option:selected")
			.html();
	var district = $(
			"#preInputForm select[name='districtCode'] option:selected").html();
	var firstAddr = province + city + district;
	$("#preInputForm input[name='firstAddr']").val(firstAddr);
	$.ajax({
		contentType : "application/json; charset=gbk",
		cache : false
	})

	$("#commonContactsDiv").load(
			appServer + "/listing/contacts/ajax/insert.htm?t="
					+ new Date().getTime(),
			$("#preInputForm").serializeArray(), null);
}

function deleteContacts(id) {
	if (confirm("确定要删除该常用联系人？")) {

		$.ajax({
			contentType : "application/json; charset=gbk",
			cache : false
		})

		$("#commonContactsDiv").load(
				appServer + "/listing/contacts/ajax/delete.htm?t="
						+ new Date().getTime(), {
					"id" : id
				}, null);
	}
}

function chooseContacts() {
	var $radio = $("input[name='radio_contacts']:checked");

	$("#preInputForm input[name='contacts']").val(
			$radio.parent().find("input[name='common_contacts']").val());
	$("#preInputForm select[name='provinceCode']").val(
			$radio.parent().find("input[name='common_provinceCode']").val());
	getCityList(appServer + "/user/getRegionList.htm");
	$("#preInputForm select[name='cityCode']").val(
			$radio.parent().find("input[name='common_cityCode']").val());
	getDistrictList(appServer + "/user/getRegionList.htm");
	$("#preInputForm select[name='districtCode']").val(
			$radio.parent().find("input[name='common_districtCode']").val());
	$("#preInputForm input[name='lastAddr']").val(
			$radio.parent().find("input[name='common_lastAddr']").val());
	$("#preInputForm input[name='qq']").val(
			$radio.parent().find("input[name='common_qq']").val());
	$("#preInputForm input[name='mobile']").val(
			$radio.parent().find("input[name='common_mobile']").val());
}