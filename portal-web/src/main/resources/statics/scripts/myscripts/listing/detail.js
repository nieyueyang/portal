function shopping_cart() {
	art.dialog({
		title : '购物车',
		content : document.getElementById('shoppingCart'),
		id : 'mycart',
		left : 990,
		top : 100,
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
		url : appServer + "/listing/cart/total.htm?t="+new Date().getTime(),
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

})
