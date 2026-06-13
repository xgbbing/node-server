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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWUsQ0FBQyxPQUFzQixFQUFFLEVBQUU7SUFDeEMsTUFBTSxNQUFNLEdBQUcsRUFBa0IsQ0FBQztJQUVsQyxZQUFZO0lBQ1osb0JBQW9CO0lBQ3BCLGNBQWM7SUFDZCxxQ0FBcUM7SUFDckMsT0FBTztJQUNQLGVBQWU7SUFDZix3Q0FBd0M7SUFDeEMsd0JBQXdCO0lBQ3hCLG9DQUFvQztJQUNwQyxTQUFTO0lBQ1QsT0FBTztJQUNQLEtBQUs7SUFFTCxXQUFXO0lBQ1gsTUFBTSxDQUFDLFFBQVEsR0FBRztRQUNoQixlQUFlLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztLQUMzQyxDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDIn0=