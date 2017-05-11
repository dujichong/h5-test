<template>
  <div class="components-loading" :style="{display: show ? '' : 'none'}">
    <img src="../assets/components/loading/loading.png" alt="">
    <span>正在加载...</span>
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
  .components-loading {
    position: absolute;
    left: 2.25rem;
    top: 6.18rem;
    width: 3rem;
    height: .98rem;
    z-index: 1024;
    border-radius: .1rem;
    background-color: #5a5a5a;
    opacity: 0.8;
    img {
      animation: spin 1200ms infinite linear;
      width: .34rem;
      height: .34rem;
      z-index: 1025;
      position: absolute;
      top: .3rem;
      left: .6rem;
    }
    span{
      color: #fff;
      font-size: .32rem;
      position: absolute;
      top: .23rem;
      left: 1rem;
    }
  }
</style>