//默认加载config文件夹下的index.js
var rootPath = require('../../../../config').rootPath;

module.exports = {
    api: rootPath + '/sale/requestController/customer/contactAudit',
    response: function (req, res) {
        res.json({
            "code": "00000",
            "status": "登录状态",
            "token": "token",
            "msg": "响应消息",
            "data": {
                "success": "true"
            }

        })
    }
}