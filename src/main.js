import App from './App.vue'
import Vue from 'vue'
import Vuex from 'vuex'
import Vant from 'vant'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import router from './router'
import store from './store';

import 'vant/lib/index.css'
import 'vant/lib/index.less';
import './assets/icon/iconfont.css'
import 'swiper/css/swiper.min.css'



Vue.use(Vant);
Vue.use(Vuex)
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')