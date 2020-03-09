<template>
  <div>
    <div class="shop_car" v-if="this.$store.state.carts.shopCartList.length>0">
      <div class="mui-card">
        <div class="mui-input-row mui-checkbox mui-left">
          <label for>自营超市</label>
        </div>
        <div class="goods" ref="list">
          <div class="shop-list" v-for="(shop,index) in goodsList">
            <mt-cell-swipe
              :right="[{content: '删除',style: { background: '#f60', color: '#fff',border:0,'line-height':'120px'},handler: ()=>deleteGoods(shop,index)}]"
            >
              <div class="splist_left">
                <div class="mui-checkbox">
                  <label></label>
                  <input
                    name="ck1"
                    type="checkbox"
                    checked
                    v-model="checkModel"
                    :value="shop.buyCapacity.label + shop.buyColor.label"
                    @change="check(shop,index)"
                  >
                </div>
              </div>
              <div class="splist_center">
                <img :src="shop.pic" alt>
              </div>
              <div class="splist_right">
                <p class="shop-name">{{shop.buyName}}</p>
                <span class="shop-species">{{shop.buyCapacity.label}}, {{shop.buyColor.label}}</span>

                <div class="shop-count">
                  <div class="shop-price">
                    <span>￥{{shop.buyPrice}}</span>
                  </div>

                  <Counter
                    @on-change="CountChange"
                    ref="numb"
                    :counts="shop.buyNum"
                    :goodObj="shop"
                  ></Counter>
                </div>
              </div>
            </mt-cell-swipe>
          </div>
        </div>
      </div>
      <div class="count">
        <div class="totail-price">
          <div class="mui-input-row mui-checkbox mui-left">
            <label for="ckAll">
              <input
                name="ck2"
                type="checkbox"
                id="ckAll"
                v-model="checkedAll"
                @change="SelectAll()"
              >全选
            </label>
          </div>
          <div class="price">
            <em>合计:</em>
            <i class="goods-price">￥{{totalMoney}}</i>
            <span class="Sett" @click="checkOut">结算({{this.$store.getters.getCheckAmount}})</span>
          </div>
        </div>
      </div>
    </div>

    <div class="emptyCart" v-else>购物车里还没有东西快去逛逛！</div>
    <div class="recommend">
      <span class="recommend-title">热门推荐</span>
    </div>

    <goodslist></goodslist>
  </div>
</template>
<script>
import Counter from "../../components/counter.vue";
import common from "../../components/kits/common";
import goodslist from "../../pages/goods/goodsList.vue";
import { Toast } from "mint-ui";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    Counter,
    goodslist
  },
  data() {
    return {
      totalMoney: 0,
      buyNum: 0,
      checkedAll: false,
      checkModel: this.$store.state.carts.checkModel,
      goodsList: this.$store.state.carts.shopCartList
    };
  },
  watch: {
    checkModel() {
      this.isAllCheck();
    }
  },
  methods: {
    isAllCheck() {
      if (this.checkModel.length == this.goodsList.length) {
        this.checkedAll = true;
      } else {
        this.checkedAll = false;
      }
    },
    check(item, index) {
      if (!item.checked) {
        this.$store.commit("updataChecked", {
          goodsId: item.goodsId,
          checked: true
        });
      } else {
        this.$store.commit("updataChecked", {
          goodsId: item.goodsId,
          checked: false
        });
      }

      this.$store.commit("updateCheckModel", this.checkModel);
      this.calcTotalPrice();
      // console.log(this.$store.state.checkModel, "c");
    },
    CountChange(num) {
      this.buyNum = num;
      this.calcTotalPrice();
    },
    GetDoods() {
      // this.goodsList = this.$store.state.shopCartList;
      // if (localStorage.getItem("shopCartList")) {
      //   this.goodsList = this.$store.state.shopCartList;
      // } else {
      //   this.goodsList = [];
      // }
      // this.checkModel = this.$store.state.checkModel;
    },
    SelectAll() {
      this.checkModel = [];
      if (this.checkedAll) {
        this.goodsList.forEach((item, index) => {
          this.checkModel.push(item.buyCapacity.label + item.buyColor.label);

          this.$store.commit("updataAllChecked", true);
        });

        this.calcTotalPrice();
      } else {
        this.checkModel = [];
        this.totalMoney = 0;
        this.$store.commit("updataAllChecked", false);
      }
      this.$store.commit("updateCheckModel", this.checkModel);
    },

    deleteGoods(shop, index) {
      this.goodsList.splice(index, 1);
      this.$store.commit("deleteFromCar", shop);
      this.$store.commit("deleteFromCheckModel", index);
      this.calcTotalPrice();
      // console.log(this.$store.state.shopCartList.length, "length");
      // console.log(this.goodsList, "asdas");
    },
    calcTotalPrice() {
      this.totalMoney = 0;
      this.goodsList.forEach((item, index) => {
        if (item.checked) {
          this.totalMoney += item.buyPrice * item.buyNum;
        }
        // console.log(
        //   this.totalMoney + "+=" + item.buyPrice + "+" + "* " + item.buyNum
        // );
        // }
      });
      // console.log(this.totalMoney + "tola");
    },
    checkOut() {
      if (this.$store.state.carts.checkModel.length > 0) {
        // this.$store.commit("getOrderList", this.totalMoney);
        this.$store.dispatch("getOrder", this.totalMoney);
        this.$store.commit("PAY_FOR");
        this.$router.push({ name: "checkorder" });
      } else {
        Toast({
          message: "您还没有选择商品哦",
          iconClass: "iconfont icon-shangchuanshibai",
          duration: 2000
        });
      }
    }
  },

  created() {
    // this.GetDoods();
    this.calcTotalPrice();
    this.isAllCheck();
  },
  computed: {
    // ...mapGetters({
    //   number:'getCheckAmount'
    // })
  },
  mounted() {}
};
</script>
<style lang="less" scoped="scoped">
.goods:last-child {
  border-bottom: 0;
}

