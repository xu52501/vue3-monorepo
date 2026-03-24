---
name: vue3-antdv-development
description: '**WORKFLOW SKILL** — Vue3 + Ant Design Vue 开发规范和最佳实践。包含组件使用、样式管理、状态管理、工具函数、请求库等完整开发指南。USE FOR: Vue3 + Ant Design Vue 项目开发，代码规范制定，组件抽离，样式管理，状态管理等。DO NOT USE FOR: 非Vue3项目，其他UI框架项目。'
---

# Vue3 + Ant Design Vue 开发规范

## 概述

本技能定义了基于 Vue3 + Ant Design Vue 的前端开发规范，涵盖组件使用、样式管理、状态管理、工具函数、请求库等各个方面，确保代码的一致性和可维护性。

## 开发规范

### 1. Template 规范

#### 组件使用优先级

1. **优先使用 Ant Design Vue 组件**
    - 直接使用 `@lx/ui` 中导出的 Ant Design Vue 组件
    - 示例：`<Button>`, `<Input>`, `<Card>`, `<Table>` 等

2. **查看现有组件**
    - 检查 `src/components/` 目录是否有现成组件
    - 检查项目中是否有相同功能的代码

3. **抽离公用组件**
    - 将重复使用的功能抽离为独立组件
    - 放置在 `src/components/` 目录下
    - 遵循 Vue3 Composition API 写法

#### 组件命名规范

- PascalCase 命名：`UserProfile.vue`, `DataTable.vue`
- 文件名与组件名保持一致
- 功能描述清晰，避免缩写

### 2. CSS 样式规范

#### 样式优先级

1. **优先使用 Tailwind CSS**
    - 使用 Tailwind 内置类名
    - 自定义颜色使用 CSS 变量：`var(--main-color)`

2. **Ant Design 样式覆盖**
    - 先检查 `src/style/antd-reset.scss` 是否已有对应样式
    - 如没有，在 `antd-reset.scss` 中添加覆盖样式类
    - 后续复用时直接使用已定义的类名

#### 样式文件结构

```
src/style/
├── index.css          # 主样式文件，导入其他样式
├── antd-reset.scss    # Ant Design 样式重置和覆盖
└── components/        # 组件特定样式（如果需要）
```

#### 样式类命名

- 使用语义化命名：`.user-card`, `.data-list`
- 避免使用 `!important`，优先使用 CSS 特异性
- 组件内样式使用 `<style scoped>`

### 3. Script 规范

#### 数据管理

- **Pinia 状态管理**
    - 用户信息、权限等全局复用数据放在 Pinia
    - 多次复用的业务数据也放入 Pinia
    - 页面级数据放在组件内部 `ref` 或 `reactive`

- **响应式数据**

    ```typescript
    // 页面级数据
    const formData = reactive({
        name: '',
        email: '',
    });

    // 简单状态
    const loading = ref(false);
    const visible = ref(true);
    ```

#### 事件处理

- **事件命名规范**
    - 与 template 交互的事件以 `handle` 开头
    - 示例：`handleSubmit`, `handleCancel`, `handleSearch`

- **事件函数结构**
    ```typescript
    const handleSubmit = async () => {
        try {
            loading.value = true;
            await submitForm(formData);
            message.success('提交成功');
        } catch (error) {
            console.error('提交失败:', error);
        } finally {
            loading.value = false;
        }
    };
    ```

#### 工具函数

- **抽离到 utils**
    - 多次使用的工具函数抽离到 `src/utils/` 目录
    - 使用时先检查是否存在，存在则复用

- **工具函数示例**

    ```typescript
    // src/utils/format.ts
    export const formatDate = (date: string | Date) => {
        return new Date(date).toLocaleDateString('zh-CN');
    };

    export const formatCurrency = (amount: number) => {
        return `¥${amount.toFixed(2)}`;
    };
    ```

### 4. 请求库规范

#### Axios 配置

- **统一请求库**
    - 使用 axios 作为 HTTP 请求库
    - 错误进行统一处理

- **响应拦截器**

    ```typescript
    // src/utils/request.ts
    import axios from 'axios';
    import { message } from 'ant-design-vue';

    const request = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
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
    ```

#### API 调用规范

```typescript
// src/api/user.ts
import request from '@/utils/request';

export const getUserList = (params: any) => {
    return request.get('/users', { params });
};

export const createUser = (data: any) => {
    return request.post('/users', data);
};

export const updateUser = (id: string, data: any) => {
    return request.put(`/users/${id}`, data);
};

export const deleteUser = (id: string) => {
    return request.delete(`/users/${id}`);
};
```

## 项目结构

```
src/
├── api/           # API 接口
├── components/    # 公用组件
├── stores/        # Pinia 状态管理
├── utils/         # 工具函数
├── views/         # 页面组件
├── style/         # 样式文件
│   ├── index.css
│   └── antd-reset.scss
└── types/         # TypeScript 类型定义
```

## 开发流程

1. **需求分析** - 明确功能需求和数据结构
2. **组件设计** - 确定使用哪些组件，是否需要抽离新组件
3. **状态设计** - 确定哪些数据放在 Pinia，哪些放在组件内部
4. **API 设计** - 定义接口和数据格式
5. **编码实现** - 按照规范编写代码
6. **样式调整** - 使用 Tailwind 和 antd-reset 管理样式
7. **测试验证** - 确保功能正常，样式正确

## 注意事项

- 保持代码 DRY (Don't Repeat Yourself) 原则
- 优先复用现有代码和组件
- 遵循 TypeScript 类型安全
- 错误处理要完善，用户体验友好
- 代码注释清晰，便于维护
