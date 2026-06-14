import { Provide, Logger, ILogger } from '@midwayjs/core';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { MonitorEntity } from '../entity/monitor.entity';

@Provide()
export class MonitorService {
  @InjectEntityModel(MonitorEntity)
  monitorModel!: Repository<MonitorEntity>;

  @Logger()
  logger!: ILogger;

  /**
   * 创建一条数据
   */
  async create(queryData): Promise<MonitorEntity> {

    let monitor = new MonitorEntity();
    monitor = queryData

    const savedData = await this.monitorModel.save(monitor);

    return savedData;
  }
}