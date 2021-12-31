import { post, get } from '../utils/request';


/**
 * @description: 手机密码登陆
 * @param {phone:手机号, md5_password | captcha }
 * @return {*}
 */
export const loginByPhoneAPI = (params) => post("/login/cellphone", params);

/**
 * @description: 发送验证码
 * @param {phone:手机号}
 * @return {*}
 */
export const sendCaptchaAPI = (phone) => post('/captcha/sent', { phone });

/**
 * @description: 邮箱登陆
 * @param {email:邮箱, md5_password:密码}
 * @return {*}
 */
export const loginByEmailAPI = (params) => post("/login", params);

/**
 * @description: 获取二维码
 * @param {*}
 * @return {key:二维码key,qrimg:bash64}
 */
export const getQrCodeAPI = async () => {
    const key = await get('/login/qr/key')
    return get(`/login/qr/create?key=${key.unikey}&qrimg=true"`)
};

/**
 * @description: 检查二维码状态
 * @param {key:二维码key}
 * @return {code:状态码, message:状态信息, cookie:cookie}
 * 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
 */
export const checkQrCodeAPI = (key) => {
    return get('localhost:3000/login/qr/check?key=' + key)
};

/**
 * 退出登录
 * @returns 
 */
export const logoutAPI = () => get('/logout')