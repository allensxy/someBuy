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


// Vue.config.productionTip = false

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
}];
// 创建 router 实例
const router = new VueRouter({
    routes
})

new Vue({
    // 通过 render（） 方法，渲染一个叫 APP 的 .vue 组件
    render: h => h(App),
    router
}).$mount('#app')