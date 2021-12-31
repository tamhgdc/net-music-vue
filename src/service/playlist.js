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
export const loadPlaylistAndLimitAPI = (limit = 6) => get('/personalized?limit=' + limit)

/**
 * 通过 ID 获取播放列表
 * @param {*} id 播放列表 ID
 * @returns 
 */
export const loadPlaylistByIdAPI = (id) => get('/playlist/detail?id=' + id)

/**
 * 获取每日推荐歌单（需登录）
 * @returns 
 */
export const loadDailyRemdPlayListAPI = () => get('/recommend/resource');

/**
 * 获取私人FM歌单（需登录）
 * @returns 
 */
export const loadPrivateFMPlayListAPI = () => get('/personal_fm');

/**
 * 获取用户喜欢列表
 * @param {*} uid 用户uid
 * @returns 
 */
export const loadLikePlayListAPI = (uid) => get('/likelist', { uid });