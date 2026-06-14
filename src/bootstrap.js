const { Bootstrap } = require('@midwayjs/bootstrap');

// 检查是否为生产环境，仅在生产环境执行 bootstrap
if (process.env.NODE_ENV === 'production') {
  Bootstrap.configure({
    // 这里引用的是编译后的入口，本地开发不走这个文件
    imports: require('./configuration'),
  }).run();
} else {
  console.log('Development mode: bootstrap skipped');
}