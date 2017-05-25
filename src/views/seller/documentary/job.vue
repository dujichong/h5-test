<!--职业信息-->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="customer-information">
    <c-title :text="title" skin="blue"></c-title>
    <div class="box">
      <div class="job-information">
        <!--v-for="(info,index) in infoObj"-->
        <ul v-if="salaryFrom==2">
          <li class="officialJobDate">
            <p>工作时间</p><div>2011年4月</div>
          </li>
          <li class="companyName">
            <p>经营主体</p><div>凡普金科</div>
          </li>
          <li class="workPlace">
            <p>现单位地址</p><div>北京市东城区</div>
          </li>
          <li class="housenumber">
            <p>详细地址</p><div>银河SOHO A座11层</div>
          </li>
          <li class="completePhone">
            <p>单位电话</p><div>010-88888888</div>
          </li>
        </ul>
        <ul v-if="salaryFrom==1">
          <li class="officialJobDate">
            <p>工作时间</p><div>2011年4月</div>
          </li>
          <li class="companyName">
            <p>现单位名称</p><div>凡普金科</div>
          </li>
          <li class="payOfSocialSecurityFund">
            <p>是否缴纳社保/公积金</p><div>凡普金科</div>
          </li>
          <li class="workPlace">
            <p>现单位地址</p><div>北京市东城区</div>
          </li>
          <li class="housenumber">
            <p>详细地址</p><div>银河SOHO A座11层</div>
          </li>
          <li class="completePhone">
            <p>单位电话</p><div>010-88888888</div>
          </li>
          <li class="department">
            <p>现单位部门</p><div>凡普信贷</div>
          </li>
          <li class="jobTitleType">
            <p>现单位职位</p><div>开发工程师</div>
          </li>
          <li class="companyType">
            <p>企业性质</p><div>民营</div>
          </li>
          <li class="enterCompanyDate">
            <p>入职时间</p><div>2014年5月</div>
          </li>
        </ul>
      </div>

      <div class="component">
        <div class="radios">
        <label class="item">审核结果</label>
        <label v-if="jobInfoStatus!='待质检'" class="no">{{passStatus}}</label>

        <div v-if="jobInfoStatus=='待质检'">
          <label  class="no" for="no">不通过</label>
          <div class="wrapper">
            <input class="circle" type="radio" id="no" value="false" v-model="pass"><span></span>
          </div>
          <label class="yes" for="yes">通过</label>
          <div class="wrapper">
            <input class="circle" type="radio" id="yes" value="true" v-model="pass"><span></span>
          </div>
        </div>
      </div>
        <!--此处文本只有在livingInfoStatus=='待质检'的时候会显示,用于让销售人员填写不通过的审核说明-->
        <div class="txt-box" v-if="jobInfoStatus=='待质检'">
          <div v-if="pass=='true'" class="text">
            <textarea v-model="message" placeholder="请填写不予通过的审核说明" readonly></textarea>
          </div>
          <div v-if="pass=='false'" class="text">
            <textarea v-model="message" placeholder="请填写不予通过的审核说明"></textarea>
          </div>
        </div>
        <!--此处文本用于展示，不通过的时候展示，通过的话不展示。只有在livingInfoStatus！='待质检'的时候会显示-->
        <div class="txt-box" v-if="jobInfoStatus!='待质检'">
          <div v-if="pass=='false'" class="text">
            <textarea v-model="message" placeholder="请填写不予通过的审核说明" readonly></textarea>
          </div>
        </div>
        <!--提交按钮只有在livingInfoStatus=='待质检'的时候会显示-->
        <div v-if="jobInfoStatus=='待质检'" class="button">
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

  export default {
    data () {
      return {
        title: '基础信息',
        message: '',
        pass: 'true',
        passStatus: '通过',
        salaryFrom: 1,//1位薪类，2位商类


        jobInfoStatus: '待质检',//居住信息的审核状态;待质检,质检不通过,质检通过
        officialJobDate: '',//工作时间
        enterCompanyDate: '',//入职时间
        companyName: '',//现单位名称或者经营主体
        payOfSocialSecurityFund: true,
        workPlace: '',//现单位地区
        housenumber: '',//详细地址
        completePhone: '',//单位电话
        areaCode: '',//区号
        telephoneNumber: '',//中间电话号码
        branchNumber: '',//分机号
        department: '',//现单位部门
        jobTitleType: '',//现单位职位
        messageOfJobTitleType: '',//其他情况说明
        companyType: '',//现单位性质
        messageOfCompanyType: '',//其他情况说明
        provinceCode: "110000",//省
        cityCode: "110100",//市
        distCode: "110101",//县区
        completeaddress: "北京市 市辖区 东城区 东二环银河SOHO A座11层",
      }
    },

    computed: {
      ok () {
        if(this.pass=='true') {
          return (true);
        }
        if(this.pass=='false'){
          return (this.message);
        }
      },
    },

    //自定义的方法放在 methods
    methods : {
      commit() {
      },
    },


    mounted(){
    },

    //titie
    components: {cTitle}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .customer-information{
    width: 100%;
    height: 100%;
    font-family: YouYuan, Tahoma, STXihei;
    position: relative;
    background-color: #f1f1f1;
    .border{
      width: 100%;
      height: .21rem;
      background-color: #f2f4f4;
      border-top: 1px solid #e3e3e5;
    }
    .box{
      width: 100%;
      background-color: #f1f1f1;
      .job-information{
        font-size: .3rem;
        padding: 0 .32rem .4rem;
        border-bottom: 1px solid #d4d4d4;
        background-color: #fff;
        ul{
          height: 100%;
          padding: 0;
          margin: 0;
          color: #666;
          li{
            list-style-type: none;
            height: .57rem;
            p,div{
              height: .28rem;
              margin: .29rem 0 0 0;
              line-height: .28rem;
            }
            p{
              float: left;
              color: #666;
            }
            div{
              float: right;
              color: #333;
            }
            .phone{
              color: #3295f9;
            }
          }
        }
      }

      .component {
        .radios {
          clear: both;
          height: .88rem;
          line-height: .88rem;
          list-style: none;
          padding: 0 .32rem;
          margin-top: .2rem;
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
              input + span {
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
              input[type="radio"] + span {
                opacity: 0;
              }
              input[type="radio"]:checked + span {
                opacity: 1;
              }
            }
            label {
              display: block;
              float: left;
              font-size: .3rem;
              color: #333333;
            }
            .yes, .no {
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
            background: -webkit-linear-gradient(left, #45bbff, #3399ff); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #45bbff, #3399ff); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, #45bbff, #3399ff); /* Firefox 3.6 - 15 */
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