#!/bin/bash
set -e

# 1. 代码格式与规范检查
echo "===== 执行 ESLint 检查 ====="
pnpm lint

# 2. TypeScript 类型检查
echo "===== 执行 TypeScript 类型检查 ====="
pnpm typecheck

# 3. 单元测试
echo "===== 执行单元测试 ====="
pnpm test:unit

# 4. 构建检查
echo "===== 执行构建检查 ====="
pnpm build

echo "✅ 前端所有校验通过！"