import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';
import path from 'path';

export default (appInfo: MidwayAppInfo): MidwayConfig => {
  return {
    keys: appInfo.name + '_1639994056460_8089',
    koa: {
      port: parseInt(process.env.PORT as string) || 7001,
    },
    typeorm: {
      dataSource: {
        default: {
          type: 'sqlite',
          database: path.join(appInfo.baseDir, '../database/users.db'),
          synchronize: true, // 同步模式
          logging: true, // 开启日志
          entities: ['entity/user.entity.{ts,js}']
        },
        monitor: {
          type: 'sqlite',
          database: path.join(appInfo.baseDir, '../database/monitor.db'),
          synchronize: true, // 同步模式
          logging: true, // 开启日志
          entities: ['entity/monitor.entity.{ts,js}']
        }
      }
    },
    midwayLogger: {
      default: {
        transports: {
          file: {
            dir: path.join(appInfo.baseDir, '../logs')
          },
          console: {
            dir: path.join(appInfo.baseDir, '../logs')
          },
          error: {
            dir: path.join(appInfo.baseDir, '../logs')
          },
        }
      },
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },
    // session: {
    //   key: 'Koa_SESS',
    //   maxAge: 24 * 3600 * 1000, // 1天
    //   httpOnly: true,
    //   encrypt: true,
    // },
    // view: {
    //   defaultViewEngine: 'nunjucks',
    //   rootDir: {
    //     default: path.join(appInfo.baseDir, './app/view'),
    //   }
    // },
    // middleware: ['auth'],
    // elasticsearch: {
    //   host: 'localhost:9200',
    //   log: 'info',
    // },
  };
};