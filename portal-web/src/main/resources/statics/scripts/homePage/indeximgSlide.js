/* 首页中部横向滚动 */
var page = 1;
	var i = 1; //每版放1个图片
	var long = document.documentElement.clientWidth; //移动的距离
	var gotime =800; //单张移动的速度
	var stoptime =10000; //滚动间隔
	var parent,len,page_count,none_unit_width,parent_html;
//向右 按钮
	function gr(e){
		$(".switcher a").eq(page%5).addClass("cur").siblings("a").removeClass("cur");
		if( !parent.is(":animated") ){
			if( page > page_count ){  //超过最后一个版面了，跳转到第一个版面，然后再动一次。
				parent.animate({ left : 0}, 0); //通过改变left值
				parent.animate({ left : '-='+long}, e);
				page = 2;

			}else{
				parent.animate({ left : '-='+long}, e);  //通过改变left值，达到每次换一个版面
				page++;
			}
		}
	}
//往左 按钮
	function gl(e){

		if( !parent.is(":animated") ){
			if( page == 1 ){  //已经到第一个版面了,如果再向前，切换到下一组的对应位置，再改变
				parent.animate({ left : '-='+long*(page_count)}, 0); //通过改变left值
				parent.animate({ left : '+='+long }, e);
				page = page_count;
			}else{
				parent.animate({ left : '+='+long }, e);  //通过改变left值，达到每次换一个版面
				page--;
			}
		}
		$(".switcher a").eq(page%5-1).addClass("cur").siblings("a").removeClass("cur");
	}
$(function(){
	len = $(".prolist_con ul").length;
	page_count = Math.ceil(len / i) ;   //只要不是整数，就往大的方向取最小的整数
	none_unit_width = $(".prolist").width(); //获取框架内容的宽度,不带单位
	parent = $(".prolist_con");
	parent_html = $(".prolist_con ul").first().clone()    //将第一个UL克隆
	$(".prolist_con").append(parent_html)    //在后面插入克隆的UL
	$(".prolist_con").width(long*(page_count+1))   //改变con宽度
	$(".index_gundong .goRight").click(function(){
		 gr(gotime)
		});
	$(".index_gundong .goLeft").click(function(){
		gl(gotime)
		});
	$(".switcher a").click(function(){
		$(this).addClass("cur").siblings("a").removeClass("cur");
		var index=$(this).index();
		$(".prolist_con").animate({ left : -long*index }, gotime)
		page=index+1
	})
	var cjgd = setInterval("gr("+gotime+")", stoptime);
	$(".index_gundong").mouseover(function() {clearInterval(cjgd)})
   	$(".index_gundong").mouseout(function(){cjgd=setInterval("gr("+gotime+")", stoptime)} )
});
