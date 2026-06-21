import { Provide, Logger, ILogger, Inject } from '@midwayjs/core';
import { Repository } from 'typeorm';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { MonitorEntity } from '../entity/monitor.entity';
import { formatUTC8Date, getRealIp } from '../utils';

@Provide()
export class MonitorService {
  @InjectEntityModel(MonitorEntity)
  monitorModel!: Repository<MonitorEntity>;

  @Logger()
  logger!: ILogger;

  @Inject()
  ctx!: Context;

  /**
   * 创建一条数据
   */
  async create(queryData): Promise<MonitorEntity> {

    let monitor = new MonitorEntity();
    monitor = {
      ...queryData,
      user_ip: getRealIp(this.ctx),
      log_time: formatUTC8Date(queryData?.log_time),
    }

    this.logger.warn('save data====', JSON.stringify(monitor));

    const savedData = await this.monitorModel.save(monitor);

    return savedData;
  }
}