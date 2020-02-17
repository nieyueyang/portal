$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'po/vendor/queryForPage',
        datatype: "json",
        colModel: [
			{ label: 'ID', name: 'id', index: "id", width: 45, key: true,hidden: true },
            { label: '供应商编码', name: 'vendorCode', index: "vendor_code", width: 45 },
			{ label: '供应商名称', name: 'vendorName',index:"vendor_name", width: 75 },
            { label: '供应商简称', name: 'simpleName',index:"simple_name", width: 75 },
            { label: '供应商地址', name: 'address',index:"address", width: 75 },
            { label: '联系人', name: 'contact',index:"contact", width: 75 },
            { label: '联系电话', name: 'telephone',index:"telephone", width: 75 },
			{ label: '状态', name: 'status', width: 60, formatter: function(value, options, row){
				return value === 0 ?
					'<span class="label label-success">正常</span>' :
					'<span class="label label-danger">禁用</span>';
			}},
            { label: '状态', name: 'status', width: 75,hidden: true },
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
            vendorName: null
        },
        showList: true,
        title:null,
        vendor:{
            id:null,
            vendorCode:null,
            vendorName:null,
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
            vm.vendor = {id:null,vendorCode:null,vendorName:null,status:0};
            $("#vendorCode").attr("ly",false);
        },
        update: function () {
            vm.vendor = getSelectedOneRow();
            if (vm.vendor == null){
                vm.vendor = {};
                return;
            }

            vm.showList = false;
            vm.title = "修改";
            $("#vendorCode").attr("readOnly","true");

        },
        del: function () {
            var ids = getSelectedRows();
            if(ids == null){
                return ;
            }

            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "DELETE",
                    url: baseURL + "po/vendor",
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
            if (vm.vendor.id == null){
                type = "POST"
            }else{
                type = "PUT"
            }
            vm.vendor.createTime = null;
            $.ajax({
                type: type,
                url: baseURL + "po/vendor",
                contentType: "application/json",
                data: JSON.stringify(vm.vendor),
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
                postData:{'vendorName': vm.params.vendorName},
                page:page
            }).trigger("reloadGrid");
        }
    }
});