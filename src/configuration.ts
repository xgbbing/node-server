import { Configuration, App, ILifeCycle, Logger, ILogger, ALL, Config } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as ws from '@midwayjs/ws';
import * as orm from '@midwayjs/typeorm';
// import * as view from '@midwayjs/view-nunjucks';
import { WeatherErrorFilter } from './filter/weather.filter';
import path from 'path';
import * as dotenv from 'dotenv';
import { devtoolsMiddleware } from './app/middleware/devtools.middleware';

// load .env file in process.cwd
dotenv.config();

@Configuration({
  imports: [koa, ws, orm],
  importConfigs: [
    path.join(__dirname, './config/'),
  ],
})

export class MainConfiguration implements ILifeCycle {
  @App()
  app!: koa.Application;

  @App('webSocket')
  wsApp!: ws.Application;

  @Logger('coreLogger')
  logger!: ILogger;

  @Config(ALL)
  allConfig;

  async onReady() {
    this.logger.info('info: Application is ready!');
    this.logger.warn('warn: Application is ready!');
    this.logger.error('error: Application is ready!');
    this.logger.warn('warn all config', JSON.stringify(this.allConfig))

    // 打印环境变量
    this.logger.warn('MIDWAY_SERVER_ENV:', process.env.MIDWAY_SERVER_ENV);
    this.logger.warn('NODE_ENV:', process.env.NODE_ENV);

    // Midway 内置的环境获取方法
    const env = this.app.getEnv();
    this.logger.warn('Midway env:', env);


    // add filter
    this.app.useFilter([WeatherErrorFilter]);
    // 添加 Chrome DevTools 中间件来静默处理特殊请求
    this.app.use(devtoolsMiddleware);
    // this.wsApp.useMiddleweare(...);
  }

  async didLoad() {
    this.logger.info('Application is loaded!');
  }

  async onStop() {
    this.logger.info('Application is stopping...');
    process.exit(0);
  }
}

import { App, Configuration, Inject } from '@midwayjs/core';
import { Application } from '@midwayjs/koa';

@Configuration({
  importConfigs: [
    {
      default: {
        jwt: {
          secret: process.env.JWT_SECRET || 'your-jwt-secret-key-change-in-production',
          expiresIn: process.env.JWT_EXPIRES_IN || '24h',
        }
      }
    }
  ]
})
export class ContainerConfiguration {
  @App()
  app: Application;

  @Inject()
  userService: any;

  async onReady() {
    // 应用准备就绪后的初始化逻辑
    console.log('应用启动完成');
  }
}
