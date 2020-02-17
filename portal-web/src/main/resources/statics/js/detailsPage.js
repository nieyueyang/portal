var vm = new Vue({
    el:'#app',
    data:{
        content: {
            title:"",
            operator:"",
            uploadTime:"",
            views:""
        }

    },
    methods: {
        init:function(){
            var id = getQueryString("id");
            this.path = "首页 > " ;

            $.getJSON("../homePage/queryFileManagerById?id=" + id + "&_" +$.now(), function(result){
                vm.content = result.data;
            });

        }



    },
    mounted:function(){
        this.init();
    }

});

//解析参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if ( r != null ){
        return decodeURI(r[2]);
    }else{
        return null;
    }
}





