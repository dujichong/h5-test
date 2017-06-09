var rootPath = require('../../../config').rootPath;


module.exports = {
  api: rootPath + '/sale/mineController/mine',
  response: function (req, res) {
    res.json({
      "code": "00000",
      "msg": "操作成功",
      "status": "904",
      "token": null,
      "data": {
        "number": "123123",
        "phone": "1389900000",
        "photo": "https://avatars2.githubusercontent.com/u/2383148?v=3",
        "name": " 徐国倩",
        "positionName": "销售经理",
        "store": "北京万达门店",
        "address": "北京万达广场1层  1-208",
        "messageCount": "15"
      }
    });
  }
}