$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'inv/inventory/queryForPage',
        datatype: "json",
        colModel: [
			{ label: 'ID', name: 'id', index: "id", width: 45, key: true,hidden: true },
            { label: '库房ID', name: 'warehouseId', index: "warehouse_id", width: 100,hidden:true },
            { label: '库房编码', name: 'warehouseCode', index: "warehouse_code", width: 100 },
            { label: '库房名称', name: 'warehouseName', index: "warehouse_name", width: 200 },
            { label: '物料ID', name: 'materialId', index: "material_id", width: 120,hidden:true },
            { label: '物料编码', name: 'materialCode', index: "material_code", width: 120 },
			{ label: '物料描述', name: 'materialDescription',index:"material_description", width: 200 },
            { label: '数量', name: 'quantity',index:"quantity", width: 120 },
            { label: '单价', name: 'price',index:"price", width: 120 },
            { label: '单位编码', name: 'unitId',index:"unit_id", width: 75,hidden: true },
            { label: '单位', name: 'unitName',index:"unit_name", width: 100 },
            { label: '大类编码', name: 'materialCategory',index:"material_category", width: 75,hidden: true },
            { label: '大类', name: 'materialCategoryName',index:"material_category_name", width: 100 },
            { label: '小类编码', name: 'smallCategory',index:"small_category", width: 75,hidden: true },
            { label: '小类', name: 'smallCategoryName',index:"small_category_name", width: 100 }
        ],
		viewrecords: true,
        height: 340,
        rowNum: 10,
		rowList : [10,20,50,100],
        rownumbers: true,
        rownumWidth: 25,
        shrinkToFit:false,
        autoScroll: true,
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "data.list",
            page: "data.pageNum",
            total: "data.pages",
            records: "data.total"
        },

        gridComplete:function(){
        	//隐藏grid底部滚动条
        	//$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        }
    });
});

var setting = {
    data: {
        key: {
            url:"nourl"
        },
        callback: {
            
        }
    }
};

