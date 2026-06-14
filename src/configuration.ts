import { Configuration, App, ILifeCycle, Logger, ILogger } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as ws from '@midwayjs/ws';
import * as orm from '@midwayjs/typeorm';
// import * as view from '@midwayjs/view-nunjucks';
import { WeatherErrorFilter } from './filter/weather.filter';
import path from 'path';
import * as dotenv from 'dotenv';

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

  async onReady() {
    this.logger.info('Application is ready!');
    // add filter
    this.app.useFilter([WeatherErrorFilter]);
    // this.app.useMiddleweare(...);
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