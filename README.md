# Nest Admin

前端地址 https://github.com/Ryan202603/record-keeper

## 环境要求

- Node.js v23.8.0
- PNPM v10.4.1
- PostgreSQL

## 数据库设置

本项目使用 PostgreSQL 数据库。

1. **安装并启动 PostgreSQL (macOS)**:

   ```bash
   # 使用 Homebrew 安装
   brew install postgresql

   # 启动服务
   brew services start postgresql
   ```

2. **数据库连接配置**:
   默认为本地开发环境配置，请确保你的本地数据库符合以下设置，或者修改 `src/app.module.ts` 文件。
   - **Host**: `localhost`
   - **Port**: `5432`
   - **Database**: `postgres`
   - **Username**: `wanti`
   - **Password**: `123456`

## 快速开始

1. **安装依赖**:

   ```bash
   pnpm install
   ```

2. **启动开发服务器**:
   ```bash
   pnpm start:dev
   ```
   服务启动后通常访问地址为: http://localhost:3000
