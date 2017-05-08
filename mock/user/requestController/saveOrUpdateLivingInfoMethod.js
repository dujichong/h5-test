
var rootPath = require('../../../config').rootPath;

module.exports = {
  api: rootPath + '/user/requestController/saveOrUpdateLivingInfoMethod',
  response: function (req, res) {
    res.json({
      "code": "00000",
      "msg": "操作成功",
      "status": "904",
      "token": null,
      "data": {
        "id": 1,
        "appRequestId": 123,
        "appLoginId": 1,
        "livingType": "其他",
        "livingTypeOther": "111xxx信息",
        "addressId": 2,
        "lifeYears": "6",
        "status": "AUDIT",
        "createTime": null,
        "updateTime": null,
        "provinceCode": "110000",
        "cityCode": "110100",
        "distCode": "110103",
        "housenumber": "东二环银河soho d座11层",
        "completeaddress": "北京市 市辖区 朝阳区 银河soho d座11层"
      }
    });
  }
}