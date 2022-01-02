import { loadPrivateMsgAPI, logoutAPI, loadUserLevelAPI } from '../../service/user'
import { loadUserPlayListAPI } from '../../service/playlist'

function initState() {
    return {
        profile: {},
        privateMsg: {},
        playlist: [],
        isLogin: false,
    }
}
export default {
    namespaced: true,
    state: initState(),
    actions: {
        loadUserData({ state, commit }) {
            // 获取用户私信
            loadPrivateMsgAPI().then(res => {
                // console.log(res);
                commit('setPrivateMsg', res)
            })
            // 获取用户列表
            loadUserPlayListAPI(state.profile.userId).then(res => {
                commit('setPlayList', res.playlist)
            })
            loadUserLevelAPI().then(res => {
                commit('setLevel', res.data)
            })
        },
        logout({ commit }) {
            return logoutAPI().then(() => {
                commit('clear')
            })
        }
    },

    mutations: {
        clear(state) {
            const s = initState()
            Object.keys(s).forEach(key => {
                state[key] = s[key]
            })
        },
        setProfile(state, payload) {
            state.profile = payload
            state.isLogin = true
        },
        setPlayList(state, payload) {
            state.playlist = payload
        },
        setPrivateMsg(state, payload) {
            state.privateMsg = payload
        },
        setLevel(state, payload) {
            state.profile['level'] = payload;
        }
    }
}