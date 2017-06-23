var rootPath = require('../../../../config').rootPath;


module.exports = {
  api: rootPath + '/sale/requestController/customer/livingAudit',
  response: function (req, res) {
    res.json({
      "code": "00000",
      "msg": "mock 操作成功",
      "status": "904",
      "token": null,
      "data": {
        "success": "true"
      }
    });
  }
}