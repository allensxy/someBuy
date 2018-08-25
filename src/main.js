import Vue from 'vue';
// 路由
import VueRouter from 'vue-router';
// 饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
// 导入日期插件
import moment from 'moment';



// 导入首页的组件
import index from './components/Index';
// 导入商品详情组件
import ProductDetail from './components/ProductDetail';

// Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(ElementUI);

// 图片懒加载插件
import VueLazyload from 'vue-lazyload';
// 懒加载的配置项
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./assets/img/派大星.gif'),
    loading: require('./assets/img/龙猫.jpg'),
    attempt: 1
})


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

Vue.filter('formatDate', function(value) { //格式化时间
    return moment(value).format("YYYY年MM月DD日");
})

new Vue({
    render: h => h(App),
    router
}).$mount('#app')