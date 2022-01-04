import { loadPlaylistAllSongByIdAPI, loadRecentlyPlayedSongsAPI } from '../../service/playlist'
import { loadSongUrlAPI, loadSongDetailAPI } from '../../service/song'

function initState() {
    return {
        myPlayer: new Audio(),
        playlist: [],
        randList: [],
        normalList: [],
        currIndex: 0,
        playState: false,
        currTime: '00:00',
        currId: 0,
        curr: {},
        duration: '00:00',
        percent: 0,
        favList: [],
        mode: false,
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
            if (!payload) return
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
         * 播放全部
         * @param {*} payload 歌单ID
         */
        playAllByPlaylistId({ state, commit }, payload) {
            /*
                方案一： 多并发一次行加载所有歌曲信息mp3地址
                    缺点：慢，而且由于超时问题，400首歌曲只能获取到一半
            */
            // loadPlaylistAllSongByIdAPI(payload).then(async res => {
            //     // console.log(state, commit)
            //     const r = await loadSongsUrlAPI(res.songs, "id")
            //     // console.log(r);
            //     const songs = r.reduce((p, c, i) => {
            //         if (c == "error") return p
            //         // console.log(c);
            //         const song = {}
            //         song.isFav = false
            //         song.detail = res.songs[i]
            //         song.id = res.songs[i].id
            //         song.url = c.data[0].url
            //         if (song.url != null && state.playlist.findIndex(y => res.songs[i].id == y.id) == -1)
            //             return p.concat(song)
            //         else
            //             return p
            //     }, [])
            //     // console.log(songs)
            //     commit('settingUrls', songs.reverse())
            // })
            /*
                方案二：抽离获取音乐地址的功能，播放时候判断，url是否存在
            */
            loadPlaylistAllSongByIdAPI(payload).then(async res => {
                // console.log(state, commit)
                // const r = await loadSongsUrlAPI(res.songs, "id")
                // console.log(r);
                const songs = res.songs.reduce((p, c, i) => {
                    // console.log(c);
                    const song = {}
                    song.isFav = false
                    song.detail = res.songs[i]
                    song.id = res.songs[i].id
                    if (state.playlist.findIndex(y => res.songs[i].id == y.id) == -1)
                        return p.concat(song)
                    else
                        return p
                }, [])
                // console.log(songs)
                commit('settingUrls', songs.reverse())
            })
        },
        /**
         * 
         * @param {*} param0 
         * @param {*} payload 
         */
        getUrl({ state, commit }) {
            loadSongUrlAPI(state.playlist[state.currIndex].id).then(res => {
                commit('setUrl', res.data.url)
            })
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
        /**
         * 通过ID删除播放列表歌曲
         * @param {*} param0 
         * @param {*} payload 
         */
        removeById({ state, commit }, payload) {
            // 获取要删除的索引位置
            const i = state.playlist.findIndex(x => x.id == payload)
            // 如果要删除当前播放的歌曲，就先切换到下一曲然后删除
            if (payload == state.currId) commit("next")
            commit('delSongByIndex', i)
        },
        /**
         * 播放
         * @param {*} state 
         */
        play({ commit }) {
            commit("setting", { playState: true })
        },
        /**
         * 暂停
         * @param {*} state 
         */
        pause({ commit }) {
            commit("setting", { playState: false })
        },
        /**
         * 播放列表下一曲
         * @param {*} state 
         */
        next({ state, commit, dispatch }) {
            const payload = {};
            if (state.mode) {
                // 随机播放模式 ? 排除当前播放歌曲
                // state.currIndex = Math.floor(Math.random() * state.playlist.length)

                // 获取除播放歌曲外的其他歌曲放入数组
                const arr = state.playlist.filter(x => x.id != state.currId)
                // 获取该数组的随机元素
                const target = arr[Math.floor(Math.random() * arr.length)]
                // 获取随机元素位于原数组的位置
                payload.currIndex = state.playlist.findIndex(x => x.id == target.id)

            } else {
                payload.currIndex = state.currIndex + 1 >= state.playlist.length ? 0 : state.currIndex + 1
            }
            if (state.playlist[state.currIndex].url) {
                commit('setPlayerUrl', state.playlist[state.currIndex].url)
                payload.currId = state.playlist[state.currIndex].id
                payload.curr = state.playlist[state.currIndex]
                payload.playState = true
            } else {
                dispatch('getUrl', state.currIndex)
            }

            commit("setting", payload)
        },
        /**
         * 播放列表上一曲
         * @param {*} state 
         */
        prev({ state, commit }) {
            console.log(state.playlist, state.playlist[state.currIndex]);
            const currIndex = state.currIndex - 1 < 0 ? state.playlist.length - 1 : state.currIndex - 1
            const payload = {
                currIndex,
                currId: state.playlist[currIndex].id,
                curr: state.playlist[currIndex],
                playState: true,
            }
            commit('setting', payload)
            commit('setPlayerUrl', state.playlist[currIndex].url)
        },

    },

    mutations: {
        clear(state) {
            const s = initState()
            Object.keys(s).forEach(key => {
                state[key] = s[key]
            })
        },
        setting(state, payload) {
            for (const key in payload) {
                if (key == "playState") {
                    if (state[key])
                        state.myPlayer.play()
                    else
                        state.myPlayer.pause()
                }
                state[key] = payload
            }
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
         * 批量添加播放地址
         * @param {*} state 
         * @param {*} payload 
         */
        settingUrls(state, payload) {
            console.log(payload);
            state.playlist = state.playlist.concat(payload)
            state.currIndex = 0
            state.myPlayer.src = state.playlist[0].url
            state.currId = state.playlist[0].id
            state.myPlayer.autoplay = true
            state.curr = state.playlist[0];
            state.playState = true
        },

        setPlayerUrl(state, payload) {
            state.myPlayer.src = payload
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
        },
        /**
         * 删除歌曲
         * @param {*} state 
         * @param {*} payload 
         */
        delSongByIndex(state, payload) {
            // 判断删除的是不是当前正在播放的
            state.playlist.splice(payload, 1)
        },
        /**
         * 切换播放模式
         * @param {*} state 
         */
        changeMode(state) {
            state.mode = !state.mode
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