"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherEmptyDataError = void 0;
const core_1 = require("@midwayjs/core");
class WeatherEmptyDataError extends core_1.MidwayError {
    constructor(err) {
        super('weather data is empty', {
            cause: err,
        });
        if (err === null || err === void 0 ? void 0 : err.stack) {
            this.stack = err.stack;
        }
    }
}
exports.WeatherEmptyDataError = WeatherEmptyDataError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYWxpY2UvRGVza3RvcC9vdGhlcmNvZGUvbm9kZS1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiZXJyb3Ivd2VhdGhlci5lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5Q0FBNkM7QUFFN0MsTUFBYSxxQkFBc0IsU0FBUSxrQkFBVztJQUNwRCxZQUFZLEdBQVc7UUFDckIsS0FBSyxDQUFDLHVCQUF1QixFQUFFO1lBQzdCLEtBQUssRUFBRSxHQUFHO1NBQ1gsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztDQUNGO0FBVEQsc0RBU0MifQ==