$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'inv/warehouse/queryForPage',
        datatype: "json",
        colModel: [
			{ label: 'ID', name: 'id', index: "id", width: 45, key: true,hidden: true },
            { label: '库房编码', name: 'warehouseCode', index: "warehouse_code", width: 45 },
			{ label: '库房名称', name: 'warehouseName', width: 75 },
            { label: '库房类型', name: 'warehouseType', width: 120, formatter: function(value, options, row){
                    return value === 0 ?
                        '<span>采购库房</span>' :
                        '<span>产品库房</span>';
            }},
            { label: '库房类型', name: 'warehouseType', width: 120,hidden: true },
			{ label: '状态', name: 'status', width: 60, formatter: function(value, options, row){
				return value === 0 ?
					'<span class="label label-success">正常</span>' :
					'<span class="label label-danger">禁用</span>';
			}},
            { label: '状态', name: 'status', width: 75,hidden: true },
            { label: '创建人编码', name: 'createUser', width: 75,hidden: true },
            { label: '创建人', name: 'createUserName', width: 75 },
			{ label: '创建时间', name: 'createTime', index: "create_time", width: 85,formatter:"date",formatoptions:{newformat:"Y-m-d"}}
        ],
		viewrecords: true,
        height: 340,
        rowNum: 10,
		rowList : [10,20,50,100],
        rownumbers: true,
        rownumWidth: 25,
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "data.list",
            page: "data.pageNum",
            total: "data.pages",
            records: "data.total"
        },
        postData:{'isDelete': "0"},

        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
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
            warehouseName: null
        },
        showList: true,
        title:null,
        warehouse:{
            id:null,
            warehouseCode:null,
            warehouseName:null,
            status:0
        }
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function(){
            vm.showList = false;
            vm.title = "新增";
            vm.warehouse = {id:null,warehouseCode:null,warehouseName:null, status:0};
            $("#costType").removeAttr("disabled");
        },
        update: function () {
            vm.warehouse = getSelectedOneRow();
            vm.showList = false;
            vm.title = "修改";
            $("#costType").attr("disabled", "disabled");
        },
        del: function () {
            var ids = getSelectedRows();
            if(ids == null){
                return ;
            }

            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "DELETE",
                    url: baseURL + "inv/warehouse",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function(result){
                        if(result.code == 200){
                            alert(result.msg, function(){
                                vm.reload();
                            });
                        }
                    }
                });
            });
        },
        saveOrUpdate: function () {
            var type = "";
            if (vm.warehouse.id == null){
                type = "POST"
            }else{
                type = "PUT"
            }
            vm.warehouse.createTime = null;
            $.ajax({
                type: type,
                url: baseURL + "inv/warehouse",
                contentType: "application/json",
                data: JSON.stringify(vm.warehouse),
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
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'warehouseName': vm.params.warehouseName},
                page:page
            }).trigger("reloadGrid");
        }
    }
});