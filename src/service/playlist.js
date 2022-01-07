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
 * 获取每日推荐歌曲
 * @returns 
 */
export const loadDailyRemdSongsAPI = () => get('/recommend/songs')

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

/**
 * 获取所有歌单分类
 * @returns 
 */
export const loadAllPlaylistCategoryAPI = () => get('/playlist/catlist')

/**
 * 获取所热门分类
 * @returns 
 */
export const loadHotPlaylistCategoryAPI = () => get('/playlist/hot')


/**
 * 根据分类标签获取歌单
 * @param {*} cat 标签
 * @param {*} limit 单页显示数量
 * @param {*} offset 分页偏移量
 * @returns 
 */
export const loadPlaylistByCateAPI = (params) => get('/top/playlist', params)

/**
 * 获取精品歌单标签
 * @returns 
 */
export const loadHighQualityTagsAPI = () => get('/playlist/highquality/tags')

/**
 * 获取精品歌单
 * @param {*} cat tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取
 * @param {*} limit 单页显示数量
 * @param {*} before 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数
 * @returns 
 */
export const loadHighQualityPlayListAPI = (params) => get('/top/playlist/highquality', params)


/**
 * 获取排行榜
 * @returns 
 */
export const loadTopListAPI = () => get('/toplist/detail');