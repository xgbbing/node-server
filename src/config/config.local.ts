import { MidwayConfig } from '@midwayjs/core';

export default () => {
  return {
    security: {
      csrf: {
        enable: false, // 本地开发禁用csrf
      },
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    }

  } as MidwayConfig;
};