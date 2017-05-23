/**
 * Created by puhui on 2017/5/3.
 */

var rootPath = require('../../config').rootPath;

module.exports = {
  api: rootPath + '/common/deleteMessage',
  response: function (req, res) {
    res.json({
      "code": "00000",
      "msg": "操作成功",
      "status": 904,
      "token": "token",
      "data": {
        "success": "true"
      }
    });
  }
};