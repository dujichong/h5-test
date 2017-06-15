<!-- app 下载-->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="views-download">
    <img class="prompt" src="../assets/download/prompt.png" v-if="!isWeixin">
    <img class="bg"  src="../assets/download/bg.png">
    <a :href="downloadUrl">{{btnText}}</a>
  </div>
</template>
<script>

  import cTitle from 'components/title';
  import axios from 'axios';
  import {mapMutations, mapState} from 'vuex';

  const $rootPath = window.$rootPath;
  const API = `${$rootPath}/sale/publicController/downloadApk`;

  export default {

    data () {
      return {
        title: '下载 APP',
        os: navigator.userAgent.indexOf('iPhone') >= 0 ? 1 : 2,
        isWeixin: navigator.userAgent.indexOf('MicroMessenger') >= 0,
        downloadUrl: ''
      }
    },

    computed: {
      ...mapState(['message', 'pid', 'version', 'token', 'type']),
      btnText () {
        return this.os == 1 ? 'AppStore 打开' : '立即下载';
      },
    },

    methods: {

      getData () {
        axios.post(API, {
          comm: {
            pid: this.pid,
            type: this.type,
            version: this.version
          },
          token: this.token,
          body: {
            os: this.os
          }
        }).then(response => {
          const json = response.data;
          if (json.code == '00000' && json.data) {
            this.downloadUrl = json.data.url;
          }
        });
      }
    },

    //初始化调用事件
    created(){
      this.getData();
    },

    mounted: function () {
    },

    components: {cTitle}
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .views-download {
    position: relative;

    .prompt {
      position: absolute;
      top: 10px;
      right: 5px;
      width: 1.5rem;
    }
    .bg {
      width: 100%;
    }
    a {
      position: absolute;
      width: 6.88rem;
      height: 1.1rem;
      line-height: 1rem;
      top: 9.8rem;
      left: 50%;
      transform: translate(-50%);
      color: #ffffff;
      text-align: center;
      display: block;
      margin:  auto;
      font-size: .32rem;
    }
  }
</style>