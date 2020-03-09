<template>
  <div class="counter-component">
    <div class="counter-btn" @click="minus">-</div>
    <div class="counter-show">
      <input type="text" v-model="number" @keyup="fixNumber">
    </div>
    <div class="counter-btn" @click="add">+</div>
  </div>
</template>
<script>
export default {
  props: {
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 1
    },
    counts: {
      type: Number,
      default: 1
    },
    goodObj: {
      type: Object
    }
  },
  data() {
    return {
      number: this.counts
    };
  },
  watch: {
    number() {
      this.$store.commit("updateGoodInfo", {
        id: this.goodObj.id,
        cid: this.goodObj.buyColor.cid,
        sid: this.goodObj.buyCapacity.sid,
        buyNum: this.number
      });
      this.$emit("on-change", this.number);
      this.GetNumber();
    }
  },
  methods: {
    fixNumber() {
      let fix;
      if (typeof this.number === "string") {
        fix = Number(this.number.replace(/\D/g, ""));
      } else {
        fix = this.number;
      }
      if (fix > this.max || fix < this.min) {
        fix = this.min;
      }
      this.number = fix;
    },
    minus() {
      if (this.number <= this.min) {
        return;
      }
      this.number--;
    },
    add() {
      if (this.number >= this.max) {
        return;
      }
      this.number++;
    },
    GetNumber() {
      return this.number;
    }
  },
  created() {}
};
</script>
<style scoped>
.counter-component {
  overflow: hidden;
  vertical-align: middle;
}

.counter-show {
  float: left;
}

.counter-show input[type="text"] {
  border: none;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  height: 23px;
  line-height: 23px;
  width: 30px;
  outline: none;
  text-align: center;
  margin-bottom: 0px;
  padding: 0;
  font-size: 15px;
}

.counter-btn {
  border: 1px solid #e3e3e3;
  float: left;
  height: 23px;
  line-height: 23px;
  width: 25px;
  text-align: center;
  cursor: pointer;
}
</style>