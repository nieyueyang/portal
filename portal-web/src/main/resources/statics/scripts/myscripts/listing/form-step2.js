var formHtml;
var appendHtml = '';
jQuery(function($) {
	//创建表单，表单创建成功后加载验证
	 createTableByVariety(function(){
		 var form = $('#form_step2').validateForm({
			 	errorPlacement: function(error, element) {
		            element.siblings("span").css({"color":"red"}).text(error.text());
		        },
		        success: function(label) {
		            label.text("");
		        },
		        rules:{
		        	//'listUnitPrice_num':{'max':9999999999},
		        	'listUnitPrice_num':{'min':0.01,'max':9999999999},
		        	//'listNum':{'max':9999999999},
		        	'listNum':{'min':1,'max':9999999999},
		        	'manufacuturer':{'maxlength':40},
		        	'grade':{'maxlength':40},
		        	'orgin':{'maxlength':30},
		        	'brand':{'maxlength':10},
		        	'standard':{'maxlength':40},
		        	'warehouseCmpNameS':{'maxlength':25},
		        	'settlementAddrS':{'maxlength':50},
		        	'packing':{'maxlength':80},
		        	'length':{'maxlength':12},
		        	'width':{'maxlength':12},
		        	'thickness':{'maxlength':12},
		        	'listNum':{'maxlength':9},
		        	'priceApproval':{'maxlength':30},
		        	//'listWeight':{'max':99999999999},
		        	'listWeight':{'min':0.001,'max':99999999999},
		        	//'minWeight':{'max':99999999999},
		        	'minWeight':{'min':0.001,'max':99999999999},
		        	'batchNo':{'maxlength':40}
		        },
		        submitHandler:function(f) {
		        	unDirectWH();
		        	if(validateForm()){
		        		f.submit();
		        		/*Boxy.confirm("挂牌开始日期："+$("#listingDatesStr").val()+"<br />挂牌结束日期：" +$("#listingDateeStr").val() +
		        				"<br />交收截止日期："+$("#settlementDate").val()+"<br />确定保存吗？",
		        				function(){
		        					f.submit();
		        				}
		        		)*/
		        	}
		        }
		    });
		 
		 
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
	  });
	
	  
	 //校验数据
	  function validateForm(){
		  var listUnitPrice = $('input[name=listUnitPrice_num]').val();
		  var listWeight = $('input[name=listWeight]').val();
		  var minWeight = $('input[name=minWeight]').val();
		  var listNum = $('input[name=listNum]').val();
		  var listingDatesStr = $('input[name=listingDatesStr]').val();
		  var listingDateeStr = $('input[name=listingDateeStr]').val();
		  var settlementDate = $('input[name=settlementDate]').val();
		  var isDirect =  $('input[name=isDirect]:checked').val();
		  var isWholeOrder =  $('input[name=isWholeOrder]:checked').val();
		  var deliveryType = getDeliveryTypeCKValue();// $('#deliveryType').val();
		  var warehouseCmp =  $("#warehouseCmp").val();
		  
		  var image =  $('input[name=image_file]').val();
		  var patn = /\.jpg$|\.jpeg$|\.gif$|\.png$/i;
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
		  if(Number(minWeight)<=0){
			  alert("最小购买量不能小于0！");
			  $('input[name=minWeight]').focus();
			  return;
		  }
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
		  
		  if(Number(minWeight)>Number(listWeight)){
			  alert("最小购买量不能大于挂牌量！");
			  $('input[name=minWeight]').focus();
			  return;
		  }
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
				  alert("交收日期必须大于挂牌日期！");
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
		  if(isWholeOrder =="" || isWholeOrder==null){
				 alert("请选择是否整件下单！");
				  return;
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

})

//检查挂牌重量与最小购买量是否相等，相等时只能整件下单且不能修改
function checkWeight(){
	  var listWeight = $('input[name=listWeight]').val();
	  var minWeight = $('input[name=minWeight]').val();
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
	var warehouseCmpAddress=   $("#warehouseCmp").find("option:selected").text();
	
	if(warehouseCmp !=null){
		var str = warehouseCmp.split("|");
		if(str[0]=="-1"){
			document.getElementById("warehouseCmpName").readOnly=false;
			$('input[name=warehouseCmpName]').val("");
		}else{
			document.getElementById("warehouseCmpName").readOnly=true;
			$('input[name=warehouseCmpName]').val(warehouseCmpAddress);
		}
		$('input[name=warehouseCmpId]').val(str[0]);
		$('input[name=warehouseCmpAddress]').val(str[1]);
		$('input[name=settlementAddr]').val(str[1]);
	}
}
//指定交收库,交收仓库切换时，可以记录之前的输入值
var oldSelwhname = "",oldSelwhAddr = "",oldwhId="-1" ;  //已填写交收库的名称和地址
function isDirectWH(){
	var isDirectWhc= $('input[name=isDirectWhc]:checked').val();
	if (isDirectWhc == "1") { //指定交收库
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
	var deliveryType= getDeliveryTypeCKValue(); //$('#deliveryType').val();
	var listingType = $("#listingType").val();
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
//选择品种后创建表单
function createTableByVariety(fn){
	var varietyTypeCode = $("input[name=varietyCode]").val();
	var receiptId = $("input[name=receiptId]").val();
	 jQuery.get(       
			 appServer + '/listing/init_form.htm',
			 	Hundsun.FormUtils.getFormValues('form_step2'),  
	    		function(data){
	    			var htmlCode='', fullName="";
	    			var varietyTypeDTO = data.varietyTypeDTO;
	    			var project = data.listingProject;
	    			var msg = data.msg;
	    			if(msg!=null){
	    				 Hundsun.PopUtil.alert({
								msg:msg,
								width:450,
								timeout:800,
								type:'warn'
							})
						 document.getElementById("form_step2_submit").style.display="none";	
	    				 return;
	    			}
	    			if(varietyTypeDTO==null){
	    				 Hundsun.PopUtil.alert({
								msg:"没有找到品种信息，不能挂牌！",
								width:450,
								timeout:800,
								type:'warn'
							})
						document.getElementById("form_step2_submit").style.display="none";	
	    				 return;
	    			}else{
	    				fullName = varietyTypeDTO.shortName;
		    			$('#varietyType').html(varietyTypeDTO.fullName);
		    			$('#varietyName').html(varietyTypeDTO.name);
	    			}
	    			if(project !=null){
	    				$("input[name=receiptNo]").val(project.receiptNo);
	    			}          
	    			//常规物品属性列表
	    			var WP = data.attrData.WP_LIST;
	    			//规格属性列表
	    			var GG = data.attrData.GG_LIST;
	    			//交易属性列表
	    			var JY = data.attrData.JY_LIST;
	    			//交收属性列表
	    			var JS = data.attrData.JS_LIST;
	    			//交收库
	    			var WHCk = data.whclist;
	    			if(WP==""){
	    				 Hundsun.PopUtil.alert({
								msg:"该品种未配置属性，不能挂牌！",
								width:450,
								timeout:800,
								type:'warn'
							})
						document.getElementById("form_step2_submit").style.display="none";	
	    				 return;
	    			}
	    			if(WHCk==""){
	    				 Hundsun.PopUtil.alert({
								msg:"未加载到交收库信息，不能挂牌！",
								width:450,
								timeout:800,
								type:'warn'
							})
						document.getElementById("form_step2_submit").style.display="none";	
	    				 return;
	    			}
	    			
	    			formHtml = '<fieldset><legend>常规物品属性</legend><table class="c3">';
	    			jQuery(WP).each(function (i){
	    				creatForm(this,i,WP.length,fullName,project);
	    				});
	    			formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;
	    			
	    			formHtml = '<fieldset><legend>物品规格属性</legend><table class="c3">';
    				jQuery(GG).each(function (i){
	    				creatForm(this,i,GG.length,fullName,project)
	    			});
/*	    			if($("#listingType").val() =="W" || $("#listingType").val() =="F"){  //库存挂牌(非库存现有量挂牌),只显示“规格”属性，不显示长、宽、厚等
//	    				formHtml += "<tr><th width=\"14%\">规格:</th><td ><input type='text'  name='specification' value='";
//	    				if(null != project.specification && '' != project.specification){
//	    					formHtml += project.specification;
//	    				}
//	    				formHtml += "'  class=\"inpt \" style=\"width:126px;\" /></td></tr>";
	    			}*/
	    			formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;

	    			formHtml = '<fieldset><legend>交易属性</legend><table class="c3">';
	    			//jQuery(JY).each(function (i){creatForm(this,i,JY.length,fullName,project)});
	    			jQuery(JY).each(function (i){
	    				if(this.keyCode!="isNewPriceSett"){
	    					creatForm(this,i,JY.length,fullName,project);
	    				} else if($("#listingType").val() == "F") {
	    					creatForm(this,i,JY.length,fullName,project);
	    				} else {
	    					appendHtml = "";
	    				}
	    			});
	    			
	    			formHtml = formHtml+"<tr><th>是否定向：</th><td>"
                   +"<input name=\"isDirect\" type=\"radio\" value=\"1\" onclick=\"isDirectClick();\" /> 定向"
                   +"<input name=\"isDirect\" type=\"radio\" value=\"0\" onclick=\"isDirectClick();\" class=\"ml10\" checked/> 不定向 " 
                   +"<div id=\"selectBuyerDiv\" style=\"display:none;\">"
				   +"<a href=\"javascript:void(0);\" class=\"button-2\" id=\"selectBuyer\" onclick=\"selectBuyerClick();return false; \">选择买家</a>"
				   +"已选择<strong class=\"bg_co1\">"
	    		   +"<span id=\"userCount\" class=\"red\">0</span></strong>&nbsp;位买家"
				   +"<a href=\"javascript:void(0);\" class=\"button-8\" id=\"viewBuyer\" onclick=\"viewBuyerClick();return false; \">查看</a>"
                   +"</div></td>" 
                   if($("#listingType").val() =="F") {
		    			formHtml = formHtml+"<th>价格审批编号：</th>"
		                   +"<td><input type=\"text\" class=\"inpt \" id=\"priceApproval\" name=\"priceApproval\" style=\"width:126px;\"  /><span class=\"red\"></span></td>"
	    			}
	    			formHtml = formHtml
                   
                   +"</tr>"
                  
                   +"<tr><th><span style=\"color:red\">*</span>挂牌开始时间：</th>"
                   +"<td><input type=\"text\" class=\"required  inpt \" onClick=\"WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'"+getMinStartDate()+"'})\" id=\"listingDatesStr\" name=\"listingDatesStr\"  value=\""+$("#serverCurrTime").val() +"\"  style=\"width:126px;\" readOnly/><span class=\"red\"></span></td>"
                   +"<th><span style=\"color:red\">*</span>挂牌结束时间：</th>"
                   +"<td><input type=\"text\" class=\"required  inpt \" onClick=\"WdatePicker({dateFmt:'yyyy-MM-dd',minDate:$('#listingDatesStr').val()})\" id=\"listingDateeStr\" name=\"listingDateeStr\" value=\""+defaultEndDate()+"\"  style=\"width:126px;\" readOnly/><span class=\"red\"></span></td>"
                   +"</tr></table></fieldset>";
	    			
	    			htmlCode = htmlCode + formHtml;
	    			var selOnlineLibId = $("#selOnlineLibId").val();
	    			var ops ="<option value=\"\">--请选择--</option>";
	    			jQuery(WHCk).each(function(n){
	    				//把省、市、区信息和地址拼在一起作为交收地址
	    				var tmpAddr=WHCk[n].provice+WHCk[n].city+WHCk[n].area+WHCk[n].address;
	    				tmpAddr = tmpAddr.replace(/null/g,"");
	    				if((project !=null && project.warehouseCmpId ==WHCk[n].id)  || selOnlineLibId==WHCk[n].id){
	    					ops = ops +"<option selected value=\""+WHCk[n].id+"|"+tmpAddr+"\">"+WHCk[n].name+"</option>";
	    					$('input[name=warehouseCmpAddress]').val(tmpAddr);
	    					$('input[name=settlementAddr]').val(tmpAddr);
	    					$('input[name=warehouseCmpId]').val(WHCk[n].id);
	    					$('input[name=warehouseCmpName]').val(WHCk[n].name);
	    					
	    				}else{
	    					ops = ops +"<option value=\""+WHCk[n].id+"|"+tmpAddr+"\">"+WHCk[n].name+"</option>";
	    				}
	    			})
	    			formHtml = '<fieldset><legend>交收属性</legend><table class="c3">';
	    			jQuery(JS).each(function (i){creatForm(this,i,JS.length,fullName,project)});
	    			if($("#goodsType").val() == 1) {
	    				formHtml = formHtml+"<tr><th>是否允许自提：</th><td colspan='3'>"
		    			 +"<input id=\"selfDeliver1\" name=\"selfDeliver\" type=\"radio\" value=\"1\"  /> 是   "
		                   +"<input id=\"selfDeliver0\" name=\"selfDeliver\" type=\"radio\" value=\"0\"  checked/> 否</td></tr>";
	    			}
	    			formHtml = formHtml+"<tr><th>交收仓库：</th><td >"
                   +"<input id=\"isDirectWhc0\" name=\"isDirectWhc\" type=\"radio\" value=\"0\" onclick=\"isDirectWH();\" /> 非指定交收库   "
                   +"<input id=\"isDirectWhc1\" name=\"isDirectWhc\" type=\"radio\" value=\"1\" onclick=\"isDirectWH();\" checked/> 指定交收库"
                   +"</td><td id = \"warehouseCmpTd\" colspan=\"2\"><select id = \"warehouseCmp\" name = \"warehouseCmp\" onchange=\"setWHCvalue();\"   style=\"width:150px;\"  class=\" required  \">" +

	    			ops+"</select><span class=\"red\"></span></td></tr>" +
	    			"<tr id=\"whcmpInfo\" style=\"display:none\"><th><span style=\"color:red\">*</span>仓库名称：</th>" +
	    			"<td><input type=\"text\" class=\"required  inpt saveName\"  id=\"warehouseCmpNameS\" name=\"warehouseCmpNameS\"   style=\"width:126px;\" value=\""+$("#sellineLibName").val()+"\" readOnly /><span class=\"red\"></span>" +
	    					"&nbsp;<a href='#0' id='btn_open' onclick='selectCoop1();'>选择</a>"+
	    					"&nbsp;&nbsp;<a href='#0' id='btn_save' onclick='saveLibrary();'>保存</a></td>"+
	    			"<th><span style=\"color:red\">*</span>交收地址：</th>" +
	    			"<td><input type=\"text\" class=\"required  inpt saveAdd\"  id=\"settlementAddrS\" name=\"settlementAddrS\"   style=\"width:126px;\" value=\""+$("#sellineLibAddr").val()+"\" readOnly /><span class=\"red\"></span></td></tr>";
	    			
	    			formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;
	    			
	    			formHtml = '<fieldset><legend>其他属性</legend><table class="c3">'+
	    			"<tr><th width=\"100px\">备注信息：</th>" +
	    			"<td><textarea name=\"remark\" id=\"remark\" cols=\"80\" rows=\"3\" maxlength=\"340\" title=\"请不要超过340的长度\"></textarea><span class=\"red\"></span></td></tr>"; 
	    			formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;
	    			
	    			
	    			$('#listingTable').html(htmlCode);
	    			$("input[name=isWholeOrder][value=0]").attr("checked",true);
	    			$("input[name=isNewPriceSett][value=0]").attr("checked",true);
	    			//交收截止日期默认为当前日期+1
	    			var settlementDate = getSettleDate();
	    			addDays(settlementDate,1);
	    			$("#settlementDate").val(Hundsun.formatDate(settlementDate,"yyyy-MM-dd"));
	    			
	    			//判断交收方式，是否可以选择“全款结算场外交收”，
	    			//只有信用卖家,且具有全款支付功能，在用保证金挂牌和信用挂牌时能选择。add by hsl 2012-12-04
	    			//库存挂牌时可以具有全款支付功能 add by hsl 2013-6-17；非库存现有量挂牌挂牌与库存挂牌相同
	    			var deliveryType3Show = false;
	    			if( $("#isFullPayment").val()=="1" && $("#isCreditTrade").val()=="1"){
	    				if($("#listingType").val() =="D" || $("#listingType").val() =="G" || $("#listingType").val() =="W" || $("#listingType").val() =="F"){
	    					deliveryType3Show=true;
	    				}
	    			}
	    			if(deliveryType3Show==false){
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
	    				var projectListingType= null==project ? "" : project.listingType;
	    				if((receiptId!=null && receiptId!="") || projectListingType=="W" || projectListingType=="F"){
	    					//如果是非库存现有量挂牌，只能选择指定交收仓库
	    					if(projectListingType!="F"){
	    						document.getElementById("warehouseCmp").disabled=true;
		    					document.getElementById("warehouseCmpTd").style.display="";
	    					}
	    					document.getElementById("whcmpInfo").style.display="none";
	    					$("input[name=isDirectWhc]:eq(1)").attr("checked",'checked');
	    					if(projectListingType!="F"){
	    						document.getElementById("isDirectWhc1").disabled=true;
	    					}
	    					document.getElementById("isDirectWhc0").disabled=true;
	    					
	    					if(projectListingType=="W" || projectListingType=="F"){ //库存挂牌，只允许全款结算场外交收和线下结算场外交收，再加个预付款结算
		    					$('input[name=deliveryType]').each(function(){
			    					if($(this).val()=="1" || $(this).val()=="2"){
			    						$(this).next().hide();
			    						$(this).remove();
			    					}
			    				});
	    					}
	    					
	    					if(receiptId!=null && receiptId!=""){
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
	    					}
	    				}
	    			}
	    			if($("#manufacuturer")){//选择生产商
	    				var readAttr = $("#manufacuturer").attr("readOnly");
	    				if(readAttr && (readAttr=="readOnly" || readAttr=="readonly" || readAttr=="true")){}
	    				else
	    				{$("#manufacuturer").after(" <a href='#0' class='producer' id='btn_open' onclick='selectCoop();'>选择</a>&nbsp;&nbsp;<a href='#0' class='producer' id='btn_open' onclick='saveProducers();'>保存</a>");}
	    			}
	    			
	    		}    	
	        );
}

function creatForm(attr,i,length,varietyFullName,project){
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
		//判断是否必填
		if(isRequired == "1"){
			appendHtml = appendHtml + " <th  width=\"12%\">"+"\<span style=\"color:red\">*</span>"+attr.keyTitle+"：</th>";
		}else{
			appendHtml = appendHtml + " <th  width=\"12%\">"+attr.keyTitle+"：</th>";
		}
		
		if(attr.keyCode=="varietyCode"){
			value =varietyFullName;
			attr.keyCode = "varietyName";
		}
		if(attr.keyCode=="listUnitPrice"){
			attr.keyCode = "listUnitPrice_num";
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
				if(attr.keyCode =="varietyName"){
					readOnly = "readOnly";
				}
			}
			if(project &&( project.listingType =="W"  || project.listingType =="F")){
				value = project[attr.keyCode]== null ? "":project[attr.keyCode];
			}
		}
		
		if(value==""){
			if(attr.text ==null || typeof attr.text == "undefined"){
				value="";
			}else{
				value =attr.text;
			}
		}

	appendHtml = appendHtml + "<td width=\"30%\">";
	//输入框为文本框 
	if(inputType == "TEXT"){
		var onblurFunc="";
		if(attr.keyCode=="listWeight" || attr.keyCode=="minWeight"){
			onblurFunc = 'onblur="checkWeight();"';
			var listingType = $("#listingType").val();
			if(listingType =="W" && attr.keyCode=="listWeight"){readOnly = "readOnly";}
		}
		if(attr.keyCode =="listUnitPrice_num"&& $("#listUnitPriceF").val()!=""){
			value = parseFloat(Number(accDiv($("#listUnitPriceF").val(),100))).toFixed(2)+"";
		}
		if(attr.keyCode=="listNum") {
			onblurFunc = 'onchange="setListWeight()"';
		}
		//承钢卷板类型
		var ERP = $("#erpSystem").val();
		var erpNo = $("#erpNo").val();
		if(ERP=="CHENGGANG" && erpNo.substr(0,4)=="5060" && (attr.keyCode=="width" || attr.keyCode=="length" || attr.keyCode=="thickness")){
			appendHtml = appendHtml + "<input type=\"text\"  id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\" value=\"\"  "+ readOnly+" "+ onblurFunc+" class=\"inpt  "+clas+"\" style=\"width:126px;\" />"+unitType+" <span class=\"red\"></span>";
		}else{
			appendHtml = appendHtml + "<input type=\"text\"  id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\" value=\""+value+"\"  "+ readOnly+" "+ onblurFunc+" class=\"inpt  "+clas+"\" style=\"width:126px;\" />"+unitType+" <span class=\"red\"></span>";
		}
	}
	else if(inputType == "DATE"){
		//格式日期
		if((value+"").indexOf("-")>=0){
	    	
	    }else{
	    	value = Hundsun.formatDate(value,"yyyy-MM-dd")
	    }
		if(project && project.listingType =="C" && attr.keyCode!="settlementDate" && attr.keyCode=="productionDate"){
			appendHtml = appendHtml + "<input type=\"text\" maxlength=\"100\" id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\" readOnly  value=\""+value+"\"  "+ readOnly+" class=\"inpt "+clas+"\" style=\"width:126px;\" /> <span class=\"red\"></span>";
		}else{
			appendHtml = appendHtml + "<input type=\"text\" maxlength=\"100\" id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\" readOnly onClick=\"WdatePicker()\" value=\""+value+"\"  "+ readOnly+" class=\"inpt "+clas+"\" style=\"width:126px;\" /> <span class=\"red\"></span>";
		}
	}else if(inputType == "TEXTAREA"){//输入框为文本域 
			appendHtml = appendHtml + "<textarea rows=\"2\" cols=\"30\"  id=\""+attr.keyCode+"\" name=\""+attr.keyCode+ "\" class=\"inpt "+clas+"\" >"+value+"</textarea><span class=\"red\"></span>";
	}else if(inputType == "DATETIME"){
		//格式日期
		if((value+"").indexOf("-")>=0){
	    	
	    }else{
	    	value = Hundsun.formatDate(value,"yyyy-MM-dd HH:mm:ss")
	    }
		appendHtml = appendHtml + "<input type=\"text\" maxlength=\"100\" id=\""+attr.keyCode+"\" name=\""+attr.keyCode+"\" readOnly onClick=\"WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})\" value=\""+value+"\"  "+ readOnly+" class=\"inpt "+clas+"\" style=\"width:126px;\" /> <span class=\"red\"></span>";
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
				//设置CHECKBOX默认选择项
				if(value && value.indexOf(arrval[0])>=0){
					appendHtml = appendHtml + "<input type=\"checkbox\" name=\""+attr.keyCode+"\" value=\""+arrval[0]+"\" "+clickFunc+" class=\"inp \" /> <font>" + arrval[1]+"</font>";
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
			appendHtml = appendHtml + "<select id=\""+attr.keyCode+"\"  name=\""+attr.keyCode+"\" class=\"select  "+clas+"\" "+clickFunc+" style=\"width:130px;\">";
			//appendHtml = appendHtml + "<option value=\"\">请选择</option>";
			jQuery(attr_values).each(function(j){
				var arrval = attr_values[j]== null? "": attr_values[j].split("|");
				//修改时设置SELECT默认选择项
				if(value ==arrval[0]){
					if("measureType"!=attr.keyCode){
						appendHtml = appendHtml + "<option value=\""+arrval[0]+"\" selected>"+arrval[1]+"</option>";
					}else{
						appendHtml = appendHtml + "<option value=\""+arrval[0]+"\">"+arrval[1]+"</option>";
					}
				}else{
					if("measureType"==attr.keyCode){
						if(arrval[0]=="理重"){
							appendHtml = appendHtml + "<option value=\""+arrval[0]+"\" selected>"+arrval[1]+"</option>";
						}else{
							appendHtml = appendHtml + "<option value=\""+arrval[0]+"\">"+arrval[1]+"</option>";
						}
					}else{
						appendHtml = appendHtml + "<option value=\""+arrval[0]+"\">"+arrval[1]+"</option>";
					}
				}
			});
			appendHtml = appendHtml + "</select><span id=\""+attr.keyCode+"_select\"></span><span class=\"red\"></span>";
		}else if(inputType == "RADIO"){ //console.log(attr_values);
			//单选按钮
			jQuery(attr_values).each(function(j){
				var arrval = attr_values[j]== null? "": attr_values[j].split("|");
				var clickFunc ="";
				if(attr.keyCode=="deliveryType"){
					clickFunc = 'onclick="setWHValue();"';
				}
				//修改时设置RADIO默认选择项
				if(value ==arrval[0]){
					appendHtml = appendHtml + "<input type=\"radio\" id=\""+attr.keyCode+j+"\" name=\""+attr.keyCode+"\" value=\""+arrval[0]+"\"  "+clickFunc+"  checked class=\"inp\" /> " + arrval[1]+"&nbsp;&nbsp;";
				}else{
					appendHtml = appendHtml + "<input type=\"radio\" id=\""+attr.keyCode+j+"\" name=\""+attr.keyCode+"\" value=\""+arrval[0]+"\"   "+clickFunc+" class=\"inp\" /> " + arrval[1]+"&nbsp;&nbsp;";
				}
			});
			appendHtml = appendHtml + "<span class=\"red\"></span>";
			if (isRequired == "1") {
				appendHtml += '<font class="error" required generate"true" style="display:none" for="'+attr.keyCode+'" forTitle="'+attr.keyTitle+'">至少选择一个选项</font>';
			}
		}
	//文件类型	
	}else if(inputType == "FILE"){
		appendHtml = appendHtml + "<input type=\"file\" maxlength=\"255\" name=\""+attr.keyCode+"_file\" value=\""+value+"\" class=\"inpt  "+clas+"\" style=\"width:126px;\" /><span  style=\"margin-left:70px;\" class=\"red\"></span>";
	}
	appendHtml = appendHtml + "</td>";
	if(i%2==1 || i == length-1){
		appendHtml = appendHtml + "</tr>";
		formHtml = formHtml+appendHtml;
	}
}




/**
 * 日期添加value天
 * @param date
 * @param value
 */
function   addDays(date,value)  { 
	date.setDate(date.getDate()+value);  
}

/**
 * 获取交收截止日期，当前日期从后台获取
 * @returns
 */
function getSettleDate(){
	var str = $("#serverCurrTime").val();
	if(str!=null){
		try{
			var settleDateStr = str.substring(0,10);
			settleDateStr = settleDateStr.replace(/-/g,"/");
			var settleDate = new Date(Date.parse(settleDateStr));
			return  settleDate;
		}catch(e){
			return new Date();
		}
	}else{
		return new Date();
	}
}

function   defaultEndDate()  { 
	var str = $("#serverCurrTime").val();
	if(str!=null){
		return str;//return str.substring(0,10)+" 23:59";
	}else{
		return Hundsun.formatDate(new Date(),"yyyy-MM-dd");//+" 23:59"; 
	}
	
} 

function   getMinStartDate()  { 
	var str = $("#serverCurrTime").val();
	if(str!=null){
		return str; //return str.substring(0,10)+" 00:00";
	}else{
		return Hundsun.formatDate(new Date(),"yyyy-MM-dd"); //+" 00:00"; 
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
function isExistOption(id, value) {
	var isExist = false;
	var count = $('#' + id).find('option').length;
	for ( var i = 0; i < count; i++) {
		if ($('#' + id).get(0).options[i].value == value) {
			isExist = true;
			break;
		}
	}
	return isExist;
}

// 增加select项
function addOptionValue(id, value, text) {
	var obj = $("select[id='" + id + "']");
	if(null != obj && typeof obj != 'undefined' && obj.length > 0){
		if (!isExistOption(id, value) && text != "") {
			obj.append("<option value=" + value + ">" + text + "</option>");
			obj.val(value); // 设置选中
		}
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
