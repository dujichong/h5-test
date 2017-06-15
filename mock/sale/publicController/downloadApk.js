var rootPath = require('../../../config').rootPath;


module.exports = {
  api: rootPath + '/sale/publicController/downloadApk',
  response: function (req, res) {
    res.json({
      "code": "00000",
      "msg": "操作成功",
      "status": "904",
      "token": null,
      "data": {
        "url": "http://finupgroup.com"
      }
    });
  }
}