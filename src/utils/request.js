import axios from "axios";
const baseURL = process.env.NODE_ENV === "development" ?"http://localhost:3000":"https://netease-cloud-music-api-mocha-seven.vercel.app/"
const instance = axios.create({
    baseURL,
    timeout: 10000, // 超时时间
    withCredentials: true,
});

instance.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function(error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

/**
 * get请求
 * @param {*} url 地址
 * @param {*} params 参数
 * @param {*} all 是否多并发
 * @param {*} key 参数key
 * @returns 
 */
export function get(url, params, all = false, key = '') {
    // console.log(params, all);
    /* 处理高并发请求 */
    if (all) {
        return Promise.all(params.reduce((p, c) => {
            const obj = {};
            obj[key] = c[key] || c
            return p.concat(get(url, obj).catch(() => 'error'))
        }, []))
    } else {
        return instance.get(url, { params });
    }
}



export function post(url, data) {
    // 参数一 表示地址
    // 参数二 表示数据
    // 参数三 是配置信息
    return instance.post(url, data);
}