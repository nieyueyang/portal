var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            name: "categoryName",
            url:"nourl"
        }
    }
};
var ztree;

var vm = new Vue({
    el:'#rrapp',
    data:{
        showList: true,
        showSelect: false,
        title: null,
        readonle:false,
        category:{
            parentName:null,
            parentId:0,
            orderNum:0
        }
    },
    methods: {
        getCategory: function(){
            //加载大类
            $.get(baseURL + "inv/category/queryForLsit",{ categoryType:"0"}, function(result){
                ztree = $.fn.zTree.init($("#categoryTree"), setting, result.data);
                var node = ztree.getNodeByParam("id", vm.category.parentId);
                ztree.selectNode(node);
                if (node != null){
                    vm.category.parentName = node.categoryName;
                }
            })
        },
        add: function(){
            vm.showList = false;
            vm.title = "新增";
            vm.category = {parentName:null,parentId:0,status:0};
            $("#categoryCode").attr("readOnly",false);
            vm.getCategory();
        },
        update: function () {

            var categoryId = getCategoryId();
            if(categoryId == null){
                return ;
            }
            $("#categoryCode").attr("readOnly","true");
            $.get(baseURL + "inv/category/info/"+categoryId, function(result){
                vm.showList = false;
                vm.title = "修改";
                vm.category = result.data;
                if (vm.category.categoryType ==1){
                    vm.showSelect = true;
                    // var node = ztree.getNodeByParam("id", vm.category.parentId);
                    // ztree.selectNode(node);
                    // if (node != null){
                    //     vm.category.parentName = node.categoryName;
                    // }
                }else{
                    vm.showSelect = false;
                }
                vm.getCategory();
            });
        },
        changeSelect: function(val){
            vm.category.categoryType = val;
            if (val == 1){
                vm.showSelect = true;
                var node = ztree.getNodeByParam("id", vm.category.parentId);
                ztree.selectNode(node);
                if (node != null){
                    vm.category.parentName = node.categoryName;
                }
            }else{
                vm.showSelect = false;
            }
        },
        del: function () {
            var categoryId = getCategoryId();
            if(categoryId == null){
                return ;
            }
            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "DELETE",
                    url: baseURL + "inv/category/" + categoryId,
                    success: function(result){
                        if(result.code === 200){
                            alert(result.msg, function(){
                                vm.reload();
                            });
                        }
                    }
                });
            });
        },
        saveOrUpdate: function (event) {
            var type = vm.category.id == null ? "POST" : "PUT";
            $.ajax({
                type: type,
                url: baseURL + "inv/category",
                contentType: "application/json",
                data: JSON.stringify(vm.category),
                success: function(result){
                    if(result.code === 200){
                        alert(result.msg, function(){
                            vm.reload();
                        });
                    }
                }
            });
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
                    var node = ztree.getSelectedNodes();
                    //选择大类
                    vm.category.parentId = node[0].id;
                    vm.category.parentName = node[0].categoryName;
                    vm.$forceUpdate();
                    layer.close(index);
                }
            });
        },
        reload: function () {
            vm.showList = true;
            Category.table.refresh();
        }
    }
});

var Category = {
    id: "categoryTable",
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Category.initColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true},
        {title: '物料类别编码', field: 'categoryCode', visible: false, align: 'center', valign: 'middle', width: '80px'},
        {title: '物料类别名称', field: 'categoryName', align: 'center', valign: 'middle', sortable: true, width: '180px'}
    ]
    return columns;
};


function getCategoryId () {
    var selected = $('#categoryTable').bootstrapTreeTable('getSelections');
    if (selected.length == 0) {
        alert("请选择一条记录");
        return null;
    } else {
        return selected[0].id;
    }
}

$(function () {
    var colunms = Category.initColumn();
    var table = new TreeTable(Category.id, baseURL + "inv/category/queryForLsit", colunms);
    table.setRootCodeValue("0");
    table.setExpandColumn(1);
    table.setIdField("id");
    table.setCodeField("id");
    table.setParentCodeField("parentId");
    table.setExpandAll(false);
    table.init();
    Category.table = table;
});
