var formHtml;
var appendHtml = '';

jQuery(function(){
	createTableByVariety(null,null,null,null,null,chanageSubmit);
})
//提交
function chanageSubmit(){
	
	var form = $('#form_quick').validateForm({
			errorPlacement: function(error, element) {
	            element.siblings("span").css({"color":"red"}).text(error.text());
	        },
	        success: function(label) {
	            label.text("");
	        },
	        rules:{
	        	//'listUnitPrice_num':{'max':9999999999},
	        	'listUnitPrice_num':{'min':0.01,'max':9999999999},
	        	'listNum':{'max':9999999999},
	        	//'listNum':{'min':1,'max':9999999999},
	        	'manufacuturer':{'maxlength':40},
	        	'grade':{'maxlength':40},
	        	'orgin':{'maxlength':30},
	        	'brand':{'maxlength':10},
	        	'warehouseCmpNameS':{'maxlength':25},
	        	'settlementAddrS':{'maxlength':50},
	        	'standard':{'maxlength':40},
	        	'packing':{'maxlength':120},
	        	'length':{'maxlength':12},
				'priceApproval':{'maxlength':30},
	        	'width':{'maxlength':12},
	        	'thickness':{'maxlength':12},
	        	'listNum':{'maxlength':9},
	        	//'listWeight':{'max':999999999},
	        	'listWeight':{'min':0.001,'max':99999999999},
	        	//'minWeight':{'max':999999999},
	        	'minWeight':{'min':0.001,'max':99999999999},
	        	'batchNo':{'maxlength':40}
	        },
	        submitHandler:function(f) {
	        	unDirectWH();
	        	if(validateForm()){
	        		//快速挂牌时，表单验证通过把当前记录的id置为空
	        		$("input[name=id]").val(null);
	        		f.submit();
	        	}
	        }
	    });
	
	//设置挂牌时默认  材质、宽度、长度、厚度/直径、规格
	 var materialW = $("#materialW").val();
	  var widthW = $("#widthW").val();
	  var lengthW = $("#lengthW").val();
	  var thicknessW = $("#thicknessW").val();
	  var specificationW = $("#specificationW").val();
	  
	  addOptionValue('material',materialW,materialW);
	  addOptionValue('width',widthW,widthW);
	  addOptionValue('length',lengthW,lengthW);
	  addOptionValue('thickness',thicknessW,thicknessW);
	  addOptionValue('specification',specificationW,specificationW);
}
//校验数据
function validateForm(){
	  var listUnitPrice = $('input[name=listUnitPrice]').val();
	  var listNum = $('input[name=listNum]').val();
	  var minWeight = $('input[name=minWeight]').val();
	  var listWeight = $('input[name=listWeight]').val();
	  var listingDatesStr = $('input[name=listingDatesStr]').val();
	  var listingDateeStr = $('input[name=listingDateeStr]').val();
	  var settlementDate = $('input[name=settlementDate]').val();
	  var isDirect =  $('input[name=isDirect]:checked').val();
	  var isWholeOrder =  $('input[name=isWholeOrder]:checked').val();
	  var deliveryType =  getDeliveryTypeCKValue();  //$("#deliveryType").val();
	  var warehouseCmp =  $("#warehouseCmp").val();
	  var image =  $('input[name=image_file]').val();
	  var patn = /\.jpg$|\.jpeg$|\.gif$|\.png$/i;
	  var listingType= $('input[name=listingType]:checked').val();
	  var receiptId= $('input[name=receiptId]').val();
	  if(!listingType || listingType==""){
		  alert("请选择挂牌类型!");
		  return; 
	  }
	  if(listingType =="C"){
		  if(receiptId =="" || receiptId ==null || receiptId=="-1"){
				 alert("请选择的挂牌类型为仓单挂牌，请选择仓单!");
				 return; 
			 }
	  }
	  if(image!=""){
		  var img = image.split(".");
		  if(!patn.test("."+img[1])){ 
			  	 alert("只能上传jpg，jpeg或gif格式的图片！");
	             return false;
		  }
		 
	  }
	  if(Number(listWeight)<=0){
		  alert("挂牌量不能小于0！");
		  $('input[name=listWeight]').focus();
		  return;
	  }
	  if(Number(listUnitPrice)<=0){
		  alert("挂牌单价不能小于0！");
		  $('input[name=listUnitPrice]').focus();
		  return;
	  }
	  if(minWeight != null && typeof minWeight != "undefined"){
		  if(Number(minWeight)<=0){
			  alert("最小购买量不能小于0！");
			  $('input[name=minWeight]').focus();
			  return;
		  }
		  if(Number(minWeight)>Number(listWeight)){
			  alert("最小购买量不能大于挂牌量！");
			  $('input[name=minWeight]').focus();
			  return;
		  }
	  }
	  if(listNum != null && typeof listNum != "undefined"){
		  if(listNum!=""){
			  if((/^(\+|-)?\d+$/.test(listNum)) && listNum>0){
				  if(listNum!="" && Number(listNum)<0){
					  alert("数量不能小于0！");
					  $('input[name=listNum]').focus();
					  return;
				  }
			  }else{
				  alert("数量只能是正整数");
				  return ;
			 }
		  }
	  }
	 /* if(listingDatesStr< Hundsun.formatDate(new Date(),"yyyy-MM-dd hh:mm")){
		  alert("挂牌开始时间不能小于当前时间！");
		  $('input[name=listingDatesStr]').focus();
		  return;
	  }*/
	  if(listingDateeStr!=""){
		  if(listingDateeStr< Hundsun.formatDate(new Date(),"yyyy-MM-dd")){
			  alert("挂牌结束时间不能小于当前时间！");
			  $('input[name=listingDateeStr]').focus();
			  return;
		  }
		  if(listingDateeStr<listingDatesStr){
			  alert("挂牌结束时间必须大于等于开始时间！");
			  $('input[name=listingDateeStr]').focus();
			  return;
		  }
		  
		  if(settlementDate<=listingDateeStr){
			  alert("交收日期必须大于挂牌结束日期！");
			  $('input[name=settlementDate]').focus();
			  return;
		  }
	  }else{
		  if(settlementDate<=listingDatesStr){
			  alert("交收日期必须大于挂牌期！");
			  $('input[name=settlementDate]').focus();
			  return;
		  }
	  }
	  if(isDirect =="1"){
			 var companysJsonData = $('input[name=companysJsonData]').val();
			 if(companysJsonData=="" || companysJsonData=="[]"){
				 alert("您选择了定向挂牌，请至少选一个定向用户！");
				 return;
			 }
	  }
	  if(warehouseCmp=="-1"){
		  var settlementAddr =  $('input[name=settlementAddr]').val();
		  if(settlementAddr=="" || settlementAddr==null){
			  alert("请填写交收库地址！");
			  $('input[name=settlementAddr]').focus();
			  return;
		  }
		  if(deliveryType.indexOf("1")>=0){  //deliveryType=="1"
			  alert("您选择了其他仓库交收，交收方式只能为场外！");
			  return;
		  }
	  }
	  if(deliveryType =="" || deliveryType==null){
			 alert("请选择交收方式！");
			  return;
	  }
	  
	  var error = '';
		$('font.error[required]').each(function(){	
			var name = $(this).attr('for');	
			var clength = $('input[name="'+name+'"]:checked').length;
			if(clength==0){
				var title = $(this).attr('forTitle');	
				error +=  title +'至少选择一个选项!\n'
			}
		});
		if (error) {
			alert(error);
			return;
		}
	  return true;
}
//选择定向采购商
function isDirectClick(){
		var isDirect= $('input[name=isDirect]:checked').val();
		if (isDirect == "1") {
			$("#selectBuyerDiv").show();
		} else {
			$("#selectBuyerDiv").hide();
		}
}
//选择仓库
function setWHCvalue(){
	var warehouseCmp=  $("#warehouseCmp").val();
	var warehouseCmpName=   $("#warehouseCmp").find("option:selected").text();
	if(warehouseCmp !=null){
		var str = warehouseCmp.split("|");
		if(str[0]=="-1"){
			document.getElementById("warehouseCmpName").readOnly=false;
			document.getElementById("settlementAddr").readOnly=false;
			$('input[name=warehouseCmpName]').val("");
		}else{
			document.getElementById("warehouseCmpName").readOnly=true;
			$('input[name=warehouseCmpName]').val(warehouseCmpName);
		}
		$('input[name=warehouseCmpId]').val(str[0]);
		$('input[name=warehouseCmpAddress]').val(str[1]);
		$('input[name=settlementAddr]').val(str[1]);
	}
}
//选择仓单后
function choiceBack(id,no,varietyCode,varietyName,material,listWeight,listNum){
	$("input[name=receiptId]").val(id);
	$("input[name=varietyTypeCode]").val(varietyCode);
	$("input[name=varietyShortName]").val(varietyName);
	$("input[name=listWeight]").val(listWeight);
	$("input[name=listNum]").val(listNum);
	createTableByVariety(id,null,null,listWeight,listNum,chanageSubmit);
}

