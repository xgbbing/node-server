import { Controller, Get, Post, Provide, Inject, Body, Query, Session } from '@midwayjs/decorator';
import { Context } from 'egg';
import { UserService } from '../../service/user.service';
// import { hashPassword } from '../../utils/index';
import { RESPONSE_CODE, ERROR_MESSAGES } from '../../constant';

@Provide()
@Controller('/api/user')
export class UserController {
  @Inject()
  ctx!: Context;

  @Inject()
  userService!: UserService;

  /**
   * 用户注册
   */
  @Post('/register')
  async register(@Body() body: any) {
    try {
      const { username, password, email, nickname } = body;

      // 参数验证
      if (!username || !password || !email) {
        return {
          code: RESPONSE_CODE.ERROR,
          message: '用户名、密码和邮箱不能为空',
        };
      }

      // 创建用户
      const newUser = await this.userService.createUser({
        username,
        password,
        email,
        nickname,
      });

      // 不返回密码字段
      const { password: _, ...userWithoutPassword } = newUser;

      return {
        code: RESPONSE_CODE.SUCCESS,
        message: '注册成功',
        data: userWithoutPassword,
      };
    } catch (error: any) {
      return {
        code: RESPONSE_CODE.ERROR,
        message: error?.message || '注册失败',
      };
    }
  }

  /**
   * 用户登录
   */
  @Post('/login')
  async login(@Body() body: any, @Session() session: any) {
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
          message: '用户名或密码错误',
        };
      }

      // 更新最后登录时间
      await this.userService.updateLastLogin(user.id);

      // 设置会话
      session.userId = user.id;
      session.username = user.username;
      session.role = user.role;

      // 不返回密码字段
      const { password: _, ...userWithoutPassword } = user;

      return {
        code: RESPONSE_CODE.SUCCESS,
        message: '登录成功',
        data: {
          user: userWithoutPassword,
          token: `Bearer ${Math.random().toString(36).substring(2, 15)}`
        },
      };
    } catch (error: any) {
      return {
        code: RESPONSE_CODE.ERROR,
        message: error?.message || '登录失败',
      };
    }
  }

  /**
   * 用户登出
   */
  @Post('/logout')
  async logout(@Session() session: any) {
    // 清除会话
    session.userId = null;
    session.username = null;
    session.role = null;

    return {
      code: RESPONSE_CODE.SUCCESS,
      message: '登出成功',
    };
  }

  /**
   * 获取当前用户信息
   */
  @Get('/profile')
  async profile(@Session() session: any) {
    if (!session.userId) {
      return {
        code: RESPONSE_CODE.UNAUTHORIZED,
        message: ERROR_MESSAGES.UNAUTHORIZED,
      };
    }

    const user = await this.userService.findById(session.userId);
    if (!user) {
      return {
        code: RESPONSE_CODE.ERROR,
        message: '用户不存在',
      };
    }

    const { password: _, ...userWithoutPassword } = user;

    return {
      code: RESPONSE_CODE.SUCCESS,
      message: '获取成功',
      data: userWithoutPassword,
    };
  }

  /**
   * 获取用户列表
   */
  @Get('/list')
  async list(@Query('page') page: number = 1, @Query('size') size: number = 10) {
    try {
      const { users, total } = await this.userService.findAll(
        parseInt(page.toString()),
        parseInt(size.toString())
      );

      // 不返回密码字段
      const usersWithoutPassword = users.map(({ password: _, ...rest }) => rest);

      return {
        code: RESPONSE_CODE.SUCCESS,
        message: '获取成功',
        data: {
          list: usersWithoutPassword,
          total,
          page: parseInt(page.toString()),
          size: parseInt(size.toString()),
        },
      };
    } catch (error: any) {
      return {
        code: RESPONSE_CODE.ERROR,
        message: error?.message || '获取失败',
      };
    }
  }
}