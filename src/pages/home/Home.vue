<template lang="html">
    <div class="home_index">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in list">
              <a :href='item.href'>  <img :src="item.img_url">  </a>
            </mt-swipe-item>
        </mt-swipe>

      
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
                      <router-link :to="{name:'goodslist',params:{'type':'商品列表'}}">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">好货</div>
                     </router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3"><a href="#">
                        <span class="mui-icon mui-icon-email"></span>
                        <div class="mui-media-body">超市</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3"><a href="#">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">天天特惠</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3"><a href="#">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">热卖</div></a></li>
            </ul>
        </div>
        <div class="hot">
            <h5 class="recommend">热门推荐</h5>
            <div class="hot-body">
                <div class="hot-body-warp">
                    <div class="fl">
                        <router-link :to="{name:'shopdetail',params:{'type':'商品详情','id':90}}">
                            <img src="../../../statics/imgs/cp4.jpg" alt="">
                        </router-link>
                    </div>
                    <div class="fr">
                        <a href=""><img src="../../../statics/imgs/cp2.jpg" alt="" class="bottom"></a>
                        <a href=""><img src="../../../statics/imgs/cp3.jpg" alt=""></a>
                    </div>
                </div>
                <div class="hot-body-warp">
                    <div class="hot-body-header">
                        <span>最新活动</span>
                    </div>
                    <div class="fl">
                        <a href=""><img src="../../../statics/imgs/cp5.jpg" alt="" class="bottom"></a>
                        <a href=""><img src="../../../statics/imgs/cp6.jpg" alt=""></a>
                    </div>
                    <div class="fr">
                        <a href=""><img src="../../../statics/imgs/cp1.jpg" alt=""></a>
                    </div>
                </div>
                <div class="hot-body-warp">
                    <div class="hot-body-header">
                        <span>最新活动</span>
                    </div>
                    <div class="fl">
                        <a href=""><img src="../../../statics/imgs/cp4.jpg" alt=""></a>
                    </div>
                    <div class="fr">
                        <a href=""><img src="../../../statics/imgs/cp5.jpg" alt="" class="bottom"></a>
                        <a href=""><img src="../../../statics/imgs/cp6.jpg" alt=""></a>
                    </div>
                </div>
                <div class="shop-list">
                    <div class="hot-body-header">
                        <span>热门产品</span>
                    </div>
                     <list></list>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>人家是有底线的 -.-</p>
        </div>
    </div>
</template>
<script>
import list from "../../pages/goods/goodsList.vue";
export default {
  components: {
    list
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getimgs();
  },
  methods: {
    getimgs() {
      this.axios
        .get("http://localhost:5008/api/getlunbo.json")
        .then(res => {
          //成功的处理
          var data = res.data;
          // console.log(res);
          if (data.status != 0) {
            return;
          }
          this.list = data.messages;
        })
        .catch(error => {
          //失败的处理
          console.log(error);
        });
    }
  }
};
</script>
<style lang="less" scoped="scoped">
.mint-swipe {
  height: 145px;
}

.mint-swipe-item {
  width: 100%;
  height: 140px;
}

.mint-swipe-item img {
  width: 100%;
  height: 100%;
}

.mui-content,
.mui-content ul {
  background-color: #fff;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border-right: 0px;
  border-bottom: 0px;
}

.mui-grid-view.mui-grid-9 {
  border-top: 0px;
  border-left: 0px;
}

.mui-icon-home:before,
.mui-icon-email:before,
.mui-icon-chatbubble:before,
.mui-icon-location:before,
.mui-icon-search:before,
.mui-icon-phone:before {
  content: "";
  display: inline-block;
  width: 50px;
  height: 50px;
  background-repeat: round;
}

.mui-icon-home:before {
  background-image: url(../../../statics/imgs/1.png);
}

.mui-icon-email:before {
  background-image: url(../../../statics/imgs/2.png);
}

.mui-icon-chatbubble:before {
  background-image: url(../../../statics/imgs/3.png);
}

.mui-icon-location:before {
  background-image: url(../../../statics/imgs/4.png);
}

.hot {
  .hot-body {
    margin: 0px 10px;
    .hot-body-header {
      margin-top: 5px;
      height: 30px;
      border-bottom: 1px solid #ccc;

      &::before {
        content: "";
        width: 2px;
        height: 5px;
        border: 2px solid red;
      }

      span {
        color: rgb(201, 21, 35);
        line-height: 30px;
        padding-left: 10px;
      }
    }
    .hot-body-warp {
      width: 100%;
      overflow: hidden;
      .fl {
        float: left;
        width: 50%;
        border-right: 1px solid #eee;
      }
      .fr {
        float: right;
        width: 50%;
      }
      .bottom {
        border-bottom: 1px solid #eee;
      }
      img {
        width: 100%;
        display: block;
      }
    }
  }
}
.footer {
  padding-bottom: 50px;
}
</style>