<!--销售-进件审核-->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="app-seller-application-verify">
    <c-title skin="blue" :text="title"></c-title>
    <div class="box">
      <div v-if="!list.length" class="nodata">没有数据</div>
      <div class="content"></div>
    </div>
  </div>
</template>
<script>

  import cTitle from 'components/title';
  import axios from 'axios';

  const $rootPath = window.$rootPath;
  const API = `${window.$rootPath}/common/getTotalMessage`;

  export default {

    data () {
      return {
        title: '进件审核',
        list: [],
      }
    },

    methods: {

      getData () {
        axios.post(API, {
          "comm": {"pid": this.$route.pid, "type": this.$route.type, "version": this.$route.version},
          "token": this.$route.token,
          "body": {
            "requestId": this.$route.requestId
          }
        }).then(response => {
          const json = response.data;
          if (json.code == '00000' && json.data && json.data.length) {
            this.list = json.data;
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
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .app-seller-application-verify {
    .box {
      background: #fff;
      .nodata {
        margin-top: .3rem;
        text-align: center;
      }
    }
  }
</style>