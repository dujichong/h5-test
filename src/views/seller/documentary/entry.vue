<!--客户录件-->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <!--根元素-->
  <div class="entry">
  
    <c-title :text="title" skin="blue"></c-title>
  
    <div class="nav">
      <div v-for="(item, index) of tabTitleObj" @click="change(item, index)" :class="{item: true , active: index == currentIndex}" :key="index">{{item.subTitle}}</div>
    </div>
  
    <!--<div class="border"></div>-->
  
    <div class="box">
  
      <p>{{userInformationObj.message}}</p>
  
      <div class="user" v-for="(userInfo,index) in currentDetail" :key="index" @click="turnToInformation(userInfo.loginId,userInfo.customerId,userInfo.requestId)">
        <div class="nameAndCircle">
  
          <p class="name">{{userInfo.customerId}}</p>
          <!--<img src="">-->
          <div class="circle">{{userInfo.number}}</div>
        </div>
        <p class="phoneNumber">客户电话: {{userInfo.phone}}</p>
        <p class="status">进件状态: {{userInfo.requestStatus}}</p>
        <p class="updateTime">更新时间: {{userInfo.updateTime}}</p>
      </div>
  
    </div>
  
    <!--加载更多,plain可以空心,v-if加载完数据再显示button，避免闪屏-->
    <!--<mt-button v-if="userInformationObj.length" type="primary" size="large">--加载更多--</mt-button>-->
  
  </div>
</template>

<script>

import cTitle from 'components/title';
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';

//引入mint-ui的button组件
import { Button } from 'mint-ui';
import "mint-ui/lib/style.css"

export default {
  data() {
    return {
      currentIndex: 0,//this.$route.query.id ||
      title: '录件中',
      tabTitleObj: [
        {
          subTitle: '客户录件',
          tab: "entry"
        },
        {
          subTitle: '质检驳回',
          tab: "refuse"
        },
      ],
      baseApi: `${window.$rootPath}/sale/requestController/customerTyping/`,
      API: "",
      userInformationObj: [],
      pageNo: 1,
      pageSize: 10,
      loading: false
    }
  },

  computed: {
    notEmpty() {
      let flag = false;
      for (let item in this.info) {
        flag = true;
        break;
      }
      return flag;
    },

    currentDetail() {
      return this.userInformationObj;
    },
    //公共状态映射到当前组件
    ...mapState(['pid', 'version', 'token', 'type'])
  },

  methods: {
    //根据tab索引切换
    change(item, index) {
      this.currentIndex = index;
      this.API = this.baseApi + item.tab;
      //修改后需要调用
      this.getData();
    },

    //获取数据
    getData(isMore) {

      //数据没有加载成功则提示用户
      if (this.loading) {
        return this.userInformationObj.message = "数据加载中...请稍后";
      }
      this.loading = true;

      //发送请求
      axios.post(this.API, {
        comm: {
          pid: this.pid,
          type: this.type,
          version: this.version
        },
        token: this.token,
        body: {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      }).then(response => {
        const json = response.data;
        if (json.code == '00000' && json.data && json.data.list && json.data.list.length) {
          //如果点击加载更多则在原来的基础上拼接
          if (isMore) {
            this.userInformationObj.push.apply(this.userInformationObj, json.data.list);
          } else {
            this.userInformationObj = json.data.list;
          }
        }
        else {
          this.msg = '没有数据';
        }
        this.loading = false;
      }).catch((err) => {
        this.loading = false;
        console.log(err)
      });
    },

    //加载更多
    getMoreData() {
      this.pageNo++;
      this.getData(true);
    },

    //转到客户资料页面
    turnToInformation(loginId, customerId, requestId) {
      this.$router.push({ name: "SellerDocumentaryInformation", query: { loginId: loginId, customerId: customerId, requestId: requestId } })
    }

  },

  //实例创建完成后调用
  created() {
    this.change(this.tabTitleObj[0], 0);
    // this.getData(true);
  },

  //元素完成挂载后调用
  mounted() {

    //根据小红圈里面的数字来设置圆圈的宽度，如果是2位以上，如果是1位，或者没有
    let element = this.$el.getElementsByClassName('circle');
    for (let i = 0; i < element.length; i++) {
      if (element[i].innerText == 0) {
        element[i].style.display = "none";
      }
      if (element[i].innerText.length > 1) {
        element[i].style.width = ".52rem";
      }
    }

  },

  //titie
  components: { 
    cTitle,
    mtButton:Button
   }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.entry {
  width: 100%;
  height: 100%;
  font-family: YouYuan, Tahoma, STXihei;
  position: relative;


  .components-title-blue {
    position: fixed;
    top: 0;
    left: 0;
  }

  .nav {
    height: .88rem;
    padding: 0 .32rem;
    background-color: #f2f4f4;
    overflow-y: hidden; 
    //固定定位
    position: fixed;
    top: 0.88rem;
    left: 0;

    &::-webkit-scrollbar {
      display: none;
    } 
    //这样写无效为何？
    &:hover {
      color: red;
    }

    .item {
      width: 1.56rem;
      height: .84rem;
      text-align: center;
      display: inline-block;
      font-size: .3rem;
      line-height: .88rem;
      color: #333;
      margin: 0 .93rem;
    }
    .active {
      color: #39f;
      border-bottom: .04rem solid #39f;
    }
  }

  .border {
    width: 100%;
    height: .21rem;
    background-color: #f2f4f4;
    border-top: 1px solid #e3e3e5; //固定定位
    position: fixed;
    top: 1.7rem;
    left: 0;
  }
  .box {
    width: 100%;
    background-color: #fff; //避开顶部
    padding-top: 1.5rem; // 为甚么无效？？
    &::-webkit-scrollbar {
      display: none;
    }

    .user {
      //height: 1.89rem;
      padding: 0 .32rem;
      border-bottom: 1px solid #e3e3e5;
      div.nameAndCircle {
        p.name {
          font-size: .3rem;
          color: #333;
          float: left;
          margin: .23rem 0 .18rem;
        }
        .circle {
          width: .36rem;
          /*.52rem*/
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
      .phoneNumber {
        font-size: .28rem;
        color: #666;
        clear: both;
        margin: 0;
      }
      .status {
        font-size: .28rem;
        color: #666;
        clear: both;
        margin: 0;
      }
      .updateTime {
        font-size: .28rem;
        color: #666;
        clear: both;
        margin: 0 0 .23rem 0;
      }
    }
  }

  .mint-button {
    font-size: 14px;
    font-family: "微软雅黑";
  }
}
</style>