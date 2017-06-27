<!--客户资料-->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="customer-information">
    <c-title :text="title" skin="blue"></c-title>
    <div class="box">
      <div class="base-information">
        <div class="info-title">
          <img src="../../../assets/seller/documentary/base-info.png">
          <h3>客户基本信息</h3>
        </div>
  
        <!--v-for="(info,index) in infoObj"-->
        <div v-if="notEmpty" class="info-content">
          <ul>
            <li class="name">
              <p>客户姓名</p>
              <div>{{info.baseInfo.customerName}}</div>
            </li>
            <li class="phoneNumberOne">
              <p>手机号码1</p>
              <div class="phone">
                <a href="tel:18666666666">{{info.baseInfo.phone1}}</a>
              </div>
            </li>
            <li>
              <p class="phoneNumberTwo">手机号码2</p>
              <div class="phone">
                <a href="tel:18888888888">{{info.baseInfo.phone2}}</a>
              </div>
            </li>
            <li>
              <p class="amount">融资申请</p>
              <div>{{info.baseInfo.requestAmount}}元</div>
            </li>
            <li>
              <p class="salaryForm">客户类别</p>
              <div>{{info.baseInfo.customerType}}</div>
            </li>
            <li>
              <p class="status">进件状态</p>
              <div>{{info.baseInfo.requestStatus}}</div>
            </li>
            <li>
              <p class="updateTime">更新时间</p>
              <div>{{info.baseInfo.updateTime}}</div>
            </li>
          </ul>
        </div>
      </div>
  
      <div class="review-progress">
        <div class="pro-title">
          <img src="../../../assets/seller/documentary/review-progress.png">
          <h3>资料审核进度</h3>
        </div>
        <div class="pro-content">
  
          <div class="core-info">
            <h4 class="sub-title">抓取项</h4>
            <ul>
              <li>
                <p class="left">征信报告</p>
                <p class="mid suc">获取成功</p>
                <p class="right">05-12 13:00</p>
              </li>
              <li>
                <p class="left">手机运营商</p>
                <p class="mid">获取中</p>
                <p class="right">05-12 13:00</p>
              </li>
            </ul>
          </div>
  
          <div class="personal-info">
            <h4 class="sub-title">个人信息</h4>
            <ul>
  
              <li @click="turnToBaseInfo">
                <p class="left">基础信息</p>
                <p v-bind:class="{fail:infoStatus=='质检不通过',suc:infoStatus=='质检通过'}" class="mid">{{infoStatus}}</p>
                <p class="right">05-12 13:00</p>
              </li>
  
              <li>
                <p class="left" @click="turnToLiving(customerId,requestId)">居住信息</p>
                <p class="mid">待质检</p>
                <p class="right">——</p>
              </li>
  
              <li>
                <p class="left" @click="turnToJob(customerId, requestId)">职业信息</p>
                <p class="mid fail">质检不通过</p>
                <p class="right">05-12 13:00</p>
              </li>
  
              <li>
                <p class="left" @click="turnToContact(customerId,requestId)">联系人信息</p>
                <p class="mid suc">质检通过</p>
                <p class="right">05-12 13:00</p>
              </li>
  
              <!--<li>
                <p class="left" @click="turnToPictures(customerId,requestId)">拍照资料信息</p>
                <p class="mid suc">质检通过</p>
                <p class="right">05-12 13:00</p>
              </li>-->
  
            </ul>
          </div>
  
          <div v-if="notEmpty" class="important-info">
            <h4 class="sub-title">重要资料项</h4>
            <ul>
              <li>
                <p class="left">身份证明</p>
                <p class="mid">未提交</p>
                <p class="right">05-12 13:00</p>
              </li>
              <li>
                <p class="left">房产信息</p>
                <p class="mid">待质检</p>
                <p class="right">05-12 13:00</p>
              </li>
              <li>
                <p class="left">收入证明</p>
                <p class="mid fail">质检不通过</p>
                <p class="right">05-12 13:00</p>
              </li>
              <li>
                <p class="left">已婚证明</p>
                <p class="mid suc">质检通过</p>
                <p class="right">05-12 13:00</p>
              </li>
              <li>
                <p class="left">经营证明</p>
                <p class="mid">未提交</p>
                <p class="right">05-12 13:00</p>
              </li>
            </ul>
          </div>
  
          <div v-if="notEmpty" class="credit-info">
            <h4 class="sub-title">增新资料项</h4>
            <ul>
              <li>
                <p class="left">学历证明</p>
                <p class="mid">未提交</p>
                <p class="right">05-12 13:00</p>
              </li>
              <li>
                <p class="left">房产信息</p>
                <p class="mid">待质检</p>
                <p class="right">05-12 13:00</p>
              </li>
              <li>
                <p class="left">经营证明</p>
                <p class="mid fail">质检不通过</p>
                <p class="right">05-12 13:00</p>
              </li>
              <li>
                <p class="left">其他证明</p>
                <p class="mid">未提交</p>
                <p class="right">05-12 13:00</p>
              </li>
            </ul>
          </div>
  
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cTitle from 'components/title';
// 发送请求
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
//服务器地址
const API = `${window.$rootPath}/sale/requestController/customer`;

