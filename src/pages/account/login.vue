<template>
  <div class="login-container">
    <div class="login-body">
      <div class="user">
        <input type="text" placeholder="请输入账号" v-model="username">
        <span :class="{clearAll1:this.username.length>0}" @click="show('username',$event)"></span>
      </div>
      <div class="passwd">
        <input type="password" placeholder="请输入密码" v-model="password">
        <span :class="{clearAll2:this.password.length>0}" @click="show('password',$event)"></span>
      </div>

      <mt-button type="primary" size="large" @click="login">登 录</mt-button>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      username: [],
      password: []
    };
  },
  methods: {
    show(str) {
      if (str == "username") {
        this.username = [];
      }
      if (str == "password") {
        this.password = [];
      }
    },
    login() {
      this.axios
        .post("/api/loginin", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          // console.log(res);
          if (res.data.isloging == "success") {
            this.$router.push({
              name: "aboutme",
              params: { username: res.data.username }
            });
            sessionStorage.setItem("login", JSON.stringify(res.data.username));
          } else if (res.data.isloging == "fail") {
            Toast({
              message: "账号密码错误",
              position: "bottom",
              duration: 3000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.login-container {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-body {
    width: 100%;
    padding: 0 15px;
    position: relative;
    input[type="text"],
    input[type="password"] {
      font-size: 14px;
      border: 0px;
      border-bottom: 1px solid #ff5000;
      background-color: transparent;
      border-radius: 0px;
    }

    button {
      margin-top: 50px;
    }
  }
}

.clearAll1 {
  &::after {
    content: "x";
    width: 15px;
    height: 15px;
    position: absolute;
    right: 25px;
    top: 15px;
    font-size: 12px;
    border: 1px solid #999;
    text-align: center;
    line-height: 15px;
    border-radius: 50%;
    color: #999;
  }
}
.clearAll2 {
  &::after {
    content: "x";
    width: 15px;
    height: 15px;
    position: absolute;
    right: 25px;
    top: 65px;
    font-size: 12px;
    border: 1px solid #999;
    text-align: center;
    line-height: 15px;
    border-radius: 50%;
    color: #999;
  }
}
</style>
