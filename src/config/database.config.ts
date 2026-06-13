import { DataSourceOptions } from 'typeorm';
import * as path from 'path';

// 根据环境变量确定数据库路径
const getDbPath = (): string => {
  const env = process.env.NODE_ENV || 'development';

  if (env === 'production') {
    // 线上环境：使用 /data/myapp/database/
    return path.join('/data/myapp/database', 'app.db');
  } else {
    // 本地调试环境：使用相对路径 database/
    return path.join(process.cwd(), 'database', 'app.db');
  }
};

// SQLite 数据库配置
export const databaseConfig: DataSourceOptions = {
  type: 'sqlite',
  database: getDbPath(),
  synchronize: process.env.NODE_ENV !== 'production', // 开发环境同步模式，生产环境关闭
  logging: process.env.NODE_ENV !== 'production', // 开发环境启用日志，生产环境关闭
  entities: [__dirname + '/../entity/**/*{.ts,.js}'],
  migrations: [__dirname + '/../migration/**/*{.ts,.js}'],
  subscribers: [__dirname + '/../subscriber/**/*{.ts,.js}'],
};

export default databaseConfig;