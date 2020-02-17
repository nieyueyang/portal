	$(function(){})
	
	/*TAB切换*/
	$(function(){})
		
	/*购物车浮窗口
$(function(){
	var dl_right = ($(document).width()-960)/2 - $(".dl_left").width()-80
	$(".shop_car").css("right",(dl_right>0)?dl_right:0)
	})
var timer;
$(function(){
      $(window).scroll(function(){
        clearInterval(timer);
        var topScroll=getScroll();
        var topDiv="350px";
        var top=topScroll+parseInt(topDiv);
        timer=setInterval(function(){
            //$(".test").css("top", top+"px");
             $(".shop_car").animate({"top":top},10);
        },500)
      })
 })
function getScroll(){
         var bodyTop = 0; 
         if (typeof window.pageYOffset != 'undefined') { 
             bodyTop = window.pageYOffset; 
         } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') { 
             bodyTop = document.documentElement.scrollTop; 
         } 
         else if (typeof document.body != 'undefined') { 
             bodyTop = document.body.scrollTop; 
         } 
         return bodyTop
 }
 购物车浮窗结束口*/

function shopping_cart() {
	art.dialog({
		title : '购物车',
		content : document.getElementById('shoppingCart'),
		id : 'mycart',
		left : 810,
		top : 10,
		padding : 0,
		fixed : true,
		drag : true,
		esc:false
	//resize: false
	});
	$(".aui_close").hide();  //屏蔽购物车的关闭按钮
}
function updateShopCart() {
	jQuery.ajax({
		type : "get",
		url : appServer + "/listing/cart/total.htm",
		success : function(data) {
			if (data) {
				jQuery("#shopingCartTotalWeight").html(data.totalWeight);
				jQuery("#shopingCartTotlePrice").html(data.totlePrice);
			} else {
				alert(data.totlePrice);
				jQuery("#number").html("查询成功，读取失败");
			}
		},
		error : function(data) {
			if (data && data.info) {
				jQuery("#number").html("查询失败");
				alert(data.totlePrice);
			} else {
				jQuery("#number").html("查询失败");
			}
		}
	})
}
$(function() {
	updateShopCart();
	shopping_cart();
	/* 搜索下拉 */
	$("#select").selectbox();
	$("#ss").focus(function() {
		var s_value = $(this).val();
		if (s_value == this.defaultValue) {
			$(this).val("");
			$(this).addClass("font_c");
		}
	});
	$("#ss").blur(function() {
		var s_value = $(this).val();
		if (s_value == "") {
			$(this).val(this.defaultValue);
			$(this).removeClass("font_c");
		}
	});

	/* 导航下拉 */
	$("#nav ul li:has(ol)").hover(function() {
		$(this).children("ol").stop(true, true).slideDown(400);
	}, function() {
		$(this).children("ol").stop(true, true).slideUp("fast");
	})

	var tab = $(".box_tt ol li");
	tab.hover(function() {
		tab.removeClass("hover");
		tab.children("span").removeClass("pl30");
		$(this).addClass("hover");
		$(this).children("span").addClass("pl30");
		var index = tab.index(this);
		$(".box ul").hide().eq(index).show();
	});

})
