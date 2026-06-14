const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * 使用 esbuild 压缩目录中的JavaScript文件
 */
async function compressDistDirWithEsbuild(distPath) {
  console.log(`开始使用 esbuild 压缩 ${distPath} 目录中的JavaScript文件...`);

  const walkAndCompress = async (dir) => {
    const files = await fs.promises.readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.promises.stat(filePath);

      if (stat.isDirectory()) {
        // 递归处理子目录
        await walkAndCompress(filePath);
      } else if (file.endsWith('.js')) {
        // 对JavaScript文件使用esbuild进行压缩
        console.log(`正在使用 esbuild 压缩: ${filePath}`);
        try {
          // 创建临时文件进行压缩，然后替换原文件
          const tempFilePath = filePath + '.tmp';
          const result = spawnSync('npx', [
            'esbuild',
            '--minify',
            filePath,
            '--outfile=' + tempFilePath,
            '--allow-overwrite'
          ], { stdio: 'pipe' });

          if (result.status !== 0) {
            if (result.error) {
              console.warn(`压缩失败 ${filePath}:`, result.error.message);
            } else {
              console.warn(`压缩失败 ${filePath}:`, result.stderr.toString());
            }
          } else {
            // 替换原文件
            await fs.promises.rename(tempFilePath, filePath);
          }
        } catch (error) {
          console.warn(`压缩失败 ${filePath}:`, error.message);
        }
      }
    }
  };

  await walkAndCompress(distPath);
  console.log('esbuild 压缩完成');
}

/**
 * 主流程
 */
async function compress() {
  try {
    console.log('开始使用 esbuild 压缩 dist 目录...');

    // 使用 esbuild 压缩 dist 目录中的 JavaScript 文件
    const distPath = path.resolve('./dist');
    if (fs.existsSync(distPath)) {
      await compressDistDirWithEsbuild(distPath);
      console.log('esbuild 压缩完成！');
    } else {
      console.warn('警告: dist 目录不存在，请先执行构建');
    }
  } catch (error) {
    console.error('压缩过程中发生错误:', error);
    process.exit(1);
  }
}

// 执行
if (require.main === module) {
  compress();
}

module.exports = { compress };