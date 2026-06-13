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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9taWRkbGV3YXJlL2F1dGgubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBb0Y7QUFNN0UsSUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBYztJQUN6QixPQUFPO1FBQ0wsT0FBTyxLQUFLLEVBQUUsR0FBWSxFQUFFLElBQWtCLEVBQUUsRUFBRTtZQUNoRCxhQUFhO1lBQ2IsTUFBTSxTQUFTLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxvQkFBb0IsRUFBRSxrQkFBa0IsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUU3RixrQkFBa0I7WUFDbEIsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtnQkFDckQsTUFBTSxJQUFJLEVBQUUsQ0FBQztnQkFDYixPQUFPO2FBQ1I7WUFFRCxlQUFlO1lBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDdkMsV0FBVztnQkFDWCxHQUFHLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQzFDLE9BQU87YUFDUjtZQUVELGdCQUFnQjtZQUNoQixNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGLENBQUE7QUEzQlksY0FBYztJQUgxQixJQUFBLGNBQU8sR0FBRTtJQUNULElBQUEsWUFBSyxFQUFDLGdCQUFTLENBQUMsU0FBUyxDQUFDO0lBQzFCLElBQUEsaUJBQVUsR0FBRTtHQUNBLGNBQWMsQ0EyQjFCO0FBM0JZLHdDQUFjIn0=