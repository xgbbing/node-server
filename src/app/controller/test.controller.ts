import { App, Controller, Get, Inject, Provide, Query, SetHeader, Redirect, sleep, Config, Logger, ILogger } from '@midwayjs/core';
import { Context, Application } from '@midwayjs/koa';
import { WeatherService } from '../../service/weather.service';
import { UserService } from '../../service/user.service';
import { RESPONSE_CODE } from '../../constant';

@Provide()
@Controller('/api/test')
export class TestController {
  @App()
  app!: Application;

  @Inject()
  ctx!: Context;

  @Config('userService')
  userConfig;

  @Inject()
  weatherService!: WeatherService;

  @Inject()
  userService!: UserService;

  @Logger()
  logger!: ILogger;

  @Get('/weather')
  @SetHeader({
    'x-bbb': '123',
    'x-ccc': '234'
  })
  async getWeatherInfo(@Query() queryData: { cityId: string }): Promise<string> {
    this.logger.info(queryData.cityId, '======cityId');
    // this.logger.info(this.ctx);
    // const query = this.ctx.query;
    // this.logger.info(query);
    // this.logger.info(this.app.getConfig());
    // this.logger.info(this.app.getEnv());
    const result = await this.weatherService.getWeather(queryData.cityId || '1111');
    if (result) {
      return '获取天气成功'
      // await this.ctx.render('home', result.weatherinfo);
    }
    return '获取天气失败';
  }

  @Get('/get-weather')
  @Redirect('/api/test/weather', 302)
  async loginAnother() {
    // TODO
    this.logger.info('redirecting to /weather');
  }

  @Get('/stream-data')
  async sendStreamData() {
    this.ctx.status = 200;
    this.ctx.set('Transfer-Encoding', 'chunked');
    for (let i = 0; i < 10; i++) {
      await sleep(1000);
      this.ctx.res.write('abc'.repeat(100));
    }

    this.ctx.res.end();
  }

  /**
     * 用户注册
     */
  @Get('/register')
  async register(@Query() queryData) {
    try {
      this.logger.info(this.ctx.app.env, '=======env==========');
      // this.logger.info(JSON.stringify(this.userConfig))
      // const body = {
      //   username: 'testuser3',
      //   password: '12345',
      // }

      this.ctx.logger.info('Registering user with data:', queryData);

      const { username, password } = queryData;

      // 参数验证
      if (!username || !password) {
        return {
          code: RESPONSE_CODE.ERROR,
          message: '用户名、密码不能为空',
        };
      }

      // 创建用户
      const newUser = await this.userService.createUser({
        username,
        password,
      });

      // 不返回密码字段
      const { password: _, ...userWithoutPassword } = newUser;

      return {
        code: RESPONSE_CODE.SUCCESS,
        message: '注册成功',
        data: userWithoutPassword,
      };
    } catch (error: any) {
      return {
        code: RESPONSE_CODE.ERROR,
        message: error?.message || '注册失败',
      };
    }
  }
}