//检查挂牌重量与最小购买量是否相等，相等时只能整件下单且不能修改
function checkWeight(){
	  var listWeight = $('input[name=listWeight]').val();
	  var minWeight = $('input[name=minWeight]').val();
	  if(minWeight != null && typeof minWeight != "undefined"){
		  if(Number(minWeight)>Number(listWeight)){
			  alert("最小购买量不能大于挂牌量！");
			  $('input[name=minWeight]').focus();
			  return;
		  }
		  
		  if(Number(minWeight)>0 && Number(listWeight)>0 && Number(minWeight)==Number(listWeight)){
			  document.getElementById("isWholeOrder0").disabled=true;
			  $("input[name=isWholeOrder]:eq(1)").attr("checked",'checked');
		  }else{
			  document.getElementById("isWholeOrder0").disabled=false;
		  }
	  }
}

//指定交收库
var oldSelwhname = "",oldSelwhAddr = "",oldwhId="-1" ;  //已填写交收库的名称和地址
function isDirectWH(){
	var isDirectWhc= $('input[name=isDirectWhc]:checked').val();

	if (isDirectWhc == "1") {
		$("input[name=warehouseCmpId]").val(oldwhId);
		$('input[name=warehouseCmpAddress]').val(oldSelwhAddr);
		$('input[name=settlementAddr]').val(oldSelwhAddr);
		$('input[name=warehouseCmpName]').val(oldSelwhname);

		document.getElementById("warehouseCmpTd").style.display="";
		document.getElementById("whcmpInfo").style.display="none";
		//$('#warehouseCmp').val("");
		
		$('input[name=deliveryType]').each(function(){
			if($(this).val()=="1"){
				if($(this).is(":hidden")){
					$(this).show();
					$(this).attr("checked", false);
					$(this).next().show();
				}
			}
		});
	}else{
		oldSelwhname = $('input[name=warehouseCmpName]').val();
		oldSelwhAddr = $('input[name=settlementAddr]').val();
		oldwhId = $("input[name=warehouseCmpId]").val();
		
		//$("input[name=warehouseCmpId]").val("-1");
		document.getElementById("warehouseCmpTd").style.display="none";
		document.getElementById("whcmpInfo").style.display="";
		document.getElementById("warehouseCmpNameS").readOnly=false;
		document.getElementById("settlementAddrS").readOnly=false;
		
		$('input[name=deliveryType]').each(function(){  //非指定交收库，不能选择场内交收 add by housl 2014-3-27
			if($(this).val()=="1"){
				$(this).attr("checked", false);
				$(this).next().hide();
				$(this).hide();
			}
		});
	}
}

//提交前，如果是非指定交收库，设置交收库名称和地址
function unDirectWH(){
	var isDirectWhc= $('input[name=isDirectWhc]:checked').val();
	if(isDirectWhc=="0"){ //非指定交收库
		$("input[name=warehouseCmpId]").val("-1");
		$('input[name=warehouseCmpAddress]').val($('input[name=settlementAddrS]').val());
		$('input[name=settlementAddr]').val($('input[name=settlementAddrS]').val());
		$('input[name=warehouseCmpName]').val($('input[name=warehouseCmpNameS]').val());
	}
}

