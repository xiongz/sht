define(function(require){
    var app={};
    app.module = [
        {name:"公司管理",_class:"company",menu:[{name:"员工管理",_class:"staff"},{name:"角色管理",_class:"role"},{name:"权限管理",_class:"access"}]},
        {name:"海友管理",_class:"friend",menu:[{name:"待审核海友",_class:"authstr"},{name:"全部海友",_class:"all"}]},
        {name:"海友文章",_class:"article",menu:[{name:"海友文章",_class:"friart"},{name:"运营文章",_class:"optart"}]}
    ];
return app;
});