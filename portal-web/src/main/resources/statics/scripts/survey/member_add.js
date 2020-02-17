function selectDialog(url) {
	window
			.open(
					url,
					'newwindow',
					'height=530, width=800, top=120,left=250, toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, status=no')
			.focus();
}

function returnUserMethod(ss) {
	var oldUserIdVal = jQuery("#memberIds").val();
	var oldUserNameVal = jQuery("#memberName").val();
	var oldUserAccountVal = jQuery("#memberAccount").val();
	var vstr = ss.split("~@~");
	if (vstr.length > 0) {
		var flag = false;
		for (var i = 0; i < vstr.length; i++) {
			var tstr = vstr[i].split("~!~");
			console.log(tstr)
			if (flag) {
				oldUserIdVal += ",";
				oldUserAccountVal += ",";
				oldUserNameVal += ",";
			}
			oldUserIdVal += tstr[0];
			oldUserAccountVal += tstr[1];
			oldUserNameVal += tstr[3];
			flag = true;
		}
	}

	jQuery("#memberIds").val(oldUserIdVal);
	jQuery("#memberName").val(oldUserNameVal);
	jQuery("#memberAccount").val(oldUserAccountVal);
}
function clearUsers() {
	$("#memberIds").val("");
	$("#memberName").val("");
	$("#memberAccount").val("");
}

function formSubmit(form) {
	form.submit();
}