/**
 * Created by zhangkewen on 2014-12-25.
 */
define(function () {
    var util = {};
    function getAjaxData(module,api,my_data,succ){
        //if(("sessionStorage" in window)&&window["sessionStorage"]!=null){
        //    loginInfo = $.parseJSON(sessionStorage.getItem(projectModule+"loginInfo"));
        //}else{
        //}
        //if(!loginInfo){
        //    window.location.href="login.html";
        //}
        var def_data = {
            timestamp: new Date().getTime(),
            apiver: '1.0',
            appcode:"sht",
            module: module,
            token:token
        };
        $.extend(def_data,my_data);
        var url = urlhead+"/v1/shtadm/"+module+"/"+api+ "?params=" + encodeURIComponent(JSON.stringify(def_data));
        $.support.cors = true;
        $("body").append('<div class="window-mask temppopup" style="width: 100%; height: 100%; display: block; z-index: 9023;"><img src="images/main/common/loading.gif" style="position:absolute;left:50%;top:50%;margin-left:-110px;"></div>');
        $.ajax({
            url:url,
            crossDomain:true,
            type:'get',
            contentType:"text/plain",
            async:false,
            jsonp:'jsonCallback',
            dataType:'jsonp',
            //	data:{"params":def_data},
            success:function(data){
                if(typeof succ=="function"){
                    succ(data);
                }
                setTimeout(function(){
                    $(".temppopup").remove();
                },1000);
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                $.messager.alert("提示", textStatus);
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
                setTimeout(function(){
                    $(".temppopup").remove();
                },1000);
            }
        });
    }
    util.getAjaxData = getAjaxData;
    return util;
});