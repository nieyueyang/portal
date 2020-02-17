//对联代码
$(function(){
	var dl_right = ($(document).width()-1100)/2 - $(".fudong_tip").width()-10
	$(".fudong_tip").css("right",(dl_right>0)?dl_right:0)
	})
function dlhide()  
{   
$(".dl_left").hide();
$(".dl_right").hide();
}
/*对联代码慢速跟随*/
var timer;
$(function(){
      $(window).scroll(function(){
        clearInterval(timer);
        var topScroll=getScroll();
        var topDiv="150px";
		var top
		if(topScroll>0)
		{
			top="150px";
			}
        else{
			top=topDiv;
			}
        timer=setInterval(function(){
            //$(".test").css("top", top+"px");
			 $(".fudong_tip").animate({"top":top},500);
        },500)
      })
 });
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
 };