/**
 * 项目接口定义
 */
// import { IMidwayApplication, IMidwayContext } from '@midwayjs/core';
import { Application, Context } from 'egg';

// 扩展 Context 接口
export interface ICustomContext extends Context {
  currentUser?: {
    id: number;
    username: string;
    role: string;
  };
}

// 扩展 Application 接口
export interface ICustomApplication extends Application { }

// 用户信息接口
export interface IUser {
  id: number;
  username: string;
  email: string;
  nickname?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

// 分页结果接口
export interface IPaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 响应结果接口
export interface IResponse<T = any> {
  code: number;
  message: string;
  data?: T;
  timestamp: number;
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