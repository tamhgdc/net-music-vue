import { loadRecentlyPlayedSongsAPI } from '../../service/playlist'
import { loadSongUrlAPI, loadSongDetailAPI } from '../../service/song'

function initState() {
    return {
        myPlayer: new Audio(),
        playlist: [],
        currIndex: 0,
        playState: false,
        currTime: '00:00',
        currId: 0,
        curr: {},
        duration: '00:00',
        percent: 0,
        favList: [],
    }
}
export default {
    namespaced: true,
    state: initState(),
    actions: {
        initPlayer({ commit }) {
            // 获取最近播放歌曲
            loadRecentlyPlayedSongsAPI().then(res => {
                commit('setting', { key: 'recentlyPlayedSongs', payload: res.data.list })
                loadSongUrlAPI(res.data.list[0].data.id).then(r => {
                    commit('settingUrl', r[0].url)
                })
            })
        },
        async playById({ commit }, payload) {
            const song = { isFav: false };
            /* 获取mp3链接 */
            await loadSongUrlAPI(payload).then(r => {
                song.url = r.data[0].url
                song.id = payload
            })
            /* 获取歌曲详情 */
            await loadSongDetailAPI(payload).then(r => {
                song.detail = r.songs[0]
            })
            if (song.url == null) return

            commit('settingUrl', song)
        },
        /**
         * 刷新播放时间
         * @param {*} state 
         */
        updateTime({ commit, state }) {
            state.duration = state.myPlayer.duration
            state.currTime = state.myPlayer.currentTime

            if (state.myPlayer.duration == state.myPlayer.currentTime) {
                commit('next')
            }
            commit("setTime", { d: state.myPlayer.duration, c: state.myPlayer.currentTime })
        },
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
        /**
         * 添加播放地址
         * @param {*} state 
         * @param {*} payload 
         */
        settingUrl(state, payload) {
            /* 若歌曲已存在 则删除后重新添加 */
            const i = state.playlist.findIndex(x => x.id == payload.id)
            if (i != -1) {
                state.playlist.splice(i, 1)
            }
            /* 将歌曲push进播放列表 */
            state.playlist.unshift(payload)
            state.currIndex = 0
            state.myPlayer.src = state.playlist[0].url
            state.currId = state.playlist[0].id
            state.myPlayer.autoplay = true
            state.curr = state.playlist[0];
            state.playState = true
        },
        /**
         * 播放
         * @param {*} state 
         */
        play(state) {
            state.playState = true
            state.myPlayer.play()
        },
        /**
         * 暂停
         * @param {*} state 
         */
        pause(state) {
            state.playState = false
            state.myPlayer.pause()
        },
        /**
         * 播放列表下一曲
         * @param {*} state 
         */
        next(state) {
            state.currIndex = state.currIndex + 1 >= state.playlist.length ? 0 : state.currIndex + 1
            state.myPlayer.src = state.playlist[state.currIndex].url
            state.currId = state.playlist[state.currIndex].id
            state.curr = state.playlist[state.currIndex]
            state.playState = true
        },
        /**
         * 播放列表上一曲
         * @param {*} state 
         */
        prev(state) {
            state.currIndex = state.currIndex - 1 < 0 ? state.playlist.length - 1 : state.currIndex - 1
            state.myPlayer.src = state.playlist[state.currIndex].url
            state.currId = state.playlist[state.currIndex].id
            state.curr = state.playlist[state.currIndex]
            state.playState = true
        },
        /**
         * 刷新播放时间
         * @param {*} state 
         */
        setTime(state, payload) {
            state.duration = payload.d
            state.currTime = payload.c
            state.percent = state.myPlayer.currentTime / state.myPlayer.duration * 100
        },
        /**
         * 滚动条百分比设置播放进度
         * @param {*} state 
         * @param {*} payload 
         */
        setPosition(state, payload) {
            state.myPlayer.currentTime = state.myPlayer.duration * payload
            state.currTime = state.myPlayer.currentTime
        },
        /**
         * 登录后设置歌曲喜欢状态
         * @param {*} state 
         * @param {*} payload 
         */
        //TODO： 歌曲喜欢功能
        setFav(state, payload) {
            payload.forEach(x => {
                const fav = state.playlist.find(y => {
                    return y.id == x
                })
                if (fav) fav.isFav = true
            })
        }
    },
    getters: {
        /**
         * 获取当前播放歌曲的ID
         * @param {*} state 
         * @returns 
         */
        currId(state) {
            return state.playlist[state.currIndex] ? state.playlist[state.currIndex].id : false
        },
    }
}