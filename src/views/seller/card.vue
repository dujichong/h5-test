<!--销售 名片分享哦-->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="views-seller-card">

    <c-title :text="title" skin="black"></c-title>

    <div class="box">
      <div class="info">
        <div class="header">
          <img :src="photo">
          <div class="text">
            <p class="name">{{name}}</p>
            <p class="position">{{positionName}} {{number}}</p>
          </div>
        </div>
        <p class="phone item">{{phone}}</p>
        <p class="adress item">{{address}}</p>
      </div>
    </div>

  </div>
</template>
<script>

  import cTitle from 'components/title';
  import axios from 'axios';
  import {mapState} from 'vuex';

  const $rootPath = window.$rootPath;
  const API = `${$rootPath}/sale/mineController/mine`;


  export default {

    data () {
      return {
        title: '分享名片',
        number: '',
        phone: '',
        photo: '',
        name: '',
        positionName: '',
        store: '',
        address: '',
        messageCount: 0
      }
    },

    computed: {
      ...mapState(['pid', 'version', 'token', 'type', 'requestId']),
    },

    methods: {

      // 删除消息
      getData () {
        axios.post(API, {
          comm: {
            pid: this.pid,
            type: this.type,
            version: this.version
          },
          token: this.token,
          body: {
            requestId: this.requestId
          }
        }).then(response => {
          const json = response.data;
          if (json.code == '00000' && json.data) {
            Object.keys(json.data).forEach(key => {
              this[key] = json.data[key]
            })
          }
        });
      },
    },

    created () {
      this.getData();
    },

    components: {cTitle}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .views-seller-card {
    .box {
      padding-top: 2.15rem;
      width: 100%;
      height: 12.07rem;
      color: #ffffff;
      background: url(../../assets/seller/card/bg.png) no-repeat left top;
      background-size: 100% auto;
      p{
        margin: 0;
        line-height: 150%;
        font-size: .28rem;
      }
      .info {
        box-sizing: border-box;
        padding: .44rem;
        width: 6.87rem;
        height: 3.63rem;
        margin:0 auto;
        .header {
          display: flex;
          margin-bottom: .44rem;
          img {
            width: 1.15rem;
            height: 1.15rem;
            border-radius: 50%;
            box-shadow: 1px 4px 19px -4px #000;
            margin-right: .4rem;
          }
          .name {
            font-size: .42rem;
            margin-bottom: .1rem;
          }
          .position {
            display: inline-block;
            border-radius: 5px;
            background: #74ccff;
            padding: .05rem .16rem;
          }
        }
        .item {
          background-size: auto 80%;
          background-repeat: no-repeat;
          background-position: left center;
          padding-left: .4rem;
          margin-bottom: .2rem;
        }
        .phone {
          background-image: url(../../assets/seller/card/icon-phone.png);
          text-decoration: underline;
        }
        .adress {
          background-image: url(../../assets/seller/card/icon-adress.png);
        }
      }
    }
  }
</style>