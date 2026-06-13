const { Bootstrap } = require('@midwayjs/bootstrap');
Bootstrap.configure({
  // 这里引用的是编译后的入口，本地开发不走这个文件
  imports: require('./configuration'),
  // 禁用依赖注入的目录扫描
  moduleDetector: false,
}).run();