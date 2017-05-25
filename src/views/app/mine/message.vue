<!--我的-消息详情-->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="app-mine-message">

    <c-title :icon="true" :text="title" @iconclick="toggleEdit" ref="title">
      <span v-if="editting" class="cancel">取消</span>
      <img v-else src="../../../assets/components/title/delete.png"/>
    </c-title>

    <div class="box">
      <p class="content">{{message.message}}</p>
      <p class="time">{{message.time}}</p>
    </div>

    <div v-if="editting" class="delete-label" @click="del">
      <img src="../../../assets/app/mine/delete-label.png">
      <span>删除</span>
    </div>
  </div>
</template>
<script>

  import cTitle from 'components/title';
  import axios from 'axios';
  import {mapState} from 'vuex';

  const $rootPath = window.$rootPath;
  const API_DELETE_ALL_MESSAGE = `${$rootPath}/common/deleteMessage`;

  export default {

    data () {
      return {
        title: '消息详情',
        editting: false,
      }
    },

    computed: {
      ...mapState(['message']),
    },

    methods: {

      toggleEdit (){
        this.editting = !this.editting;
      },

      // 删除消息
      del () {
        axios.post(API_DELETE_ALL_MESSAGE, {
          "comm": {"pid": this.$route.pid, "type": this.$route.type, "version": this.$route.version},
          "token": this.$route.token,
          "body": {
            "requestId": this.$route.requestId,
            "messageIds": [this.message.id]
          }
        }).then(response => {
          const json = response.data;
          if (json.code == '00000' && json.data && json.data.success == 'true') {
            this.$refs.title.backwards();
          }
        });
      },
    },

    components: {cTitle}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .app-mine-message {
    width: 100%;
    height: 100%;
    font-family: YouYuan, Tahoma, STXihei;
    position: relative;
    .box {
      margin: 0 .32rem;
      text-align: justify;
      .time {
        font-size: .24rem;
        line-height: .36rem;
        color: #7f7f7f;
        margin: 0 0 0 .31rem;
        float: right;
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
  }
</style>