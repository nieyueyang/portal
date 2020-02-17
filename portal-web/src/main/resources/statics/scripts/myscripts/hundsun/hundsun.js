/**
 * Hundsun
 */

var Hundsun = {
 	/**
 	 * 获取文件的后缀名,包括".",比如  getFileExtension('aa.txt')='.txt',
 	 * @param {String} fileName
 	 */
 	getFileExtension:function(fileName){
 		var returnV = '';
 		var tmps = fileName.split('.'); 		
 		if(tmps.length > 1){
 			returnV = '.' + tmps[tmps.length-1];
 		}
 		return returnV;
 	},
	/**
	 * 获取事件源	,兼容IE、FireFox
	 * @return {Event}
	 */
	getEvent:function(){		
		var returnO = null;
		if(window.event){
			returnO = window.event; 
		}else{		
			var func = Hundsun.getEvent.caller;		
			while(func != null){			
				var arg0 = func.arguments[0]; 			
				if(arg0 && (arg0.constructor == KeyboardEvent || arg0.constructor == MouseEvent)){	　　				 					
					returnO = arg0;
					break;
				} 
				func = func.caller; 
			}
		}
		return returnO;
	},
	/**
	 * 键盘回车触发
	 * @param {} fn
	 */
	keyEnterSubmit : function (fn) {
		var e = Hundsun.getEvent();
		if (e.keyCode == 13) {
			fn.call();
		}
	},	
	
		
	/**
	 * 格式化日期
	 * @param {Object} date
	 * @param {String} format
	 * @return {String}
	 */
	formatDate:function(date,format){
		if(!format){
			format = 'Y-m-d';
		}		
		var returnV;			
		if(date != null && date !=''){
			var time = parseInt(date.time);			
			var dateO = new Date(time);			
			returnV  = dateO.format(format);
		}	
		return returnV;
	}
	/**
	 * 
	 * @param {String} format
	 * @return {function}
	 */
	,getFormatDateFunction:function(format){
		return function(v){
			return Hundsun.formatDate(v,format);			
		}
	},	
	/**
	 * 获取文件输入框值的值
	 * @param {Object} fileInput
	 */
	getFileInputValue : function(fileInput){		
		 var returnO = {};		
		 if(fileInput){
	        if (jQuery.browser.msie){
	            fileInput.select();
	            var filePath = document.selection.createRange().text;
	            returnO = {fileName:filePath,filePath:filePath};
	        }else if(jQuery.browser.mozilla){	        	
	            if(fileInput.files){
	               var fileName,filePath;
	               var f = fileInput.files[0];	                   
	               if(f){
	               	  //alert(f);
	               	  //alert('f.name=' + f.name + '\nf.size=' + f.size
	               	   //+ '\nf.fileSize=' + f.fileSize + '\nf.fileName=' + f.fileName
	               	    //+ '\nf.getAsDataURL=' + f.getAsDataURL);
	               	  //var objectURL = window.URL.createObjectURL(f);	              
	               	  //if(f.name){
	               	  	fileName = f.name;
	               	  	filePath = window.URL.createObjectURL(f);
	               	  //}else{
	               	  	//fileName = fileInput.value;
	               	  	//filePath = fileInput.value;
	               	  //}	               	 
	             	  returnO = {fileName:fileName,filePath:filePath};
	               }
	            }else{
	                filePath = fileInput.value;
	       	   		returnO = {fileName:filePath,filePath:filePath};
	            }
        	}else{	        
	       	    filePath = fileInput.value;
       	   		returnO = {fileName:filePath,filePath:filePath};
      	 	}
	    }
	    return returnO;	     
	},
	
	setImageSrc : function(){
		
	},
	
	showImageWithMaxSize:function(imgJQueryObject,src,maxSize){				
		imgJQueryObject.attr('style','');
		imgJQueryObject.attr('src',src);
		//imgJQueryObject.attr('width','');	
		imgJQueryObject.hide();
		
		var scale;
		setTimeout(function() {            
            var w = imgJQueryObject.outerWidth();	
			var h = imgJQueryObject.outerHeight();
			
			//alert('w=' + w + ';h=' + h);
			
			var w1,h1;
			if(w >= h){				
				w1 = maxSize;
				scale = w / w1;
				h1 = h / scale;
			}else{				
				h1 = maxSize;
				scale = h / h1;
				w1 = w / scale;
			}
			imgJQueryObject.width(w1);
			imgJQueryObject.height(h1);
			imgJQueryObject.show(200);
        }, 200);
        return scale;
	},	
	/**
	 * 格式化数字
	 * @param {Number} value 数字
	 * @param {Number} pos 小数点后 位数
	 */
	formatNumber:function(value,pos){
		///alert(pos)
		if(pos == null || pos == undefined){pos = 2}
		var returnV = 0;
		if(value){			
			returnV = parseFloat(value).toFixed(pos);
			returnV = parseFloat(returnV).toLocaleString();
		}
		return returnV;
	},
	/**
	 * 格式化数字函数句柄
	 * @param {} pos
	 */
	getformatNumberHandler:function (pos){
		return function(v){
			return Hundsun.formatNumber(v,pos);			
		}
	},
	/**
	 * 格式化日期
	 * @param {Object} date
	 * @param {String} format
	 * @return {String}
	 */
	formatDate:function(date,format){			
		var returnV = '';			
		if(date){
			if(!format){
				format = 'Y-m-d H:i:s';
			}	
			
			var time;
			if(date.time){
			    time = parseInt(date.time);
			}else{
				time = date;
			}
			
			var dateO = new Date(time);
			returnV  = dateO.format(format);
		}	
		return returnV;
	}
	/**
	 * 返回格式化日期句柄
	 * @param {String} format
	 * @return {function}
	 */
	,getFormatDateFunction:function(format){
		return function(v){
			return Hundsun.formatDate(v,format);			
		}
	}
};

