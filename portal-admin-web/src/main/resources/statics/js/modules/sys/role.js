$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/role/queryForPage',
        datatype: "json",
        colModel: [
            { label: '角色ID', name: 'id', index: "id", width: 45, hidden : true,key: true },
            { label: '角色编码', name: 'roleCode', index: "role_code", width: 75 },
            { label: '角色名称', name: 'roleName', index: "role_name", width: 75 },
            { label: '备注', name: 'remark', width: 100 },
            { label: '创建人', name: 'createUserName', index: "create_user_name",sortable: false, width: 75 },
            { label: '创建时间', name: 'createTime', index: "create_time", width: 80 ,formatter:"date",formatoptions:{newformat:"Y-m-d"}}
        ],
        viewrecords: true,
        height: 340,
        rowNum: 10,
        rowList : [10,20,50,100],
        rownumbers: true,
        //rownumWidth: 25,
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "data.list",
            page: "data.pageNum",
            total: "data.pages",
            records: "data.total"
        },
        // prmNames : {
        //     page:"page",
        //     rows:"limit",
        //     order: "order"
        // },
        gridComplete:function(){
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        }
    });
});

//菜单树
var menu_ztree;
var menu_setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url:"nourl"
        }
    },
    check:{
        enable:true,
        nocheckInherit:true
    }
};

//部门结构树
var dept_ztree;
var dept_setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url:"nourl"
        }
    }
};

//数据树
var data_ztree;
var data_setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url:"nourl"
        }
    },
    check:{
        enable:true,
        nocheckInherit:true,
        chkboxType:{ "Y" : "", "N" : "" }
    }
};

var vm = new Vue({
    el:'#rrapp',
    data:{
        q:{
            roleName: null
        },
        showList: true,
        showAuthority: true,
        title:null,
        role:{
            deptId:null,
            deptName:null
        }
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function(){
            vm.showList = false;
            vm.showAuthority = true;
            vm.title = "新增";
            vm.role = {deptName:null, deptId:null};
            //vm.getMenuTree(null);

            //vm.getDept();

            //vm.getDataTree();
        },
        update: function () {
            var roleId = getSelectedRow();
            if(roleId == null){
                return ;
            }

            vm.showList = false;
            vm.showAuthority = false;
            vm.title = "修改";
            //vm.getDataTree();
            vm.getMenuTree(roleId);

            //vm.getDept();
        },
        del: function () {
            var roleIds = getSelectedRows();
            if(roleIds == null){
                return ;
            }

            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "DELETE",
                    url: baseURL + "sys/role/delete",
                    contentType: "application/json",
                    data: JSON.stringify(roleIds),
                    success: function(result){
                        if(result.code == 200){
                            alert('操作成功', function(){
                                vm.reload();
                            });
                        }
                    }
                });
            });
        },
        getRole: function(roleId){
            $.get(baseURL + "sys/role/info/"+roleId, function(result){
                vm.role = result.data;
                //勾选角色所拥有的菜单
                var menuIds = vm.role.menuIdList;
                for(var i=0; i<menuIds.length; i++) {
                    var node = menu_ztree.getNodeByParam("id", menuIds[i]);
                    menu_ztree.checkNode(node, true, false);
                }
            });
        },
        saveOrUpdate: function () {
            var url;
            if (vm.role.id == null){
                url = "sys/role/save";
            }else{
                //获取选择的菜单
                var nodes = menu_ztree.getCheckedNodes(true);
                var menuIdList = new Array();
                for(var i=0; i<nodes.length; i++) {
                    menuIdList.push(nodes[i].id);
                }
                vm.role.menuIdList = menuIdList;
                url = "sys/role/update";
            }

           // var url = vm.role.id == null ? "sys/role/save" : "sys/role/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.role),
                success: function(result){
                    if(result.code === 200){
                        alert(result.msg, function(){
                            vm.reload();
                        });
                    }
                }
            });
        },
        getMenuTree: function(roleId) {

            //加载菜单树
            $.get(baseURL + "sys/menu/list", function(result){
                menu_ztree = $.fn.zTree.init($("#menuTree"), menu_setting, result.data);
                //展开所有节点
                menu_ztree.expandAll(true);
                if(roleId != null){
                    vm.getRole(roleId);
                }
            });
        },
        getDataTree: function(roleId) {
            //加载菜单树
            $.get(baseURL + "sys/dept/list", function(r){
                data_ztree = $.fn.zTree.init($("#dataTree"), data_setting, r);
                //展开所有节点
                data_ztree.expandAll(true);
            });
        },
        getDept: function(){
            //加载部门树
            $.get(baseURL + "sys/dept/list", function(r){
                dept_ztree = $.fn.zTree.init($("#deptTree"), dept_setting, r);
                var node = dept_ztree.getNodeByParam("deptId", vm.role.deptId);
                if(node != null){
                    dept_ztree.selectNode(node);

                    vm.role.deptName = node.name;
                }
            })
        },
        deptTree: function(){
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择部门",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#deptLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = dept_ztree.getSelectedNodes();
                    //选择上级部门
                    vm.role.deptId = node[0].deptId;
                    vm.role.deptName = node[0].name;

                    layer.close(index);
                }
            });
        },
        reload: function () {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'roleName': vm.q.roleName},
                page:page
            }).trigger("reloadGrid");
        }
    }
});