import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import routes from "./routes"
import stores from "./stores"
import VueRouter from "vue-router"
import VueCookie from 'vue-cookie'

Vue.use(VueRouter)
Vue.use(VueCookie)

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (stores.getters.getLogin == "")
      next("/Login")
    else
      next()

  }
  else if (to.matched.some(record => record.meta.nonAuth)) {
    if (stores.getters.getLogin != "")
      next("/Dashboard")
    else
      next()
  }
  else
    next()
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  router: router,
  store: stores,
  render: h => h(App)
}).$mount('#app')
