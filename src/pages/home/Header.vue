<template>
  <mt-header fixed :title="type" v-if="this.$route.name!='shopdetail'">
    <div slot="left" v-show="isShow">
      <mt-button icon="back" @click="$router.go(-1)"></mt-button>
    </div>
  </mt-header>
</template>


<script>
export default {
  data() {
    return {
      type: "",
      isShow: false
    };
  },
  methods: {
    getTitle() {
      return (this.type = this.$route.params.type);
    },
    getPath() {
      switch (this.$route.name) {
        case "home":
          this.type = "首页";
          break;
        case "shopcart":
          this.type = "购物车";
          break;
        case "aboutme":
          this.type = "个人中心";
          break;
        case "shopdetail":
          this.type = "商品详情";
          break;
        case "goodslist":
          this.type = "商品列表";
          break;
        case "login":
          this.type = "登录";
          break;
        case "checkorder":
          this.type = "支付订单";
          break;
        default:
          this.type = "首页";
      }
    },
    isBack(to, from) {
      //监控路由变换，控制返回按钮的显示
      if (
        to.name == "shopcart" ||
        to.name == "login" ||
        to.name == "checkorder"
      ) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  },
  created() {
    this.getPath();
    this.isBack(this.$route);
    // console.log(this.$route);
  },
  updated() {
    this.getPath();
  },
  watch: {
    $route: ["getTitle", "isBack"]
  }
};
</script>




<style scoped>
/*当前页面的css样式写到这里，其中scoped表示这个里面写的css代码只是在当前组件页面上有效，不会去影响到其他组件页面*/
.mint-header {
  font-size: 18px;
}
</style>
