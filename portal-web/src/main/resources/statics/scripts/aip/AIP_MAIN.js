/****************************************************************************************************

全局变量

httpaddr    印章服务器地址，第一个参数为印章服务器的ip+端口+路径，一般只需要修改ip+端口即可。

*****************************************************************************************************/

var httpaddr="";

/****************************************************************************************************

方法名：OpenFile					打开文档
参  数：url							可以是服务器http路径：http://127.0.0.1/test.pdf
									也可以是本地文件路径：c://test.pdf
									也可以是文件流：http://127.0.0.1/GetFile.aspx

*****************************************************************************************************/
function OpenFile(url) {
	var AipObj = document.getElementById("HWPostil1");
	var IsOpen = AipObj.LoadFile(url);
	if (IsOpen != 1) {
		alert("打开文档失败");
	}
}
/****************************************************************************************************

方法名：AddSeal						手动盖章或手写
参  数：usertype					用户类型：0 测试用户，1 本地key用户，2 服务器key用户，3 服务器口令用户
		doaction					操作类型：0 盖章，1 手写。
		other						预留参数：
											当usertype为1,2时，值为用户真实姓名，可以为空获则取证书用户名。
											当usertype为3时，值为口令内容。

说明：httpaddr中

*****************************************************************************************************/
function AddSeal(usertype,doaction,other) {
	var AipObj = document.getElementById("HWPostil1");
	if(usertype==0){
		var islogin=AipObj.Login("HWSEALDEMO**",4,65535,"DEMO","");
	}else if(usertype==1){
		var islogin=AipObj.Login(other,1,65535,"","");
	}else if(usertype==2){
		var islogin=AipObj.Login(other,3,65535,"",httpaddr);
	}else if(usertype==3){
		var stri="Use-RemotePfx-Login:"+other;
		var strj=stri.length+1;
		var islogin=AipObj.LoginEx(httpaddr, stri, strj);
	}else{
		alert("用户类型参数错误，以测试用户身份登录");
		var islogin=AipObj.Login("HWSEALDEMO**",4,65535,"DEMO","");
	}
	if (islogin != 0) {
		alert("盖章失败！");
	} else {
		if(doaction==0){
			AipObj.CurrAction = 2568;
		}else if(doaction==1){
			AipObj.CurrAction = 264;
		}
	}
}
/****************************************************************************************************

方法名：AutoSeal					自动盖章
参  数：usertype					用户类型：0 测试用户，1 本地key用户，2 服务器key用户，3 服务器口令用户
		doaction					操作类型：0 普通印章，1 右骑缝章，2对开骑缝
		searchtype					定位盖章位置类型：只对普通印章doaction=0时有效，0 绝对坐标，1 文字定位
		searchstring				定位信息：只对普通印章doaction=0时有效
											searchtype为0时，searchstring为x:y:page格式，即200:500:0   x为横向坐标1-50000，y为纵向坐标1-50000，page为盖章页码从0开始
											searchtype为1时，searchstring为要查找的文字字符串
											doaction=1时，定位骑缝章位置 add by wuyb
		other						预留参数：
											当usertype为1,2时，值为用户真实姓名，可以为空获则取证书用户名。
											当usertype为3时，值为口令内容。
返回值：-200是登陆失败或者为插入Ukey，-100是签章失败，1是签章成功
*****************************************************************************************************/
function AutoSeal(usertype,doaction,searchtype,searchstring) {
	var AipObj = document.getElementById("HWPostil1");
	
	if(usertype==0){
		var islogin=AipObj.Login("HWSEALDEMO**",4,65535,"DEMO","");
	}else if(usertype==1){
		var islogin=AipObj.Login("",1,65535,"","");
	}else if(usertype==2){
		var islogin=AipObj.Login("",3,65535,"","http://"+httpaddr+":8089/inc/seal_interface/");
	}else if(usertype==3){
		var stri="Use-RemotePfx-Login:";
		var strj=stri.length+1;
		var islogin=AipObj.LoginEx("http://"+httpaddr+":8089/inc/seal_interface/", stri, strj);
	}else{
		alert("用户类型参数错误，以测试用户身份登录");
		var islogin=AipObj.Login("HWSEALDEMO**",4,65535,"DEMO","");
	}
	if (islogin != 0) {
		if(islogin=="-12" || islogin=="-202" || islogin=="-203" ){
			alert("证书已过期或没有证书，请联系Ukey管理员");
			return false;
		}else if(islogin=="-201"){
			alert("Ukey密码错误");
			return false;
		}else if(islogin=="-140"){
			alert("Ukey没有授权，请联系Ukey管理员");
			return false;
		}else if(islogin=="-200"){
			return "-200";
		}else{
			alert("盖章失败，错误编码："+islogin);
			return false;
		}
	} else {
		if(doaction==0){
			var num=AipObj.PageCount;
			var str=searchstring.split(":");
			var page="";
			if(searchtype==0){
				var isseal=AipObj.AddQifengSeal(0,0+","+str[0]+",0,"+str[1]+",50,"+str[2],"","AUTO_ADD_SEAL_FROM_PATH");
				if(isseal!=1){
					return "-100";
				}else{
					return "1";
				}
			}else if(searchtype==1){
				var isseal="-100";
				if(num>=1){
					for(i=1;i<=num;i++){
						isseal=AipObj.AddQifengSeal(0,"AUTO_ADD:0,"+num+",50000,2000,"+i+","+searchstring+")|(0,","","AUTO_ADD_SEAL_FROM_PATH");
					}
				}
				if(isseal!=1){
					return "-100";
				}else{
					return "1";
				}
			}
		}else if(doaction==1){
			var num=AipObj.PageCount;
			if(num<2){
				//一页合同不盖骑缝章 add by wuyb
				return "-100";
			}
			var page="";
			for(i=1;i<num;i++){
				page+=i+",";
			}
			var bl=100/(num);
			var isseal=AipObj.AddQifengSeal(0,0+","+searchstring+",1,3,"+bl+","+page,"","AUTO_ADD_SEAL_FROM_PATH");
			if(isseal!=1){
				return "-100";
			}else{
				return "1";
			}
		}else if(doaction==2){
			var num=AipObj.PageCount;
			for(i=0;i<num-1;i++){
				var isseal=AipObj.AddQifengSeal(0,i+",25000,2,3,50,1","","AUTO_ADD_SEAL_FROM_PATH");
				if(isseal!=1){
					return "-100";
				}else{
					return "1";
				}
			}
		}
	}
}
/****************************************************************************************************

方法名：SaveTo								保存文档
参  数：savetype							文档保存方式：0 保存本地，1 保存到服务器
		filepath							文档保存路径：
													savetype为0时为本地路径，可以为空，为空会弹出地址框，例如c:/test/1.pdf
													savetype为1时为服务器路径，例如http://127.0.0.1/getfile.php,地址为文件接收服务器地址，接收文件流FileBlod
		filecode							文档惟一标示：
													savetype为0时为文档类型，值可以为doc，pdf，aip，word，jpg，gif，bmp等
													savetype为1时为文档唯一标示，用做服务器接收的参数FileCode

*****************************************************************************************************/
function SaveToS(savetype,filepath,filecode) {
	var AipObj = document.getElementById("HWPostil1");
	
	if(savetype==0){
		var issave = AipObj.SaveTo(filepath, filecode, 0);
		if (issave == 0) {
			alert("保存失败！");
		}
	}else if(savetype==1){
		AipObj.ForceSignType2=AipObj.ForceSignType2+0x8000;
		AipObj.HttpInit(); //初始化HTTP引擎。
		AipObj.HttpAddPostString("FileCode", filecode); //设置上传变量FileCode文档惟一标示。
		AipObj.HttpAddPostCurrFile("FileBlod"); //设置上传当前文件,文件标识为FileBlod。
		var ispost = AipObj.HttpPost(filepath); //上传数据。
		//if (ispost != 0) {
			//alert("文档上传失败！错误代码：" + ispost);
		//}
	}else{
		alert("SaveTo方法参数错误！");
	}
}
/****************************************************************************************************

方法名：ShowFullScreen					全屏查看
参  数：slog							1为全屏，0为普通

*****************************************************************************************************/
function ShowFullScreen(slog) {
	var AipObj = document.getElementById("HWPostil1");
	AipObj.ShowFullScreen = slog;
}
/****************************************************************************************************

方法名：FilePrint						打印文档
参  数：plog							0快速打印，1有打印对话框

*****************************************************************************************************/
function FilePrint(plog) {
	var AipObj = document.getElementById("HWPostil1");
	var isprint = AipObj.PrintDoc(1, plog);
	if (isprint == 0) {
		alert("打印失败！");
	}
}
/****************************************************************************************************

方法名：FileMerge						合并文件
参  数：filepath						要合并文件路径，如果只为空则插入一个空白页
		page							文件要插入的页数,插入到第一页值为0

*****************************************************************************************************/
function FileMerge(filepath,page) {
	var AipObj = document.getElementById("HWPostil1");
	AipObj.Login("HWSEALDEMO**",4,65535,"DEMO","");
	if(filepath==""){
		var isMerge = AipObj.InsertEmptyPage(page,0,0,0);
	}else{
		var isMerge = AipObj.MergeFile(page,filepath);
	}
	if (isMerge == 0) {
		alert("合并文档失败！");
	}
}
/****************************************************************************************************

方法名：SetPenwidth						设置手写笔宽
参  数：无

*****************************************************************************************************/
function SetPenwidth() {
	var AipObj = document.getElementById("HWPostil1");
	AipObj.CurrPenWidth=-1;
}
/****************************************************************************************************

方法名：SetColor						设置手写笔颜色
参  数：无

*****************************************************************************************************/
function SetColor() {
	var AipObj = document.getElementById("HWPostil1");
	AipObj.CurrPenColor=-1;
}
/****************************************************************************************************

方法名：SetPressurelevel				设置手写压感
参  数：无

*****************************************************************************************************/
function SetPressurelevel() {
	var AipObj = document.getElementById("HWPostil1");
	AipObj.Pressurelevel=-1;
}
/****************************************************************************************************

方法名：SetAction						设置鼠标状态
参  数：SetLog							设置状态：1 浏览，2 文字选择

*****************************************************************************************************/
function SetAction(SetLog) {
	var AipObj = document.getElementById("HWPostil1");
	AipObj.CurrAction=SetLog;
}
/****************************************************************************************************

方法名：SetPageMode						设置视图
参  数：SetLog							设置操作状态：1 原始大小，2 适应宽度，3 窗口大小，4 双页显示，5 无边框

*****************************************************************************************************/
function SetPageMode(SetLog) {
	var AipObj = document.getElementById("HWPostil1");
	if(SetLog==1){
		AipObj.SetPageMode(1,100);
	}else if(SetLog==2){
		AipObj.SetPageMode(2,100);
	}else if(SetLog==3){
		AipObj.SetPageMode(4,100);
	}else if(SetLog==4){
		AipObj.SetPageMode(8,2);
	}else if(SetLog==5){
		AipObj.SetPageMode(16,1);
	}
}
/****************************************************************************************************

方法名：ShowToolBar						设置工具栏
参  数：SetLog							设置状态：0 隐藏，1 显示

*****************************************************************************************************/
function ShowToolBar(SetLog) {
	var AipObj = document.getElementById("HWPostil1");
	AipObj.ShowToolBar=SetLog;
}
/****************************************************************************************************

方法名：ShowDefMenu						设置菜单
参  数：SetLog							设置状态：0 隐藏，1 显示

*****************************************************************************************************/
function ShowDefMenu(SetLog) {
	var AipObj = document.getElementById("HWPostil1");
	AipObj.ShowDefMenu=SetLog;
}
/****************************************************************************************************

方法名：ShowScrollBarButton				设置滚动条
参  数：SetLog							设置状态：2 隐藏滚动条，1 隐藏滚动条的工具栏，0 显示滚动条

*****************************************************************************************************/
function ShowScrollBarButton(SetLog) {
	var AipObj = document.getElementById("HWPostil1");
	AipObj.ShowScrollBarButton=SetLog;
}
/****************************************************************************************************

方法名：SetFullScreen					设置全屏
参  数：SetLog							设置状态：1全屏，0正常

*****************************************************************************************************/
function SetFullScreen(SetLog) {
	var AipObj = document.getElementById("HWPostil1");
	AipObj.ShowFullScreen =SetLog;
}
/****************************************************************************************************

方法名：SearchText						查找文字
参  数：stxt							要查找的文字
		matchcase						是否区分大小写
		findnext						查找位置。0:从头可以查找;1:查找下一个

*****************************************************************************************************/
function SearchText(stxt,matchcase,findnext) {
	var AipObj = document.getElementById("HWPostil1");
	AipObj.SearchText(stxt,matchcase,findnext);
}
/****************************************************************************************************

方法名：FileAddseal						使用文件盖章
参  数：selpath							印章路径
		doaction						操作类型：0 普通印章，1 右骑缝章，2对开骑缝
		searchtype						定位盖章位置类型：只对普通印章doaction=0时有效，0 绝对坐标，1 文字定位
		searchstring					定位信息：只对普通印章doaction=0时有效
											searchstring为x:y:page格式，即200:500:0   x为横向坐标1-50000，y为纵向坐标1-50000，page为盖章页码从0开始

*****************************************************************************************************/
function FileAddseal(selpath,doaction,searchtype,searchstring) {
	var AipObj = document.getElementById("HWPostil1");
	var islogin=AipObj.Login("",1,65535,"","");
	if (islogin != 0) {
		alert("盖章失败！错误编号：" + islogin);
	} else {
		AipObj.ShowErrMsgMode=0;
		if(doaction==0){
			var num=AipObj.PageCount;
			var str=searchstring.split(":");
			var page="";
			if(searchtype==0){
				if(AipObj.AddQifengSeal(0,0+","+str[0]+",0,"+str[1]+",50,"+str[2],"","AUTO_ADD_SEAL_FROM_PATH")!=1){
					AipObj.AddQifengSeal(0,0+","+str[0]+",8,"+str[1]+",50,"+str[2]+","+selpath,"","AUTO_ADD_SEAL_FROM_PATH");
				}
			}else if(searchtype==1){
				if(AipObj.AddQifengSeal(0,"AUTO_ADD:0,"+num+",0,0,1,"+searchstring+")|(0,","","AUTO_ADD_SEAL_FROM_PATH")!=1){
					AipObj.AddQifengSeal(0,"AUTO_ADD:0,"+num+",0,0,1,"+searchstring+")|(8,"+selpath,"","AUTO_ADD_SEAL_FROM_PATH");
				}
			}
		}else if(doaction==1){
			var num=AipObj.PageCount;
			var page="";
			for(i=1;i<num;i++){
				page+=i+",";
			}
			var bl=100/(num-1);
			AipObj.AddQifengSeal(0,0+",25000,9,3,"+bl+","+page+","+selpath,"","AUTO_ADD_SEAL_FROM_PATH");
		}else if(doaction==2){
			var num=AipObj.PageCount;
			for(i=0;i<num-1;i++){
				AipObj.AddQifengSeal(0,i+",25000,10,3,50,1,"+selpath,"","AUTO_ADD_SEAL_FROM_PATH");
			}
		}
	}
}
/****************************************************************************************************

方法名：SealUnclear						印章雾化
参  数：无

*****************************************************************************************************/
function SealUnclear(setlog) {
	var AipObj = document.getElementById("HWPostil1");
	if(setlog==0){
		AipObj.ForceSignType|=0x400;
	}else if(setlog==1){
		AipObj.ForceSignType^=0x400;
	}
}
/****************************************************************************************************

方法名：AddBarcode						添加二维条码
参  数： usertype					用户类型：0 测试用户，1 本地key用户
返回值：-200是登陆失败或者未插入Ukey，-100是操作失败，1是操作成功
*****************************************************************************************************/
function AddBarcode(usertype,BarcodeStr,Xpos,Ypos,Zoom) {
	var AipObj = document.getElementById("HWPostil1");
	Zoom=13107200+100*Zoom;
	if(usertype==0){
		var islogin=AipObj.Login("HWSEALDEMO**",4,65535,"DEMO","");
	}else if(usertype==1){
		var islogin=AipObj.Login("",1,65535,"","");
	}else{
		alert("用户类型参数错误，以测试用户身份登录");
		var islogin=AipObj.Login("HWSEALDEMO**",4,65535,"DEMO","");
	}
	if (islogin != 0) {
		return "-200";
	} else {
		var num=AipObj.PageCount;
		for(i=0;i<num;i++){
			AipObj.InsertPicture("","BARCODEUTF8DATA:"+BarcodeStr,i,Xpos,Ypos,Zoom);
		}
		return "1";
	}
}