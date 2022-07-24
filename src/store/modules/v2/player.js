import { loadPlaylistAllSongByIdAPI, loadRecentlyPlayedSongsAPI } from '../../service/playlist'
import { loadSongUrlAPI, loadSongDetailAPI } from '../../service/song'

function initState() {
    return {
        player: new Audio(),
        playlist: [],
        randList: [],
        currIndex: 0,
        playState: false,
        curr: {},
        currTime: '00:00',
        duration: '00:00',
        percent: 0,
        mode: false,
    }
}

const actions = {
  play({commit}){
    commit("PLAY")
  },
  next({commit}){
    commit("OPERATE",false)
  },
  prev(){
    commit("OPERATE",true)
  },
}

const mutations = {
  SETTING(state,payload){
    for(const key in payload) {
      if(key == 'playState') {
        if(payload[key])
          state.player.play()
        else
          state.player.pasuse()
      }
      state[key] = payload[key]
    }
  },
  /**
   * 播放
   * @param {*} state 
   * @param {*} payload 歌曲
   */
  PLAY(state,payload) {
    state.curr = payload
    state.player.src = payload.url
    state.playlist.unshift(payload)
    state.player.autoplay = true;
    state.playState = true,
  },
  /**
   * 上一曲 下一曲
   * @param {*} state 
   * @param {*} payload true 上一曲 false 下一曲
   */
  OPERATE(state,payload) {
    if(payload) {
      state.playlist = [state.playlist.at(-1),...state.playlist.slice(0,state.playlist.length)]
    } else {
      state.playlist = [...state.playlist.slice(1),state.playlist[0]]
    }
    state.curr = state.playlist[0]
    state.player.src = state.playlist[0].src
  }
}

export default {
  namespaced: true,
  state:initState(),
  actions,
  mutations,
}