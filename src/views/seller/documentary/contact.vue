<!--联系人信息-->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="contactPerson-information">
  
    <c-title :text="title" skin="blue"></c-title>
  
    <div class="box">
      <div class="review-progress">
        <div class="pro-content">
  
          <div class="immediate-info">
            <h4 class="sub-title">直系亲属</h4>
            <ul>
              <li>
                <p class="left">姓名</p>
                <div class="right">{{contactInfo.nameOne}}</div>
              </li>
              <li>
                <p class="left">关系</p>
                <div class="right">{{contactInfo.relationShipTypeOne}}</div>
              </li>
              <li v-if="marriage==true">
                <p class="left">身份证号</p>
                <div class="right">{{contactInfo.cardNoOne}}</div>
              </li>
              <li>
                <p class="left">联系电话</p>
                <div class="right">{{contactInfo.mobileOne}}</div>
              </li>
            </ul>
  
            <ul>
              <li>
                <p class="left">姓名</p>
                <div class="right">{{contactInfo.nameTwo}}</div>
              </li>
              <li>
                <p class="left">关系</p>
                <div class="right">{{contactInfo.relationShipTypeTwo}}</div>
              </li>
              <li>
                <p class="left">联系电话</p>
                <div class="right">{{contactInfo.mobileTwo}}</div>
              </li>
            </ul>
          </div>
  
          <div class="career-info">
            <h4 class="sub-title">职业证明人</h4>
            <ul>
              <li>
                <p class="left">姓名</p>
                <div class="right">{{contactInfo.nameThree}}</div>
              </li>
              <li>
                <p class="left">关系</p>
                <div class="right">{{contactInfo.relationShipTypeThree}}</div>
              </li>
              <li>
                <p class="left">联系电话</p>
                <div class="right">{{contactInfo.mobileThree}}</div>
              </li>
            </ul>
          </div>
  
          <div class="other-info">
            <h4 class="sub-title">其他联系人</h4>
            <ul>
              <li>
                <p class="left">姓名</p>
                <div class="right">{{contactInfo.nameFour}}</div>
              </li>
              <li>
                <p class="left">关系</p>
                <div class="right">{{contactInfo.relationShipTypeFour}}</div>
              </li>
              <li>
                <p class="left">联系电话</p>
                <div class="right">{{contactInfo.mobileFour}}</div>
              </li>
            </ul>
          </div>
        </div>
        <p class="notice">可知晓本次融资申请的联系人：家属、同事</p>
      </div>
  
      <div class="component">
        <div class="radios">
          <label class="item">审核结果</label>
          <label v-if="auditResult" class="no">{{auditResult}}</label>
  
          <div v-else>
            <label class="no" for="no">不通过</label>
            <div class="wrapper">
              <input class="circle" type="radio" id="no" value="false" v-model="pass">
              <span></span>
            </div>

            <label class="yes" for="yes">通过</label>
            <div class="wrapper">
              <input class="circle" type="radio" id="yes" value="true" v-model="pass">
              <span></span>
            </div>
          </div>
        </div>
  
        <!--此处文本只有在livingInfoStatus=='待质检'的时候会显示,用于让销售人员填写不通过的审核说明-->
        <div class="txt-box" v-if="conPersonInfoStatus=='待质检'">
          <div v-if="pass=='true'" class="text">
            <textarea v-model="auditRemark" placeholder="审核已通过" readonly></textarea>
          </div>
          <div v-if="pass=='false'" class="text">
            <textarea v-model="auditRemark" placeholder="请填写不予通过的审核说明"></textarea>
          </div>
        </div>
        <!--此处文本用于展示，不通过的时候展示，通过的话不展示。只有在livingInfoStatus！='待质检'的时候会显示-->
        <div class="txt-box" v-if="conPersonInfoStatus!='待质检'">
          <div v-if="pass=='false'" class="text">
            <textarea v-model="auditRemark" placeholder="请填写不予通过的审核说明" readonly></textarea>
          </div>
        </div>
        <!--提交按钮只有在livingInfoStatus=='待质检'的时候会显示-->
        <!--不通过就一直显示-->
        <div v-if="!auditResult" class="button">
          <div class="submit" v-if="ok" @click="commit">
            <p style="color: #fff;">确认并提交</p>
          </div>
          <div class="submit" v-else>
            <p style="color: #9cd2ff;">确认并提交</p>
          </div>
        </div>
      </div>
    </div>
  
  </div>
