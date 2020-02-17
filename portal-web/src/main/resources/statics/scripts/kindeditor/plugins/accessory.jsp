<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <title>Accessory</title>
  <style type="text/css" rel="stylesheet">
    body {
    font-size:12px;
    margin: 0px;
    background-color:#F0F0EE;
    overflow: hidden;
    }
    td.left1 {
    font-size:12px;
    width: 50px;
    padding: 2px;
    }
    td.right1 {
    font-size:12px;
    padding: 2px;
     padding-left: 20px;
    }
    td.left2 {
    font-size:12px;
    width: 35px;
    padding: 2px;
    }
    td.right2 {
    font-size:12px;
    padding: 2px;
    width: 50px;
    }
  </style>
  <script type="text/javascript">  
	    function changeType(obj) {
	        if (obj.value == 1) {
	            document.getElementById('url').style.display = 'none';
	            document.getElementById('imgFile').style.display = 'block';
	        } else {
	            document.getElementById('url').style.display = 'block';
	            document.getElementById('imgFile').style.display = 'none';
	        }
	    }
  </script>
</head>
<body>
	<iframe name="uploadIframe" id="uploadIframe" style="display:none;"></iframe>
    <form name="uploadForm" method="post" target="uploadIframe" enctype="multipart/form-data" action="<%=request.getContextPath()%>/kindeditor-accessory-upload.htm">
    <input type="hidden" id="editorId" name="id" value="" />
    <table border="0" cellpadding="0" cellspacing="0">
      <tr>
      	 <td style="display:none;"  class="left1">       
      	 </td>
      	 <td class="right1"> 
      		请选择附件文件,允许的格式包括:<br />doc,docx,xls,xlsx,ppt,pdf,txt,rar,zip,jpg,jpeg,gif,bmp,png
      	 </td>
      </tr>
      <tr>
        <td style="display:none;"  class="left1">       	    
           <select style="display:none;"  id="type" name="type" />
          		<option value="1" selected="selected">本地</option>
            	<option value="2">远程</option>
           </select>
        </td>
        <td class="right1">
          <input type="file" id="imgFile" name="imgFile" style="width:350px;" />
          <input type="text" id="url" name="url" value="http://" maxlength="255" style="width:220px;display:none;" />
        </td>
      </tr>
      <tr style="display:none;" >
        <td class="left1">说明:</td>
        <td class="right1">
          <input type="text" id="imgTitle" name="imgTitle" value="" maxlength="100" style="width:220px;" />
        </td>
      </tr>
    </table>
  </form>
</body>
</html>