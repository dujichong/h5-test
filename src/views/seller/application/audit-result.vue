<!--销售-审核结果-->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="app-seller-application-audit-result">
    <c-title skin="blue" :text="title"></c-title>
    <c-tab :list="tabs" @change="changeList"></c-tab>
    <c-item v-for="item of list" :name="item.name" :fields="item.fields"></c-item>
    <div v-if="msg" class="msg">{{msg}}</div>
  </div>
</template>
<script>

  import cTitle from 'components/title';
  import cTab from 'components/tab';
  import cItem from './item';
  import axios from 'axios';
  import {mapMutations, mapState} from 'vuex';

  const API = `${window.$rootPath}/sale/requestController/auditResult`;
  let timmer;

  export default {

    data () {
      return {
        title: '审核结果',
        msg: null,
        currentTabIndex: 0,
        tabs: [
          {
            tab: 'approve',
            prompt: 0,
            text: '批核',
          },
          {
            tab: 'refuse',
            prompt: 0,
            text: '拒贷',
          },
          {
            tab: 'return',
            prompt: 0,
            text: '推荐',
          },
          {
            tab: 'giveup',
            prompt: 0,
            text: '放弃',
          },
        ],
        approveList: [],
        refuseList: [],
        returnList: [],
        giveupList: [],
        approvePageNo: 1,
        refusePageNo: 1,
        returnPageNo: 1,
        giveupPageNo: 1,
        approveLoading: false,
        refuseLoading: false,
        returnLoading: false,
        giveupLoading: false,
      }
    },

    computed: {
      ...mapState(['pid', 'version', 'token', 'type']),
      tab () {
        return this.tabs[this.currentTabIndex].tab;
      },
      list () {
        return this[`${this.tab}List`];
      }
    },

    methods: {

      changeList (tabData, index){
        this.currentTabIndex = index;
      },

      formatData (list) { // todo
        return list.map(item => {
          return {
            name: item.customerName,
            fields: [
              {
                label: '客户电话',
                value: `<a href="tel:${item.phone}">${item.phone}</a>`
              },
              {label: '融资申请', value: `${item.requestAmount}元`},
              {label: '融资期限', value: item.requestDeadline},
              {label: '进件状态', value: item.requestStatus},
              {label: '更新时间', value: item.updateTime},
            ]
          }
        });
      },

      getData (pageNo, tab) {

        if (this[`${tab}Loading`]) {
          return;
        }

        this[`${tab}Loading`] = true;
        axios.post(`${API}/${tab}`, {
          comm: {
            pid: this.pid,
            type: this.type,
            version: this.version
          },
          token: this.token,
          body: {
            requestId: this.$route.query.requestId,
            pageNo: pageNo,
          }
        }).then(response => {
          const json = response.data;
          if (json.code == '00000' && json.data && json.data.list && json.data.list.length) {
            for (let i = 0; i < this.tabs.length; i++) {
              if (this.tabs[i].tab === tab) {
                this.tabs[i].prompt += parseInt(json.data.number, 10);
                this.$set(this.tabs, i, this.tabs[i]);
              }
            }
            this[`${tab}PageNo`] = pageNo;
            this[`${tab}List`] = this[`${tab}List`].concat(this.formatData(json.data.list));
          }
          else {
            this.msg = '没有数据';
          }
          this[`${tab}Loading`] = false;
        }).catch((err) => {
          this[`${tab}Loading`] = false;
        });
      },

      getNextPageData () {
        self = this;
        clearTimeout(timmer);
        timmer = setTimeout(function() {
          if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
            self.getData(self[`${self.tab}PageNo`] + 1, self.tab);
          }
        }, 300);
      },
    },

    //初始化调用事件
    created(){
      ['approve', 'refuse', 'return', 'giveup'].forEach(item => {
        this.getData(1, item);
      });
    },

    mounted () {
      window.addEventListener('scroll', this.getNextPageData);
    },

    destroyed () {
      window.removeEventListener('scroll', this.getNextPageData);
    },

    components: {cTitle, cTab, cItem}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .app-seller-application-audit-result {
    .msg {
      margin-top: .3rem;
      text-align: center;
    }
  }
</style>