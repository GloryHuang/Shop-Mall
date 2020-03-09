<template>
    <div class="chooser-component">
        <ul class="chooser-list">
            <li v-for="(item,index) in selections" :class="{active:index===nowIndex}" @click="chosenSelection(index)">{{item.label}}</li>
        </ul>
    </div>
    </div>
</template>
<script>
export default {

    props: {
        selections: {
            type: Array,
            default: [{
                label: 'test',
                value: 0
            }]
        }
    },
    data() {
        return {
            nowIndex: 0
        }
    },
    methods: {
        chosenSelection(index) {
            this.nowIndex = index;
            this.$emit('on-change', this.selections[index]);
        }
    }

}
</script>
<style scoped>
.chooser-component {
    position: relative;
    display: inline-block;
    margin-top: 15px;
}

.chooser-list{
  font-size: 12px;
}

.chooser-list li {
    display: inline-block;
    border: 1px solid #e3e3e3;
    height: 30px;
    line-height: 30px;
    padding: 0 5px;
    margin: 0 5px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
}

.chooser-list li.active {
    border-color: #FF8C00;
    background: #FF8C00;
    color: #fff;
}
</style>