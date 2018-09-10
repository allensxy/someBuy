import Vue from 'vue';
// 饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// ivew-ui
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

// 图片懒加载插件
import VueLazyload from 'vue-lazyload';
// 懒加载的配置项
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('../assets/img/派大星.gif'),
    loading: require('../assets/img/龙猫.jpg'),
    attempt: 1
});

// 放大镜插件
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)