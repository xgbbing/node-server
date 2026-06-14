import { Context } from 'koa';

export async function devtoolsMiddleware(ctx: Context, next: () => Promise<any>) {
  // 检查请求路径是否为 Chrome DevTools 特定请求
  if (ctx.path === '/.well-known/appspecific/com.chrome.devtools.json') {
    // 返回空响应，状态码 204 表示无内容
    ctx.status = 204;
    ctx.body = '';
    return;
  }

  // 如果不是特殊路径，则继续执行下一个中间件
  await next();
}