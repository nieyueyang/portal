	

function Windowfloat(){
	

	//--表头悬浮 开始--
	//克隆表头
	var th_num
	for (th_num=0; th_num<$("#tb_header th").length;th_num++)
	{
		$('#tb_header th').eq(th_num).width($("#tb_header th").eq(th_num).width()+"px");
		}
		var tt_copy=$("#tb_header").html();
		$("<thead id='tb_header_copy' style='display:none;'></thead>").insertBefore("#tb_header");
		$("#tb_header_copy").append(tt_copy);
	//显示隐藏
		//显示隐藏
		$(window).scroll(function(){
			var scrollTop = $(window).scrollTop();
			var twidth=$("#tb_list").width();
			var obj_copy=$("#tb_header_copy");
			if(scrollTop > 280){
				obj_copy.stop().fadeIn("fast");
				obj_copy.width(twidth);
				obj_copy.css({
								  "position":"fixed",
								  "z-index":"9999",
								  "top":"0",
								  "opacity": "1"
								  });
			}else{
				$("#tb_header_copy").hide();
			}
		});
}