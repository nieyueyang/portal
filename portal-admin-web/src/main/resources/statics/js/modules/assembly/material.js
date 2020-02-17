$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'inv/material/queryForPage',
        datatype: "json",
        colModel: [
            { label: 'ID', name: 'id', index: "id", width: 45, key: true,hidden: true },
            { label: '物料编码', name: 'materialCode', index: "material_code", width: 150 },
            { label: '物料描述', name: 'description',index: "description", width: 250 },
            { label: '大类', name: 'materialCategory',index: "material_category", width: 100,hidden: true },
            { label: '大类', name: 'materialCategoryName',index: "material_category_name", width: 100 },
            { label: '小类', name: 'smallCategory',index: "small_category", width: 100,hidden: true },
            { label: '小类', name: 'smallCategoryName',index: "small_category_name", width: 100 },
            { label: '计量单位ID', name: 'unitId',index: "unit_id", width: 75,hidden:true },
            { label: '计量单位', name: 'unitName',index: "unit_name", width: 100 },
            { label: '规格', name: 'specs',index: "specs", width: 150 },
            { label: '型号', name: 'model',index: "model", width: 150 },
            { label: '成本类型', name: 'costType', width: 120, formatter: function(value, options, row){
                    return value === 0 ?
                        '<span>实际成本</span>' :
                        '<span>加权平均价</span>';
                }},
            { label: '成本类型', name: 'costType',sortable: false, width: 75,hidden: true},
            { label: '状态', name: 'status', width: 60, formatter: function(value, options, row){
                    return value === 0 ?
                        '<span class="label label-success">正常</span>' :
                        '<span class="label label-danger">禁用</span>';
            }},
            { label: '状态', name: 'status', width: 75,hidden: true }
        ],
        viewrecords: true,
        height: 200,
        rowNum: 10,
        rowList : [10,20,50,100],
        rownumbers: true,
        rownumWidth: 25,
        shrinkToFit:false,
        autoScroll: true,
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
    vm.itemMaterial = getSelectedOneRow();
    if (vm.itemMaterial !=null){
        vm.itemMaterial.materialdescription = vm.itemMaterial.description;
        vm.itemMaterial.materialId = vm.itemMaterial.id;
        if (vm.itemMaterial.costType == 0){
            vm.itemMaterial.costTypeName = "实际成本";
        }else if(vm.itemMaterial.costType == 1){
            vm.itemMaterial.costTypeName = "加权平均价";
        }
    }
    return vm.itemMaterial;
}

var vm = new Vue({
    el:'#rrapp',
    data:{
        params:{
            description: null
        },
        showList: true,
        title:null,
        itemMaterial:{
            id:null,
            materialCode:null,
            description:null,
            materialCategory:null,
            materialCategoryName:null,
            smallCategory:null,
            smallCategoryName:null,
            status:0
        },
    },
    methods: {
        query: function () {
            vm.reload();
        },
        reload: function () {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'description': vm.params.description,'status': "0"},
                page:page
            }).trigger("reloadGrid");
        }
    }
});