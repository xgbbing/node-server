import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  username!: string;

  @Column()
  password!: string;

  @Column({ name: 'created_at', nullable: true })
  createdAt?: Date;

  @Column({ name: 'last_login_at', nullable: true })
  lastLoginAt?: Date;

  // 添加扩展字段用来存储可能附带的信息
  @Column({ type: 'json', nullable: true, name: 'extra_info' })
  extraInfo?: Record<string, any>;
}