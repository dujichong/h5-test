<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="customer-information">
    <c-sellerTitle :text="title" :hide="false"></c-sellerTitle>
    <div class="box">
      <div class="base-information">
        <!--v-for="(info,index) in infoObj"-->
        <ul>
          <li>
            <p class="name">客户姓名</p><div>张三丰</div>
          </li>
          <li>
            <p class="phoneNumberOne">手机号码1</p><div class="phone"><a href="tel:18666666666">18666666666</a></div>
          </li>
          <li>
            <p class="phoneNumberTwo">手机号码2</p><div class="phone"><a href="tel:18888888888">18888888888</a></div>
          </li>
          <li>
            <p class="IDNumber">身份证号</p><div>610425199901010217</div>
          </li>
          <li>
            <p class="IDNumber">民族</p><div>汉</div>
          </li>
          <li>
            <p class="IDNumber">学历</p><div>本科</div>
          </li>
          <li>
            <p class="IDNumber">婚姻状况</p><div>已婚</div>
          </li>
          <li>
            <p class="IDNumber">子女数量</p><div>2</div>
          </li>
          <li>
            <p class="IDNumber">供养人数</p><div>2</div>
          </li>
          <li>
            <p class="IDNumber">主要收入来源</p><div>打卡发薪</div>
          </li>
          <li>
            <p class="IDNumber">年收入(元)</p><div>800.00</div>
          </li>
          <li>
            <p class="IDNumber">本市房产情况</p><div>有房无贷款</div>
          </li>
          <li>
            <p class="IDNumber">了解渠道</p><div>网络</div>
          </li>
          <li>
            <p class="IDNumber">QQ</p><div>824999824</div>
          </li>

          <li class="noBorder">
            <label class="item">审核结果</label>
            <label class="no" for="no">不通过</label>
            <div class="wrapper">
              <input class="circle" type="radio" id="no" value="false" v-model="payOfSocialSecurityFund"><span></span>
            </div>
            <label class="yes" for="yes">通过</label>
            <div class="wrapper">
              <input class="circle" type="radio" id="yes" value="true" v-model="payOfSocialSecurityFund"><span></span>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="payOfSocialSecurityFund=='true'" class="text">
        <textarea v-model="message" placeholder="请填写不予通过的审核说明" readonly></textarea>
      </div>
      <div v-if="payOfSocialSecurityFund=='false'" class="text">
        <textarea v-model="message" placeholder="请填写不予通过的审核说明"></textarea>
      </div>
      <div class="button">
        <div class="submit" v-if="ok" @click="commit">
          <p style="color: #fff;">确认并提交</p>
        </div>
        <div class="submit" v-else>
          <p style="color: #9cd2ff;">确认并提交</p>
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
        title: '基础信息',

        payOfSocialSecurityFund: 'true',
      }
    },

    computed: {
      ok () {
        if(true) {
          return (true);
        }
      },
    },

    //自定义的方法放在 methods
    methods : {
      commit() {
        console.log(this.payOfSocialSecurityFund);
        console.log(typeof (this.payOfSocialSecurityFund));
      },
    },


    mounted(){
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
      background-color: #f1f1f1;
      .base-information{
        font-size: .3rem;
        padding: 0 .32rem;
        border-bottom: 1px solid #d4d4d4;
        background-color: #fff;
        height: 8.94rem;
        ul{
          height: 100%;
          padding: 0;
          margin: 0;
          color: #666;
          .noBorder{
            clear: both;
            height: .96rem;
            line-height: .96rem;
            list-style: none;
            div.wrapper{
              display: inline-block;
              width: 16px;
              height: 16px;
              margin-right: 10px;
              position: relative;
              background: #fff;
              vertical-align: middle;
              border:1px solid #1796f9;
              border-radius: 100%;
              float: right;
              margin-top: .34rem;

              input.circle{
                float: left;
                margin: .04rem 0;
                opacity: 0;
                position: absolute;
                z-index:100;
                width: 100%;
                height: 100%;
              }
              input+span {
                display: block;
                width: 6px;
                height: 6px;
                border-radius:50%;
                position: absolute;
                background: #1796f9;
                top: 50%;
                left:50%;
                margin: -3px 0  0 -3px;
                z-index:1;
              }
              input[type="radio"] + span {
                opacity: 0;
              }
              input[type="radio"]:checked + span {
                opacity: 1;
              }
            }
            label{
              display: block;
              float: left;
              font-size: .3rem;
              color: #333333;
            }
            label.yes, label.no{
              height: .98rem;
              float: right;
            }
            label.yes{
              margin: 0 1.02rem 0 .06rem;
            }
            label.no{
              margin-left: .06rem;
            }
          }
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
      .text{
        width: 100%;
        height: 2rem;
        margin-top: .2rem;
        border-bottom: .01rem solid #d4d4d4;
        textarea{
          width: 100%;
          height: 1.7rem;
          border: none;
          padding: .3rem 0 0 .38rem;
          font-size: .3rem;
          color: #333;
          font-family: YouYuan, Tahoma, STXihei;
        }
        textarea::-webkit-input-placeholder{
          color: #999;
          font-size: .3rem;
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
</style>