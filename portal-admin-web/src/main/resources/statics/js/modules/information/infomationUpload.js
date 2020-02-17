tinymce.init({
    selector: "#txt",
    plugins: "autoresize",
    height: 500,
    // autoresize_bottom_margin: 50,
    // autoresize_max_height: 500,
    // autoresize_min_height: 350,
    // autoresize_on_init: true,
    // autoresize_overflow_padding: 50,
    menubar: true,
    toolbar_items_size: 'young',
    statusbar: true,
    branding: false,
    //elementpath: false,
    language:'zh_CN',
    plugins: [
        "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker",
        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        "table contextmenu directionality emoticons template textcolor paste fullpage textcolor codesample"
    ],

    toolbar1: "undo redo | cut copy paste | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
    toolbar2: " searchreplace | bullist numlist | outdent indent blockquote | link unlink anchor image media code codesample | inserttime preview | forecolor backcolor",
    toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | spellchecker | visualchars visualblocks nonbreaking template pagebreak restoredraft",

    style_formats: [
        {title: 'Bold text', inline: 'b'},
        {title: 'Red text', inline: 'span', styles: {color: '#ff0000'}},
        {title: 'Red header', block: 'h1', styles: {color: '#ff0000'}},
        {title: 'Example 1', inline: 'span', classes: 'example1'},
        {title: 'Example 2', inline: 'span', classes: 'example2'},
        {title: 'Table styles'},
        {title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
    ],

    templates: [
        {title: 'Test template 1', content: 'Test 1'},
        {title: 'Test template 2', content: 'Test 2'}
    ]

});

var vm = new Vue({
    el:'#app',
    data:{
        user:[],
        title:"资讯上传",
        information:{}
    },
    methods: {
        getUser: function (event) {
            this.user = JSON.parse(localStorage.getItem("user"));
            $("#txt").resize = "vertical";

        },
        submit:function(enent){
            var authorization = localStorage.getItem("Authorization");
            this.information.content =tinyMCE.activeEditor.getContent();
            debugger
            $.ajax({
                type: "POST",
                url: baseURL + "imInformation",
                contentType: "application/json",
                headers:{"Authorization":authorization},
                data: JSON.stringify(vm.information),
                success: function(result){
                    if(result.code === 200){
                        alert(result.msg);
                    }else{

                        if (result.code == 20001 || result.code ==20002 || result.code ==20003 || result.code ==20005 )
                        {
                            //返回错误页
                            parent.location.href = baseURL +  "error.html"
                        }else{
                            alert(msg);
                        }
                    }
                }
            });
        },
        close:function(enent){
            window.close();
        }

    },
    mounted:function(){
        this.getUser();
    }
});

