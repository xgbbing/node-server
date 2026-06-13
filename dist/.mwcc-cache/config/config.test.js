"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
    // 测试环境数据库配置
    // config.sqlite = {
    //   client: {
    //     storage: './database/test.db',
    //   },
    //   default: {
    //     isolationLevel: 'READ_COMMITTED',
    //     dialectOptions: {
    //       collate: 'utf8_general_ci',
    //     },
    //   },
    // };
    // 测试环境安全配置
    config.security = {
        domainWhiteList: ['http://127.0.0.1:7001'],
    };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnRlc3QuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2FsaWNlL0Rlc2t0b3Avb3RoZXJjb2RlL25vZGUtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImNvbmZpZy9jb25maWcudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlLENBQUMsT0FBc0IsRUFBRSxFQUFFO0lBQ3hDLE1BQU0sTUFBTSxHQUFHLEVBQWtCLENBQUM7SUFFbEMsWUFBWTtJQUNaLG9CQUFvQjtJQUNwQixjQUFjO0lBQ2QscUNBQXFDO0lBQ3JDLE9BQU87SUFDUCxlQUFlO0lBQ2Ysd0NBQXdDO0lBQ3hDLHdCQUF3QjtJQUN4QixvQ0FBb0M7SUFDcEMsU0FBUztJQUNULE9BQU87SUFDUCxLQUFLO0lBRUwsV0FBVztJQUNYLE1BQU0sQ0FBQyxRQUFRLEdBQUc7UUFDaEIsZUFBZSxFQUFFLENBQUMsdUJBQXVCLENBQUM7S0FDM0MsQ0FBQztJQUVGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQyJ9