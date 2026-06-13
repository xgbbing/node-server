"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const core_1 = require("@midwayjs/core");
const weather_service_1 = require("../../service/weather.service");
const user_service_1 = require("../../service/user.service");
const constant_1 = require("../../constant");
let TestController = class TestController {
    async getWeatherInfo(queryData) {
        console.log(queryData.cityId, '======cityId');
        // console.log(this.ctx);
        // const query = this.ctx.query;
        // console.log(query);
        // console.log(this.app.getConfig());
        // console.log(this.app.getEnv());
        const result = await this.weatherService.getWeather(queryData.cityId || '1111');
        if (result) {
            await this.ctx.render('home', result.weatherinfo);
        }
    }
    async loginAnother() {
        // TODO
        console.log('redirecting to /weather');
    }
    async sendStreamData() {
        this.ctx.status = 200;
        this.ctx.set('Transfer-Encoding', 'chunked');
        for (let i = 0; i < 10; i++) {
            await (0, core_1.sleep)(1000);
            this.ctx.res.write('abc'.repeat(100));
        }
        this.ctx.res.end();
    }
    /**
       * 用户注册
       */
    async register() {
        try {
            const body = {
                username: 'testuser',
                password: '12345',
            };
            const { username, password } = body;
            // 参数验证
            if (!username || !password) {
                return {
                    code: constant_1.RESPONSE_CODE.ERROR,
                    message: '用户名、密码不能为空',
                };
            }
            // 创建用户
            const newUser = await this.userService.createUser({
                username,
                password,
            });
            // 不返回密码字段
            const { password: _, ...userWithoutPassword } = newUser;
            return {
                code: constant_1.RESPONSE_CODE.SUCCESS,
                message: '注册成功',
                data: userWithoutPassword,
            };
        }
        catch (error) {
            return {
                code: constant_1.RESPONSE_CODE.ERROR,
                message: (error === null || error === void 0 ? void 0 : error.message) || '注册失败',
            };
        }
    }
};
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], TestController.prototype, "app", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], TestController.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", weather_service_1.WeatherService)
], TestController.prototype, "weatherService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", user_service_1.UserService)
], TestController.prototype, "userService", void 0);
__decorate([
    (0, core_1.Get)('/weather'),
    (0, core_1.SetHeader)({
        'x-bbb': '123',
        'x-ccc': '234'
    }),
    __param(0, (0, core_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "getWeatherInfo", null);
__decorate([
    (0, core_1.Get)('/get-weather'),
    (0, core_1.Redirect)('/api/test/weather', 302),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestController.prototype, "loginAnother", null);
__decorate([
    (0, core_1.Get)('/stream-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestController.prototype, "sendStreamData", null);
__decorate([
    (0, core_1.Get)('/register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestController.prototype, "register", null);
TestController = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Controller)('/api/test')
], TestController);
exports.TestController = TestController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb250cm9sbGVyL3Rlc3QuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBMEc7QUFFMUcsbUVBQStEO0FBQy9ELDZEQUF5RDtBQUN6RCw2Q0FBK0M7QUFJeEMsSUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBYztJQWtCbkIsQUFBTixLQUFLLENBQUMsY0FBYyxDQUFVLFNBQTZCO1FBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM5Qyx5QkFBeUI7UUFDekIsZ0NBQWdDO1FBQ2hDLHNCQUFzQjtRQUN0QixxQ0FBcUM7UUFDckMsa0NBQWtDO1FBQ2xDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQztRQUNoRixJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7SUFJSyxBQUFOLEtBQUssQ0FBQyxZQUFZO1FBQ2hCLE9BQU87UUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDekMsQ0FBQztJQUdLLEFBQU4sS0FBSyxDQUFDLGNBQWM7UUFDbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7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