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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5tb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vY2svZGF0YS5tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQU93QjtBQUN4QixnRUFBNEQ7QUFHckQsSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZTtJQU8xQixLQUFLLENBQUMsS0FBSztRQUNULE1BQU0sWUFBWSxHQUFHLGdDQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztRQUN6RCxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUNoQyxnQ0FBYyxFQUNkLFlBQVksRUFDWixLQUFLLEVBQUMsTUFBTSxFQUFDLEVBQUU7WUFDYixJQUFJLE1BQU0sS0FBSyxXQUFXLEVBQUU7Z0JBQzFCLE9BQU87b0JBQ0wsV0FBVyxFQUFFO3dCQUNYLElBQUksRUFBRSxJQUFJO3dCQUNWLE1BQU0sRUFBRSxXQUFXO3dCQUNuQixJQUFJLEVBQUUsTUFBTTt3QkFDWixFQUFFLEVBQUUsSUFBSTt3QkFDUixFQUFFLEVBQUUsTUFBTTt3QkFDVixFQUFFLEVBQUUsS0FBSzt3QkFDVCxFQUFFLEVBQUUsU0FBUzt3QkFDYixHQUFHLEVBQUUsTUFBTTt3QkFDWCxHQUFHLEVBQUUsSUFBSTt3QkFDVCxJQUFJLEVBQUUsT0FBTzt3QkFDYixFQUFFLEVBQUUsS0FBSzt3QkFDVCxPQUFPLEVBQUUsR0FBRzt3QkFDWixLQUFLLEVBQUUsb0JBQW9CO3FCQUM1QjtpQkFDRixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDM0M7UUFDSCxDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxlQUFlO1FBQ2IsV0FBVztRQUNYLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUNGLENBQUE7QUF6Q0M7SUFBQyxJQUFBLFVBQUcsR0FBRTs7NENBQ21CO0FBRXpCO0lBQUMsSUFBQSxhQUFNLEdBQUU7OEJBQ0ssd0JBQWlCO29EQUFDO0FBTHJCLGVBQWU7SUFEM0IsSUFBQSxXQUFJLEdBQUU7R0FDTSxlQUFlLENBMEMzQjtBQTFDWSwwQ0FBZSJ9