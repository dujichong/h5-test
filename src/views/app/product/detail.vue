<template>
  <div class="app-product-detail">
    <c-title :text="title"
             :hide="true"></c-title>
    <c-nav :list="navs"
           :showBack="true"
           :current="currentIndex"
           @back="back"
           @change="change"></c-nav>
    <div class="info">
      <div class="info-box big">
        <div class="name">月综合费率低至(%)</div>
        <div class="value"><span>{{currentDetail.rate}}</span><span class="i">起</span></div>
      </div>
      <div class="sub">
        <div class="info-box small">
          <div class="name">期数(月)</div>
          <div class="value">{{currentDetail.months}}</div>
        </div>
        <div class="info-box small">
          <div class="name">金额高至(元)</div>
          <div class="value">{{currentDetail.money}}</div>
        </div>
      </div>
      <div class="synopsis">{{currentDetail.synopsis}}</div>
    </div>

    <div class="particular">
      <div class="item">
        <h2>产品介绍</h2>
         <div class="text">
          <p>{{currentDetail.introduce}}</p>
         </div>
      </div>
    </div>
  
  </div>
</template>

<script>
import cTitle from 'components/title';
import cNav from 'components/nav';

export default {
  data() {
    return {
      title: '产品详情',
      currentIndex: this.$route.query.id || 0,
      products: [
        {
          name: '中长期模式',
          rate: '2.28',
          months: '12-36',
          money: '30w',
          synopsis: '简介',
          introduce: '介绍',
          quota: '额度期限',
          area: '地区',
          competency: ['资格1', '资格2', '资格3', '资格4',],
          material: '材料'
        },
        {
          name: '短期模式',
          rate: '1.28',
          months: '12-36',
          money: '30w',
          synopsis: '简介',
          introduce: '介绍',
          quota: '额度期限',
          area: '地区',
          competency: ['资格1', '资格2', '资格3', '资格4',],
          material: '材料'
        }
      ]
    }
  },

  computed: {
    navs() {
      return this.products.map(item => item.name);
    },
    currentDetail() {
      return this.products[this.currentIndex];
    }
  },

  mounted: function () {

  },
  methods: {

    // tab 却换
    change(item, index) {
      this.currentIndex = index;
    },

    // 后退
    back() {
      window.nativeCloseWebview();
    },

    // 试试我能贷多少
    test() {
      window.nativeOpen('test');
    },

    // 申请
    apply() {
      window.nativeOpen('apply');
    }
  },
  components: { cTitle, cNav }
}
</script>

<style lang="scss" rel="stylesheet/scss">
$mg: 30rem;
$btn-color: #666;
$text-color: #5f788d;
$bg-color: #f1f1f1;
$blue: #66b3ff;
$red: #ff5a00;

.app-product-detail {
  background: $bg-color;
  .info {
    background: #fff;
    margin-bottom: .2rem;
    .sub {
      display: flex;
      div {
        flex: 1;
        box-sizing: border-box;
        &:first-child {
          border-right: 1px solid $bg-color;
        }
      }
    }
    .info-box {
      text-align: center;
      .name {
        color: $btn-color;
        font-size: .28rem;
        margin-bottom: .1rem;
      }
      .value {
        line-height: 100%;
        color: $red;
        font-size: .42rem;
      }
    }
    .info-box.big {
      padding: .4rem 0;
      .value {
        font-size: 1rem;
        span.i {
          font-size: .24rem;
          padding: 2px;
          position: relative;
          top: -4px;
          border-radius: 50%;
          border: 1px solid $red;
        }
      }
    }
    .info-box.small {
      .value {
        span.i {
          font-size: .24rem;
          padding: 2px;
          position: relative;
          top: -4px;
          border-radius: 50%;
          border: 1px solid $red;
        }
      }
    }
    .synopsis {
      border: 1px solid $blue;
      border-radius: 20px;
      color: $blue;
      width: 80%;
      line-height: 200%;
      margin: .4rem auto;
      text-align: center;
    }
  }
  .particular {
    .item {
      h2 {
        color: #333333;
        font-size: .32rem;
        border-left: 2px solid $blue;
        text-indent: 10px;
      }
      .text {
        p {
          margin-bottom: .3rem;
        }
      }
    }
  }
}
</style> 