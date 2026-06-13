const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * 执行命令的辅助函数
 */
function execCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { stdio: 'inherit', ...options });
    
    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
      }
    });
  });
}

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
          const result = spawnSync('npx', ['esbuild', '--minify', filePath, '--outfile=' + filePath], { stdio: 'pipe' });
          
          if (result.status !== 0) {
            if (result.error) {
              console.warn(`压缩失败 ${filePath}:`, result.error.message);
            } else {
              console.warn(`压缩失败 ${filePath}:`, result.stderr.toString());
            }
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
 * 主构建流程
 */
async function build() {
  try {
    console.log('开始构建项目...');
    
    // 清理旧的 dist 目录
    if (fs.existsSync('./dist')) {
      await fs.promises.rm('./dist', { recursive: true, force: true });
      console.log('已清理旧的 dist 目录');
    }
    
    // 执行 midway-bin build 命令
    await execCommand('npx', ['midway-bin', 'build', '-c']);
    
    console.log('构建完成，开始使用 esbuild 压缩 dist 目录...');
    
    // 使用 esbuild 压缩 dist 目录中的 JavaScript 文件
    const distPath = path.resolve('./dist');
    if (fs.existsSync(distPath)) {
      await compressDistDirWithEsbuild(distPath);
      console.log('构建和 esbuild 压缩完成！');
    } else {
      console.warn('警告: dist 目录不存在，请检查构建过程是否成功');
    }
  } catch (error) {
    console.error('构建过程中发生错误:', error);
    process.exit(1);
  }
}

// 执行构建
if (require.main === module) {
  build();
}

module.exports = { build, compressDistDirWithEsbuild };