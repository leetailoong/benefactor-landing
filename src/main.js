// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import BootstrapVue from 'bootstrap-vue'
import datePicker from 'vue-bootstrap-datetimepicker'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'
import VueAuth from '@websanova/vue-auth'
import moment from 'moment'
import VueMoment from 'vue-moment'
import CxltToastr from 'cxlt-vue2-toastr'
import BackToTop from 'vue-backtotop'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'

import './styles/main.scss'

moment.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: 'MMMM D, YYYY',
    lastWeek: 'MMMM D, YYYY',
    nextWeek: 'MMMM D, YYYY',
    sameElse: 'MMMM D, YYYY'
  }
})

Vue.component('v-icon', Icon)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.use(datePicker)
Vue.use(BackToTop)
Vue.use(VueMoment, moment)
Vue.use(CxltToastr, {
  timeOut: 3000,
  position: 'top right'
})

Vue.config.productionTip = false

Vue.http.options.root = `${[process.env.API_HOST, process.env.API_NAMESPACE].join('/')}`
Vue.http.options.headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

console.log(`${[process.env.API_HOST, process.env.API_NAMESPACE].join('/')}`)

Vue.router = router
Vue.use(VueAuth, {
  auth: require('@/authenticators/jwt.js'),
  http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  tokenDefaultName: 'auth_token',
  refreshData: {
    enabled: false
  },
  fetchData: {
    url: 'token/request/confirm',
    enabled: true
  },
  parseUserData (response) {
    return response
  },
  rolesVar: 'role',
  loginData: {url: 'token', method: 'POST', redirect: '/', fetchUser: true}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  methods: {
    setDefaultHeaders () {
      Vue.http.options.headers = {
        'x-confirm-token': `${process.env.X_TOKEN}`
      }
      console.log(Vue.http.options.headers)
    }
  }
})
