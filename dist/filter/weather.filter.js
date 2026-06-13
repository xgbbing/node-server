"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherErrorFilter = void 0;
const core_1 = require("@midwayjs/core");
const weather_error_1 = require("../error/weather.error");
let WeatherErrorFilter = class WeatherErrorFilter {
    async catch(err, ctx) {
        ctx.logger.error(err);
        return '<html><body><h1>weather data is empty</h1></body></html>';
    }
};
WeatherErrorFilter = __decorate([
    (0, core_1.Catch)(weather_error_1.WeatherEmptyDataError)
], WeatherErrorFilter);
exports.WeatherErrorFilter = WeatherErrorFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5maWx0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZmlsdGVyL3dlYXRoZXIuZmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHlDQUF1QztBQUV2QywwREFBK0Q7QUFHeEQsSUFBTSxrQkFBa0IsR0FBeEIsTUFBTSxrQkFBa0I7SUFDN0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUEwQixFQUFFLEdBQVk7UUFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsT0FBTywwREFBMEQsQ0FBQztJQUNwRSxDQUFDO0NBQ0YsQ0FBQTtBQUxZLGtCQUFrQjtJQUQ5QixJQUFBLFlBQUssRUFBQyxxQ0FBcUIsQ0FBQztHQUNoQixrQkFBa0IsQ0FLOUI7QUFMWSxnREFBa0IifQ==