import { get, post } from '../utils/request'

/**
 * 获取歌曲评论
 * @param {*} params id 音乐id， limit 默认20， offset 偏移量用于分页，before 分页参数
 * @returns 
 */
export const LoadSongCommentsAPI = (params) => get('/comment/music', params)

/**
 * 获取歌单评论
 * @param {*} params id 音乐id， limit 默认20， offset 偏移量用于分页，before 分页参数
 * @returns 
 */
export const LoadPlaylistCommentsAPI = (params) => get('/comment/playlist', params)


/**
 * 获取评论
 * @param {*} id 资源 id, 如歌曲 id,mv id
 * @param {*} type 0 歌曲， 1 mv， 2 歌单，3 专辑，4 电台，5 视频，6 动态
 * @param {*} pageNo 分页参数,第 N 页,默认为 1
 * @param {*} pageSize 分页参数,每页多少条数据,默认 20
 * @param {*} sortType 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
 * @param {*} cursor 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
 * @returns 
 */
export const LoadCommentsAPI = (params) => get('/comment/new', params)


/**
 * 点赞评论
 * @param {*} params id : 资源 id, 如歌曲 id,mv id
 * @param {*} params cid : 评论 id
 * @param {*} params t : 是否点赞 , 1 为点赞 ,0 为取消点赞
 * @param {*} params type: 0 歌曲， 1 mv， 2 歌单，3 专辑，4 电台，5 视频，6 动态
 * @returns 
 */
export const likeCommentAPI = (params) => get('/comment/like', params)


/**
 * 评论/回复
 * @param {*} params t:1 发送, 2 回复
 * @param {*} params id:对应资源 id
 * @param {*} params content :要发送的内容
 * @param {*} params commentId :回复的评论 id (回复评论时必填)
 * @param {*} params type: 0 歌曲， 1 mv， 2 歌单，3 专辑，4 电台，5 视频，6 动态
 * @returns 
 */
export const sendCommentAPI = (params) => post('/comment', params)


/**
 * 删除评论
 * @param {*} params t:0 删除
 * @param {*} params type: 0 歌曲， 1 mv， 2 歌单，3 专辑，4 电台，5 视频，6 动态
 * @param {*} params id:对应资源 id 
 * @param {*} params content :内容 id
 * @returns 
 */
export const delCommentAPI = (params) => post('/comment', params)