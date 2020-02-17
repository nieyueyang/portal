$(function() {
	// 合并第一列数据
	$('#tb_list').tablesMergeCell({
		cols : [ 0 ]
	});
	$("#companyId").multiselect({
		height : 170,
		noneSelectedText : "全部",
		checkAllText : "全选",
		uncheckAllText : '全不选',
		selectedList : 1,
		close:function(){
			prodructClassPost();
		}
	});
	 $("#ext").multiselect({
		height : 200,
		noneSelectedText : "全部",
		checkAllText : "全选",
		uncheckAllText : '全不选',
		selectedList : 1
	});
	if(null!=queryCompanyId && "null"!=queryCompanyId){
		var comArr = [];
		comArr.push(queryCompanyId);
		setSelect("#companyId",comArr);
		$("#companyId").multiselect("refresh");
		prodructClassPost();
	}
	if(null!=queryCompanyIds && ""!=queryCompanyIds){
		var companyIds = queryCompanyIds.replace(/[ ]/g,"");
		var companyIds = companyIds.replace('[','').replace(']','').split(",");
		setSelect("#companyId",companyIds)
		$("#companyId").multiselect("refresh");
		prodructClassPost();
	}
});


/**
 * 获取产线
 * 
 * @param obj
 */
function getProductLine(obj) {
	var productClass = obj.value;
	var companyId = $("#companyId").val();
	prodructLinePost(companyId, productClass);

}
/**
 * 获取产品类别post方法
 * 
 * @param companyId
 */
function prodructClassPost() {
	var companyId = $("#companyId").val();
	$("#productClass").html("<option value=''>全部</option>");
	$("#ext").html("");
	jQuery.ajax({
		type: "POST",
        url: "ajax/getProductCategories.htm?companyId="+companyId,
        success: function(data){
        	var html = '';
    		$.each(data, function(index, domEle) {
    			if (queryProdructClass == domEle) {
    				html = html + "<option value='" + domEle + "' selected>"
    						+ domEle + "</option>"
    			} else {
    				html = html + "<option value='" + domEle + "'>" + domEle
    						+ "</option>";
    			}
    		});
    		$("#productClass").append(html);
    		prodructLinePost(companyId,queryProdructClass);
        }
	});
}


function prodructLinePost(companyId, productClass) {
	var cxs = queryExts.replace(/[ ]/g,"");
	var s = cxs.replace('[','').replace(']','').split(",");
	if (null != companyId && null != productClass) {
		var initHtml = "";
		$("#ext").html("");
		jQuery.ajax({
			type: "POST",
	        url: "ajax/getProductLine.htm?companyId="+companyId+"&productClass="+productClass,
	        success: function(data){
	        	var html = '';
	    		$.each(data, function(index, domEle) {
	    			html = html + "<option value='" + domEle + "' >"+ domEle + "</option>"
	    		});
	    		$("#ext").append(html);
	    		if(s.length>1){
	    			setSelect("#ext",s);
	    		}
	    		if(null!=queryExt){
	    			var extArr = [];
					extArr.push(queryExt);
	    			setSelect("#ext",extArr);
	    		}
				$("#ext").multiselect("refresh");
	        }
		});
	}
}
function setSelect(id,s){
	 $(id+' option').each(function(i,content){
      if(jQuery.inArray(jQuery.trim(content.value),s)>=0){
           this.selected=true;
      }
   });
}
/**
 * 弹窗
 * 
 * @param id
 */
function openwindow(id) {
	if ($("#dhyf").val() == "") {
		alert("月份不能为空");
	} else {
		$('#searchForm').submit();
		loadPopup(id);
		centerPopup();
	}
}