Hundsun.StringUtil = {
	/**
	 * 去掉字符串两边的空格
	 * @param {String} str
	 * @return {String}
	 */
	trim:function(str){
		if(str == undefined || str == null)
			return '';

		 return str.replace(/(^\s*)|(\s*$)/g, '');
	},
	/**	
	 * 把html标记去除
	 * @param {String} detail
	 */
	removeHtml : function(html){
		var _val = $("<div>" + html + "</div>").text();
 		return _val;
	},
	/**	
	 * 截取字符串
	 * @param {String} detail
	 */
	substring : function(str,start,length){	
 		var length = str.length > 200 ? 200 : str.length;
 		str = str.substring(start, length);
 		return str;
	},
	/**
	 * 见\n转换成br，将空格转换层nbsp;nbsp;
	 * @param {String} str
	 * @return {String}
	 */
	convertBlankAndEnterToBrAndNbsp:function(str){
		if(str){
			return str.replace(/\n/g,'<br/>').replace(/  /g,'&nbsp;&nbsp;');
		}else{
			return '';
		}
	}
};

Hundsun.PopUtil = {
	/**
	 * loading 信息
	 * @param {Object} parameter
	 * 		msg {String} 默认 系统正在处理,请稍候......
	 * 		width {int} 默认 250
	 * @return {Boxy}
	 */
	loading: function(parameter){
		if(!parameter){parameter = {}}
		if(!parameter.msg){parameter.msg = '系统正在处理,请稍候......'}
		if(!parameter.width){parameter.width='250'}
		return new Boxy('<div style="width:'+parameter.width+'px;"><div class="common_loading">'+parameter.msg +'</div></div>',{modal:true});
	},

	/**
	 *
	 * @param {Object} parameter
	 * 			<li>type{String} success/error/warn 默认success </li>
	 * 			<li>msg{String}</li>
	 * 			<li>width{int} 默认380</li>
	 * 			<li>autohide{bool} 是否自动关闭 默认false</li>
	 * 			<li>timeout{int} 自动关闭的延迟时间 默认700毫秒	</li>
	 * 			<li>callback{function} 关闭之后的回调</li>
	 * 			<li>showtitle</li>
	 */
	alert: function(parameter){
		if(!parameter){parameter = {}}
		if(!parameter.msg){parameter.msg = '操作成功!'}
		if(!parameter.width){parameter.width=380}
		if(!parameter.timeout){parameter.timeout=700}
		if(!parameter.type){parameter.type='success'}

		var renderHtml = '<div class="common_msg2" >' +
					'<span class="icons '+parameter.type+'"></span><span class="text '+parameter.type+'">'+parameter.msg +'</span></div>';

		if(parameter.autohide){
			var b = new Boxy('<div style="width:'+parameter.width+'px;">' + renderHtml + '</div>',{modal:true,show:false});
			b.show(400);
			setTimeout(function(){
				b.hide(parameter.callback);
			},parameter.timeout + 400);
		}else{
			Boxy.alert(renderHtml,function(){
				if(parameter.callback){
					parameter.callback.call();
				}
			},{w:parameter.width})
		}
	},
	/**
	 * 
	 * @param {Object} parameter
	 * 	 		<li>width{int} 默认 400 </li>
	 * 			<li>msg{String}</li>
	 * 
	 * @param {Function} fn
	 */
	confirm: function(parameter,fn){
		if(!parameter){parameter = {}}	
		if(!parameter.width){parameter.width='380'}	
		
		var renderHtml = '<div class="common_msg2">' +
					'<span class="icons icon_question" style="background-position:0% 0%;padding-left:80px;width:400px;padding-top:10px;">'+parameter.msg +'</span></div>';
		
		Boxy.confirm(renderHtml,fn,{w:parameter.width})
	}
};

