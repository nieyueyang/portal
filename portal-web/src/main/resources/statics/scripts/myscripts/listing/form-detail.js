var formHtml;
var appendHtml = '';
jQuery(function(){
	createTableByVariety();
})
var priceUnit="",moneyUnit="元",weightUnit="";  //挂牌价格、钱和重量单位
//创建表单
function createTableByVariety(type){
	var id = $("input[name=id]").val();
	 jQuery.get(        
			 appServer + '/listing/load_detail_'+id+'_detail_null_null.htm?'+Math.round((Math.random()) * 100000000),
	    		function(data){
	    			var htmlCode='';
	    			var project = data.tradeListingProject;
	    			var isDirect="否",buyerDivDisplay="display:none",buyerCount=0;
	    			var buyType="";
	    			//常规物品属性列表
	    			var WP = data.WP_LIST;
	    			//规格属性列表
	    			var GG = data.GG_LIST;
	    			//交易属性列表
	    			var JY = data.JY_LIST;
	    			//交收属性列表
	    			var JS = data.JS_LIST;
	    			if(project.isDirect=="1"){
	    				isDirect="是";
	    				buyerDivDisplay = "";
	    				
	    				var cd = data.directList;
	    				jQuery(cd).each(function (i){
	    					buyerList.push({  
								companyId : cd[i].companyId,
								companyName : cd[i].companyName
							});
	    					idList.push(cd[i].companyId);
	    				});
	    				buyerCount = buyerList.length;
	                }
	    			
	    			if(project.buyType){
	    				var buyTypes = project.buyType.split(",");
		    			jQuery(buyTypes).each(function(s){
		    				if(buyTypes[s]=="M"){
		    					buyType="现款购买";
		    				}else if(buyTypes[s]=="C"){
		    					buyType=buyType+",仓单融资购买";
		    				}else if(buyTypes[s]=="D"){
		    					buyType=buyType+",订单融资购买";
		    				}
		    			})
	    			}
	    			
	    			formHtml = '<fieldset><legend>常规物品属性</legend><table class="c3">';
	    			jQuery(WP).each(function (i){creatForm(this,i,WP.length,type,project)});
	    			formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;
	    			
	    			formHtml = '<fieldset><legend>物品规格属性</legend><table class="c3">';
	    			jQuery(GG).each(function (i){creatForm(this,i,GG.length,type,project)});
	    			formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;

	    			formHtml = '<fieldset><legend>交易属性</legend><table class="c3">';
	    			jQuery(JY).each(function (i){
	    				if(this.keyCode!="isNewPriceSett"){
	    					creatForm(this,i,JY.length,type,project);
	    				} else if($("#listingType").val() == "F") {
	    					creatForm(this,i,JY.length,type,project);
	    				} else {
	    					appendHtml = "";
	    				}
	    			});
	    			formHtml = formHtml+
	    			"<tr>"  
                   +"<th>是否定向：</th><td>"+isDirect
                   +"<span id=\"selectBuyerDiv\" style='color:black;"+ buyerDivDisplay+"' >"
				   +"<strong class=\"bg_co1\">"
	    		   +"<span id=\"userCount\" class=\"red\">"+buyerCount+"</span></strong>&nbsp;位买家"
				   +"<a href=\"javascript:void(0);\" class=\"button-8\" id=\"viewBuyer\" onclick=\"viewBuyerClick('V');return false; \">查看</a>"
                   +"</span></td>" 
                   if("F"==project.listingType) {
		    			formHtml = formHtml+"<th>价格审批编号：</th><td>"+ Hundsun.StringUtil.trim(project.priceApproval) +"</td>"
	    			}
	    			formHtml = formHtml+"</tr>"
                  
                   +"<tr><th>挂牌开始时间：</th><td>"+Hundsun.formatDate(project.listingDates,"yyyy-MM-dd") +"</td>"
                   +"<th>挂牌结束时间：</th><td>"+Hundsun.formatDate(project.listingDatee,"yyyy-MM-dd")+"</td>"
                   +"</tr></table></fieldset>";
	    			
	    			htmlCode = htmlCode + formHtml;
	    			
	    			var surplusDelist=parseFloat(Number(project.surplusWeight)).toFixed(3);//剩余重量
	    			var sld = surplusDelist.split(".");
	    			if(sld[1]=="000"){
	    				surplusDelist = sld[0]+".0"
	    			}
	    			var surplusDeposit = "";//剩余保证金
	    			var listingDeposit = "";//挂牌保证金
	    			var remark = "";//备注
	    			if(project.surplusDeposit!=null){
	    				surplusDeposit =project.surplusDeposit;
	    				surplusDeposit = parseFloat(Number(accDiv(surplusDeposit,100))).toFixed(2)+"";
	    			}else{
	    				surplusDeposit = "0.00";
	    			}
	    			if(project.listingDeposit!=null){
	    				listingDeposit =project.listingDeposit;
	    				listingDeposit = parseFloat(Number(accDiv(listingDeposit,100))).toFixed(2);
	    			}else{
	    				listingDeposit = "0.00";
	    			}
	    			if(project.remark!=null){
	    				remark =project.remark;
	    			}
	    			
	    			formHtml = '<fieldset><legend>交收属性</legend><table class="c3">';
	    			
	    			formHtml = formHtml+"<tr><th>交收仓库：</th><td>" +project.warehouseCmpName+
	    			"</td><th>剩余量：</th><td><font size=4 color=\"red\" class=\"s_wt\">"+surplusDelist+"</font></td></tr>"    
	    			+"<tr><th>挂牌保证金：</th><td class=\"s_mt\">"+listingDeposit+"</td>"
	                   +"<th>剩余保证金：</th><td><font color=\"red\" class=\"s_mt\">"+surplusDeposit+"</font></td></tr>";
	    			if($("#goodsType").val() == "1") {
	    				var isSelfDeliver = "否";
		    			if($("#selfDeliver").val() == "1") {
		    				isSelfDeliver = "是";
		    			} 
	    				formHtml = formHtml+"<tr><th>是否允许自提：</th><td colspan='3'>"+isSelfDeliver+"</td></tr>";
	    			}
	    			jQuery(JS).each(function (i){creatForm(this,i,JS.length,type,project)});
	    			//formHtml = formHtml +"<tr><th>备注：</th><td colspan=\"3\">"+remark+"</td>"+"</tr>"+
	    			formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;
	    			$('#listingTable').html(htmlCode);
	    			$(".s_wt").append(weightUnit); 
	    			$(".s_pt").append(priceUnit); 
	    			$(".s_mt").append(moneyUnit);
	    		}    	
	        );
}
function creatForm(attr,i,length,type,project){
	var inputType = attr.keyType;//类型
	var groupType = attr.groupType;//属性组类型；F=常规；D=动态
	var value="",unit="";
	if(attr.unitType !=null){
		unit = attr.unitType;
	}
	if(i%2==0){
		appendHtml = '<tr>';
	}
	//如果是常规属性,value为挂牌主表的对应字段值
	if(groupType=="D"){
		value = attr.value ;
	}else{
		value = project[attr.keyCode] ;
		var attr_values = attr.text == null? "": attr.text.split("\n");
		if(inputType == "SELECT" || inputType == "RADIO"){
			var attr_values = attr.text == null? "": attr.text.split("\n");
			
			jQuery(attr_values).each(function(j){
				var arrval = attr_values[j]== null? "": attr_values[j].split("|");
				if(value ==arrval[0]){
					value = arrval[1];
					if(attr.keyCode=="material"){
						document.getElementById("material").innerHTML=value;
					}
				}
			});
		}else if(inputType == "CHECKBOX"){
			var showValue = "";
			jQuery(attr_values).each(function(j){
				var arrval = attr_values[j]== null? "": attr_values[j].split("|");
				var oldValue = value;
				//修改时设置CHECKBOX默认选择项
				if(oldValue){
					if(oldValue.indexOf(arrval[0])>=0){
						showValue = showValue+","+arrval[1];
					}
				}
				
			});
			value = showValue.substring(1, showValue.length);
		}
	}
	if(attr.keyCode=="varietyCode"){
		value =project.varietyName;
	}
	if(value ==null || value=="undefined" || value =="null"){
		value="";
	}
	if(attr.keyCode=="listWeight" || attr.keyCode=="minWeight"){
		value = parseFloat(Number(value)).toFixed(3);
		var kv = value.split(".");
		if(kv[1]=="000"){
			value = kv[0]+".0"
		}
		if(attr.keyCode=="listWeight"){weightUnit = unit;}
	}
	
	if(attr.keyCode=="listUnitPrice"){
		priceUnit = unit;
		value = parseFloat(Number(accDiv(value,100))).toFixed(2);
	}
	
	//格式日期
	if(inputType == "DATE"){
		if((value+"").indexOf("-")>=0){
	    	
	    }else{
	    	value = Hundsun.formatDate(value,"yyyy-MM-dd")
	    }
		
	}
	
	//格式日期时间
	if(inputType == "DATETIME"){
		if((value+"").indexOf("-")>=0){
	    	
	    }else{
	    	value = Hundsun.formatDate(value,"yyyy-MM-dd HH:mm:ss")
	    }
		
	}
	if(attr.keyType=="FILE"){
		  var uploadServer = $('input[name=uploadServer]').val();
		  var downFileName = "";
		  var aElement = "<a target=\"_blank\" href="+uploadServer+value+">";
		  if(!value){}else{
				if(attr.keyCode=="uploadFile"){
					downFileName = project.uploadFileName;
					aElement = "<a  href="+appServer+"/detail/downUploadFile.htm?id="+project.id+">";
				}else{
					downFileName="点击下载"
				}
		  }
		  
		  if(value==""){
			  appendHtml = appendHtml + " <th width=\"132px\">"+attr.keyTitle+"：</th><td width=\"227px\"></td>";
		  }else{
			  appendHtml = appendHtml + " <th width=\"132px\">"+attr.keyTitle+"：</th><td width=\"227px\">"+aElement+downFileName+"</a></td>";
		  }
	}else{
		  if(typeof(value)=="string"){
			  value = value.replace(/</g, '&lt');
		  }
		  appendHtml = appendHtml + " <th width=\"132px\" >"+attr.keyTitle+"：</th><td width=\"227px\" style=\"word-break : break-all; \">"+ value+"  "+unit+"</td>";

	}	
	
	if(i%2==1 || i == length-1){
		appendHtml = appendHtml + "</tr>";
		formHtml = formHtml+appendHtml;
	}
}