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
if (argv.b) {
  exec(`git fetch`);
  exec(`git checkout ${argv.b}`);
}
exec(`git pull`);
exec(`cnpm install`);
exec(`npm run build`);
exec(`pm2 delete ${project}`);
exec(`pm2 start /data/node-server/${project}/build/build-server.js -n ${project} -- --proxy=${p}`);