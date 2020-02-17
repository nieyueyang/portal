//var index=0;
//var step=1;
//var nodeListSize = $("#nodeListSize").val();

jQuery(function() {
	jQuery('#saveForm').validate({
        errorPlacement: function(error, element) {
            element.siblings("span").css({"color":"red"}).text(error.text());
        },
        success: function(label) {
            label.text("");
        }
    });
    jQuery( "#add" ).click(function() {
		$("#detail").append(add(index++));
 	});
});
jQuery("#varietyCode").change(function(){
	jQuery('#varietyName').val($(this).children('option:selected').text());
});

function add(i){
	var row = '<tr id="approveDetailsTR'+i+'" class="approveDetailsTR">' +
						'<td class="tc"><input type="text" class="{required:true,maxlength:20} inpt department" name="nodeList['+(step-1)+'].department" size="5" value="" /><span  class="red"></span></td>'+
						'<td class="tc">' +
						'<input type="hidden" class="usersStr" name="nodeList['+(step-1)+'].usersStr" value="" />' +
						'<input type="text" class="{required:true} inpt usersNameStr" name="nodeList['+(step-1)+'].usersNameStr" style="width:150px;" value="" readonly />  <a href="javascript:void(0);"  class="button-2" onclick="setUsers(this);">选择人员</a><span  class="red"></span></td>'+
						'<td class="tc"><input class="{required:true,number:true} inpt step" name="nodeList['+(step-1)+'].nodeCode" size="5" value="'+step+'" readonly/><span  class="red"></span></td>'+								
						'<td class="tc"><a href="javascript:del('+(step-1)+')">删除</a></td></tr>';
	if(undefined != nodeIdList && step<=nodeIdList.length) {
		row += '<input type="hidden" class="nodeId" name="nodeList['+(step-1)+'].id" value="'+nodeIdList[step-1]+'" />' ;
	}
	step++;
	return row;
}
	
function del(i){
	$("#approveDetailsTR"+i).remove();
	var trs = $(".approveDetailsTR");
	for(var j=0; j<trs.length; j++) {
		var nodeListIndex = "nodeList[" + j + "]";
		$(trs[j]).children().find('input').attr("name", nodeListIndex+".department");
		$(trs[j]).find("input[class='usersStr']").attr("name", nodeListIndex+".usersStr");
		$(trs[j]).find("input[class='{required:true} inpt usersNameStr']").attr("name", nodeListIndex+".usersNameStr");
		$(trs[j]).find("input[class='{required:true,number:true} inpt step']").attr("name", nodeListIndex+".nodeCode");
		$(trs[j]).find("input[class='nodeId']").attr("name", nodeListIndex+".id");
		$(trs[j]).find("input[class='{required:true,number:true} inpt step']").val(j+1);
		$(trs[j]).find("input[class='userName']").each(function(i) {
			$(this).attr("name", nodeListIndex+".userList["+i+"].userName");
		});
		$(trs[j]).find("input[class='userId']").each(function(i) {
			$(this).attr("name", nodeListIndex+".userList["+i+"].userId");
		});
	}
	step  = trs.length + 1;
}

function vSelect(data, valueClass, nameClass, prjTypeMetaBoxId) {
	if(!data){
		//alert("您没有选择品种!");
	}else{
		$("."+valueClass).val(data.code);
		$("."+nameClass).val(data.name);
	}
}

function sel(obj,i){	
	var item = obj.options[obj.selectedIndex].text;
	$(obj).prev().val(item);
}
	
