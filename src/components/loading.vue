<template>
  <div class="component-loading" :style="{display: show ? '' : 'none'}">
    <img src="../assets/app/loading.png" alt="">
  </div>
</template>

<script>
  export default {
    props: ['show'],

    methods: {
      setScroll () {
        if (this.show) {
          document.querySelector('#app').style.overflow = 'hidden'
        }
        else {
          document.querySelector('#app').style.overflow = 'auto';
        }
      },
    },

    mounted () {
      this.setScroll();
    },

    updated () {
      this.setScroll();
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @keyframes spin {
    0%   { transform: rotate(360deg) ; }
    100% { transform: rotate(0deg); }
  }
  .component-loading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 1024;
    img {
      animation: spin 1200ms infinite linear;
      position: fixed;
      top: 50%;
      left: 50%;
      width: 50px;
      height: 50px;
      margin-top: -31px;
      margin-left: -31px;
      z-index: 1025;
    }
  }
</style>