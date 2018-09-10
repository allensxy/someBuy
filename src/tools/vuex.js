import Vue from 'vue';
// 整合 Vuex 统一进行数据管理
import Vuex from 'vuex';
Vue.use(Vuex);
// 实例化一个管理数据状态的 仓库，用来保存数据
// 实例化 vue 的时候 也需要传入 仓库对象
const store = new Vuex.Store({
    // 这里就是 全局都可以用使用的 数据
    state: {
        // 读取数据，如果没有就是一个空对象
        cartCount: JSON.parse(window.localStorage.getItem('goodkey')) || {},
        // 判断是否登录
        islogin: false,
        fromPath: ""
    },
    // 这个是暴露的修改方法
    mutations: {
        // 统计商品件数方法
        addCart(state, goodsInfo) {
            // 如果对象等于 undefined 就是添加
            if (state.cartCount[goodsInfo.productId] == undefined) {
                // 直接增加这个属性即可 这种方法增加的属性 Vue不会跟踪修改
                // state.cartCount[goodsInfo.productId] = goodsInfo.goodsNum;

                // 为了要让Vue检测到数据的改变同步修改页面显示 需要调用Vue.set方法
                Vue.set(state.cartCount, goodsInfo.productId, goodsInfo.goodsNum);
            } else {
                // 否则就是计数
                state.cartCount[goodsInfo.productId] += goodsInfo.goodsNum;
            }
        },
        // 更新购物车件数的方法
        updateCart(state, goodsInfo) {
            state.cartCount[goodsInfo.productId] = goodsInfo.goodsNum;
        },
        // 删除购物车的商品
        deteleCart(state, id) {
            // delete 删除的属性不会触发视图更新
            // delete state.cartCount[id];

            // 需要调用Vue.delete方法才可以
            Vue.delete(state.cartCount, id);
        },
        // 判断登录的状态
        changeLoginStatus(state, islogin) {
            state.islogin = islogin
        },
        // 拿到从哪个地方来的路径
        changeFromPath(state, fromPath) {
            state.fromPath = fromPath
        }
    },
    // getters vuex的计算属性
    getters: {
        goodsCount: state => {
            let num = 0;
            for (const key in state.cartCount) {
                num += state.cartCount[key];
            }
            return num;
        }
    }
});

// 当浏览器关闭的时候保存数据
window.onbeforeunload = function() {
    window.localStorage.setItem('goodkey', JSON.stringify(store.state.cartCount));
}

// 导出
export default store;