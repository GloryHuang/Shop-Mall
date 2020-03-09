<template>
  <nav class="mui-bar mui-bar-tab">
    <router-link class="mui-tab-item" :to="{name:'home',params:{'type':'首页'}}">
      <span class="mui-icon iconfont icon-xiazai45"></span>
      <span class="mui-tab-label">首页</span>
    </router-link>
    <router-link class="mui-tab-item" :to="{name:'category',params:{'type':'商品分类'}}">
      <span class="mui-icon iconfont icon-leimupinleifenleileibie"></span>
      <span class="mui-tab-label">分类</span>
    </router-link>
    <router-link class="mui-tab-item" :to="{name:'shopcart',params:{'type':'购物车'}}">
      <span class="mui-icon iconfont icon-gouwuche">
        <span class="mui-badge">{{this.$store.getters.getAllCount}}</span>
      </span>
      <span class="mui-tab-label">购物车</span>
    </router-link>
    <router-link
      class="mui-tab-item"
      :class="{'mui-active':this.$route.name=='aboutme', 'router-link-active':this.$route.name=='aboutme'}"
      :to="{name:'login',params:{'type':'我的'}}"
    >
      <span class="mui-icon iconfont icon-My"></span>
      <span class="mui-tab-label">我的</span>
    </router-link>
  </nav>
  <!-- <div v-else></div> -->
</template>


<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    // ...mapState({
    //   shopCartList: state => state.shopCartList.length
    // })
    // ...mapGetters({
    //   sum:'getAllAmount'
    // })
  },
  created() {}
};
</script>


<style scoped>
</style>
