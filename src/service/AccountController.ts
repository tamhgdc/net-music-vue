import { request } from "@/utils";
/**
 * 登录
 * @param params
 */
export const login = (params: {
	phone?: string;
	email?: string;
	password?: string;
	md5_password?: string;
	captcha?: string;
}) => request.post(`/login${params.phone ? "cellphone" : null}`, { params });

/**
 * 发送验证码
 * @param phone 手机号
 * @returns
 */
export const sendCaptcha = (phone: number | string) =>
	request.post("/captcha/sent", { params: { phone } });
