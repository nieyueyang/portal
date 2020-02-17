$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sm/distribution/queryForPage',
        datatype: "json",
        colModel: [
            { label: 'ID', name: 'id', index: "id", width: 45, key: true,hidden: true },
            { label: '物料ID', name: 'materialId', index: "material_id", width: 45,hidden: true },
            { label: '物料编码', name: 'materialCode', index: "material_code", width: 150 },
            { label: '物料描述', name: 'materialDescription',index: "material_description", width: 250 },
            { label: '年度', name: 'year',index: "year", width: 100 },
            { label: '组别', name: 'distributionGroup',index: "distribution_group", width: 100 },
            { label: '省', name: 'province',index: "province", width: 100 },
            { label: '市', name: 'city',index: "city", width: 100 },
            { label: '县', name: 'county',index: "county", width: 75,hidden:true },
            { label: '乡镇', name: 'town',index: "town", width: 100 },
            { label: '村', name: 'village',index: "village", width: 150 },
            { label: '推广任务', name: 'promotionTask',index: "promotion_task", width: 150 },
            { label: '户数', name: 'households',index: "households", width: 150 },
            { label: '应收账款', name: 'receivableAmount',index: "receivable_amount", width: 150 },
            { label: '实收账款', name: 'realityAmount',index: "reality_amount", width: 150 },
            { label: '实收账款', name: 'realityAmount',index: "reality_amount", width: 150 },
            { label: '开始日期', name: 'beginDate', index: "begin_date", width: 100,formatter:"date",formatoptions:{newformat:"Y-m-d"}},
            { label: '结束日期', name: 'endDate', index: "end_date", width: 100,formatter:"date",formatoptions:{newformat:"Y-m-d"}},
            { label: '创建人编码', name: 'createUser', width: 75,hidden: true },
            { label: '创建人', name: 'createUserName', width: 100 },
            { label: '创建时间', name: 'createTime', index: "create_time", width: 100,formatter:"date",formatoptions:{newformat:"Y-m-d"}}
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

var callbackdata = function () {
    vm.distributionPlan = getSelectedOneRow();
    if (vm.distributionPlan !=null){
        vm.distributionPlan.distributionId = vm.distributionPlan.id;
    }
    return vm.distributionPlan;
}

var vm = new Vue({
    el:'#rrapp',
    data:{
        params:{
            year: null
        },
        showList: true,
        title:null,
        distributionPlan:{
            id:null,
            materialId:null,
            materialCode:null
        }
    },
    methods: {
        query: function () {
            vm.reload();
        },
        reload: function () {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'year': vm.params.year},
                page:page
            }).trigger("reloadGrid");
        }
    }
});