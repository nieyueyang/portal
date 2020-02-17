$(document).ready(function(e) {
			 $('#addquerstions').change(function(){
				    alert(1);
					var index ="0";
		            var movie_box ='<div class="movie_box" ></div>';
		            var Grade = $(".yd_box").find(".movie_box").length + 1;
		            
		            var wjdc_list = '<ul class="wjdc_list"></ul>'; //问答 单选 多选
		            //var danxuan = '【单选】';
			 wjdc_list = $(wjdc_list).append(' <li><div class="tm_btitlt"><i class="nmb">问题【' +Grade + '】</i><span class="tip_wz">' + '</span></div></li>');
		                    
		            movie_box = $(movie_box).append(wjdc_list);
		            movie_box = $(movie_box).append('<div class="dx_box" data-t="' + index + '"></div>');
		            
					var dxtm = $(".dxuan").html();
					
					//接受编辑内容的容器
					var dx_rq = $(movie_box).find(".dx_box");
					var title =dx_rq.attr("data-t");
					
					//题目选项的个数
					var timlrxm = $(movie_box).children(".wjdc_list").children("li").length;
					
					//var timlrxm = $(".wjdc_list").children("li").length;

					//单选题目
					if(title == 0) {
						dx_rq.show().html(dxtm);
						//模具题目选项的个数
						var bjxm_length = dx_rq.find(".title_itram").children(".kzjxx_iteam").length;
						var dxtxx_html = dx_rq.find(".title_itram").children(".kzjxx_iteam").html();
						
						//添加选项题目
						for(var i_tmxx = bjxm_length; i_tmxx < timlrxm - 1; i_tmxx++) {
							dx_rq.find(".title_itram").append("<div class='kzjxx_iteam'>" + dxtxx_html + "</div>");
						}
						
						//赋值文本框 
						//遍历题目项目的文字
						var bjjs = 0;
						$(movie_box).find(".wjdc_list").children("li").each(function() {
							//$(".wjdc_list").children("li").each(function() {
							//题目选项
							var texte_val = $(this).find("span").text();
							dx_rq.find(".title_itram").children(".kzjxx_iteam").eq(bjjs - 1).find(".input_wenbk").val(texte_val);
							bjjs++

						});
					}
					

		            $('#addquerstions').attr("value",'-1');
		            $(".yd_box").append(movie_box);
			 
			 })


				//增加选项  
				$(".zjxx").live("click",function() {
					var new_index = $(this).parent(".td1").parent(".tr1").parent().find(".new_tr").length + 1;
					alert(new_index);
					var zjxx_html =$(this).parent(".td1").parent(".tr1").next(".new_tr").children(".td3").html();
					var zjxx_html1 =$(this).parent(".td1").parent(".tr1").next(".new_tr").children(".td4").html();
					$(this).parent(".td1").parent(".tr1").parent().append("<tr class='new_tr'><td class='td2'>答案【"+new_index+"】</td><td class='td3'>"+ zjxx_html + "</td><td class='td4'>"+zjxx_html1+"</td></tr>");
					
				//	$(this).parent(".td1").parent(".tr1").after("<tr class='new_tr'>" + zjxx_html + "</tr>");
				/*	var zjxx_html = $(this).next(".title_itram").children(".kzjxx_iteam").html();
					alert(zjxx_html);
					$(this).next(".title_itram").append("<div class='kzjxx_iteam'>" + zjxx_html + "</div>");*/
					
				});
				/*$(".zjxx").live("click", function() {
					
					var zjxx_html = $(this).next(".title_itram").children(".kzjxx_iteam").html();
					alert(zjxx_html);
					$(this).next(".title_itram").append("<div class='kzjxx_iteam'>" + zjxx_html + "</div>");
					
				});*/

				
				
			});
		
		