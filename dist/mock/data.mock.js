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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherDataMock = void 0;
const core_1 = require("@midwayjs/core");
const weather_service_1 = require("../service/weather.service");
let WeatherDataMock = class WeatherDataMock {
    async setup() {
        const originMethod = weather_service_1.WeatherService.prototype.getWeather;
        this.mockService.mockClassProperty(weather_service_1.WeatherService, 'getWeather', async (cityId) => {
            if (cityId === '101010100') {
                return {
                    weatherinfo: {
                        city: '北京',
                        cityid: '101010100',
                        temp: '27.9',
                        WD: '南风',
                        WS: '小于3级',
                        SD: '28%',
                        AP: '1002hPa',
                        njd: '暂无实况',
                        WSE: '<3',
                        time: '17:55',
                        sm: '2.1',
                        isRadar: '1',
                        Radar: 'JC_RADAR_AZ9010_JB',
                    },
                };
            }
            else {
                return originMethod.apply(this, [cityId]);
            }
        });
    }
    enableCondition() {
        // 模拟类启用的条件
        return ['local', 'test', 'unittest'].includes(this.app.getEnv());
    }
};
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], WeatherDataMock.prototype, "app", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", core_1.MidwayMockService)
], WeatherDataMock.prototype, "mockService", void 0);
WeatherDataMock = __decorate([
    (0, core_1.Mock)()
], WeatherDataMock);
exports.WeatherDataMock = WeatherDataMock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5tb2NrLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbGljZS9EZXNrdG9wL290aGVyY29kZS9ub2RlLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2NrL2RhdGEubW9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FPd0I7QUFDeEIsZ0VBQTREO0FBRzVELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFPMUIsS0FBSyxDQUFDLEtBQUs7UUFDVCxNQUFNLFlBQVksR0FBRyxnQ0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7UUFDekQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FDaEMsZ0NBQWMsRUFDZCxZQUFZLEVBQ1osS0FBSyxFQUFDLE1BQU0sRUFBQyxFQUFFO1lBQ2IsSUFBSSxNQUFNLEtBQUssV0FBVyxFQUFFO2dCQUMxQixPQUFPO29CQUNMLFdBQVcsRUFBRTt3QkFDWCxJQUFJLEVBQUUsSUFBSTt3QkFDVixNQUFNLEVBQUUsV0FBVzt3QkFDbkIsSUFBSSxFQUFFLE1BQU07d0JBQ1osRUFBRSxFQUFFLElBQUk7d0JBQ1IsRUFBRSxFQUFFLE1BQU07d0JBQ1YsRUFBRSxFQUFFLEtBQUs7d0JBQ1QsRUFBRSxFQUFFLFNBQVM7d0JBQ2IsR0FBRyxFQUFFLE1BQU07d0JBQ1gsR0FBRyxFQUFFLElBQUk7d0JBQ1QsSUFBSSxFQUFFLE9BQU87d0JBQ2IsRUFBRSxFQUFFLEtBQUs7d0JBQ1QsT0FBTyxFQUFFLEdBQUc7d0JBQ1osS0FBSyxFQUFFLG9CQUFvQjtxQkFDNUI7aUJBQ0YsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQzNDO1FBQ0gsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsZUFBZTtRQUNiLFdBQVc7UUFDWCxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FDRixDQUFBO0FBeENDO0lBREMsSUFBQSxVQUFHLEdBQUU7OzRDQUNtQjtBQUd6QjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNLLHdCQUFpQjtvREFBQztBQUxyQixlQUFlO0lBRDNCLElBQUEsV0FBSSxHQUFFO0dBQ00sZUFBZSxDQTBDM0I7QUExQ1ksMENBQWUifQ==