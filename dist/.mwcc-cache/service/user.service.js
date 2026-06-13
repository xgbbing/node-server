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
const typeorm_2 = require("@midwayjs/typeorm");
const user_entity_1 = require("../entity/user.entity");
const utils_1 = require("../utils");
let UserService = class UserService {
    /**
     * 创建新用户
     */
    async createUser(userData) {
        const { username, email, password, nickname } = userData;
        // 检查用户是否已存在
        const existingUser = await this.userModel.findOne({
            where: [{ username }, { email }],
        });
        if (existingUser) {
            throw new Error('用户名或邮箱已存在');
        }
        // 加密密码
        const hashedPassword = await (0, utils_1.hashPassword)(password);
        const user = new user_entity_1.UserEntity();
        user.username = username;
        user.email = email;
        user.password = hashedPassword;
        user.nickname = nickname || username;
        user.role = 'user'; // 默认为普通用户
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
    (0, typeorm_2.InjectEntityModel)(user_entity_1.UserEntity),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbGljZS9EZXNrdG9wL290aGVyY29kZS9ub2RlLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJzZXJ2aWNlL3VzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBaUQ7QUFDakQscUNBQXFDO0FBQ3JDLCtDQUFzRDtBQUN0RCx1REFBbUQ7QUFDbkQsb0NBQXlEO0FBSXpELElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFPdEI7O09BRUc7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLFFBS2hCO1FBQ0MsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLFFBQVEsQ0FBQztRQUV6RCxZQUFZO1FBQ1osTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUNoRCxLQUFLLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FDakMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM5QjtRQUVELE9BQU87UUFDUCxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUEsb0JBQVksRUFBQyxRQUFRLENBQUMsQ0FBQztRQUVwRCxNQUFNLElBQUksR0FBRyxJQUFJLHdCQUFVLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSSxRQUFRLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxVQUFVO1FBRTlCLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEQsT0FBTztRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sUUFBUSxPQUFPLENBQUMsQ0FBQztRQUV4QyxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQWdCO1FBQ25DLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQVU7UUFDdkIsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBZ0IsRUFBRSxRQUFnQjtRQUNuRCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUEsdUJBQWUsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQVUsRUFBRSxVQUErQjtRQUMxRCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDMUI7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoQyxPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFVO1FBQ3pCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0MsT0FBTyxNQUFNLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQWUsQ0FBQyxFQUFFLE9BQWUsRUFBRTtRQU1wRCxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDL0IsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO1lBQ3ZELElBQUk7WUFDSixJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUMsQ0FBQztRQUVILE9BQU87WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLElBQUk7WUFDSixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQWM7UUFDbEMsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDbEMsV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFO1NBQ3hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRDs7T0FFRztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZSxDQUFDLEVBQUUsT0FBZSxFQUFFO1FBQy9DLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUMvQixNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7WUFDdkQsSUFBSTtZQUNKLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFDO1FBQ0gsT0FBTztZQUNMLEtBQUs7WUFDTCxLQUFLO1NBQ04sQ0FBQTtJQUNILENBQUM7Q0FDRixDQUFBO0FBNUlDO0lBREMsSUFBQSwyQkFBaUIsRUFBQyx3QkFBVSxDQUFDOzhCQUNsQixvQkFBVTs4Q0FBYTtBQUduQztJQURDLElBQUEsYUFBTSxHQUFFOzsyQ0FDUTtBQUxOLFdBQVc7SUFEdkIsSUFBQSxjQUFPLEdBQUU7R0FDRyxXQUFXLENBOEl2QjtBQTlJWSxrQ0FBVyJ9