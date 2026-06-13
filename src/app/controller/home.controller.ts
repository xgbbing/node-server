import { Controller, Get, Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Provide()
@Controller('/')
export class HomeController {
  @Inject()
  ctx!: Context;

  @Get('/')
  async home() {
    this.ctx.body = {
      message: '这是关于页面',
      features: [
        '基于 Midway + Koa 框架',
        '使用 SQLite 数据库',
        'TypeScript 编写',
        '包含完整的用户认证系统'
      ]
    };
    // return {
    //   message: 'Hello Midwayjs!',
    //   query: this.ctx.ip
    // }
  }
}