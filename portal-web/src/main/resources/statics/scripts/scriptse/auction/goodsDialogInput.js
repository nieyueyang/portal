$(function() {
	$("#editDialogForm input[name='keyCode']")
			.each(
					function() {
						var valueValidate = $(this).parent().find(
								"input[name='valueValidate']").val();
						var length = 50;
						var keyType = $(this).parent().find(
								"input[name='keyType']").val();
						var text = $(this).parent().find("input[name='text']")
								.val();
						var keyCode = $(this).val();
						var appendHtml = "";
						var attr_values = (text == null || text == "") ? ""
								: text.split("\n");
						if (keyType == "CHECKBOX" || keyType == "SELECT"
								|| keyType == "RADIO") {
							if (keyType == "CHECKBOX") {
								jQuery(attr_values)
										.each(
												function(j) {
													var arrval = attr_values[j] == null ? ""
															: attr_values[j]
																	.split("|");
													appendHtml = appendHtml
															+ "<input type=\"checkbox\" name=\""
															+ keyCode
															+ "\" value=\""
															+ arrval[0]
															+ "\" class=\"form_t\" /> "
															+ "<span>"
															+ arrval[1]
															+ "</span>";
												});
							} else if (keyType == "SELECT") {
								// 下拉框
								appendHtml = appendHtml
										+ "<select name=\""
										+ keyCode
										+ "\" class=\"select\" style=\"width:100px;\">";
								jQuery(attr_values)
										.each(
												function(j) {
													var arrval = attr_values[j] == null ? ""
															: attr_values[j]
																	.split("|");
													appendHtml = appendHtml
															+ "<option value=\""
															+ arrval[0] + "\">"
															+ arrval[1]
															+ "</option>";
												});
								appendHtml = appendHtml + "</select>";
							} else if (keyType == "RADIO") {
								// 单选按钮
								jQuery(attr_values)
										.each(
												function(j) {
													var arrval = attr_values[j] == null ? ""
															: attr_values[j]
																	.split("|");
													appendHtml = appendHtml
															+ "<input type=\"radio\" name=\""
															+ keyCode
															+ "\" value=\""
															+ arrval[0]
															+ "\" class=\"form_t\" /> "
															+ "<span>"
															+ arrval[1]
															+ "</span>";
												});
							}
						} else {
							appendHtml = appendHtml
									+ "<input type=\"text\" name=\"" + keyCode
									+ "\" maxlength=\"" + length
									+ "\" class=\"inpt\" value=\"\" />";
						}
						$(this).parent().append(appendHtml);

					});

	$("#editDialogForm input[name='isRequired']")
			.each(
					function() {
						var isRequired = $(this).val();
						if (isRequired == "1") {
							$(this).addClass("required");
							$(this)
									.parent()
									.append(
											"<span class='red'>*</span><span class='error'></span>");
						} else {
							$(this).parent().append(
									"<span class='error'></span>");
						}
					});
});