import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo): MidwayConfig => {
  return {
    security: {
      csrf: {
        enable: false, // 本地开发禁用csrf
      },
      domainWhiteList: [process.env.LOCAL_HOST], // 本地开发允许的域名
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    midwayLogger: {
      default: {
        level: 'info',
      },
    },
  };
};