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
	 var itemIds = "";//库存明细ID集合
	 var orgBatchNos = "";//移库库存明细batchNo集合
	 $(ckList).each(function(){
		 $(this).attr("checked",isCK);
		 if(isCK){
			 itemIds += $(this).next().val() + ",";
			 orgBatchNos += $(this).prev().val() + ",";
		 }
	 });
	 var tR=$(element).prev();
	 var tH=$(element).next();
	 $(tR).val(itemIds);
	 $(tH).val(orgBatchNos);
}
/**
 * 选择明细，单个
 */
function selItem(element){
	var isCK = element.checked;
	//货品详情的table元素
	var dT=$(element).parent().parent().parent().parent();
	var itemIds = "";//库存明细ID集合
	var orgBatchNos = "";//移库库存明细batchNo集合
	 //查找到checkbox列表
	var ckList = $(dT).find("input[name='ck_list']:not(:disabled):checked"); 
	$(ckList).each(function(){
		itemIds += $(this).next().val() + ",";
		orgBatchNos += $(this).prev().val() + ",";
	});
	 var tR=$(element).parent().parent().parent().prev();
	 var tE = $(tR).find("input[name='inItems']");
	 $(tE).val(itemIds);
	 var tH = $(tR).find("input[name='batchNoItems']");
	 $(tH).val(orgBatchNos);
	 
}

/**
 * 移库申请
 */
function moveWhinventory(element,whId){
	 var tR=$(element).parent().parent().next();
	 var tE = $(tR).find("input[name='inItems']");
	 var itemIds = $(tE).val();
	$("#itemIds").val(itemIds);
	var tH = $(tR).find("input[name='batchNoItems']");
	$("#orgBatchNos").val($(tH).val());
	$("#VId").val(whId);
	if(itemIds.length>0){
		$("#edit_bid").dialog( "open" );
	}else{
		Hundsun.PopUtil.alert({msg:'请先选择',width:450,timeout:800,type:'warn'})
	}
	
}

$(function() {
	$("#edit_bid").dialog({
			autoOpen: false,
			width: 550,
			modal: true,
			title: "移库申请",
			buttons: {
				"确定": function() {
					  if( $("#contractNo").val()==''  )
                     {  
                	    $("#contractNoMsg").html("此项必填");
                	 	return;
                     }    
					 $( this ).dialog( "close" );
					$('#editForm').submit();
				},
				"返回": function() {
					$( this ).dialog( "close" );
				}
			}
		});
});