import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Routes from "./routes";
import VueRouter from "vue-router";
import VueCookie from 'vue-cookie';


const router = new VueRouter({ routes: Routes });
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueCookie)

new Vue({
  vuetify,
  router: router,
  render: h => h(App)
}).$mount('#app')
