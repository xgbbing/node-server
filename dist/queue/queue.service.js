"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const core_1 = require("@midwayjs/core");
const bull_1 = __importDefault(require("bull"));
let QueueService = class QueueService {
    constructor() {
        this.queues = new Map();
        this.initialized = false;
        // 延迟初始化队列，避免在 Redis 不可用时阻止应用启动
    }
    initQueues() {
        if (this.initialized) {
            return;
        }
        try {
            // 邮件发送队列
            const emailQueue = new bull_1.default('email queue', {
                redis: { port: 6379, host: '127.0.0.1' },
            });
            this.queues.set('email', emailQueue);
            // 短信发送队列
            const smsQueue = new bull_1.default('sms queue', {
                redis: { port: 6379, host: '127.0.0.1' },
            });
            this.queues.set('sms', smsQueue);
            // 通知发送队列
            const notificationQueue = new bull_1.default('notification queue', {
                redis: { port: 6379, host: '127.0.0.1' },
            });
            this.queues.set('notification', notificationQueue);
            // 添加队列事件监听器
            this.setupQueueListeners();
            this.initialized = true;
        }
        catch (error) {
            this.logger.error('Failed to initialize queues:', error);
            this.initialized = false;
        }
    }
    ensureInitialized() {
        this.initQueues();
    }
    setupQueueListeners() {
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
    async addEmailJob(data) {
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
    async addSmsJob(data) {
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
    async addNotificationJob(data) {
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
    async getQueueInfo(queueName) {
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
    processEmailJobs() {
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
    processSmsJobs() {
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
    processNotificationJobs() {
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
    startProcessing() {
        this.processEmailJobs();
        this.processSmsJobs();
        this.processNotificationJobs();
    }
};
__decorate([
    (0, core_1.Logger)(),
    __metadata("design:type", Object)
], QueueService.prototype, "logger", void 0);
QueueService = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Singleton),
    __metadata("design:paramtypes", [])
], QueueService);
exports.QueueService = QueueService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9xdWV1ZS9xdWV1ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFtRTtBQUNuRSxnREFBd0I7QUFLakIsSUFBTSxZQUFZLEdBQWxCLE1BQU0sWUFBWTtJQU92QjtRQUhRLFdBQU0sR0FBNEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUM1QyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUcxQiwrQkFBK0I7SUFDakMsQ0FBQztJQUVPLFVBQVU7UUFDaEIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLE9BQU87U0FDUjtRQUVELElBQUk7WUFDRixTQUFTO1lBQ1QsTUFBTSxVQUFVLEdBQUcsSUFBSSxjQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN6QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7YUFDekMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRXJDLFNBQVM7WUFDVCxNQUFNLFFBQVEsR0FBRyxJQUFJLGNBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3JDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTthQUN6QyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFakMsU0FBUztZQUNULE1BQU0saUJBQWlCLEdBQUcsSUFBSSxjQUFJLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ3ZELEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTthQUN6QyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsTUFB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