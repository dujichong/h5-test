<template>
  <nav class="components-nav">
    <div v-if="showBack" @click="back" class="back"></div>
    <div v-for="(item, index) of list" @click="change(item, index)" :class="{item: true, active: index == current}">{{item}}</div>
  </nav>
</template>

<script>
  export default {
    props: ['list', 'showBack', 'current'],
    methods: {
      change (item, index) {
        this.$emit('change', item, index);
      },
      back () {
        this.$emit('back');
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
$mg: .30rem;
$btn-color: #666;
$blue: #66b3ff;
$h: .45rem;
$item-mg: .30rem;
.components-nav {
  background: #fff;
  padding: $mg;
  height: $h;
  display: flex;
  width: 100%;
  font-size: .30rem;
  div {
    height: $h;
    line-height: $h;
  }
  .back {
    width: .22rem;
    height: $h;
    background-image: url('../assets/images/icon-back.png');
    background-position: left center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .item {
    flex: 1;
    margin-right: $item-mg;
    text-align: right;
    &:last-child {
      text-align: left;
      margin-left: $item-mg;
    }
  }
  .active {
    color: $blue; 
    font-size: .36rem;
  }
}
</style>