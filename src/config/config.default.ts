import { MidwayAppInfo, MidwayConfig } from '@midwayjs/core';
import path from 'path';

export default (appInfo: MidwayAppInfo) => {
  const config = {} as MidwayConfig;

  config.keys = appInfo.name + '_1639994056460_8089';

  // Koa 端口配置
  config.koa = {
    port: 7001,
  };

  // 视图配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    rootDir: {
      default: path.join(appInfo.baseDir, 'app/view'),
    }
  };

  // 静态资源配置
  // config.static = {
  //   prefix: '/public/',
  //   dir: [`${appInfo.baseDir}/app/public`, `${appInfo.baseDir}/src/app/public`],
  //   dynamic: true,
  //   preload: false,
  //   maxFiles: 1000,
  // };

  // 安全配置
  config.security = {
    csrf: {
      enable: false, // 在API项目中通常禁用CSRF
    },
    domainWhiteList: ['http://localhost:7001', 'http://127.0.0.1:7001'],
  };

  // 会话配置
  // config.session = {
  //   key: 'Koa_SESS',
  //   maxAge: 24 * 3600 * 1000, // 1天
  //   httpOnly: true,
  //   encrypt: true,
  // };

  // 中间件配置
  // config.middleware = ['auth'];

  // JWT 配置
  // config.jwt = {
  //   secret: 'your-secret-key-here',
  // };

  // 数据库配置
  config.typeorm = {
    dataSource: {
      default: {
        type: 'sqlite',
        database: path.join(__dirname, '../../database/users.db'),
        synchronize: true, // 同步模式
        logging: true, // 开启日志
        entities: ['entity/*.{ts,js}']
      }
    }
  };

  // Elasticsearch 配置
  // config.elasticsearch = {
  //   host: 'localhost:9200',
  //   log: 'info',
  // };

  // Redis 配置（用于消息队列）
  // config.redis = {
  //   client: {
  //     port: 6379,
  //     host: '127.0.0.1',
  //     password: '',
  //     db: 0,
  //   },
  // };

  // 插件开关配置
  // config.plugins = {
  //   static: true,
  //   session: true,
  //   nunjucks: true,
  // };

  // 默认分页配置
  // config.defaultPageSize = 10;
  // config.maxPageSize = 100;

  return config;
};