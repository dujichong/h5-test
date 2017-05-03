/**
 * Created by puhui on 2017/5/3.
 */

var rootPath = require('../../config').rootPath;

module.exports = {
  api: rootPath + '/dictionary/region/:code',
  response: function (req, res) {
    var code = req.param('code');
    if(code == 110000){
      res.json(
        {
          "code": "1",
          "msg": "操作成功",
          "status": "904",
          "token": "token",
          "body": [
            {
              text: "市辖区",
              value: "110100"
            },
            {
              text: "县",
              value: "110200"
            }
          ]
        }
      )
    }
    if(code == 110100){
      res.json(
        {
          "code": "1",
          "msg": "操作成功",
          "status": "904",
          "token": "token",
          "body": [
            {
              value: "110101",
              text: "东城区"
            },
            {
              text: "西城区",
              value: "110102"
            },
            {
              value: "110105",
              text: "朝阳区"
            },
            {
              text: "丰台区",
              value: "110106"
            },
            {
              value: "110107",
              text: "石景山区"
            },
            {
              text: "海淀区",
              value: "110108"
            },
            {
              value: "110109",
              text: "门头沟区"
            },
            {
              value: "110111",
              text: "房山区"
            },
            {
              text: "通州区",
              value: "110112"
            },
            {
              value: "110113",
              text: "顺义区"
            },
            {
              text: "昌平区",
              value: "110114"
            },
            {
              value: "110115",
              text: "大兴区"
            },
            {
              text: "怀柔区",
              value: "110116"
            },
            {
              text: "平谷区",
              value: "110117"
            }
          ]
        }
      )
    }
    if(code == 610000){
      res.json(
        {
          "code": "1",
          "msg": "操作成功",
          "status": "904",
          "token": "token",
          "body": [
            {
              text: "西安市",
              value: "610100"
            },
            {
              value: "610200",
              text: "铜川市"
            },
            {
              text: "宝鸡市",
              value: "610300"
            },
            {
              value: "610400",
              text: "咸阳市"
            },
            {
              value: "610500",
              text: "渭南市"
            },
            {
              value: "610600",
              text: "延安市"
            },
            {
              value: "610700",
              text: "汉中市"
            },
            {
              value: "610800",
              text: "榆林市"
            },
            {
              text: "安康市",
              value: "610900"
            },
            {
              text: "商洛市",
              value: "611000"
            }
          ]
        }
      )
    }
    res.json({
      "code": "1",
      "msg": "操作成功",
      "status": "904",
      "token": "token",
      "body": [
        {
          value: "110000",
          text: "北京市"
        },
        {
          text: "天津市",
          value: "120000"
        },
        {
          text: "河北省",
          value: "130000"
        },
        {
          text: "山西省",
          value: "140000"
        },
        {
          text: "内蒙古自治区",
          value: "150000"
        },
        {
          text: "辽宁省",
          value: "210000"
        },
        {
          value: "220000",
          text: "吉林省"
        },
        {
          value: "230000",
          text: "黑龙江省"
        },
        {
          text: "上海市",
          value: "310000"
        },
        {
          value: "320000",
          text: "江苏省"
        },
        {
          text: "浙江省",
          value: "330000"
        },
        {
          value: "340000",
          text: "安徽省"
        },
        {
          text: "福建省",
          value: "350000"
        },
        {
          value: "360000",
          text: "江西省"
        },
        {
          value: "370000",
          text: "山东省"
        },
        {
          value: "410000",
          text: "河南省"
        },
        {
          text: "湖北省",
          value: "420000"
        },
        {
          text: "湖南省",
          value: "430000"
        },
        {
          text: "广东省",
          value: "440000"
        },
        {
          value: "450000",
          text: "广西壮族自治区"
        },
        {
          text: "海南省",
          value: "460000"
        },
        {
          value: "500000",
          text: "重庆市"
        },
        {
          value: "510000",
          text: "四川省"
        },
        {
          value: "520000",
          text: "贵州省"
        },
        {
          text: "云南省",
          value: "530000"
        },
        {
          text: "西藏自治区",
          value: "540000"
        },
        {
          text: "陕西省",
          value: "610000"
        },
        {
          value: "620000",
          text: "甘肃省"
        },
        {
          value: "630000",
          text: "青海省"
        },
        {
          value: "640000",
          text: "宁夏回族自治区"
        },
        {
          text: "新疆维吾尔自治区",
          value: "650000"
        },
        {
          value: "710000",
          text: "台湾省"
        },
        {
          value: "810000",
          text: "香港特别行政区"
        },
        {
          text: "澳门特别行政区",
          value: "820000"
        }
      ]
    });
  }
};