wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wxe436959600c68407', // 必填，公众号的唯一标识
    timestamp: '1435751605', // 必填，生成签名的时间戳
    nonceStr: 'HbistcWxJyzxTest', // 必填，生成签名的随机串
    signature: inWxSignature,// 必填，签名，见附录1
    jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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

//==========================微信获取地里位置 start

var getLocation = {
		//微信JS-SDK获取经纬度方法
			weichatLatAndLon: function (callback, error) {
				wx.getLocation({
					success: function (res) {
						var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
						var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
						var speed = res.speed; // 速度，以米/每秒计
						var accuracy = res.accuracy; // 位置精度
						//alert("latitude : "+latitude+"--longitude : "+longitude+"--speed : "+speed+"--accuracy : "+accuracy);
						var data = {
							latitude: latitude,
							longitude: longitude
						};
						if (typeof callback == "function") {
							callback(data);
						}
					},
					cancel: function () {
						//这个地方是用户拒绝获取地理位置
						if (typeof error == "function") {
							error();
						}
					}
				});
			},
			//将经纬度转换成城市名和街道地址，参见百度地图接口文档：http://developer.baidu.com/map/index.php?title=webapi/guide/webservice-geocoding
			cityname: function (latitude, longitude, callback) {
				$.ajax({
					url: 'http://api.map.baidu.com/geocoder/v2/?ak=btsVVWf0TM1zUBEbzFz6QqWF&callback=renderReverse&location=' + latitude + ',' + longitude + '&output=json&pois=1',
					type: "get",
					dataType: "jsonp",
					jsonp: "callback",
					success: function (data) {
						var province = data.result.addressComponent.province; //省
						var cityname = (data.result.addressComponent.city);  //市
						var district = data.result.addressComponent.district;  //区
						var street = data.result.addressComponent.street;
						var street_number = data.result.addressComponent.street_number;
						var formatted_address = data.result.formatted_address;
						//alert("province="+province+";cityname="+cityname+";district="+district+";street="+street+";street_number="+street_number+";<br />formatted_address="+formatted_address);
						var data = {
							province: province,
							cityname: cityname,
							district: district
						};
						if (typeof callback == "function") {
							callback(data);
						}

					}
				});
			},
		//设置默认经纬度
			setDefaultCity: function (callback) {
				alert("获取地理位置失败！");
				//默认经纬度
				var data = {
						latitude: "0",
						longitude: "0"
					};
				if (typeof callback == "function") {
					callback(data);
				}
			},
		//更新地理位置
			refresh: function (callback) {
				var that = this;
				//重新获取经纬度和城市街道并设置到localStorage
				that.latAndLon(
					function (data) {
						that.cityname(data.latitude, data.longitude, function (datas) {
							if (typeof callback == "function") {
								callback();
							}
						});
					},
					function(){
						that.setDefaultCity(function(){
							if (typeof callback == "function") {
								callback();
							}
						});
					});
			}
		};

function clickGetLocation(){
	var oForm = document.getElementById("form1");
	
		getLocation.weichatLatAndLon(
				function (data) {
					//data包含经纬度信息
					var latitude = data.latitude; // 纬度，浮点数，范围为90 ~ -90
					var longitude = data.longitude; // 经度，浮点数，范围为180 ~ -180。
					document.getElementById("latitude").value=latitude;
					document.getElementById("longitude").value=longitude;
					//alert(document.getElementById("latitude").value+"<br />;"+document.getElementById("longitude").value);
					oForm.submit(); 
					
				},
				function () {
					getLocation.setDefaultCity(
						function (defaultData) {
							document.getElementById("latitude").value=defaultData.latitude;
							document.getElementById("longitude").value=defaultData.longitude;
							oForm.submit(); 
						}
					);
				}
			);
	
	
}
//继续扫码按钮绑定事件,返回到扫码页面继续扫码
function submitForm1(){
	var oForm = document.getElementById("form1");
	oForm.setAttribute("action","inScan.htm");
	oForm.submit();
}	
	
	　　

//===========================微信获取地里位置 end