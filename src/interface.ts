/**
 * 项目接口定义
 */
import { Application, Context } from '@midwayjs/koa';

// 扩展 Context 接口
export interface ICustomContext extends Context {
  currentUser?: {
    id: number;
    username: string;
  };
}

// 扩展 Application 接口
export interface ICustomApplication extends Application { }

// 用户信息接口
export interface IUser {
  id: number;
  username: string;
  email?: string;
  // 移除 nickname 字段
  avatar?: string;
  status?: 'active' | 'inactive' | 'banned';
  createdAt?: Date;
  lastLoginAt?: Date;
  extraInfo?: Record<string, any>;
}

// 用户登录凭证接口
export interface IUserCredentials {
  username: string;
  password: string;
}

// 用户注册信息接口
export interface IUserRegistration {
  username: string;
  password: string;
  email?: string;
  // 移除 nickname 字段
}

// JWT Token载荷接口
export interface ITokenPayload {
  id: number;
  username: string;
  exp?: number;
  iat?: number;
}

// 分页查询结果接口
export interface IPaginationResult<T> {
  list: T[];
  total: number;
  page: number;
  size: number;
}

// API响应接口
export interface IApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

export interface WeatherInfo {
  weatherinfo: {
    city: string;
    cityid: string;
    temp: string;
    WD: string;
    WS: string;
    SD: string;
    AP: string;
    njd: string;
    WSE: string;
    time: string;
    sm: string;
    isRadar: string;
    Radar: string;
  }
}