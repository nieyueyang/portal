
var pieceId;
var spaceId;
var bidType;
var status;
var increase;
var res_pieceId;
$(function() {
	
	// 显示定向会员
	$("#directMemberDialog").dialog({
		autoOpen : false,
		bgiframe : true,
		modal : true,
		position : [300, 100],
		width : 750,
		minHeight : 450,
		title : "定向会员",
		buttons : {
			"取消" : function() {
				$(this).dialog("close");
			}
		}
	});
	$("#directMemberDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
	$("#directMember").click(function() {
		$("#directMemberDialog").dialog("open");
	});
	$("#directMemberDialogForm input[id=listdirectMemberDialog]").live("click",function() {
		$.ajax({
			contentType : "application/json; charset=gbk",
			cache : false
		})

	});		
	
	// 显示回应成员
	$("#companyDialog").dialog({
		autoOpen : false,
		bgiframe : true,
		modal : true,
		position : [300, 100],
		width : 750,
		minHeight : 450,
		title : "回应成员",
		buttons : {
			"取消" : function() {
				$(this).dialog("close");
			}
		}
	});
	$("#companyDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
	$("#responseMember").click(function() {
		$("#companyDialog").dialog("open");
	});
	$("#companyDialogForm input[id=listCompanys]").live("click",function() {
		$.ajax({
			contentType : "application/json; charset=gbk",
			cache : false
		})

	});		
	
	//报价信息
	$("#bidFlowDialog").dialog({
		autoOpen : false,
		bgiframe : true,
		modal : true,
		position : [300, 100],
		width : 750,
		minHeight : 450,
		title : "报价信息",
		buttons : {
			"取消" : function() {
				$(this).dialog("close");
			}
		}
	});
	$("#bidFlowDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
	
	$("#bidFlowDialog").bind("dialogopen", function(event, ui) {
		
		$("#bidFlowDialog").load(appServer
				+ "/ajax/company/bidFlowList.htm?t="+Math.random()+"&pieceId="+pieceId+"&bidType="+bidType+"&status="+status+"&increase="+increase);
	});
	
	$("#bidFlowDialogForm input[id=listbid]").live("click",function() {
		$.ajax({
			contentType : "application/json; charset=gbk",
			cache : false
		})

	});		
	
    $("#pieceGoodsDialog").dialog({
		autoOpen : false,
		modal : true,
		position : [250, 100],
		width: 1000,
		minHeight : 450,
		title : "标段货品",
		buttons : {
			"返回" : function() {
				$( this ).dialog("close");
			}
		}
	});
	$("#pieceGoodsDialog").bind("dialogopen", function(event, ui) {
		$("#pieceGoodsDialog").load(appServer
				+ "/auction/space/ajax/piece_goods_list.htm?t="+Math.random()+"&pieceId="+pieceId);
	});
	
	$("#pieceGoodsDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
	
	$("#bargainDialog").dialog({
		autoOpen : false,
		modal : true,
		position : [250, 100],
		width: 800,
		minHeight : 450,
		title : "询价",
		buttons : {
			"返回" : function() {
				$( this ).dialog("close");
			}
		}
	});
	$("#bargainDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});

	$("#bargainDialog").bind("dialogopen", function(event, ui) {
		$("#bargainDialog").load(appServer
				+ "/ajax/bargainList.htm?t="+Math.random()+"&pieceId="+pieceId);
	});
	
	$("#bargainDealDialog").dialog({
		autoOpen : false,
		modal : true,
		position : [250, 100],
		width: 800,
		minHeight : 450,
		title : "询价成交",
		buttons : {
			"确认成交" : function() {
				var t = $('#isHaveDeal').val();
				var msg = '是否确认场次成交？';
				if('false'==t){
					msg = '场次所有标段均未询价，是否结束此次询价！';
				}
				if(window.confirm(msg)){
					$('#form3').submit();
				}
				$( this ).dialog("close");
			},
			"返回" : function() {
				$( this ).dialog("close");
			}
		}
	});
	$("#bargainDealDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});

	$("#bargainDealDialog").bind("dialogopen", function(event, ui) {
		$("#bargainDealDialog").load(appServer
				+ "/ajax/bargainDealList.htm?t="+Math.random()+"&spaceId="+spaceId);
	});
	
})

function showGoods(id) {
	pieceId = id;
	$("#pieceGoodsDialog").dialog("open");
}

function showBidFlow(id,type,sta,inc){
	pieceId=id;
	bidType=type;
	status= sta;
	increase = inc;
	$("#bidFlowDialog").dialog("open");
}

function showPieceResponse(id){
	res_pieceId=id;
	$("#companyDialog").dialog("open");
}

function bargain(id){
	pieceId = id;
	$("#bargainDialog").dialog("open");
}

function bargainDeal(id){
	spaceId = id;
	$("#bargainDealDialog").dialog("open");
}


