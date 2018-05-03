(function () {

    //组件
    var Home = {
        template: '<h3>我是主页</h3>'
    };
    var User = {
        template: '<div>' +
        '<h3>我是用户信息</h3>' +
        '<ul>' +
        '<li><router-link to="/user/strive/age/10">Strive</router-link></li>'+
        '<li><router-link to="/user/blue/age/80">Blue</router-link></li>'+
        '<li><router-link to="/user/eric/age/70">Eric</router-link></li>'+
        '</ul>' +
        '<div>' +
        '<router-view></router-view>' +
        '</div>' +
        '</div>'
    };
    var UserDetail = {
        template: '<div>{{$route.params}}</div>'
    };

    //配置路由
    const routes = [
        {path: '/home', component: Home},
        {
            path: '/user',
            component: User,
            children: [
                {path: ':username/age/:age', component: UserDetail}
            ]
        },
        {path: '*', redirect: '/home'}  //404
    ];

    //生成路由实例
    const router = new VueRouter({
        routes:routes
    });


    //最后挂到vue上
    new Vue({
        router:router,
        el: '#v3',
        methods:{
            push:function(){
                router.push({path:'home'});
            },
            replace:function(){
                router.replace({path:'user'});
            }
        }
    });
})();