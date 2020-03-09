<template>
  <div class="goods-list" :class="{clearPad:this.$route.name=='home'}">
    <div class="goods-Item" v-for="goods in goodsList">
      <router-link :to="{name:'shopdetail',params:{'type':'商品详情','id':goods.id}}">
        <img :src="goods.goodsPic[0]">
      </router-link>

      <h5 class="goods-title">{{goods.goodsName}}</h5>
      <div class="goodsInfo">
        <span class="goods-price">￥{{goods.goodsPrice}}</span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      goodsList: []
    };
  },
  created() {
    this.axios
      .get("api/getList", {
        transformResponse: [
          data => {
            return this.tools.DataFormat(data);
          }
        ]
      })
      .then(res => {
        // if (!res.status == 200) return;
        // console.log(res);
        this.goodsList = res.data;
      });
  }
};
</script>



<style lang="less" >
.goods-list {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 10px;
  justify-content: space-between;
  padding-bottom: 90px;

  .goods-Item {
    width: 49%;
    // padding: 0 2px;
    margin: 2px 0;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    .goods-title {
      font-size: 12px;
      color: #333;
      height: 24px;
      display: -webkit-box; //弹性盒模型显示
      -webkit-box-orient: vertical; //盒模型元素的排列方式
      -webkit-line-clamp: 2; //显示行数
      overflow: hidden; //首先是溢出隐藏，不可或缺
    }
    .goodsInfo {
      .goods-price {
        color: #e93b3d;
        font-size: 15px;
      }
    }
  }
}
.clearPad {
  padding-bottom: 0;
}
</style>

