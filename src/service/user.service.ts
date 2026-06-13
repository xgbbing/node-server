import { Provide, Logger } from '@midwayjs/core';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { hashPassword, comparePassword } from '../utils';
import { ILogger } from '@midwayjs/logger';

@Provide()
export class UserService {
  @InjectEntityModel(UserEntity)
  userModel!: Repository<UserEntity>;

  @Logger()
  logger!: ILogger;

  /**
   * 创建新用户
   */
  async createUser(userData: {
    username: string;
    password: string;
  }): Promise<UserEntity> {
    const { username, password } = userData;

    // 检查用户是否已存在
    const existingUser = await this.userModel.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new Error('用户名已存在');
    }

    // 加密密码
    const hashedPassword = await hashPassword(password);

    const user = new UserEntity();
    user.username = username;
    user.password = hashedPassword;
    user.createdAt = new Date();

    const savedUser = await this.userModel.save(user);

    // 记录日志
    this.logger.info(`用户 ${username} 创建成功`);

    return savedUser;
  }

  /**
   * 根据用户名查找用户
   */
  async findByUsername(username: string): Promise<UserEntity | null> {
    return await this.userModel.findOne({ where: { username } });
  }

  /**
   * 根据ID查找用户
   */
  async findById(id: number): Promise<UserEntity | null> {
    return await this.userModel.findOne({ where: { id } });
  }

  /**
   * 验证用户凭据
   */
  async validateUser(username: string, password: string): Promise<UserEntity | null> {
    const user = await this.findByUsername(username);
    if (!user) {
      return null;
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return null;
    }

    return user;
  }

  /**
   * 更新用户信息
   */
  async updateUser(id: number, updateData: Partial<UserEntity>): Promise<UserEntity> {
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
  async deleteUser(id: number): Promise<boolean> {
    const result = await this.userModel.delete(id);
    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  }

  /**
   * 获取所有用户
   */
  async findAllUsers(page: number = 1, size: number = 10): Promise<{
    users: UserEntity[];
    total: number;
    page: number;
    pageSize: number;
  }> {
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
  async updateLastLogin(userId: number): Promise<void> {
    await this.userModel.update(userId, {
      lastLoginAt: new Date(),
    });
  }
  /**
   * 查询所有用户
   */
  async findAll(page: number = 1, size: number = 10): Promise<{ users: UserEntity[]; total: number }> {
    const skip = (page - 1) * size;
    const [users, total] = await this.userModel.findAndCount({
      skip,
      take: size,
    });
    return {
      users,
      total,
    }
  }
}