var vm = new Vue({
    el:'#rrapp',
    data:{
        params:{
            warehouseName:null,
            materialDescription: null
        },
        showList: true,
        showWareIn: false,
        showWareOut:false,
        showVendor:false,
        showDistribution:false,
        title:null,
        inventory:{
            id:null,
            warehouseCode:null,
            warehouseName:null,
            //materialCode:null,
            //materialDescription:null
        },
        warehouseList:[],
        selected: "",
        vendor:{},
        material:{},
        inventoryOut:{},
        distributionPlan:{}

    },
    methods: {
        query: function () {
            vm.reload();
        },
        warehouselIn: function(){
            vm.showList = false;
            vm.showWareOut =false;
            vm.showWareIn = true;
            vm.title = "手工入库";
            vm.inventory = {id:null,warehouseCode:null,warehouseName:null};
            //$("#vendorCode").attr("y",false);
            $.ajax({
                type: "GET",
                url: baseURL + "inv/warehouse/list?status=0&isDelete=0",
                contentType: "application/json",
                //data: JSON.stringify(params),
                success: function(result){
                    if(result.code == 200){
                        vm.warehouseList = result.data;
                        vm.selected = vm.warehouseList[0].warehouseCode;
                        vm.inventory.warehouseId = vm.warehouseList[0].id;
                        vm.inventory.warehouseCode = vm.warehouseList[0].warehouseCode;
                        vm.inventory.warehouseName = vm.warehouseList[0].warehouseName;
                        vm.inventory.warehouseType = vm.warehouseList[0].warehouseType;
                        if (vm.inventory.warehouseType == 0){
                            vm.showVendor = true;
                        }else if (vm.inventory.warehouseType == 1){
                            vm.showVendor = false;
                        }
                    }
                }
            });
        },
        changeSelect: function(event){
            var warehouse =  document.getElementById('warehouse');
            vm.inventory.warehouseId = $("#warehouse").find("option:selected").attr("warehouseId");
            vm.inventory.warehouseCode = warehouse.options[warehouse.selectedIndex].value;
            vm.inventory.warehouseName = warehouse.options[warehouse.selectedIndex].text;
            vm.inventory.warehouseType = $("#warehouse").find("option:selected").attr("warehouseType");
            if (vm.inventory.warehouseType == 0){
                vm.showVendor = true;
            }else if (vm.inventory.warehouseType == 1){
                vm.showVendor = false;
            }
            //console.log(event.target.value);
        },
        selectVendor:function(){
            layer.open({
                type: 2,
                offset: ['10px', '20px'],
                skin: 'layui-layer-lan',
                title: "选择供应商",
                area: ['1000px', '450px'],
                shade: 0.3,
                fixed:true,
                resize:false,
                shadeClose: false,
                content: jQuery("#layer"),
                content: ['../assembly/vendor.html'],
                btn: ['确定', '取消'],
                yes: function (index) {
                    var data = window["layui-layer-iframe" + index].callbackdata();
                    if (data !=null){
                        vm.vendor = data;
                        layer.close(index);
                    }
                }
            });

        },
        selectMaterial:function(){
            layer.open({
                type: 2,
                offset: ['10px', '20px'],
                skin: 'layui-layer-lan',
                title: "选择物料",
                area: ['1000px', '450px'],
                shade: 0.3,
                fixed:true,
                resize:false,
                shadeClose: false,
                content: jQuery("#layer"),
                content: ['../assembly/material.html'],
                btn: ['确定', '取消'],
                yes: function (index) {
                    var data = window["layui-layer-iframe" + index].callbackdata();
                    if (data !=null){
                        vm.material = data;
                        vm.material.materialDescription = vm.material.description;
                        layer.close(index);
                    }
                }
            });

        },
        warehouselInSave: function () {
            vm.inventory = Object.assign(vm.vendor, vm.material,vm.inventory);
            if (vm.inventory.warehouseType == 0){
                vm.inventory.transactionType = 1001;
            }else if (vm.inventory.warehouseType == 1){
                vm.inventory.transactionType = 2001;
            }
            $.ajax({
                type: "POST",
                url: baseURL + "inv/inventory",
                contentType: "application/json",
                data: JSON.stringify(vm.inventory),
                success: function(result){
                    if(result.code === 200){
                        alert(result.msg, function(){
                            vm.inventory = {};
                            vm.vendor = {};
                            vm.material = {};
                            vm.reload();
                        });
                    }
                }
            });
        },
        warehouselOut: function () {
            vm.inventoryOut = getSelectedOneRow();
            if(vm.inventoryOut == null){
                vm.inventoryOut={};
                return;
            }

            $.ajax({
                type: "GET",
                url: baseURL + "inv/warehouse/" + vm.inventoryOut.warehouseId,
                contentType: "application/json",
                data: "",
                success: function(result){
                    if(result.code === 200){
                        vm.inventoryOut.warehouseType = result.data.warehouseType;
                        if (vm.inventoryOut.warehouseType == 1){
                            vm.showDistribution = true;
                        }else{
                            vm.showDistribution = false;
                        }
                        vm.inventoryOut.quantityOut = "0";
                        vm.showList = false;
                        vm.showWareOut =true;
                        vm.showWareIn = false;
                        vm.title = "手工出库";
                    }
                }
            });
        },
        selectDistribution:function(){
            layer.open({
                type: 2,
                offset: ['10px', '20px'],
                skin: 'layui-layer-lan',
                title: "选择配送计划",
                area: ['1000px', '450px'],
                shade: 0.3,
                fixed:true,
                resize:false,
                shadeClose: false,
                content: jQuery("#layer"),
                content: ['../sm/distribution.html'],
                btn: ['确定', '取消'],
                yes: function (index) {
                    var data = window["layui-layer-iframe" + index].callbackdata();
                    if (data !=null){
                        vm.distributionPlan = data;
                        layer.close(index);
                    }
                }
            });
        },
        warehouselOutSave: function () {
            var isNumber = isRealNum(vm.inventoryOut.quantityOut);
            if (isNumber ==false){
                alert("出库数量请输入数字");
                return;
            }
            if(parseFloat(vm.inventoryOut.quantityOut) <= 0){
                alert("出库数量必须大于0");
                return;
            }

            if (parseFloat(vm.inventoryOut.quantityOut) >parseFloat(vm.inventoryOut.quantity)){
                alert("出库数量不能大于库存数量");
                return
            }
            vm.inventoryOut.distributionId = vm.distributionPlan.distributionId;
            $.ajax({
                type: "PUT",
                url: baseURL + "inv/inventory",
                contentType: "application/json",
                data: JSON.stringify(vm.inventoryOut),
                success: function(result){
                    if(result.code === 200){
                        alert(result.msg, function(){
                            vm.reload();
                        });
                    }
                }
            });
        },
        reload: function () {
            vm.showList = true;
            vm.showWareOut =false;
            vm.showWareIn = false;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'warehouseName': vm.params.warehouseName,"materialDescription":vm.params.materialDescription},
                page:page
            }).trigger("reloadGrid");
        }
    }
});