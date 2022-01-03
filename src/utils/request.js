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

export function get(url, params) {
    if (params && Array.isArray(Object.values(params)[0])) {
        return Promise.all(Object.values(params)[0].map((ids) => get(url, { ids }).catch(() => 'error')))
    } else {
        return instance.get(url, { params: params });
    }
}



export function post(url, data) {
    // 参数一 表示地址
    // 参数二 表示数据
    // 参数三 是配置信息
    return instance.post(url, data);
}