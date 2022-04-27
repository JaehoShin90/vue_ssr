import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import createRouter from "./router";
import createStore from "./store";

Vue.config.productionTip = false
Vue.prototype.$axios = axios

const router = createRouter();
const store = createStore();

// state 반영
if(window.__INITIAL_STATE__){
  store.replaceState(window.__INITIAL_STATE__)
}

new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')
