<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="customer-information">
    <c-sellerTitle :text="title" :hide="false"></c-sellerTitle>
    <div class="box">
      <div class="base-information">
        <div class="info-title">
          <img src="../../../assets/sellerApp/documentary/base-info.png">
          <h3>客户基本信息</h3>
        </div>
        <!--v-for="(info,index) in infoObj"-->
        <div class="info-content">
          <ul>
            <li>
              <p class="name">客户姓名</p><div></div>
            </li>
            <li>
              <p class="phoneNumberOne">手机号码1</p><div></div>
            </li>
            <li>
              <p class="phoneNumberTwo">手机号码2</p><div></div>
            </li>
            <li>
              <p class="amount">融资申请</p><div></div>
            </li>
            <li>
              <p class="salaryForm">客户类别</p><div></div>
            </li>
            <li>
              <p class="status">进件状态</p><div></div>
            </li>
            <li>
              <p class="updateTime">更新时间</p><div></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="review-progress">
        <div class="pro-title">
          <img src="../../../assets/sellerApp/documentary/review-progress.png">
          <h3>资料审核进度</h3>
        </div>
        <div class="pro-content">
          <div class="core-info">
            <h4 class="sub-title">抓取项</h4>
            <ul>
              <li>
                <p class="left">征信报告</p>
                <p class="mid">获取成功</p>
                <p class="right">05-12 13:00</p>
              </li>
              <li>
                <p class="left">手机运营商</p>
                <p class="mid">获取中</p>
                <p class="right">05-12 13:00</p>
              </li>
            </ul>
          </div>
          <div class="personal-info"></div>
          <div class="important-info"></div>
          <div class="credit-info"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import cSellerTitle from 'components/sellerTitle';

  export default {
    data () {
      return {
        currentIndex: 0,//this.$route.query.id ||
        title: '录件中',
        tabTitleObj: [
          {
            subTitle:'客户录件',
          },
          {
            subTitle: '质检驳回',
          },
        ],
        infoObj: {
          name: '中长期模式',
          rate: '1.28',
          months: '12-36',
          money: '30w',
          synopsis: '属于职场人士和企业经营者的中长期资金周转方案',
          introduce: '适用于本人名下拥有符合条件的车产，收入流水稳定，有长期资金周转需求的上班族或企业经营者。',
          quota: '车辆融资的申请额度在4-30万元人民币。<br>申请期限为12、24、36个自然月。',
          area: '本车辆融资业务目前暂时适用于兰州、贵州、九江、赤峰、济南这5个城市，其余城市待开放中，敬请期待。',
          competency: [
            '中国（不含港澳台）公民。',
            '申请人本人名下拥有当地车管所登记的非运营性质机动车。',
            '连续六个月以上稳定的收入流水。',
          ],
          material: '二代身份证、机动车登记证、机动车行驶证、借款人驾驶证、征信报告、经营证明、收入证明等。'
        },
      }
    },

    computed: {
      currentDetail() {
        return this.userInformationObj[this.currentIndex];
      }
    },

    //自定义的方法放在 methods
    methods : {
      change(item, index) {
        this.currentIndex = index;
      },
    },


    mounted(){
      let element = this.$el.getElementsByClassName('circle');
      for (let i = 0; i < element.length; i++) {
        if(element[i].innerText == 0){
          element[i].style.display = "none";
        }
        if(element[i].innerText.length>1){
          element[i].style.width = ".52rem";
        }

      }
    },

    //titie
    components: {cSellerTitle}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .customer-information{
    width: 100%;
    height: 100%;
    font-family: YouYuan, Tahoma, STXihei;
    position: relative;
    .border{
      width: 100%;
      height: .21rem;
      background-color: #f2f4f4;
      border-top: 1px solid #e3e3e5;
    }
    .box{
      width: 100%;
      background-color: #fff;
      .base-information{
        font-size: .3rem;
        .info-title{
          height: .98rem;
          border-bottom: 1px solid #d4d4d4;
          padding: 0 .32rem;
          img{
            width: .32rem;
            height: .32rem;
            margin-top: .27rem;
            display: inline-block;
          }
          h3{
            display: inline-block;
            font-size: .3rem;
            line-height: .98rem;
            color: #39f;
            margin: 0;
            font-weight: normal;
          }
        }
        .info-content{
          height: 4.39rem;
          padding: 0 .32rem;
          ul{
            height: 100%;
            padding: 0;
            margin: 0;
            li{
              list-style-type: none;
              height: .57rem;
              p{
                float: left;
                height: .27rem;
                margin: .3rem 0 0 0;
                line-height: .27rem;
              }
              div{
                float: right;
                height: .27rem;
                margin: .3rem 0 0 0;
                line-height: .27rem;
              }
            }
          }
        }
      }
      .review-progress{
        .pro-title{
          height: .98rem;
          border-bottom: 1px solid #d4d4d4;
          padding: 0 .32rem;
          img{
            width: .32rem;
            height: .32rem;
            margin-top: .27rem;
            display: inline-block;
          }
          h3{
            display: inline-block;
            font-size: .3rem;
            line-height: .98rem;
            color: #39f;
            margin: 0;
            font-weight: normal;
          }
        }
        .pro-content{
          .core-info, .personal-info, .important-info, .credit-info{
            h4{
              margin: 0;
              width: 1.78rem;
              height: .55rem;
              border-top-left-radius: .2rem;
              border-bottom-right-radius: .2rem;
              background-color: #3399ff;
              color: #fff;
              text-align: center;
              line-height: .55rem;
            }
            ul{
              li{
                list-style-type: none;
                .left{
                  display: inline-block;
                }
                .mid{
                  display: inline-block;
                }
                .right{
                  display: inline-block;
                }
              }
            }
          }
          .core-info{
            height: 2.02rem;
            padding: .2rem;
            width: 7.1rem;
          }
        }
      }
    }
  }
</style>