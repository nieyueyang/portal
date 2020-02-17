var formHtml;
var appendHtml = '';
jQuery(function(){
	createTableByVariety();
})
var priceUnit="",moneyUnit="元",weightUnit="";  //挂牌价格、钱和重量单位
//创建表单
function createTableByVariety(type){
	var id = $("input[name=id]").val();
	
		var weightUnitType = $("input[name=weightUnitType]").val();//从隐藏域中获取 重量单位
	var priceUnitType = $("input[name=priceUnitType]").val();//从隐藏域中获取 金额单位
	 jQuery.get(        
			 appServer + '/entrustDelisting/load_detail_'+id+'_detail_null.htm?' + Math.round((Math.random()) * 100000000),
	    		function(data){
	    			
	    			if(data.msg !=null && data.msg!=""){
	    						Hundsun.PopUtil.alert({
								msg:data.msg,
								autohide : true,
								width:350,
								timeout:800,
								callback :function(){
									javascript:history.go(-1);
								}
							})
	    			} else {
	    			
	    			var htmlCode='';
	    			var project = data.tradeListingProject;
	    			var agentDirectUser = data.agentDirectUser;
	    			var rateItemList= data.rateItemList;
	    		
	    			
	    			//alert("数量11:" + project.listWeight);
	    			//var isDirect="否",buyerDivDisplay="display:none",buyerCount=0;
	    			//var buyType="";
	    			//常规物品属性列表
	    			var WP = data.WP_LIST;
	    			//规格属性列表
	    			var GG = data.GG_LIST;
	    			//交易属性列表
	    			var JY = data.JY_LIST;
	    			//交收属性列表
	    			//var JS = data.JS_LIST;
	    /*			if(project.isDirect=="1"){
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
	                }*/
	    			
	    /*			if(project.buyType){
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
	    			}*/
	    			
	    			formHtml = '<fieldset><legend>常规物品属性</legend><table class="c3">';
	    			jQuery(WP).each(function (i){creatForm(this,i,WP.length,type,project)});
	    			formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;
	    			
	    			formHtml = '<fieldset><legend>物品规格属性</legend><table class="c3">';
	    			jQuery(GG).each(function (i){creatForm(this,i,GG.length,type,project)});
	    			formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;
	    			
	    		/*	jQuery(JY).each(function (){
	    					if(this.unitType !=null && this.keyCode=="listWeight"){
								unit = attr.unitType;
								weightUnit = unit;
							}
							if(this.unitType !=null && this.keyCode=="listUnitPrice"){
								unit = attr.unitType;
								priceUnit = unit;
							}
	    			});*/
	    			
	    		weightUnit = "吨";
	    		priceUnit = "元";

	    			formHtml = '<fieldset><legend>委托代理属性</legend><table class="c3">';
	    			//jQuery(JY).each(function (i){creatForm(this,i,JY.length,type,project)});
	    			
	    			formHtml = formHtml +  "<tr><th width=\"132px\">挂牌量 ：</th>" + 
	    		      "<td width=\"227px\">" +  (project.listWeight == null ? "" : project.listWeight) + " " + (weightUnitType ==null ? "吨": weightUnitType )+ "</td>" 
	    			
	    			formHtml = formHtml +  "<th>挂牌单价 ：</th>" + 
	    		     " <td>"  + project.listUnitPriceAmt +  " " + (priceUnitType ==null ? "元/吨": priceUnitType )+ "</td> </tr>";
	    		     
	    		     
	    		   	formHtml = formHtml +  "<tr><th width=\"132px\">最小购买量:</th>" + 
	    		      "<td width=\"227px\">" +  project.minWeight + " " + (weightUnitType ==null ? "吨": weightUnitType )+ "</td>" 
	    			
	    			formHtml = formHtml +  "<th>数量 ：</th>" + 
	    		     " <td>"  + (project.listNum ==null ? "" : project.listNum) +  "</td> </tr>";  
	    		    
	    		    formHtml = formHtml +  "<tr><th width=\"132px\">首付款金额:</th>" + 
	    		      "<td width=\"227px\">" +  project.firstPayAmt + " 元</td>" 
	    			
	    			formHtml = formHtml +  "<th>首付款比例：</th>" + 
	    		     " <td >"  + project.agentDepositeRate +  "%" +  (project.firstPayPaytype == "0" ? "<span class='red'>(线上支付)</span>" : "<span class='red'>(线下支付)</span>") + "</td> </tr>";  
	    		     
	    		    formHtml = formHtml +  "<tr><th width=\"132px\">已垫款金额 :</th>" + 
	    		      "<td width=\"227px\">" +  (project.agentPayedAmt ==null ? "" : (project.agentPayedAmt + "元")) + "</td>" 
	    			
	    		     
	    			  formHtml = formHtml +  "<th width=\"132px\">最长垫款期限  :</th>" + 
	    		      "<td  width=\"227px\">" +  project.agentContractDeadline + "天</td></tr>" 
	    			
	    			formHtml = formHtml +  "<tr><th width=\"132px\" >跌价保证金比例 ：</th>" + 
	    		     " <td>"  + project.pricefallDepositeRate +  "%</td> ";  
	    		     
	    		   formHtml = formHtml +  "<th width=\"132px\">逾期违约金比例 :</th>" + 
	    		      "<td width=\"227px\">" +  project.overduePayRate  + "<font style='font-family:Lucida Sans Unicode' size='2'>&#8241;</font></td></tr>" 
	    			
	    			formHtml = formHtml +  "<tr><th>委托人：</th>" + 
	    		     " <td>"  + agentDirectUser.companyName +  "</td>";  
	    		     
	    		     
	    	        formHtml = formHtml +  "<th width=\"132px\">交收仓库 :</th>" + 
	    		      "<td width=\"227px\">" +  project.warehouseCmpName   + " </td></tr>"  
	    		      
	    		    formHtml = formHtml
						+ "<tr><th width=\"132px\">参考市场行情 :</th>"
						+ " <td width='227px' colspan='3'>"
					+ "<textarea name=\"referencePrice\" readOnly='true' class='required' id=\"referencePrice\" cols=\"45\" rows=\"2\" maxlength=\"30\" >" +  (project.referencePrice == null ? "" : project.referencePrice )  + "</textarea><span class=\"red\"></span>"
					+ "</td> </tr>";
	    		      
	    		      
	    		    formHtml = formHtml +  "<tr><th width=\"132px\">交收仓库地址 :</th>" + 
	    		      "<td  colspan=\"3\" width=\"227px\">" +  (project.warehouseCmpAddress == null ? "" :  project.warehouseCmpAddress)   + " </td></tr>"  
	    			
	    		    formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;
	    			
	    		formHtml = "<fieldset><legend>代理费率属性</legend><table class='c3'><tr><th width=\"100\" style='vertical-align:middle;'>一般代理费：</th><td colspan='3'>";
		    		if(rateItemList.length > 0) {
		    			for(var i=0; i<rateItemList.length; i++) {
		    				if(rateItemList[i].rateType == "01") {
		    					if(i<rateItemList.length-1 && rateItemList[i+1].rateType!="02") {
		    						formHtml += "<p style='margin-top:5px;'>天数："+rateItemList[i].repayCompleteDay+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
		    						"费率："+rateItemList[i].feeRate+" %&nbsp;&nbsp;</p>"
		    					}  else {
		    						formHtml += "<p id='rateItem' style='margin-top:5px;'>天数："+rateItemList[i].repayCompleteDay+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
		    						"费率："+rateItemList[i].feeRate+"%&nbsp;&nbsp;</p></td></tr>"
		    					}
		    			
		    				} else if(rateItemList[i].rateType == "02") {
		    					
		    					formHtml += "<tr><th width='100'>调增代理费：</th><td colspan='3'>" +
		    					"费率："+rateItemList[rateItemList.length-1].feeRate+"%</td></tr>"
		    				}
		    			}
		    		} 
	    			formHtml = formHtml +"</table></fieldset>";
	    			htmlCode = htmlCode + formHtml;
	    			
	    			$('#listingTable').html(htmlCode);
	    			
	    			$(".s_wt").append(weightUnit); //挂牌量
	    			$(".s_pt").append(priceUnit); //挂牌单价
	    			$(".s_mt").append(moneyUnit);
	    		}    	
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
		  if(value==""){
			  appendHtml = appendHtml + " <th width=\"132px\">"+attr.keyTitle+"：</th><td width=\"227px\"></td>";
		  }else{
			  appendHtml = appendHtml + " <th width=\"132px\">"+attr.keyTitle+"：</th><td width=\"227px\"><a href="+uploadServer+value+">点击下载</a></td>";
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