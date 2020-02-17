var replacement = replacement ||{
	dialog:function(){
		$("#replacementDialog").dialog({
			autoOpen : false,
			bgiframe : true,
			modal : true,
			position : [300, 100],
			width : 850,
			minHeight : 450,
			title : "选择换入的商品",
			buttons : {
				"取消" : function() {
					$(this).dialog("close");
				},
				"确定": function() {
					replacement.selectGoods();
					$(this).dialog("close");
				}
			}
		});
	},
	selectGoods:function(){
		var sgs = $("input[name='goodsId']:checked");
		var html = "";
		var gIds = $("input[name='swappedId']");
		var flag = 0;
		$(sgs).each(function (index, domEle) { 
			 flag = 0;
			var id=$(domEle).val();
			$(gIds).each(function(i,t){
				if(id==$(t).val()){
					flag = 1;
				}
			});
			//var unitPriceIn = $(domEle).attr("unitPriceIn");
			//alert("换入价："+unitPriceIn);
			if(flag==0){
				var tr =$(domEle).parent().parent()
				html+="<tr> <td>品种：";
				html+=$(tr).find("td").eq(0).html();
				html+="</td><td >物料描述：";
				html+=$(tr).find("td").eq(1).html();
				html+="</td><td >当前可用(吨)：";
				html+=$(tr).find("td").eq(4).html();
				html+="<td>换入重量：<input type='text'  id='swappedWeight'  name='swappedWeight'  val='"+$(tr).find("td").eq(4).html()+"'/>";
				html+="<input type='hidden'  id='swappedId'  name='swappedId'  value='"+id+"' /></td>"
				//unitPriceIn='"+unitPriceIn+"'
				html+="<td><a class='del'>删除</a></td>"
				html+="</tr>";
			}
		});
		$("#hrsp").append(html);
	},
	bind:function(){
		$("#replacementDialog").bind("dialogclose", function(event, ui) {
			$(this).empty();
		});
		
		$("#replacementDialog").bind("dialogopen", function(event, ui) {
			$("#replacementDialog").load(appServer
					        + "/contract/agent/ajax/good_list.htm?contracrId="+$("#contractId").val());
		});	
		
	},
	showGoodsDialog:function(){
		$("#btnOpenWin").click(function(){
			$("#replacementDialog").dialog("open");
		});
	},
	delrow:function(){//删除换入数据的行
		$(".del").live("click", function(){
			$(this).parent().parent().remove();
		});
	},
	saveReplacement:function(){//保存换货
		$(".saveReplacement").click(function(){
			var swappedWeightArray ="";
			var swappedIdArray = "";
			var swappedOutIdArray ="";
			var swappedOutWeightArray ="";
			var swappedIds =new Array();
			
			var flag = 0;
			if($("#hrsp:has(tr)").length>0){//有选择换入商品
				var swappedWeight = $("input[name='swappedWeight']");
				var swappedId = $("input[name='swappedId']");
				$(swappedId).each(function(i,d){
					swappedIds.push($(d).val());
				});
				
				$(swappedWeight).each(function(i,d){
					if($(d).val()==''){
						alert("换入商品第"+(parseInt(i)+parseInt(1))+"条数据不能为空，如果不想换入请删除！");
						flag=1;
						return false;
					}else{//如果有值验证数据格式跟是否大于最大可换入重量
						if(!validate3num($(d).val())){
							alert("换入商品第"+(parseInt(i)+parseInt(1))+"条数据格式不对，只能是带3位小数的数字");
							flag=1;
							return false;
						}else {/*if($(d).val()!=""&&validate3num($(d).val())&&$(d).val()>0){
							/*var unitPriceIn = $(d).attr("unitPriceIn");
				      		if(isNaN(unitPriceIn)){
				      			unitPriceIn=0;
				      		}else{
				      			unitPriceIn = parseFloat(unitPriceIn);
				      		}
				      		alert("换入价12："+unitPriceIn);
				      		if(!(unitPriceIn>0 )){
				      			alert("换入商品第"+(parseInt(i)+parseInt(1))+"条数据的货品单价为空或者为0，必须先维护结算单价才能换货申请，请联系代理方");
								flag=1;
								return false;
				      		}*/
				      		
				      		
							if(($(d).val()-$(d).attr("val"))>0){
								alert("换入商品第"+(parseInt(i)+parseInt(1))+"条数据不能大于剩余重量！");
								flag=1;
								return false;
							}
						}
						swappedWeightArray = (swappedWeightArray +$(d).val()) + (((i + 1)== swappedWeight.length) ? '':','); 
						swappedIdArray =  (swappedIdArray +swappedIds[i]) + (((i + 1)== swappedWeight.length) ? '':','); 
					}
				});
			}else{
				alert("请选择要换入的商品！");
				flag=1;
				return false;
			}
			if(flag){
				return false;
			}
			
			//验证换出商品
			var swappedOut = $("input[name='swappedOutWeight']");
			var swappedOutId = $("input[name='swappedOutId']");
			var swappedOutIds =new Array();
			var swappedOutFlag = 0;//是否有换出商品
			$(swappedOutId).each(function(i,d){
				swappedOutIds.push($(d).val());
			});
			var whid = 0;//仓库ID
			var numflag = 0;//是否有大于可提货重量的数据
			var nummsg = "";
			$(swappedOut).each(function(i,d){
				if($(d).val()!=""){
					//判断仓库ID是否相同
					if(whid==0){
						whid = $(d).attr("whid");
					}
					swappedOutFlag = 1;
					var unitPriceOut = $(d).attr("unitPriceOut");
		      		if(isNaN(unitPriceOut)){
		      			unitPriceOut=0;
		      		}else{
		      			unitPriceOut = parseFloat(unitPriceOut);
		      		}
		      		if(!(unitPriceOut>0 )){
		      			alert("换出商品第"+(parseInt(i)+parseInt(1))+"条数据的货品单价为空或者为0，必须先维护结算单价才能换货申请，请联系代理方");
		      			swappedOutFlag=-1;
						return false;
		      		}
		      		
					if(!validate3num($(d).val())){
						alert("换出商品第"+(parseInt(i)+parseInt(1))+"条数据格式不对，只能是带3位小数的数字");
						swappedOutFlag=-1;
						return false;
					}
					if($(d).val()<=0){
						alert("换出商品第"+(parseInt(i)+parseInt(1))+"条数据不能小于或等于0");
						swappedOutFlag=-1;
						return false;
					}
					
					if(($(d).val()-$(d).attr("val"))>0){
						numflag = 1;
						nummsg += (parseInt(i)+parseInt(1))+",";
					}
					
					
					 swappedOutWeightArray = (swappedOutWeightArray +$(d).val()) + (((i + 1)== swappedOut.length) ? '':','); 
					 swappedOutIdArray =  (swappedOutIdArray +swappedOutIds[i]) + (((i + 1)== swappedOut.length) ? '':','); 
				}
			});
			
			if(swappedOutFlag==0){
				alert("请输入换出商品！");
				return false;
			}
			$(swappedOut).each(function(i,d){
				if($(d).val()!=""){
					if(whid!=$(d).attr("whid")){
						alert("只能选择一个仓库的数据换出");
						swappedOutFlag=-1;
						return false;
					}
				}
			});
			if(swappedOutFlag==1){//有数据且没有错误提示
				if(numflag==1){
					nummsg = nummsg.substring (0,nummsg.lastIndexOf(','));
					nummsg = "换出商品第"+nummsg+"条数据不能大于剩余重量！";
				}
				Boxy.confirm(nummsg+"确定要换货吗", function() {
					_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
				jQuery.post(appServer + '/contract/agent/doaddreplacement.htm', {
					"contractId":$("input[name='contractId']").val()	,
					"swappedWeight": swappedWeightArray,
					"swappedId":swappedIdArray,
					"swappedOutWeight":swappedOutWeightArray,
					"swappedOutId":swappedOutIdArray
				}, function(v) {
					if (v.result == 'true') {
						Hundsun.PopUtil.alert({
							msg : '操作成功！',
							autohide : true,
							type:'success',
							width : 350,
							timeout : 800,
							callback : function() {
								Hundsun.UrlUtil
								.redirect("/contract/agent/toreplacement_"+$("input[name='contractId']").val()+".htm");
							}
						});

					} else {
						if(_msg) {_msg.hide();}
						Hundsun.PopUtil.alert({
							msg : v.msg,
							width : 450,
							timeout : 800,
							type : 'warn'
						})
					}
				}, 'json');
			});
			}
		});
	},
	
	subAudit:function(){
		$(".subAudit").click(function(){
			var id = $(this).attr("val");
			Boxy.confirm("确定要提交审核吗", function() {
				_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
				jQuery.post(appServer + '/contract/agent/dosubaudit.htm', {
					"id":id,"status":"2"
				}, function(v) {
					if (v.result == 'true') {
						Hundsun.PopUtil.alert({
							msg : '操作成功！',
							autohide : true,
							type:'success',
							width : 350,
							timeout : 800,
							callback : function() {
								Hundsun.UrlUtil
								.redirect("/contract/agent/toreplacement_"+$("input[name='contractId']").val()+".htm");
							}
						});

					} else {
						if(_msg) {_msg.hide();}
						Hundsun.PopUtil.alert({
							msg : v.msg,
							width : 450,
							timeout : 800,
							type : 'warn'
						})
					}
				}, 'json');
			});
		});
	},
	proxyaudit:function(){
		$(".proxyaudit").click(function(){
			var id = $(this).attr("val");
			var status = $(this).attr("status");
			var str = "";
			if(status==3){
				str = "审核不通过";
			}else{
				str = "审核通过";
			}
			Boxy.confirm("确定要"+str+"吗", function() {
				_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
				jQuery.post(appServer + '/contract/agent/doproxyaudit.htm', {
					"id":id,"status":status
				}, function(v) {
					if (v.success == true) {
						Hundsun.PopUtil.alert({
							msg :v.msg,
							autohide : true,
							type:'success',
							width : 350,
							timeout : 800,
							callback : function() {
								Hundsun.UrlUtil.refresh();
							}
						});

					} else {
						if(_msg) {_msg.hide();}
						Hundsun.PopUtil.alert({
							msg : v.msg,
							width : 450,
							timeout : 800,
							type : 'warn'
						})
					}
				}, 'json');
			});
		});
	}
}

function searchGoods(){
	$("#replacementDialog").load(
			appServer
				     + "/contract/agent/ajax/good_list.htm",
			$("#whForm").serializeArray());
}

$(function(){
	replacement.dialog();
	replacement.bind();
	replacement.showGoodsDialog();
	replacement.delrow();
	replacement.saveReplacement();
	replacement.subAudit();
	replacement.proxyaudit();
});

/**
 * 展示或者收藏申请明细信息
 * 
 * @param element
 */
function showApplyDetail(element) {
	var detailTr = $(element).parent().parent().next();
	var imgSrc = $(element).attr("src");
	if (imgSrc.endWith("plus_noLine.gif")) {
		$(element).attr("src",
				appServer + "/scripts/zTree/zTreeStyle/img/minus_noLine.gif");
		$(detailTr).show();
	} else {
		$(detailTr).hide();
		$(element).attr("src",
				appServer + "/scripts/zTree/zTreeStyle/img/plus_noLine.gif");
	}
}
String.prototype.endWith = function(str) {
	var reg = new RegExp(str + "$");
	return reg.test(this);
}
validate3num = function(num){
	var reg = /^[+]?\d*\.?\d{1,3}$/;  
	return reg.test(num);
}
