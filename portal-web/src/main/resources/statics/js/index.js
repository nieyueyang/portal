var baseURL = "localhost:8080/portal";

var vm = new Vue({
    el:'#app',
    data:{
        groupNewList: [],
        countryPolicyList:[],
        groupPolicyList:[],
        marketAnalysisList:[],
        src: "",
    },
    methods: {
        //集团要闻
        getGroupNewList: function (event) {
            $.getJSON("../homePage/queryGroupNews?modularName=" + "新闻中心-集团要闻" + "&_" +$.now(), function(result){
                vm.groupNewList = result.data;
            });
        },

        //营销政策-国家政策
        getCountryPolicyList: function () {
            $.getJSON("../homePage/queryGroupNews?modularName=" + "营销政策-国家政策" + "&_" +$.now(), function(result){
                vm.countryPolicyList = result.data;
            });
        },

        //营销政策-集团政策
        getGroupPolicyList: function () {
            $.getJSON("../homePage/queryGroupNews?modularName=" + "营销政策-集团政策" + "&_" +$.now(), function(result){
                vm.groupPolicyList = result.data;
            });
        },

        //营销政策-市场分析
        getMarketAnalysisList: function () {
            $.getJSON("../homePage/queryGroupNews?modularName=" + "营销政策-市场分析" + "&_" +$.now(), function(result){
                vm.marketAnalysisList = result.data;
            });
        }



    },
    mounted:function(){
        this.getGroupNewList();
        this.getCountryPolicyList();
        this.getGroupPolicyList();
        this.getMarketAnalysisList();
    }

});


$(function(){
    //导航下拉
    $(".index_nav ul li").hover(
        function(){
            $(this).has("ol").children("ol").show();
        },
        function(){
            $(this).has("ol").children("ol").hide();
        }
    )

    $(".ceng2_tab li").click(function(){
        $(this).addClass("hover").siblings("li").removeClass("hover");
        var index=$(this).index();
        $(".ceng2_sj ul").eq(index).show().siblings("ul").hide();
        selectH()
    })
    $(".ceng2_sj").find("li").click(
        function(){
            $(this).siblings("li").removeClass("hover");
            $(this).parent("ul").find("img").each(function(){
                $(this).next().removeClass("fb");
                var src=$(this).attr("src");
                if(src.indexOf("-zxsj")!="-1"){
                    src=src.replace(/-zxsj.png/,".png");
                    $(this).attr("src",src);
                }
            })
            var src=$(this).find("img").attr("src");
            src=src.replace(/.png/,"-zxsj.png");
            $(this).find("img").attr("src",src);
            $(this).find("p").addClass("fb");
            $(this).addClass("hover");
            selectH();
        }
    )

    $(".zhengce_tab li").click(function(){
        $(this).addClass("hover").siblings("li").removeClass("hover")
        $(this).parent("ul").find("img").each(function(){
            var src=$(this).attr("src");
            if(src.indexOf("-zxsj")!="-1"){
                src=src.replace(/-zxsj.png/,".png");
                $(this).attr("src",src);
            }
        })
        var src=$(this).find("img").attr("src");
        src=src.replace(/.png/,"-zxsj.png");
        $(this).find("img").attr("src",src);
        var index=$(this).index()
        $(".zhengce").eq(index).show().siblings(".zhengce").hide()
    })
    //河钢产品
    $(".p-types li").click(function(){
        $(this).addClass("hover").siblings("li").removeClass("hover")
        $(".p-types li p").removeClass("fb");
        $(this).parent("ul").find("img").each(function(){
            var src=$(this).attr("src");
            if(src.indexOf("-zxsj")!="-1"){
                src=src.replace(/-zxsj.png/,".png");
                $(this).attr("src",src);
            }
        })
        var src=$(this).find("img").attr("src");
        src=src.replace(/.png/,"-zxsj.png");
        $(this).find("img").attr("src",src);
        $(this).find("p").addClass("fb");
        var index=$(this).index();
        $(".p-jieshao").eq(index).show().siblings(".p-jieshao").hide()
    })

    $(".t-h5.hand").toggle(
        function(){
            var src=$(this).find("img").attr("src");
            src=src.replace(/.png/,"_1.png");
            $(this).find("img").attr("src",src);
            $(this).next("div").show();
        },
        function(){
            var src=$(this).find("img").attr("src");
            if(src.indexOf("_1")!="-1"){
                src=src.replace(/_1.png/,".png");
                $(this).find("img").attr("src",src);
            }
            $(this).next("div").hide();
        }
    )

    //关于我们
    $(".ceng6_con .tab li").click(function(){
        var index= $(this).index();
        $(this).addClass("hover").siblings().removeClass("hover");
        $(".ceng6_con .tab_con").eq(index).show().siblings(".ceng6_con .tab_con").hide();
    });

    //判断是否向下滚动
    if (vm.src != ""){
        debugger
        $('html,body').animate({scrollTop: vm.src}, 1000);
    }
})
function xs(){
    $("#scjkIframe0").attr("src",$("#scjk0").val());
}
$(function(){
    $(".prolist_con ul").css("width",document.documentElement.clientWidth)
})

$(function(){
    //返回顶部
    $('#go-top').click(function(){
        $('html,body').animate({scrollTop: '0px'}, 1000);
    });
})




