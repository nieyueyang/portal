$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'inv/unit/queryForPage',
        datatype: "json",
        colModel: [
			{ label: 'ID', name: 'id', index: "id", width: 45, key: true,hidden: true },
            { label: '单位编码', name: 'unitCode', index: "unitCode", width: 45 },
			{ label: '单位', name: 'unitName', width: 75 },
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
            unitName: null
        },
        showList: true,
        title:null,
        unit:{
            id:null,
            unitCode:null,
            unitName:null,
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
            vm.unit = {id:null,unitCode:null,unitName:null,status:0};
        },
        update: function () {
            vm.unit = getSelectedOneRow();
            vm.showList = false;
            vm.title = "修改";
        },
        del: function () {
            var ids = getSelectedRows();
            if(ids == null){
                return ;
            }

            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "DELETE",
                    url: baseURL + "inv/unit",
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
            if (vm.unit.id == null){
                type = "POST"
            }else{
                type = "PUT"
            }
            vm.unit.createTime = null;
            //var url = vm.unit.id == null ? "inv/unit/save" : "inv/unit/update";
            $.ajax({
                type: type,
                url: baseURL + "inv/unit",
                contentType: "application/json",
                data: JSON.stringify(vm.unit),
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
                postData:{'unitName': vm.params.unitName},
                page:page
            }).trigger("reloadGrid");
        }
    }
});