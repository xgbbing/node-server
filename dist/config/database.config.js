"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const path_1 = __importDefault(require("path"));
// 根据环境变量确定数据库路径
const getDbPath = () => {
    const env = process.env.NODE_ENV || 'development';
    if (env === 'production') {
        // 线上环境：使用 /data/myapp/database/
        return path_1.default.join('/data/myapp/database', 'app.db');
    }
    else {
        // 本地调试环境：使用相对路径 database/
        return path_1.default.join(process.cwd(), 'database', 'app.db');
    }
};
// SQLite 数据库配置
exports.databaseConfig = {
    type: 'sqlite',
    database: getDbPath(),
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    entities: [__dirname + '/../entity/**/*{.ts,.js}'],
    // migrations: [__dirname + '/../migration/**/*{.ts,.js}'],
    // subscribers: [__dirname + '/../subscriber/**/*{.ts,.js}'],
};
exports.default = exports.databaseConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbGljZS9EZXNrdG9wL290aGVyY29kZS9ub2RlLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJjb25maWcvZGF0YWJhc2UuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLGdEQUF3QjtBQUV4QixnQkFBZ0I7QUFDaEIsTUFBTSxTQUFTLEdBQUcsR0FBVyxFQUFFO0lBQzdCLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLGFBQWEsQ0FBQztJQUVsRCxJQUFJLEdBQUcsS0FBSyxZQUFZLEVBQUU7UUFDeEIsZ0NBQWdDO1FBQ2hDLE9BQU8sY0FBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNwRDtTQUFNO1FBQ0wsMEJBQTBCO1FBQzFCLE9BQU8sY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ3ZEO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsZUFBZTtBQUNGLFFBQUEsY0FBYyxHQUFzQjtJQUMvQyxJQUFJLEVBQUUsUUFBUTtJQUNkLFFBQVEsRUFBRSxTQUFTLEVBQUU7SUFDckIsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVk7SUFDbEQsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVk7SUFDOUMsUUFBUSxFQUFFLENBQUMsU0FBUyxHQUFHLDBCQUEwQixDQUFDO0lBQ2xELDJEQUEyRDtJQUMzRCw2REFBNkQ7Q0FDOUQsQ0FBQztBQUVGLGtCQUFlLHNCQUFjLENBQUMifQ==