.shop_car {
  .mui-card {
    overflow: scroll;
    label {
      font-size: 16px;
    }
    .mui-checkbox.mui-left label {
      padding-left: 30px;
    }

    .goods {
      background-color: #f8f8f8;
      .shop-list {
        // padding: 5px;
        padding: 0px 5px;
        display: flex;
        // border-bottom: 1px solid #ddd;

        &:last-child {
          border-bottom: 0;
        }
        .splist_left {
          display: flex;
          width: 35px;
          align-items: center;
          justify-content: center;
          .mui-checkbox input[type="checkbox"] {
            top: 0;
          }
        }
        .splist_center {
          flex: 1;
          img {
            border: 1px solid transparent;
          }
        }
        .splist_right {
          position: relative;
          padding: 5px;
          flex: 2;

          .shop-name {
            overflow: hidden;
            text-overflow: ellipsis;
            color: #222222;
            font-family: "Helvetica Neue", "Helvetica", "sans-serif";
            font-weight: normal;
            margin: 0;
          }
          .shop-species {
            color: #9a9a9a;
            font-size: 14px;
            display: block;
            padding: 5px 0;
          }
        }
        .shop-count {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          .shop-price {
            color: #f16105;
            font-size: 16px;
          }
        }
      }
    }
  }
  .count {
    width: 100%;
    position: fixed;
    bottom: 50px;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    .totail-price {
      display: flex;

      .mui-checkbox.mui-left {
        flex: 1;
        label {
          padding-left: 42px;
        }
      }

      .price {
        justify-content: flex-end;
        .goods-price {
          color: #e93b3d;
          font-size: 15px;
          font-weight: bold;
        }
        i {
          font-style: normal;
        }
        em {
          font-style: normal;
          line-height: 40px;
          font-size: 12px;
        }
        .Sett {
          display: inline-block;
          background-color: #f60;
          width: 105px;
          height: 40px;
          color: white;
          text-align: center;
          line-height: 40px;
        }
      }
    }
  }
}
.emptyCart {
  min-height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(51, 51, 51, 0.66);
}
.recommend {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;

  &::before,
  &::after {
    content: "";
    background-color: #999;
    width: 35%;
    height: 1px;
    margin: 0 8px;
    transform: scaleY(0.5);
    transform-origin: 50% 0;
    -webkit-transform: scaleY(0.5);
    -webkit-transform-origin: 50% 0;
  }
}
.mui-radio input[type="radio"]:before,
.mui-checkbox input[type="checkbox"]:before {
  font-family: Muiicons;
  font-size: 20px;
  font-weight: normal;
  line-height: 1;
  text-decoration: none;
  border-radius: 0;
  background: none;
  -webkit-font-smoothing: antialiased;
}

.mui-radio input[type="radio"],
.mui-checkbox input[type="checkbox"] {
  position: absolute;
  top: 10px;
  right: 20px;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 0;
  outline: 0 !important;
  background-color: transparent;
  -webkit-appearance: none;
}
</style>