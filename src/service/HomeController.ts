import { request } from "@/utils";

export const homeData = () => request.get("/homepage/block/page");

export const DragBar = () => request.get("/homepage/dragon/ball");

export const banners = () =>
	request.get<Record<"banners", API.Banner[]>>("/banner?type=1");
