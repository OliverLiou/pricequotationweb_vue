
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import moment from "vue-moment";
import VModal from 'vue-js-modal'
import * as BomApi from "./api/Bom";
import * as OppoApi from "./api/Oppo";

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import vxeModal from 'vxe-table/packages/modal'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(axios);
Vue.use(moment);
Vue.config.productionTip = false
Vue.use(VModal)
Vue.use(BomApi);
Vue.use(VXETable)
Vue.use(vxeModal)

Vue.prototype.$Moment = moment
Vue.prototype.$BomApi = BomApi
Vue.prototype.$OppoApi = OppoApi
Vue.prototype.$VModal = VModal
Vue.prototype.$vxeModal = vxeModal
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
