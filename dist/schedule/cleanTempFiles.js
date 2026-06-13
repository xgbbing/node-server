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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYW5UZW1wRmlsZXMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2FsaWNlL0Rlc2t0b3Avb3RoZXJjb2RlL25vZGUtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbInNjaGVkdWxlL2NsZWFuVGVtcEZpbGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFvRTtBQUNwRSxrQ0FBa0M7QUFDbEMsK0JBQTRCO0FBQzVCLDJCQUE0QztBQUc1QyxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQUk3QixLQUFLLENBQUMsY0FBYztRQUNsQixJQUFJO1lBQ0YsTUFBTSxPQUFPLEdBQUcsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQzlDLE1BQU0sS0FBSyxHQUFHLE1BQU0sYUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVoRCxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtnQkFDeEIsTUFBTSxRQUFRLEdBQUcsSUFBQSxXQUFJLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLElBQUksR0FBRyxNQUFNLGFBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRTdDLGNBQWM7Z0JBQ2QsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUU7b0JBQzNELE1BQU0sYUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLFFBQVEsRUFBRSxDQUFDLENBQUM7aUJBQ3BEO2FBQ0Y7U0FDRjtRQUFDLE9BQU8sS0FBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQztJQU9ELEtBQUssQ0FBQyxlQUFlO1FBQ25CLCtCQUErQjtJQUNqQyxDQUFDO0NBQ0YsQ0FBQTtBQTlCQztJQURDLElBQUEsYUFBTSxHQUFFOztrREFDRjtBQTJCUDtJQUxDLElBQUEsd0JBQWlCLEVBQUMsTUFBTSxFQUFFO1FBQ3pCLFdBQVcsRUFBRSxnQkFBZ0I7UUFDN0IsY0FBYyxFQUFFLGFBQWE7UUFDN0IsS0FBSyxFQUFFLEVBQUU7S0FDVixDQUFDOzs7O3lEQUdEO0FBL0JVLGtCQUFrQjtJQUQ5QixJQUFBLGNBQU8sR0FBRTtHQUNHLGtCQUFrQixDQWdDOUI7QUFoQ1ksZ0RBQWtCIn0=