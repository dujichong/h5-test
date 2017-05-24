<!--我的-消息中心-->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="customer-information">
    <c-title :hide="true" :text="title"></c-title>
    <div class="title">
      <img class="back" src="../../../assets/components/title/title-angle.png" @click="backwards"/>
      <h1>{{ title }}</h1>
      <div class="delete">
        <span class="cancel" v-bind:class="{ show: editting }" @click="cancel">取消</span>
        <img src="../../../assets/components/title/delete.png" v-bind:class="{ show: !editting }"
             @click="editting = true"/>
      </div>
    </div>

    <div class="box">

      <div v-if="nodata" class="nodata">没有消息</div>

      <div class="news-content">
        <div v-if="todayMessage.length" class="news-today">
          <label class="label">今天</label>
          <ul>
            <li v-for="(item, index) of todayMessage" :data-id="item.id" :data-requestId="item.requestId" @click="toggle('todayMessage', item, index)">
              <span v-if="!editting && item.readStatus == 0" class="mark"></span>
              <span v-if="editting" class="checkbox" :class="{selected: item.selected}"></span>
              <p class="content" :class="{editting: editting}">{{item.message}}</p>
              <p class="time">{{item.time}}</p>
            </li>
          </ul>
        </div>
        <div v-if="withinAWeekMessage.length" class="news-one-week">
          <label class="label">一周内</label>
          <ul>
            <li v-for="(item, index) of withinAWeekMessage" :data-id="item.id" :data-requestId="item.requestId" @click="toggle('withinAWeekMessage', item, index)">
              <span v-if="!editting && item.readStatus == 0" class="mark"></span>
              <span v-if="editting" class="checkbox" :class="{selected: item.selected}"></span>
              <p class="content" :class="{editting: editting}">{{item.message}}</p>
              <p class="time">{{item.time}}</p>
            </li>
          </ul>
        </div>
        <div v-if="aWeekAgoMessage.length" class="news-before-one-week">
          <label class="label">一周前</label>
          <ul>
            <li v-for="(item, index) of aWeekAgoMessage" :data-id="item.id" :data-requestId="item.requestId" @click="toggle('aWeekAgoMessage', item, index)">
              <span v-if="!editting && item.readStatus == 0" class="mark"></span>
              <span v-if="editting" class="checkbox" :class="{selected: item.selected}"></span>
              <p class="content" :class="{editting: editting}">{{item.message}}</p>
              <p class="time">{{item.time}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-bind:class="{ show: editting }" class="delete-label" @click="del">
      <img src="../../../assets/app/mine/delete-label.png">
      <span>删除</span>
    </div>
  </div>
</template>
<script>

  import cTitle from 'components/title';
  import axios from 'axios';

  const $rootPath = window.$rootPath;
  const API_GET_TOTAL_MESSAGE = `${window.$rootPath}/common/getTotalMessage`;
  const API_GET_ALL_MESSAGE = `${$rootPath}/common/getAllMessage`;
  const API_DELETE_ALL_MESSAGE = `${$rootPath}/common/deleteMessage`;

  export default {

    data () {
      return {
        title: '消息中心',
        hide: false,
        editting: false,
        todayMessage: [],
        withinAWeekMessage: [],
        aWeekAgoMessage: [],
      }
    },

    computed: {

      nodata () {
        return !this.todayMessage.length && !this.withinAWeekMessage.length && !this.aWeekAgoMessage.length;
      },

      // 已选择的消息
      selectedMessage (){
        let ret = [];
        ['todayMessage', 'withinAWeekMessage', 'aWeekAgoMessage'].forEach(arr => {
          this[arr].forEach(msg => {
            msg.selected && ret.push(msg);
          });
        });
        return ret;
      }
    },

    methods: {

      // 点击消息，选择/取消选择消息
      toggle (arr, item, index) {
        if (this.editting) {
          item.selected = !item.selected;
          this[arr].splice(index, 1, item);
        }
        else {
          this.$router.push({
            name: 'AppMineNews',
            query: Object.assign({}, this.$route.query, {
              id: item.id
            })
          })
        }
      },

      // 撤销删除
      cancel () {
        this.selectedMessage.forEach(msg => {
          msg.selected = false;
        });
        this.editting = false;
      },

      //回退按钮
      backwards(){
        if (history.state.__page == 1) {
          window.nativeCloseWebview();
        }
        else {
          this.$router.go(-1);
        }
      },

      // 删除消息
      del () {
        axios.post(API_DELETE_ALL_MESSAGE, {
          "comm": {"pid": this.$route.pid, "type": this.$route.type, "version": this.$route.version},
          "token": this.$route.token,
          "body": {
            "requestId": this.$route.requestId,
            "messageIds": this.selectedMessage.map(msg => msg.id).join(',')
          }
        }).then(response => {
          const json = response.data;
          if (json.code == '00000' && json.data && json.data.success == 'true') {
            ['todayMessage', 'withinAWeekMessage', 'aWeekAgoMessage'].forEach(arr => {
              for (let i = 0; i < this[arr].length; i++) {
                let msg = this[arr][i];
                if (msg.selected) {
                  this[arr].splice(i, 1);
                  --i;
                }
              }
            });
          }
          this.editting = false;
        });
      },

      getData () {
        axios.post(API_GET_ALL_MESSAGE, {
          "comm": {"pid": this.$route.pid, "type": this.$route.type, "version": this.$route.version},
          "token": this.$route.token,
          "body": {
            "requestId": this.$route.requestId
          }
        }).then(response => {
          const json = response.data;
          if (json.code == '00000' && json.data && json.data.length) {
            json.data.forEach(item => {
              const msgTime = new Date(item.time);
              const now = new Date();
              const today = now.getDate();
              const aWeek = now.getTime() - (1000 * 60 * 60 * 24 * 7);
              this[msgTime.getDate() === today ? 'todayMessage' : msgTime.getTime() >= aWeek ? 'withinAWeekMessage' : 'aWeekAgoMessage'].push(item);
            });
          }
        });
      }
    },

    //初始化调用事件
    created(){

      if (!history.state || !history.state.__page) {
        Object.assign(history.state || {}, {__page: history.length});
        history.replaceState(history.state, null, '');
      }

      this.getData();
    },

    mounted: function () {
    },

    components: {cTitle}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .customer-information {
    width: 100%;
    height: 100%;
    font-family: YouYuan, Tahoma, STXihei;
    position: relative;
    .title {
      width: 100%;
      height: .88rem;
      background-color: #fff;
      color: #595959;
      border-bottom: 1px solid #e6e6e6;
      .back {
        width: .19rem;
        height: .36rem;
        display: inline-block;
        margin: .26rem .42rem .26rem .32rem;
        float: left;
      }
      h1 {
        text-align: center;
        height: 100%;
        float: left;
        margin: 0;
        font-weight: normal;
        font-size: .36rem;
        line-height: .88rem;
        width: 5.64rem;
      }
      .delete {
        float: left;
        width: .61rem;
        height: .88rem;
        .cancel {
          line-height: .88rem;
          height: .88rem;
          color: #333;
          display: none;
          font-size: .3rem;
        }
        img {
          width: .36rem;
          height: .36rem;
          display: inline-block;
          float: right;
          margin: .26rem 0 .26rem .25rem;
          display: none;
        }
        .show {
          display: block;
        }
      }
    }
    .box {
      width: 100%;
      background-color: #f1f1f1;
      .news-content {
        width: 100%;
        .label {
          height: .64rem;
          line-height: .64rem;
          background-color: #f1f1f1;
          font-size: .26rem;
          color: #7f7f7f;
          padding-left: .32rem;
          display: inline-block;
        }
        ul {
          width: 100%;
          padding: 0;
          margin: 0;
          background-color: #fff;
          li {
            list-style-type: none;
            height: 1.9rem;
            width: 6.86rem;
            padding: 0 .32rem;
            position: relative;
            .checkbox {
              input {
              }
            }
            .mark {
              display: inline-block;
              width: .16rem;
              height: .16rem;
              border-radius: .08rem;
              background-color: #ff4d4d;
              position: absolute;
              top: .44rem;
              left: .12rem;
            }
            .checkbox {
              display: inline-block;
              width: .35rem;
              height: .35rem;
              border: 1px #b2b2b2 solid;
              border-radius: 50%;
              margin-top: .65rem;
            }
            .selected {
              background-color: #3295f9;
              background-image: url(../../../assets/app/mine/icon-selected-message.png);
              background-repeat: no-repeat;
              background-size: 100% 100%;
              border: 1px #3295f9 solid;;

            }
            .content {
              display: inline-block;
              font-size: .28rem;
              line-height: .36rem;
              margin: .35rem 0 .16rem;
              width: 6.78rem;
              padding-left: .08rem;
              color: #343434;
              float: right;
            }
            .content.editting {
              width: 6.2rem;
            }
            .time {
              font-size: .24rem;
              line-height: .36rem;
              color: #7f7f7f;
              margin: 0 0 0 .31rem;
              float: right;
            }
            & + li {
              border-top: 1px solid #e6e6e6;
            }
          }
        }
      }
    }
    .delete-label {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: .99rem;
      border-top: 1px solid #cdcdcd;
      background-color: #f8f8f8;
      display: none;
      img {
        width: .36rem;
        height: .36rem;
        display: inline-block;
        margin: .3rem 0 0 3.23rem;
      }
      span {
        display: inline-block;
        line-height: .99rem;
        font-size: .34rem;
        color: #3295f9;
        height: .99rem;
      }
    }
    .show {
      display: block;
    }
  }
</style>