import axios from "axios";

const instance = axios.create({
    // baseURL:"http://net-music.penkuoer.com",
    baseURL: "http://localhost:3000", // 网络请求的基础地址
    timeout: 5000, // 超时时间
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
// 全局响应拦截，就是网络请求完成之后触发
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
    console.log(params);
    /* 处理高并发请求 */
    if (all) {
        return Promise.all(params.reduce((p, c) => {
            const obj = {};
            obj[key] = c[key]
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