/**
 * 弹出窗口
 * @param {String or Object} contextBox 弹出窗口内容容器
 * @param {Object} params @see Boxy
 */
Hundsun.Window = function(contextBox,params){
	if(!params) {params = {};}
	params.modal = true;
	params.unloadOnHide = false;
	params.title = params.title ? params.title : '弹出窗口';
	
	var winObj = $('#' + contextBox);	
	var html = winObj.html();
	winObj.remove();
	this.win = new Boxy(html,params);	
};
Hundsun.Window.prototype = {
	/**打开窗口*/
	open:function(){
		this.win.show(300);
	},
	/**关闭窗口*/
	hide:function(fn){
		//console.log(this.win);
		this.win.hide(fn);
		//console.log(this.win);
	},
	/**设置标题*/
	setTitle:function(title){		
		this.win.setTitle(title);
	},
	/**getBoxy*/
	getBoxy:function(){
		return this.win;
	}
};

/**
 * 数据校验类
 * @type 
 */
Hundsun.Validate = {
	isEmpty : function(str){
		var returnV;

		if(!str || jQuery.trim(str) == ''){
			returnV = true;
		}else{
			returnV = false;
		}

		return returnV;
	},

	/**
	 * 功能：判断是否为整数
	 * @param {String} objStr
	 * @return {Boolen}
	 */
	isInt : function (objStr){
	    var returnV;
		if(!objStr || objStr == ''){
			returnV = true;
		}

	    var reg=/(^-?|^\+?)\d+$/;
	    var r = objStr.match(reg);
	    return r != null;
	},


	/**
	 * 功能：判断是否为浮点数
	 * @param {} objStr
	 * @return {}
	 */
	 isDouble : function(objStr){
		var returnV;

		if(objStr == ""){
			returnV = true;
		}

	   	var reg=/^[0-9]+[\.[0-9]+]*$/;
	    var r = objStr.match(reg);
	
	    return r != null;
	},

	/**
	 * 判断是的是数字
	 * @param {} objStr
	 * @return {}
	 */
	 isNumber : function(objStr){
		return Hundsun.Validate.isDouble(objStr) || Hundsun.Validate.isInt(objStr);
	},


	/**
	 * 判断是否日期
	 * @param {} str
	 * @return {Boolean}
	 */
	 isDate:function(str){
	    if(str == "")
			return true;

	    //var re	= new RegExp("^([0-9]{1,2})[./]{1}([0-9]{1,2})[./]{1}([0-9]{4})$");
	    var re = new RegExp("^([0-9]{4})[-]{1}([0-9]{1,2})[-]{1}([0-9]{1,2})$");
	    var ar;
	    var res = true;

	    if ((ar = re.exec(str)) != null)
	    {
	        var i;

	        i = parseFloat(ar[2]);

	        if (i <= 0 || i > 12)
	            res = false;

	        i = parseFloat(ar[3]);

	        if (i <= 0 || i > 31)
	            res = false;
	    }
	    else{
	        res = false;
	    }

	    return res;
	},

	/**
	 * 判断是否电子邮件
	 * @param {} str
	 * @return {Boolean}
	 */
	 isEmail:function(str){
		if(str == "")
			return true;
		str = jQuery.trim(str);
		var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		return reg.exec(str) != null;

	},

	/**
	 *判断是否电话号码
	 * @param {} str
	 * @return {Boolean}
	 */
	 isPhone:function(str){
		if(str == ""){
			return true;
		}
		str = jQuery.trim(str);
		var reg = /^([0-9]{2}-)?(0?[0-9]{2,3}\-)?[1-9]?[0-9]{7}$/;
		return reg.exec(str) != null;
	},

	/**
	 *
	 * @param {} str
	 * @return {Boolean}
	 */
	 isMobile:function(str){
		if(str == ""){
			return true;
		}
		str = jQuery.trim(str);
		var reg=/^[0-9]{11}/;
		return reg.exec(str) != null;
	},

	/**
	 *
	 * @param {} str
	 * @return {Boolean}
	 */
	 isPostcode:function(str){
		if(str == ""){
			return true;
		}
		str = jQuery.trim(str);
		var reg = /^[0-9]{6}$/;
		return reg.exec(str) != null;
	},

	/**
	 * 是否组织机构代码
	 * @param {} str
	 * @return {Boolean}
	 */
	isOrgCode : function(str){
		if(str == ""){
			return true;
		}
		str = jQuery.trim(str);
		var reg = /^[A-Za-z0-9_\-\[\]\(\)]*$/;
		return reg.exec(str) != null;
	},
	/**
	 * 校验上传文件大小的方法
	 * 
	 * @author huangrh , checkFileSize : function (file){ if(file == null ||
	 *         file == ''|| file.indexOf(":\\")== -1){ alert("不能上传空文件!"); return
	 *         true; } var fso,f; fso = new
	 *         ActiveXObject("Scripting.FileSystemObject"); f =
	 *         fso.GetFile(file); if(f.size > appConstants.UPLOAD_FILE_MAXSIZE){
	 *         alert("上传文件的大小不能超过" + appConstants.UPLOAD_FILE_MAXSIZE + "Bytes
	 *         (1M)!\n\n您现在上传的文件大小为：" + f.size + "Bytes,请更换!"); return true; }
	 *         return false; }
	 */	
	
	/**
	 * 校验上传的文件(根据文件全路径fileName)是否与所选文件类型checkType一致
	 */	
	checkFileType : function(fileName, checkType) {
		var last = fileName.lastIndexOf(".");
		var lastname = fileName.substring(last, fileName.length);
		var array = new Array;
		if (checkType == "1") {
			// 图片文件格式 jpg,gif,bmp,tif,png,svg
			array[0] = ".jpg";
			array[1] = ".gif";
			array[2] = ".bmp";
		} else if (checkType == "2") {
			// Flash文件格式 swf,jpg,mp3,png,gif
			array[0] = ".swf";
		} else if (checkType == "3") {
			// 视频文件格式 rm,rmvb,mpeg1-4,mov,mtv,dat,wmv,avi,3gp,amv,dmv
			array[0] = ".rm";
			array[1] = ".rmvb";
			array[2] = ".wmv";
		}
		for (var i = 0; i < array.length; i++) {
			if (lastname.toLowerCase() == array[i])
				return true;
		}
		return false;
	}
	/**
	 * 校验上传文件(含图片、文档等类型)大小的统一方法
	 */
	,
	checkFileSize : function(file, size) {
		if (file == null || file == ''){
			return false;
		}
		var limit = 1024 * size;
		var img = new Image();
		img.dynsrc = file;
		if (img.fileSize > limit) {
			alert("上传文件的大小不能超过" + size + "K,请更换!");
			return true;
		}
		return false;
	}		
	/**
	 * 校验上传的文件是否正确
	 */
	,
	fileIsExit : function(fileName) {
		return (fileName.indexOf(':\\') < 1)
			
	}
};

