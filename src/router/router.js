import Vue from 'vue';
import vueRouter from 'vue-router';

Vue.use(vueRouter);

import home from '../pages/home/Home.vue';
import login from '../pages/account/login.vue';
import register from '../pages/account/register.vue';
import shopcart from '../pages/shopcart/shopcart.vue';
import aboutme from '../pages/about/aboutme.vue';
import shopdetail from '../pages/goodsdetail/goodsdetail.vue'
import goodslist from '../pages/goods/goodsList.vue'
import category from '../pages/goods/category.vue'
import checkorder from '../pages/goods/checkOrder.vue'



let router = new vueRouter({
    // linkActiveClass: 'mui-active', //改变路由激活时的class名称
    linkExactActiveClass: 'mui-active', //改变路由激活时的class名称
    // mode: 'history',
    routes: [{
        path: '/',
        component: home,
        name: 'home'
    },
    {
        path: '/home',
        component: home,
        name: 'home'
    },
    {
        path: '/login',
        component: login,
        name: 'login',
        meta: {
            title: '登录',
            type: 'login'
        }
    },
    {
        path: '/register',
        component: register,
        name: 'register'
    }, {
        path: '/shopcart',
        component: shopcart,
        name: 'shopcart',
        meta: {
            keepAlive: true
        },
    }, {
        path: '/aboutme',
        component: aboutme,
        name: 'aboutme'
    },
    {
        path: '/shopdetail/:id',
        component: shopdetail,
        name: 'shopdetail'
    }, {
        path: '/goodslist',
        component: goodslist,
        name: 'goodslist'
    }, {
        path: '/cart/checkorder',
        component: checkorder,
        name: 'checkorder',
        meta: {
            type: 'checkorder'
        }
    },
    {
        path: '/category',
        component: category,
        name: 'category'
    }
    ],
    //对于所有路由导航，简单地让页面滚动到顶部。
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }

})

router.beforeEach((to, from, next) => {

    next();

    const type = to.meta.type
    // 判断该路由是否需要登录权限
    if (type === 'login' || type == 'checkorder') {

        if (sessionStorage.getItem('login')) {
            console.log('is login')
            // console.log(localStorage.getItem('login'))
            if (type == 'login') {
                next({ name: 'aboutme' })
            } else if (type == 'checkorder') {
                next({ name: 'checkorder' })
            }
        } else {
            next({ name: 'login' })
        }
    } else {
        next()  // 确保一定要有next()被调用
    }
})

export default router 