String.prototype.endWith=function(str){     
  var reg=new RegExp(str+"$");     
  return reg.test(this);        
}

/**
 * 展示或者收藏明细信息
 * @param element
 */
function showGoodsDetail(element){
	var detailTr = $(element).parent().parent().next();
	var imgSrc=$(element).attr("src");
	if(imgSrc.endWith("plus_noLine.gif")){ 
		$(element).attr("src",appServer+"/scripts/zTree/zTreeStyle/img/minus_noLine.gif");
		$(detailTr).show();
	}else{
		$(detailTr).hide();
		$(element).attr("src",appServer+"/scripts/zTree/zTreeStyle/img/plus_noLine.gif");
	}
}

/**
 * 全选,选择明细
 */
function selAllItems(element){
	 var isCK = element.checked;
	 //货品详情的table元素
	 var dT=$(element).parent().parent().parent().parent();
	 //查找到checkbox列表
	 var ckList = $(dT).find("input[name='ck_list']:not(:disabled)"); 
	 if($(ckList).size()==0){  //没有库存明细
		 return ;
	 }
	 //var selItemIds = "";  //选择明细id
	 var selWeight = 0;
	 $(ckList).each(function(){
		 $(this).attr("checked",isCK);
		 if(isCK){
			 //selItemIds += $(this).attr("class")+",";
			 selWeight += parseFloat(this.value);
		 }
	 });
	 //var po=$(element).parents("tr").find("input[name='listWeight']");
	 var tR=$(dT).parent().parent().prev();
	 var tE = $(tR).find("input[name='listWeight']");
	 
	 selWeight = parseFloat(selWeight.toFixed(3));
	 $(tE).val(selWeight);
	 //$(tE).attr("class",selItemIds);
}
/**
 * 选择明细，单个
 */
function selItem(element){
	var isCK = element.checked;
	//货品详情的table元素
	var dT=$(element).parent().parent().parent().parent();
	var tR=$(dT).parent().parent().prev();
	var tE = $(tR).find("input[name='listWeight']");
	
	var selWeight = 0;
	//var selItemIds = "";  //选择明细id
	 //查找到checkbox列表
	var ckList = $(dT).find("input[name='ck_list']:not(:disabled):checked"); 
	$(ckList).each(function(){
		//selItemIds += $(this).attr("class")+",";
		selWeight += parseFloat(this.value);
	});
	selWeight = parseFloat(selWeight.toFixed(3));
	 $(tE).val(selWeight);
	 //$(tE).attr("class",selItemIds);
	
}

/**
 * 库存挂牌
 */
function toListProject(element,whId,canUseWeight){
	/**
	 * 卷板业务挂牌时提交批次号
	 */
	if($("#varietyType").val() == 2){
		var ckList = $(element).parent().parent().next().find("input[name='ck_list']:not(:disabled):checked");
		if($(ckList).size()==0){//没有库存明细
			Hundsun.PopUtil.alert({msg:'请选择库存明细;',width:450,timeout:800,type:'warn'});
			return false;
		}else{
			var itemIds = "";
			$(ckList).each(function(){
				itemIds += $(this).next().val() + ",";
			});
			$("#whInventoryItemIds").val(itemIds);
		}
	}
	
	var tE = $(element).prev();
	var listingWeight = $(tE).val(); //挂牌重量
	if(parseFloat(listingWeight) <  0.001){
		Hundsun.PopUtil.alert({msg:'请输入一个最小为 0.001 的值;',width:450,timeout:800,type:'warn'});
		return;
	}
	if(parseFloat(listingWeight) >  9999999999){
		Hundsun.PopUtil.alert({msg:'挂牌重量不能大于9999999999吨;',width:450,timeout:800,type:'warn'});
		return;
	}
	
	var reg = eval("/^[\\-+]?\\d+\\.?\\d{0,3}[0]*$/");//N位有效小数
	if(reg.test(listingWeight)){
		if(parseFloat(listingWeight) <= parseFloat(canUseWeight)){
			$("#whInventoryId").val(whId);
			$("#listWeight").val(listingWeight);
			$("#toListing").submit();
		}else{
			Hundsun.PopUtil.alert({msg:'挂牌重量不能大于当前可用量;',width:450,timeout:800,type:'warn'})
		}
	}else{
		//autohide : true,
		Hundsun.PopUtil.alert({msg:'挂牌重量输入错误;请输入正确的数字，且小数位数不超过3位;',width:450,timeout:800,type:'warn'})
	}
	
}

/**
 * 切换库存页面tab标签
 * @param varietyType
 */
function tabSwitch(varietyType){
	if(varietyType == 1){
		$("#cckc").removeClass("cursor").addClass("cursor");
		$("#jbkc").removeClass("cursor");
		$("#varietyType").val("1");
	}else if(varietyType == 2){
		$("#cckc").removeClass("cursor");
		$("#jbkc").removeClass("cursor").addClass("cursor");
		$("#varietyType").val("2");
	}
	$('#whForm').submit();
}