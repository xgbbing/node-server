import { MidwayConfig } from '@midwayjs/core';

export default () => {
  return {
    security: {
      domainWhiteList: [process.env.HOST],
    },
  } as MidwayConfig;
};