//选择交收方式
function setWHValue(){
	var deliveryType= getDeliveryTypeCKValue(); //$("#deliveryType").val();
	var listingType =  $('input[name=listingType]:checked').val();
	if(listingType!="W" && listingType!="F"){
		if(deliveryType.indexOf("1")>=0){
			$("input[name=isDirectWhc]:eq(1)").attr("checked",'checked');
			document.getElementById("isDirectWhc1").disabled=true;
			document.getElementById("isDirectWhc0").disabled=true;
		}else{
			document.getElementById("isDirectWhc1").disabled=false;
			document.getElementById("isDirectWhc0").disabled=false;
		}
		
		oldSelwhname = $('input[name=warehouseCmpName]').val();
		oldSelwhAddr = $('input[name=settlementAddr]').val();
		oldwhId = $("input[name=warehouseCmpId]").val();
		
		isDirectWH();
	}
	
}
//创建表单
function createTableByVariety(receiptId,varietyCode,varietyName,listWeight,listNum,fn){
	var id = $("input[name=id]").val();
	 jQuery.get(       
			 	appServer + '/listing/load_detail_'+id+'_edit_'+receiptId+"_"+varietyCode+'.htm?'+Math.round((Math.random()) * 100000000),
			 	{'listWeightS':listWeight,'listNumS':listNum},
	    		function(data){
			 		var htmlCode='';
	    			var project = data.tradeListingProject;
	    			//设置单选按钮的默认选中
	    			var isDirect0="",isDirect1="";//是否定向
	    			var buyTypeM="",buyTypeC="",buyTypeD="";//购买方式
	    			var listingTypeD="",listingTypeG="",listingTypeC="";//挂牌类型
	    			var buyerDivDisplay = ""; //定向会员的display属性 
	    			var buyerCount=0; //已选择的定向会员个数
	    			var dirUserLists =[];
	    			//常规物品属性列表
	    			var WP = data.WP_LIST;
	    			//规格属性列表
	    			var GG = data.GG_LIST;
	    			//交易属性列表
	    			var JY = data.JY_LIST;
	    			//交收属性列表
	    			var JS = data.JS_LIST;
	    			//交收库
	    			var WHCk = data.whclist;
	    			//库存明细
	    			var WHIItems = data.whiitems;
	    			
	    			var msg = data.msg;
	    			if(msg!=null){
	    				 Hundsun.PopUtil.alert({
								msg:msg,
								width:450,
								timeout:800,
								type:'warn'
							})
						 document.getElementById("form_quick_submit").style.display="none";	
	    				 return;
	    			}
	    			if(WHCk==null){
	    				 Hundsun.PopUtil.alert({
								msg:"未加载到交收库信息，不能挂牌！",
								width:450,
								timeout:800,
								type:'warn'
							})
						document.getElementById("form_quick_submit").style.display="none";	
	    				 return;
	    			}
	    			var varietyType = $('input[name=varietyType]').val();
	    			if('2' == varietyType){
	    				if(WHIItems == ''){
		    				 Hundsun.PopUtil.alert({
								msg:"未加载到库存明细，不能挂牌！",
								width:450,
								timeout:800,
								type:'warn'
							})
							document.getElementById("form_quick_submit").style.display="none";	
		    				return;
		    			}
	    			}
	    			if(project.isDirect=="1"){
	    				isDirect1="checked";
	    				var cd = data.directList;
	    				buyerList = []; 
	    				idList = [];
	    				jQuery(cd).each(function (i){
	    					buyerList.push({   //dirUserLists
								companyId : cd[i].companyId,
								companyName : cd[i].companyName
							});
	    					idList.push(cd[i].companyId);
	    				});
	    				var jsonData = JSON.stringify(buyerList);
	    				buyerCount = buyerList.length;
		    			$('input[name=companysJsonData]').val(jsonData);
	                }else if(project.isDirect=="0"){
	                	isDirect0="checked";
	                	buyerDivDisplay = "display:none";
	                }
	    			
	    			if(project.buyType=="M"){
	    				buyTypeM="checked";
	                }else if(project.buyType=="C"){
	    				buyTypeC="checked";
	                }else if(project.buyType=="D"){
	    				buyTypeD="checked";
	                }
	    			var listingType =  $('input[name=listingType]:checked').val();
	    			if(listingType){
	    				project.listingType=listingType;
	    			}
	    			//修改时选仓单挂牌，默认选择的挂牌默认为仓单挂牌
	    			if(receiptId !=null){
	    				$("input[type=radio][value=C]").attr("checked",'checked'); 
	    			}else{
	    				if(project.listingType=="D"){
		    				$("input[type=radio][value=D]").attr("checked",'checked'); 
		                }else if(project.listingType=="G"){
		                	$("input[type=radio][value=G]").attr("checked",'checked'); 
		                }else if(project.listingType=="C"){
		                	$("input[type=radio][value=C]").attr("checked",'checked'); 
		                	document.getElementById("receiptInfo").style.display="";
		                	document.getElementById("bondInfo").style.display="none";
		                }
	    			}
	    			if(varietyName){
	    				$("input[name=varietyName]").val(varietyName);
	    			}else{
	    				$("input[name=varietyName]").val(project.varietyName);
	    			}
	    			$("input[name=varietyCode]").val(project.varietyCode);
	    			$("input[name=receiptId]").val(project.receiptId);
	    			$("input[name=receiptNo]").val(project.receiptNo);
	    			$("input[name=warehouseCmp]").val(project.warehouseCmpId);
	    			$("input[name=image]").val(project.image);
	    			formHtml = '<fieldset><legend>常规物品属性</legend><table class="c3">';
	    			jQuery(WP).each(function (i){creatForm(this,i,WP.length,project)});
	    			
                    formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;
	    			
	    			formHtml = '<fieldset><legend>物品规格属性</legend><table class="c3">';
	    			jQuery(GG).each(function (i){creatForm(this,i,GG.length,project)});
/*	    			if($('input[name=listingType]:checked').val() =="W" || $('input[name=listingType]:checked').val() =="F"){  //库存挂牌,只显示“规格”属性，不显示长、宽、厚等
//	    				formHtml += "<tr><th width=\"14%\">规格:</th><td ><input type='text'  name='specification' value='";
//	    				if(null != project.specification && '' != project.specification){
//	    					formHtml += project.specification;
//	    				}
//	    				formHtml += "'  class=\"inpt \" style=\"width:126px;\" /></td></tr>";
	    			}*/
	    			formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;

	    			formHtml = '<fieldset><legend>交易属性</legend><table class="c3">';
	    			//jQuery(JY).each(function (i){creatForm(this,i,JY.length,project)});
	    			jQuery(JY).each(function (i){
	    				if(this.keyCode!="isNewPriceSett"){
	    					creatForm(this,i,JY.length,project)
	    				} else if($("#listingType").val() == "F") {
	    					creatForm(this,i,JY.length,project)
	    				} else {
	    					appendHtml = "";
	    				}
	    			});
	    			
	    			var checkedM ="checked",checkedD ="",checkedC ="";
	    			if(project.buyType){
	    				var buyType = project.buyType.split(",");
		    			jQuery(buyType).each(function(s){
		    				if(buyType[s]=="M"){
		    					checkedM ="checked";
		    				}else if(buyType[s]=="C"){
		    						checkedC ="checked";	
		    				}else if(buyType[s]=="D"){
		    						checkedD ="checked";	
		    				}
		    			})
	    			}
	    			
	    			formHtml = formHtml+
	    			 "<tr><th>是否定向：</th><td>"
	                   +"<input name=\"isDirect\" type=\"radio\" value=\"1\" onclick=\"isDirectClick();\" class=\"isDirect:true \" "+isDirect1+"/> 定向"
	                   +"<input name=\"isDirect\" type=\"radio\" value=\"0\" onclick=\"isDirectClick();\" class=\"isDirect:true ml10\"  "+isDirect0+"/> 不定向 " 
	                   +"<div id=\"selectBuyerDiv\" style='"+ buyerDivDisplay+"'>"
					   +"<a href=\"javascript:void(0);\" class=\"button-2\" id=\"selectBuyer\" onclick=\"selectBuyerClick();return false; \">选择买家</a>"
					   +"已选择<strong class=\"bg_co1\">"
		    		   +"<span id=\"userCount\" class=\"red\">"+buyerCount+"</span></strong>&nbsp;位买家"
					   +"<a href=\"javascript:void(0);\" class=\"button-8\" id=\"viewBuyer\" onclick=\"viewBuyerClick();return false; \">查看</a>"
	                   +"</div></td>" 
	                   if("F"==project.listingType) {
			    			formHtml = formHtml+"<th>价格审批编号：</th>"
			                   +"<td><input type=\"text\" class=\"inpt \" id=\"priceApproval\" name=\"priceApproval\" style=\"width:126px;\" value=\""
								+ Hundsun.StringUtil.trim(project.priceApproval)
								+ "\"  /><span class=\"red\"></span></td>"
		    			}
	    			formHtml = formHtml
	                   +"</tr>"
                  
	                   +"<tr><th><span style=\"color:red\">*</span>挂牌开始时间：</th>"
	                   +"<td><input type=\"text\" class=\"required  inpt\" onClick=\"WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-%d'})\" id=\"listingDatesStr\" name=\"listingDatesStr\"  style=\"width:126px;\"  value=\""+Hundsun.formatDate(project.listingDates,"yyyy-MM-dd")+"\" readOnly/><span class=\"red\"></span></td>"
	                   +"<th><span style=\"color:red\">*</span>挂牌结束时间：</th>"
	                   +"<td><input type=\"text\" class=\"required  inpt\" onClick=\"WdatePicker({dateFmt:'yyyy-MM-dd',minDate:$('#listingDatesStr').val()})\" id=\"listingDateeStr\" name=\"listingDateeStr\"  style=\"width:126px;\" value=\""+Hundsun.formatDate(project.listingDatee,"yyyy-MM-dd")+"\" readOnly/><span class=\"red\"></span></td>"
	                   +"</tr></table></fieldset>";
	    			
	    			htmlCode = htmlCode + formHtml;
	    			
	    			var ops ="<option value=\"\">--请选择--</option>";
	    			var selected="";
	    			formHtml = '<fieldset><legend>交收属性</legend><table class="c3">';
	    			
		    			jQuery(WHCk).each(function(n){
		    				//把省、市、区信息和地址拼在一起作为交收地址
		    				var tmpAddr=WHCk[n].provice+WHCk[n].city+WHCk[n].area+WHCk[n].address;
		    				tmpAddr = tmpAddr.replace(/null/g,"");
		    				if(project.warehouseCmpId ==WHCk[n].id){
		    					ops = ops +"<option selected value=\""+WHCk[n].id+"|"+tmpAddr+"\">"+WHCk[n].name+"</option>";
		    					$('input[name=warehouseCmpAddress]').val(tmpAddr);
		    					$('input[name=settlementAddr]').val(tmpAddr);
		    					$('input[name=warehouseCmpId]').val(WHCk[n].id);
		    					$('input[name=warehouseCmpName]').val(WHCk[n].name);
		    				}else{
		    					ops = ops +"<option value=\""+WHCk[n].id+"|"+tmpAddr+"\">"+WHCk[n].name+"</option>";
		    				}
		    			})

	    			jQuery(JS).each(function (i){creatForm(this,i,JS.length,project)});
	    			if($("#goodsType").val() == 1) {
	    				var isSelfDeliver = $("#selfDeliver").val();
		    			var selfDeliver0 = "";
		    			var selfDeliver1 = "";
		    			if(isSelfDeliver == "0") {
		    				selfDeliver0 = "checked";
		    			} else if(isSelfDeliver == "1") {
		    				selfDeliver1 = "checked";
		    			}
	    				formHtml = formHtml+"<tr><th>是否允许自提：</th><td colspan='3'>"
	    				+"<input id=\"selfDeliver1\" name=\"selfDeliver\" type=\"radio\" value=\"1\"  "+selfDeliver1+"/> 是   "
	    				+"<input id=\"selfDeliver0\" name=\"selfDeliver\" type=\"radio\" value=\"0\"  "+selfDeliver0+"/> 否</td></tr>";
	    			}
	    			  formHtml = formHtml+"<tr><th>交收仓库：</th><td>"
	                   +"<input id=\"isDirectWhc0\" name=\"isDirectWhc\" type=\"radio\" value=\"0\" onclick=\"isDirectWH();\" /> 非指定交收库   "
	                   +"<input id=\"isDirectWhc1\" name=\"isDirectWhc\" type=\"radio\" value=\"1\" onclick=\"isDirectWH();\" checked/> 指定交收库"
	                   +"</td><td id = \"warehouseCmpTd\" colspan=\"2\"><select id = \"warehouseCmp\" name = \"warehouseCmp\" onchange=\"setWHCvalue();\"   style=\"width:150px;\" class=\" required  \">" +

		    			ops+"</select><span class=\"red\"></span></td></tr>" +
		    			"<tr id=\"whcmpInfo\" style=\"display:none\"><th><span style=\"color:red\">*</span>仓库名称：</th>" +
		    			"<td><input type=\"text\" class=\"required  inpt saveName \"  id=\"warehouseCmpNameS\" name=\"warehouseCmpNameS\"   style=\"width:126px;\" value=\""+project.warehouseCmpName+"\" readOnly /><span class=\"red\"></span>" +
		    					//"<a href='#0' class='button-2' id='btn_open' onclick='selectCoop1();'>选择仓库</a></td>"+
		    					
		    					"&nbsp;<a href='#0' id='btn_open' onclick='selectCoop1();'>选择</a>"+
		    					"&nbsp;&nbsp;<a href='#0' id='btn_save' onclick='saveLibrary();'>保存</a></td>"+
		    			"<th><span style=\"color:red\">*</span>交收地址：</th>" +
		    			"<td><input type=\"text\" class=\"required  inpt saveAdd \"  id=\"settlementAddrS\" name=\"settlementAddrS\"   style=\"width:126px;\"  value=\""+project.settlementAddr+"\" readOnly /><span class=\"red\"></span></td></tr>";

	    			  formHtml = formHtml +"</table></fieldset>";
	    			  htmlCode = htmlCode + formHtml;
	    			
	    			var remark = "";//备注
	    			if(project.remark!=null){
	    				remark =project.remark;
	    			}
	    			formHtml = '<fieldset><legend>其他属性</legend><table class="c3">'+
	    			"<tr><th width=\"125px\">备注信息：</th>" +
	    			"<td><textarea name=\"remark\" id=\"remark\" cols=\"80\" rows=\"3\" maxlength=\"340\" title=\"请不要超过340的长度\">"+remark+"</textarea><span class=\"red\"></span></td></tr>"; 
	    			formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;
	    			
	    			if('2' == varietyType){
		    			formHtml = '<fieldset><legend>库存明细</legend><table class="c3"><tbody name="xxtbody" class="list_tt">';
		    			formHtml += '<tr style="border:1px solid #d1d7e0">' + 
		    			'<td class="tc">批次号</td>' + 
		    			'<td class="tc">重量</td>' + 
		    			'<td class="tc">状态</td>' + 
		    			'<td class="tc">入库时间</td>' + 
		    			'</tr>';
		    			if(null != WHIItems && "" != WHIItems){
		    				jQuery(WHIItems).each(function(n){
		    					formHtml += '<tr style="border:1px solid #d1d7e0" id="tr_' + this.batchNo + '" >' + 
		    					'<td class="tdB" style="border:1px solid #d1d7e0;"><input type="hidden" id="whItemId" name="whItemId" value="' + 
		    					this.id + '\" />' + this.batchNo + '</td>' + 
		    					'<td class="tdB" style="border:1px solid #d1d7e0;">' + 
		    					this.weight + 
		    					'</td>' + 
		    					'<td class="tdB" style="border:1px solid #d1d7e0;">' + 
		    					this.statusDesc + 
		    					'</td>' + 
		    					'<td class="tdB" style="border:1px solid #d1d7e0;">' + 
		    					Hundsun.formatDate(this.gmtCreate,"yyyy-MM-dd hh:mm:ss") + 
		    					'</td>' + 
		    					'</tr>';
		    				})
		    			}
		    			formHtml += "</tbody></table></fieldset>";
		    			htmlCode = htmlCode + formHtml;
	    			}
	    			
	    			$('#listingTable').html(htmlCode);
	    			
	    			document.getElementById("varietyName_text").innerHTML=$("input[name=varietyName]").val();
	    			$("#settlementDate").unbind("click");
	    			document.getElementById("varietyCode").style.display="none";
	    			//判断交收方式，是否可以选择“全款结算场外交收”，
	    			//只有信用卖家,且具有全款支付功能，在用保证金挂牌和信用挂牌时能选择。add by hsl 2012-12-04
	    			//库存挂牌时可以具有全款支付功能 add by hsl 2013-6-17
	    			var listingType= $('input[name=listingType]:checked').val();
	    			var deliveryType3Show = false;
	    			if($("#isFullPayment").val()=="1" && $("#isCreditTrade").val()=="1"){
	    				if(listingType =="D" || listingType =="G" || listingType =="W" || listingType =="F"){
	    					deliveryType3Show=true;
	    				}
	    			}
	    			if(deliveryType3Show==false){
	    				//$("#deliveryType option[value='3']").remove();
	    				$('input[name=deliveryType]').each(function(){
	    					if($(this).val()=="3"){
	    						$(this).next().hide();
	    						$(this).remove();
	    					}
	    				});
	    			}
	    			//只有信用卖家才有预付款功能
	    			if($("#isCreditTrade").val()=="0"){
	    				$('input[name=deliveryType]').each(function(){
	    					if($(this).val()=="4"){
	    						$(this).next().hide();
	    						$(this).remove();
	    					}
	    				});
	    			}
	    			//如果是循环物资挂牌，交收方式只能选择“线下结算场外交收” add by 2013-02-25
	    			if("6"==$("#goodsType").val()){  
	    				$('input[name=deliveryType]').each(function(){
	    					if($(this).val()!="0"){
	    						$(this).next().hide();
	    						$(this).remove();
	    					}
	    				});
	    			}
	    			if(fn){
	    				fn.call();
	    				checkWeight();
	    				var warehouseCmpId = project.warehouseCmpId;
	    				if(warehouseCmpId=="-1" || warehouseCmpId == "0"){
	    					$("input[name=isDirectWhc]:eq(0)").attr("checked",'checked');
	    					isDirectWH();
	    				}else{
	    					document.getElementById("warehouseCmpTd").style.display="";
	    					document.getElementById("whcmpInfo").style.display="none";
	    					var deliveryType= getDeliveryTypeCKValue();
	    					if(deliveryType.indexOf("1")>=0){
	    						$("input[name=isDirectWhc]:eq(1)").attr("checked",'checked');
	    						document.getElementById("isDirectWhc1").disabled=true;
	    						document.getElementById("isDirectWhc0").disabled=true;
	    					}else{
	    						document.getElementById("isDirectWhc1").disabled=false;
	    						document.getElementById("isDirectWhc0").disabled=false;
	    					}
	    				}
	    				if(listingType=="C" && ((receiptId!=null && receiptId!="")|| project.receiptId!=null || project.receiptId!="-1")){
	    					//仓单挂牌时，材质不能选择只显示
	    					document.getElementById("warehouseCmp").disabled=true;
	    					document.getElementById("material").style.display="none";
	    					var material=   $("#material").find("option:selected").text();
	    					document.getElementById("material_select").innerHTML=material;
	    					//仓单挂牌时，交收库和交收默认选择
	    					$('input[name=deliveryType]').each(function(){
		    					if($(this).val()!="1"){
		    						$(this).next().hide();
		    						$(this).remove();
		    					}
		    				});
	    					document.getElementById("warehouseCmpTd").style.display="";
	    					document.getElementById("whcmpInfo").style.display="none";
	    					$("input[name=isDirectWhc]:eq(1)").attr("checked",'checked');
	    					document.getElementById("isDirectWhc1").disabled=true;
	    					document.getElementById("isDirectWhc0").disabled=true;
	    					
	    				}else{
	    					document.getElementById("warehouseCmp").disabled=false;
	    				}
	    				
	    				if(listingType=="W" || listingType=="F" ){
	    					//库存挂牌时，交收仓库不允许修改 add by hsl 2013-6-7
	    					if(listingType=="W"){
	    						document.getElementById("warehouseCmp").disabled=true;
		    					document.getElementById("warehouseCmpTd").style.display="";
	    					}
	    					document.getElementById("whcmpInfo").style.display="none";
	    					$("input[name=isDirectWhc]:eq(1)").attr("checked",'checked');
	    					if(listingType=="W"){
	    						document.getElementById("isDirectWhc1").disabled=true;
	    					}
	    					document.getElementById("isDirectWhc0").disabled=true;
	    					
	    					//库存挂牌，只允许全款结算场外交收和线下结算场外交收
	    					$('input[name=deliveryType]').each(function(){
		    					if($(this).val()=="1" || $(this).val()=="2"){
		    						$(this).next().hide();
		    						$(this).remove();
		    					}
		    				});
	    				}
	    			}
	    			if($("#manufacuturer")){//选择生产商
	    				var readAttr = $("#manufacuturer").attr("readOnly");
	    				if(readAttr && (readAttr=="readOnly" || readAttr=="readonly" || readAttr=="true")){}
	    				else
	    				//{$("#manufacuturer").after(" <a href='#0' class='button-2 producer' id='btn_open' onclick='selectCoop();'>选择</a>");}
	    				{$("#manufacuturer").after(" <a href='#0' class='producer' id='btn_open' onclick='selectCoop();'>选择</a>&nbsp;&nbsp;<a href='#0' class='producer' id='btn_open' onclick='saveProducers();'>保存</a>");}
	    			}
	    		}    	
	        );
}

