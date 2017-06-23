var rootPath = require('../../../../config').rootPath;


module.exports = {
  api: rootPath + '/sale/requestController/customer/occupationInfo',
  response: function (req, res) {
    res.json({
      "code": "00000",
      "msg": "mock 操作成功",
      "status": "904",
      "token": null,
      "data": {
        salaryFrom: 2,
        "customerId": "客户Id",
        "requestId": "进件id",
        "customerName": "赵云龙",
        "workDate": "工作时间",
        "companyName": "现单位名称",
        "securityFund": "是否缴纳社保公积金",
        "address": "现单位地址",
        "completeAddress": "详细地址",
        "companyPhone": "单位电话",
        "department": "现单位部门",
        "position": "现单位职位",
        "companyType": "单位性质",
        "enterCompanyDate": "入职时间",
        "auditResult": "",
        "auditRemark": "审核备注"
      }
    });
  }
}