import Vue from 'vue'
import '../public/static/css/reset.css'
import App from './App.vue';
import 'amfe-flexible';
import globalFilter from '@/common/filter/globalFilter'; // 过滤器
import * as commonfns from '@/common/fn/commonfn.js'; //公共方法

import storage from '@/utils/storage';
import api from '@/api/apiUrlList';

import service, {postPromise} from '@/api/request.js';

import store from '@/store';
import {router} from './router';

import initRouterGuard from '@/router/routerGuard.js';

import 'vant/lib/index.css';
import '@/assets/css/common.css';
import '@/assets/css/snm-animate.css';
import VConsole from 'vconsole';
import { Toast } from 'vant';

//全局自定义指令
import Directives from "@/common/directives/index";
//全局组件
import layout from "@/components/layout";

Vue.use(layout);
//axios 请求拦截
const axiosIntercept = service(vm);
//路由守卫 路由拦截
initRouterGuard(api, axiosIntercept, router);

Vue.prototype.$api = api;
Vue.prototype.$ajax = axiosIntercept;
Vue.prototype.$storage = storage;
Vue.prototype.$postPromise = postPromise;
Vue.prototype.$toast = Toast;
Vue.prototype.$fn = window.$fn = commonfns;    //公共方法
//监听页面返回
window.addEventListener('popstate', function () {
    router.isBack = true;
}, false);
// 装载全局过滤器
Object.keys(globalFilter).forEach(key => {
    Vue.filter(key, globalFilter[key]);
});
if (window.navigator.userAgent.match(/APICloud/i)) {
    window.apiready = function () {
        // 将API链接Vue原型，后续通过this.$APICLOUD代替window.api
        Vue.prototype.$apicloud = window.api;
    };
} else {
    Vue.prototype.$apicloud = null;
}

Vue.use(Directives);
Vue.config.productionTip = false;
vm = new Vue({
    router,
    store,
    render: h => h(App),
    data:{
        eventHub:new Vue()
    }
}).$mount('#app');

