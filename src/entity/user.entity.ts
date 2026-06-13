import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
@Entity('users')  // 修改表名为 'users'，更符合用户表的语义
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  username!: string;

  @Column()
  password!: string;

  @Column({ name: 'created_at' })
  createdAt!: Date;

  @Column({ name: 'last_login_at' })
  lastLoginAt!: Date;
}