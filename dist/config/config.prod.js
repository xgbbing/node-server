"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = (appInfo) => {
    const config = {};
    // 生产环境数据库配置（SQLite）
    config.orm = {
        type: 'sqlite',
        database: path_1.default.join('/data/myapp/database', 'app.db'),
        synchronize: true,
        logging: false,
    };
    // 生产环境安全配置
    config.security = {
        domainWhiteList: ['https://xgbbing.win'],
    };
    // 生产环境日志级别
    // config.logger = {
    //   level: 'INFO',
    //   consoleLevel: 'INFO',
    // };
    // 关闭开发工具
    // config.info = {
    //   path: '/info',
    // };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnByb2QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5wcm9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsZ0RBQXdCO0FBRXhCLGtCQUFlLENBQUMsT0FBc0IsRUFBRSxFQUFFO0lBQ3hDLE1BQU0sTUFBTSxHQUFHLEVBQWtCLENBQUM7SUFFbEMsb0JBQW9CO0lBQ3BCLE1BQU0sQ0FBQyxHQUFHLEdBQUc7UUFDWCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLFFBQVEsQ0FBQztRQUNyRCxXQUFXLEVBQUUsSUFBSTtRQUNqQixPQUFPLEVBQUUsS0FBSztLQUNmLENBQUE7SUFFRCxXQUFXO0lBQ1gsTUFBTSxDQUFDLFFBQVEsR0FBRztRQUNoQixlQUFlLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztLQUN6QyxDQUFDO0lBRUYsV0FBVztJQUNYLG9CQUFvQjtJQUNwQixtQkFBbUI7SUFDbkIsMEJBQTBCO0lBQzFCLEtBQUs7SUFFTCxTQUFTO0lBQ1Qsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixLQUFLO0lBRUwsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDIn0=