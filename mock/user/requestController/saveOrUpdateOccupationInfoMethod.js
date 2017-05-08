/**
 * Created by puhui on 2017/5/4.
 */

var rootPath = require('../../../config').rootPath;

module.exports = {
  api: rootPath + '/user/requestController/saveOrUpdateOccupationInfoMethod',
  response: function (req, res) {
    res.json({
      "code": "00000",
      "msg": "操作成功",
      "status": "904",
      "token": null,
      "data": {
        "id": 1,
        "appRequestId": 123,
        "appCustomerId": 1,
        "officialJobDate": 1330531200000,
        "workYears": "5",
        "companyName": "凡普互金有限公司",
        "addressId": 1,
        "completePhone": "010-88888888-1",
        "branchNumber": "01",
        "department": "部门IT",
        "jobTitleType": "SENIOR_MANAGEMENT",
        "companyType": "OPERATE_COMPANY",
        "enterCompanyDate": 1483200000000,
        "workSeniority": "1",
        "status": "AUDIT",
        "createTime": 1493695219000,
        "updateTime": 1493695219000,
        "messageOfJobTitleType": null,
        "messageOfCompanyType": null,
        "provinceCode": "110000",
        "cityCode": "110100",
        "distCode": "110101",
        "housenumber": "东二环银河soho a座11层",
        "completeaddress": "北京市 市辖区 东城区 东二环银河soho a座11层",
        "payOfSocialSecurityFund": true
      }
    });
  }
}