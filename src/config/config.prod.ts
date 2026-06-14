import { MidwayConfig } from '@midwayjs/core';

export default (): MidwayConfig => {
  return {
    security: {
      domainWhiteList: [process.env.HOST, process.env.LOCAL_HOST],
    },
    midwayLogger: {
      default: {
        level: 'warn',
      },
    },
  };
};