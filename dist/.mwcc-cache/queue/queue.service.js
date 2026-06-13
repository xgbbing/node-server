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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYWxpY2UvRGVza3RvcC9vdGhlcmNvZGUvbm9kZS1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsicXVldWUvcXVldWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBbUU7QUFDbkUsZ0RBQXdCO0FBS3hCLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFPdkI7UUFIUSxXQUFNLEdBQTRCLElBQUksR0FBRyxFQUFFLENBQUM7UUFDNUMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFHMUIsK0JBQStCO0lBQ2pDLENBQUM7SUFFTyxVQUFVO1FBQ2hCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixPQUFPO1NBQ1I7UUFFRCxJQUFJO1lBQ0YsU0FBUztZQUNULE1BQU0sVUFBVSxHQUFHLElBQUksY0FBSSxDQUFDLGFBQWEsRUFBRTtnQkFDekMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO2FBQ3pDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztZQUVyQyxTQUFTO1lBQ1QsTUFBTSxRQUFRLEdBQUcsSUFBSSxjQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNyQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7YUFDekMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRWpDLFNBQVM7WUFDVCxNQUFNLGlCQUFpQixHQUFHLElBQUksY0FBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUN2RCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7YUFDekMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFFbkQsWUFBWTtZQUNaLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFTSxpQkFBaUI7UUFDdEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTyxtQkFBbUI7UUFDekIsS0FBSyxNQUFNLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDNUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLFFBQVEsR0FBRyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUM7WUFFSCxLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxTQUFTLFFBQVEsR0FBRyxDQUFDLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQy9ELENBQUMsQ0FBQyxDQUFDO1lBRUgsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxTQUFTLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUlqQjtRQUNDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7U0FDaEQ7UUFFRCxPQUFPLE1BQU0sVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7WUFDaEMsUUFBUSxFQUFFLENBQUM7WUFDWCxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLElBR2Y7UUFDQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsT0FBTyxNQUFNLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQzlCLFFBQVEsRUFBRSxDQUFDO1lBQ1gsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxhQUFhO2dCQUNuQixLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBSXhCO1FBQ0MsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQsT0FBTyxNQUFNLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7WUFDdkMsUUFBUSxFQUFFLENBQUM7WUFDWCxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQWlCO1FBQ2xDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLFNBQVMsU0FBUyxZQUFZLENBQUMsQ0FBQztTQUNqRDtRQUVELE1BQU0sT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sU0FBUyxHQUFHLE1BQU0sS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzdDLE1BQU0sTUFBTSxHQUFHLE1BQU0sS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXZDLE9BQU87WUFDTCxPQUFPLEVBQUUsT0FBTyxDQUFDLE1BQU07WUFDdkIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLFNBQVMsRUFBRSxTQUFTLENBQUMsTUFBTTtZQUMzQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07U0FDdEIsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILGdCQUFnQjtRQUNkLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7U0FDaEQ7UUFFRCxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUMvQixXQUFXO1lBQ1gsTUFBTSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsY0FBYyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBRTVELG1CQUFtQjtZQUNuQix1QkFBdUI7WUFFdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjO1FBQ1osTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztTQUM5QztRQUVELFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzdCLFdBQVc7WUFDWCxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsS0FBSyxjQUFjLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFFN0QsbUJBQW1CO1lBRW5CLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsdUJBQXVCO1FBQ3JCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztTQUN2RDtRQUVELGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDdEMsV0FBVztZQUNYLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxNQUFNLFlBQVksS0FBSyxFQUFFLENBQUMsQ0FBQztZQUV4RSxtQkFBbUI7WUFFbkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7Q0FDRixDQUFBO0FBMU5DO0lBREMsSUFBQSxhQUFNLEdBQUU7OzRDQUNRO0FBRk4sWUFBWTtJQUZ4QixJQUFBLGNBQU8sR0FBRTtJQUNULElBQUEsWUFBSyxFQUFDLGdCQUFTLENBQUMsU0FBUyxDQUFDOztHQUNkLFlBQVksQ0E0TnhCO0FBNU5ZLG9DQUFZIn0=