import { get } from '../utils/request';

/**
 * 获取热门话题
 * @param {*} limit 取出评论数量 , 默认为 20
 * @param {*} offset 偏移数量 , 用于分页 
 * @returns 
 */
export const loadHotTopicAPI = (params) => get('/hot/topic', params);

/**
 * 获取话题详情
 * @param {*} actId 话题 id
 * @returns 
 */
export const loadTopicDetailAPI = (actid) => get('/topic/detail', { actid })

/**
 * 获取话题详情热门动态
 * @param {*} actId 话题 id
 * @returns 
 */
export const loadTopicDetailHotEventAPI = (actid) => get('/topic/detail/event/hot', actid)