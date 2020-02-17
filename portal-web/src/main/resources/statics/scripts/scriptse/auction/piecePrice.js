function loadPop(pid,sid){
	pieceId = pid;
	spaceId = sid;
	$("#piecePriceDialog").dialog("open");	
}

function setDeal(fid,pid,sid) {
	$("#piecePriceDialog").load(appServer
			+ "/auction/ajax/set_deal.htm?id="+fid+"&pieceId="+pid+"&spaceId="+sid);
}

$(function() {	
	$("#piecePriceDialog").dialog({
		autoOpen : false,
		modal : true,
		position : [300, 50],
		width: 800,
		title : "标段出价记录",
		buttons : {
			"关闭" : function() {
				$( this ).dialog("close");
			}
		}
	});
	
	$("#piecePriceDialog").bind("dialogopen", function(event, ui) {
		$("#piecePriceDialog").load(appServer
				+ "/auction/ajax/bid_flow_list.htm?pieceId="+pieceId+"&spaceId="+spaceId);
	});
	
	$("#piecePriceDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
});