var  viewContract = viewContract || {
	enterRepay:function(){
		$("#enterRepay").click(function(){
			viewContract.fieldsetHide();
			$("#enterRepay").addClass("cursor");
			$("#enterRepay_fieldset").show();
		});
	},
	enterPick:function(){
		$("#enterPick").click(function(){
			viewContract.fieldsetHide();
			$("#enterPick").addClass("cursor");
			$("#enterPick_fieldset").show();
		});
	},
	clickContractDetail:function(){
		$("#contractDetail").click(function(){
			viewContract.fieldsetHide();
			$("#contractDetail").addClass("cursor");
			$("#contractDetail_fieldset").show();
		});
	},
	clickEnterWahourse:function(){
		$("#enterWahourse").click(function(){
			viewContract.fieldsetHide();
			$("#enterWahourse").addClass("cursor");
			$("#enterWahourse_fieldset").show();
		});
	},
   clickContractAudit:function(){
		$("#contractAudit").click(function(){
			viewContract.fieldsetHide();
			$("#contractAudit").addClass("cursor");
			$("#contractAudit_fieldset").show();
		});
	},
	clickContractUpdate:function(){
		$("#contractUpdate").click(function(){
			viewContract.fieldsetHide();
			$("#contractUpdate").addClass("cursor");
			$("#contractUpdate_fieldset").show();
		});
	},
	fieldsetHide:function(){
		$("#enterWahourse").removeClass("cursor");
		$("#contractDetail").removeClass("cursor");
		$("#enterPick").removeClass("cursor");
		$("#enterRepay").removeClass("cursor");
		$("#contractAudit").removeClass("cursor");
		$("#contractUpdate").removeClass("cursor");
		$("#enterWahourse_fieldset").hide();
		$("#contractDetail_fieldset").hide();
		$("#enterPick_fieldset").hide();
		$("#enterRepay_fieldset").hide();
		$("#contractAudit_fieldset").hide();
		$("#contractUpdate_fieldset").hide();
		
	}
}


$(function(){
	viewContract.fieldsetHide();
	viewContract.enterRepay();
	viewContract.enterPick();
	viewContract.clickContractDetail();
	viewContract.clickEnterWahourse();
	viewContract.clickContractAudit();
	viewContract.clickContractUpdate();
	$("#contractDetail").addClass("cursor");
	$("#contractDetail_fieldset").show();
});

/**
 * 展示或者收藏申请明细信息
 * 
 * @param element
 */
function showApplyDetail(element) {
	var detailTr = $(element).parent().parent().next();
	var imgSrc = $(element).attr("src");
	if (imgSrc.match("plus_noLine.gif") != null) {
		$(element).attr("src",
				appServer + "/scripts/zTree/zTreeStyle/img/minus_noLine.gif");
		$(detailTr).show();
	} else {
		$(detailTr).hide();
		$(element).attr("src",
				appServer + "/scripts/zTree/zTreeStyle/img/plus_noLine.gif");
	}
}

