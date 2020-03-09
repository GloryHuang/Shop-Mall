<template>
  <div class="warp">
    <div class="mui-views" data-view="1">
      <div class="mui-view">
        <div class="mui-pages">
          <div id="setting" class="mui-page mui-page-center" style>
            <div class="mui-page-content">
              <ul class="mui-table-view mui-table-view-chevron">
                <li class="mui-table-view-cell mui-media">
                  <a class="mui-navigate-right">
                    <img
                      class="mui-media-object mui-pull-left head-img"
                      id="head-img"
                      src="../../../statics/imgs/cp1.jpg"
                    >
                    <div class="mui-media-body">
                      Hello {{username}}
                      <p class="mui-ellipsis">账号:{{username}}</p>
                    </div>
                  </a>
                </li>
              </ul>
              <ul class="mui-table-view mui-table-view-chevron">
                <li class="mui-table-view-cell">
                  <a class="mui-navigate-right">账号与安全</a>
                </li>
              </ul>
              <ul class="mui-table-view mui-table-view-chevron">
                <li class="mui-table-view-cell">
                  <a class="mui-navigate-right">我的订单</a>
                </li>
                <li class="mui-table-view-cell">
                  <a class="mui-navigate-right">我的退款</a>
                </li>
                <li class="mui-table-view-cell">
                  <a class="mui-navigate-right">售后服务</a>
                </li>
              </ul>
              <ul class="mui-table-view mui-table-view-chevron">
                <li class="mui-table-view-cell">
                  <a class="mui-navigate-right">
                    关于
                    <i class="mui-pull-right"></i>
                  </a>
                </li>
              </ul>
              <ul class="mui-table-view">
                <mt-button @click="loginOut" size="large">退出登录</mt-button>
              </ul>
            </div>

            <!--页面主内容区结束-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator, Toast } from "mint-ui";
export default {
  data() {
    return {
      username: JSON.parse(sessionStorage.getItem("login"))
    };
  },
  methods: {
    loginOut() {
      if (sessionStorage.getItem("login")) {
        sessionStorage.removeItem("login");

        new Promise(() => {
          Indicator.open({
            text: "退出登录",
            spinnerType: "fading-circle"
          });
        });
        setTimeout(() => {
          this.$router.push({ name: "home" });
        }, 1000);
      }
    }
  },
  created() {
    console.log(this.username);
  }
};
</script>

<style lang="less" scoped="">
.warp {
  button {
    background-color: #fff;
  }
}
.mui-views,
.mui-view,
.mui-pages,
.mui-page,
.mui-page-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #efeff4;
}
.mui-pages {
  top: 46px;
  height: auto;
}

.mui-navbar .mui-bar .mui-title {
  display: inline-block;
  width: auto;
}

.mui-page {
  display: none;
}
.mui-pages .mui-page {
  display: block;
}
.mui-page .mui-table-view:first-child {
  margin-top: 15px;
}
.mui-page .mui-table-view:last-child {
  margin-bottom: 30px;
}
.mui-table-view {
  margin-top: 20px;
}

.mui-table-view span.mui-pull-right {
  color: #999;
}
.mui-table-view-divider {
  background-color: #efeff4;
  font-size: 14px;
}
.mui-table-view-divider:before,
.mui-table-view-divider:after {
  height: 0;
}

.update {
  font-style: normal;
  color: #999999;
  margin-right: -25px;
  font-size: 15px;
}
</style>