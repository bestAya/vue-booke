var router=new VueRouter({
    routes:[
        {
            path:"/",
            component:Head,
            children:[
                {
                    path:'',
                    components:{
                        left:Left,
                        right:Right,
                    }
                }
            ]
        },
        {
            path:"/git",
            component:git,
        }
    ]
})