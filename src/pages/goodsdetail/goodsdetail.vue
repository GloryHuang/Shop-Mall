<template>
  <div>
    <div class="shop-detail" v-for="(item,index) in product">
      <div class="nav-cart">
        <span class="icon-go" @click="goBack()"></span>

        <router-link :to="{name:'shopcart',params:{'type':'购物车'}}">
          <span class="cart"></span>
        </router-link>
      </div>
      <div class="swiper">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="pic in item.goodsPic">
            <img :src="pic" alt>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <section class="chose">
        <div class="chose-view">
          <h1 class="chose-view-title">
            {{item.goodsName}}
            <span></span>
          </h1>
          <span class="chose-price">¥{{item.goodsPrice}}</span>
          <span class="shop-des">{{item.goodsDes}}</span>
        </div>
        <div class="chose-mychosed">
          <div class="chose-select">
            <span>颜色:</span>
            <VChooser :selections="item.buyColor" @on-change="onParamChange('color',$event)"></VChooser>
          </div>
          <div class="chose-select">
            <span>容量:</span>
            <VChooser :selections="item.buyCapacity" @on-change="onParamChange('capacity',$event)"></VChooser>
          </div>
          <div class="chose-count">
            <span>数量:</span>
            <Counter @on-change="onParamChange('buyNum',$event)" :goodObj="item"></Counter>
          </div>
        </div>
      </section>
      <section class="actionBar">
        <a class="add-cart" @click="addCart(item,index)">加入购物车</a>
        <router-link :to="{name:'shopcart',params:{'type':'购物车'}}" class="buy">立即购买</router-link>
      </section>
      <section class="content">
        <div class="img_warp" v-for="pics in item.goodsContentImg">
          <img :src="pics" alt>
        </div>
      </section>
      <div class="footer">
        <p>人家是有底线的 -.-</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";

import VChooser from "../../components/chooser.vue";
import Counter from "../../components/counter.vue";
export default {
  components: {
    VChooser,
    Counter
  },
  data() {
    return {
      product: [],
      color: [],
      capacity: [],
      buyNum: 1
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onParamChange(attr, val) {
      this[attr] = val;
    },
    addCart(item, index) {
      var goodlist = {
        id: item.id,
        buyName: item.goodsName,
        buyDes: item.goodsDes,
        buyPrice: item.goodsPrice,
        buyColor: this.color,
        buyCapacity: this.capacity,
        buyNum: this.buyNum,
        pic: item.goodsPic[0],
        checked: false,
        goodsId: item.id + "" + this.color.cid + "" + this.capacity.sid
      };

      this.$store.commit("addToCar", goodlist);

      Toast({
        message: "商品已成功添加到购物车",
        iconClass: "iconfont icon-yiguanzhu",
        className: "Toast",
        duration: 1000
      });
    }
  },

  created() {},
  mounted() {
    this.axios
      .get("api/queryGoods?id=" + this.$route.params.id, {
        transformResponse: [
          data => {
            return this.tools.DataFormat(data);
          }
        ]
      })
      .then(res => {
        if (!res.status == 200) return;
        this.product = res.data;
        this.color = this.product[0].buyColor[0];
        this.capacity = this.product[0].buyCapacity[0];
        this.buyNum = this.buyNum;
      })
      .catch(error => {
        return error;
      });
  }
};
</script>
<style lang="less" scoped="scoped">
.shop-detail {
  .swiper {
    .mint-swipe {
      height: 100vw;
    }
  }

  .nav-cart {
    .icon-go {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: block;
      position: absolute;
      left: 10px;
      top: 10px;
      z-index: 10;
      color: #fff;
      background: url("../../../statics/imgs/back.png") no-repeat;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .cart {
      position: absolute;
      top: 10px;
      right: 10px;
      display: block;
      width: 26px;
      height: 26px;
      background: url("../../../statics/imgs/cart.png") no-repeat;
      background-size: 26px 26px;
      z-index: 11;
    }
  }

  .chose {
    padding: 15px;
    background-color: #fff;

    .chose-view {
      .chose-view-title {
        font-size: 15px;
        font-weight: normal;
        color: #2c3e50;
      }

      .shop-des {
        display: block;
        font-size: 13px;
      }

      .chose-price {
        color: #ff0000;
      }
    }

    .chose-mychosed {
      span {
        font-size: 14px;
        vertical-align: middle;
      }

      .chose-count {
        margin: 10px 0;

        .counter-show {
          font-size: 15px;
        }
      }
    }

    .counter-component {
      display: inline-block;
      margin: 0 5px;
    }
  }

  .actionBar {
    display: flex;
    text-align: center;

    a {
      color: #fff;
      line-height: 50px;
      opacity: 0.8;
      filter: alpha(opacity=80);
    }

    .add-cart {
      flex: 1;
      background-color: #ff9500;
    }

    .buy {
      flex: 1;
      background-color: #ff0036;
    }
  }

  .content {
    width: 100%;
  }
}
</style>