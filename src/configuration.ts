import { Configuration, App, ILifeCycle } from '@midwayjs/core';
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

  async onReady() {
    console.log('Application is ready!');
    // add filter
    this.app.useFilter([WeatherErrorFilter]);
    // this.app.useMiddleweare(...);
    // this.wsApp.useMiddleweare(...);
  }

  async didLoad() {
    console.log('Application is loaded!');
  }

  async onStop() {
    console.log('Application is stopping...');
    process.exit(0);
  }
}