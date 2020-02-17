/*
Ajax 三级联动
http://code.ciaoca.cn/
日期：2012-7-18

settings 参数说明
-----
url:数据josn文件路径
aSection:默认一级菜单
bSection:默认二级菜单
cSection:默认三级菜单）
nodata:无数据状态
required:必选项（值为true时，没有“--请选择--”选项）
------------------------------ */
(function($){
	$.fn.sectionSelect=function(settings){
		if(this.length<1){return;};

		// 默认值
		settings=$.extend({
			url:"../scripts/project/upload_project.json",
			aSection:null,
			bSection:null,
			cSection:null,
			nodata:"none" ,//当子集无数据时，隐藏select 
			required:false
		},settings);

		var box_obj=this;
		var aSection_obj=box_obj.find(".aSection");
		var bSection_obj=box_obj.find(".bSection");
		var cSection_obj=box_obj.find(".cSection");
		var aSection_val=settings.aSection;
		var bSection_val=settings.bSection;
		var cSection_val=settings.cSection;
		var select_prehtml=(settings.required) ? "" : "<option value=''>--请选择--</option>";
		var bSection_json;

		// 赋值二级菜单函数
		var bSectionStart=function(){
			var aSection_id=aSection_obj.get(0).selectedIndex;
			if(!settings.required){
				aSection_id--;
			};
			bSection_obj.empty().attr("disabled",true);
			cSection_obj.empty().attr("disabled",true);

			if(aSection_id<0||typeof(bSection_json.projectlist[aSection_id].c)=="undefined"){
				if(settings.nodata=="none"){
					bSection_obj.css("display","none");
					cSection_obj.css("display","none");
				}else if(settings.nodata=="hidden"){
					bSection_obj.css("visibility","hidden");
					cSection_obj.css("visibility","hidden");
				};
				return;
			};
			
			// 遍历赋值二级菜单下拉列表
			temp_html=select_prehtml;
			$.each(bSection_json.projectlist[aSection_id].c,function(i,bSection){
				temp_html+="<option value='"+bSection.n+"'>"+bSection.n+"</option>";
			});
			bSection_obj.html(temp_html).attr("disabled",false).css({"display":"","visibility":""});
			cSectionStart();
		};

		// 赋值三级菜单函数
		var cSectionStart=function(){
			var aSection_id=aSection_obj.get(0).selectedIndex;
			var bSection_id=bSection_obj.get(0).selectedIndex;
			if(!settings.required){
				aSection_id--;
				bSection_id--;
			};
			cSection_obj.empty().attr("disabled",true);

			if(aSection_id<0||bSection_id<0||typeof(bSection_json.projectlist[aSection_id].c[bSection_id].a)=="undefined"){
				if(settings.nodata=="none"){
					cSection_obj.css("display","none");
				}else if(settings.nodata=="hidden"){
					cSection_obj.css("visibility","hidden");
				};
				return;
			};
			
			// 遍历赋值三级菜单下拉列表
			temp_html=select_prehtml;
			$.each(bSection_json.projectlist[aSection_id].c[bSection_id].a,function(i,cSection){
				temp_html+="<option value='"+cSection.s+"'>"+cSection.s+"</option>";
			});
			cSection_obj.html(temp_html).attr("disabled",false).css({"display":"","visibility":""});
		};

		var init=function(){
			// 遍历赋值一级菜单下拉列表
			temp_html=select_prehtml;
			$.each(bSection_json.projectlist,function(i,aSection){
				temp_html+="<option value='"+aSection.p+"'>"+aSection.p+"</option>";
			});
			aSection_obj.html(temp_html);

			// 若有传入一级菜单与二级菜单的值，则选中。（setTimeout为兼容IE6而设置）
			setTimeout(function(){
				if(settings.aSection!=null){
					aSection_obj.val(settings.aSection);
					bSectionStart();
					setTimeout(function(){
						if(settings.bSection!=null){
							bSection_obj.val(settings.bSection);
							cSectionStart();
							setTimeout(function(){
								if(settings.cSection!=null){
									cSection_obj.val(settings.cSection);
								};
							},1);
						};
					},1);
				};
			},1);

			// 选择一级菜单时发生事件
			aSection_obj.bind("change",function(){
				bSectionStart();
			});

			// 选择二级菜单时发生事件
			bSection_obj.bind("change",function(){
				cSectionStart();
			});
		};

		// 设置一级和二级菜单json数据
		if(typeof(settings.url)=="string"){
			$.getJSON(settings.url,function(json){
				bSection_json=json;
				init();
			});
		}else{
			bSection_json=settings.url;
			init();
		};
	};
})(jQuery);