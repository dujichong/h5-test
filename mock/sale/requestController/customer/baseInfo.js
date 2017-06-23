var rootPath = require('../../../../config').rootPath;


module.exports = {
  api: rootPath + '/sale/requestController/customer/baseInfo',
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
        "phone1": "13289707686",
        "phone2": "13289707686",
        "nation": "名族",
        "education": "学历",
        "cardNo": "身份证",
        "marriage": "婚姻状况",
        "childrenNumber": "子女数量",
        "supportNumber": "供养人数",
        "salaryFrom": "主要收入来源",
        "annualIncome": "年收入",
        "localHouseProperty": "本市房产情况",
        "understandWay": "了解渠道",
        "qq":"qq号",
        "auditResult":"",
        "auditRemark":"审核备注"
      }
    });
  }
}