import { get } from '../utils/request';

/**
 * 获取推荐歌单
 * @returns 
 */
export const loadPlaylistAPI = () => get('/personalized')

/**
 * 获取推荐歌单 默认获取6条
 * @param {*} limit 获取数量
 * @returns 
 */
export const loadPlaylistAndLimitAPI = (limit = 6) => get('/personalized', { limit })

/**
 * 通过 ID 歌单详情
 * @param {*} id 播放列表 ID
 * @returns 
 */
export const loadPlaylistDetailByIdAPI = (id) => get('/playlist/detail', { id })

/**
 * 通过 ID 获取歌单所有歌曲
 * @param {*} id 
 * @returns 
 */
export const loadPlaylistAllSongByIdAPI = (id) => get('/playlist/track/all', { id })

/**
 * 获取每日推荐歌单（需登录）
 * @returns 
 */
export const loadDailyRemdPlayListAPI = () => get('/recommend/resource')

/**
 * 获取私人FM歌单（需登录）
 * @returns 
 */
export const loadPrivateFMPlayListAPI = () => get('/personal_fm')

/**
 * 获取用户喜欢列表
 * @param {*} uid 用户uid
 * @returns 
 */
export const loadLikePlayListAPI = (uid) => get('/likelist', { uid });

/**
 * 获取用户歌单
 * @param {*} uid 用户uid
 * @returns 
 */
export const loadUserPlayListAPI = (uid) => get('/user/playlist', { uid })

/**
 * 获取用户最近播放歌曲
 * @param {*} limit 
 * @returns 
 */
export const loadRecentlyPlayedSongsAPI = (limit = 100) => get('/record/recent/song', { limit })