<template>
  <nav class="components-nav">
    <div v-if="showBack" @click="back" class="back"></div>
    <div v-for="(item, index) of list" @click="change(item, index)" class="item">{{item}}</div>
  </nav>
</template>

<script>
  export default {
    props: ['list', 'showBack'],
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
$mg: 30rem;
$btn-color: #666;
$blue: #66b3ff;
$h: 87rem;
.components {
  padding: $mg;
  box-sizing: border-box;
  height: 87rem;
  div {
    height: $h;
    line-height: $h;
  }
  .back {
    background: url("../../");
  }
}
</style>