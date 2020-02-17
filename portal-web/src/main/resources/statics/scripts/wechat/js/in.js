
wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wxe436959600c68407', // 必填，公众号的唯一标识
    timestamp: '1435751605', // 必填，生成签名的时间戳
    nonceStr: 'HbistcWxJyzxTest', // 必填，生成签名的随机串
    signature: inWxSignature,// 必填，签名，见附录1
    jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.ready(function(){
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
	//config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
	//对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
	//alert("微信config验证成功！");
});

wx.error(function(res){
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看
	//也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	alert("微信config验证失败："+res);
});

//连续扫描个数，批次号1|件次号1，批次号2|件次号2，批次号3|件次号3...如果是承钢,则是检斤单号1，检斤单号2，检斤单号3.。。
var scanResults = new Array();  

//扫码入库
function scanIn(){
	recordScan("");  //TO DEL
	wx.scanQRCode({
	    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
	    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
	    success: function (res) {
		    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
			
			//把本次的扫描结果，计入所有的扫描数组中；
			recordScan(result);
		}
	});
}


//把本次的扫描结果，计入所有的扫描数组中；如果已经存在，不重复记录
function recordScan(result){
	var v = document.getElementById("gangc").value;
	if(v=="XUANGANG01"){  //宣钢
		if(!result) {}
		else{
			var start = result.indexOf(",");
		    var len = result.length;
		    if(start==-1) {start = 0;}
		    var lotNumber = result.substring(start+2,len-2);  //批次号
		    var seqNumber = result.substring(len-2,len);	//件次号
		    document.getElementById("lotNumber").value=lotNumber;
			document.getElementById("seqNumber").value=seqNumber;
		}
		
		recordScan_XGLX();
	}else{
		//承钢
		if(!result) {}
		else{
//			var start = result.indexOf(";");
//		    var len = result.length;
//		    if(start==-1) {start = 0;}
//		    var jjdh = result.substring(start+1,len-1);	//件次号
			var array = result.split(";");
			var jjdh = array[1];
		    document.getElementById("jjdh").value=jjdh;
		}
		
		recordScan_CG();
	}
}

//把本次的扫描结果，计入所有的扫描数组中；如果已经存在，不重复记录
function recordScan_XGLX(){
	
	var lotNumber = document.getElementById("lotNumber").value;
	var seqNumber = document.getElementById("seqNumber").value;
	
	if(lotNumber!="" && seqNumber!=""){
		var scanResultsLength = scanResults.length;
		var currScanRusult = lotNumber+"|"+seqNumber;
		var isScaned = false;  //该批次号和件次号是否已经扫描过
		if(scanResultsLength==0){
			scanResults[0] = currScanRusult;
		}else{
			for(var j=0; j<scanResultsLength; j++){
				if(scanResults[j]==currScanRusult){
					isScaned = true;
					break;
				}
			}
		}
		if(isScaned==false){
			scanResults[scanResultsLength] = currScanRusult;
		}
		
		document.getElementById("scanNumber").innerHTML = scanResults.length;
		document.getElementById("scanResults").value = scanResults.join(",");
	}
	
	
}

//把本次的扫描结果，计入所有的扫描数组中；如果已经存在，不重复记录
function recordScan_CG(){
	
	var jjdh = document.getElementById("jjdh").value;
	
	if(jjdh!=""){
		var scanResultsLength = scanResults.length;
		var currScanRusult = jjdh;
		var isScaned = false;  //该检斤单号是否已经扫描过
		if(scanResultsLength==0){
			scanResults[0] = currScanRusult;
		}else{
			for(var j=0; j<scanResultsLength; j++){
				if(scanResults[j]==currScanRusult){
					isScaned = true;
					break;
				}
			}
		}
		if(isScaned==false){
			scanResults[scanResultsLength] = currScanRusult;
		}
		
		document.getElementById("scanNumber").innerHTML = scanResults.length;
		document.getElementById("scanResults").value = scanResults.join(",");
	}
	
	
}

/**
 * 钢厂改变
 */
function changeGC(v){
	
	var varityType = document.getElementById("varietyType").value;
	 window.location.href=appServer+"/wx/in.htm?gangc="+v+"&varietyType="+varityType;
//	var e1 = document.getElementById("varietyTypeDiv");
//	var e2 = document.getElementById("XGDiv");
//	var e3 = document.getElementById("CGDiv");
//	
//	if(v=="XUANGANG01"){  //宣钢龙翔
//		e1.style.display = "none";
//		e2.style.display = "";
//		e3.style.display = "none";
//		
//		scanResults.length = 0;  //清空数组
//	}else{  //承钢
//		e1.style.display = "";
//		e2.style.display = "none";
//		e3.style.display = "";
//		
//		scanResults.length = 0;  //清空数组
//	}
}

function changeVT(v){
	var e1 = document.getElementById("titleShow");
	if(v==1){
		e1.innerHTML="检斤单号";
	}else{
		e1.innerHTML="钢卷号";
	}
}



