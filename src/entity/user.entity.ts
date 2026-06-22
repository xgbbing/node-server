import { Column, PrimaryGeneratedColumn, Entity, Index } from 'typeorm';

@Entity('users')
@Index(['username'], { unique: true }) // 添加用户名唯一索引
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text', { unique: true }) // 用户名唯一约束
  username!: string;

  @Column()
  password!: string;

  @Column({ name: 'created_at', nullable: true })
  createdAt?: Date;

  @Column({ name: 'last_login_at', nullable: true })
  lastLoginAt?: Date;

  @Column({ type: 'text', nullable: true }) // 添加邮箱字段
  email?: string;

  @Column({ type: 'text', nullable: true }) // 添加头像字段
  avatar?: string;

  @Column({ type: 'simple-enum', enum: ['active', 'inactive', 'banned'], default: 'active' }) // 添加用户状态
  status?: 'active' | 'inactive' | 'banned';

  // 添加扩展字段用来存储可能附带的信息
  @Column({ type: 'json', nullable: true, name: 'extra_info' })
  extraInfo?: Record<string, any>;
}