"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import path from 'path';
exports.default = (appInfo) => {
    const config = {};
    // 生产环境数据库配置（SQLite）
    // config.sqlite = {
    //   client: {
    //     storage: path.join('/data/myapp/database', 'app.db'),
    //   },
    // };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnByb2QuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2FsaWNlL0Rlc2t0b3Avb3RoZXJjb2RlL25vZGUtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImNvbmZpZy9jb25maWcucHJvZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJCQUEyQjtBQUUzQixrQkFBZSxDQUFDLE9BQXNCLEVBQUUsRUFBRTtJQUN4QyxNQUFNLE1BQU0sR0FBRyxFQUFrQixDQUFDO0lBRWxDLG9CQUFvQjtJQUNwQixvQkFBb0I7SUFDcEIsY0FBYztJQUNkLDREQUE0RDtJQUM1RCxPQUFPO0lBQ1AsS0FBSztJQUVMLFdBQVc7SUFDWCxNQUFNLENBQUMsUUFBUSxHQUFHO1FBQ2hCLGVBQWUsRUFBRSxDQUFDLHFCQUFxQixDQUFDO0tBQ3pDLENBQUM7SUFFRixXQUFXO0lBQ1gsb0JBQW9CO0lBQ3BCLG1CQUFtQjtJQUNuQiwwQkFBMEI7SUFDMUIsS0FBSztJQUVMLFNBQVM7SUFDVCxrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLEtBQUs7SUFFTCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUMifQ==