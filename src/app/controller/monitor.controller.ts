import { Controller, Inject, Provide, Body, Post } from '@midwayjs/core';
import { RESPONSE_CODE } from '../../constant';
import { MonitorService } from '../../service/monitor.service';

@Provide()
@Controller('/api/monitor')
export class TestController {
  @Inject()
  monitorService!: MonitorService;

  @Post('/log')
  async sendPv(@Body() body: any): Promise<any> {
    try {
      await this.monitorService.create(body);
      return {
        code: RESPONSE_CODE.SUCCESS,
      };
    } catch (error: any) {
      return {
        code: RESPONSE_CODE.ERROR,
        message: error?.message,
      };
    }
  }
}