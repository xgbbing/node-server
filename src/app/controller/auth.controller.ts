import { Controller, Get, Post, Provide, Inject, Body, Query, Session, Logger, ILogger, Config } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import { UserService } from '../../service/user.service';
import { RESPONSE_CODE, ERROR_MESSAGES, RESPONSE_MESSAGES } from '../../constant';
import { IUserRegistration } from '../../interface';

@Provide()
@Controller('/api/auth')
export class AuthController {
  @Inject()
  ctx!: Context;

  @Inject()
  userService!: UserService;

  @Config('jwt')
  jwtConfig: any;

  @Logger()
  logger!: ILogger;

  /**
   * 用户注册
   */
  @Post('/register')
  async register(@Body() body: IUserRegistration) {
    try {
      const { username, password, email } = body; // 移除 nickname

      // 参数验证
      if (!username || !password) {
        return {
          code: RESPONSE_CODE.ERROR,
          message: '用户名、密码不能为空',
        };
      }

      // 检查用户名是否已存在
      const usernameExists = await this.userService.isUsernameExists(username);
      if (usernameExists) {
        return {
          code: RESPONSE_CODE.ERROR,
          message: '用户名已存在',
        };
      }

      // 如果提供了邮箱，检查邮箱是否已存在
      if (email) {
        const emailExists = await this.userService.isEmailExists(email);
        if (emailExists) {
          return {
            code: RESPONSE_CODE.ERROR,
            message: '邮箱已被注册',
          };
        }
      }

      // 创建用户
      const newUser = await this.userService.createUser({
        username,
        password,
        email,
      });

      // 不返回密码字段
      const { password: _, ...userWithoutPassword } = newUser;

      return {
        code: RESPONSE_CODE.SUCCESS,
        message: RESPONSE_MESSAGES.REGISTER_SUCCESS,
        data: userWithoutPassword,
      };
    } catch (error: any) {
      this.logger.error('用户注册失败:', error);
      return {
        code: RESPONSE_CODE.ERROR,
        message: error?.message || RESPONSE_MESSAGES.REGISTER_FAILED,
      };
    }
  }

  /**
   * 用户登录
   */
  @Post('/login')
  async login(@Body() body: any) {
    try {
      const { username, password } = body;

      if (!username || !password) {
        return {
          code: RESPONSE_CODE.ERROR,
          message: '用户名和密码不能为空',
        };
      }

      const user = await this.userService.validateUser(username, password);
      if (!user) {
        return {
          code: RESPONSE_CODE.ERROR,
          message: ERROR_MESSAGES.INVALID_CREDENTIALS,
        };
      }

      // 更新最后登录时间
      await this.userService.updateLastLogin(user.id);

      // 生成JWT token
      const token = this.userService.generateToken(user);

      // 不返回密码字段
      const { password: _, ...userWithoutPassword } = user;

      return {
        code: RESPONSE_CODE.SUCCESS,
        message: RESPONSE_MESSAGES.LOGIN_SUCCESS,
        data: {
          user: userWithoutPassword,
          token,
        },
      };
    } catch (error: any) {
      this.logger.error('用户登录失败:', error);
      return {
        code: RESPONSE_CODE.ERROR,
        message: error?.message || RESPONSE_MESSAGES.LOGIN_FAILED,
      };
    }
  }

  /**
   * 用户登出
   */
  @Post('/logout')
  async logout() {
    // JWT是无状态的，不需要服务器端操作
    // 只需让客户端删除本地存储的token即可
    
    return {
      code: RESPONSE_CODE.SUCCESS,
      message: '登出成功',
    };
  }

  /**
   * 刷新令牌
   */
  @Post('/refresh-token')
  async refreshToken() {
    try {
      // 从请求头获取当前token
      let token = this.ctx.headers.authorization;
      if (token && token.startsWith('Bearer ')) {
        token = token.substring(7);
      }

      if (!token) {
        return {
          code: RESPONSE_CODE.UNAUTHORIZED,
          message: ERROR_MESSAGES.UNAUTHORIZED,
        };
      }

      // 验证当前token
      const decoded = this.userService.verifyToken(token);
      if (!decoded) {
        return {
          code: RESPONSE_CODE.UNAUTHORIZED,
          message: ERROR_MESSAGES.UNAUTHORIZED,
        };
      }

      // 根据用户ID获取最新用户信息
      const user = await this.userService.findById(decoded.id);
      if (!user) {
        return {
          code: RESPONSE_CODE.UNAUTHORIZED,
          message: ERROR_MESSAGES.UNAUTHORIZED,
        };
      }

      // 生成新token
      const newToken = this.userService.generateToken(user);

      return {
        code: RESPONSE_CODE.SUCCESS,
        message: '令牌刷新成功',
        data: {
          token: newToken,
        },
      };
    } catch (error: any) {
      this.logger.error('刷新令牌失败:', error);
      return {
        code: RESPONSE_CODE.ERROR,
        message: '令牌刷新失败',
      };
    }
  }

  /**
   * 获取当前用户信息
   */
  @Get('/profile')
  async profile() {
    try {
      // 从请求头获取token
      let token = this.ctx.headers.authorization;
      if (token && token.startsWith('Bearer ')) {
        token = token.substring(7);
      }

      if (!token) {
        return {
          code: RESPONSE_CODE.UNAUTHORIZED,
          message: ERROR_MESSAGES.UNAUTHORIZED,
        };
      }

      // 验证token
      const decoded = this.userService.verifyToken(token);
      if (!decoded) {
        return {
          code: RESPONSE_CODE.UNAUTHORIZED,
          message: ERROR_MESSAGES.UNAUTHORIZED,
        };
      }

      // 根据解码后的用户ID获取用户信息
      const user = await this.userService.findById(decoded.id);
      if (!user) {
        return {
          code: RESPONSE_CODE.ERROR,
          message: ERROR_MESSAGES.USER_NOT_FOUND,
        };
      }

      // 不返回密码字段
      const { password: _, ...userWithoutPassword } = user;

      return {
        code: RESPONSE_CODE.SUCCESS,
        message: '获取成功',
        data: userWithoutPassword,
      };
    } catch (error: any) {
      this.logger.error('获取用户信息失败:', error);
      return {
        code: RESPONSE_CODE.ERROR,
        message: '获取用户信息失败',
      };
    }
  }
}