//默认加载config文件夹下的index.js
var rootPath = require('../../../../config').rootPath;

module.exports = {
    api: rootPath + '/sale/requestController/customer/contactInfo',
    response: function (req, res) {
        res.json({
            "code": "00000",
            "status": "登录状态",
            "token": "token",
            "msg": "响应消息",
            "data": {
                "customerId": "客户Id",
                "requestId": "进件id",
                "customerName": "赵云龙",
                "marriage": "婚姻状况",
                "nameOne": "直系亲属1的姓名",
                "relationShipTypeOne": "直系联系人1关系类型",
                "cardNoOne": "直系联系人1身份证  ",
                "mobileOne": "直系联系人1手机 ",
                "nameTwo": "直系亲属2的姓名",
                "relationShipTypeTwo": "直系联系人2关系类型",
                "cardNoTwo": "直系联系人2身份证  ",
                "mobileTwo": "直系联系人2手机 ",
                "nameThree": "职业联系人姓名",
                "relationShipTypeThree": "职业联系人关系",
                "mobileThree": "职业联系人手机 ",
                "nameFour": "其他联系人姓名",
                "relationShipTypeFour": "其他联系人关系",
                "mobileFour": "其他联系人手机 ",
                "canKnown": "是否被知晓 (亲属,同事,其他) ",
                "auditResult": "审核结果",
                "auditRemark": "审核备注"
            }

        })
    }
}