import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';

@Provide()
@Scope(ScopeEnum.Singleton)
@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 白名单路径，无需验证
      const whiteList = ['/api/user/login', '/api/user/register', '/api/public'];

      // 如果是白名单路径，直接跳过验证
      if (whiteList.some(path => ctx.path.startsWith(path))) {
        await next();
        return;
      }

      // 检查会话中是否有用户信息
      if (!ctx.session || !ctx.session.userId) {
        // 重定向到登录页面
        ctx.redirect('https://login.xgbbing.win');
        return;
      }

      // 继续执行后续中间件或控制器
      await next();
    };
  }

  static getName() {
    return 'auth';
  }
}