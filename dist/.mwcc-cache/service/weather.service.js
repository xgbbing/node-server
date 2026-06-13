"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const core_1 = require("@midwayjs/core");
const weather_error_1 = require("../error/weather.error");
let WeatherService = class WeatherService {
    async getWeather(cityId) {
        if (!cityId) {
            throw new weather_error_1.WeatherEmptyDataError();
        }
        try {
            const result = await (0, core_1.makeHttpRequest)(`https://midwayjs.org/resource/${cityId}.json`, {
                dataType: 'json',
            });
            if (result.status === 200) {
                return result.data;
            }
            throw new weather_error_1.WeatherEmptyDataError();
        }
        catch (error) {
            throw new weather_error_1.WeatherEmptyDataError(error);
        }
    }
};
WeatherService = __decorate([
    (0, core_1.Provide)()
], WeatherService);
exports.WeatherService = WeatherService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbGljZS9EZXNrdG9wL290aGVyY29kZS9ub2RlLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJzZXJ2aWNlL3dlYXRoZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBMEQ7QUFFMUQsMERBQStEO0FBRy9ELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFDekIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFjO1FBQzdCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxNQUFNLElBQUkscUNBQXFCLEVBQUUsQ0FBQztTQUNuQztRQUVELElBQUk7WUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsc0JBQWUsRUFBYyxpQ0FBaUMsTUFBTSxPQUFPLEVBQUU7Z0JBQ2hHLFFBQVEsRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQztZQUVILElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3pCLE9BQU8sTUFBTSxDQUFDLElBQW1CLENBQUM7YUFDbkM7WUFDRCxNQUFNLElBQUkscUNBQXFCLEVBQUUsQ0FBQztTQUNuQztRQUFDLE9BQU8sS0FBVSxFQUFFO1lBQ25CLE1BQU0sSUFBSSxxQ0FBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QztJQUNILENBQUM7Q0FDRixDQUFBO0FBbkJZLGNBQWM7SUFEMUIsSUFBQSxjQUFPLEdBQUU7R0FDRyxjQUFjLENBbUIxQjtBQW5CWSx3Q0FBYyJ9