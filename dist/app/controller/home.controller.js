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
exports.HomeController = void 0;
const core_1 = require("@midwayjs/core");
let HomeController = class HomeController {
    async home() {
        this.ctx.body = {
            message: '这是关于页面',
            features: [
                '基于 Midway + Egg 框架',
                '使用 SQLite 数据库',
                'TypeScript 编写',
                '包含完整的用户认证系统'
            ]
        };
        // return {
        //   message: 'Hello Midwayjs!',
        //   query: this.ctx.ip
        // }
    }
};
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], HomeController.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "home", null);
HomeController = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Controller)('/')
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb250cm9sbGVyL2hvbWUuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBa0U7QUFLM0QsSUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBYztJQUtuQixBQUFOLEtBQUssQ0FBQyxJQUFJO1FBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUc7WUFDZCxPQUFPLEVBQUUsUUFBUTtZQUNqQixRQUFRLEVBQUU7Z0JBQ1Isb0JBQW9CO2dCQUNwQixlQUFlO2dCQUNmLGVBQWU7Z0JBQ2YsYUFBYTthQUNkO1NBQ0YsQ0FBQztRQUNGLFdBQVc7UUFDWCxnQ0FBZ0M7UUFDaEMsdUJBQXVCO1FBQ3ZCLElBQUk7SUFDTixDQUFDO0NBQ0YsQ0FBQTtBQW5CQztJQUFDLElBQUEsYUFBTSxHQUFFOzsyQ0FDSztBQUdSO0lBREwsSUFBQSxVQUFHLEVBQUMsR0FBRyxDQUFDOzs7OzBDQWVSO0FBbkJVLGNBQWM7SUFGMUIsSUFBQSxjQUFPLEdBQUU7SUFDVCxJQUFBLGlCQUFVLEVBQUMsR0FBRyxDQUFDO0dBQ0gsY0FBYyxDQW9CMUI7QUFwQlksd0NBQWMifQ==