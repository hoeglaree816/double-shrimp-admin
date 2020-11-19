import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import JsonExcel from 'vue-json-excel'
import VDistpicker from 'v-distpicker'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
//导出excel模块
Vue.component('downloadExcel', JsonExcel);
Vue.component('v-distpicker', VDistpicker);