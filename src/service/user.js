import { get, post } from '../utils/request'

/**
 * 获取用户私信
 * @returns 
 */
export const loadPrivateMsgAPI = () => get('/msg/private')

/**
 * 签到
 * @returns 
 */
export const dailySignInAPI = () => get('/daily_signin')

/**
 * 喜欢音乐
 * @param {*} params id:歌曲 id 必传，like: 默认为 true 即喜欢 , 若传 false, 则取消喜欢
 * @returns 
 */
export const likeOrNotAPI = (params) => post('/like', params);

/**
 * 退出登录
 * @returns 
 */
export const logoutAPI = () => get('/logout')