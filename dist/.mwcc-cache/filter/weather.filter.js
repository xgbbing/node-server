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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5maWx0ZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2FsaWNlL0Rlc2t0b3Avb3RoZXJjb2RlL25vZGUtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImZpbHRlci93ZWF0aGVyLmZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBdUM7QUFFdkMsMERBQStEO0FBRy9ELElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBQzdCLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBMEIsRUFBRSxHQUFZO1FBQ2xELEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sMERBQTBELENBQUM7SUFDcEUsQ0FBQztDQUNGLENBQUE7QUFMWSxrQkFBa0I7SUFEOUIsSUFBQSxZQUFLLEVBQUMscUNBQXFCLENBQUM7R0FDaEIsa0JBQWtCLENBSzlCO0FBTFksZ0RBQWtCIn0=