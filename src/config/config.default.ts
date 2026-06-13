import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';
import path from 'path';

export default (appInfo: MidwayAppInfo): MidwayConfig => {
  return {
    keys: appInfo.name + '_1639994056460_8089',
    koa: {
      port: process.env.PORT || 7001,
    },
    // view: {
    //   defaultViewEngine: 'nunjucks',
    //   rootDir: {
    //     default: path.join(appInfo.baseDir, './app/view'),
    //   }
    // },
    session: {
      key: 'Koa_SESS',
      maxAge: 24 * 3600 * 1000, // 1天
      httpOnly: true,
      encrypt: true,
    },
    typeorm: {
      dataSource: {
        default: {
          type: 'sqlite',
          database: path.join(appInfo.baseDir, '../database/users.db'),
          synchronize: true, // 同步模式
          logging: true, // 开启日志
          entities: ['entity/*.{ts,js}']
        }
      }
    },
    // middleware: ['auth'],
    // elasticsearch: {
    //   host: 'localhost:9200',
    //   log: 'info',
    // },
  } as MidwayConfig;
};