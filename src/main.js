import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import LoadScript from 'vue-plugin-load-script';

Vue.config.productionTip = false
Vue.use(LoadScript);
Vue.use(VueAxios, axios)

new Vue({
  render: h => h(App),
}).$mount('#app')
