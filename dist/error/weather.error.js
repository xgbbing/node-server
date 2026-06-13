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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcnJvci93ZWF0aGVyLmVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlDQUE2QztBQUU3QyxNQUFhLHFCQUFzQixTQUFRLGtCQUFXO0lBQ3BELFlBQVksR0FBVztRQUNyQixLQUFLLENBQUMsdUJBQXVCLEVBQUU7WUFDN0IsS0FBSyxFQUFFLEdBQUc7U0FDWCxDQUFDLENBQUM7UUFDSCxJQUFJLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7U0FDeEI7SUFDSCxDQUFDO0NBQ0Y7QUFURCxzREFTQyJ9