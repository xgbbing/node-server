# Midway + Egg + SQLite + TypeScript 项目

这是一个基于 Midway + Egg + SQLite + TypeScript 的全功能 Node.js 服务端项目，包含了现代 Web 应用所需的各种功能模块。

## 功能特性

1. **注册登录模块** - 支持用户注册、登录、登出功能
2. **定时任务模块** - 支持定时任务调度
3. **权限认证模块** - 基于会话和 JWT 的权限控制
4. **消息队列** - 基于 Bull 的异步任务队列
5. **搜索引擎** - 集成 Elasticsearch 实现全文搜索
6. **远程调用其他服务** - 支持与其他服务进行 HTTP 通信
7. **提供给 Web 使用的 API** - RESTful API 接口
8. **HTML 模板和前端静态资源** - 支持服务端渲染和静态资源托管
9. **抽离相关的配置** - 包括插件开关、默认配置、环境配置等
10. **抽离公共工具函数** - 存放在 util 目录
11. **常量定义** - 单独放在 constant.ts
12. **登录中间件** - 鉴权流程：请求进入 → login中间件鉴权 → 如果无权限重定向到 login.xgbbing.win 登录页面

## 技术栈

- **框架**: Midway v3 + Egg.js
- **语言**: TypeScript
- **数据库**: SQLite
- **ORM**: TypeORM
- **模板引擎**: Nunjucks
- **消息队列**: Bull
- **搜索引擎**: Elasticsearch
- **HTTP 客户端**: Axios

## 项目结构

```
src/
├── app/
│   ├── controller/     # 控制器
│   ├── middleware/     # 中间件
│   ├── public/         # 静态资源
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   └── view/           # 视图模板
├── config/             # 配置文件
├── entity/             # 数据库实体
├── service/            # 业务服务
├── utils/              # 工具函数
├── constant.ts         # 常量定义
├── schedule/           # 定时任务
├── queue/              # 消息队列
├── lib/                # 第三方库封装
└── configuration.ts    # 应用配置
```

## 快速开始

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 访问应用：
打开浏览器并访问 `http://localhost:7001`

## API 接口

### 用户相关
- `POST /api/user/register` - 用户注册
- `POST /api/user/login` - 用户登录
- `POST /api/user/logout` - 用户登出
- `GET /api/user/profile` - 获取用户资料
- `GET /api/user/list` - 获取用户列表

### 系统相关
- `GET /` - 首页
- `GET /api/status` - 系统状态

## 环境配置

项目支持多环境配置：
- `config/config.default.ts` - 默认配置
- `config/config.local.ts` - 本地开发环境
- `config/config.prod.ts` - 生产环境
- `config/config.test.ts` - 测试环境

## 部署

1. 构建项目：
```bash
npm run build
```

2. 启动生产环境：
```bash
npm start
```

## 许可证

MIT