<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="help-list">
    <div class="layer" v-bind:class="{ active: isActive }"></div>
    <div class="nav">
      <div class="manager">
        <div>
          <img src="../../../assets/app/help/manager.png"/>
          <p>客户经理</p>
        </div>
      </div>
      <div class="line"></div>
      <div class="hotline">
        <div @click="commit">
          <img src="../../../assets/app/help/hotline.png"/>
          <p>客服热线</p>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="choice" @click="getIndex(1)">
        <img src="../../../assets/app/help/product-choice.png">
        <p>产品选择</p>
      </div>

      <div class="security" @click="getIndex(2)">
        <img src="../../../assets/app/help/security.png">
        <p>信息安全</p>
      </div>

      <div class="account" @click="getIndex(3)">
        <img src="../../../assets/app/help/account-management.png">
        <p>账户管理</p>
      </div>

      <div class="report" @click="getIndex(4)">
        <img src="../../../assets/app/help/report.png">
        <p>征信报告</p>
      </div>

      <div class="phone" @click="getIndex(5)">
        <img src="../../../assets/app/help/phone-operators.png">
        <p>手机运营商</p>
      </div>

      <div class="fund" @click="getIndex(6)">
        <img src="../../../assets/app/help/fund.png">
        <p>社保公积金</p>
      </div>

      <div class="car" @click="getIndex(7)">
        <img src="../../../assets/app/help/car.png">
        <p>车辆评估</p>
      </div>

      <div class="photos" @click="getIndex(8)">
        <img src="../../../assets/app/help/photos.png">
        <p>拍照资料</p>
      </div>

      <div class="others" @click="getIndex(9)">
        <img src="../../../assets/app/help/others.png">
        <p>其他</p>
      </div>
    </div>

    <div class="customer" v-if="titInfo">
      <img class="icon" src="../../../assets/app/help/call.png"/>
      <h3>客服热线</h3>
      <p>400-800-8899</p>
      <button class="cancel" @click="cancel">取消</button>
      <button class="call"><a href="tel:4008118006">呼叫</a></button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isActive:false,
        titInfo:false,
      }
    },

    //自定义的方法放在 methods
    methods : {
      //提交意向按钮
      commit(){
        this.isActive = true;
        this.titInfo = true;
      },

      cancel(){
        this.titInfo = false;
        this.isActive = false;
      },

      getIndex:function(num){
        this.$router.push({
          path: 'app/help/details',
          name: 'AppHelpDetails',
          query: { num: num },
        });
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  div.help-list{
    width: 100%;
    height: 100%;
    font-family: YouYuan, Tahoma, STXihei;
    position: relative;
    div.layer{
      position: absolute;
      top:0;
      left:0;
      background-color: #000;
      z-index: 40;
      opacity: 0.5;
      width:100%;
      height: 100%;
      display: none;
    }
    div.active{
      display: block;
    }
    div.nav{
      width: 100%;
      margin: 0 auto;
      height: 1.5rem;
      background: url("../../../assets/app/help/background.png") no-repeat;
      background-size: 100% 100%;
      color: #fff;
      //background: -webkit-linear-gradient(left, #45bbff , #3399ff); /* Safari 5.1 - 6.0 */
      //background: -o-linear-gradient(right, #45bbff , #3399ff); /* Opera 11.1 - 12.0 */
      //background: -moz-linear-gradient(right, #45bbff , #3399ff); /* Firefox 3.6 - 15 */
      //background: linear-gradient(to right, #45bbff , #3399ff);
      div.manager{
        width: 49%;
        height: 100%;
        font-size: .36rem;
        float: left;
        div{
          width: 2.13rem;
          height: .49rem;
          margin: .5rem auto .51rem;
          img{
            width: .52rem;
            height: .49rem;
            float: left;
          }
          p{
            margin: 0;
            float: right;
            line-height: .49rem;
          }
        }
      }
      div.line{
        width: .02rem;
        height: .58rem;
        background-color: #fff;
        float: left;
        margin-top: .46rem;
      }
      div.hotline{
        width: 49%;
        height: 100%;
        font-size: .36rem;
        float: right;
        div{
          width: 2.13rem;
          height: .49rem;
          margin: .5rem auto .51rem;
          img{
            width: .52rem;
            height: .49rem;
            float: left;
          }
          p{
            margin: 0;
            float: right;
            line-height: .49rem;
          }
        }
      }
    }
    div.list{
      div{
        width: 1.46rem;
        height: .98rem;
        margin: .5rem .52rem;
        float: left;
        img{
          width: .52rem;
          height: .52rem;
          display: block;
          margin: 0 auto;
        }
        p{
          margin: .19rem auto 0;
          line-height: .27rem;
          text-align: center;
          font-size: .28rem;
          color: #4d4d4d;
        }
      }
    }

    div.customer{
      width: 5.66rem;
      height: 4.11rem;
      background-color: #fff;
      position: absolute;
      top: 3.71rem;
      left: .92rem;
      z-index: 999;
      border-radius: .1rem;
      img.icon{
        width: 1.86rem;
        height: 1.86rem;
        display: block;
        margin: -.85rem auto 0;
      }
      h3{
        font-size: .4rem;
        line-height: .38rem;
        color: #4d4d4d;
        text-align: center;
        font-weight: normal;
        margin: .33rem auto 0;
      }
      p{
        font-size: .4rem;
        line-height: .36rem;
        margin: 0rem auto .5rem;
        color: #3399ff;
        text-align: center;
        margin: .29rem auto .6rem;
      }
      button.cancel{
        width: 2.26rem;
        height: .76rem;
        color: #3399ff;
        border: .03rem solid #3399ff;
        border-radius: .4rem;
        float: left;
        margin-left: .4rem;
        background-color: #fff;
        font-size: .36rem;
      }
      button.call{
        width: 2.26rem;
        height: .76rem;
        color: #fefefe;
        border-radius: .4rem;
        float: right;
        margin-right: .4rem;
        border: none;
        font-size: .36rem;
        background: -webkit-linear-gradient(left, #45bbff , #3399ff); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #45bbff , #3399ff); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #45bbff , #3399ff); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #45bbff , #3399ff);
        a{
          color: #fefefe;
        }
      }
    }
  }
</style>