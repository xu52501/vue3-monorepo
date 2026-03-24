// src/utils/request.ts
import axios from 'axios';
import { message } from '@lx/ui';

const request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // 添加 token 等
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        const { data } = response;
        if (data.code === 0) {
            return data.data;
        } else {
            message.error(data.message || '请求失败');
            return Promise.reject(new Error(data.message));
        }
    },
    (error) => {
        message.error(error.message || '网络错误');
        return Promise.reject(error);
    },
);

export default request;
