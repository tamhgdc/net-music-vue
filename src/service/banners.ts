import { request } from "@/utils";

export const loadBanners = () => request.get<API.Banner>("/banner");
