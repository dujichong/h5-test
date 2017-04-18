<template>
  <div>
    <c-title :text="title" :hide="true"></c-title>
    <c-nav :list="navs" :showBack="true" @back="back" @change="change"></c-nav>
  </div>
</template>

<script>
  import cTitle from 'components/title';
  import cNav from 'components/nav';

  export default {
    data () {
      return {
        title: '产品详情',
        currentIndex: 0,
        products: [
          {
            name: '产品1',
            rate: '2.28',
            months: '12-36',
            money: '30W',
            synopsis: '简介',
            introduce: '介绍',
            quota: '额度期限',
            area: '地区',
            competency: ['资格1','资格2','资格3','资格4',],
            material: '材料'
          },
          {
            name: '产品2',
            rate: '1.28',
            months: '12-36',
            money: '30W',
            synopsis: '简介',
            introduce: '介绍',
            quota: '额度期限',
            area: '地区',
            competency: ['资格1','资格2','资格3','资格4',],
            material: '材料'
          }
        ]
      }
    },

    computed: {
      navs () {
        return this.products.map(item => item.name);
      },
      currentDetail () {
        return this.products[this.currentIndex];
      }
    },
    
    mounted: function () {
      
    },
    methods: {

      // tab 却换
      change (item, index) {
        this.currentIndex = index;    
      },

      // 后退
      back () {
        window.nativeCloseWebview();
      },
      
      // 试试我能贷多少
      test () {
        window.nativeOpen('test');
      },

      // 申请
      apply () {
        window.nativeOpen('apply');
      }
    },
    components: {cTitle, cNav}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
$mg: 30rem;
$btn-color: #666;
$text-color: #5f788d;
$bg-color: #f1f1f1;
$blue: #66b3ff;
$red: #ff5a00;

</style>