</template>


<script>
import cTitle from 'components/title';
//请求
import axios from "axios";
//store的辅助函数
import { mapMutations, mapState } from 'vuex';
import {Toast} from 'mint-ui';

let API = `${window.$rootPath}/sale/requestController/customer/contactInfo`;
const API_COMMIT=`${window.$rootPath}/sale/requestController/customer/contactAudit`;

export default {
  data() {
    return {
      title: '联系人信息',
      auditRemark: '',

      //自己定义的，需要跟后台确认
      pass: 'true',// 通过与否的状态，单选框
      passStatus: '通过',
      conPersonInfoStatus: '待质检',//居住信息的审核状态;待质检,质检不通过,质检通过,

      loading: false,
      customerId: this.$route.query.customerId,
      requestId: this.$route.query.requestId,
      contactInfo: {},
      auditRemark: '', //审核备注
      auditResult: '', //审核结果
    }
  },

  computed: {
     ok () {
        if (this.pass == 'true') {
          return true;
        }
        if (this.pass == 'false') {
          return this.auditRemark;
        }
        return false;
      },

    ...mapState(['pid', 'version', 'token', 'type'])
  },

  //自定义的方法放在 methods
  methods: {

    //提交
    commit() {
       axios.post(API_COMMIT, {
        comm: {
          pid: this.pid,
          type: this.type,
          version: this.version
        },
        token: this.token,
        body: {
          customerId: this.customerId,
          requestId: this.requestId,
          //这里的结果来源于销售的操作
          auditResult:this.pass == 'true' ? 1 : 0,//1通过，0未通过
          //这里是销售输入的不通过理由
          auditRemark:this.auditRemark
        }
      }).then(response => {
        const json = response.data;
        if (json.code == '00000' && json.data.success=='true') {
          //提交成功弹窗提示
          Toast("操作成功")
          //修改pass，
           this.auditResult = this.pass == 'true' ? '通过' : '不通过';
        }
        this.loading = false;
      }).catch((err) => {
        this.loading = false;
      });

    },

    //获取数据
    getData() {

      if (this.loading) {
        return;
      }

      this.loading = true;
      axios.post(API, {
        comm: {
          pid: this.pid,
          type: this.type,
          version: this.version
        },
        token: this.token,
        body: {
          customerId: this.customerId,
          requestId: this.requestId,
        }
      }).then(response => {
        const json = response.data;
        if (json.code == '00000' && json.data) {
          this.contactInfo = json.data;
          console.log(json.data)
        }
        else {
          this.msg = '没有数据';
        }
        this.loading = false;
      }).catch((err) => {
        this.loading = false;
      });
    },

  },

  created() {
    this.getData()
  },

  mounted() {
  },

  //titie
  components: { cTitle }
}
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
.contactPerson-information {
  width: 100%;
  height: 100%;
  font-family: YouYuan, Tahoma, STXihei;
  position: relative;
  background-color: #f1f1f1;
  .border {
    width: 100%;
    height: .21rem;
    background-color: #f2f4f4;
    border-top: 1px solid #e3e3e5;
  } 
  
  //固定定位
  .components-title-blue {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .box {
    background-color: #f1f1f1;
    width: 100%;

    padding-top:0.88rem;

    .review-progress {
      .pro-content {
        background-color: #f1f1f1;
        padding-top: .2rem;
        .immediate-info,
        .career-info,
        .other-info {
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
            color: #333;
            margin: 0 .3rem;
            padding-left: 0;
            li {
              position: relative;
              list-style-type: none;
              height: .54rem;
              .left,
              .right {
                margin: .2rem 0 0 0;
                font-size: .26rem;
                height: .24rem;
                line-height: .24rem;
              }
              .left {
                display: inline-block;
              }
              .fail {
                color: #ff4e4e;
              }
              .suc {
                color: #39f;
              }
              .right {
                display: inline-block;
                float: right;
              }
            }
          }
        }
        .immediate-info {
          ul:nth-child(2) {
            border-bottom: 1px solid #e6e6e6;
            padding-bottom: .35rem;
            padding-top: .1rem;
          }
          ul:nth-child(3) {
            padding-top: .2rem;
            padding-bottom: .32rem;
          }
        }
        .career-info {
          ul:nth-child(2) {
            padding-bottom: .32rem;
            padding-top: .1rem;
          }
        }
        .other-info {
          margin: 0 .2rem;
          ul:nth-child(2) {
            padding-bottom: .32rem;
            padding-top: .1rem;
          }
        }
      }
      .notice {
        height: 1.06rem;
        padding: 0 .32rem;
        width: 6.86rem;
        font-size: .28rem;
        line-height: 1.06rem;
        margin: 0;
      }
    }

    .component {
      .radios {
        clear: both;
        height: .88rem;
        line-height: .88rem;
        list-style: none;
        padding: 0 .32rem;
        border-bottom: 1px solid #e5e5e5;
        background-color: #fff;
        .item {
          color: #666;
        }
        .no {
          height: .88rem;
          float: right;
        }
        label {
          display: block;
          float: left;
          font-size: .3rem;
          color: #333333;
        }
        div {
          .wrapper {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 10px;
            position: relative;
            background: #fff;
            vertical-align: middle;
            border: 1px solid #1796f9;
            border-radius: 100%;
            float: right;
            margin-top: .3rem;

            input.circle {
              float: left;
              margin: .04rem 0;
              opacity: 0;
              position: absolute;
              z-index: 100;
              width: 100%;
              height: 100%;
            }
            input+span {
              display: block;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              position: absolute;
              background: #1796f9;
              top: 50%;
              left: 50%;
              margin: -3px 0 0 -3px;
              z-index: 1;
            }
            input[type="radio"]+span {
              opacity: 0;
            }
            input[type="radio"]:checked+span {
              opacity: 1;
            }
          }
          label {
            display: block;
            float: left;
            font-size: .3rem;
            color: #333333;
          }
          .yes,
          .no {
            height: .88rem;
            float: right;
          }
          .yes {
            margin: 0 1.02rem 0 .06rem;
          }
          .no {
            margin-left: .06rem;
          }
        }
      }
      .txt-box {
        .text {
          width: 100%;
          height: 2rem;
          border-bottom: 1px solid #d4d4d4;
          textarea {
            width: 100%;
            height: 1.7rem;
            border: none;
            padding: .3rem 0 0 .38rem;
            font-size: .3rem;
            color: #333;
            font-family: YouYuan, Tahoma, STXihei;
          }
          textarea::-webkit-input-placeholder {
            color: #999;
            font-size: .3rem;
          }
        }
      }
      .button {
        width: 100%;
        background: #f1f1f1;
        height: 1.38rem;
        div.submit {
          width: 6.90rem;
          height: .98rem;
          margin: .5rem .3rem .4rem .3rem;
          background: -webkit-linear-gradient(left, #45bbff, #3399ff);
          /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(right, #45bbff, #3399ff);
          /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(right, #45bbff, #3399ff);
          /* Firefox 3.6 - 15 */
          background: linear-gradient(to right, #45bbff, #3399ff);
          text-align: center;
          border-radius: .49rem;
          p {
            font-size: 0.36rem;
            height: .98rem;
            line-height: .98rem;
            margin: 0;
          }
        }
      }
    }
  }
}
</style>