import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import { setupElementUI } from './plugins/element'
import * as echarts from 'echarts';

import highlight from 'v-highlight-component';
Vue.use(highlight);
Vue.prototype.$echarts = echarts

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
