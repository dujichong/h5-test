<!--销售-进件审核-->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="app-seller-application-audit">
    <c-title skin="blue" :text="title"></c-title>
    <c-item v-for="item of list" :name="item.name" :fields="item.fields"></c-item>
    <div v-if="msg" class="msg">{{msg}}</div>
  </div>
</template>
<script>

  import cTitle from 'components/title';
  import cItem from './item';
  import axios from 'axios';

  const API = `${window.$rootPath}/sale/requestController/auditing`;

  export default {

    data () {
      return {
        title: '进件审核',
        msg: null,
        pageNo: 1,
        list: [],
      }
    },

    methods: {

      formatData (list) {

        return list.map(item => {
          return {
            name: item.customerName,
            fields: [
              {label: '客户电话', value: `<a href="tel:${item.phone}">${item.phone}</a>`},
              {label: '融资金额', value: item.requestAmount + '元'},
              {label: '进件状态', value: item.requestStatus},
              {label: '更新时间', value: item.updateTime},
            ]
          }
        });
      },

      getData (pageNo) {
        axios.post(API, {
          "comm": {"pid": this.$route.pid, "type": this.$route.type, "version": this.$route.version},
          "token": this.$route.token,
          "body": {
            "pageNo": pageNo
          }
        }).then(response => {
          const json = response.data;
          if (json.code == '00000' && json.data && json.data.list && json.data.list.length) {
            this.pageNo = pageNo;
            this.list = this.list.concat(this.formatData(json.data.list));
          }
          else {
            this.msg = '没有数据';
          }
        });
      }
    },

    //初始化调用事件
    created(){
      this.getData(1);
    },

    components: {cTitle, cItem}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .app-seller-application-audit {
    .msg {
      margin-top: .3rem;
      text-align: center;
    }
  }
</style>