declare namespace API {
	interface Banner {
		imageUrl: string;
		titleColor: string;
		typeTitle: string;
		url: string;
		video: string;
		[string]: string;
	}
}

declare namespace PlayList {
	interface Detail {
		/** 评论数 */
		commentCount: number;
		/** 分享数 */
		shareCount: number;
		/** 播放数 */
		playCount: number;
		/** 收藏数 */
		bookedCount: number;
		/** 是否订阅 */
		subscribed: boolean;
		/** 是否关注 */
		followed: boolean;
	}
}
