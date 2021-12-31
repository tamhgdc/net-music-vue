import App from './App.vue'
import Vue from 'vue'
import Vuex from 'vuex'
import Vant from 'vant'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import router from './router'
import { loadPrivateMsgAPI } from './service/user'


import 'vant/lib/index.css'
import 'vant/lib/index.less';
import './assets/icon/iconfont.css'
import 'swiper/css/swiper.min.css'



Vue.use(Vant);
Vue.use(Vuex)
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false

const store = new Vuex.Store({
    state: {
        userProfile: {},
        userPlaylist: {},
        userPrivateMsg: {},
    },
    actions: {
        loadPrivateMsg({ commit }) {
            loadPrivateMsgAPI().then(res => {
                // console.log(res);
                commit('setPrivateMsg', res)
            })
        }
    },
    mutations: {
        clear() {

        },
        setProfile(state, payload) {
            state.userProfile = payload;
        },
        setPrivateMsg(state, payload) {
            state.userPrivateMsg = payload;
        }
    },
    modules: {},
    getters: {},
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')