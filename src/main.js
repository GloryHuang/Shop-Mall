// 1.0 导入vue核心包
import Vue from 'vue';

// 2.0 导入App.vue的vue对象
import App from './App.vue';


import vueRouter from 'vue-router';


import login from '../src/components/account/login.vue';
import register from '../src/components/account/register.vue';

import 'mint-ui/lib/style.min.css';
import '../statics/mui/css/mui.css';

import mintUi from 'mint-ui';

Vue.use(mintUi);
Vue.use(vueRouter);


var router1 = new vueRouter({
    routes: [

        { path: '/login', component: login },
        { path: '/register', component: register }

    ]
});


// 3.0 利用Vue对象进行解析渲染
new Vue({
    el: '#app',
    router: router1,
    // render:function(create){create(App)} //es5的写法
    render: c => c(App) // es6的函数写法 =>：goes to
});