export default {
  data() {
    return {
      currentIndex: 0,//this.$route.query.id ||
      title: '客户资料',
      mobile: '',//手机号
      mobile2: '',//备用手机号
      infoStatus: '质检不通过',//未提交,待质检,质检不通过,质检通过
      loginId: this.$route.query.loginId,
      customerId: this.$route.query.customerId,
      requestId: this.$route.query.requestId,
      info: {},
    }
  },

  computed: {
    ...mapState(['pid', 'version', 'token', 'type']),
    notEmpty() {
      let flag = false;
      for (let item in this.info) {
        flag = true;
        break;
      }
      return flag;
    }

  },

  //自定义的方法放在 methods
  methods: {
    //转到基础信息页
    turnToBaseInfo() {
      if (this.infoStatus != '未提交') {
        this.$router.push({
          name: 'SellerDocumentaryBaseInformation',
          query: { customerId: this.customerId, requestId: this.requestId },
        });
      }
      else {
      }
    },

    //转到居住信息页
    turnToLiving(customerId, requestId) {
      this.$router.push({
        name: "SellerDocumentaryLivingInformation",
        query: { customerId: customerId, requestId: requestId }
      })
    },

    //转到职业信息页
    turnToJob(customerId, requestId) {
      this.$router.push({
        name: "SellerDocumentaryJobInformation",
        query: { customerId: customerId, requestId: requestId }
      })
    },

    //转到联系人信息页
    turnToContact(customerId, requestId) {
      this.$router.push({
        name: "SellerDocumentaryContactPersonInformation",
        query: { customerId: customerId, requestId: requestId }
      })
    },

    //转到拍照信息页
    // turnToPictures(customerId, requestId) {
    //   this.$router.push({
    //     name: "SellerDocumentaryPicturesInformation",
    //     query: { customerId: customerId, requestId: requestId }
    //   })
    // },

    //获取数据
    getInformation() {
      axios.post(API, {
        comm: {
          pid: this.pid,
          type: this.type,
          version: this.version
        },
        token: this.token,
        body: {
          loginId: this.loginId,
          customerId: this.customerId,
          requestId: this.requestId,
        }
      }).then(response => {
        const json = response.data;
        if (json.code == '00000' && json.data) {
          this.info = json.data;
          console.log(this.info)
        }
        else {
          this.msg = '没有数据';
        }
        this.loading = false;
      }).catch((err) => {
        //this.loading = false;
        console.log(err)
      });
    },

  },

  created() {
    this.getInformation()
  },

  //titie
  components: { cTitle }
}


</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.customer-information {
  width: 100%;
  height: 100%;
  font-family: YouYuan, Tahoma, STXihei;
  position: relative;

  .border {
    width: 100%;
    height: .21rem;
    background-color: #f2f4f4;
    border-top: 1px solid #e3e3e5;
  } //固定定位
  .components-title-blue {
    position: fixed;
    top: 0;
    left: 0;
  }

  .box {
    width: 100%;
    background-color: #fff; //避开顶部
    padding-top: 0.88rem;

    .base-information {
      font-size: .3rem;
      .info-title {
        height: .98rem;
        border-bottom: 1px solid #d4d4d4;
        padding: 0 .32rem;
        img {
          width: .32rem;
          height: .32rem;
          margin: .34rem .2rem 0 0;
          display: block;
          float: left;
        }
        h3 {
          display: inline-block;
          font-size: .3rem;
          line-height: .98rem;
          color: #39f;
          margin: 0;
          font-weight: normal;
        }
      }
      .info-content {
        height: 4.39rem;
        padding: 0 .32rem;
        border-bottom: 1px solid #d4d4d4;
        ul {
          height: 100%;
          padding: 0;
          margin: 0;
          color: #666;
          li {
            list-style-type: none;
            height: .57rem;
            p {
              float: left;
              height: .27rem;
              margin: .3rem 0 0 0;
              line-height: .27rem;
            }
            div {
              float: right;
              height: .27rem;
              margin: .3rem 0 0 0;
              line-height: .27rem;
            }
            .phone {
              color: #3295f9;
            }
          }
        }
      }
    }
    .review-progress {
      background-color: #f1f1f1;
      padding-top: .2rem; // 利用高度消除滚动条，有时候好使，有时候不好使？？
      // height: 14.6rem;
      .pro-title {
        height: .98rem;
        border-bottom: 1px solid #d4d4d4;
        padding: 0 .32rem;
        background-color: #fff;
        img {
          width: .32rem;
          height: .32rem;
          margin: .34rem .2rem 0 0;
          display: block;
          float: left;
        }
        h3 {
          display: inline-block;
          font-size: .3rem;
          line-height: .98rem;
          color: #39f;
          margin: 0;
          font-weight: normal;
        }
      }
      .pro-content {
        background-color: #f1f1f1;
        height: 12.93rem;
        padding-top: .2rem;
        .core-info,
        .personal-info,
        .important-info,
        .credit-info {
          background-color: #fff;
          margin: 0 .2rem .2rem .2rem;
          width: 7.1rem;
          border: 1px solid #e6e6e6;
          border-radius: .2rem;
          h4 {
            font-size: .28rem;
            font-weight: normal;
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
          ul {
            padding-left: .3rem;
            color: #333;
            margin: .1rem 0 0 0;
            li {
              position: relative;
              list-style-type: none;
              height: .54rem;
              .left,
              .mid,
              .right {
                margin: .2rem 0 0 0;
                font-size: .26rem;
                height: .24rem;
                line-height: .24rem;
              }
              .left {
                display: inline-block;
              }
              .mid {
                display: inline-block;
                position: absolute;
                left: 2.7rem;
              }
              .fail {
                color: #ff4e4e;
              }
              .suc {
                color: #39f;
              }
              .right {
                // display: inline-block;
                float: right;
                margin-right: .3rem;
              }
            }
          }
        }
        .core-info {
          height: 2.02rem;
        }
        .personal-info {
          height: 3.1rem;
        }
        .important-info {
          height: 3.64rem;
        }
        .credit-info {
          height: 3.1rem;
        }
      }
    }
  }
}
</style>