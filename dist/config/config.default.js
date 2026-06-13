"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = (appInfo) => {
    const config = {};
    config.keys = appInfo.name + '_1639994056460_8089';
    // Koa 端口配置
    config.koa = {
        port: 7001,
    };
    // 视图配置
    config.view = {
        defaultViewEngine: 'nunjucks',
        rootDir: {
            default: path_1.default.join(appInfo.baseDir, 'app/view'),
        }
    };
    // 静态资源配置
    // config.static = {
    //   prefix: '/public/',
    //   dir: [`${appInfo.baseDir}/app/public`, `${appInfo.baseDir}/src/app/public`],
    //   dynamic: true,
    //   preload: false,
    //   maxFiles: 1000,
    // };
    // 安全配置
    config.security = {
        csrf: {
            enable: false, // 在API项目中通常禁用CSRF
        },
        domainWhiteList: ['http://localhost:7001', 'http://127.0.0.1:7001'],
    };
    // 会话配置
    // config.session = {
    //   key: 'EGG_SESS',
    //   maxAge: 24 * 3600 * 1000, // 1天
    //   httpOnly: true,
    //   encrypt: true,
    // };
    // 中间件配置
    // config.middleware = ['auth'];
    // JWT 配置
    // config.jwt = {
    //   secret: 'your-secret-key-here',
    // };
    // 数据库配置
    config.orm = {
        type: 'sqlite',
        database: path_1.default.join(__dirname, '../../database/app.db'),
        synchronize: true,
        logging: true, // 开启日志
    };
    // Elasticsearch 配置
    // config.elasticsearch = {
    //   host: 'localhost:9200',
    //   log: 'info',
    // };
    // Redis 配置（用于消息队列）
    // config.redis = {
    //   client: {
    //     port: 6379,
    //     host: '127.0.0.1',
    //     password: '',
    //     db: 0,
    //   },
    // };
    // 插件开关配置
    // config.plugins = {
    //   static: true,
    //   session: true,
    //   nunjucks: true,
    // };
    // 默认分页配置
    // config.defaultPageSize = 10;
    // config.maxPageSize = 100;
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsZ0RBQXdCO0FBRXhCLGtCQUFlLENBQUMsT0FBc0IsRUFBRSxFQUFFO0lBQ3hDLE1BQU0sTUFBTSxHQUFHLEVBQWtCLENBQUM7SUFFbEMsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLHFCQUFxQixDQUFDO0lBRW5ELFdBQVc7SUFDWCxNQUFNLENBQUMsR0FBRyxHQUFHO1FBQ1gsSUFBSSxFQUFFLElBQUk7S0FDWCxDQUFDO0lBRUYsT0FBTztJQUNQLE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFDWixpQkFBaUIsRUFBRSxVQUFVO1FBQzdCLE9BQU8sRUFBRTtZQUNQLE9BQU8sRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDO1NBQ2hEO0tBQ0YsQ0FBQztJQUVGLFNBQVM7SUFDVCxvQkFBb0I7SUFDcEIsd0JBQXdCO0lBQ3hCLGlGQUFpRjtJQUNqRixtQkFBbUI7SUFDbkIsb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUNwQixLQUFLO0lBRUwsT0FBTztJQUNQLE1BQU0sQ0FBQyxRQUFRLEdBQUc7UUFDaEIsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLEtBQUssRUFBRSxrQkFBa0I7U0FDbEM7UUFDRCxlQUFlLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSx1QkFBdUIsQ0FBQztLQUNwRSxDQUFDO0lBRUYsT0FBTztJQUNQLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsb0NBQW9DO0lBQ3BDLG9CQUFvQjtJQUNwQixtQkFBbUI7SUFDbkIsS0FBSztJQUVMLFFBQVE7SUFDUixnQ0FBZ0M7SUFFaEMsU0FBUztJQUNULGlCQUFpQjtJQUNqQixvQ0FBb0M7SUFDcEMsS0FBSztJQUVMLFFBQVE7SUFDUixNQUFNLENBQUMsR0FBRyxHQUFHO1FBQ1gsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsdUJBQXVCLENBQUM7UUFDdkQsV0FBVyxFQUFFLElBQUk7UUFDakIsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPO0tBQ3ZCLENBQUM7SUFFRixtQkFBbUI7SUFDbkIsMkJBQTJCO0lBQzNCLDRCQUE0QjtJQUM1QixpQkFBaUI7SUFDakIsS0FBSztJQUVMLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsY0FBYztJQUNkLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsb0JBQW9CO0lBQ3BCLGFBQWE7SUFDYixPQUFPO0lBQ1AsS0FBSztJQUVMLFNBQVM7SUFDVCxxQkFBcUI7SUFDckIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixvQkFBb0I7SUFDcEIsS0FBSztJQUVMLFNBQVM7SUFDVCwrQkFBK0I7SUFDL0IsNEJBQTRCO0lBRTVCLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQyJ9