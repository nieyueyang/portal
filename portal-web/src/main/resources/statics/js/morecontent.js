var vm = new Vue({
    el:'#app',
    data:{
        title: "",
        subhead:"",
        newsCenterTitleList:["集团要闻","公司新闻","销售动态"],
        policyTitleList: ["国家政策","集团政策","市场分析"],
        path:"",
        subheads:[],
        contentList:[]

    },
    methods: {
        init:function(){
            var name = getQueryString("name");
            var params = name.split("-");
            this.title = params[0];
            this.subhead = params[1];
            this.path = "首页 > " + params[0] + " > " + params[1];

            if(params[0] == "新闻中心"){
                this.subheads = this.newsCenterTitleList;
            }else if(params[0] == "营销政策"){
                this.subheads = this.policyTitleList;
            }

            for(var item in this.subheads){
                if (this.subheads[item] === this.subhead){
                    $("#child").append("<li class='hover'><a href='../homePage/morecontent.html?name="+this.title+ "-" + this.subheads[item] +"'>"+ this.subheads[item] +"</a></li>");
                }else{
                    $("#child").append("<li><a href='../homePage/morecontent.html?name="+this.title+ "-" + this.subheads[item] +"'>"+ this.subheads[item] +"</a></li>");
                }
            }

            $.getJSON("../homePage/queryGroupNews?uploadProject=" + name + "&_" +$.now(), function(result){
                vm.contentList = result.data;
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





