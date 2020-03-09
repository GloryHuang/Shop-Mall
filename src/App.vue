<!-- 以后项目的根组件 -->
<template>
  <div>
    <div v-if="isShowNav">
      <headers></headers>
      <div :class="{template:this.$route.name!='shopdetail'}">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
      <navbar></navbar>
    </div>

    <div v-else>
      <headers></headers>
      <div :class="{template:this.$route.name!='shopdetail'}">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import navbar from "./pages/home/Navbar.vue";
import headers from "./pages/home/Header.vue";

export default {
  components: {
    navbar,
    headers
  },

  data() {
    return {
      isShowNav: ""
    };
  },
  methods: {
    isNav() {
      if (
        this.$route.name == "login" ||
        this.$route.name == "shopdetail" ||
        this.$route.name == "checkorder"
      ) {
        this.isShowNav = false;
      } else {
        this.isShowNav = true;
      }
    }
  },
  created() {
    this.isNav();
  },
  watch: {
    $route(to, from, next) {
      if (
        to.name == "login" ||
        to.name == "shopdetail" ||
        to.name == "checkorder"
      ) {
        this.isShowNav = false;
      } else {
        this.isShowNav = true;
      }

      if (to.name == "shopcart") {
        to.meta.keepAlive = true;
      } else {
        to.meta.keepAlive = false;
      }
    }
  }
};
</script>
<style scoped="scoped">
</style>