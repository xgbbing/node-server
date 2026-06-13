"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import path from 'path';
exports.default = (appInfo) => {
    const config = {};
    // 本地开发环境数据库配置（SQLite）
    // config.sqlite = {
    //   client: {
    //     storage: path.join(process.cwd(), 'database', 'app.db'),
    //   },
    // };
    // 本地开发时的其他配置
    config.security = {
        csrf: {
            enable: false, // 本地开发禁用csrf
        },
    };
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmxvY2FsLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbGljZS9EZXNrdG9wL290aGVyY29kZS9ub2RlLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJjb25maWcvY29uZmlnLmxvY2FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkJBQTJCO0FBRTNCLGtCQUFlLENBQUMsT0FBc0IsRUFBRSxFQUFFO0lBQ3hDLE1BQU0sTUFBTSxHQUFHLEVBQWtCLENBQUM7SUFFbEMsc0JBQXNCO0lBQ3RCLG9CQUFvQjtJQUNwQixjQUFjO0lBQ2QsK0RBQStEO0lBQy9ELE9BQU87SUFDUCxLQUFLO0lBRUwsYUFBYTtJQUNiLE1BQU0sQ0FBQyxRQUFRLEdBQUc7UUFDaEIsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLEtBQUssRUFBRSxhQUFhO1NBQzdCO0tBQ0YsQ0FBQztJQUVGLE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFDWixNQUFNLEVBQUUsR0FBRztRQUNYLFlBQVksRUFBRSx3Q0FBd0M7S0FDdkQsQ0FBQztJQUVGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQyJ9