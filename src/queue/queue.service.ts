import { Provide, Logger, Scope, ScopeEnum } from '@midwayjs/core';
import Bull from 'bull';
import { ILogger } from '@midwayjs/logger';

@Provide()
@Scope(ScopeEnum.Singleton)
export class QueueService {
  @Logger()
  logger!: ILogger;

  private queues: Map<string, Bull.Queue> = new Map();
  private initialized = false;

  constructor() {
    // 延迟初始化队列，避免在 Redis 不可用时阻止应用启动
  }

  private initQueues(): void {
    if (this.initialized) {
      return;
    }

    try {
      // 邮件发送队列
      const emailQueue = new Bull('email queue', {
        redis: { port: 6379, host: '127.0.0.1' },
      });
      this.queues.set('email', emailQueue);

      // 短信发送队列
      const smsQueue = new Bull('sms queue', {
        redis: { port: 6379, host: '127.0.0.1' },
      });
      this.queues.set('sms', smsQueue);

      // 通知发送队列
      const notificationQueue = new Bull('notification queue', {
        redis: { port: 6379, host: '127.0.0.1' },
      });
      this.queues.set('notification', notificationQueue);

      // 添加队列事件监听器
      this.setupQueueListeners();
      this.initialized = true;
    } catch (error) {
      this.logger.error('Failed to initialize queues:', error);
      this.initialized = false;
    }
  }

  public ensureInitialized(): void {
    this.initQueues();
  }

  private setupQueueListeners(): void {
    for (const [queueName, queue] of this.queues) {
      queue.on('completed', (job) => {
        this.logger.info(`${queueName} job ${job.id} completed`);
      });

      queue.on('failed', (job, err) => {
        this.logger.error(`${queueName} job ${job.id} failed:`, err);
      });

      queue.on('error', (err) => {
        this.logger.error(`${queueName} queue error:`, err);
      });
    }
  }

  /**
   * 添加邮件任务到队列
   */
  async addEmailJob(data: {
    to: string;
    subject: string;
    content: string;
  }): Promise<Bull.Job> {
    const emailQueue = this.queues.get('email');
    if (!emailQueue) {
      throw new Error('Email queue not initialized');
    }

    return await emailQueue.add(data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });
  }

  /**
   * 添加短信任务到队列
   */
  async addSmsJob(data: {
    phone: string;
    message: string;
  }): Promise<Bull.Job> {
    const smsQueue = this.queues.get('sms');
    if (!smsQueue) {
      throw new Error('SMS queue not initialized');
    }

    return await smsQueue.add(data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });
  }

  /**
   * 添加通知任务到队列
   */
  async addNotificationJob(data: {
    userId: number;
    title: string;
    content: string;
  }): Promise<Bull.Job> {
    const notificationQueue = this.queues.get('notification');
    if (!notificationQueue) {
      throw new Error('Notification queue not initialized');
    }

    return await notificationQueue.add(data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });
  }

  /**
   * 获取队列信息
   */
  async getQueueInfo(queueName: string): Promise<any> {
    const queue = this.queues.get(queueName);
    if (!queue) {
      throw new Error(`Queue ${queueName} not found`);
    }

    const waiting = await queue.getWaiting();
    const active = await queue.getActive();
    const completed = await queue.getCompleted();
    const failed = await queue.getFailed();

    return {
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length,
    };
  }

  /**
   * 处理邮件任务
   */
  processEmailJobs(): void {
    const emailQueue = this.queues.get('email');
    if (!emailQueue) {
      throw new Error('Email queue not initialized');
    }

    emailQueue.process(async (job) => {
      // 模拟邮件发送逻辑
      const { to, subject } = job.data;
      console.log(`Sending email to: ${to}, subject: ${subject}`);

      // 实际的邮件发送逻辑应该在这里实现
      // 例如使用 nodemailer 发送邮件

      return { status: 'sent', to };
    });
  }

  /**
   * 处理短信任务
   */
  processSmsJobs(): void {
    const smsQueue = this.queues.get('sms');
    if (!smsQueue) {
      throw new Error('SMS queue not initialized');
    }

    smsQueue.process(async (job) => {
      // 模拟短信发送逻辑
      const { phone, message } = job.data;
      console.log(`Sending SMS to: ${phone}, message: ${message}`);

      // 实际的短信发送逻辑应该在这里实现

      return { status: 'sent', phone };
    });
  }

  /**
   * 处理通知任务
   */
  processNotificationJobs(): void {
    const notificationQueue = this.queues.get('notification');
    if (!notificationQueue) {
      throw new Error('Notification queue not initialized');
    }

    notificationQueue.process(async (job) => {
      // 模拟通知发送逻辑
      const { userId, title } = job.data;
      console.log(`Sending notification to user: ${userId}, title: ${title}`);

      // 实际的通知发送逻辑应该在这里实现

      return { status: 'sent', userId };
    });
  }

  /**
   * 启动所有队列处理器
   */
  startProcessing(): void {
    this.processEmailJobs();
    this.processSmsJobs();
    this.processNotificationJobs();
  }
}