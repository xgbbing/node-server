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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2Uvd2VhdGhlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHlDQUEwRDtBQUUxRCwwREFBK0Q7QUFHeEQsSUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBYztJQUN6QixLQUFLLENBQUMsVUFBVSxDQUFDLE1BQWM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sSUFBSSxxQ0FBcUIsRUFBRSxDQUFDO1NBQ25DO1FBRUQsSUFBSTtZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxzQkFBZSxFQUFjLGlDQUFpQyxNQUFNLE9BQU8sRUFBRTtnQkFDaEcsUUFBUSxFQUFFLE1BQU07YUFDakIsQ0FBQyxDQUFDO1lBRUgsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDekIsT0FBTyxNQUFNLENBQUMsSUFBbUIsQ0FBQzthQUNuQztZQUNELE1BQU0sSUFBSSxxQ0FBcUIsRUFBRSxDQUFDO1NBQ25DO1FBQUMsT0FBTyxLQUFVLEVBQUU7WUFDbkIsTUFBTSxJQUFJLHFDQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFuQlksY0FBYztJQUQxQixJQUFBLGNBQU8sR0FBRTtHQUNHLGNBQWMsQ0FtQjFCO0FBbkJZLHdDQUFjIn0=