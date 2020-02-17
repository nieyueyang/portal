//---------------------------------------------- Pushlet 用到的 begin--------------------------------------//

var debug = true;
// var timeID = null;

window.onload = function() {
	PL._init();
	PL.joinListen("/refreshHallData");
	self.setInterval("tryRejoin()", 1000);

}

function tryRejoin() {
	if (PL.state == -2) {
		try {
			PL._init();
			PL.joinListen("/refreshHallData");
		} catch (e) {
			showMessage(e, false);
		}
	}
}
//发生错误  
/*function onError(event) {
	//setTimeout(init_my_chat , 1000);
	//window.location.reload();
	//$('#errorMsg'+id).html('推送失败，请刷新页面');
	try {
		PL._init();
		PL.joinListen("/refreshHallData");
	} catch (e) {
		showMessage(e, false);
	}
} */ 
function onData(event) {
	// 投标更新竞买结束时间
	try {
		var bidData = eval('(' + event.get("latest_data") + ')'); // 得到数据json
	// 投标报价刷新
		
		if (bidData.refresh == spaceIdRe) {
			$("#spaceFlowList tr:gt(1)").remove();
			var openCompany = $('#openCompany').val();//打开该详情的用户就是操作出价的用户
			if(bidData.map.mypriceFreeBid==true){
				if(openCompany==bidData.operator){
					$("#myprice"+bidData.map.id).text(bidData.map.myprice);
				}
			}else if(bidData.map.priceDataMap!=null){//我的出价，就是我的最高出价
				var listTemp =bidData.map.priceDataMap;
				for(var k = 0;k<listTemp.length;k++){
					if(openCompany==listTemp[k].companyIdX){
						bidData.map.myprice = listTemp[k].priceStr;
						$("#myprice"+bidData.map.id).text(bidData.map.myprice);
					}
				}
			}
			
			if(bidData.map.newprice!=null){
				$("#newprice"+bidData.map.id).text(bidData.map.newprice);
				
			}else if(bidData.map.newprice==null){
				$("#newprice"+bidData.map.id).text("0");
			}
			if(bidData.map.currentPrice!=null){
				$("#currentPrice"+bidData.map.id).val(bidData.map.currentPrice);
			}
			if(bidData.map.isAuto==null){
				$('#autoB'+bidData.map.id).hide();
			}
			if(bidData.map.isAuto!=null&&bidData.map.isAuto=="1" && bidData.map.companyNameStr!=null&&bidData.map.companyNameStr==openCompany){
				$('#autoB'+bidData.map.id).show();
				$('#autoB'+bidData.map.id).text("(代理出价)");
			}else{
				$('#autoB'+bidData.map.id).hide();
			}
			if(bidData.map.isAgent!=null&&bidData.map.isAgent==true && bidData.map.companyNameStr!=null&&bidData.map.companyNameStr==openCompany){
				$('#agent'+bidData.map.id).show();
			}else{
				$('#agent'+bidData.map.id).hide();
			}
			if(bidData.map.agentPrice!=null && bidData.map.companyNameStr!=null&&bidData.map.companyNameStr==openCompany){
				$('#agentPrice'+bidData.map.id).show();
				$('#agentPrice'+bidData.map.id).text("代理价格:"+bidData.map.agentPrice);
			}else{
				$('#agentPrice'+bidData.map.id).hide();
				$('#agentPrice'+bidData.map.id).text("");
			}
			if(bidData.map.bidSum!=null){
				$('#bidSum'+bidData.map.id).text(bidData.map.bidSum);
			}
			if(bidData.map.newprice!=null&&parseFloat(bidData.map.newprice)>parseFloat(bidData.map.myprice)){
				$("#differprice"+bidData.map.id).show();
				$("#differprice"+bidData.map.id).text((parseFloat(bidData.map.newprice)-parseFloat(bidData.map.myprice)).toFixed(2));
				$("#newprice"+bidData.map.id).css("color","red");
			}else if(bidData.map.newprice!=null&&parseFloat(bidData.map.newprice)==parseFloat(bidData.map.myprice)){
				$("#differprice"+bidData.map.id).show();
				$("#differprice"+bidData.map.id).text("您是当前最高价");
			}else{
				$("#newprice"+bidData.map.id).css("color","blue");
			}
			if(bidData.map.pieces!=null){
				var listTemp =bidData.map.pieces;
				for(var k = 0;k<listTemp.length;k++){
					$("#flowL"+listTemp[k].pieceId).empty();
					$("#flowL"+listTemp[k].pieceId).append("<tbody>");
					var flowTemp = listTemp[k].flowList;
					for(var m =0;m<flowTemp.length;m++){
						if(openCompany==flowTemp[m].companyIdX){
							$("#flowL"+listTemp[k].pieceId).append("<tr><td>"+flowTemp[m].companyNameStr+"</td><td>"+flowTemp[m].priceStr+"</td><td>"+flowTemp[m].bidTimeStr+"</td></tr>");
						}else if(spaceAuctionModeRe!=2){
							$("#flowL"+listTemp[k].pieceId).append("<tr><td>"+"****"+"</td><td>"+flowTemp[m].priceStr+"</td><td>"+flowTemp[m].bidTimeStr+"</td></tr>");
						}
					}
					$("#flowL"+listTemp[k].pieceId).append("</tbody>");
				}
			}
			if(bidData.map.flowList!=null){
				var listTemp =bidData.map.flowList;
				for(var k = 0;k<listTemp.length;k++){
					if(openCompany==listTemp[k].companyIdX){
						$("#spaceFlowList tr").last()
                        .after("<tr><td class='tl' style='WORD-WRAP: break-word' title="+listTemp[k].pieceNoX+">"
						+listTemp[k].pieceNoX+
						"</td><td class='tl' style='WORD-WRAP: break-word' title="+listTemp[k].pieceName+">"
						+listTemp[k].pieceName+
						"</td><td class='tc' style='WORD-WRAP: break-word' >"
						+listTemp[k].totalWeightStr+
						"</td><td class='tc' style='WORD-WRAP: break-word' >"
						+listTemp[k].totalWeight+
						"</td><td class='tc' style='WORD-WRAP: break-word' >"
						+listTemp[k].responseQuantityStr+
						"</td><td class='tc' style='WORD-WRAP: break-word' title="+listTemp[k].basePriceUnitStr+">"
						+listTemp[k].basePriceStr+
						"</td><td class='tc' style='WORD-WRAP: break-word' title="+listTemp[k].beginPriceUnitStr+">"
						+listTemp[k].beginPriceStr+
						"</td><td class='tc' style='WORD-WRAP: break-word' title="+listTemp[k].priceUnitStr+">"
						+listTemp[k].priceStr+
						"</td><td class='tl' style='WORD-WRAP: break-word' >"
							+listTemp[k].companyNameX+
						"</td><td class='tc' style='WORD-WRAP: break-word' >"
						+listTemp[k].bidTimeStr+
						"</td><td class='tc' style='WORD-WRAP: break-word' >"
						+listTemp[k].statusStr+
						"</td><td class='tc' style='WORD-WRAP: break-word' title="+listTemp[k].comments+">"
						+listTemp[k].commentsStr+
						"</td></tr>");
					}else if(spaceAuctionModeRe!=2){
						$("#spaceFlowList tr").last()
                        .after("<tr><td class='tl' style='WORD-WRAP: break-word' title="+listTemp[k].pieceNoX+">"
						+listTemp[k].pieceNoX+
						"</td><td class='tl' style='WORD-WRAP: break-word' title="+listTemp[k].pieceName+">"
						+listTemp[k].pieceName+
						"</td><td class='tc' style='WORD-WRAP: break-word' >"
						+listTemp[k].totalWeightStr+
						"</td><td class='tc' style='WORD-WRAP: break-word' >"
						+listTemp[k].totalWeight+
						"</td><td class='tc' style='WORD-WRAP: break-word' >"
						+listTemp[k].responseQuantityStr+
						"</td><td class='tc' style='WORD-WRAP: break-word' title="+listTemp[k].basePriceUnitStr+">"
						+listTemp[k].basePriceStr+
						"</td><td class='tc' style='WORD-WRAP: break-word' title="+listTemp[k].beginPriceUnitStr+">"
						+listTemp[k].beginPriceStr+
						"</td><td class='tc' style='WORD-WRAP: break-word' title="+listTemp[k].priceUnitStr+">"
						+listTemp[k].priceStr+
						"</td><td class='tl' style='WORD-WRAP: break-word' >"
							+"****"+
						"</td><td class='tc' style='WORD-WRAP: break-word' >"
						+listTemp[k].bidTimeStr+
						"</td><td class='tc' style='WORD-WRAP: break-word' >"
						+listTemp[k].statusStr+
						"</td><td class='tc' style='WORD-WRAP: break-word' title="+listTemp[k].comments+">"
						+listTemp[k].commentsStr+
						"</td></tr>");
					}
				}
			}
		}
	} catch (e) {
		if (debug) {
			// showMessage(e,false);
		}
	}
	
}
// ----------------------------------------------------------------------Pushlet
// 用到的end---------------------------------//
