/**
 * Created by puhui on 2017/5/3.
 */

var rootPath = require('../../config').rootPath;

module.exports = {
  api: rootPath + '/common/getAllMessage',
  response: function (req, res) {
    res.json({
      "code": "00000",
      "msg": "操作成功",
      "status": 904,
      "token": "token",
      "data": [
        {
          "id": "1",
          "requestId": "关联的进件id",
          "readStatus": "0",
          "message": "消息消息消息消息消息消息消息消息消息消息,消息消息消息消息消息消息消息消息,消息消息消息消息消息,消息消息消息消息消息消息消息",
          "time": '2017-05-23 12:23'
        },
        {
          "id": "1",
          "requestId": "关联的进件id",
          "readStatus": "0",
          "message": "消息消息消息消息消息消息消息消息消息消息,消息消息消息消息消息消息消息消息,消息消息消息消息消息,消息消息消息消息消息消息消息",
          "time": '2017-05-23 12:23'
        },
        {
          "id": "2",
          "requestId": "关联的进件id",
          "readStatus": "0",
          "message": "消息",
          "time": '2017-05-20 12:23',

        },
        {
          "id": "2",
          "requestId": "关联的进件id",
          "readStatus": "0",
          "message": "消息",
          "time": '2017-05-20 12:23',

        },
        {
          "id": "3",
          "requestId": "关联的进件id",
          "readStatus": "读取状态 0未读取 1已读取",
          "message": "消息",
          "time": '2017-02-12 12:23',
        },
        {
          "id": "3",
          "requestId": "关联的进件id",
          "readStatus": "读取状态 0未读取 1已读取",
          "message": "消息",
          "time": '2017-02-12 12:23',
        },
      ]
    });
  }
};