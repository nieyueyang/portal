/* 首页中部横向滚动 */
var page = 1;
	var i = 1; //每版放1个图片
	var long = 1060; //移动的距离
	var gotime =300; //移动的速度
	var stoptime =2000; //停留的时间
	var autotime=8000;//自动移动速度
	var parent,len,page_count,none_unit_width,parent_html;
//向右 按钮
	function gr(e){
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
	}
$(function(){
	len = $(".prolist_con ul").length;
	page_count = Math.ceil(len / i) ;   //只要不是整数，就往大的方向取最小的整数
	none_unit_width = $(".prolist").width(); //获取框架内容的宽度,不带单位
	parent = $(".prolist_con");
	parent_html = $(".prolist_con ul").first().clone()    //将第一个UL克隆
	$(".prolist_con").append(parent_html)    //在后面插入克隆的UL
	$(".prolist_con").width((long)*(page_count+1))   //改变con宽度
	$(".gundong .goRight").click(function(){
		 gr(gotime)
		});
	$(".gundong .goLeft").click(function(){
		gl(gotime)
		});
	//var cjgd = setInterval("gr("+autotime+")", gotime+stoptime);
	//$(".gundong").mouseover(function() {clearInterval(cjgd)})
   	//$(".gundong").mouseout(function(){cjgd=setInterval("gr("+autotime+")", stoptime)} )
});


