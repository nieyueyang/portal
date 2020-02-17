var spaceId;
var url;
function loadPop(who,id){
	spaceId = id;
	if(who == 'buyer'){
		url = '/auction/result/ajax/buyer/bargain_piece_list.htm?t='+Math.random()+'&spaceId=';
	}else if(who == 'seller'){
		url = '/auction/result/ajax/seller/bargain_piece_list.htm?t='+Math.random()+'&spaceId=';
	}
	$("#bargainPieceDialog").dialog("open");	
}

$(function() {	
	$("#bargainPieceDialog").dialog({
		autoOpen : false,
		modal : true,
		width: 900,
		title : "场次下成交标段",
		buttons : {
			"关闭" : function() {
				$( this ).dialog("close");
			}
		}
	});
	
	$("#bargainPieceDialog").bind("dialogopen", function(event, ui) {
		$("#bargainPieceDialog").load(appServer	+ url + spaceId);
	});
	
	$("#bargainPieceDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
});