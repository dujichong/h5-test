var rootPath = require('../../../config').rootPath;

module.exports = {
    api: rootPath + '/sale/requestController/customer',
    response: function (req, res) {
        res.json({
            "code": "00000",
            "status": "登录状态",
            "token": "token",
            "msg": "响应消息",
            "data": {
                "baseInfo": {
                    "customerId": "客户id",
                    "requestId": "进件id",
                    "customerName": "张三",
                    "phone1": "手机号1",
                    "phone2": "手机号2",
                    "requestAmount": "融资申请金额",
                    "customerType": "薪类",
                    "requestStatus": "录件中",
                    "updateTime": "2017-03-2  15：23"
                },
                "grabInfo": [{
                    "itemType": "资料类型",
                    "itemName": "征信报告",
                    "itemStatus": "资料状态",
                    "updateTime": "03-12  13：00"
                }, {
                    "itemType": "资料类型",
                    "itemName": "手机运营商",
                    "itemStatus": "资料状态",
                    "updateTime": "03-12  13：00"
                }],
                "personalInfo": [{
                    "itemType": "资料类型",
                    "itemName": "基础信息",
                    "itemStatus": "资料状态",
                    "updateTime": "03-12  13：00"
                }, {
                    "itemType": "资料类型",
                    "itemName": "居住信息",
                    "itemStatus": "资料状态",
                    "updateTime": "03-12  13：00"
                }, {
                    "itemType": "资料类型",
                    "itemName": "职业信息",
                    "itemStatus": "资料状态",
                    "updateTime": "03-12  13：00"
                }, {
                    "itemType": "资料类型",
                    "itemName": "联系人信息",
                    "itemStatus": "资料状态",
                    "updateTime": "03-12  13：00"
                }],
                "importantInfo": [{
                    "itemType": "资料类型",
                    "itemName": "身份证明",
                    "itemStatus": "资料状态",
                    "updateTime": "03-12  13：00"
                }, {
                    "itemType": "资料类型",
                    "itemName": "车产证明",
                    "itemStatus": "资料状态",
                    "updateTime": "03-12  13：00"
                }, {
                    "itemType": "资料类型",
                    "itemName": "收入证明",
                    "itemStatus": "资料状态",
                    "updateTime": "03-12  13：00"
                }, {
                    "itemType": "资料类型",
                    "itemName": "已婚证明",
                    "itemStatus": "资料状态",
                    "updateTime": "03-12  13：00"
                }, {
                    "itemType": "资料类型",
                    "itemName": "经营证明",
                    "itemStatus": "资料状态",
                    "updateTime": "--"
                }],
                "trustInfo": [{
                    "itemType": "资料类型",
                    "itemName": "身份证明",
                    "itemStatus": "资料状态",
                    "updateTime": "03-12  13：00"
                }, {
                    "itemType": "资料类型",
                    "itemName": "车产证明",
                    "itemStatus": "资料状态",
                    "updateTime": "03-12  13：00"
                }, {
                    "itemType": "资料类型",
                    "itemName": "收入证明",
                    "itemStatus": "资料状态",
                    "updateTime": "03-12  13：00"
                }, {
                    "itemType": "资料类型",
                    "itemName": "已婚证明",
                    "itemStatus": "资料状态",
                    "updateTime": "03-12  13：00"
                }]
            }

        })
    }
}