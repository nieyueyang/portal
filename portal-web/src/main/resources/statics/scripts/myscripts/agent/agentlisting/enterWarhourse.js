var formHtml;
var appendHtml = '';
var tabs = "<input type='hidden' name='varietyTypeCode'/>" +
			"<table class='c3'><tr><th width='63px'><span style='color:red'>*</span>品种：</th>" + 
             "<td width='450px'><input type='text' id='varietyShortName' name='varietyShortName' style='width:100px;' onclick='showPrjTypeSel4ew(this,chooseVType,null,null,null,null,null,false)'/></td><td width='80px'> <a href='javascript:void(0);' class='button-2' onclick='del(this)'>移除</a></td></tr><tr><td width='100%' colspan='3'></td></tr></table>";
                      
                     
jQuery(function() {
   // initWahouse(); //初始化三方仓库信息
})


function initWahouse() {
    $.get(appServer + '/contract/load_details_enterWarhourse.htm?' + Math.round((Math.random()) * 100000000),
    function(data) {
        var WHCk = data.whclist;
        var msg = data.msg;
        if (msg != null) {
            Hundsun.PopUtil.alert({
                width: 450,
                timeout: 800,
                type: 'warn'
            }) 
            return;
        }
        if (WHCk == null) {
            Hundsun.PopUtil.alert({
                msg: "未加载到交收库信息!",
                width: 450,
                timeout: 800,
                type: 'warn'
            }) 
            return;
        }

        jQuery(WHCk).each(function(n) {
            var tmpAddr = WHCk[n].address;
            if (tmpAddr == null) {
                tmpAddr = "";
            }
            tmpAddr = tmpAddr.replace(/null/g, "");
            ops = ops + "<option value=\"" + WHCk[n].id + "|" + tmpAddr + "\">" + WHCk[n].name + "</option>";

        })

        //选中仓库select
        var wahourseSel = $("#warehouseCmp");
        wahourseSel.append(ops);
    });
}

	   
var row_count = 1;
function addNew() {
	var table1 = $("#mainTab");
	var row = $("<tr id='"+row_count+"'></tr>"); //第一行为主要信息
	//var row2 = $("<tr></tr>"); //第二行是插入移除按钮
	var td1 = $("<td></td>");
	//var td2 = $("<td align='right' colspan='2'></td>");
	
	td1.append(tabs);
	//添加 仓库select 数据
   // td2.append($("<a href='javascript:void(0);' class='button-2' onclick='del(this)'>移除</a>"));
	row.append(td1);
	//row2.append(td2);
	table1.append(row);
	//table1.append(row2);
	row_count++;
} 

//删除当期行
function del(obj){
	//var mainTab = document.getElementById("mainTab");
	//第一行不能删除
	var row = $(obj).parent().parent().parent().parent().parent().parent(); //获取列表的row（行） 
	//var firstRow = row.index() ;
	//删除本行以及上一行 行索引从 0开始
	row.remove();
	//mainTab.deleteRow(firstRow);

}

//检查入库重量参数是否准确
function checkApplyWeight(obj) {
	var value = $(obj).val();
	if(value == null || value == ""){
		return;
	}
	if(isNaN(value)){
		alert("入库重量请输入数字格式!");
		obj.focus();
		return;
	}
	//不能是负数
	if(parseFloat(value) <= 0)
	{
		alert("入库重量请输入大于0的数字!");
		obj.focus();
		return;
	}
	//如果输入多位,自动将其转换为 三位小数
	value = parseFloat(value).toFixed(3);
	$(obj).val(value);
	
}
//检查入库单价
function checkUnitPrice(obj) {
	var value = $(obj).val();
	if(value == null || value == ""){
		return;
	}
	if(isNaN(value)){
		alert("入库单价请输入数字格式!");
		obj.focus();
		return;
	}
		//不能是负数
	if(parseFloat(value) <= 0)
	{
		alert("入库单价请输入大于0的数字!");
		obj.focus();
		return;
	}
	
	value = parseFloat(value).toFixed(2);
	$(obj).val(value);
	
}

