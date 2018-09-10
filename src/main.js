import Vue from 'vue';
import App from './App.vue';

import router from './tools/router'
import store from './tools/vuex'
import './tools/libs'

// 导入日期插件
import moment from 'moment';
// 全局过滤器
Vue.filter('formatDate', function(value, formats) { //格式化时间
    if (formats != undefined) {
        return moment(value).format(formats);
    } else {
        return moment(value).format("YYYY年MM月DD日");
    }
})

Vue.config.productionTip = false;

new Vue({
    // 通过 render（） 方法，渲染一个叫 APP 的 .vue 组件
    render: h => h(App),
    router,
    store,
    // 最高级别的Vue组件(最外层的那个盒子(祖爷爷))
    beforeCreate() {
        this.$axios.get(`site/account/islogin`).then(response => {
            if (response.data.code == "logined") {
                // 登录成功，把登录状态改为 true
                store.state.islogin = true;
            } else {
                // 没有登录
            }
        });
    },
}).$mount('#app')