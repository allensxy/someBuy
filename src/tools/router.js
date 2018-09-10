import Vue from 'vue';
// 路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 导入首页的组件
import index from '../components/1.Index';
// 导入商品详情组件
import ProductDetail from '../components/2.ProductDetail';
// 导入购物车组件
import ShoppingCart from '../components/3.ShoppingCart';
// 导入订单信息组件
import Login from '../components/4.Login';
// 导入订单信息组件
import Order from '../components/5.Order';
// 导入支付信息组件
import PayOrder from '../components/6.PayOrder';
// 导入支付成功组件
import PaySuccess from '../components/7.PaySuccess';
// 导入会员中心
import VipCenter from '../components/8.VipCenter';
// 导入订单信息组件
import OrderList from '../components/9.OrderList';
// 导入支付订单详情组件
import OrderDetail from '../components/10.OrderDetail';

// 定义路由规则
const routes = [{
    path: '/',
    // 路由重定向
    redirect: '/index'
        // component: index
}, {
    path: '/index', //首页
    component: index
}, {
    path: '/detail/:id', // 商品详情页
    component: ProductDetail
}, {
    path: '/cart', //购物车
    component: ShoppingCart
}, {
    path: '/login', //登录
    component: Login
}, {
    path: '/order/:id', //订单页面
    component: Order,
    // 路由元信息
    meta: {
        isPath: true
    }
}, {
    path: '/payorder/:orderid', //订单详情
    component: PayOrder,
    // 路由元信息
    meta: {
        isPath: true
    }
}, {
    path: '/paysuccess/:id', //支付成功
    component: PaySuccess,
    // 路由元信息
    meta: {
        isPath: true
    }
}, {
    path: '/vipcenter', //会员中心
    component: VipCenter,
    // 路由元信息
    meta: {
        isPath: true
    }
}, {
    path: '/orderlist', //交易订单
    component: OrderList,
    // 路由元信息
    meta: {
        isPath: true
    }
}, {
    path: '/orderdetail/:id', //支付订单详情
    component: OrderDetail,
    // 路由元信息
    meta: {
        isPath: true
    }
}];

// 创建 router 实例
const router = new VueRouter({
    routes
});

// 全局导入 axios
import axios from 'axios';
//让ajax携带cookie
// 跨域请求时 是否会携带 凭证(cookie)
axios.defaults.withCredentials = true;
// 抽取为全局基地址
axios.defaults.baseURL = "http://47.106.148.205:8899";
// axios.defaults.baseURL = "http://47.106.148.205:8899";
// 增加到 Vue 的原型中
Vue.prototype.$axios = axios;

// 导航守卫（路由守卫）
router.beforeEach((to, from, next) => {
    // to 是要去什么地方
    // console.log(to);
    // from 从哪个页面过来
    // console.log(from);
    // store.commit('changeFromPath', from.path);

    // 如果访问的页面是 order 页面，就判断登录。这种只能一个一个判断，比较low
    // if (to.path.indexOf('/order/') != -1) {

    // 使用比较高级的 路由元信息 来实现
    if (to.meta.isPath == true) {
        // 请求登录接口
        axios.get(`site/account/islogin`).then(response => {
            if (response.data.code != "nologin") {
                // 登录成功后。放行
                next();
            } else {
                next('/login');
            }
        });
    } else {
        // 否则就放行
        next();
    }
})

// 导出
export default router;