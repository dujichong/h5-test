<!--销售-结清进件-->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="app-seller-application-settled">
    <c-title skin="blue" :text="title"></c-title>
    <c-item v-for="item of list" :name="item.name" :fields="item.fields"></c-item>
    <div v-if="msg" class="msg">{{msg}}</div>
  </div>
</template>
<script>

  import cTitle from 'components/title';
  import cItem from './item';
  import axios from 'axios';

  const API = `${window.$rootPath}/sale/requestController/settled`;
  let timmer;

  export default {

    data () {
      return {
        loading: false,
        title: '结清进件',
        msg: null,
        pageNo: 1,
        list: [],
      }
    },

    computed: {
      ...mapState(['pid', 'version', 'token', 'type', 'requestId']),
    },

    methods: {

      formatData (list) {

        return list.map(item => {
          return {
            name: item.customerName,
            fields: [
              { label: '客户电话', value: `<a href="tel:${item.phone}">${item.phone}</a>`},
              {label: '融资金融', value: `${item.requestAmount}元`},
              {label: '还款期数', value: item.repaymentPeriod},
              {label: '账单日', value: item.billDate},
              {label: '进件状态', value: item.requestStatus},
              {label: '更新时间', value: item.updateTime},
            ]
          }
        });
      },

      getData (pageNo) {

        if (this.loading) {
          return;
        }

        this.loading = true;
        axios.post(API, {
          comm: {
            pid: this.pid,
            type: this.type,
            version: this.version
          },
          token: this.token,
          body: {
            requestId: this.requestId,
            pageNo: pageNo
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
          this.loading = false;
        }).catch((err) => {
          this.loading = false;
        });
      },

      getNextPageData () {
        self = this;
        clearTimeout(timmer);
        timmer = setTimeout(function() {
          if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
            self.getData(self.pageNo + 1);
          }
        }, 300);
      },
    },

    //初始化调用事件
    created () {
      this.getData(1);
    },

    mounted () {
      window.addEventListener('scroll', this.getNextPageData);
    },

    destroyed () {
      window.removeEventListener('scroll', this.getNextPageData);
    },

    components: {cTitle, cItem}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .app-seller-application-settled {
    .msg {
      margin-top: .3rem;
      text-align: center;
    }
  }
</style>