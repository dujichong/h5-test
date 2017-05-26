var rootPath = require('../../../config').rootPath;


module.exports = {
  api: rootPath + '/sale/requestController/auditing',
  response: function (req, res) {
    res.json({
      "code": "00000",
      "msg": "操作成功",
      "status": "904",
      "token": null,
      "data": {
        "pageNo": "1",
        "pageSize": "20",
        "totalCount": "50000",
        "totalPage": "23",
        "list": Array.from({length:20}).map((item, index) => {
          let n = index + 1;
          return {
            "customerName": "赵云龙" + n,
            "customerId": n,
            "requestId": "进件id",
            "phone": "13289707686",
            "requestAmount": "20000",
            "requestStatus": "客服审核",
            "updateTime": "2017-04-43 12:34"
          }
        })

      }
    });
  }
}