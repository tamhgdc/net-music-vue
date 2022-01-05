import { loadPrivateMsgAPI, logoutAPI, loadUserLevelAPI } from '../../service/user'
import { loadUserPlayListAPI, loadPlaylistDetailByIdAPI, loadRecentlyPlayedSongsAPI, loadDailyRemdPlayListAPI } from '../../service/playlist'


function initState() {
    return {
        profile: {},
        privateMsg: {},
        playlist: [],
        likePlayList: {},
        favoritePlaylist: [],
        recommendPlaylist: [],
        isLogin: false,
        level: {},
        recentlyPlayedSongs: [],
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
                const playlist = res.playlist;
                // 获取用户创建的歌单
                commit('setting', { key: 'playlist', payload: playlist.filter(i => i.userId == state.profile.userId && i.specialType == 0) })
                // 获取用户喜欢的音乐
                // const fav = ;
                loadPlaylistDetailByIdAPI((playlist.filter(i => i.userId == state.profile.userId && i.specialType == 5)[0]).id).then(r => {
                    const fav = r.playlist;
                    commit('setting', { key: 'likePlayList', payload: fav })
                    commit('player/setFav', fav.tracks.map(x => x.id), { root: true })
                })

                // fav.

                // 获取用户收藏的歌单
                commit('setting', { key: 'favoritePlaylist', payload: playlist.filter(i => i.userId != state.profile.userId && i.specialType == 0) })
            })
            // 获取用户等级
            loadUserLevelAPI().then(res => {
                commit('setting', { key: 'level', payload: res.data })
            })
            // 获取最近播放歌曲
            loadRecentlyPlayedSongsAPI().then(res => {
                commit('setting', { key: 'recentlyPlayedSongs', payload: res.data.list })
            })
            // 获取专户歌单
            loadDailyRemdPlayListAPI().then(res => {
                console.log(res.recommend);
                commit('setting', { key: 'recommendPlaylist', payload: res.recommend })
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
    },

    getters: {
        getLikePlayListImg(state) {
            return state.likePlayList.coverImgUrl;
        }
    }
}