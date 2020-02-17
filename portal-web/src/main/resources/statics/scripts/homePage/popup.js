/*******  弹出层	**********/

//设置弹出状态：0 启用; 1 禁用;
var popupStatus = 0;

//加载弹出层!
function loadPopup(obj){
	//状态0启用
	if(popupStatus==0){
		$("#backgroundPopup").css({
			"opacity": "0.3"
		});
		$("#backgroundPopup").fadeIn("500");
		$("#popupContact").fadeIn("500");
		var img_src =$(obj).attr("title");
		//alert(img_src)
		$(".popup-body img").attr("src",img_src)
		$(".popup-body").eq(0).show();
		$(".popup-body").eq(1).hide();
		popupStatus = 1;
	}
}

//关闭弹出层
function disablePopup(){
	//状态1关闭
	if(popupStatus==1){
		$("#backgroundPopup").fadeOut("fast");
		$("#popupContact").fadeOut("fast");
		popupStatus = 0;
	}
}

//弹出层居中控制
function centerPopup(){
	//获取可见区域、弹出层的宽高
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var w_scroll=$(document).scrollTop();
	//alert(w_scroll)
	var popupHeight = $("#popupContact").height();
	var popupWidth = $("#popupContact").width();
	//控制层居中
	$("#popupContact").css({
		"position": "absolute",
		"top": windowHeight/2-popupHeight/2+w_scroll,
		"left": windowWidth/2-popupWidth/2
	});
	//针对IE6
	$("#backgroundPopup").css({
		"height": windowHeight
	});	
}

//页面加载控制事件
$(function(){
	
	//点击右上角关闭图标事件!
	$("#popupContactClose").click(function(){
		disablePopup();
	});
	//透明遮罩层区域点击关闭
	$("#backgroundPopup").click(function(){
		disablePopup();
	});
	//ESC键
	$(document).keypress(function(e){
		if(e.keyCode==27 && popupStatus==1){
			disablePopup();
		}
	});
	//点击弹出
	$("#button").click(function(){
		loadPopup();
		centerPopup();
	});
	//确认按钮
	$(".btn-ok").click(function(){
		$(".popup-body").eq(1).show();
		$(".popup-body").eq(0).hide();
	});

});
//窗口自适应
$(window).resize(centerPopup);