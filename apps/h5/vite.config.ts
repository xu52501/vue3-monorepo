import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite'; // <--- 引入插件
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { uiResolver } from '@lx/ui/resolver';

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
    const env = loadEnv(mode, process.cwd());
    return {
        base: env.VITE_BASE,
        plugins: [
            vue(),
            tailwindcss(),
            AutoImport({
                imports: [
                    'vue',
                    'vue-router',
                    // 'pinia', // 若使用 Pinia
                ],
                // 生成类型声明文件（关键！）
                dts: './src/types/auto-imports.d.ts',
                // 解决 ESLint 报错
                eslintrc: {
                    enabled: true,
                    filepath: './.eslintrc-auto-import.json',
                    globalsPropValue: true,
                },
                // Vue Router 的 useRouter/useRoute 自动导入
                resolvers: [
                    // 按需引入 UI 库（如 Element Plus）
                    // ElementPlusResolver(),
                ],
            }), // ✅ 自动注册组件（src/components 下的 .vue 文件）
            Components({
                dirs: ['src/components'],
                // 组件名格式：PascalCase（推荐）或 kebab-case
                directoryAsNamespace: true,
                // 生成类型声明（关键！）
                dts: './src/types/components.d.ts',
                // UI 库自动引入（如 Element Plus）
                resolvers: [
                    // ElementPlusResolver(),
                    uiResolver,
                ],
            }),
        ],
    };
});
