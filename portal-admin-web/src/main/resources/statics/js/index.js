//生成菜单
var menuItem = Vue.extend({
    name: 'menu-item',
    props:{item:{}},
    template:[
        '<li>',
        '	<a v-if="item.type === 0" href="javascript:;">',
        '		<i v-if="item.icon != null" :class="item.icon"></i>',
        '		<span>{{item.name}}</span>',
        '		<i class="fa fa-angle-left pull-right"></i>',
        '	</a>',
        '	<ul v-if="item.type === 0" class="treeview-menu">',
        '		<menu-item :item="item" v-for="item in item.list"></menu-item>',
        '	</ul>',

        '	<a v-if="item.type === 1 && item.parentId === 0" :href="\'#\'+item.url">',
        '		<i v-if="item.icon != null" :class="item.icon"></i>',
        '		<span>{{item.name}}</span>',
        '	</a>',

        '	<a v-if="item.type === 1 && item.parentId != 0"  :href="\'#\'+item.url" :openType ="item.openType"><i v-if="item.icon != null" :class="item.icon"></i><i v-else class="fa fa-circle-o"></i> {{item.name}}</a>',
        '</li>'
    ].join('')
});


//注册菜单组件
Vue.component('menuItem',menuItem);

var vm = new Vue({
    el:'#rrapp',
    data:{
        content:"",
        user:{},
        menuList:{},
        url:"main.html",
        password:'',
        newPassword:'',
        confirmPassword:'',
        navTitle:"控制台"
    },
    methods: {
        getMenuList: function (event) {
            $.getJSON("sys/menu/nav?_"+$.now(), function(result){
                    vm.menuList = result.data;
            });
        },
        getUser: function(){
            $.getJSON("sys/user/info?_"+$.now(), function(result){
                vm.user = result.data;
                localStorage.setItem("user",JSON.stringify(vm.user));
            });
        }
    },
    mounted:function(){
        this.getMenuList();
        this.getUser();
        route(0);
    },
    updated: function(){
        //路由
        var router = new Router();
        routerList(router, vm.menuList);
        router.start();

    }
});

function routerList(router, menuList){
    for(var key in menuList){
        var menu = menuList[key];
        if(menu.type == 0){
            routerList(router, menu.list);
        }else if(menu.type == 1){
            router.add('#'+menu.url, function() {
                var url = window.location.hash;
                vm.url = url.replace('#', '');
                var openType = $("a[href='"+url+"']").attr("openType");
                route(openType);
                //导航菜单展开
                $(".treeview-menu li").removeClass("active");
                $("a[href='"+url+"']").parents("li").addClass("active");
                $("#navTitle").html($("a[href='"+url+"']").text());
            });
        }
    }
}

function route(openType){

    if(openType === "1"){
        if(isBlank(localStorage.getItem("Authorization"))){
            //返回错误页
            parent.location.href = baseURL +  "error.html";
        }else{
            //window.history.replaceState({},"","/bbb");
            var url = window.location.href;
            var valiable = url.split("#")[0];
            window.history.pushState({},0,valiable);
            window.open(vm.url);
        }

    }else{

        $(document).ready(function () {
            $.get(vm.url,function(data){
                $("#content").html(data);
            },"text");
        });
    }

}

function updatePassword(){
    layer.open({
        type: 1,
        skin: 'layui-layer-molv',
        title: "修改密码",
        area: ['550px', '320px'],
        shadeClose: false,
        content: jQuery("#passwordLayer"),
        btn: ['修改','取消'],
        btn1: function (index) {
            if (vm.newPassword != vm.confirmPassword){
                alert("输入的两次新密码不一样，请重新输入");
                return;
            }
            var password = sha256_digest(vm.password);
            var newPassword = sha256_digest(vm.newPassword);
            var confirmPassword = sha256_digest(vm.confirmPassword);
            var data ="account="+ vm.user.account + "&password="+password+"&newPassword="+newPassword + "&confirmPassword=" +confirmPassword;
            $.ajax({
                type: "POST",
                url: "sys/user/password",
                data: data,
                dataType: "json",
                headers: {
                    "Authorization": localStorage.getItem("Authorization"),
                } ,
                success: function(result){
                    if(result.code == 200){
                        layer.close(index);
                        layer.alert(result.msg, function(index){
                            location.reload();
                        });
                    }else{
                        layer.alert(result.msg);
                    }
                }
            });
        }
    });
}

function logout(){
    localStorage.clear();
    //返回登陆页
    window.location.href = baseURL +  "login.html"
}


