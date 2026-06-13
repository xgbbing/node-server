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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbGljZS9EZXNrdG9wL290aGVyY29kZS9ub2RlLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJhcHAvY29udHJvbGxlci9ob21lLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQWtFO0FBS2xFLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFLekIsS0FBSyxDQUFDLElBQUk7UUFDUixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRztZQUNkLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLFFBQVEsRUFBRTtnQkFDUixvQkFBb0I7Z0JBQ3BCLGVBQWU7Z0JBQ2YsZUFBZTtnQkFDZixhQUFhO2FBQ2Q7U0FDRixDQUFDO1FBQ0YsV0FBVztRQUNYLGdDQUFnQztRQUNoQyx1QkFBdUI7UUFDdkIsSUFBSTtJQUNOLENBQUM7Q0FDRixDQUFBO0FBbEJDO0lBREMsSUFBQSxhQUFNLEdBQUU7OzJDQUNLO0FBR2Q7SUFEQyxJQUFBLFVBQUcsRUFBQyxHQUFHLENBQUM7Ozs7MENBZVI7QUFuQlUsY0FBYztJQUYxQixJQUFBLGNBQU8sR0FBRTtJQUNULElBQUEsaUJBQVUsRUFBQyxHQUFHLENBQUM7R0FDSCxjQUFjLENBb0IxQjtBQXBCWSx3Q0FBYyJ9