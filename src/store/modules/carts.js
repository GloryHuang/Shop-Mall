import Vue from 'vue'





//每次刚进入网站,肯定会调用main.js在刚调用的时候,先从本地存储中,把 购物车的数据读出来放到store中
// var car = JSON.parse(localStorage.getItem('shopCartList') || '[]')
// var ckm = JSON.parse(localStorage.getItem('checkModel') || '[]')
// var odl = JSON.parse(localStorage.getItem('orderList') || '{"order":[]}')

const state = {// this.$store.state.***
    // shopCartList: car,
    // checkModel: ckm,
    // orderList: odl
    shopCartList: JSON.parse(localStorage.getItem('shopCartList') || '[]'),
    checkModel: JSON.parse(localStorage.getItem('checkModel') || '[]'),
    orderList: JSON.parse(localStorage.getItem('orderList') || '{"order":[]}')
}

const mutations = {// this.$store.commit('方法的名称', '按需传递唯一的参数')
    addToCar(state, goodInfo) {
        var flag = false;

        state.shopCartList.some(item => {
            if (item.goodsId == goodInfo.goodsId) {
                item.buyNum += parseInt(goodInfo.buyNum)
                // Vue.set(item, 'buyNum', item.buyNum + parseInt(goodInfo.buyNum))
                flag = true
                return true
            }

        })
        if (!flag) {
            state.shopCartList.push(goodInfo);
        }
        // 当更新 shopCarList之后,把shopCarList数组,存储到本地的localStorage中
        localStorage.setItem('shopCartList', JSON.stringify(state.shopCartList))
    },
    updateGoodInfo(state, goodInfo) {
        state.shopCartList.some(item => {

            if (item.id == goodInfo.id &&
                item.buyColor.cid == goodInfo.cid &&
                item.buyCapacity.sid == goodInfo.sid) {
                item.buyNum = parseInt(goodInfo.buyNum)
                // Vue.set(item, 'buyNum', parseInt(goodInfo.buyNum))
                // _this.$set(item, item.buyNum, parseInt(goodInfo.buyNum))
                // console.log(_this, 'this')
                return true
            }
        })
        localStorage.setItem('shopCartList', JSON.stringify(state.shopCartList))
    },
    updataChecked(state, goodInfo) {
        // console.log(goodInfo, 'gpp')
        state.shopCartList.some(item => {
            if (item.goodsId == goodInfo.goodsId) {
                item.checked = goodInfo.checked
                // Vue.set(item, 'checked', goodInfo.checked)

            }

        })
        localStorage.setItem('shopCartList', JSON.stringify(state.shopCartList))
    },

    updataAllChecked(state, status) {
        if (status) {
            state.shopCartList.forEach(item => {
                item.checked = true
                // Vue.set(item, 'checked', true)
            })
        } else {
            state.shopCartList.forEach(item => {
                item.checked = false
                // Vue.set(item, 'checked', false)
            })
        }
        localStorage.setItem('shopCartList', JSON.stringify(state.shopCartList))
    },
    updateCheckModel(state, checkArr) {

        state.checkModel = checkArr
        // Vue.set(state, 'checkModel', checkArr)
        // state.checkModel = Object.assign({}, checkArr);
        localStorage.setItem('checkModel', JSON.stringify(state.checkModel))

    },
    deleteFromCar(state, goodInfo) {
        state.shopCartList.some((item, index) => {
            // 根据Id，从store 中的购物车中删除对应的那条商品数据
            if (item.goodsId == goodInfo.goodsId) {
                state.shopCartList.splice(index, 1)
                return true
            }
        })
        // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
        localStorage.setItem('shopCartList', JSON.stringify(state.shopCartList))

    },
    deleteFromCheckModel(state, i) {
        state.checkModel.forEach((item, index) => {
            if (i == index) {
                state.checkModel.splice(index, 1);
                return true
            }
        })
        localStorage.setItem('checkModel', JSON.stringify(state.checkModel))
    },
    getOrderList(state, totalMoney) {

        state.shopCartList.forEach(item => {
            if (item.checked) {
                state.orderList.order.push(item);
                state.orderList.totalMoney = totalMoney;
                // Vue.set(state.orderList, 'totalMoney', totalMoney)
            }
        })

        localStorage.setItem('orderList', JSON.stringify(state.orderList))
        localStorage.setItem('shopCartList', JSON.stringify(state.shopCartList))

    },

    PAY_FOR(state) {
        state.shopCartList = state.shopCartList.filter(item => {
            return item.checked == false
        })
        state.orderList = [];
        localStorage.removeItem('orderList')
        state.checkModel = [];
        localStorage.setItem('checkModel', JSON.stringify(state.checkModel))
        localStorage.setItem('shopCartList', JSON.stringify(state.shopCartList))
    }

}
const actions = {
    getOrder({ commit }, order) {
        commit('getOrderList', order)
    }
}
const getters = { // this.$store.getters.***
    //相当于 计算属性 ,也相当于 filters


    getAllCount(state) {
        if (!state.shopCartList) {
            return
        }
        return state.shopCartList.length;
    },


    getCheckAmount(state) {
        var Amount = 0;
        state.shopCartList.forEach(item => {
            if (item.checked) {
                Amount += item.buyNum
            }
        })
        return Amount
    }



    // getShopListLength(state) {
    //     if (!state.shopCartList) {
    //         return
    //     }
    //     return state.shopCartList.length
    // }


}


export default {
    state,
    mutations,
    actions,
    getters

}