import Vue from 'vue'
// 路由
import VueRouter from 'vue-router'
// 饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
// 导入首页的组件
import index from './components/Index'

// Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(ElementUI);

// 定义路由规则
const routes = [{
    path: '/',
    redirect: '/index'
        // component: index
}, {
    path: '/index',
    component: index
}];
// 创建 router 实例
const router = new VueRouter({
    routes
})

new Vue({
    render: h => h(App),
    router
}).$mount('#app')