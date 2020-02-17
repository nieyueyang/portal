$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/user/queryForPage',
        datatype: "json",
        colModel: [
			{ label: '用户ID', name: 'id', index: "id", width: 45, key: true },
            { label: '账户', name: 'account', index: "account", width: 45 },
			{ label: '用户名', name: 'name', width: 75 },
            { label: '所属部门', name: 'deptName',index: "dept_name", sortable: true, width: 75 },
			{ label: '邮箱', name: 'email', width: 90 },
			{ label: '手机号', name: 'mobile', width: 100 },
			{ label: '状态', name: 'status', width: 60, formatter: function(value, options, row){
				return value === 0 ?
					'<span class="label label-success">正常</span>' :
					'<span class="label label-danger">禁用</span>';
			}},
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
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            name: "deptName",
            url:"nourl"
        },
        callback: {
            
        }
    }
};
var ztree;

var vm = new Vue({
    el:'#rrapp',
    data:{
        q:{
            name: null
        },
        showList: true,
        showRoleList: true,
        title:null,
        roleList:{},
        user:{
            status:0,
            id:null,
            deptId:null,
            deptName:null,
            roleIdList:[]
        }
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function(){
            vm.showList = false;
            vm.showRoleList = true;
            vm.title = "新增";
            vm.roleList = {};
            vm.user = {deptId:null,deptName:null, id:null, status:0, roleIdList:[]};
            //获取角色信息
            //this.getRoleList();
            vm.getDept();
        },
        getDept: function(){
            //加载部门树
            $.get(baseURL + "sys/dept/list", function(result){
                ztree = $.fn.zTree.init($("#deptTree"), setting, result.data);
                var node = ztree.getNodeByParam("id", vm.user.deptId);
                if(node != null){
                    ztree.selectNode(node);
                    vm.user.deptName = node.deptName;
                }
            })
        },
        update: function () {
            var userId = getSelectedRow();
            if(userId == null){
                return ;
            }

            vm.showList = false;
            vm.showRoleList = false;
            vm.title = "修改";

            vm.getUser(userId);


        },
        permissions: function () {
            var userId = getSelectedRow();
            if(userId == null){
                return ;
            }

            window.location.href=baseURL+"sys/permissions/index/"+userId;
        },
        del: function () {
            var userIds = getSelectedRows();
            if(userIds == null){
                return ;
            }

            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "DELETE",
                    url: baseURL + "sys/user/delete",
                    contentType: "application/json",
                    data: JSON.stringify(userIds),
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
            var url = vm.user.id == null ? "sys/user/save" : "sys/user/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.user),
                success: function(result){
                    if(result.code === 200){
                        alert(result.msg, function(){
                            vm.reload();
                        });
                    }
                }
            });
        },
        getUser: function(userId){
            $.get(baseURL + "sys/user/"+userId, function(result){
                vm.user = result.data;
                vm.getDept();
                //获取角色信息
                vm.getRoleList();
            });
        },
        getRoleList: function(){
            $.get(baseURL + "sys/role/list", function(result){
                vm.roleList = result.data;
                for (var i=0; i < vm.user.roleIdList.length; i++ ){
                    $("vm.user.roleIdList.id").prop("checked",true);
                }
            });
        },
        deptTree: function(){
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择部门",
                area: ['300px', '350px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#deptLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    //选择上级部门
                    vm.user.deptId = node[0].id;
                    vm.user.deptName = node[0].deptName;

                    layer.close(index);
                }
            });
        },
        reload: function () {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'name': vm.q.name},
                page:page
            }).trigger("reloadGrid");
        }
    }
});