/**
 * URL用户类
 * @type 
 */
Hundsun.UrlUtil = {
	/**
	 * 刷新页面
	 */	
	refresh : function() {
		var url = location.href.toString();
		location.href = url;
	},

	/**
	 * 转向页面
	 * @param {String} url
	 */	
	redirect: function(url) {
		location.href = url;
	},

	/**
	 * 格式化链接和参数
	 * @param {String} url
	 * @param {String} p
	 * @return {String}
	 */	
	format : function(url, p) {
		if(p){
			if (url.indexOf("?") == -1) {
				return url + "?" + p;
			} else {
				return url + "&" + p;
			}
		}else{
			return url;
		}
	},
	
	/**
	 * 重构URL中Query 
	 * @param {String} queryKey
	 * @param {String} queryValue
	 * @return {String}
	 */
	rebuildUrlQuery : function (queryKey, queryValue) {
		var query = document.location.search;
		if (query != "") {
			query = query.substring(1);
			var querys = query.split("&");
			query = "";
			for (var i = 0; i < querys.length; i++) {
				var tmps = querys[i].split("=");
				if (tmps.length > 1) {
					if (tmps[0] != queryKey) {
						query += "&" + tmps[0] + "=" + tmps[1];
					}
				}
			}
		}
		query += "&" + queryKey + "=" + queryValue;
		if (query != "") {
			query = query.substring(1);
		}
		return query;
	},
	
	/**
	 * 获取URL中去掉query的部分
	 */
	getUrlWithoutQuery : function(){
		var urlAll = document.location.href;
		
		var tmps =  urlAll.split("?");
		
		return tmps[0];
	},
	
	/**
	 * 获取URL中参数，返回对象
	 */
	getParames : function(){
		var returnO = {};
		var urlAll = document.location.href;
		var pos = urlAll.indexOf("?");
		if (pos != -1) {
			var urlQ = urlAll.substring(pos+1,urlAll.length);
	
			var params = urlQ.split('&');
		
			var paramsLength = params.length;
			var param;
			for(var i = 0; i < params.length; i ++){
				param = params[i];		
				var tmp = param.split('=');
				if(tmp.length == 1){
					returnO[tmp[0]] = null;
				}else{					
					returnO[tmp[0]] = tmp[1];
				}
			}
		};
		return returnO;
	},
	
	getUrlQueryFromForm : function(formId){
		var formItems = jQuery('input[type=text],input[type=hidden],select',jQuery('#' + formId));
		
		var query = '';
		jQuery.each(formItems,function(){
			if(jQuery.trim(this.value)!= '' && jQuery.trim(this.name)!= ''){
				//query += '&' + this.name + '=' + encodeURI(encodeURI(this.value.replace(' ','+')));
				query += '&' + this.name + '=' + this.value;
			}
		});
		
		if(query!=''){
			query = query.substring(1);
		}
	
		return query;
	},
	
	redirectQueryFromForm : function(url,formId){
		var url = this.format(url,this.getUrlQueryFromForm(formId));
		this.redirect(url);
		return false;
	}
};