function creatForm(attr,i,length,project){
	var inputType = attr.keyType;//类型
	var isRequired = attr.isRequired;//是否必选
	var groupType = attr.groupType;//属性组类型；F=常规；D=动态
	var valueValidate = attr.valueValidate ==null?"":attr.valueValidate;//验证表达式
	var clas = isRequired == "1" ? "required":"";//验证样式
	clas = clas+"  "+valueValidate;
	var value="",readOnly="",unitType="";
	
	if(i%2==0){
		appendHtml = '<tr>';
	}
	//如果是常规属性,value为挂牌主表的对应字段值
	if(groupType=="D"){
		value = attr.value ;
	}else{
		value = project[attr.keyCode] ;
	}
	//判断是否必填
	if(isRequired == "1"){
		appendHtml = appendHtml + " <th width=\"15%\">"+"\<span style=\"color:red\">*</span>"+attr.keyTitle+"：</th>";
	}else{
		appendHtml = appendHtml + " <th width=\"15%\">"+attr.keyTitle+"：</th>";
	}
	//如果是新建表单，value为空；如果是修改判断是否常规属性，常规属性的value为挂牌主表的对应字段值
	if(attr.keyCode=="listUnitPrice"){
		attr.keyCode = "listUnitPrice_num";
	}
	
	if(groupType=="D"){
		value = attr.value ;
	}else{
		value = project[attr.keyCode] ;
	}
	if(value ==null || typeof value == "undefined"){
		value="";
	}
	if(attr.unitType ==null || typeof attr.unitType == "undefined"){
		unitType="";
	}else{
		unitType=attr.unitType;
	}
	//新增时品种属性设置默认值,仓单挂牌常规属性的value为挂牌主表的对应字段值
	if(groupType=="F"){
		if(project && project.listingType =="C"){
			value = project[attr.keyCode]== null ? "":project[attr.keyCode];
			if(attr.keyCode!="minWeight" && attr.keyCode!="settlementDate" && attr.keyCode!="billRemark" && attr.keyCode!="listUnitPrice_num" ){
				readOnly = "readOnly";
			}
		}else{
			if(attr.keyCode =="varietyCode"){
				readOnly = "readOnly";
			}
		}
	}
	if(value==""){
		if(attr.text ==null || typeof attr.text == "undefined"){
			value="";
		}else{
			value =attr.text;
		}
	}
	appendHtml = appendHtml + "<td width=\"25%\">";
	//输入框为文本框
	if(inputType == "TEXT"){
		var onblurFunc="";
		if(attr.keyCode=="listWeight" || attr.keyCode=="minWeight"){
			onblurFunc = 'onblur="checkWeight();"';
			var varietyType = $('input[name=varietyType]').val();
			if('2' == varietyType && attr.keyCode=="listWeight"){
				readOnly = "readOnly";
			}
			//if(project.listingType =="W" && attr.keyCode=="listWeight"){readOnly = "readOnly";}
		}
		if(attr.keyCode=="listNum") {
			onblurFunc = 'onchange="setListWeight()"';
		}
		
		if(attr.keyCode=="varietyCode"){
			appendHtml = appendHtml + "<input type=\"text\"  id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\" value=\""+value+"\"  "+ readOnly+" "+ onblurFunc+"  class=\"inpt  "+clas+"\" style=\"width:126px;\"/><span id=\"varietyName_text\"></span> "+unitType+" <span class=\"red\"></span>";
		}else{
			appendHtml = appendHtml + "<input type=\"text\"  id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\" value=\""+value+"\"   "+ readOnly+" "+ onblurFunc+" class=\"inpt  "+clas+"\" style=\"width:126px;\" />"+unitType+" <span class=\"red\"></span>";
		}
	}else if(inputType == "TEXTAREA"){//输入框为文本域 
		appendHtml = appendHtml + "<textarea rows=\"2\" cols=\"30\"  id=\""+attr.keyCode+"\" name=\""+attr.keyCode+ "\" class=\"inpt "+clas+"\" >"+value+"</textarea><span class=\"red\"></span>";
	}else if(inputType == "DATETIME"){
		//格式日期
		if((value+"").indexOf("-")>=0){
	    	
	    }else{
	    	value = Hundsun.formatDate(value,"yyyy-MM-dd HH:mm:ss")
	    }
		appendHtml = appendHtml + "<input type=\"text\" maxlength=\"100\" id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\" readOnly onClick=\"WdatePicker({dateFmt:'yyyy-MM-dd hh:mm:ss'})\" value=\""+value+"\"  "+ readOnly+" class=\"inpt "+clas+"\" /> <span class=\"red\"></span>";
	//选择框	
	}else if(inputType == "DATE"){
		if((value+"").indexOf("-")>=0){
	    	
	    }else{
	    	value = Hundsun.formatDate(value,"yyyy-MM-dd")
	    }
		//格式日期
		if(project && project.listingType =="C" && attr.keyCode!="settlementDate" && attr.keyCode=="productionDate"){
			appendHtml = appendHtml + "<input type=\"text\" maxlength=\"100\" id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\"   readOnly  value=\""+value+"\" class=\"inpt  "+clas+"\" style=\"width:126px;\" /><span class=\"red\"></span>";
		}else{
			appendHtml = appendHtml + "<input type=\"text\" maxlength=\"100\" id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\"  readOnly  onClick=\"WdatePicker()\"  value=\""+value+"\" class=\"inpt  "+clas+"\" style=\"width:126px;\" /><span class=\"red\"></span>";
		}
		//选择框	
	}else if(inputType == "CHECKBOX" || inputType == "SELECT" || inputType == "RADIO"){
		var attr_values = attr.text == null? "": attr.text.split("\n");
		if(inputType == "CHECKBOX"){
			var clickFunc ="";
			if(attr.keyCode=="deliveryType"){
				clickFunc = 'onclick="setWHValue();"';
			}
			
			jQuery(attr_values).each(function(j){
				var arrval = attr_values[j]== null? "": attr_values[j].split("|");
				//修改时设置CHECKBOX默认选择项
				if(value && (value+",").indexOf(arrval[0]+",")>=0){
					appendHtml = appendHtml + "<input type=\"checkbox\" name=\""+attr.keyCode+"\" value=\""+arrval[0]+"\" "+clickFunc+" checked class=\"inp \" /> <font>" + arrval[1]+"</font>";
				}else{
					appendHtml = appendHtml + "<input type=\"checkbox\" name=\""+attr.keyCode+"\" value=\""+arrval[0]+"\" "+clickFunc+" class=\"inp \" /> <font>" + arrval[1]+"</font>";
				}
			});
			if (isRequired == "1") {
				appendHtml += '<font class="error" required generate"true" style="display:none" for="'+attr.keyCode+'" forTitle="'+attr.keyTitle+'">至少选择一个选项</font>';
			}
		}else if(inputType == "SELECT"){
			var clickFunc ="";
			if(attr.keyCode=="deliveryType"){
				clickFunc = 'onchange="setWHValue();"';
			}
			//下拉框
			appendHtml = appendHtml + "<select id=\""+attr.keyCode+"\"  name=\""+attr.keyCode+"\" class=\"select w140 "+clas+"\" "+clickFunc+" style=\"width:130px;\">";
			jQuery(attr_values).each(function(j){
				var arrval = attr_values[j]== null? "": attr_values[j].split("|");
				//修改时设置SELECT默认选择项
				if(value ==arrval[0]){
					appendHtml = appendHtml + "<option value=\""+arrval[0]+"\" selected>"+arrval[1]+"</option>";
				}else{
					appendHtml = appendHtml + "<option value=\""+arrval[0]+"\">"+arrval[1]+"</option>";
				}
				
			});
			appendHtml = appendHtml + "</select><span id=\""+attr.keyCode+"_select\"></span><span class=\"red\"></span>";
		}else if(inputType == "RADIO"){
				//单选按钮
				jQuery(attr_values).each(function(j){
				var arrval = attr_values[j]== null? "": attr_values[j].split("|");
				var clickFunc ="";
				if(attr.keyCode=="deliveryType"){
					clickFunc = 'onclick="setWHValue();"';
				}
				//修改时设置RADIO默认选择项
				if(value ==arrval[0]){
					appendHtml = appendHtml + "<input type=\"radio\" id=\""+attr.keyCode+j+"\" name=\""+attr.keyCode+"\" value=\""+arrval[0]+"\" checked  "+clickFunc+" class=\"inp\" /> " + arrval[1];
				}else{
					appendHtml = appendHtml + "<input type=\"radio\" id=\""+attr.keyCode+j+"\" name=\""+attr.keyCode+"\" value=\""+arrval[0]+"\"  "+clickFunc+" class=\"inp\" /> " + arrval[1];
				}

		   });
				if (isRequired == "1") {
					appendHtml += '<font class="error" required generate"true" style="display:none" for="'+attr.keyCode+'" forTitle="'+attr.keyTitle+'">至少选择一个选项</font>';
				}
		}
		//文件类型	
	}else if(inputType == "FILE"){
		var uploadServer = $("#uploadServer").val();
		var downFileName = "";
		var aElement = "<a target=\"_blank\" href="+uploadServer+value+">";
		if(!value){}else{
			if(attr.keyCode=="uploadFile"){
				downFileName = project.uploadFileName;
				aElement = "<a  href="+appServer+"/detail/downUploadFile.htm?id="+project.id+">";
			}else{
				downFileName="点击下载";
			}
			appendHtml = appendHtml+"<input type='hidden' name='"+attr.keyCode+"Hidden' id='"+attr.keyCode+"Hidden' value='"+value+"' />";
		}
		appendHtml = appendHtml
				+ "<input type=\"file\" maxlength=\"255\" name=\""
				+ attr.keyCode
				+ "_file\"  value=\""
				//+ value
				+ "\" class=\"inpt "
				+ clas
				+ "\" style=\"width:126px;\" />&nbsp;&nbsp;" 
				+aElement+downFileName+"</a>"
				+"<span style=\"margin-left:10px;\"  class=\"red\"></span>";
	}
	appendHtml = appendHtml + "</td>";
	if(i%2==1 || i == length-1){
		appendHtml = appendHtml + "</tr>";
		formHtml = formHtml+appendHtml;
	}
}

