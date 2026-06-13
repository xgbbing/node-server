import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo) => {
  const config = {} as MidwayConfig;

  // 测试环境数据库配置
  // config.sqlite = {
  //   client: {
  //     storage: './database/test.db',
  //   },
  //   default: {
  //     isolationLevel: 'READ_COMMITTED',
  //     dialectOptions: {
  //       collate: 'utf8_general_ci',
  //     },
  //   },
  // };

  // 测试环境安全配置
  config.security = {
    domainWhiteList: ['http://127.0.0.1:7001'],
  };

  return config;
};