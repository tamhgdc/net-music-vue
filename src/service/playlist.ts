import { request } from "@/utils";

/**
 * 调用后可获取歌单详情动态部分，如评论数，是否收藏，播放数
 * @param id 歌单 id
 * @returns
 */
export const getDetailById = (id: string) =>
	request.get<PlayList.Detail>("/playlist/detail/dynamic", { params: { id } });
