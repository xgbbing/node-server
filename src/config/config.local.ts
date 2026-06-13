import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';
// import path from 'path';

export default (appInfo: MidwayAppInfo) => {
  const config = {} as MidwayConfig;

  // 本地开发环境数据库配置（SQLite）
  // config.sqlite = {
  //   client: {
  //     storage: path.join(process.cwd(), 'database', 'app.db'),
  //   },
  // };

  // 本地开发时的其他配置
  config.security = {
    csrf: {
      enable: false, // 本地开发禁用csrf
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  return config;
};