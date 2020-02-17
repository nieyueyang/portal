/**
 * 单条删除
 * @param filesid 数据id
 */
function del(filesid) {
	if (confirm("确定删除该条记录？")) {
		jQuery.ajax({
			type : "post",
			url : "delete.htm",
			data : "id=" + filesid,
			success : function(result) {
				console.log(result.mess);
				if (result.mess == 'Y') {
					alert('删除成功！');
					$("#searchForm").submit();
				} else {
					alert('删除失败！');
				}
			}
		})
	}

}
/**
 * 全选、反选
 */
function select_all() {
	var all = $("input[name='ids']");
	var check = $('#selectAll').attr("checked");
	if (check) {
		$("[name='ids']").attr("checked", 'true');
	} else if (!check) {
		$("[name='ids']").removeAttr("checked");
	}
}

/**
 * 多选删除
 */
function selectDelete() {
	if (!confirm("您确认要删除选中的数据？")) {
		return;
	}
	var all = $("input[name='ids']:checked");
	if (all.length <= 0) {
		alert("请选择需要删除的数据");
		return;
	}
	var selected = [];
	for (var i = 0; i < all.length; i++) {
		selected.push($(all[i]).val());
	}
	jQuery.ajax({
		type : "post",
		url : "selectDelete.htm",
		data : "ids=" + selected.toString(),
		success : function(result) {
			if (result.type == "success") {
				alert(result.title);
				$("#searchForm").submit();
			} else {
				alert(result.title);
			}
		},
		error : function(result, status, e) {
			alert('系统报错，稍后重试！' + e);
		}
	});
}
/**
 * 置顶操作
 * @param id
 */
function stickTop(filesid,status) {
	if (confirm("确定置顶该条记录？")) {
		jQuery.ajax({
			type : "post",
			url : "stickTop.htm",
			data : {'id':filesid,'status':status},
			success : function(result) {
				alert(result.title);
				$("#searchForm").submit();
			},
			error : function(result, status, e) {
				alert('系统报错，稍后重试！' + e);
			}
		})
	}
}
function selectSec(obj) {
	var nextLevelId = "";
	var p = "4px;";
	if (obj.id == "aSection") {
		nextLevelId = "bSection";
		p = "0px;"
	} else if (obj.id == "bSection") {
		nextLevelId = "cSection";
	} else if (obj.id == "cSection") {
		nextLevelId = "dSection";
	}
	$(obj).parent().nextAll().remove();
	jQuery.get("selectNextLevel.htm",{"code" : obj.value},
					function(data) {
						if (data.length > 0) {
							var startLevel = "<div style='display:inline;padding-left:"
									+ p
									+ "'><select class=\"aSection\" id =\""
									+ nextLevelId
									+ "\"  onchange=\"selectSec(this)\" style=\"width: 135px;height:21px;\">"
									+ "<option value=''>--请选择--</option>";
							var endLevel = "</select></div>";
							var cenLevel = "";
							$.each(data, function(index, ele) {
								cenLevel = cenLevel + "<option value="
										+ ele.sectionCode + ">"
										+ ele.sectionName + "</option>"
							});
							$("#project").append(
									startLevel + cenLevel + endLevel);
						}
					});
}

function chaxun() {
	$("#uploadProject").val("");
	var str = "";
	if ($("#aSection").val()) {
		if ($("#bSection").val()) {
			if ($("#cSection").val()) {
				if ($("#dSection").val()) {
					str = $("#aSection").val() + "-" + $("#bSection").val()
							+ "-" + $("#cSection").val() + "-"
							+ $("#dSection").val();
				} else {
					str = $("#aSection").val() + "-" + $("#bSection").val()
							+ "-" + $("#cSection").val()
				}
			} else {
				str = $("#aSection").val() + "-" + $("#bSection").val()
			}
		} else {
			str = $("#aSection").val()
		}
		$("#uploadProject").val(str);
	}
	$("#searchForm").submit();

}
