"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
    config.keys = appInfo.name + '_1639994056460_8089';
    // 视图配置
    config.view = {
        defaultViewEngine: 'nunjucks',
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
    // config.orm = {
    //   type: 'sqlite',
    //   database: './database.sqlite',
    //   synchronize: true,
    //   logging: true,
    // };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2FsaWNlL0Rlc2t0b3Avb3RoZXJjb2RlL25vZGUtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImNvbmZpZy9jb25maWcuZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlLENBQUMsT0FBc0IsRUFBRSxFQUFFO0lBQ3hDLE1BQU0sTUFBTSxHQUFHLEVBQWtCLENBQUM7SUFFbEMsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLHFCQUFxQixDQUFDO0lBRW5ELE9BQU87SUFDUCxNQUFNLENBQUMsSUFBSSxHQUFHO1FBQ1osaUJBQWlCLEVBQUUsVUFBVTtLQUM5QixDQUFDO0lBRUYsU0FBUztJQUNULG9CQUFvQjtJQUNwQix3QkFBd0I7SUFDeEIsaUZBQWlGO0lBQ2pGLG1CQUFtQjtJQUNuQixvQkFBb0I7SUFDcEIsb0JBQW9CO0lBQ3BCLEtBQUs7SUFFTCxPQUFPO0lBQ1AsTUFBTSxDQUFDLFFBQVEsR0FBRztRQUNoQixJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUUsS0FBSyxFQUFFLGtCQUFrQjtTQUNsQztRQUNELGVBQWUsRUFBRSxDQUFDLHVCQUF1QixFQUFFLHVCQUF1QixDQUFDO0tBQ3BFLENBQUM7SUFFRixPQUFPO0lBQ1AscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQixvQ0FBb0M7SUFDcEMsb0JBQW9CO0lBQ3BCLG1CQUFtQjtJQUNuQixLQUFLO0lBRUwsUUFBUTtJQUNSLGdDQUFnQztJQUVoQyxTQUFTO0lBQ1QsaUJBQWlCO0lBQ2pCLG9DQUFvQztJQUNwQyxLQUFLO0lBRUwsUUFBUTtJQUNSLGlCQUFpQjtJQUNqQixvQkFBb0I7SUFDcEIsbUNBQW1DO0lBQ25DLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsS0FBSztJQUVMLG1CQUFtQjtJQUNuQiwyQkFBMkI7SUFDM0IsNEJBQTRCO0lBQzVCLGlCQUFpQjtJQUNqQixLQUFLO0lBRUwsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQixjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QixvQkFBb0I7SUFDcEIsYUFBYTtJQUNiLE9BQU87SUFDUCxLQUFLO0lBRUwsU0FBUztJQUNULHFCQUFxQjtJQUNyQixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLG9CQUFvQjtJQUNwQixLQUFLO0lBRUwsU0FBUztJQUNULCtCQUErQjtJQUMvQiw0QkFBNEI7SUFFNUIsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDIn0=