function checkQuantity(obj){
		var value = $(obj).val();
	if(value == null || value == ""){
		return;
	}
	if(isNaN(value)){
		alert("入库数量请输入数字格式!");
		obj.focus();
		return;
	}
	
	//不能是负数
	if(parseFloat(value) <= 0)
	{
		alert("入库数量请输入大于0的数字!");
		obj.focus();
		return;
	}
	
	//只能是整数
	if(!(/^(\+|-)?\d+$/.test(value)))  
	{
		alert("入库数量请输入整数!");
		obj.focus();
		return;
	}
	
}

//校验数据
var _msg;

function orderDo() {
    var cartJsonList = []; // 货物列表
    var selNum = 0;
    
    //检查数据是否为空 是否正确
    var  varietyShortNames = document.getElementsByName("varietyShortName");
    //varietyTypeCode
    var  varietyTypeCodes = document.getElementsByName("varietyTypeCode");
   
    //入库重量
    var  applyWeights = document.getElementsByName("applyWeight");
    //入库单价
    var  unitPrices = document.getElementsByName("unitPrice");
    
    //入库数量
    var  unitPrices = document.getElementsByName("unitPrice");
    
    var isR = true;
     
    for(var i=0 ; i< varietyShortNames.length; i++){
    	if(varietyShortNames[i].value == null || varietyShortNames[i].value ==""){
    		alert("入库品种没有选择");
    		varietyShortNames[i].focus();
    		isR = false;
    		break;
    	}
    	
    	if(applyWeights[i].value == null || applyWeights[i].value == "")
    	{
    		alert("入库品种=["+varietyShortNames[i].value+"],入库重量没有填写!");
    		applyWeights[i].focus();
    		isR = false;
    		break;
    	}
    	
    		if(unitPrices[i].value == null || unitPrices[i].value == "")
    	{
    		alert("入库品种=["+varietyShortNames[i].value+"],入库单价没有填写!");
    		unitPrices[i].focus();
    		isR = false;
    		break;
    	}
    }
    
    if(!isR){
    	return;
    }
    
       var	feeMsg = '确定提交入库吗？';
       var goodJsonList = []; 
		
        $("#mainTab").find("tr").each(function() {
				var id = $(this).attr("id");
				if (id && id != null && id != "") {
					
					//材质 等级 长 宽 高 等元素 可能是 下来菜单
					
					var goodJson = {
						//batchNo;// 批次号
						"batchNo" : $(this).find("input[name='batchNo']").val(),
						//qualityStandard;// 质量标准/执行标准
						"qualityStandard" : $(this).find("input[name='standard']").val(),
						//baleNo;// 捆包号/包装
						"baleNo" : $(this).find("input[name='packing']").val(),
						//applyWeight;// 入库申请重量
						"applyWeight" : $(this).find("input[name='applyWeight']").val(),
						// unitPrice;// 入库物品单价
						"unitPrice" : $(this).find("input[name='unitPrice']").val(),
						//grade;// 等级
						"grade" : ($(this).find("input[name='grade']").val()== null ? $(this).find("select[name='grade']").find('option:selected').val(): $(this).find("input[name='grade']").val()),
						//varietyCode;// 品种编码
						"varietyCode" : $(this).find("input[name='varietyTypeCode']").val(),
						//varietyName;// 品种名称
						"varietyName" : $(this).find("input[name='varietyShortName']").val(),
						//material;// 材质
						"material" : ($(this).find("input[name='material']").val() == null ? $(this).find("select[name='material']").find('option:selected').val(): $(this).find("input[name='material']").val()),
						//length;// 长度
						"length" : ($(this).find("input[name='length']").val() == null ? $(this).find("select[name='length']").find('option:selected').val(): $(this).find("input[name='length']").val()),
					   //width;// 宽度
						"width" : ($(this).find("input[name='width']").val()== null ? $(this).find("select[name='width']").find('option:selected').val(): $(this).find("input[name='width']").val()),
						//thickness;// 厚度/直径
						"thickness" : ($(this).find("input[name='thickness']").val()== null ? $(this).find("select[name='thickness']").find('option:selected').val(): $(this).find("input[name='thickness']").val()),
						//manufacturer;// 生成厂家 manufacturer
						"manufacuturer" : $(this).find("input[name='manufacuturer']").val(),
						//origin;// 产地 
						"origin" : $(this).find("input[name='orgin']").val(),
						// quantity;// 数量
						"quantity" : $(this).find("input[name='quantity']").val(),
						// brand;// 品牌
						"brand" : $(this).find("input[name='brand']").val(),
						// unitMeasure;// 计量
						"unitMeasure" : ($(this).find("input[name='measureType']").val()== null ? $(this).find("select[name='measureType']").find('option:selected').val(): $(this).find("input[name='measureType']").val()),
						//enterWhDate 入库时间
						"enterWhDate":$(this).find("input[name='enterWhDate']").val()
					}
					goodJsonList.push(goodJson);
				}
			});
			
			var goodsListStr = JSON.stringify(goodJsonList);
			$("#goodsListStr").val(goodsListStr);
			
			//alert("goodsListStr=" + goodsListStr);
			
			 exeSubmit(feeMsg);
    
}


