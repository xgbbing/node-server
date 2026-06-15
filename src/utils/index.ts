/**
 * 公共工具函数
 */
import { Context } from '@midwayjs/koa';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

/**
 * 密码加密工具函数
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * 密码验证工具函数
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

/**
 * JWT token 生成工具函数
 */
export const generateToken = (payload: any, secret: string, expiresIn: string = '24h'): string => {
  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * JWT token 验证工具函数
 */
export const verifyToken = (token: string, secret: string): any => {
  try {
    return jwt.verify(token, secret);
  } catch (error: any) {
    return null;
  }
};

/**
 * 日期格式化工具函数
 */
export const formatDate = (date: Date | string, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  return moment(date).format(format);
};

/**
 * 生成唯一ID工具函数
 */
export const generateId = (): string => {
  return uuidv4();
};

/**
 * 分页数据处理工具函数
 */
export const paginate = (data: any[], page: number, size: number) => {
  const offset = (page - 1) * size;
  return {
    total: data.length,
    page,
    size,
    totalPages: Math.ceil(data.length / size),
    data: data.slice(offset, offset + size),
  };
};

/**
 * 深度克隆对象工具函数
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * 对象属性过滤工具函数
 */
export const pick = <T, K extends keyof T>(obj: Object, keys: any[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

/**
 * 数组去重工具函数
 */
export const uniqueArray = <T>(arr: T[]): T[] => {
  return Array.from(new Set(arr));
};

/**
 * 防抖工具函数
 */
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * 节流工具函数
 */
export const throttle = <F extends (...args: any[]) => any>(
  func: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  let lastExecTime = 0;
  return (...args: Parameters<F>): void => {
    const currentTime = Date.now();
    if (currentTime - lastExecTime >= delay) {
      func(...args);
      lastExecTime = currentTime;
    }
  };
};

// 封装一个获取 IP 的工具函数
export const getRealIp = (ctx: Context): string => {
  // 优先级：X-Forwarded-For > X-Real-IP > ctx.ip
  const xForwardedFor = ctx.req.headers['x-forwarded-for'] as string;
  if (xForwardedFor) {
    // X-Forwarded-For 可能包含多个 IP（代理链），取第一个
    return xForwardedFor.split(',')[0].trim();
  }

  const xRealIp = ctx.req.headers['x-real-ip'] as string;
  if (xRealIp) {
    return xRealIp;
  }

  // 兜底：ctx.ip，并去掉 IPv6 映射前缀
  return ctx.ip?.replace('::ffff:', '') || '';
};