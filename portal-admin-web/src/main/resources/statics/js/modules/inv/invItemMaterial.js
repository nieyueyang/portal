$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'inv/material/queryForPage',
        datatype: "json",
        colModel: [
			{ label: 'ID', name: 'id', index: "id", width: 45, key: true,hidden: true },
            { label: '物料编码', name: 'materialCode', index: "material_code", width: 150 },
			{ label: '物料描述', name: 'description',index: "description", width: 250 },
            { label: '大类', name: 'materialCategory',index: "material_category", width: 100 },
            { label: '大类', name: 'materialCategoryName',index: "material_category_name", width: 100 },
            { label: '小类', name: 'smallCategory',index: "small_category", width: 100 },
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
            { label: '状态', name: 'status', width: 75,hidden: true },
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

var setting = {
    data: {
        key: {
            name: "categoryName",
            url:"nourl"
        },
        callback: {

        }
    }
};

var unitSetting = {
    data: {
        key: {
            name: "unitName",
            url:"nourl"
        },
        callback: {

        }
    }
};

var ztree;

var ztreeSmallCategory;

var ztreeUnit;

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
        materialCategory:{
            id:null
        },
        categoryChange:{
            materialCategory:null,
        }
    },
    methods: {
        getCategory: function(){
            //加载大类
            $.get(baseURL + "inv/category/queryForLsit",{ categoryType:"0"}, function(result){
                ztree = $.fn.zTree.init($("#categoryTree"), setting, result.data);
            })
        },
        categoryTree: function(){
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择大类",
                area: ['300px', '350px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#categoryLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    vm.categoryChange.materialCategory = vm.itemMaterial.materialCategory;
                    var node = ztree.getSelectedNodes();
                    //选择大类
                    vm.itemMaterial.materialCategory = node[0].categoryCode;
                    vm.itemMaterial.materialCategoryName = node[0].categoryName;
                    if (vm.categoryChange.materialCategory != vm.itemMaterial.materialCategory){
                        vm.itemMaterial.smallCategory = null;
                        vm.itemMaterial.smallCategoryName = null;
                    }
                    vm.materialCategory.parentId = node[0].id
                    vm.getSmallCategory();
                    vm.$forceUpdate();
                    layer.close(index);
                }
            });
        },
        getSmallCategory: function(){
            if (vm.materialCategory.parentId == null){
                alert("请先选择大类");
                return;
            }
            //加载小类
            $.get(baseURL + "inv/category/queryForLsit/"+vm.materialCategory.parentId, function(result){
                ztreeSmallCategory = $.fn.zTree.init($("#smallCategoryTree"), setting, result.data);
            })
        },
        smallCategoryTree: function(){
            if (vm.materialCategory.parentId == null){
                alert("请先选择大类");
                return;
            }
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择大类",
                area: ['300px', '350px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#smallCategoryLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztreeSmallCategory.getSelectedNodes();
                    //选择小类
                    vm.itemMaterial.smallCategory = node[0].categoryCode;
                    vm.itemMaterial.smallCategoryName = node[0].categoryName;
                    vm.$forceUpdate();
                    layer.close(index);
                }
            });
        },

        getUnit: function(){
            //加载大类
            $.get(baseURL + "inv/unit/queryForList", function(result){
                ztreeUnit = $.fn.zTree.init($("#unitTree"), unitSetting, result.data);
            })
        },

        unitTree: function(){
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择大类",
                area: ['300px', '350px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#unitLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztreeUnit.getSelectedNodes();
                    //选择大类
                    vm.itemMaterial.unitId = node[0].id;
                    vm.itemMaterial.unitName = node[0].unitName;
                    vm.$forceUpdate();
                    layer.close(index);
                }
            });
        },

        query: function () {
            vm.reload();
        },
        add: function(){
            vm.showList = false;
            vm.title = "新增";
            vm.itemMaterial = {id:null,materialCode:null,description:null, status:0};
            vm.materialCategory = {id:null,parentId:null,materialCategory:null,materialCategoryName:null};
            $("#costType").prop('disabled',false);
            vm.getCategory();
            vm.getUnit();

        },
        update: function () {
            vm.itemMaterial = getSelectedOneRow();
            vm.showList = false;
            vm.title = "修改";
            $("#costType").prop('disabled',true);
            vm.getCategory();
            vm.getUnit();
        },
        del: function () {
            var ids = getSelectedRows();
            if(ids == null){
                return ;
            }

            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "DELETE",
                    url: baseURL + "inv/material",
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
            if (vm.itemMaterial.id == null){
                type = "POST"
            }else{
                type = "PUT"
            }
            vm.itemMaterial.createTime = null;
            $.ajax({
                type: type,
                url: baseURL + "inv/material",
                contentType: "application/json",
                data: JSON.stringify(vm.itemMaterial),
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
                postData:{'description': vm.params.description},
                page:page
            }).trigger("reloadGrid");
        }
    }
});