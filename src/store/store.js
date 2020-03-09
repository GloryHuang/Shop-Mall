
import Vue from 'vue'
import Vuex from 'vuex'

import carts from './modules/carts'



/**
 * 看了看vuex文档，觉得如果把一个个vue组件当成一个个独立闭包函数，那vuex就相当于一个全局的json，里面有几个key：
 * State：用来存放变量，
   Mutations：用来存放函数（同步），
   Getters：State的计算属性，也是存放函数，但是当state属性改变时，Getters的返回值也会随之改变，
   Action：函数（异步）
 */


Vue.use(Vuex)


export default new Vuex.Store({

  modules: { carts }

})

