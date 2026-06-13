import { App, Configuration } from '@midwayjs/decorator';
import { Application } from 'egg';
// import { QueueService } from './queue/queue.service';
import * as path from 'path';

import * as core from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as session from '@midwayjs/session';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as jwt from '@midwayjs/jwt';
import * as axios from '@midwayjs/axios';
import * as typeorm from '@midwayjs/typeorm';

@Configuration({
  imports: [
    core,
    koa,
    session,
    validate,
    info,
    jwt,
    axios,
    typeorm,
  ],
  importConfigs: [
    {
      default: {
        koa: {
          port: 7001,
        },
        keys: 'node-server_1639994056460_8089',
        typeorm: {
          dataSource: {
            default: {
              type: 'sqlite',
              database: path.join(process.cwd(), 'database', 'app.db'),
              synchronize: process.env.NODE_ENV !== 'production',
              logging: process.env.NODE_ENV !== 'production',
              entities: [path.join(__dirname, 'entity/**/*{.ts,.js}')],
              migrations: [path.join(__dirname, 'migration/**/*{.ts,.js}')],
            },
          },
        },
      },
    },
  ],
})
export class ContainerLifeCycle {
  @App()
  app!: Application;

  // @Inject()
  // queueService!: QueueService;

  async onReady() {
    // 启动队列处理器
    // this.queueService.startProcessing();

    console.log('Application is ready!');
  }

  async onStop() {
    console.log('Application is stopping...');
  }
}