function setUsers(element) {
	var usersNameStr = $(element).prev().val();
	var usersIdStr = $(element).prev().prev().val();
	var htmlCode = $("#setUsersDialog").html();
	if(null != usersNameStr && undefined != usersNameStr && "" != usersNameStr) {
		var usersNameArr = usersNameStr.split(",");
		var usersIdArr = usersIdStr.split(",");
		for(var i=0; i<usersNameArr.length; i++) {
			//$("#setUsersDialog").find("input[index='userName"+(i+1)+"']").val(usersNameArr[i]);
			var tempArr = htmlCode.split('index="userName'+(i+1)+'"');
			htmlCode = tempArr[0] + ' value="'+usersNameArr[i]+'"' + tempArr[1];
			tempArr = htmlCode.split('index="userId'+(i+1)+'"');
			htmlCode = tempArr[0] + 'value="'+usersIdArr[i]+'"' + tempArr[1];
			//$("#setUsersDialog").find("input[index='userId"+(i+1)+"']").val(usersIdArr[i]);
			
		}
	} else {
		for(var j=1; j<6; j++) {
			$("#setUsersDialog").find("input[index='userName"+j+"']").val("");
			$("#setUsersDialog").find("input[index='userId"+j+"']").val("");
		}
	}
	//var htmlCode = $("#setUsersDialog").html();
	art.dialog({
		id:'setUser',
		title:'设置处理人员',
		lock: true,
		content: "<div id='setUserBox'>" +htmlCode+ "</div>",
		yesFn:function(){
			var selectedUsers = $("#setUserBox").find("input[type='text']");
			//检验设置人员
			var selectedUserIds = $("#setUserBox").find("input[type='hidden']");
			var isBlank = true;	//全部为空标志位
			var isSkip = false;	//是否跳级设置人员标志位
			for(var i=0; i<selectedUserIds.length; i++) {
				var userA = $(selectedUserIds[i]).val();
				var userB = "";
				if(null != userA && undefined != userA && "" != userA.trim()) {
					isBlank = false;
				}
				if(null == userA || undefined == userA || "" == userA.trim()) {
					for(var k=i+1; k<selectedUserIds.length; k++) {
						if($(selectedUserIds[k]).val() != null && $(selectedUserIds[k]).val() != undefined && $(selectedUserIds[k]).val().trim() != "") {
							isSkip = true;
						}
					}
				}
				for(var j=i+1; j<selectedUserIds.length; j++) {			
					userB = $(selectedUserIds[j]).val();
					if(userA != "" && userB != "" && userA == userB) {
						alert("一个处理节点中不可选择相同的处理人员！")
						return false;
					}
				}
			}
			if(isBlank) {
				alert("一个处理节点中至少要选择一个处理人员！");
				return false;
			}
			if(isSkip) {
				alert("不可跳级设置人员！");
				return false;
			}
			
			var usersNameStr = "";
			var usersIdStr = "";
			$(selectedUsers).each(function() {
				if(undefined != $(this).val() && null != $(this).val() && "" != $(this).val()) {
					usersNameStr += ($(this).val() + ",");
					usersIdStr += ($(this).prev().val() + ",")
				}
			});
			usersNameStr = usersNameStr.substring(0, usersNameStr.length-1);
			usersIdStr = usersIdStr.substring(0, usersIdStr.length-1);
			$(element).prev().val(usersNameStr);
			$(element).prev().prev().val(usersIdStr);
			var usersNameArr = usersNameStr.split(",");
			var usersIdArr = usersIdStr.split(",");
			var stepTmp = $(element).parent().next().children().val();
			for (var j=0; j<usersNameArr.length; j++) {
				var tempA = $(element).parent().find("input[name='nodeList["+(stepTmp-1)+"].userList["+j+"].userName']");
				var tempB = $(element).parent().find("input[name='nodeList["+(stepTmp-1)+"].userList["+j+"].userId']");
				if(undefined == tempA || null == tempA) {
					$(element).append("<input type='hidden' name='nodeList["+(stepTmp-1)+"].userList["+j+"].userName' value='"+usersNameArr[j]+"' class='userName' />");
				} else {
					tempA.val(usersNameArr[j])
				}
				if(undefined == tempB || null == tempB) {
					$(element).append("<input type='hidden' name='nodeList["+(stepTmp-1)+"].userList["+j+"].userId' value='"+usersIdArr[j]+"' class='userId' />");
				} else {
					tempA.val(usersIdArr[j])
				}
			}
		},
		noFn:function(){}
	});
}


