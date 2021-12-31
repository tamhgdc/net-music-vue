import { get } from '../utils/request';

/**
 * 获取歌曲链接
 * @param {*} id 
 * @returns 
 */
export const loadSongUrlAPI = (id) => get('/song/url?id=', id)

/**
 * 获取歌词
 * @param {*} id 
 * @returns 
 */
export const loadLyricAPI = (id) => get('/lyric?id=', id)

/**
 * 获取歌曲详情
 * @param {*} id 
 * @returns 
 */
export const loadSongDetailAPI = (id) => get('/song/detail?ids=', id)