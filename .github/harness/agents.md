# 全栈 AI Agent 通用行为规范（全项目强制执行）

## 一、通用约束

1.  代码必须遵循 **TypeScript 严格模式**，禁止使用 `any`、`unknown` 等宽松类型。
2.  禁止编写「魔法数字/字符串」，所有常量必须定义在 `/common/constants` 并导出使用。
3.  所有功能必须配套**单元测试**，前端测试覆盖率 ≥80%，后端 ≥75%，未达标禁止合并。
4.  禁止提交敏感信息（密钥、密码、个人数据），环境变量必须通过 `.env.example` 声明，禁止提交 `.env` 文件。
5.  代码提交必须遵循 **Conventional Commits 规范**（feat/fix/docs/style/refactor/test/chore），禁止无意义提交信息。

## 二、前端约束（补充）

1.  组件开发必须遵循「原子设计规范」，原子/分子/ organisms 分层清晰，禁止在页面层写复杂逻辑。
2.  禁止直接操作 DOM，必须使用框架原生 API（React 用 useState/useEffect，Vue 用响应式数据）。
3.  接口请求必须封装统一请求工具，统一处理请求头、错误拦截、加载状态。

## 三、后端约束（补充）

1.  接口必须遵循 **RESTful 规范**，GET/POST/PUT/DELETE 对应查询/新增/修改/删除，禁止用 GET 做新增/删除。
2.  数据库操作必须使用 ORM/QueryBuilder，禁止手写原生 SQL（防止 SQL 注入），复杂查询需加索引。
3.  接口必须做参数校验（必填项、类型校验、范围校验），返回统一格式的错误信息（code+message+data）。

## 四、数据流转约束

1.  前后端通信必须使用 **JSON 格式**，统一数据结构：`{code: number, message: string, data: T}`。
2.  敏感数据（手机号、身份证）必须在前端脱敏展示，后端加密存储，禁止明文传输。
3.  跨域配置必须严格限制来源，只允许生产环境域名，禁止 `*` 通配。

## 五、部署约束

1.  所有服务必须容器化（Docker），禁止直接部署到服务器，镜像必须多阶段构建，减小体积。
2.  CI/CD 流程必须包含：代码校验 → 测试 → 构建 → 安全扫描 → 部署，缺一不可。
3.  生产环境禁止开启调试模式，禁止打印敏感日志。

# 前端 AI Agent 行为规范

## 一、技术栈约束

- 核心框架：Vue 3 + Vite + TypeScript（若为 React 则替换为 React + Vite + TypeScript）
- 状态管理：Pinia（Vue）/ Redux Toolkit（React）
- UI 组件库：Element Plus / Ant Design Vue（按需引入）
- 构建工具：Vite（禁止使用 Webpack）
- 样式方案：SCSS + CSS Modules（禁止行内样式）

## 二、开发流程

1.  新增页面/组件：必须先在 `/docs/components` 或 `/docs/pages` 编写设计文档，再进行开发。
2.  接口开发：必须先在 `/common/types` 定义接口请求/响应类型，再实现业务逻辑。
3.  样式开发：必须在组件同级目录创建 `.module.scss` 文件，禁止全局样式污染。

## 三、校验流程（AI 必须自动执行）

1.  代码提交前：自动执行 `pnpm lint`（ESLint + Stylelint）→ `pnpm typecheck` → `pnpm test:unit`。
2.  功能开发完成：自动执行 `pnpm build` 检查构建是否报错，无报错方可提交合并请求。

# 后端 AI Agent 行为规范

## 一、技术栈约束

- 核心框架：Node.js + NestJS（TypeScript）/ Spring Boot（Java）
- 数据库：MySQL 8.0+ / PostgreSQL（禁止使用低版本）
- ORM 工具：Prisma（Node.js）/ MyBatis-Plus（Java）
- 认证授权：JWT + RBAC 权限模型（禁止使用 Session 认证）

## 二、开发流程

1.  新增接口：必须遵循「Controller → Service → Repository」分层结构，禁止在 Controller 写业务逻辑。
2.  异常处理：必须使用全局异常过滤器，统一捕获异常并返回标准化错误信息，禁止直接抛出 500。
3.  日志管理：使用结构化日志（Winston/Pino），区分开发/生产环境日志级别，生产环境禁止打印 debug 日志。

## 三、校验流程（AI 必须自动执行）

1.  代码提交前：自动执行 `pnpm lint`（Node.js）/ `mvn clean compile`（Java）→ `pnpm test:unit`（Node.js）/ `mvn test`（Java）。
2.  数据库变更：必须编写迁移文件，禁止直接手动修改数据库表结构，迁移文件必须提交到版本库。
