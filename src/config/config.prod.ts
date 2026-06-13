import { MidwayConfig } from '@midwayjs/core';
// import path from 'path';

export default () => {
  return {
    security: {
      domainWhiteList: [process.env.HOST],
    },
    // typeorm: {
    //   dataSource: {
    //     default: {
    //       type: 'sqlite',
    //       database: path.join('/data/myapp/database', 'app.db'),
    //       synchronize: true, // 同步模式
    //       logging: true, // 开启日志
    //     }
    //   }
    // },
    logger: {
      level: 'WARNING',
      consoleLevel: 'INFO',
    }
  } as MidwayConfig;
};