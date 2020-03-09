<template>
  <div class="order-container">
    <div class="order-warp">
      <div class="order-address">
        <div class="address-user">
          <span class="username">收货人: 张三</span>
          <span class="tel">15901234568</span>
        </div>
        <div class="addreess-detial">
          <p>收货地址:广东省 深圳市 南山区 深南大道9037号</p>
        </div>
      </div>
      <!-- <div class="storename"></div> -->
      <div class="order-orderInfo" v-for="item in orderList">
        <div class="orderlist">
          <div class="item-pic">
            <img :src="item.pic" alt>
          </div>
          <div class="item-content">
            <div class="item-title">{{item.buyName}}</div>
            <div class="item-info">{{item.buyCapacity.label}},{{item.buyColor.label}}</div>
            <div class="item-price">
              <span class="quantity">X{{item.buyNum}}</span>
              <span class="price">￥{{item.buyPrice}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="width:100vw;height:60px;"></div>
    <div class="order-orderPay">
      <div class="amount">
        <span>
          共
          <span class="price">{{getCheckAmount}}</span> 件,总金额
          <span class="price">￥{{this.totalMoney}}</span>
        </span>
      </div>
      <div class="paybutton" @click="payFor">
        <a>支付</a>
      </div>
    </div>
  </div>
</template>


<script>
import { Indicator, Toast } from "mint-ui";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      orderList: [],
      totalMoney: 0
    };
  },
  methods: {
    getOrderList() {
      this.orderList = this.$store.state.carts.orderList.order;
      this.totalMoney = this.$store.state.carts.orderList.totalMoney;
    },
    payFor() {
      Indicator.open({
        text: "支付中...",
        spinnerType: "fading-circle"
      });

      Indicator.close();
      Toast({
        message: "支付成功",
        iconClass: "iconfont icon-success_no_circle",
        className: "success_"
      });
      setTimeout(() => {
        this.$store.commit("PAY_FOR");

        this.$router.push({ name: "home" });
      }, 2000);
    }
  },
  created() {
    this.getOrderList();
  },

  computed: {
    ...mapState({}),
    ...mapGetters(["getCheckAmount"])
  }
};
</script>

<style lang="less" scoped>
.order-container {
  .order-warp {
    background-color: #eee;
    .order-address {
      padding: 15px 9px;
      background-color: #fff;
      margin-bottom: 10px;
      box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.2), 0 0.5px 0 0 rgba(0, 0, 0, 0.3);
      .address-user {
        display: flex;
        justify-content: space-between;
      }
      .addreess-detial {
        p {
          padding: 5px 0;
        }
      }
    }
    .storename {
      width: 100%;
      height: 30px;
      background-color: #fff;
    }
  }

  .order-orderInfo {
    // margin-bottom: 60px;
    background-color: #fff;
    .orderlist {
      display: flex;
      padding: 9px;
    }
    .item-pic {
      margin-right: 9px;
    }

    .item-content {
      font-size: 14px;
      color: #666;
      .item-title {
        color: #000;
      }
      .item-price {
        display: flex;
        align-items: flex-end;
        flex-direction: column;
      }
    }
  }
  .price {
    color: #ff0036;
  }
}
.order-orderPay {
  width: 100vw;
  display: flex;
  position: fixed;
  bottom: 0px;
  border-top: 1px solid #fff;
  .amount {
    display: flex;
    flex: 1;
    padding-right: 5px;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;
  }
  .paybutton {
    padding: 15px 30px;
    background-color: orange;
    a {
      color: #fff;
    }
  }
}
img {
  width: 100px;
  height: 100px;
}
</style>


