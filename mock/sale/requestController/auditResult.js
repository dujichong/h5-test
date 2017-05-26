var rootPath = require('../../../config').rootPath;


module.exports = {
  api: rootPath + '/sale/requestController/auditResult/:tab',
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
        "number": (req.params.tab == 'approve' || req.params.tab == 'return') ? 8 : 0,
        "list": Array.from({length:20}).map((item, index) => {
          let n = index + 1;
          return {
            "customerName": `${req.params.tab}-${n}`,
            "customerId": n,
            "requestId": "进件id",
            "phone": "13289707686",
            "requestAmount": "20000",
            "requestDeadline": "12个月",
            "requestStatus": "等待签约",
            "updateTime": "2017-04-43 12:34"

          }
        })

      }
    });
  }
}