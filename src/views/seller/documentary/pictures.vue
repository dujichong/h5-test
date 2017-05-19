<!--拍照资料项-->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="customer-information">
    <c-sellerTitle :text="title" :hide="false"></c-sellerTitle>
    <div class="box">
      <div class="base-information">
        <!--v-for="(info,index) in infoObj"-->
        <h3>身份证明</h3>
        <ul>
          <li @click="showBgPic(0)"><img src="../../../assets/seller/documentary/pic1.png"></li>
          <li @click="showBgPic(1)"><img src="../../../assets/seller/documentary/pic2.png"></li>
          <li><img src="../../../assets/seller/documentary/pic3.png"></li>
          <li><img src="../../../assets/seller/documentary/pic4.png"></li>
          <li><img src="../../../assets/seller/documentary/pic5.png"></li>
        </ul>
      </div>
      <div class="component">
        <div class="radios">
          <label class="item">审核结果</label>
          <label v-if="picInfoStatus!='待质检'" class="no">{{passStatus}}</label>

          <div v-if="picInfoStatus=='待质检'">
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
        <div class="txt-box" v-if="picInfoStatus=='待质检'">
          <div v-if="pass=='true'" class="text">
            <textarea v-model="message" placeholder="请填写不予通过的审核说明" readonly></textarea>
          </div>
          <div v-if="pass=='false'" class="text">
            <textarea v-model="message" placeholder="请填写不予通过的审核说明"></textarea>
          </div>
        </div>
        <!--此处文本用于展示，不通过的时候展示，通过的话不展示。只有在livingInfoStatus！='待质检'的时候会显示-->
        <div class="txt-box" v-if="picInfoStatus!='待质检'">
          <div v-if="pass=='false'" class="text">
            <textarea v-model="message" placeholder="请填写不予通过的审核说明" readonly></textarea>
          </div>
        </div>
        <!--提交按钮只有在livingInfoStatus=='待质检'的时候会显示-->
        <div v-if="picInfoStatus=='待质检'" class="button">
          <div class="submit" v-if="ok" @click="commit">
            <p style="color: #fff;">确认并提交</p>
          </div>
          <div class="submit" v-else>
            <p style="color: #9cd2ff;">确认并提交</p>
          </div>
        </div>
      </div>
    </div>
    <div class="backgroundPic" @click="hideBgPic(0)">
      <img src="../../../assets/seller/documentary/pic1.png"/>
    </div>

    <div class="backgroundPic" @click="hideBgPic(1)">
      <img src="../../../assets/seller/documentary/bc2.jpeg"/>
    </div>
  </div>
</template>
<script>
  import cSellerTitle from 'components/sellerTitle';

  export default {
    data () {
      return {
        title: '基础信息',
        message: '',
        pass: 'true',
        passStatus: '通过',
        bgPicShow: false,
        picInfoStatus: '待质检',//居住信息的审核状态;待质检,质检不通过,质检通过
        
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

      showBgPic(index){
        let element = this.$el.getElementsByClassName('backgroundPic');
        element[index].className = "backgroundPic show";
      },

      hideBgPic(index){
        let element = this.$el.getElementsByClassName('backgroundPic');
        element[index].className = "backgroundPic";
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
      .base-information{
        font-size: .3rem;
        padding: 0 .32rem;
        border-bottom: 1px solid #d4d4d4;
        background-color: #fff;
        h3{
          font-weight: normal;
          font-size: .3rem;
          color: #333;
          margin: 0;
          height: .87rem;
          line-height: .87rem;
        }
        ul{
          padding: 0;
          margin: 0;
          li{
            list-style-type: none;
            width: 2rem;
            height:2rem;
            display: inline-block;
            margin-right: .22rem;
            margin-bottom: .32rem;
            img{
              width: 100%;
              height: 100%;
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
    .backgroundPic{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100000;
      display: none;
      background-color: #000;
      img{
        width: 100%;
        max-height: 100%;
        display: block;
        margin: auto;
      }
    }
    .show{
      display: block;
    }
  }
</style>