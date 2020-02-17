
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
	 alert('微信config验证失败： '+JSON.stringify(res));
});

//扫码校验质保书
function scanSearch(){
	//recordScan('016240754110');
	//recordScan("");  //TO DEL
	wx.scanQRCode({
	    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
	    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有,qrCode常见正方块二维码，barCode条形二维码
	    success: function (res) {
		    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
		    var start = result.indexOf(",");
		    var len = result.length;
		    if(start==-1) {start = 0;}
		    result = result.substring(start+1,len);	//件次号
		    console.log("-----------微信质保扫码:"+result+"-------");
			recordScan(result);
		}
	});
}


/**
 * 把本次的扫描结果传到后台Action
 * @param result
 */
function recordScan(result){
	if(!result) {}
	else{
	    document.getElementById("temp1").value=result;
	    //提交表单到后台action,查询并展示已经扫码过的数据的详情
		var oForm = document.getElementById("searchForm");
		oForm.setAttribute("action",getAppServer+"/crmWeChat/certificateScan.htm");
		oForm.submit();
	}
}


