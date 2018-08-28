import Vue from 'vue';
// 路由
import VueRouter from 'vue-router';
import App from './App.vue'

Vue.use(VueRouter);

// 导入日期插件
import moment from 'moment';
// 全局过滤器
Vue.filter('formatDate', function(value) { //格式化时间
    return moment(value).format("YYYY年MM月DD日");
})

// 饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// ivew-ui
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// 全局导入 axios
import axios from 'axios';
// 抽取为全局基地址
axios.defaults.baseURL = "http://47.106.148.205:8899";
// 增加到 Vue 的原型中
Vue.prototype.$axios = axios;

// 图片懒加载插件
import VueLazyload from 'vue-lazyload';
// 懒加载的配置项
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./assets/img/派大星.gif'),
    loading: require('./assets/img/龙猫.jpg'),
    attempt: 1
})

// 放大镜插件
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

// 导入首页的组件
import index from './components/Index';
// 导入商品详情组件
import ProductDetail from './components/ProductDetail';
import ShoppingCart from './components/ShoppingCart';

// 定义路由规则
const routes = [{
    path: '/',
    // 路由重定向
    redirect: '/index'
        // component: index
}, {
    path: '/index',
    component: index
}, {
    path: '/detail/:id',
    component: ProductDetail
}, {
    path: '/cart',
    component: ShoppingCart
}];
// 创建 router 实例
const router = new VueRouter({
    routes
})

// 整合 Vuex 统一进行数据管理
import Vuex from 'vuex'
Vue.use(Vuex);
// 实例化一个管理数据状态的 仓库，用来保存数据
// 实例化 vue 的时候 也需要传入 仓库对象
const store = new Vuex.Store({
    // 这里就是 全局都可以用使用的 数据
    state: {
        // 读取数据，如果没有就是一个空对象
        cartCount: JSON.parse(window.localStorage.getItem('goodkey')) || {}
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
            // 更新操作，直接替换原来的数据
            state.cartCount[goodsInfo.productId] = goodsInfo.goodsNum;
        },
        // 删除购物车的商品
        deteleCart(state, id) {
            // delete 删除的属性不会触发视图更新
            // delete state.cartCount[id];
            // 需要调用Vue.delete方法才可以
            Vue.delete(state.cartCount, id)
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



Vue.config.productionTip = false

new Vue({
    // 通过 render（） 方法，渲染一个叫 APP 的 .vue 组件
    render: h => h(App),
    router,
    store
}).$mount('#app')