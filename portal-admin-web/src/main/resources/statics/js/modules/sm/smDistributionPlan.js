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

var vm = new Vue({
    el:'#rrapp',
    data:{
        params:{
            materialDescription: null
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
        add: function(){
            vm.showList = false;
            vm.title = "新增";
            vm.distributionPlan = {id:null,materialId:null,materialCode:null,province:"河北省",city:"城市",county:"隆化县"};
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
                        vm.distributionPlan.materialId = data.id;
                        vm.distributionPlan.materialCode = data.materialCode;
                        vm.distributionPlan.materialDescription = data.description;
                        layer.close(index);
                    }
                }
            });

        },
        update: function () {
            vm.distributionPlan = getSelectedOneRow();
            if (vm.distributionPlan !=null){
                vm.showList = false;
                vm.title = "修改";
            }else{
                vm.distributionPlan = {};
            }
        },
        del: function () {
            var ids = getSelectedRows();
            if(ids == null){
                return ;
            }

            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "DELETE",
                    url: baseURL + "sm/distribution",
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
            if (vm.distributionPlan.id == null){
                type = "POST"
            }else{
                type = "PUT"
            }
            vm.distributionPlan.createTime = null;
            $.ajax({
                type: type,
                url: baseURL + "sm/distribution",
                contentType: "application/json",
                data: JSON.stringify(vm.distributionPlan),
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
                postData:{'materialDescription': vm.params.materialDescription},
                page:page
            }).trigger("reloadGrid");
        }
    }
});