Hundsun.IdCardUtil = {
/**
	 * 身份证中取生日
	 * 
	 * @param {String} idCart 身份证号
	 */	
	changeToBirth : function(idCart) {
		var idStr = "";
		var birthStr = "";
		if (null != idCart && idCart != '') {
			idStr = idCart.length == 18 ? idCart.substring(0, 17) : idCart
					.substring(0, 6)
					+ "19" + idCart.substring(6, 16);
			birthStr = idStr.substring(6, 10) + "-" + idStr.substring(10, 12)
					+ "-" + idStr.substring(12, 14);
		}
		return birthStr;
	}
	/**
	 * 身份证中籍贯
	 * 
	 * @param {String} idCart 身份证号
	 */
	,
	changeToArea : function(idCart) {
		var idStr = "";
		var birthStr = "";
		if (null != idCart && idCart != '') {
			birthStr = idCart.substring(0, 6);

		}
		return birthStr;
	}

	/**
	 * 身份证中取性别 其中1为男、2为女
	 * 
	 * @param {String} idCart 身份证号
	 */
	,
	changeToSex : function(idCart) {
		var sex = "";
		if (null != idCart && idCart != '') {
			sex = idCart.length == 18 ? idCart.substring(16, 17) : idCart.substring(14, 15);
		}
		if (parseInt(sex) % 2 == 1){
			sex = 1;
		}else{
			sex = 0;
		}
		return sex;
	}
};

