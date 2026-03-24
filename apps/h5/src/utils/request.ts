// src/utils/request.ts
import axios, { type AxiosResponse, type AxiosRequestConfig } from 'axios';

// API 响应的标准格式
interface ApiResponse<T = unknown> {
    code: number;
    message: string;
    data: T;
}

// 统一错误类型
export class ApiError extends Error {
    code: number;
    message: string;
    originalError?: Error;

    constructor(code: number, message: string, originalError?: Error) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.message = message;
        this.originalError = originalError;
    }
}

// 请求配置扩展接口
interface RequestConfig extends AxiosRequestConfig {
    retry?: number; // 重试次数
    cancelOnUnload?: boolean; // 页面卸载时是否自动取消请求
}

// 页面卸载控制器管理
class PageUnloadController {
    private controllers = new Set<AbortController>();

    constructor() {
        this.setupUnloadListener();
    }

    private setupUnloadListener() {
        // 页面卸载前取消所有请求
        const cancelAllRequests = () => {
            this.controllers.forEach(controller => {
                controller.abort('Page unloaded');
            });
            this.controllers.clear();
        };

        // 监听页面卸载事件
        if (typeof window !== 'undefined') {
            window.addEventListener('beforeunload', cancelAllRequests);
            window.addEventListener('unload', cancelAllRequests);

            // SPA 路由变化时也取消（可选）
            window.addEventListener('popstate', () => {
                // 可以选择是否在路由变化时取消，视业务需求而定
                // cancelAllRequests();
            });
        }
    }

    createController(): AbortController {
        const controller = new AbortController();
        this.controllers.add(controller);

        // 当请求完成或取消时，从集合中移除
        const removeController = () => {
            this.controllers.delete(controller);
        };

        // 监听 abort 事件来清理
        controller.signal.addEventListener('abort', removeController);

        return controller;
    }
}

// 全局页面卸载控制器实例
const pageUnloadController = new PageUnloadController();

const request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // 添加 token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // 添加请求时间戳，防止缓存
        config.params = {
            ...config.params,
            _t: Date.now(),
        };

        return config;
    },
    (error) => Promise.reject(error),
);

// 响应拦截器
request.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        const { data } = response;

        if (data.code === 0) {
            // 成功响应，修改 response.data 为业务数据
            response.data = data.data as unknown as AxiosResponse['data'];
            return response;
        } else if (data.code === 401) {
            // Token 过期，清除本地存储并跳转登录
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
            window.location.href = '/login';
            return Promise.reject(new ApiError(401, '登录已过期，请重新登录'));
        } else if (data.code === 403) {
            // 权限不足
            return Promise.reject(new ApiError(403, '权限不足'));
        } else if (data.code === 404) {
            // 资源不存在
            return Promise.reject(new ApiError(404, '请求的资源不存在'));
        } else if (data.code === 500) {
            // 服务器错误
            return Promise.reject(new ApiError(500, '服务器内部错误'));
        }

        // 其他业务错误
        return Promise.reject(new ApiError(data.code, data.message));
    },
    (error) => {
        // 网络错误处理
        if (error.code === 'ECONNABORTED') {
            return Promise.reject(new ApiError(-1, '请求超时，请检查网络连接', error));
        }

        if (error.response) {
            // 服务器响应了错误状态码
            const status = error.response.status;
            switch (status) {
                case 400:
                    return Promise.reject(new ApiError(400, '请求参数错误', error));
                case 401:
                    localStorage.removeItem('token');
                    localStorage.removeItem('currentUser');
                    window.location.href = '/login';
                    return Promise.reject(new ApiError(401, '登录已过期，请重新登录', error));
                case 403:
                    return Promise.reject(new ApiError(403, '权限不足', error));
                case 404:
                    return Promise.reject(new ApiError(404, '请求的资源不存在', error));
                case 500:
                case 502:
                case 503:
                    return Promise.reject(new ApiError(status, '服务器错误，请稍后重试', error));
                default:
                    return Promise.reject(new ApiError(status, `请求失败 (${status})`, error));
            }
        } else if (error.request) {
            // 网络错误
            return Promise.reject(new ApiError(-2, '网络错误，请检查网络连接', error));
        } else {
            // 其他错误
            return Promise.reject(new ApiError(-999, error.message || '未知错误', error));
        }
    },
);

/**
 * 带重试和页面卸载取消功能的请求方法
 * @param config 请求配置
 * @returns Promise
 */
export const requestWithRetry = async <T = unknown>(config: RequestConfig): Promise<T> => {
    const { retry = 0, cancelOnUnload = false, ...axiosConfig } = config;

    // 如果开启页面卸载取消，创建 AbortController
    let controller: AbortController | undefined;
    if (cancelOnUnload) {
        controller = pageUnloadController.createController();
        axiosConfig.signal = controller.signal;
    }

    let lastError: ApiError | undefined;

    // 执行重试逻辑
    for (let attempt = 0; attempt <= retry; attempt++) {
        try {
            const response = await request(axiosConfig);
            return response.data as T;
        } catch (error) {
            lastError = error instanceof ApiError ? error : new ApiError(-1, '网络请求失败', error as Error);

            // 如果是页面卸载取消的请求，不重试
            if (lastError.code === -3) {
                throw lastError;
            }

            // 如果是最后一次尝试，抛出错误
            if (attempt === retry) {
                break;
            }

            // 等待一段时间后重试（指数退避）
            const delay = Math.min(1000 * Math.pow(2, attempt), 10000); // 最大延迟10秒
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    if (lastError) {
        throw lastError;
    } else {
        throw new ApiError(-1, '请求失败');
    }
};

/**
 * GET 请求（带重试和取消功能）
 */
export const get = <T = unknown>(url: string, config: RequestConfig = {}): Promise<T> => {
    return requestWithRetry<T>({ ...config, method: 'GET', url });
};

/**
 * POST 请求（带重试和取消功能）
 */
export const post = <T = unknown>(url: string, data?: unknown, config: RequestConfig = {}): Promise<T> => {
    return requestWithRetry<T>({ ...config, method: 'POST', url, data });
};

/**
 * PUT 请求（带重试和取消功能）
 */
export const put = <T = unknown>(url: string, data?: unknown, config: RequestConfig = {}): Promise<T> => {
    return requestWithRetry<T>({ ...config, method: 'PUT', url, data });
};

/**
 * DELETE 请求（带重试和取消功能）
 */
export const del = <T = unknown>(url: string, config: RequestConfig = {}): Promise<T> => {
    return requestWithRetry<T>({ ...config, method: 'DELETE', url });
};

/**
 * PATCH 请求（带重试和取消功能）
 */
export const patch = <T = unknown>(url: string, data?: unknown, config: RequestConfig = {}): Promise<T> => {
    return requestWithRetry<T>({ ...config, method: 'PATCH', url, data });
};

export default request;
