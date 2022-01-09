import { get } from '../utils/request';

/**
 * 获取默认搜索关键词
 * @returns 
 */
export const loadSearchDefaultAPI = () => get('/search/default')

/**
 * 获取搜索列表详细信息
 * @returns 
 */
export const loadSearchHotListAPI = () => get('/search/hot/detail')


/**
 * 获取搜索建议
 * @param {*} keywords 关键词
 * @returns 
 */
export const loadSearchSuggestAPI = (keywords, type = "mobile") => get('/search/suggest', { keywords, type })


/**
 * 按类型搜索
 * @param {*} keywords 
 * @param {*} type 默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 * @returns 
 */
export const searchByTypeAPI = (params) => get('/search', params)

export const searchByTypesAPI = (key, type) => get('/search?keywords=' + key, type, true, "type")