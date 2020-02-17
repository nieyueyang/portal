var _msg;
/**
 * 单笔 首付款支付
 */
function orderA(orderFormId, obj) {
    Boxy.confirm("确定要支付吗?",
    function() {
        _msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
        orderDoOne(orderFormId, obj);
    });
}

// 单笔支付
function orderDoOne(orderFormId, obj) {
    var cartJsonList = []; // 订单列表
    var parE = $(obj).parent().parent();
    var cartJson = {
        "id": orderFormId,
        "projectId": parE.find("input[name='tradeId']").val(),
        // 挂牌ID
        "price": parE.find("input[name='price']").val(),
        // 挂牌单价
        "totlePrice": parE.find("input[name='totlePrice']").val(),
        // 订单金额
        "totalWeight": parE.find("input[name='totalWeight']").val(),
        // 订单重量
        "companyId": parE.find("input[name='companyId']").val(),
        // 卖家单位ID
        "warehouseCmpName": parE.find("input[name='warehouseCmpName']").val(),
        // 卖家仓库
        "agentDepositeRate": parE.find("input[name='agentDepositeRate']").val(),
        // 保证金比例
        "pricefallDepositeRate": parE.find("input[name='pricefallDepositeRate']").val(),
        // 跌价保证金
        "agentContractDeadline": parE.find("input[name='agentContractDeadline']").val(),
        // 合同期限
        "overduePayRate":parE.find("input[name='overduePayRate']").val(),
        //逾期违约金
        "sellerUserId":parE.find("input[name='sellerUserId']").val(),
        //卖家会员ID
        "firstPayPaytype":parE.find("input[name='firstPayPaytype']").val()
        //首付款支付方式
    }
    cartJsonList.push(cartJson);
    var cartListStr = JSON.stringify(cartJsonList);
    $("#orderJsonListStr").val(cartListStr);
    $("#orderFrom").submit();
}

/**
 * 合并订单生成合同 首付款支付
 */
function orderC() {
    Boxy.confirm("同代理人、同交收仓库、同保证金比例<br/>同跌价保证金比例、同最长垫款期限<br/>同逾期违约金比例、同代理费率以及同首付款支付方式<br/>会合并成一个合同,确定要支付吗？",
    function() {
        _msg = Hundsun.PopUtil.loading(); // 渲染提示"系统正在处理请稍候"
        orderDo();
    });
}

function orderDo() {
    var cartJsonList = []; // 订单列表
    var selNum = 0;
    // var isNeedUkey = false; //是否需要ukey验证，如果有产能摘牌时，需要ukey验证
    $("input[name='input2']:checked").each(function(i, o) {
        selNum++;
        var parE = $(this).parent();
        var cartJson = {
            "id": o.value,
            "projectId": parE.find("input[name='tradeId']").val(),
            // 挂牌ID
            "price": parE.find("input[name='price']").val(),
            // 挂牌单价
            "totlePrice": parE.find("input[name='totlePrice']").val(),
            // 订单金额
            "totalWeight": parE.find("input[name='totalWeight']").val(),
            // 订单重量
            "companyId": parE.find("input[name='companyId']").val(),
            // 卖家单位ID
            "warehouseCmpName": parE.find("input[name='warehouseCmpName']").val(),
            // 卖家仓库
            "agentDepositeRate": parE.find("input[name='agentDepositeRate']").val(),
            // 保证金比例
            "pricefallDepositeRate": parE.find("input[name='pricefallDepositeRate']").val(),
            // 跌价保证金
            "agentContractDeadline": parE.find("input[name='agentContractDeadline']").val(),
            // 合同期限
             "overduePayRate":parE.find("input[name='overduePayRate']").val(),
       	 //逾期违约金
             "sellerUserId":parE.find("input[name='sellerUserId']").val(),
        //卖家会员ID
             "firstPayPaytype":parE.find("input[name='firstPayPaytype']").val()
        //首付款支付方式
        }
        cartJsonList.push(cartJson);
    });

    if (selNum == 0) {
        if (_msg) {
            _msg.hide();
        }
        Hundsun.PopUtil.alert({
            msg: "请先选择下单商品!",
            width: 200,
            timeout: 800,
            type: 'warn'
        })
        return;

    } else {
        var cartListStr = JSON.stringify(cartJsonList);
		    
        $("#orderJsonListStr").val(cartListStr);
       $("#orderFrom").submit();
    }
}