var pieceId;
var index;
$(function() {	
	$("#pieceGoodsDialog").dialog({
		autoOpen : false,
		modal : true,
		position : [250, 100],
		width: 1000,
		height: 450,
		title : "标段商品",
		buttons : {
			"返回" : function() {
				$( this ).dialog("close");
			}
		}
	});
	$("#pieceGoodsDialog").bind("dialogopen", function(event, ui) {
		$("#pieceGoodsDialog").load(appServer
				+ "/auction/space/ajax/piece_goods_list.htm?pieceId="+pieceId+"&t="+Math.random());
	});
	
	$("#pieceGoodsDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
	
	
	$("#bidDialog").dialog({
		autoOpen : false,
		modal : true,
		width: 800,
		height: 620,
		position : [250, 40],
		title : "竞买出价",
		buttons : {
			"返回" : function() {
				$( this ).dialog("close");
			}
		}
	});
	$("#bidDialog").bind("dialogopen", function(event, ui) {
		$("#bidDialog").load(appServer
				+ "/auction/ajax/load_piece.htm?pieceId="+pieceId+"&t="+Math.random());
	});
	
	$("#bidDialog").bind("dialogclose", function(event, ui) {
		if(typeof t != "undefined")
			clearTimeout(t);
		$(this).empty();
	});
	
	$("#checkAll").click(function(){
		$("input[name='checkThis']").each(function(){
			if($("#checkAll").attr("checked"))
				$(this).attr("checked",true);
			else
				$(this).attr("checked",false);
			
		});
	});
	
	$("#piece_cancel_resp").click(
			function() {
				var isChecked = false;
				$("#cancelPieceIds").val('');
				$("input[name='checkThis']").each(
						function() {
							if (this.checked) {
								isChecked = true;
								if ($("#cancelPieceIds").val() == '') {
									$("#cancelPieceIds").val(this.value);
								} else {
									$("#cancelPieceIds").val(
											$("#cancelPieceIds").val() + ","
													+ this.value);
								}
							}
		
						});
				if (!isChecked) {
					alert('请选择要撤销回应的标段');
					return;
				}
				if(confirm('确定要撤销已选标段的回应吗？'))
					$("#cancelResponseForm").submit();
			});
	
	$("#followDialog").dialog({
		autoOpen : false,
		modal : true,
		width: 460,
		height: 230,
		title : "产能跟价",
		buttons : {
			"确认跟价" : function() {
				$('#followForm').submit();
				$( this ).dialog("close");
			},
			"返回" : function() {
				$( this ).dialog("close");
			}
		}
	});
	$("#followDialog").bind("dialogopen", function(event, ui) {
		$("#followDialog").load(appServer
				+ "/auction/ajax/follow.htm?pieceId="+pieceId+"&t="+Math.random());
	});
	
	$("#followDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
	
	$("#bargainDialog").dialog({
		autoOpen : false,
		modal : true,
		width: 460,
		height: 230,
		title : "询价",
		buttons : {
			"同意" : function() {
				$('#buyerBargainStatus').val("1");
				$('#bargainForm').submit();
				$( this ).dialog("close");
			},
			"不同意" : function() {
				$('#buyerBargainStatus').val("2");
				$('#bargainForm').submit();
				$( this ).dialog("close");
			},
			"返回" : function() {
				$( this ).dialog("close");
			}
		}
	});
	$("#bargainDialog").bind("dialogopen", function(event, ui) {
		$("#bargainDialog").load(appServer
				+ "/auction/ajax/buyerBargain.htm?pieceId="+pieceId+"&t="+Math.random());
	});
	
	$("#bargainDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
	
	$("#bidFlowDialog").dialog({
		autoOpen : false,
		modal : true,
		position : [300, 100],
		width: 700,
		height: 450,
		title : "出价记录",
		buttons : {
			"返回" : function() {
				$( this ).dialog("close");
			}
		}
	});
	
	$("#bidFlowDialog").bind("dialogopen", function(event, ui) {
		$("#bidFlowDialog").load(appServer
				+ "/auction/ajax/buyer/bid_flow_list.htm?pieceId="+pieceId+"&t="+Math.random());
	});
	
	$("#bidFlowDialog").bind("dialogclose", function(event, ui) {
		$(this).empty();
	});
});

function showGoods(id) {
	pieceId = id;
	$("#pieceGoodsDialog").dialog("open");
}


function showPiece(id) {
	pieceId = id;
	$("#bidDialog").dialog("open");
}

function showFlow(id) {
	pieceId = id;
	$("#bidFlowDialog").dialog("open");
}

function bid() {
	jQuery.ajax({
    	contentType : "application/json; charset=UTF-8",
    	cache : false
    })
	$("#bidDialog").load(appServer
				+ "/auction/ajax/bid.htm?t="+Math.random(),$('#bidForm').serializeArray());
}

function showFollow(id) {
	pieceId = id;
	$("#followDialog").dialog("open");
}

function showBargain(id) {
	pieceId = id;
	$("#bargainDialog").dialog("open");
}
	