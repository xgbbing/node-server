import { MidwayConfig } from '@midwayjs/core';

export default (): MidwayConfig => {
  return {
    security: {
      domainWhiteList: [process.env.HOST],
    },
  };
};