#!/bin/bash
set -e

# 1. 代码规范检查
echo "===== 执行 ESLint 检查 ====="
pnpm lint

# 2. 单元测试
echo "===== 执行单元测试 ====="
pnpm test:unit

# 3. 构建检查
echo "===== 执行构建检查 ====="
pnpm build

echo "✅ 后端所有校验通过！"