Hundsun.CookieUtil = {
	/**
	 * 
	 * @param {String} name 
	 * @param {String} value
	 * @param {Integet} days  过期天数
	 * @param {String} Tdom 主机
	 */
	createCookie : function(name, value, days, Tdom) {
		var Tdom = (Tdom) ? Tdom : "/";
		if (!days) {
			days=30;
		}
		var date = new Date();
		//alert(date.toGMTString());
		//alert(days * 24 * 60 * 60 * 1000);
		//alert(date.getTime() + (days * 24 * 60 * 60 * 1000));
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));	
		document.cookie = name + "=" + escape (value) + "; expires=" + date.toGMTString() + "; path=" + Tdom;	
	},
	
	/**
	 * 
	 * @param {String} name
	 * @return {String}
	 */
	readCookie : function(name) {
		/*var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1, c.length);
			}
			if (c.indexOf(nameEQ) == 0) {
				return c.substring(nameEQ.length, c.length);
			}
		}*/
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		return (arr != null)? unescape(arr[2]) : null;
	}
};


Hundsun.FormUtils = {
	/**
	 * 获取表单值
	 * @param {Object} formId 或 form Jquery对象
	 * @return {Object}
	 */
	getFormValues : function(form){
		//console.log(typeof(form));
		var formObj;
		if(typeof(form) == 'string'){
			formObj = $('#' + form);
		}else{
			formObj = form;
		}	
		var values = {};
		var formItems = formObj.find(':text,textarea,select,:hidden,:password');
		$.each(formItems,function(){
			var v = $(this).val();
			if(v){
				values[this.name] = v;
			}
		});

		var formCheckBoxs = formObj.find(':checkbox');
		$.each(formCheckBoxs,function(){
			if(this.checked){
				if(values[this.name]){
					values[this.name] += ',' + this.value;
				}else{
					values[this.name] = this.value;
				}
			}
		});

		var formradios = formObj.find(':radio');
		$.each(formradios,function(){
			if(this.checked){
				values[this.name] = this.value;
			}
		});

		return values;
	},

	/**
	 * 设置表单值
	 * @param {String} formId 表单Id 必须
	 * @param {Object} values 表单数据 必须
	 * @param {String[]} checkboxNames 表单中的checkboxName 可为空
	 * @param {String[]} radioNames  表单中的radioName 可为空
	 */
	setFormValues:function(formId,values,checkboxNames,radioNames){
		var formItems = $('#' + formId).find(':text,:hidden,textarea,select');
		$.each(formItems,function(){
			//alert(this.id)
			var value = _getValue(this.name,values);
			if(value){
				$(this).val(value);
			}
		});

		if(checkboxNames && checkboxNames.length > 0){
			$.each(checkboxNames,function(){
				var name = this;
				$('#' + formId).find('[name="'+name+'"]').attr('checked',false);
				var value = _getValue(name,values);
				if(value){
					var checkboxvalues = value.split(',');
					$.each(checkboxvalues,function(i,o){
						$('#' + formId).find('[name="'+name+'"][value='+o+']').attr('checked','checked');
					});
				}
			});
		}

		if(radioNames && radioNames.length > 0){
			$.each(radioNames,function(){
				var name = this;
				$('#' + formId).find('[name="'+name+'"]').attr('checked',false);
				var value = _getValue(name,values);
				if(value){
					$('#' + formId).find('[name="'+name+'"][value='+value+']').attr('checked','checked');
				}
			});
		}

		function _getValue(name,values){
			if(name){
				var names = name.split('.');
				var length = names.length;
				var value = values[names[0]];
				for(var i=1; i < length; i++){
					try{
						value = value[names[i]]
					}catch(ex){
					}
				}

				return value
			}else{
				return null;
			}
		}
	},

	/**
	 * 重置表单
	 * @param {} formId
	 */
	resetForm:function(formId,isAboutHidden){
		var formDom = document.getElementById(formId);	
		
		if(formDom.tagName.toLowerCase() != 'form'){
			var form =  $(formDom).find('form');
			if(form.size() > 0){
				formDom = form.get(0);
			}else{
				formDom = null;
			}
		}
		
		if(formDom){
			formDom.reset();
			$('select',$(formDom)).val('');
		}
	}
};


