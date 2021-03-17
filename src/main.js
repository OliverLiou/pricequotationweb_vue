/* eslint-disable no-unused-vars */

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import moment from "vue-moment";
import * as BomApi from "./api/Bom";
import * as OppoApi from "./api/Oppo";
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
// import vxeModal from 'vxe-table/packages/modal'

import 'core-js/stable'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

VXETable.setup({
  zIndex: 1100 // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡
})

// fontawesome全域註冊
library.add(fas)
dom.watch()

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(axios);
Vue.use(moment);
Vue.config.productionTip = false
Vue.use(BomApi);
Vue.use(VXETable)

Vue.prototype.$Moment = moment
Vue.prototype.$BomApi = BomApi
Vue.prototype.$OppoApi = OppoApi
Vue.prototype.$vxeModal = VXETable.modal
Vue.prototype.$axios = axios


new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
