
var rootPath = require('../../../config').rootPath;

module.exports = {
  api: rootPath + '/user/requestController/getLivingInfoMethod',
  response: function (req, res) {
    res.json({
      "code": "00000",
      "msg": "操作成功",
      "status": "904",
      "token": null,
      "data": {
        "id": 1,
        "pid": 1,
        "appRequestId": 123,
        "appLoginId": 1,
        "livingType": "OTHER_HOUSE",    //居住情况
        "livingTypeOther": "111xxx",    //其他说明
        "addressId": 2,                      //地址id
        "lifeYears": "6",                      //居住年限
        "status": "AUDIT",                 //审核状态 审核中
        "createTime": 1493704017000,
        "updateTime": 1493704017000,
        "provinceCode": "110000",   //省市县code
        "cityCode": "110100",         //省市县code
        "distCode": "110102",         //省市县code
        "housenumber": "东二环银河soho d座11层", //门牌号
        "completeaddress": "北京市 市辖区 朝阳区 银河soho d座11层" //完整地址 省市县+门牌
      }
    });
  }
}