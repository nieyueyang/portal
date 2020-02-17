<#macro layout>

<div class="content-wrapper">
    <section class="content-header">
        <ol class="breadcrumb" id="nav_title" style="position:static;float:none;">
            <li class="active"><i class="fa fa-home" style="font-size:20px;position:relative;top:2px;left:-3px;"></i> &nbsp; 首页</li>
            <li class="active">{{navTitle}}</li>
        </ol>
    </section>


    <div id ="content" class="content" style="background:#fff;">
        <#-- 在这里嵌入main content -->
        <#nested>
    </div>

</div>

</#macro>