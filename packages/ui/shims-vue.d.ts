/**
 * @author        lx <1154354121@qq.com>
 * @date          2026-03-19 17:42:33
 * Copyright © YourCompanyName All rights reserved
 */
declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    // 声明 Vue 组件的类型，避免 TS 报错
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
