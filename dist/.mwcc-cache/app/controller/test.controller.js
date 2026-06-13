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
let TestController = class TestController {
    async getWeatherInfo(queryData) {
        console.log(queryData.cityId);
        console.log(this.ctx);
        const query = this.ctx.query;
        console.log(query);
        console.log(this.app.getConfig());
        console.log(this.app.getEnv());
        const result = await this.weatherService.getWeather(queryData.cityId);
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
        for (let i = 0; i < 100; i++) {
            await (0, core_1.sleep)(1000);
            this.ctx.res.write('abc'.repeat(100));
        }
        this.ctx.res.end();
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
    (0, core_1.Get)('/wather'),
    (0, core_1.Redirect)('/get-weather', 302),
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
TestController = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Controller)('/api/test')
], TestController);
exports.TestController = TestController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbGljZS9EZXNrdG9wL290aGVyY29kZS9ub2RlLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvY29udHJvbGxlci90ZXN0LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQTBHO0FBRTFHLG1FQUErRDtBQUcvRCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBY3pCLEtBQUssQ0FBQyxjQUFjLENBQVUsU0FBNkI7UUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMvQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RSxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7SUFJRCxLQUFLLENBQUMsWUFBWTtRQUNoQixPQUFPO1FBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFHRCxLQUFLLENBQUMsY0FBYztRQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDN0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QixNQUFNLElBQUEsWUFBSyxFQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDdkM7UUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0NBQ0YsQ0FBQTtBQTNDQztJQURDLElBQUEsVUFBRyxHQUFFOzsyQ0FDWTtBQUdsQjtJQURDLElBQUEsYUFBTSxHQUFFOzsyQ0FDSztBQUdkO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1EsZ0NBQWM7c0RBQUM7QUFNaEM7SUFMQyxJQUFBLFVBQUcsRUFBQyxVQUFVLENBQUM7SUFDZixJQUFBLGdCQUFTLEVBQUM7UUFDVCxPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRSxLQUFLO0tBQ2YsQ0FBQztJQUNvQixXQUFBLElBQUEsWUFBSyxHQUFFLENBQUE7Ozs7b0RBVzVCO0FBSUQ7SUFGQyxJQUFBLFVBQUcsRUFBQyxTQUFTLENBQUM7SUFDZCxJQUFBLGVBQVEsRUFBQyxjQUFjLEVBQUUsR0FBRyxDQUFDOzs7O2tEQUk3QjtBQUdEO0lBREMsSUFBQSxVQUFHLEVBQUMsY0FBYyxDQUFDOzs7O29EQVVuQjtBQTVDVSxjQUFjO0lBRjFCLElBQUEsY0FBTyxHQUFFO0lBQ1QsSUFBQSxpQkFBVSxFQUFDLFdBQVcsQ0FBQztHQUNYLGNBQWMsQ0E2QzFCO0FBN0NZLHdDQUFjIn0=