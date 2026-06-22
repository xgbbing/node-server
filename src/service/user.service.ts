import { Provide, Logger, ILogger, Config } from '@midwayjs/core';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { hashPassword, comparePassword, generateToken } from '../utils';
import { IUserRegistration, IPaginationResult } from '../interface';
import * as jwt from 'jsonwebtoken';

@Provide()
export class UserService {
  @InjectEntityModel(UserEntity)
  userModel!: Repository<UserEntity>;

  @Logger()
  logger!: ILogger;
  
  @Config('jwt')
  jwtConfig!: {
    secret: string;
    expiresIn: string;
  };

  /**
   * 创建新用户
   */
  async createUser(userData: IUserRegistration): Promise<UserEntity> {
    const { username, password, email } = userData; // 移除 nickname

    // 检查用户是否已存在
    const existingUser = await this.userModel.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new Error('用户名已存在');
    }

    // 检查邮箱是否已存在（如果提供了邮箱）
    if (email) {
      const existingEmailUser = await this.userModel.findOne({
        where: { email },
      });
      if (existingEmailUser) {
        throw new Error('邮箱已被注册');
      }
    }

    // 加密密码
    const hashedPassword = await hashPassword(password);

    const user = new UserEntity();
    user.username = username;
    user.password = hashedPassword;
    user.email = email;
    // 不再设置 nickname
    user.createdAt = new Date();
    user.status = 'active'; // 默认激活状态

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
   * 生成JWT Token
   */
  generateToken(user: UserEntity): string {
    const payload = {
      id: user.id,
      username: user.username,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24小时过期
    };

    return generateToken(payload, this.jwtConfig.secret, this.jwtConfig.expiresIn);
  }

  /**
   * 验证JWT Token
   */
  verifyToken(token: string): any {
    // 移除 "Bearer " 前缀（如果存在）
    const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
    
    try {
      const decoded = jwt.verify(cleanToken, this.jwtConfig.secret);
      return decoded;
    } catch (error: any) {
      this.logger.error('Token验证失败:', error.message);
      return null;
    }
  }

  /**
   * 更新用户信息
   */
  async updateUser(id: number, updateData: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('用户不存在');
    }

    // 如果更新邮箱，检查邮箱是否已被其他用户使用
    if (updateData.email) {
      const existingEmailUser = await this.userModel.findOne({
        where: { email: updateData.email },
      });
      if (existingEmailUser && existingEmailUser.id !== id) {
        throw new Error('邮箱已被其他用户使用');
      }
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
      order: { id: 'DESC' }, // 按ID倒序排列
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
   * 查询所有用户（分页）
   */
  async findAll(page: number = 1, size: number = 10): Promise<IPaginationResult<UserEntity>> {
    const skip = (page - 1) * size;
    const [users, total] = await this.userModel.findAndCount({
      skip,
      take: size,
      order: { id: 'DESC' }, // 按ID倒序排列
    });
    
    return {
      list: users,
      total,
      page,
      size,
    }
  }
  
  /**
   * 检查用户名是否已存在
   */
  async isUsernameExists(username: string, excludeUserId?: number): Promise<boolean> {
    const queryBuilder = this.userModel.createQueryBuilder('user')
      .where('user.username = :username', { username });
    
    if (excludeUserId) {
      queryBuilder.andWhere('user.id != :excludeUserId', { excludeUserId });
    }
    
    const user = await queryBuilder.getOne();
    return !!user;
  }
  
  /**
   * 检查邮箱是否已存在
   */
  async isEmailExists(email: string, excludeUserId?: number): Promise<boolean> {
    if (!email) return false;
    
    const queryBuilder = this.userModel.createQueryBuilder('user')
      .where('user.email = :email', { email });
    
    if (excludeUserId) {
      queryBuilder.andWhere('user.id != :excludeUserId', { excludeUserId });
    }
    
    const user = await queryBuilder.getOne();
    return !!user;
  }
}