
// 验证标题
function validateTitle() {
	var tit = $("#tit").val();
	if (null != tit && "" != tit) {
		if (/^\s+$/gi.test(tit)) {

			var d = dialog({
				align : 'left',
				content : '不能全为空格!',
				quickClose : true
			});
			d.show(document.getElementById('tit'));

			return false;
		}
		if (tit.length > 85) {
			var d = dialog({
				align : 'left',
				content : '标题长度超过85个字!',
				quickClose : true
			});
			d.show(document.getElementById('tit'));
			return false;
		}
	} else {

		var d = dialog({
			align : 'left',
			content : '请输入标题!',
			quickClose : true
		});
		d.show(document.getElementById('tit'));
		return false;
	}
	return true;
}

// 验证下拉列表
function validateProject() {
	var aSection = $("#aSection").val();
	var bSection = $("#bSection").val();
	var cSection = $("#cSection").val();
	var dSection = $("#dSection").val();
	console.log(aSection);
	console.log(bSection);
	console.log(cSection);
	console.log(dSection);
	if (null != aSection && "" != aSection) {
		if (null != bSection && "" != bSection) {
			if (null != cSection && "" != cSection) {
				if(null != dSection && "" != dSection){
					$("#uploadProject").val(aSection + "-" + bSection + "-" + cSection+"-"+dSection);
				}else{
					$("#uploadProject").val(aSection + "-" + bSection + "-" + cSection);
				}
			} else {
				$("#uploadProject").val(aSection + "-" + bSection);
			}
		} else {
			$("#uploadProject").val(aSection);
		}
		return true;
	} else {
		var d = dialog({
			align : 'left',
			content : '请选择上传栏目!',
			quickClose : true
		});
		d.show(document.getElementById('project'));
		return false;
	}

}

// 上传文件
function upload(form) {
	var str = new Array();
	var inputlist = document.getElementsByTagName("input");
	var j = 0;
	for (i = 0; i < inputlist.length; i++) {
		if (inputlist[i].type == "file") {
			str[j] = inputlist[i].name;
			j++;
		}
	}
	jQuery
			.ajaxFileUpload({
				type : "POST", // 提交方式
				url : 'manyFileUpload.htm',
				secureuri : false,
				dataType : 'json',
				fileElementId : str,
				success : function(data, status) {
					var messageDiv = document.getElementById("project_document");
					if(data=="false"){
						messageDiv.innerHTML="";
						messageDiv.innerHTML += "<p><FONT COLOR=#ff0000>上传失败</FONT></p>";
						setTimeout(function () {
							messageDiv.innerHTML="";
					    }, 5000);
					}else{
						
						$("#up").attr("style", "color:gray");
						$("#up").attr("disabled", "disabled");
						messageDiv.innerHTML += "<p><FONT COLOR=#ff0000>上传成功</FONT></p>";
						messageDiv.innerHTML += "<textarea style='display:none' name='path' id ='path'>"+ data + "</textarea>";
					}
					
				},
				error : function(data, status, e) {
					dialog({
						title : '',
						content : '系统报错，稍后重试！' + e,
						ok : function() {
						},
						cancel : false
					}).show();
				}
			});

}

function trim(str, is_global) {
	var result;
	result = str.replace(/(^\s+)|(\s+$)/g, "");
	if (is_global.toLowerCase() == "g") {
		result = result.replace(/\s/g, "");
	}
	return result;
}
function createInput() {
	var inputText = "<input type=\"text\" value=\"\" style=\"BORDER: #91c0e3 1px solid; width:260px;HEIGHT: 20px; BACKGROUND-COLOR: #FFFFFF;color: #004779;\"/>"
	return inputText;
}

function createfile(tagName, type, name) {
	var inputFile = " <input type=\"file\" name=\"" + name
			+ "\" onchange=\"change(event)\"  id=\"" + name
			+ "\"    style=\"width:65px\"/><br/>";
	return inputFile;
}

var k = 1;
function add() {
	if (k > 4) {
		var d = dialog({
			align : 'left',
			content : '最多可添加五个文件!',
			quickClose : true
		});
		d.show(document.getElementById('a'));
		return false;
	}
	var j = k - 1;
	var tagname = "upload" + j;
	var upload = document.getElementById(tagname).value;
	if (upload == "") {
		var d = dialog({
			align : 'left',
			content : '上传文件未满,不需要增加上传栏!',
			quickClose : true
		});
		d.show();
		return false;
	}
	var name = "upload" + k;
	var file = createfile("input", "file", name);
	var inputText = createInput();
	$("#files").append(inputText);
	$("#files").append(file);
	// files.appendChild(inputText);
	// files.appendChild(file);
	k++;

}

function isSubmit(form) {
	if (validateTitle() && validateProject()) {
		$("#uploadfiles").attr("style", "color:gray");
		$("#uploadfiles").attr("disabled", "disabled");
		jQuery('#saveForm').submit();

	}

}

function change(obj) {
	var src = obj.target || window.event.srcElement; // 获取事件源，兼容chrome/IE
	var filename = src.value;
	src.previousSibling.previousSibling.value = filename.substring(filename
			.lastIndexOf('\\') + 1);
}
function selectSec(obj) {
	var nextLevelId = "";
	var p="4px;";
	var selectEvent = "onchange=\"selectSec(this)\"";
	if(obj.id=="aSection"){
		nextLevelId = "bSection";
		p="0px;"
	}else if(obj.id == "bSection"){
		nextLevelId = "cSection";
	}else if(obj.id == "cSection"){
		selectEvent ="";
		nextLevelId = "dSection";
	}
	$(obj).parent().nextAll().remove();
	jQuery.get("selectNextLevel.htm", {"code" : obj.value}, function(data) {
		console.log(data);
		if (data.length > 0) {
			var startLevel = "<div style='display:inline;padding-left:"+p+"'><select class=\"aSection\" id =\""+nextLevelId+"\""+selectEvent+" style=\"width:160px;height:21px;\">"
						 +"<option value=''>--请选择--</option>";
			var endLevel = " &nbsp;</select></div>";
			var cenLevel = "";
			$.each(data,function(index,ele){
				cenLevel = cenLevel + "<option value="+ele.sectionCode+">"+ele.sectionName+"</option>"
			 });
			$("#project").append(startLevel+cenLevel+endLevel);
		}
	});
}

