/**
 * node /data/node-server/h5/build/test-deploy.js -b 分支 -p 后端地址
 * 100机器前端部署命令， 分支和后端地址是可选的，不变的话可以不传。
 */

require('shelljs/global');
var optimist = require('optimist');
var argv = optimist.argv;
var p = argv.p || '10.10.242.252:9007';
var project = 'h5';
var business = 'car';

cd(`/data/node-server/${business}/${project}`);
if (argv.b && typeof argv.b !== 'boolean') {
  exec(`git fetch`);
  exec(`git checkout ${argv.b}`);
}
exec(`git pull`);
exec(`cnpm install`);
exec(`npm run build`);
exec(`pm2 delete ${business}-${project}`);
exec(`pm2 start /data/node-server/${business}/${project}/build/build-server.js -n ${business}-${project} -- --proxy=${p}`);
