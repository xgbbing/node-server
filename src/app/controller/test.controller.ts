import { App, Controller, Get, Inject, Provide, Query, SetHeader, Redirect, sleep } from '@midwayjs/core';
import { Context, Application } from '@midwayjs/koa';
import { WeatherService } from '../../service/weather.service';
@Provide()
@Controller('/api/test')
export class TestController {
  @App()
  app!: Application;

  @Inject()
  ctx!: Context;

  @Inject()
  weatherService!: WeatherService;
  @Get('/weather')
  @SetHeader({
    'x-bbb': '123',
    'x-ccc': '234'
  })
  async getWeatherInfo(@Query() queryData: { cityId: string }): Promise<void> {
    console.log(queryData.cityId);
    console.log(this.ctx);
    const query = this.ctx.query;
    console.log(query);
    console.log(this.app.getConfig());
    console.log(this.app.getEnv());
    const result = await this.weatherService.getWeather(queryData.cityId);
    if (result) {
      await this.ctx.render('home', result.weatherinfo);
    }
  }

  @Get('/wather')
  @Redirect('/get-weather', 302)
  async loginAnother() {
    // TODO
    console.log('redirecting to /weather');
  }

  @Get('/stream-data')
  async sendStreamData() {
    this.ctx.status = 200;
    this.ctx.set('Transfer-Encoding', 'chunked');
    for (let i = 0; i < 100; i++) {
      await sleep(1000);
      this.ctx.res.write('abc'.repeat(100));
    }

    this.ctx.res.end();
  }
}