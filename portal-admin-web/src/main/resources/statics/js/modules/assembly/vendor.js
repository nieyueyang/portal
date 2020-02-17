$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'po/vendor/queryForPage',
        datatype: "json",
        colModel: [
            { label: 'ID', name: 'id', index: "id", width: 45, key: true,hidden: true },
            { label: '供应商编码', name: 'vendorCode', index: "vendor_code", width: 100 },
            { label: '供应商名称', name: 'vendorName',index:"vendor_name", width: 200 },
            { label: '供应商简称', name: 'simpleName',index:"simple_name", width: 100 },
            { label: '供应商地址', name: 'address',index:"address", width: 200 },
            { label: '联系人', name: 'contact',index:"contact", width: 100 },
            { label: '联系电话', name: 'telephone',index:"telephone", width: 100 }
        ],
        viewrecords: true,
        height: 200,
        rowNum: 10,
        rowList : [10,20,50,100],
        rownumbers: true,
        rownumWidth: 25,
        //shrinkToFit:false,
        //autoScroll: true,
        autowidth:true,
        //multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "data.list",
            page: "data.pageNum",
            total: "data.pages",
            records: "data.total"
        },
        postData:{'status': "0"},
    gridComplete:function(){
            //隐藏grid底部滚动条
            //$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        }
    });
});


var callbackdata = function () {
    vm.vendor = getSelectedOneRow();
    if (vm.vendor != null){
        vm.vendor.vendorId = vm.vendor.id;
    }
    return vm.vendor;
}

var vm = new Vue({
    el:'#rrapp',
    data:{
        params:{
            vendorName: null
        },
        title:null,
        vendor:{
            id:null,
            vendorCode:null,
            vendorName:null,
            simpleName:null,
            address:null,
            contact:null,
            telephone:null
        },
    },
    methods: {
        query: function () {
            vm.reload();
        },
        reload: function () {
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'vendorName': vm.params.vendorName,'status': "0"},
                page:page
            }).trigger("reloadGrid");
        }
    }
});