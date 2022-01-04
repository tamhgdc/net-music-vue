import { get } from '../utils/request';

/**
 * 获取歌曲链接
 * @param {*} id 
 * @returns 
 */
export const loadSongUrlAPI = (id) => get('/song/url', { id })

/**
 * 批量获取歌曲链接
 * @param {*} id 
 * @returns 
 */
export const loadSongsUrlAPI = (id, key) => get('/song/url', id, true, key)

/**
 * 获取歌词
 * @param {*} id 
 * @returns 
 */
export const loadLyricAPI = (id) => get('/lyric', { id })

/**
 * 获取歌曲详情
 * @param {*} id 
 * @returns 
 */
export const loadSongDetailAPI = (ids) => get('/song/detail', { ids })