function exeSubmit(msg){
		Boxy.confirm(msg,function(){
				_msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
				
				//alert($("#buyerCompanyName_").val());
				
			jQuery.post (
					appServer + '/contract/agent/enterWarhourseDo.htm',
					{"sellerCompanyId":$("#sellerCompanyId").val(),
					"sellerCompanyName":$("#sellerCompanyName").val(),
					"contractId":$("#contractId").val(),
					"contractNo":$("#contractNo").val(),
					
					"buyerCompanyId":$("#buyerCompanyId").val(),
					"buyerCompanyName":$("#buyerCompanyName_").val(),
					"warehouseCmpId":$("#warehouseCmpId").val(),
					"warehouseCmpName":$("#warehouseCmpName").val(),
					"warehouseCmpAddress":$("#warehouseCmpAddress").val(),
					"goodsListStr":$("#goodsListStr").val(),
					"buyerUserId":$("#buyerUserId").val(),
					"buyerUserName":$("#buyerUserName").val()
					
					},
		        function(v){
		    		if(v.result == 'success'){
							Hundsun.PopUtil.alert({
								msg:'本次入库申请操作成功!',
								autohide : true,
								width:350,
								timeout:800,
								callback :function(){
									/*var contractNo = $("#contractNo").val();
									var buyerCompanyName = $("#buyerCompanyName").val();
									var startCreateDate = $("#startCreateDate").val();
									var endCreateDate = $("#endCreateDate").val();
									var status = $("#status").val();
									var currentPage = $("#currentPage").val();*/
									//Hundsun.UrlUtil.redirect(appServer + '/contract/agent/list.htm?contractNo=' + contractNo + '&buyerCompanyName=' + buyerCompanyName + '&startCreateDate=' + startCreateDate + '&endCreateDate=' + endCreateDate + '&status=' + status + '&currentPage=' + currentPage );
									
									location.href = appServer + "/contract/agent/enterWarhourse.htm?contractId="+ $("#contractId").val()+"&startCreateDate="
									+ $("#startCreateDate").val() + "&endCreateDate="
									+ $("#endCreateDate").val() + "&buyerCompanyName="
									+ $("#buyerCompanyName").val() + "&contractNo="
									+ $("#contractNo").val() + "&status=" + $("#status").val()
									+ "&currentPage=" + $("#currentPage").val();
								}
							})
					 }else{
						 Hundsun.PopUtil.alert({
								msg:v.msg,
								width:450,
								timeout:800,
								type:'warn'
							})
							_msg.hide();
					 }
				},
				'json'
		    );
		  })
	
}


