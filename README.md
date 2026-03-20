# monorepo模板

```bash
基于vue的monorepo模板
```

# Vue 3 + TypeScript + tailwind + antdv + Vite + turbo

# 运行

```bash
# 安装依赖
pnpm install

# 运行
pnpm run dev 启动所有项目

# 全量构建或使用turbo
pnpm run build

# 构建单个项目
pnpm --filter <project-name> run build

# 构建ui

## 开发（会自动观察ui代码变化生成index.js）
pnpm --filter @lx/ui run dev

## 生产
pnpm run build:ui

# turbo说明
- turbo dev会先执行ui dev启动对ui下文件更新的监听，变化自动生成新的indexjs，再启动子项目
- turbo build会先执行ui build生成index.js，再全量build
```
