var rootPath = require('../../../../config').rootPath;


module.exports = {
  api: rootPath + '/sale/requestController/customer/photo',
  response: function (req, res) {
    res.json({
      "code": "00000",
      "msg": "mock 操作成功",
      "status": "904",
      "token": null,
      "data": {
        "success": "true",
        "customerId": "客户Id",
        "requestId": "进件id",
        "customerName": "赵云龙",
        "auditResult": "",
        "auditRemark":"审核备注",
        "list":[
          {
            "fileName":"文件名称1",
            "fileSize":"文件大小",
            "filePath":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=292050601,2473871589&fm=26&gp=0.jpg"
          },{
            "fileName":"文件名称2",
            "fileSize":"文件大小",
            "filePath":"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=928861582,28679776&fm=117&gp=0.jpg"
          },{
            "fileName":"文件名称3",
            "fileSize":"文件大小",
            "filePath":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3507077432,2560828164&fm=26&gp=0.jpg"
          },{
            "fileName":"文件名称4",
            "fileSize":"文件大小",
            "filePath":"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=847148555,2831273504&fm=117&gp=0.jpg"
          }
        ]
      }
    });
  }
}