//仓单挂牌时显示仓单选择信息
function showDivInfo(receipt,bond,selectVariety){
	if(receipt =='true'){
		document.getElementById("receiptInfo").style.display="";
	}else{
		document.getElementById("receiptInfo").style.display="none";
	}
	if(bond =='true'){
		document.getElementById("bondInfo").style.display="";
	}else{
		document.getElementById("bondInfo").style.display="none";
	}
	if(selectVariety =='true'){
		//document.getElementById("varietyButton").style.display="";
		if(document.getElementById("warehouseCmp")){
			document.getElementById("warehouseCmp").disabled=false;
		}
	}else{
		document.getElementById("varietyButton").style.display="none";
	}
	createTableByVariety(null,null,null,null,null,chanageSubmit);
} 

//选择节点后的回调函数
function chooseVType(data){
	var varietyCode = $("input[name=varietyCode]").val();
	
	$("input[name=varietyCode]").val(data.code);
	$("input[name=varietyName]").val(data.name);
	if(varietyCode !=data.code){
		 jQuery.get(       
				 appServer + '/listingRemoting/load_variety_'+data.code+'.htm',
		    		function(data){
					    var WP = data.F_WP;
		    			if(WP==""){
		    				 Hundsun.PopUtil.alert({
									msg:"该品种未配置属性，不能挂牌！",
									width:450,
									timeout:800,
									type:'warn'
								})
							document.getElementById("form_quick_submit").style.display="none";	
		    				 return;
		    			}else{
		    				createTableByVariety(null,data.code,data.name,null,null,null);
		    				document.getElementById("form_quick_submit").style.display="";	
		    			}
				    }
			)
	}
	
}

