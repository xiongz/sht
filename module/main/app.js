define(function(require) {
  var $ = require("jquery");
  var request = require("tools/request");
 // var IScroll = require("lib/iscroll.js");
  require("amaze");
  var apptype = "operate";

  if(window.location.pathname.indexOf("data.html")!=-1){
    apptype = "data";
  }
  var app;
  switch (apptype){
    case "operate": app = require("config2014/init_operate");break;
    case "data": app = require("config2014/init_data");break;
    default : require("config2014/init_operate");break;
  }
  var tag = request.getHash()||app.module[0]["_class"];
  var cf = request.QueryString("cf");
  //var amaze = require("amaze");
  $(function() {
    var $fullText = $('.admin-fullText');
    $('#admin-fullscreen').on('click', function() {
      $.AMUI.fullscreen.toggle();
      $.AMUI.fullscreen.isFullscreen ? $fullText.text('关闭全屏') : $fullText.text('开启全屏');
    });
    $("#"+apptype).parent().addClass("am-active");
    /**
     * 初始化菜单
     */
    initNav("#admin-sidebar",app.module);
    /**
     * 绑定菜单点击事件
     */
    var menu;
    $(".admin-sidebar-list .am-cf").bind("click",function(){
      var  $this = $(this);
      var navtype = $this.attr("href").substring(1);
      $(".admin-sidebar-list .am-active").removeClass("am-active");
      $this.parent().addClass("am-active");
      $("#collapse-nav").collapse("open");
      menu = getKeyByClass(app.module,"menu",navtype);
      if(menu){
          initNav("#collapse-nav",menu,navtype);
      }else{
          $("#collapse-nav").hide();
          $(".admin-collapse").css("right",0);
          $(".admin-main").css("marginLeft","200px");
      }
      $(".admin-sidebar-sub .am-cf").unbind("click").bind("click",function(){
        var  $this = $(this);
        var type = $this.attr("href");
        $(".admin-sidebar-sub .am-active").removeClass("am-active");
        $this.parent().addClass("am-active");
        $("#admin-nav small").html($(this).text());
        $("#admin-nav strong").html(getKeyByClass(app.module,"name",navtype));
        $("#admin-nav small").html($(this).find(".admin-text").text());
      });
      cf = (cf&&cf==request.QueryString("cf"))?cf:menu[0]["_class"];
      $("#"+navtype+"_"+cf).click();

    });
    /**
     * 菜单栏的收缩
     */
    $(".admin-collapse").bind("click",function(){
      if($(this).parent().hasClass("admin-bar-close")){
        $(".admin-sidebar").removeClass("admin-bar-close");
        $(".admin-main").css("marginLeft",menu?"400px":"200px");
      }else{
        $(".admin-sidebar").addClass("admin-bar-close");
        $(".admin-main").css("marginLeft","40px");
      }
    });
    $("#collapse-nav").bind("open.collapse.amui",function(a,b,c){
      console.log("open");
    });
    $("#collapse-nav").bind("close.collapse.amui",function(a,b,c){
      console.log("close");
    });
    $("a[href=#"+tag+"]").click();
  });

  function initNav(target,module,nav){
    var html = '';
    var child = "#";
    var id=null;
    if(nav){
        child = "#"+nav+"?cf=";
        id = nav+"_";
    }
    module.forEach(function(v,i){
      if(i==0){
          if(id){
              html += '<li class="am-active"><a id='+id+v._class+' class="am-cf" href="'+child+ v._class+'"><span class="admin-icon-'+ v._class+'"></span><span class="admin-text">'+ v.name +'</span></a></li>';
          }else{
              html += '<li class="am-active"><a class="am-cf" href="'+child+ v._class+'"><span class="admin-icon-'+ v._class+'"></span><span class="admin-text">'+ v.name +'</span></a></li>';
          }
      }else{
          if(id) {
              html += '<li><a id=' + id +v._class+ ' class="am-cf" href="' + child + v._class + '"><span class="admin-icon-' + v._class + '"></span><span class="admin-text">' + v.name + '</span></a></li>';
          }else{
              html += '<li><a class="am-cf" href="' + child + v._class + '"><span class="admin-icon-' + v._class + '"></span><span class="admin-text">' + v.name + '</span></a></li>';
          }
      }
    });
    $(target).html(html);
  }
  function getKeyByClass(module,key,_class){
    var key;
    module.forEach(function(v,i){
      if(v._class==_class){
          key = v[key];
        return;
      }
    });
    return key;
  }
  function switchNav(){

  }

});
