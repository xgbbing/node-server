import { Provide } from '@midwayjs/decorator';
import { Scope, ScopeEnum } from '@midwayjs/decorator';
import { IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';

@Provide()
@Scope(ScopeEnum.Singleton)
export class PermissionMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 检查用户权限
      const userId = ctx.session?.userId;
      const userRole = ctx.session?.role;

      if (!userId) {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          message: '请先登录',
        };
        return;
      }

      // 可以在这里添加更详细的权限控制逻辑
      // 比如根据路由路径判断需要的权限等级
      ctx.currentUser = { id: userId, role: userRole };

      await next();
    };
  }

  static getName() {
    return 'permission';
  }
}
