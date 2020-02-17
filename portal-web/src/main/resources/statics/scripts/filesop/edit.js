/*jQuery(function() {
	// $("#city").sectionSelect();
	$("#city").sectionSelect({
		url : "../scripts/project/all_upload_project.json",
		aSection : '$!aSection', // 省份
		bSection : '$!bSection', // 城市
		cSection : '$!cSection', // 区县
		nodata : "none" // 当子集无数据时，隐藏select
	});
});*/

// 验证标题
function validateTitle() {
	var tit = $("#tit").val();
	if (null != tit && "" != tit) {
		if (/^\s+$/gi.test(tit)) {
			var d = dialog({
				align : 'left',
				content : '不能全为空格!',
				quickClose : true
			});
			d.show(document.getElementById('tit'));
			return false;
		}
		if (tit.length > 85) {
			var d = dialog({
				align : 'left',
				content : '标题长度超过85个字!',
				quickClose : true
			});
			d.show(document.getElementById('tit'));
			return false;
		}
	} else {
		var d = dialog({
			align : 'left',
			content : '请输入标题!',
			quickClose : true
		});
		d.show(document.getElementById('tit'));
		return false;
	}
	return true;
}

// 验证下拉列表
function validateProject() {
	var aSection = $("#aSection").val();
	var bSection = $("#bSection").val();
	var cSection = $("#cSection").val();
	var dSection = $("#dSection").val();
	console.log(aSection);
	console.log(bSection);
	console.log(cSection);
	console.log(dSection);
	if (null != aSection && "" != aSection) {
		if (null != bSection && "" != bSection) {
			if (null != cSection && "" != cSection) {
				if(null != dSection && "" != dSection){
					$("#uploadProject").val(aSection + "-" + bSection + "-" + cSection+"-"+dSection);
				}else{
					$("#uploadProject").val(aSection + "-" + bSection + "-" + cSection);
				}
			} else {
				$("#uploadProject").val(aSection + "-" + bSection);
			}
		} else {
			$("#uploadProject").val(aSection);
		}
		return true;
	} else {
		var d = dialog({
			align : 'left',
			content : '请选择上传栏目!',
			quickClose : true
		});
		d.show(document.getElementById('project'));
		return false;
	}

}

function isSubmit(form) {
	if (validateTitle() && validateProject()) {
		$("#uploadfiles").attr("style", "color:gray");
		$("#uploadfiles").attr("disabled", "disabled");
		jQuery('#saveForm').submit();
	}

}

function selectSec(obj) {
	var nextLevelId = "";
	if(obj.id=="aSection"){
		nextLevelId = "bSection";
	}else if(obj.id == "bSection"){
		nextLevelId = "cSection";
	}else if(obj.id == "cSection"){
		nextLevelId = "dSection";
	}
	$(obj).nextAll().remove();
	jQuery.get("selectNextLevel.htm", {"code" : obj.value}, function(data) {
		console.log(data);
		if (data.length > 0) {
			var startLevel = "<select class=\"aSection\" id =\""+nextLevelId+"\"  onchange=\"selectSec(this)\" style=\"width:160px\">"
						 +"<option value=''>--请选择--</option>";
			var endLevel = "</select><span></span>";
			var cenLevel = "";
			$.each(data,function(index,ele){
				cenLevel = cenLevel + "<option value="+ele.sectionCode+">"+ele.sectionName+"</option>"
			 });
			$("#city").append(startLevel+cenLevel+endLevel);
		}
	});
}



