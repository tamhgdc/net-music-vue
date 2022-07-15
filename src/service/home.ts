import { request } from "@/utils";

export const loadHomePage = () => request.get("/homepage/block/page");

export const loadHomeDragBar = () => request.get("/homepage/dragon/ball");