//获取选择的交收方式的值
function getDeliveryTypeCKValue(){
	var arr_v = new Array(); 

	$('input[name=deliveryType]:checked').each(function(){ 
	     arr_v.push($(this).val()); 
	}); 
	return  arr_v.join(','); 
}


//判断select中是否存在值为value的项
function isExistOption(id,value) {
	var isExist = false;
	 var count = $('#'+id).find('option').length; 
	  for(var i=0;i<count;i++)   
	  {   
		 if($('#'+id).get(0).options[i].value == value)   
			 {   
			       isExist = true;   
			            break;   
			      }   
		}   
		return isExist;
}

//增加select项
function addOptionValue(id,value,text) {
	if(!isExistOption(id,value)&&text!=""){
		$('#'+id).append("<option value="+value+">"+text+"</option>");
		$('#'+id).val(value);  //设置选中
	}	
}

function setListWeight() {
	var listWeight = $("#listWeightS").val();
	var minWeight = $("#minWeight").val();
	if(minWeight == null || $.trim(minWeight) == "") {
		minWeight = "a";
	}
	var listNum = $("#listNum").val();
	var newListWeight = accMul(minWeight,listNum);
	if($("#listingType").val() == "W" && newListWeight > listWeight) {
		alert("您输入的件数过大，导致总重量已超出库存重量！");
		return false;
	}
	if(!isNaN(newListWeight)) {
		$("#listWeight").val(newListWeight);
	}
}

function accMul(arg1,arg2) 
{ 
	var m=0,s1=arg1.toString(),s2=arg2.toString(); 
	try{m+=s1.split(".")[1].length}catch(e){} 
	try{m+=s2.split(".")[1].length}catch(e){} 
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
}