import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  email?: string;

  @Column({ nullable: true })
  nickname?: string;

  @Column({ default: 'user' }) // 默认为普通用户
  role?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ type: 'datetime', nullable: true })
  lastLoginAt?: Date;
}