import App from './App'


import store from './store' // 引入 Vuex store



// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

import '@/static/css/global.css'

Vue.config.productionTip = false

Vue.prototype.$authentication = {  
  sharedData: []  
};
Vue.prototype.$popg = {  
  sharedData: null  
};

App.mpType = 'app'
const app = new Vue({
	store, 
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
	
  }
}
// #endif