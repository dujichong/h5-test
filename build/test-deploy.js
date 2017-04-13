/**
 * node /data/node-server/h5/build/test-deploy.js -b 分支 -p 后端地址
 * 100机器前端部署命令， 分支和后端地址是可选的，不变的话可以不传。
 */

require('shelljs/global');
var optimist = require('optimist');
var argv = optimist.argv;
var p = argv.p || '10.10.242.252:9007';

cd(`/data/node-server/car`);
if (argv.b) {
  exec(`git fetch`);
  exec(`git checkout ${argv.b}`);
}
exec(`git pull`);
exec(`cnpm install`);
exec(`npm run build`);
exec(`pm2 delete h5`);
exec(`pm2 start /data/node-server/h5/build/build-server.js -n h5 -- --proxy=${p}`);