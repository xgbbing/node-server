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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const core_1 = require("@midwayjs/core");
const typeorm_1 = require("typeorm");
const orm_1 = require("@midwayjs/orm");
const user_entity_1 = require("../entity/user.entity");
const utils_1 = require("../utils");
let UserService = class UserService {
    /**
     * 创建新用户
     */
    async createUser(userData) {
        const { username, password } = userData;
        // 检查用户是否已存在
        const existingUser = await this.userModel.findOne({
            where: { username },
        });
        if (existingUser) {
            throw new Error('用户名已存在');
        }
        // 加密密码
        const hashedPassword = await (0, utils_1.hashPassword)(password);
        const user = new user_entity_1.UserEntity();
        user.username = username;
        user.password = hashedPassword;
        const savedUser = await this.userModel.save(user);
        // 记录日志
        this.logger.info(`用户 ${username} 创建成功`);
        return savedUser;
    }
    /**
     * 根据用户名查找用户
     */
    async findByUsername(username) {
        return await this.userModel.findOne({ where: { username } });
    }
    /**
     * 根据ID查找用户
     */
    async findById(id) {
        return await this.userModel.findOne({ where: { id } });
    }
    /**
     * 验证用户凭据
     */
    async validateUser(username, password) {
        const user = await this.findByUsername(username);
        if (!user) {
            return null;
        }
        const isValid = await (0, utils_1.comparePassword)(password, user.password);
        if (!isValid) {
            return null;
        }
        return user;
    }
    /**
     * 更新用户信息
     */
    async updateUser(id, updateData) {
        const user = await this.findById(id);
        if (!user) {
            throw new Error('用户不存在');
        }
        Object.assign(user, updateData);
        return await this.userModel.save(user);
    }
    /**
     * 删除用户
     */
    async deleteUser(id) {
        const result = await this.userModel.delete(id);
        return result.affected !== undefined && result.affected !== null && result.affected > 0;
    }
    /**
     * 获取所有用户
     */
    async findAllUsers(page = 1, size = 10) {
        const skip = (page - 1) * size;
        const [users, total] = await this.userModel.findAndCount({
            skip,
            take: size,
        });
        return {
            users,
            total,
            page,
            pageSize: size,
        };
    }
    /**
     *  更新用户最后登录时间
     */
    async updateLastLogin(userId) {
        await this.userModel.update(userId, {
            lastLoginAt: new Date(),
        });
    }
    /**
     * 查询所有用户
     */
    async findAll(page = 1, size = 10) {
        const skip = (page - 1) * size;
        const [users, total] = await this.userModel.findAndCount({
            skip,
            take: size,
        });
        return {
            users,
            total,
        };
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(user_entity_1.UserEntity),
    __metadata("design:type", typeorm_1.Repository)
], UserService.prototype, "userModel", void 0);
__decorate([
    (0, core_1.Logger)(),
    __metadata("design:type", Object)
], UserService.prototype, "logger", void 0);
UserService = __decorate([
    (0, core_1.Provide)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2UvdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFpRDtBQUNqRCxxQ0FBcUM7QUFDckMsdUNBQWtEO0FBQ2xELHVEQUFtRDtBQUNuRCxvQ0FBeUQ7QUFJbEQsSUFBTSxXQUFXLEdBQWpCLE1BQU0sV0FBVztJQU90Qjs7T0FFRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsUUFHaEI7UUFDQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLFFBQVEsQ0FBQztRQUV4QyxZQUFZO1FBQ1osTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUNoRCxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUU7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMzQjtRQUVELE9BQU87UUFDUCxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUEsb0JBQVksRUFBQyxRQUFRLENBQUMsQ0FBQztRQUVwRCxNQUFNLElBQUksR0FBRyxJQUFJLHdCQUFVLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQztRQUUvQixNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxELE9BQU87UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLFFBQVEsT0FBTyxDQUFDLENBQUM7UUFFeEMsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLGNBQWMsQ0FBQyxRQUFn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