/**
 * 验证值是否为空.<br>
 * \s:space 空格;<br>
 * ^ :开始;^\s:以空格开始;<br>
 * * :一个或多个;<br>
 * $:结束;<br>
 * /g: 全局.
 * 
 * */
function isEmpty(v){
	if(undefined==v || "undefined"==v){return true;}
	if(/^\s*$/g.test(v)){ 
		return true;
	}else{
		return false;
	}
}

//选择挂牌品种树 节点后的回调函数
function chooseVType(data){
	if(""==data || null==data || undefined === data){
		return
	}
	$("input[name=varietyTypeId]").val(data.id);
	$("input[name=varietyTypeCode]").val(data.code);
	$("input[name=varietyShortName]").val(data.name);
	$("input[name=varietyFullName]").val(data.name);
}

/**
 * 在线代理订货挂牌选取挂牌品种后 【下一步】操作
 */
function nextStep(){
	 var varietyTypeCode = $("input[name=varietyTypeCode]").val();
	 $("#varietyTypeCode2").val(varietyTypeCode);
	 
	 if(varietyTypeCode == ""){
		 alert("请选择挂牌品种!");
		 return;
	 }else{
		 $("#toStep2").attr("action",appServer +"/agentListing/create_step2.htm");
		 $("#toStep2").submit();
	 }
}

//防止点击浏览器后退按钮后出现的错误
$(function(){
		$("#default").click();
		jQuery("#varietyTypeCode").attr("value","");
		jQuery("#varietyShortName").attr("value","");
})