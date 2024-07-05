import App from './App'


import store from './store' // 引入 Vuex store



// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

import '@/static/css/global.css'

Vue.config.productionTip = false
let token='';
let tokk=0;
let usernameop='小明';
let followsum=0;
let fansname=0;
let myautograph='';
let seex='';
let scchool='';

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