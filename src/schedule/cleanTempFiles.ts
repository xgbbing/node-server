import { Provide, Inject, ServerlessTrigger } from '@midwayjs/core';
// import { CronJob } from 'cron';
import { join } from 'path';
import { promises as fsPromises } from 'fs';

@Provide()
export class CleanTempFilesTask {
  @Inject()
  logger;

  async cleanTempFiles(): Promise<void> {
    try {
      const tempDir = join(__dirname, '../../temp');
      const files = await fsPromises.readdir(tempDir);

      for (const file of files) {
        const filePath = join(tempDir, file);
        const stat = await fsPromises.stat(filePath);

        // 删除超过24小时的文件
        if (Date.now() - stat.mtime.getTime() > 24 * 60 * 60 * 1000) {
          await fsPromises.unlink(filePath);
          this.logger.info(`Deleted temp file: ${filePath}`);
        }
      }
    } catch (error: any) {
      this.logger.error('Error cleaning temp files:', error);
    }
  }

  @ServerlessTrigger('cron', {
    triggerName: 'cleanTempFiles',
    cronExpression: '0 0 2 * * ?', // 每天凌晨2点执行
    props: {},
  })
  async handleCronEvent() {
    // await this.cleanTempFiles();
  }
}