import { loadPrivateMsgAPI, logoutAPI, loadUserLevelAPI } from '../../service/user'
import { loadUserPlayListAPI, loadLikePlayListAPI } from '../../service/playlist'
import { loadSongDetailAPI } from '../../service/song'

function initState() {
    return {
        profile: {},
        privateMsg: {},
        playlist: [],
        isLogin: false,
        likePlayList: [],
        level: {}
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
                commit('setting', { key: 'privateMsg', payload: res })
            })
            // 获取用户播放列表
            loadUserPlayListAPI(state.profile.userId).then(res => {
                commit('setting', { key: 'playlist', payload: res.playlist })
            })
            // 获取用户等级
            loadUserLevelAPI().then(res => {
                commit('setting', { key: 'level', payload: res.data })
            })
            // 获取用户喜欢的音乐
            loadLikePlayListAPI().then(res => {
                loadSongDetailAPI(res.ids).then(r => {
                    commit('setting', {
                        key: 'likePlayList',
                        payload: r.map(x => x.songs[0])
                    })
                })
                // loadPlaylistByIdAPI(res.ids).then(r => {
                //     commit('setting', { key: 'likePlayList', payload: r.filter(i => i != 'error') })
                // })

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
        setting(state, { key, payload }) {
            state[key] = payload
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
        },
    }
}