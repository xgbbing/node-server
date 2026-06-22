import { Middleware, IMiddleware, Inject, Config } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { RESPONSE_CODE, ERROR_MESSAGES } from '../../constant';

@Middleware()
export class JWTRouteAuthMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  userService: UserService;

  @Config('jwt')
  jwtConfig: any;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 白名单路径，无需验证
      const whiteList = [
        '/api/user/login',
        '/api/user/register',
        '/api/user/logout',
        '/api/test',
        '/',
        '/api/user/profile' // 我们将单独处理这个端点
      ];

      // 检查路径是否在白名单中
      const isWhiteList = whiteList.some(path => ctx.path.startsWith(path));
      
      if (isWhiteList) {
        await next();
        return;
      }

      // 从 header 中获取 token
      let token = ctx.headers.authorization;
      if (token && token.startsWith('Bearer ')) {
        token = token.substring(7);
      }

      if (!token) {
        ctx.status = 401;
        ctx.body = {
          code: RESPONSE_CODE.UNAUTHORIZED,
          message: ERROR_MESSAGES.UNAUTHORIZED,
        };
        return;
      }

      // 验证 token
      try {
        const decoded = this.userService.verifyToken(token);
        if (!decoded) {
          ctx.status = 401;
          ctx.body = {
            code: RESPONSE_CODE.UNAUTHORIZED,
            message: ERROR_MESSAGES.UNAUTHORIZED,
          };
          return;
        }

        // 验证用户是否存在
        const user = await this.userService.findById(decoded.id);
        if (!user) {
          ctx.status = 401;
          ctx.body = {
            code: RESPONSE_CODE.UNAUTHORIZED,
            message: ERROR_MESSAGES.UNAUTHORIZED,
          };
          return;
        }

        // 将用户信息附加到 ctx 上下文中
        ctx.currentUser = user;
        
        await next();
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          code: RESPONSE_CODE.UNAUTHORIZED,
          message: ERROR_MESSAGES.UNAUTHORIZED,
        };
      }
    };
  }

  static getName(): string {
    return 'JWTRouteAuth';
  }
}