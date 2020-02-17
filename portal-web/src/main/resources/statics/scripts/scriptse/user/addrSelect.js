var isDistrictExist = false;
var isCityExist = false;

function getCityList(url) {
	removeOpions("districtCode");
	removeOpions("cityCode");
	jQuery("#city").val('');
	jQuery("#district").val('');
	//初始化城市、地区数据是否存在标志位
	isCityExist = false;
	isDistrictExist = false;
	//jQuery("#districtCode").hide();
	//jQuery("#cityCode").hide();
	var code = jQuery("#provinceCode").val();
	var item = jQuery('#provinceCode option:selected').html();
	jQuery("#province").val(item);
	//如果取到city数据，显示city下拉框显示
	if(getRegionData("cityCode", 2, code, url)) {
		//jQuery("#cityCode").show();
		//城市数据是否存在标志位
		isCityExist = true;
	}
	if(getRegionData("districtCode", 3, code, url)) {
		//jQuery("#districtCode").show();
		setDistrict();
		//区域数据是否存在标志位
		isDistrictExist = true;
	}
}

function getDistrictList(url) {
	removeOpions("districtCode");
	jQuery("#district").val('');
	isDistrictExist = false;
	//jQuery("#districtCode").hide();
	var code = jQuery("#cityCode").val();
	var item = jQuery('#cityCode option:selected').html();
	jQuery("#city").val(item);
	if(getRegionData("districtCode", 3, code, url)) {
		//jQuery("#districtCode").show();
		setDistrict();
		//区域数据是否存在标志位
		isDistrictExist = true;
	}
}

function setDistrict() {
	var item = jQuery('#districtCode option:selected').html();
	jQuery("#district").val(item);
}

function getRegionData(targetId, regionType, parentCode, reqUrl) {
	var url = reqUrl + "?regionType=" + regionType + "&code=" + parentCode;
	var res;
	jQuery.ajax({
		type : "GET",
		async : false,
		url : url,
		success : function(data) {
			res = renderSelectOption(targetId, data, true);
		}
	});
	return res;
}

/**
 * 渲染select框数据，如有，返回true，若没数据，返回false
 * @param targetId
 * @param data
 * @param haveInitOption
 * @returns {Boolean}
 */
function renderSelectOption(targetId, data, haveInitOption) {
	removeOpions(targetId);
	jQuery("#" + targetId).append("<option value=''>请选择</option>");
	if(null != data && data.length > 0) {
		for ( var i = 0; i < data.length; i++) {
			jQuery("#" + targetId).append(
					"<option value='" + data[i].code + "'>" + data[i].regionName
							+ "</option>");
		}
		return true;
	}
	return false;
}

function removeOpions(targetId) {
	jQuery("#" + targetId).empty();
}

$(function(){
	//jQuery("#provinceCode").val("");
})