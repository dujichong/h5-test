/**
 * Created by puhui on 2017/5/3.
 */

var rootPath = require('../../../config').rootPath;

module.exports = {
  api: rootPath + 'dictionary/region/:code',
  response: function (req, res) {
    var code = req.param('code');
    if (code == '-1') {
      res.json({
          "code": "1",
          "msg": "操作成功",
          "status": "904",
          "token": "token",
          "data": [
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
        }
      )
    }
    if(code == 110000){
      res.json(
        {
          "code": "00000",
          "msg": "操作成功",
          "status": "904",
          "token": "token",
          "data": [
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
          "code": "00000",
          "msg": "操作成功",
          "status": "904",
          "token": "token",
          "data": [
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
    if (code == 610000){
      res.json(
        {
          "code": "00000",
          "msg": "操作成功",
          "status": "904",
          "token": "token",
          "data": [
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
      "msg": "成功",
      "status": "904",
      "token": "",
      "body": {
        "items": [
          {
            "city": [
              {
                "district": [
                  {
                    "distName": "A区",
                    "distCode": "asjd111",
                  },
                  {
                    "distName": "B区",
                    "distCode": "asjd112",
                  },
                  {
                    "distName": "C区",
                    "distCode": "asjd113",
                  },
                ],
                "cityName": "芜湖",
                "cityCode": "RPA54207",
                "id": 890117
              }
            ],
            "name": "安徽",
            "provinceCode": "01"
          },
          {
            "city": [
              {
                "district": [
                  {
                    "distName": "A区",
                    "distCode": "asjd111",
                  },
                  {
                    "distName": "B区",
                    "distCode": "asjd112",
                  },
                  {
                    "distName": "C区",
                    "distCode": "asjd113",
                  },
                ],
                "cityName": "北京",
                "cityCode": "RPA53703",
                "id": 6
              }
            ],
            "name": "北京"
          },
          {
            "city": [
              {
                "district": [
                  {
                    "distName": "A区",
                    "distCode": "asjd111",
                  },
                  {
                    "distName": "B区",
                    "distCode": "asjd112",
                  },
                  {
                    "distName": "C区",
                    "distCode": "asjd113",
                  },
                ],
                "cityName": "厦门",
                "cityCode": "RPA75501",
                "id": 458285
              },
              {
                "district": [
                  {
                    "distName": "A区",
                    "distCode": "asjd111",
                  },
                  {
                    "distName": "B区",
                    "distCode": "asjd112",
                  },
                  {
                    "distName": "C区",
                    "distCode": "asjd113",
                  },
                ],
                "cityName": "漳州",
                "cityCode": "RPA75502",
                "id": 458862
              },
              {
                "district": [
                  {
                    "distName": "A区",
                    "distCode": "asjd111",
                  },
                  {
                    "distName": "B区",
                    "distCode": "asjd112",
                  },
                  {
                    "distName": "C区",
                    "distCode": "asjd113",
                  },
                ],
                "cityName": "泉州",
                "cityCode": "RPA75503",
                "id": 889967
              },
              {
                "district": [
                  {
                    "distName": "A区",
                    "distCode": "asjd111",
                  },
                  {
                    "distName": "B区",
                    "distCode": "asjd112",
                  },
                  {
                    "distName": "C区",
                    "distCode": "asjd113",
                  },
                ],
                "cityName": "福州",
                "cityCode": "RPA75504",
                "id": 889973
              }
            ],
            "name": "福建",
            "cityCode": "021",
          },
          {
            "city": [
              {
                "district": [
                  {
                    "distName": "A区",
                    "distCode": "asjd111",
                  },
                  {
                    "distName": "B区",
                    "distCode": "asjd112",
                  },
                  {
                    "distName": "C区",
                    "distCode": "asjd113",
                  },
                ],
                "cityName": "兰州",
                "cityCode": "RPA35301",
                "id": 890004
              },
              {
                "district": [
                  {
                    "distName": "A区",
                    "distCode": "asjd111",
                  },
                  {
                    "distName": "B区",
                    "distCode": "asjd112",
                  },
                  {
                    "distName": "C区",
                    "distCode": "asjd113",
                  },
                ],
                "cityName": "酒泉",
                "cityCode": "RPA35303",
                "id": 890072
              }
            ],
            "name": "甘肃"
          },
          {
            "city": [
              {
                "district": [
                  {
                    "distName": "A区",
                    "distCode": "asjd111",
                  },
                  {
                    "distName": "B区",
                    "distCode": "asjd112",
                  },
                  {
                    "distName": "C区",
                    "distCode": "asjd113",
                  },
                ],
                "cityName": "南宁",
                "cityCode": "RPA24501",
                "id": 102
              },
              {
                "district": [
                  {
                    "distName": "A区",
                    "distCode": "asjd111",
                  },
                  {
                    "distName": "B区",
                    "distCode": "asjd112",
                  },
                  {
                    "distName": "C区",
                    "distCode": "asjd113",
                  },
                ],
                "cityName": "柳州",
                "cityCode": "RPA24502",
                "id": 275
              },
              {
                "district": [
                  {
                    "distName": "A区",
                    "distCode": "asjd111",
                  },
                  {
                    "distName": "B区",
                    "distCode": "asjd112",
                  },
                  {
                    "distName": "C区",
                    "distCode": "asjd113",
                  },
                ],
                "cityName": "钦州",
                "cityCode": "RPA24503",
                "id": 515
              },
              {
                "district": [
                  {
                    "distName": "A区",
                    "distCode": "asjd111",
                  },
                  {
                    "distName": "B区",
                    "distCode": "asjd112",
                  },
                  {
                    "distName": "C区",
                    "distCode": "asjd113",
                  },
                ],
                "cityName": "桂林",
                "cityCode": "RPA24504",
                "id": 889840
              },
              {
                "cityName": "百色",
                "cityCode": "RPA24505",
                "id": 889897
              }
            ],
            "name": "广西"
          },
          {
            "city": [
              {
                "cityName": "贵阳",
                "cityCode": "RPA25201",
                "id": 104
              },
              {
                "cityName": "六盘水",
                "cityCode": "RPA25202",
                "id": 285
              },
              {
                "cityName": "遵义",
                "cityCode": "RPA25203",
                "id": 453
              },
              {
                "cityName": "毕节",
                "cityCode": "RPA25204",
                "id": 595
              },
              {
                "cityName": "兴义",
                "cityCode": "RPA25205",
                "id": 889759
              }
            ],
            "name": "贵州"
          },
          {
            "city": [
              {
                "cityName": "广州",
                "cityCode": "RPA25404",
                "id": 571
              },
              {
                "cityName": "湛江",
                "cityCode": "RPA25405",
                "id": 260959
              },
              {
                "cityName": "中山",
                "cityCode": "RPA25406",
                "id": 880261
              },
              {
                "cityName": "江门",
                "cityCode": "RPA25407",
                "id": 880311
              },
              {
                "cityName": "肇庆",
                "cityCode": "RPA25410",
                "id": 889852
              },
              {
                "cityName": "东莞",
                "cityCode": "RPA25411",
                "id": 546
              },
              {
                "cityName": "惠州",
                "cityCode": "RPA75306",
                "id": 524
              },
              {
                "cityName": "河源",
                "cityCode": "RPA75307",
                "id": 889746
              },
              {
                "cityName": "汕头",
                "cityCode": "RPA75308",
                "id": 889753
              }
            ],
            "name": "广东"
          },
          {
            "city": [
              {
                "cityName": "郑州",
                "cityCode": "RPA54101",
                "id": 139
              },
              {
                "cityName": "安阳",
                "cityCode": "RPA54105",
                "id": 466
              },
              {
                "cityName": "平顶山",
                "cityCode": "RPA54106",
                "id": 534
              },
              {
                "cityName": "许昌",
                "cityCode": "RPA54110",
                "id": 246
              },
              {
                "cityName": "商丘",
                "cityCode": "RPA54111",
                "id": 889774
              },
              {
                "cityName": "洛阳",
                "cityCode": "RPA54202",
                "id": 186
              },
              {
                "cityName": "南阳",
                "cityCode": "RPA54203",
                "id": 319
              },
              {
                "cityName": "新乡",
                "cityCode": "RPA54204",
                "id": 337
              },
              {
                "cityName": "信阳",
                "cityCode": "RPA54205",
                "id": 889846
              }
            ],
            "name": "河南"
          },
          {
            "city": [
              {
                "cityName": "石家庄",
                "cityCode": "RPA51301",
                "id": 26
              },
              {
                "cityName": "沧州",
                "cityCode": "RPA51302",
                "id": 540
              },
              {
                "cityName": "保定",
                "cityCode": "RPA51303",
                "id": 635
              },
              {
                "cityName": "张家口",
                "cityCode": "RPA51304",
                "id": 889885
              },
              {
                "cityName": "邢台",
                "cityCode": "RPA51305",
                "id": 388
              },
              {
                "cityName": "衡水",
                "cityCode": "RPA53707",
                "id": 890049
              }
            ],
            "name": "河北"
          },
          {
            "city": [
              {
                "cityName": "海口",
                "cityCode": "RPA25401",
                "id": 522
              }
            ],
            "name": "海南"
          },
          {
            "city": [
              {
                "cityName": "哈尔滨",
                "cityCode": "RPA62301",
                "id": 254
              },
              {
                "cityName": "佳木斯",
                "cityCode": "RPA62302",
                "id": 260175
              },
              {
                "cityName": "齐齐哈尔",
                "cityCode": "RPA62303",
                "id": 434
              },
              {
                "cityName": "牡丹江",
                "cityCode": "RPA62304",
                "id": 889821
              },
              {
                "cityName": "大庆",
                "cityCode": "RPA62306",
                "id": 395
              }
            ],
            "name": "黑龙江"
          },
          {
            "city": [
              {
                "cityName": "长沙",
                "cityCode": "RPA75201",
                "id": 441
              },
              {
                "cityName": "岳阳",
                "cityCode": "RPA75202",
                "id": 557
              },
              {
                "cityName": "株洲",
                "cityCode": "RPA75203",
                "id": 563
              },
              {
                "cityName": "常德",
                "cityCode": "RPA75204",
                "id": 628
              },
              {
                "cityName": "衡阳",
                "cityCode": "RPA75205",
                "id": 889734
              },
              {
                "cityName": "郴州",
                "cityCode": "RPA75206",
                "id": 889796
              },
              {
                "cityName": "怀化",
                "cityCode": "RPA75207",
                "id": 890031
              }
            ],
            "name": "湖南"
          },
          {
            "city": [
              {
                "cityName": "武汉",
                "cityCode": "RPA35201",
                "id": 577
              },
              {
                "cityName": "襄阳",
                "cityCode": "RPA35202",
                "id": 889827
              },
              {
                "cityName": "宜昌",
                "cityCode": "RPA35203",
                "id": 889858
              },
              {
                "cityName": "黄石",
                "cityCode": "RPA35204",
                "id": 889870
              }
            ],
            "name": "湖北"
          },
          {
            "city": [
              {
                "cityName": "南昌市",
                "cityCode": "RPA75301",
                "id": 583
              },
              {
                "cityName": "九江市",
                "cityCode": "RPA75302",
                "id": 603
              },
              {
                "cityName": "赣州市",
                "cityCode": "RPA75303",
                "id": 609
              },
              {
                "cityName": "宜春",
                "cityCode": "RPA75304",
                "id": 889740
              },
              {
                "cityName": "上饶",
                "cityCode": "RPA75305",
                "id": 889940
              }
            ],
            "name": "江西"
          },
          {
            "city": [
              {
                "cityName": "苏州",
                "cityCode": "RPA75401",
                "id": 458005
              },
              {
                "cityName": "无锡",
                "cityCode": "RPA75402",
                "id": 889780
              },
              {
                "cityName": "南通",
                "cityCode": "RPA75403",
                "id": 889790
              }
            ],
            "name": "江苏"
          },
          {
            "city": [
              {
                "cityName": "长春",
                "cityCode": "RPA62201",
                "id": 164
              },
              {
                "cityName": "延吉",
                "cityCode": "RPA62202",
                "id": 589
              },
              {
                "cityName": "四平",
                "cityCode": "RPA62203",
                "id": 393
              },
              {
                "cityName": "松原",
                "cityCode": "RPA62207",
                "id": 279
              }
            ],
            "name": "吉林"
          },
          {
            "city": [
              {
                "cityName": "盘锦",
                "cityCode": "RPA62401",
                "id": 500
              },
              {
                "cityName": "沈阳",
                "cityCode": "RPA62402",
                "id": 889802
              },
              {
                "cityName": "营口",
                "cityCode": "RPA62403",
                "id": 889891
              },
              {
                "cityName": "锦州",
                "cityCode": "RPA62404",
                "id": 889913
              }
            ],
            "name": "辽宁"
          },
          {
            "city": [
              {
                "cityName": "呼和浩特",
                "cityCode": "RPA62501",
                "id": 889728
              },
              {
                "cityName": "包头",
                "cityCode": "RPA62502",
                "id": 889906
              },
              {
                "cityName": "赤峰",
                "cityCode": "RPA62503",
                "id": 889983
              },
              {
                "cityName": "巴彦淖尔",
                "cityCode": "RPA62504",
                "id": 890111
              }
            ],
            "name": "内蒙古"
          },
          {
            "city": [
              {
                "cityName": "银川",
                "cityCode": "RPA36102",
                "id": 450
              }
            ],
            "name": "宁夏"
          },
          {
            "city": [
              {
                "cityName": "西宁",
                "cityCode": "RPA35302",
                "id": 890037
              }
            ],
            "name": "青海"
          },
          {
            "city": [
              {
                "cityName": "达州",
                "cityCode": "RPA35002",
                "id": 889815
              },
              {
                "cityName": "泸州",
                "cityCode": "RPA35004",
                "id": 489
              },
              {
                "cityName": "成都",
                "cityCode": "RPA35101",
                "id": 31
              },
              {
                "cityName": "南充",
                "cityCode": "RPA35103",
                "id": 487
              },
              {
                "cityName": "德阳",
                "cityCode": "RPA35106",
                "id": 307
              },
              {
                "cityName": "绵阳",
                "cityCode": "RPA35107",
                "id": 113
              },
              {
                "cityName": "乐山",
                "cityCode": "RPA35111",
                "id": 301
              },
              {
                "cityName": "宜宾",
                "cityCode": "RPA35115",
                "id": 198
              }
            ],
            "name": "四川"
          },
          {
            "city": [
              {
                "cityName": "济南",
                "cityCode": "RPA53701",
                "id": 97
              },
              {
                "cityName": "烟台",
                "cityCode": "RPA53706",
                "id": 180
              }
            ],
            "name": "山东"
          },
          {
            "city": [
              {
                "cityName": "太原",
                "cityCode": "RPA54201",
                "id": 889809
              }
            ],
            "name": "山西"
          },
          {
            "city": [
              {
                "cityName": "西安",
                "cityCode": "RPA36101",
                "id": 119
              },
              {
                "cityName": "咸阳",
                "cityCode": "RPA36103",
                "id": 725053
              },
              {
                "cityName": "渭南",
                "cityCode": "RPA36104",
                "id": 889878
              }
            ],
            "name": "陕西"
          },
          {
            "city": [],
            "name": "上海"
          },
          {
            "city": [
              {
                "cityName": "天津",
                "cityCode": "RPA53708",
                "id": 890105
              }
            ],
            "name": "天津"
          },
          {
            "city": [
              {
                "cityName": "昆明",
                "cityCode": "RPA25301",
                "id": 13
              },
              {
                "cityName": "大理",
                "cityCode": "RPA25302",
                "id": 889765
              },
              {
                "cityName": "曲靖",
                "cityCode": "RPA25303",
                "id": 29
              },
              {
                "cityName": "玉溪",
                "cityCode": "RPA25304",
                "id": 286
              },
              {
                "cityName": "红河",
                "cityCode": "RPA25305",
                "id": 480
              },
              {
                "cityName": "普洱",
                "cityCode": "RPA25306",
                "id": 890043
              }
            ],
            "name": "云南"
          },
          {
            "city": [
              {
                "cityName": "绍兴",
                "cityCode": "RPA75404",
                "id": 889947
              },
              {
                "cityName": "嘉兴",
                "cityCode": "RPA75405",
                "id": 890062
              }
            ],
            "name": "浙江"
          },
          {
            "city": [
              {
                "cityName": "重庆",
                "cityCode": "RPA35001",
                "id": 130
              },
              {
                "cityName": "万州",
                "cityCode": "RPA35003",
                "id": 889939
              }
            ],
            "name": "重庆"
          }
        ],
        "isShow": 0
      }
    });
  }
};