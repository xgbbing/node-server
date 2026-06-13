"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const core_1 = require("@midwayjs/core");
let AuthMiddleware = class AuthMiddleware {
    resolve() {
        return async (ctx, next) => {
            // 白名单路径，无需验证
            const whiteList = ['/api/user/login', '/api/user/register', '/api/user/logout', '/api/test'];
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
};
AuthMiddleware = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Singleton),
    (0, core_1.Middleware)()
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbGljZS9EZXNrdG9wL290aGVyY29kZS9ub2RlLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvbWlkZGxld2FyZS9hdXRoLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUNBQW9GO0FBTXBGLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFDekIsT0FBTztRQUNMLE9BQU8sS0FBSyxFQUFFLEdBQVksRUFBRSxJQUFrQixFQUFFLEVBQUU7WUFDaEQsYUFBYTtZQUNiLE1BQU0sU0FBUyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsb0JBQW9CLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFFN0Ysa0JBQWtCO1lBQ2xCLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQ3JELE1BQU0sSUFBSSxFQUFFLENBQUM7Z0JBQ2IsT0FBTzthQUNSO1lBRUQsZUFBZTtZQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZDLFdBQVc7Z0JBQ1gsR0FBRyxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2dCQUMxQyxPQUFPO2FBQ1I7WUFFRCxnQkFBZ0I7WUFDaEIsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBTztRQUNaLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRixDQUFBO0FBM0JZLGNBQWM7SUFIMUIsSUFBQSxjQUFPLEdBQUU7SUFDVCxJQUFBLFlBQUssRUFBQyxnQkFBUyxDQUFDLFNBQVMsQ0FBQztJQUMxQixJQUFBLGlCQUFVLEdBQUU7R0FDQSxjQUFjLENBMkIxQjtBQTNCWSx3Q0FBYyJ9