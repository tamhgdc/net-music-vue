import { get } from "../utils/request"

/**
 * 获取用户关注列表
 * @returns 
 */
export const LoadUserFollowersAPI = (uid) => get('/user/follows', { uid })


/**
 * 批量获取用户动态
 * @param {*} ids 
 * @returns 
 */
export const LoadUserFollowerEventsAPI = (ids) => get('/user/event', ids, true, "uid")