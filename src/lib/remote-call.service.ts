import { Provide, Logger } from '@midwayjs/core';
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ILogger } from '@midwayjs/logger';

@Provide()
export class RemoteCallService {
  @Logger()
  logger!: ILogger;

  /**
   * GET 请求
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      this.logger.info(`Making GET request to: ${url}`);
      const response = await axios.get<T>(url, config);
      this.logger.info(`GET request to ${url} completed with status: ${response.status}`);
      return response;
    } catch (error: any) {
      this.logger.error(`GET request to ${url} failed:`, error.message);
      throw error;
    }
  }

  /**
   * POST 请求
   */
  async post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      this.logger.info(`Making POST request to: ${url}`);
      const response = await axios.post<T, AxiosResponse<T>, D>(url, data, config);
      this.logger.info(`POST request to ${url} completed with status: ${response.status}`);
      return response;
    } catch (error: any) {
      this.logger.error(`POST request to ${url} failed:`, error.message);
      throw error;
    }
  }

  /**
   * PUT 请求
   */
  async put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      this.logger.info(`Making PUT request to: ${url}`);
      const response = await axios.put<T, AxiosResponse<T>, D>(url, data, config);
      this.logger.info(`PUT request to ${url} completed with status: ${response.status}`);
      return response;
    } catch (error: any) {
      this.logger.error(`PUT request to ${url} failed:`, error.message);
      throw error;
    }
  }

  /**
   * DELETE 请求
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      this.logger.info(`Making DELETE request to: ${url}`);
      const response = await axios.delete<T>(url, config);
      this.logger.info(`DELETE request to ${url} completed with status: ${response.status}`);
      return response;
    } catch (error: any) {
      this.logger.error(`DELETE request to ${url} failed:`, error.message);
      throw error;
    }
  }

  /**
   * 带重试机制的请求
   */
  async requestWithRetry<T = any, D = any>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: D,
    config?: AxiosRequestConfig,
    retries: number = 3
  ): Promise<AxiosResponse<T>> {
    let lastError: Error | null = null;

    for (let i = 0; i <= retries; i++) {
      try {
        this.logger.info(`Making ${method} request to: ${url} (attempt ${i + 1}/${retries + 1})`);

        let response: AxiosResponse<T>;

        switch (method.toUpperCase()) {
          case 'GET':
            response = await this.get<T>(url, config);
            break;
          case 'POST':
            response = await this.post<T, D>(url, data, config);
            break;
          case 'PUT':
            response = await this.put<T, D>(url, data, config);
            break;
          case 'DELETE':
            response = await this.delete<T>(url, config);
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }

        this.logger.info(`${method} request to ${url} succeeded on attempt ${i + 1}`);
        return response;
      } catch (error: any) {
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
  async concurrentRequests<T = any>(requests: Array<() => Promise<AxiosResponse<T>>>): Promise<AxiosResponse<T>[]> {
    try {
      this.logger.info(`Executing ${requests.length} concurrent requests`);
      const responses = await Promise.all(requests.map(req => req()));
      this.logger.info('All concurrent requests completed successfully');
      return responses;
    } catch (error: any) {
      this.logger.error('One or more concurrent requests failed:', error.message);
      throw error;
    }
  }

  /**
   * 请求拦截器设置
   */
  setupInterceptors(config: {
    requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
    responseInterceptor?: (
      response: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>;
    errorInterceptor?: (error: any) => any;
  }) {
    if (config.requestInterceptor) {
      axios.interceptors.request.use(config.requestInterceptor, undefined);
    }

    if (config.responseInterceptor || config.errorInterceptor) {
      axios.interceptors.response.use(config.responseInterceptor, config.errorInterceptor);
    }
  }
}