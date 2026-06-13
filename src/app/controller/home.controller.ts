import { Controller, Get, Provide, Inject } from '@midwayjs/decorator';
import { Context } from 'egg';

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
        '基于 Midway + Egg 框架',
        '使用 SQLite 数据库',
        'TypeScript 编写',
        '包含完整的用户认证系统'
      ]
    };
  }
}