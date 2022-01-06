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
                    commit('addUrl', r[0].url)
                })
            })
        },
        async playById({ commit }, payload) {
            const song = { isFav: false };
            if (!payload) return
            console.log(payload);
            /* 获取mp3链接 */
            await loadSongUrlAPI(payload).then(r => {
                song.url = r.data[0].url
                song.id = payload
            })
            /* 获取歌曲详情 */
            await loadSongDetailAPI(payload).then(r => {
                song.detail = r.songs[0]
            })
            commit('addUrl', song)
        },
        /**
         * 播放所有歌曲
         * @param {*} param0 
         * @param {*} payload 
         */
        playAllBySongs({ state, commit, dispatch }, payload) {
            const songs = payload.reduce((p, c) => {
                // console.log(c);
                const song = {}
                song.isFav = false
                song.detail = c
                song.id = c.id
                if (c.noCopyrightRcmd == null && state.playlist.findIndex(y => c.id == y.id) == -1)
                    return p.concat(song)
                else
                    return p
            }, [])
            // console.log(songs)
            if (songs.length > 0) {
                commit('addUrls', songs)
                dispatch('playById', songs[0].id);
            }
        },
        /**
         * 播放全部
         * @param {*} payload 歌单ID
         */
        playAllByPlaylistId({ state, commit, dispatch }, payload) {
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
            //     commit('addUrls', songs.reverse())
            // })
            /*
                方案二：抽离获取音乐地址的功能，播放时候判断，url是否存在，存在播放，否则先获取再播放
                    优点：一劳永逸
                    缺点：来回调绕晕了，一会commit 一会dispatch

                    !!! noCopyrightRcmd !!! 大坑，无版权
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
                    if (res.songs[i].noCopyrightRcmd == null && state.playlist.findIndex(y => res.songs[i].id == y.id) == -1)
                        return p.concat(song)
                    else
                        return p
                }, [])
                // console.log(songs)
                if (songs.length > 0) {
                    commit('addUrls', songs)

                    dispatch('playById', songs[0].id);
                }

            })
        },

        /**
         * 刷新播放时间
         * @param {*} state 
         */
        updateTime({ commit, state, dispatch }) {
            if (state.myPlayer.duration == state.myPlayer.currentTime) {
                dispatch('next')
            }
            commit("setting", { duration: state.myPlayer.duration, currTime: state.myPlayer.currentTime, percent: state.myPlayer.currentTime / state.myPlayer.duration * 100 })
        },
        /**
         * 通过ID删除播放列表歌曲
         * @param {*} param0 
         * @param {*} payload 
         */
        removeById({ commit, dispatch }, payload) {

            // 获取要删除的索引位置

            // 如果要删除当前播放的歌曲，就先切换到下一曲然后删除
            console.log('触发删除');

            commit('delSongById', payload)
            dispatch('next')

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
        next({ state, dispatch }) {
            let currIndex = state.currIndex
            if (state.mode) {
                // 随机播放模式 ? 排除当前播放歌曲
                // state.currIndex = Math.floor(Math.random() * state.playlist.length)

                // 获取除播放歌曲外的其他歌曲放入数组
                const arr = state.playlist.filter(x => x.id != state.currId)
                // 获取该数组的随机元素
                const target = arr[Math.floor(Math.random() * arr.length)]
                // 获取随机元素位于原数组的位置
                currIndex = state.playlist.findIndex(x => x.id == target.id)

            } else {
                currIndex = state.currIndex + 1 >= state.playlist.length ? 0 : state.currIndex + 1
            }
            dispatch('operate', {
                currIndex,
                curr: state.playlist[currIndex],
                playState: true,
            })
        },
        /**
         * 播放列表上一曲
         * @param {*} state 
         */
        prev({ state, dispatch }) {
            const currIndex = state.currIndex - 1 < 0 ? state.playlist.length - 1 : state.currIndex - 1
            const payload = {
                currIndex,
                curr: state.playlist[currIndex],
                playState: true,
            }
            dispatch('operate', { currIndex, payload })
        },
        /**
         * 上一曲下一曲操作
         * @param {*} param0 
         * @param {*} param1 
         */
        operate({ state, commit, dispatch }, { currIndex, payload }) {
            // 判断当前播放的歌曲是否有播放地址
            if (state.playlist[currIndex].url) {
                // 若有，直接播放
                commit('setPlayerUrl', {
                    currIndex,
                    url: state.playlist[currIndex].url
                })
            } else {
                // 若无，调用 getUrl获取播放地址
                dispatch('getUrl', currIndex)
            }
            // 绑定信息
            commit('setting', payload)
        },
        /**
         * 获取歌曲url
         * @param {*} param0 
         * @param {*} payload 
         */
        async getUrl({ state, commit }, payload) {
            await loadSongUrlAPI(state.playlist[payload].id).then(res => {
                // 获取到歌曲url后 调setPlayerUrl切换播放歌曲
                commit('setPlayerUrl', { currIndex: payload, url: res.data[0].url })
            })
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
                    if (payload[key])
                        state.myPlayer.play()
                    else
                        state.myPlayer.pause()
                }
                state[key] = payload[key]
            }
        },
        /**
         * 添加播放地址
         * @param {*} state 
         * @param {*} payload 
         */
        addUrl(state, payload) {
            /* 若歌曲已存在 则删除后重新添加 */
            const i = state.playlist.findIndex(x => x.id == payload.id)
            if (i == -1) {
                /* 将歌曲push进播放列表 */
                state.playlist.unshift(payload)
            } else {
                state.playlist[i] = payload
            }
            state.currIndex = i == -1 ? 0 : i
            state.myPlayer.src = state.playlist[state.currIndex].url
            state.curr = state.playlist[state.currIndex];
            state.myPlayer.autoplay = true
            state.playState = true
        },
        /**
         * 批量添加播放地址
         * @param {*} state 
         * @param {*} payload 
         */
        addUrls(state, payload) {
            console.log(payload);
            state.playlist = state.playlist.concat(payload)
            // state.currIndex = 0
            // state.myPlayer.src = state.playlist[0].url
            state.myPlayer.autoplay = true
            // state.curr = state.playlist[0];
            // state.playState = true
        },
        /**
         * 设置播放器地址
         * @param {*} state 
         * @param {*} payload 
         */
        setPlayerUrl(state, { url, currIndex }) {
            state.myPlayer.src = url
            state.playlist[currIndex].url = url
            state.curr = state.playlist[currIndex];
            state.currIndex = currIndex
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
        delSongById(state, payload) {
            // 判断删除的是不是当前正在播放的
            const i = state.playlist.findIndex(x => x.id == payload)
            state.playlist.splice(i, 1)
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