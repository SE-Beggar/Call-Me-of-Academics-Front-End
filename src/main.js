import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Axios from 'axios';//后台交互
Vue.prototype.$axios=Axios;
//defaults 设置全局默认路径
Axios.defaults.baseURL="http://localhost:8000";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import { setupElementUI } from './plugins/element'
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts

import VueSession from 'vue-session'
Vue.use(VueSession)

import VueCookies from 'vue-cookies'
Vue.use(VueCookies);


Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
