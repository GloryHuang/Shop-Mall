//导入vue核心包
import Vue from 'vue';
import Vuex from 'vuex'
//导入App.vue的vue对象
import App from './App.vue';
import router from '../src/router/router';
import store from './store/store';


//将vue-resource在vue中绑定，自动在vue对象实例上注入一个$http对象就可以使用ajax方法了
// import vueRes from 'vue-resource';
import axios from 'axios'
// import tools from "../../tools/tools";
import tools from "../src/tools//tools";
import { iconAli, mintUi, muiCss, iconFont, siteCss, muiIcon, mintCss, } from '../src/tools/style'

//导入Vuex
Vue.use(mintUi);
// Vue.use(Vuex);
Vue.prototype.axios = axios;
Vue.prototype.tools = tools;
axios.defaults.baseURL = 'http://localhost:3000/';

// 添加一个请求拦截器
axios.interceptors.request.use(req => {

    // console.log('loding......')
    mintUi.Indicator.open({
        text: '加载中...',
        spinnerType: 'triple-bounce',
    });
    return req;
}, error => {
    console.log('req interceptors err')
    mintUi.Indicator.close();
    return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(res => {
    // console.log('is loding finished ')
    mintUi.Indicator.close();
    return res;
}, error => {
    // console.log('res interceptors err')
    mintUi.Indicator.close();

    mintUi.Toast({
        message: "获取商品失败",
        position: "center",
        duration: 1000
    });
    // setTimeout(() => {
    //     router.go(-1);
    // }, 1000)
    return Promise.reject(error);

});








































// 3.0 利用Vue对象进行解析渲染
new Vue({
    el: '#app',
    // 使用路由对象实例
    router,
    // vueRes,
    axios,
    store,
    // render:function(create){create(App)} //es5的写法
    render: c => c(App) // es6的函数写法 =>：goes to
});