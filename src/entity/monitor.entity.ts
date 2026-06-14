import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('monitor')
export class MonitorEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  /** 业务应用 ID  */
  @Column({ nullable: true })
  app_id!: string;

  /** 日志类型 */
  @Column({ nullable: true })
  log_type?: string;

  /** 日志上报地址 */
  @Column({ nullable: true })
  log_api?: string;

  /** 当前环境 */
  @Column({ nullable: true })
  env?: string;

  /** 用户 ID */
  @Column({ nullable: true })
  user_id?: string;

  /** 用户名称 */
  @Column({ nullable: true })
  user_name?: string;

  /** 用户角色 */
  @Column({ nullable: true })
  user_role?: string;

  /** 页面 ID */
  @Column({ nullable: true })
  page_id?: string;

  /** 页面标题 */
  @Column({ nullable: true })
  title?: string;

  /** 当前页面 URL 不含 query 和 hash */
  @Column({ nullable: true })
  url?: string;

  /** 当前页面完整URL */
  @Column({ nullable: true })
  origin_url?: string;

  /** 页面来源 */
  @Column({ nullable: true })
  referrer?: string;

  /** 浏览器信息 */
  @Column({ nullable: true })
  user_agent?: string;

  /** 当前页面分辨率  */
  @Column({ nullable: true })
  screen?: string;

  /** 国家 */
  @Column({ nullable: true })
  country?: string;

  /** 城市 */
  @Column({ nullable: true })
  city?: string;

  /** 省份 */
  @Column({ nullable: true })
  province?: string;

  /** 打点时间 */
  @Column({ nullable: true })
  log_time?: number;

  /** 页面加载到错误发生延迟时间 */
  @Column({ nullable: true })
  delay?: number;

  /** 是否灰度 */
  @Column({ nullable: true })
  gray?: boolean;

  /** 业务版本 */
  @Column({ nullable: true })
  biz_version?: string;

  /** 插件版本 */
  @Column({ nullable: true })
  plugin_version?: string;

  /** 应用 ID */
  @Column({ nullable: true })
  pid?: string;

  /** 扩展信息 */
  @Column({ type: 'json', nullable: true, name: 'extra_info' })
  extra_info?: Record<string, any>;
}