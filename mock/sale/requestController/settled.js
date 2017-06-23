var rootPath = require('../../../config').rootPath;


module.exports = {
  api: rootPath + '/sale/requestController/settled',
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
        "list": Array.from({length: 20}).map((item, index) => {
          let n = index + 1;
          return {
            "customerName": `客户-${n}`,
            "customerId": n,
            "requestId": "进件id",
            "phone": "13289707686",
            "requestStatus": "正常结清",
            "updateTime": "2017-04-43 12:34",
            "repaymentPeriod": "还款期数",
            "billDate": "账单日",
            "requestAmount": 20020,
          }
        })

      }
    });
  }
}