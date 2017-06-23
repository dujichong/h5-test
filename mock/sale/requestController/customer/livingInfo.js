var rootPath = require('../../../../config').rootPath;


module.exports = {
  api: rootPath + '/sale/requestController/customer/livingInfo',
  response: function (req, res) {
    res.json({
      "code": "00000",
      "msg": "mock 操作成功",
      "status": "904",
      "token": null,
      "data": {
        "customerId": "客户Id",
        "requestId": "进件id",
        "customerName": "赵云龙",
        "livingType": "自有房产",
        "address": "自有房产",
        "completeAddress": "详细地址",
        "lifeYears": "居住年限",
        "auditResult": "",
        "auditRemark": "审核备注"

      }
    });
  }
}