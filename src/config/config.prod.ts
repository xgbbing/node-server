import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';
// import path from 'path';

export default (appInfo: MidwayAppInfo) => {
  const config = {} as MidwayConfig;

  // 生产环境数据库配置（SQLite）
  // config.typeorm = {
  //   dataSource: {
  //     default: {
  //       type: 'sqlite',
  //       database: path.join('/data/myapp/database', 'app.db'),
  //       synchronize: true, // 同步模式
  //       logging: true, // 开启日志
  //     }
  //   }
  // };

  // 生产环境安全配置
  config.security = {
    domainWhiteList: ['https://xgbbing.win'],
  };

  // 生产环境日志级别
  // config.logger = {
  //   level: 'INFO',
  //   consoleLevel: 'INFO',
  // };

  // 关闭开发工具
  // config.info = {
  //   path: '/info',
  // };

  return config;
};