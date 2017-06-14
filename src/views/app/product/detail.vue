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

      <div class="item">
        <h2>额度限制</h2>
        <div class="text">
          <p v-html="currentDetail.quota"></p>
        </div>
      </div>

      <div class="item">
        <h2>适用地区</h2>
        <div class="text">
          <p>{{currentDetail.area}}</p>
        </div>
      </div>

      <div class="item">
        <h2>申请资格</h2>
        <div class="text">
          <p v-for="(item, index) of currentDetail.competency">{{index + 1}}. {{item}}</p>
        </div>
      </div>

      <div class="item">
        <h2>所需材料</h2>
        <div class="text">
          <p>{{currentDetail.material}}</p>
        </div>
      </div>
    </div>

    <footer>
      <div class="btn-test" @click="test"><i></i>试试我能贷多少</div>
      <div class="btn-apply" @click="apply">立即申请</div>
    </footer>
  </div>
</template>

<script>
  import cTitle from 'components/title';
  import cNav from 'components/nav';
  import {mapMutations, mapState} from 'vuex';


  export default {
    data() {
      return {
        title: '产品详情',
        currentIndex: this.$route.query.id || 0,
        products: [
          {
            name: '中长期模式',
            rate: '1.28',
            months: '12-36',
            money: '30w',
            synopsis: '属于职场人士和企业经营者的中长期资金周转方案',
            introduce: '适用于本人名下拥有符合条件的车产，收入流水稳定，有长期资金周转需求的上班族或企业经营者。',
            quota: '车辆融资的申请额度在4-30万元人民币。<br>申请期限为12、24、36个自然月。',
            area: '本车辆融资业务目前暂时适用于兰州、贵州、九江、赤峰、济南这5个城市，其余城市待开放中，敬请期待。',
            competency: [
              '中国（不含港澳台）公民。',
              '申请人本人名下拥有当地车管所登记的非运营性质机动车。',
              '连续六个月以上稳定的收入流水。',
            ],
            material: '二代身份证、机动车登记证、机动车行驶证、借款人驾驶证、征信报告、经营证明、收入证明等。'
          },
          {
            name: '短期模式',
            rate: '2.38',
            months: '3',
            money: '30w',
            synopsis: '为您提供超短期资金周转最佳方案',
            introduce: '适用于本人名下拥有符合条件的车产，收入流水稳定，有短期资金周转需求的上班族或企业经营者。',
            quota: '车辆融资的申请额度在4-30万元人民币。<br>申请期限为3个自然月。',
            area: '本车辆融资业务目前暂时适用于兰州、贵州、九江、赤峰、济南这5个城市，其余城市待开放中，敬请期待。',
            competency: [
              '中国（不含港澳台）公民。',
              '申请人本人名下拥有当地车管所登记的非运营性质机动车。',
              '连续六个月以上稳定的银行流水。',
            ],
            material: '二代身份证、机动车登记证、机动车行驶证、借款人驾驶证、征信报告、经营证明、收入证明等。'
          }
        ]
      }
    },

    computed: {
      ...mapState(['message', 'pid', 'version', 'token', 'type']),

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
        window.native.CloseWebview();
      },

      // 试试我能贷多少
      test() {
        window.native.open(this.token ? 'test' : 'login');
      },

      // 申请
      apply() {
        window.native.open(this.token ? 'apply' : 'login');
      }
    },
    components: {cTitle, cNav}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  $mg: .30rem;
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
      padding-bottom: .4rem;
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
        margin: .4rem auto 0;
        text-align: center;
      }
    }
    .particular {
      background: #fff;
      padding: $mg $mg 2.5rem $mg;
      .item {
        border-bottom: 1px solid $bg-color;
        &:last-child {
          border-bottom: none
        }
        h2 {
          line-height: 100%;
          color: #333333;
          font-size: .32rem;
          border-left: 2px solid $blue;
          text-indent: 10px;
        }
        .text {
          color: $text-color;
          font-size: .28rem;
          p {
            margin: 0 0 .2rem 0;
          }
        }
      }
    }
    footer {
      box-sizing: border-box;
      position: fixed;
      width: 100%;
      left: 0;
      bottom: 0;
      background: #fff;
      padding: $mg;
      text-align: center;
      font-size: .36rem;
      .btn-test {
        color: $blue;
        margin-bottom: $mg;
        font-size: .30rem;
        i {
          display: inline-block;
          width: .32rem;
          height: .32rem;
          background-image: url(../../../assets/app/product/icon-test.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          margin-right: 5px;
          position: relative;
          top: .045rem;
        }
      }
      .btn-apply {
        color: #fff;
        border-radius: 40px;
        width: 100%;
        height: .98rem;
        line-height: .98rem;
        background: linear-gradient(to right, #45bbff, #3399ff);
      }
    }
  }
</style> 