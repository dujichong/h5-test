/**
 * node /data/node-server/h5/build/test-deploy.js -b 分支 -p 后端地址
 * 测试环境前端部署命令， 分支和后端地址是可选的，不变的话可以不传。
 */

require('shelljs/global');
var optimist = require('optimist');
var argv = optimist.argv;
var p = argv.p || '10.10.242.252:9007';
var project = 'car';

cd(`/data/node-server/${project}`);
if (argv.b != 0) {
  console.log(`切换至分支： ${argv.b}`);
  exec(`git fetch`);
  exec(`git checkout ${argv.b}`);
}
else {
  console.log('分支未变更，开始拉取代码');
}
exec(`git pull`);
exec(`cnpm install`);
exec(`npm run build`);
console.log(`构建完成，开始启动 web server， 后端联调环境为：${p}`);
exec(`pm2 delete ${project}`);
exec(`pm2 start /data/node-server/${project}/build/build-server.js -n ${project} -- --proxy=${p}`);