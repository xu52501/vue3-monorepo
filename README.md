# monorepo模板

```bash
基于vue的monorepo模板
```

# Vue 3 + TypeScript + tailwind + antdv + Vite + turbo

# 运行

## 使用turbo进行开发和构建

## 安装依赖

pnpm install

## 运行 启动所有项目

pnpm run dev

- 会根据turbo.json执行触发turbo dev
- turbo dev会先执行ui dev启动对ui下文件更新的监听，变化自动生成新的indexjs，再启动子项目

## 全量构建

pnpm run build

- 触发turbo build，会先执行ui build生成index.js，再全量build

## 构建单个项目

pnpm --filter <project-name> run build

## 构建ui

### 开发（会自动观察ui代码变化生成index.js）

pnpm --filter @lx/ui run dev

### 生产

pnpm run build:ui
