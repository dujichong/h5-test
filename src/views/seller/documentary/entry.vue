<!--客户录件-->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="entry">
    <c-title :text="title" skin="blue"></c-title>

    <div class="nav">
      <div v-for="(item, index) of tabTitleObj" @click="change(item, index)" :class="{item: true , active: index == currentIndex}">{{item.subTitle}}</div>
    </div>

    <div class="border"></div>

    <div class="box">
      <div class="user" v-for="(userInfo,index) in currentDetail">
        <div class="nameAndCircle">
          <p class="name">{{userInfo.name}}</p>
          <!--<img src="">-->
          <div class="circle">{{userInfo.messageNumber}}</div>
        </div>
        <p class="phoneNumber">客户电话: {{userInfo.phoneNumber}}</p>
        <p class="status">进件状态: {{userInfo.status}}</p>
        <p class="updateTime">更新时间: {{userInfo.updateTime}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import cTitle from 'components/title';

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
        userInformationObj: [
          {
            '1':{
              name:'李丹',
              phoneNumber:'1324567813',
              updateTime:'2017-05-12 20:38',
              status:'已录完',
              messageNumber:'12',
            },
            '2':{
              name:'小明',
              phoneNumber:'1324567813',
              updateTime:'2017-05-12 20:38',
              status:'录件中',
              messageNumber:'2',
            },
            '3':{
              name:'柳随风',
              phoneNumber:'1324567813',
              status:'未录件',
              updateTime:'2017-05-12 20:38',
              messageNumber:'0',
            },
          },
          {
            '1':{
              name:'李佳军',
              phoneNumber:'1324567813',
              updateTime:'2017-05-12 20:38',
              status:'门店驳回',
              messageNumber:'2',
            },
            '2':{
              name:'王四虎',
              phoneNumber:'1324567813',
              updateTime:'2017-05-12 20:38',
              status:'客服驳回',
              messageNumber:'1',
            },
            '3':{
              loginId: 1111,
              name:'丁德',
              phoneNumber:'1324567813',
              status:'门店驳回',
              updateTime:'2017-05-12 20:38',
              messageNumber:'0',
            },
          },
        ],
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
      //根据小红圈里面的数字来设置圆圈的宽度，如果是2位以上，如果是1位，或者没有
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
    components: {cTitle}
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  div.entry{
    width: 100%;
    height: 100%;
    font-family: YouYuan, Tahoma, STXihei;
    position: relative;
    div.nav{
      height: .88rem;
      padding: 0 .32rem;
      div.item{
        width: 1.56rem;
        height: .84rem;
        text-align: center;
        display: inline-block;
        font-size: .3rem;
        line-height: .88rem;
        color: #333;
        margin: 0 .93rem;
      }
      div.active{
        color: #39f;
        border-bottom: .04rem solid #39f;
      }
    }
    div.border{
      width: 100%;
      height: .21rem;
      background-color: #f2f4f4;
      border-top: 1px solid #e3e3e5;
    }
    div.box{
      width: 100%;
      background-color: #fff;
      div.user{
        //height: 1.89rem;
        padding: 0 .32rem;
        border-bottom: 1px solid #e3e3e5;
        div.nameAndCircle{
          p.name{
            font-size: .3rem;
            color: #333;
            float: left;
            margin: .23rem 0 .18rem;
          }
          div.circle{
            width: .36rem;/*.52rem*/
            height: .36rem;
            border-radius: .18rem;
            background-color: #ff3130;
            color: #fff;
            float: right;
            margin-top: .2rem;
            text-align: center;
            line-height: .36rem;
          }
        }
        p.phoneNumber{
          font-size: .28rem;
          color: #666;
          clear: both;
          margin: 0;
        }
        p.status{
          font-size: .28rem;
          color: #666;
          clear: both;
          margin: 0;
        }
        p.updateTime{
          font-size: .28rem;
          color: #666;
          clear: both;
          margin: 0 0 .23rem 0;
        }
      }
    }
  }
</style>