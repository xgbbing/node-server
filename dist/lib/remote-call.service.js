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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3RlLWNhbGwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvcmVtb3RlLWNhbGwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBaUQ7QUFDakQsa0RBQTZGO0FBSXRGLElBQU0saUJBQWlCLEdBQXZCLE1BQU0saUJBQWlCO0lBSTVCOztPQUVHO0lBQ0gsS0FBSyxDQUFDLEdBQUcsQ0FBVSxHQUFXLEVBQUUsTUFBMkI7UUFDekQsSUFBSTtZQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBSSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsMkJBQTJCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3BGLE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBQUMsT0FBTyxLQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsRSxNQUFNLEtBQUssQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBbUIsR0FBVyxFQUFFLElBQVEsRUFBRSxNQUEyQjtRQUM3RSxJQUFJO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDbkQsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFLLENBQUMsSUFBSSxDQUF5QixHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLDJCQUEyQixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNyRixPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUFDLE9BQU8sS0FBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixHQUFHLFVBQVUsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkUsTUFBTSxLQUFLLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxHQUFHLENBQW1CLEdBQVcsRUFBRSxJQUFRLEVBQUUsTUFBMkI7UUFDNUUsSUFBSTtZQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBeUIsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM1RSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRywyQkFBMkIsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDcEYsT0FBTyxRQUFRLENBQUM7U0FDakI7UUFBQyxPQUFPLEtBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sS0FBSyxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFVLEdBQVcsRUFBRSxNQUEyQjtRQUM1RCxJQUFJO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDckQsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFLLENBQUMsTUFBTSxDQUFJLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsR0FBRywyQkFBMkIsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDdkYsT0FBTyxRQUFRLENBQUM7U0FDakI7UUFBQyxPQUFPLEtBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxVQUFVLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sS0FBSyxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsZ0JBQWdCLENBQ3BCLEdBQVcsRUFDWCxTQUE0QyxLQUFLLEVBQ2pELElBQVEsRUFDUixNQUEyQixFQUMzQixVQUFrQixDQUFDO1FBRW5CLElBQUksU0FBUyxHQUFpQixJQUFJLENBQUM7UUFFbkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxJQUFJO2dCQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsTUFBTSxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTFGLElBQUksUUFBMEIsQ0FBQztnQkFFL0IsUUFBUSxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUU7b0JBQzVCLEtBQUssS0FBSzt3QkFDUixRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFJLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDMUMsTUFBTTtvQkFDUixLQUFLLE1BQU07d0JBQ1QsUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUNwRCxNQUFNO29CQUNSLEtBQUssS0FBSzt3QkFDUixRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQ25ELE1BQU07b0JBQ1IsS0FBSyxRQUFRO3dCQUNYLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUksR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUM3QyxNQUFNO29CQUNSO3dCQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLE1BQU0sRUFBRSxDQUFDLENBQUM7aUJBQ3BEO2dCQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxlQUFlLEdBQUcseUJBQXlCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5RSxPQUFPLFFBQVEsQ0FBQzthQUNqQjtZQUFDLE9BQU8sS0FBVSxFQUFFO2dCQUNuQixTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsTUFBTSxlQUFlLEdBQUcsR0FBRyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFNUYsSUFBSSxDQUFDLEdBQUcsT0FBTyxFQUFFO29CQUNmLFNBQVM7b0JBQ1QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssb0JBQW9CLENBQUMsQ0FBQztvQkFDdkQsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDMUQ7YUFFRjtTQUNGO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxPQUFPLEdBQUcsQ0FBQyx3QkFBd0IsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDeEYsTUFBTSxTQUFTLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxPQUFPLEdBQUcsQ0FBQyx3QkFBd0IsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDckcsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLGtCQUFrQixDQUFVLFFBQWdEO1FBQ2hGLElBQUk7WUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLFFBQVEsQ0FBQyxNQUFNLHNCQUFzQixDQUFDLENBQUM7WUFDckUsTUFBTSxTQUFTLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0RBQWdELENBQUMsQ0FBQztZQUNuRSxPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUFDLE9BQU8sS0FBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1RSxNQUFNLEtBQUssQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsaUJBQWlCLENBQUMsTUFNakI7UUFDQyxJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRTtZQUM3QixlQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsSUFBSSxNQUFNLENBQUMsbUJBQW1CLElBQUksTUFBTSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pELGVBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdEY7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQXRKQztJQUFDLElBQUEsYUFBTSxHQUFFOztpREFDUTtBQUZOLGlCQUFpQjtJQUQ3QixJQUFBLGNBQU8sR0FBRTtHQUNHLGlCQUFpQixDQXVKN0I7QUF2SlksOENBQWlCIn0=