function selUsers(element) {
	var htmlCode = $("#selUsersDialog").html();
	art.dialog({
		id:'selUser',
		title:'请选择处理人员',
		lock: true,
		content: "<div id='selUserBox'>" +htmlCode+ "</div>",
		yesFn:function(){
			var selectedUser = $("#selUserBox").find("input[type='radio']:checked");
			$(element).prev().val($(selectedUser).attr("userName"));
			$(element).prev().prev().val($(selectedUser).attr("userId"));
		},
		noFn:function(){}
	});
}

function setRegion() {
	art.dialog({
		id:'setRegion',
		title:'设置新的销售区域',
		lock: true,
		content: "<table><tr>" +
				"<th>销售区域：</th>" +
				"<td><input type='text' id='busiRegion' name='busiRegion' value='' class='inpt required' /><span style='color:red;'>*</span></td>" +
				"</tr></table>",
		yesFn:function(){
			var busiRegion = $("#busiRegion").val();
			if (busiRegion.trim() == "") {
				$("#busiRegion").next().html("*销售区域不能为空！");
				return false;
			} else if(busiRegion.length > 20) {
				$("#busiRegion").next().html("*长度不可超过20个汉字！");
				return false;
			} else {
				var _msg = Hundsun.PopUtil.loading();
				jQuery.ajax({
					type : "POST",
					url : appServer + "/process/region/seller/add.htm",
					data : {
						"busiRegion" : busiRegion
					},
					success : function(result) {
						_msg.hide();
						Hundsun.PopUtil.alert({msg:result.title, type:result.type});
					},
					error:function(){
						_msg.hide();
						art.dialog({
							id : "timeOut",
							lock : true,
							content: '网络超时,请重试',
							yesFn : true
						});
					}
				});
			}
		},
		noFn:function(){}
	});
}

function selectRegion() {
	var _msg = Hundsun.PopUtil.loading();
	jQuery.ajax({
		type : "POST",
		url : appServer + "/process/region/seller/getDialogList.htm",
		data : {},
		success : function(result) {
			_msg.hide();
			var htmlCode = "";
			htmlCode += "<table width='300' id='regionListDialog'><tr><th class='tc' width='10%'>选择</th><th class='tc'>销售区域</th></tr>";
			for(var i=0; i<result.data.length; i++) {
				var busiRegion = result.data[i].busiRegion;
				htmlCode += "<tr><td class='tc'><input type='radio' name='busiRegion' value='" + busiRegion + "' /></td><td class='tc'>" + busiRegion + "</td>" +
						"<td><a href='javascript:void(0);' onclick='deleteRegion(this, "+result.data[i].id+")' class='button-8'>删除</a></td></tr>";
			}
			htmlCode += "</table>";
			if(result.type == "success") {
				art.dialog({
					id:'selectRegion',
					title:'选择销售区域',
					lock: true,
					content: htmlCode,
					yesFn:function() {
						var busiRegion = $("#regionListDialog").find("input[type=radio]:checked").val();
						if(undefined == busiRegion || null ==busiRegion || "" == busiRegion.trim()) {
							alert("请选择一个销售区域！");
							return false;
						} else {
							$("#region").val(busiRegion);
						}
					},
					noFn:function(){}
				});
			} else {
				Hundsun.PopUtil.alert({msg:result.title, type:result.type});
			}
		},
		error:function(){
			_msg.hide();
			art.dialog({
				id : "timeOut",
				lock : true,
				content: '网络超时,请重试',
				yesFn : true
			});
		}
	});
}

function deleteRegion(element, regionId) {
	if(confirm("确认要删除该销售区域吗？")) {
		var _msg = Hundsun.PopUtil.loading();
		jQuery.ajax({
			type : "POST",
			url : appServer+"/process/region/seller/deleteRegion.htm",
			data : {'regionId': regionId},
			success : function(result) {
				_msg.hide();
				$(element).parent().parent().remove();
				Hundsun.PopUtil.alert({msg:result.title, type:result.type});
			},
			error:function(){
				_msg.hide();
				art.dialog({
					id : "timeOut",
					lock : true,
					content: '网络超时,请重试',
					yesFn : true
				});
			}
		});
	} 
}

function clearSelectedUser(element) {
	$(element).parent().find("input[name='userName']").val("");
	$(element).parent().find("input[name='userId']").val("");
}