///**
// * 字符串工具
// */
//Hundsun.StringUtil = {
//	/**
//	 * 去除空格
//	 */
//	trim:function(str){
//		return jQuery.trim(str);
//	}
//}

/**
 * 常量集
 */
Hundsun.Constant = {
	SUBMIT : 'submit',
	LOAD : 'load',
	MustInputTag : '<font color="red">*</font>'
};

/**
 * 格式化日期
 * @param {} fmt
 * @return {}
 */
Date.prototype.format = function(fmt){ //author: meizz    
	var o = {   
		"M+" : this.getMonth()+1,                 //月份    
		"d+" : this.getDate(),                    //日    
		"h+" : this.getHours(),                   //小时    
		"m+" : this.getMinutes(),                 //分    
		"s+" : this.getSeconds(),                 //秒    
		"q+" : Math.floor((this.getMonth()+3)/3), //季度    
		"S"  : this.getMilliseconds()             //毫秒    
	 };   
  	if(/(y+)/.test(fmt)){   
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  	}
	for(var k in o)   
    	if(new RegExp("("+ k +")").test(fmt))   
  			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  	
  	return fmt;   
}; 

/**
 * 格式化字符串
 * <br>
 * <code>
 * 
 * </code>
 * @return {String}
 */
String.format = function() {
    if( arguments.length == 0 )
        return null;
    var str = arguments[0]; 
    for(var i=1;i<arguments.length;i++) {
        var re = new RegExp('\\{' + (i-1) + '\\}','gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

/**
 * 左补齐
 * @param {} pads
 * @param {} padChar
 * @return {}
 */
String.prototype.leftPad = function(pads,padChar){
	var padLength = pads - this.length;
	
	if(padLength <= 0){
		return this;		
	}
	
	var returnV = '';
	
	for(var i=0; i < padLength; i++){
		returnV += padChar;
	}
	
	returnV += this;
	
	return returnV;
};

/**
 * 去掉两端空格
 * @return {String}
 */
String.prototype.trim = function(){
	if(!this)
		return '';
	return this.replace(/(^\s*)|(\s*$)/g, '');
}