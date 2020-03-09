<template>
  <div>
    <div class="cat-contain">
      <div class="cat-aside">
        <ul>
          <li
            v-for="(cats,index) in classes"
            :class="{'cat-active':isActive==index}"
            @click="isActive=index,swithGoods(index)"
          >{{cats.title}}</li>
        </ul>
      </div>
      <div class="cat-content">
        <div class="cat-main" v-for="(categorys,index) in categorys">
          <!-- <div class="cat-main"> -->
          <h4>{{categorys.title}}</h4>
          <ul>
            <li v-for="sub in categorys.subtitle">
              <router-link :to="{name:'shopdetail',params:{'type':'商品详情','id':sub.id}}">
                <img :src="sub.imgPic" alt>
                <span>{{sub.goodsName}}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      classes: [],
      isActive: 0,
      categorys: []
    };
  },
  methods: {
    getCategorys() {
      this.axios.get("http://localhost:5008/api/categorys.json").then(res => {
        this.classes = res.data.category;
        this.categorys = this.classes[0].children;
      });
    },
    swithGoods(index) {
      this.categorys = this.classes[index].children;
    }
  },
  created() {
    this.getCategorys();
  },
  beforeCreate() {
    document.querySelector("body").setAttribute("style", "overflow:hidden");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  }
};
</script>


<style lang="less" scoped>
.cat-contain {
  display: flex;
  height: 100vh;
  padding-bottom: 90px;
  .cat-aside {
    flex: 3;

    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    ul {
      li {
        padding: 10px 0;
        text-align: center;
        font-size: 16px;
        a {
          color: #666;
        }
      }
    }
  }
  .cat-content {
    flex: 9.8;

    overflow-y: auto;
    background-color: #ddd;

    .cat-main {
      margin: 5px;
      padding: 5px;
      background: #fff;
      border-radius: 2px;
      h4 {
        font-size: 15px;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #fff;

        li {
          width: 33.33%;

          text-align: center;
          a {
            display: block;
            color: #666;
            img {
              width: 60%;
              margin: 2px auto;
            }
          }
        }
      }
    }
  }
}

.cat-active {
  background-color: #e3e3e3;
}
</style>

