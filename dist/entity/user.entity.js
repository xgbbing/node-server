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
exports.UserEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
let UserEntity = class UserEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "lastLoginAt", void 0);
UserEntity = __decorate([
    (0, orm_1.EntityModel)('app')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5lbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW50aXR5L3VzZXIuZW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1QyxxQ0FBeUQ7QUFFbEQsSUFBTSxVQUFVLEdBQWhCLE1BQU0sVUFBVTtDQWV0QixDQUFBO0FBZEM7SUFBQyxJQUFBLGdDQUFzQixHQUFFOztzQ0FDYjtBQUVaO0lBQUMsSUFBQSxnQkFBTSxFQUFDLE1BQU0sQ0FBQzs7NENBQ0c7QUFFbEI7SUFBQyxJQUFBLGdCQUFNLEdBQUU7OzRDQUNTO0FBRWxCO0lBQUMsSUFBQSxnQkFBTSxHQUFFOzhCQUNHLElBQUk7NkNBQUM7QUFFakI7SUFBQyxJQUFBLGdCQUFNLEdBQUU7OEJBQ0ssSUFBSTsrQ0FBQztBQWRSLFVBQVU7SUFEdEIsSUFBQSxpQkFBVyxFQUFDLEtBQUssQ0FBQztHQUNOLFVBQVUsQ0FldEI7QUFmWSxnQ0FBVSJ9