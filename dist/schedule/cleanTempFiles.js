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
exports.CleanTempFilesTask = void 0;
const core_1 = require("@midwayjs/core");
// import { CronJob } from 'cron';
const path_1 = require("path");
const fs_1 = require("fs");
let CleanTempFilesTask = class CleanTempFilesTask {
    async cleanTempFiles() {
        try {
            const tempDir = (0, path_1.join)(__dirname, '../../temp');
            const files = await fs_1.promises.readdir(tempDir);
            for (const file of files) {
                const filePath = (0, path_1.join)(tempDir, file);
                const stat = await fs_1.promises.stat(filePath);
                // 删除超过24小时的文件
                if (Date.now() - stat.mtime.getTime() > 24 * 60 * 60 * 1000) {
                    await fs_1.promises.unlink(filePath);
                    this.logger.info(`Deleted temp file: ${filePath}`);
                }
            }
        }
        catch (error) {
            this.logger.error('Error cleaning temp files:', error);
        }
    }
    async handleCronEvent() {
        // await this.cleanTempFiles();
    }
};
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], CleanTempFilesTask.prototype, "logger", void 0);
__decorate([
    (0, core_1.ServerlessTrigger)('cron', {
        triggerName: 'cleanTempFiles',
        cronExpression: '0 0 2 * * ?',
        props: {},
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CleanTempFilesTask.prototype, "handleCronEvent", null);
CleanTempFilesTask = __decorate([
    (0, core_1.Provide)()
], CleanTempFilesTask);
exports.CleanTempFilesTask = CleanTempFilesTask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYW5UZW1wRmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NoZWR1bGUvY2xlYW5UZW1wRmlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9FO0FBQ3BFLGtDQUFrQztBQUNsQywrQkFBNEI7QUFDNUIsMkJBQTRDO0FBR3JDLElBQU0sa0JBQWtCLEdBQXhCLE1BQU0sa0JBQWtCO0lBSTdCLEtBQUssQ0FBQyxjQUFjO1FBQ2xCLElBQUk7WUFDRixNQUFNLE9BQU8sR0FBRyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDOUMsTUFBTSxLQUFLLEdBQUcsTUFBTSxhQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRWhELEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO2dCQUN4QixNQUFNLFFBQVEsR0FBRyxJQUFBLFdBQUksRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sSUFBSSxHQUFHLE1BQU0sYUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFN0MsY0FBYztnQkFDZCxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksRUFBRTtvQkFDM0QsTUFBTSxhQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsUUFBUSxFQUFFLENBQUMsQ0FBQztpQkFDcEQ7YUFDRjtTQUNGO1FBQUMsT0FBTyxLQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBT0ssQUFBTixLQUFLLENBQUMsZUFBZTtRQUNuQiwrQkFBK0I7SUFDakMsQ0FBQztDQUNGLENBQUE7QUEvQkM7SUFBQyxJQUFBLGFBQU0sR0FBRTs7a0RBQ0Y7QUEyQkQ7SUFMTCxJQUFBLHdCQUFpQixFQUFDLE1BQU0sRUFBRTtRQUN6QixXQUFXLEVBQUUsZ0JBQWdCO1FBQzdCLGNBQWMsRUFBRSxhQUFhO1FBQzdCLEtBQUssRUFBRSxFQUFFO0tBQ1YsQ0FBQzs7Ozt5REFHRDtBQS9CVSxrQkFBa0I7SUFEOUIsSUFBQSxjQUFPLEdBQUU7R0FDRyxrQkFBa0IsQ0FnQzlCO0FBaENZLGdEQUFrQiJ9