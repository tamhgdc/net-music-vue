import { loadRecentlyPlayedSongsAPI } from '../../service/playlist'
import { loadSongUrlAPI, loadSongDetailAPI } from '../../service/song'

function initState() {
    return {
        myPlayer: new Audio(),
        playlist: [],
        currIndex: 0,
        playState: true,
        currTime: '',
        currId: 0,
        duration: '',
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
            const song = {};
            /* 获取mp3链接 */
            await loadSongUrlAPI(payload).then(r => {
                song.url = r.data[0].url
                song.id = payload
            })
            /* 获取歌曲详情 */
            await loadSongDetailAPI(payload).then(r => {
                song.detail = r.songs[0]
            })
            commit('settingUrl', song)
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
        settingUrl(state, payload) {
            /* 若歌曲已存在 则删除后重新添加 */
            const i = state.playlist.findIndex(x => x.id == payload.id)
            if (i != -1) {
                state.playlist.splice(i, 1)
            }
            /* 将歌曲push进播放列表 */
            state.playlist.push(payload)
            state.currIndex = state.playlist.length - 1

            state.myPlayer.src = state.playlist[state.playlist.length - 1].url
            state.currId = state.playlist[state.playlist.length - 1].id
            state.myPlayer.autoplay = true
            state.playState = true
        },
        play(state) {
            state.playState = true
            state.myPlayer.play()
        },
        pause(state) {
            state.playState = false
            state.myPlayer.pause()
        },
        next(state) {
            state.currIndex = state.currIndex + 1 >= state.playlist.length ? 0 : state.currIndex + 1
            state.myPlayer.src = state.playlist[state.currIndex].url
            state.currId = state.playlist[state.currIndex].id
            state.playState = true
        },
        prev(state) {
            state.currIndex = state.currIndex - 1 < 0 ? state.playlist.length - 1 : state.currIndex - 1
            state.myPlayer.src = state.playlist[state.currIndex].url
            state.currId = state.playlist[state.currIndex].id
            state.playState = true
        }
    },
    getters: {
        /**
         * 获取总时长
         * @param {*} state 
         * @returns 
         */
        getDuration(state) {
            return state.myPlayer.duration
        },
        /**
         * 获取播放时间
         * @param {*} state 
         * @returns 
         */
        getCurrentTime(state) {
            return state.myPlayer.currentTime
        },
        /**
         * 获取播放进度百分比
         * @param {*} state 
         * @returns 
         */
        getPercent(state) {
            return parseInt(state.myPlayer.currentTime / state.myPlayer.duration * 10000) / 100
        },
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