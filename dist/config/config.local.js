"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import path from 'path';
exports.default = (appInfo) => {
    const config = {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmxvY2FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy9jb25maWcubG9jYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQkFBMkI7QUFFM0Isa0JBQWUsQ0FBQyxPQUFzQixFQUFFLEVBQUU7SUFDeEMsTUFBTSxNQUFNLEdBQUcsRUFBa0IsQ0FBQztJQUVsQyxhQUFhO0lBQ2IsTUFBTSxDQUFDLFFBQVEsR0FBRztRQUNoQixJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUUsS0FBSyxFQUFFLGFBQWE7U0FDN0I7S0FDRixDQUFDO0lBRUYsTUFBTSxDQUFDLElBQUksR0FBRztRQUNaLE1BQU0sRUFBRSxHQUFHO1FBQ1gsWUFBWSxFQUFFLHdDQUF3QztLQUN2RCxDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDIn0=