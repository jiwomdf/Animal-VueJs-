import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Routes from "./routes"
import State from "./state"
import VueRouter from "vue-router"
import VueCookie from 'vue-cookie'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(VueRouter)
Vue.use(VueCookie)
Vue.use(Vuex)

const router = new VueRouter({ routes: Routes })
const store = new Vuex.Store({
  state: State,
  mutations: {},
  actions: {},
  getters: {},
  plugins: [createPersistedState({
    key: 'auth',
    storage: window.localStorage
  })]

})

Vue.config.productionTip = false


new Vue({
  vuetify,
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')
