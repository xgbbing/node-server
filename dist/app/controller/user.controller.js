"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const core_1 = require("@midwayjs/core");
const user_service_1 = require("../../service/user.service");
const constant_1 = require("../../constant");
let UserController = class UserController {
    /**
     * 用户注册
     */
    async register(body) {
        try {
            const { username, password } = body;
            // 参数验证
            if (!username || !password) {
                return {
                    code: constant_1.RESPONSE_CODE.ERROR,
                    message: '用户名、密码不能为空',
                };
            }
            // 创建用户
            const newUser = await this.userService.createUser({
                username,
                password,
            });
            // 不返回密码字段
            const { password: _, ...userWithoutPassword } = newUser;
            return {
                code: constant_1.RESPONSE_CODE.SUCCESS,
                message: '注册成功',
                data: userWithoutPassword,
            };
        }
        catch (error) {
            return {
                code: constant_1.RESPONSE_CODE.ERROR,
                message: (error === null || error === void 0 ? void 0 : error.message) || '注册失败',
            };
        }
    }
    /**
     * 用户登录
     */
    async login(body, session) {
        try {
            const { username, password } = body;
            if (!username || !password) {
                return {
                    code: constant_1.RESPONSE_CODE.ERROR,
                    message: '用户名和密码不能为空',
                };
            }
            const user = await this.userService.validateUser(username, password);
            if (!user) {
                return {
                    code: constant_1.RESPONSE_CODE.ERROR,
                    message: '用户名或密码错误',
                };
            }
            // 更新最后登录时间
            await this.userService.updateLastLogin(user.id);
            // 设置会话
            session.userId = user.id;
            session.username = user.username;
            // 不返回密码字段
            const { password: _, ...userWithoutPassword } = user;
            return {
                code: constant_1.RESPONSE_CODE.SUCCESS,
                message: '登录成功',
                data: {
                    user: userWithoutPassword,
                    token: `Bearer ${Math.random().toString(36).substring(2, 15)}`
                },
            };
        }
        catch (error) {
            return {
                code: constant_1.RESPONSE_CODE.ERROR,
                message: (error === null || error === void 0 ? void 0 : error.message) || '登录失败',
            };
        }
    }
    /**
     * 用户登出
     */
    async logout(session) {
        // 清除会话
        session.userId = null;
        session.username = null;
        return {
            code: constant_1.RESPONSE_CODE.SUCCESS,
            message: '登出成功',
        };
    }
    /**
     * 获取当前用户信息
     */
    async profile(session) {
        if (!session.userId) {
            return {
                code: constant_1.RESPONSE_CODE.UNAUTHORIZED,
                message: constant_1.ERROR_MESSAGES.UNAUTHORIZED,
            };
        }
        const user = await this.userService.findById(session.userId);
        if (!user) {
            return {
                code: constant_1.RESPONSE_CODE.ERROR,
                message: '用户不存在',
            };
        }
        const { password: _, ...userWithoutPassword } = user;
        return {
            code: constant_1.RESPONSE_CODE.SUCCESS,
            message: '获取成功',
            data: userWithoutPassword,
        };
    }
    /**
     * 获取用户列表
     */
    async list(page = 1, size = 10) {
        try {
            const { users, total } = await this.userService.findAll(parseInt(page.toString()), parseInt(size.toString()));
            // 不返回密码字段
            const usersWithoutPassword = users.map(({ password: _, ...rest }) => rest);
            return {
                code: constant_1.RESPONSE_CODE.SUCCESS,
                message: '获取成功',
                data: {
                    list: usersWithoutPassword,
                    total,
                    page: parseInt(page.toString()),
                    size: parseInt(size.toString()),
                },
            };
        }
        catch (error) {
            return {
                code: constant_1.RESPONSE_CODE.ERROR,
                message: (error === null || error === void 0 ? void 0 : error.message) || '获取失败',
            };
        }
    }
};
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], UserController.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", user_service_1.UserService)
], UserController.prototype, "userService", void 0);
__decorate([
    (0, core_1.Post)('/register'),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, core_1.Post)('/login'),
    __param(0, (0, core_1.Body)()),
    __param(1, (0, core_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, core_1.Post)('/logout'),
    __param(0, (0, core_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    (0, core_1.Get)('/profile'),
    __param(0, (0, core_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "profile", null);
__decorate([
    (0, core_1.Get)('/list'),
    __param(0, (0, core_1.Query)('page')),
    __param(1, (0, core_1.Query)('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "list", null);
UserController = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Controller)('/api/user')
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb250cm9sbGVyL3VzZXIuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBOEY7QUFHOUYsNkRBQXlEO0FBQ3pELDZDQUErRDtBQUl4RCxJQUFNLGNBQWMsR0FBcEIsTUFBTSxjQUFjO0lBT3pCOztPQUVHO0lBRUcsQUFBTixLQUFLLENBQUMsUUFBUSxDQUFTLElBQVM7UUFDOUIsSUFBSTtZQUNGLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBRXBDLE9BQU87WUFDUCxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUMxQixPQUFPO29CQUNMLElBQUksRUFBRSx3QkFBYSxDQUFDLEtBQUs7b0JBQ3pCLE9BQU8sRUFBRSxZQUFZO2lCQUN0QixDQUFDO2FBQ0g7WUFFRCxPQUFPO1lBQ1AsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztnQkFDaEQsUUFBUTtnQkFDUixRQUFRO2FBQ1QsQ0FBQyxDQUFDO1lBRUgsVUFBVTtZQUNWLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEdBQUcsbUJBQW1CLEVBQUUsR0FBRyxPQUFPLENBQUM7WUFFeEQsT0FBTztnQkFDTCxJQUFJLEVBQUUsd0JBQWEsQ0FBQyxPQUFPO2dCQUMzQixPQUFPLEVBQUUsTUFBTTtnQkFDZixJQUFJLEVBQUUsbUJBQW1CO2FBQzFCLENBQUM7U0FDSDtRQUFDLE9BQU8sS0FBVSxFQUFFO1lBQ25CLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLHdCQUFhLENBQUMsS0FBSztnQkFDekIsT0FBTyxFQUFFLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLE9BQU8sS0FBSSxNQUFNO2FBQ2xDLENBQUM7U0FDSDtJ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