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
exports.RemoteCallService = void 0;
const core_1 = require("@midwayjs/core");
const axios_1 = __importDefault(require("axios"));
let RemoteCallService = class RemoteCallService {
    /**
     * GET 请求
     */
    async get(url, config) {
        try {
            this.logger.info(`Making GET request to: ${url}`);
            const response = await axios_1.default.get(url, config);
            this.logger.info(`GET request to ${url} completed with status: ${response.status}`);
            return response;
        }
        catch (error) {
            this.logger.error(`GET request to ${url} failed:`, error.message);
            throw error;
        }
    }
    /**
     * POST 请求
     */
    async post(url, data, config) {
        try {
            this.logger.info(`Making POST request to: ${url}`);
            const response = await axios_1.default.post(url, data, config);
            this.logger.info(`POST request to ${url} completed with status: ${response.status}`);
            return response;
        }
        catch (error) {
            this.logger.error(`POST request to ${url} failed:`, error.message);
            throw error;
        }
    }
    /**
     * PUT 请求
     */
    async put(url, data, config) {
        try {
            this.logger.info(`Making PUT request to: ${url}`);
            const response = await axios_1.default.put(url, data, config);
            this.logger.info(`PUT request to ${url} completed with status: ${response.status}`);
            return response;
        }
        catch (error) {
            this.logger.error(`PUT request to ${url} failed:`, error.message);
            throw error;
        }
    }
    /**
     * DELETE 请求
     */
    async delete(url, config) {
        try {
            this.logger.info(`Making DELETE request to: ${url}`);
            const response = await axios_1.default.delete(url, config);
            this.logger.info(`DELETE request to ${url} completed with status: ${response.status}`);
            return response;
        }
        catch (error) {
            this.logger.error(`DELETE request to ${url} failed:`, error.message);
            throw error;
        }
    }
    /**
     * 带重试机制的请求
     */
    async requestWithRetry(url, method = 'GET', data, config, retries = 3) {
        let lastError = null;
        for (let i = 0; i <= retries; i++) {
            try {
                this.logger.info(`Making ${method} request to: ${url} (attempt ${i + 1}/${retries + 1})`);
                let response;
                switch (method.toUpperCase()) {
                    case 'GET':
                        response = await this.get(url, config);
                        break;
                    case 'POST':
                        response = await this.post(url, data, config);
                        break;
                    case 'PUT':
                        response = await this.put(url, data, config);
                        break;
                    case 'DELETE':
                        response = await this.delete(url, config);
                        break;
                    default:
                        throw new Error(`Unsupported method: ${method}`);
                }
                this.logger.info(`${method} request to ${url} succeeded on attempt ${i + 1}`);
                return response;
            }
            catch (error) {
                lastError = error;
                this.logger.warn(`Attempt ${i + 1} failed for ${method} request to ${url}:`, error.message);
                if (i < retries) {
                    // 指数退避策略
                    const delay = Math.pow(2, i) * 1000;
                    this.logger.info(`Waiting ${delay}ms before retry...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
        this.logger.error(`All ${retries + 1} attempts failed for ${method} request to ${url}`);
        throw lastError || new Error(`All ${retries + 1} attempts failed for ${method} request to ${url}`);
    }
    /**
     * 并发请求
     */
    async concurrentRequests(requests) {
        try {
            this.logger.info(`Executing ${requests.length} concurrent requests`);
            const responses = await Promise.all(requests.map(req => req()));
            this.logger.info('All concurrent requests completed successfully');
            return responses;
        }
        catch (error) {
            this.logger.error('One or more concurrent requests failed:', error.message);
            throw error;
        }
    }
    /**
     * 请求拦截器设置
     */
    setupInterceptors(config) {
        if (config.requestInterceptor) {
            axios_1.default.interceptors.request.use(config.requestInterceptor, undefined);
        }
        if (config.responseInterceptor || config.errorInterceptor) {
            axios_1.default.interceptors.response.use(config.responseInterceptor, config.errorInterceptor);
        }
    }
};
__decorate([
    (0, core_1.Logger)(),
    __metadata("design:type", Object)
], RemoteCallService.prototype, "logger", void 0);
RemoteCallService = __decorate([
    (0, core_1.Provide)()
], RemoteCallService);
exports.RemoteCallService = RemoteCallService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLWNhbGwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYWxpY2UvRGVza3RvcC9vdGhlcmNvZGUvbm9kZS1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibGliL3JlbW90ZS1jYWxsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQWlEO0FBQ2pELGtEQUE2RjtBQUk3RixJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUk1Qjs7T0FFRztJQUNILEtBQUssQ0FBQyxHQUFHLENBQVUsR0FBVyxFQUFFLE1BQTJCO1FBQ3pELElBQUk7WUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNsRCxNQUFNLFFBQVEsR0FBRyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUksR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLDJCQUEyQixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNwRixPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUFDLE9BQU8sS0FBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLFVBQVUsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEUsTUFBTSxLQUFLLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQW1CLEdBQVcsRUFBRSxJQUFRLEVBQUUsTUFBMkI7UUFDN0UsSUFBSTtZQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ25ELE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBSyxDQUFDLElBQUksQ0FBeUIsR0FBRyxFQUFFLElBQUksRUFBRSxN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