<!--suppress ALL -->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  import {mapState} from 'vuex';
  import cTitle from 'components/title';

  export default {
    data () {
      return {}
    },

    computed: {
      ...mapState([
        'pid',
        'version',
        'token',
        'type',
      ])
    },

    created () {
      if (native.getDeviceInfo) {
        const jsonDeviceInfo = native.getDeviceInfo();
        const dataDeviceInfo = JSON.parse(jsonDeviceInfo);
        ['pid', 'version', 'token', 'type'].forEach(key => this.$store.commit(key, dataDeviceInfo[key]));
      }
    },

    updated (){
      let winHeight = window.innerHeight;
      let appHeight = this.$el.offsetHeight;
      winHeight > appHeight && (this.$el.style.height = winHeight + 'px');
    },

    components: {cTitle}
  }

</script>

<style lang="scss" rel="stylesheet/scss">

  html, body {
    position: relative;
    min-height: 100%;
    width: 100%;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    /*-webkit-transform: translate3d(0,0,0);*/
  }

  body {
    font-family: Roboto, Noto, Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    color: #212121;
    font-size: 14px;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    background: #fff;
    /*overflow: hidden;*/
  }

  * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-touch-callout: none;
  }

  a,
  input,
  textarea,
  button,
  select {
    resize: none;
    outline: 0;
  }

  a {
    text-decoration: none;
    color: #2196f3;
  }

  p {
    margin: 1em 0;
  }

  .clear:after {
    height: 0;
    clear: both;
    content: ".";
    display: block;
    visibility: hidden;
  }

  body {
    #app {
      #scroll-top {
        height: 1px;
        top: 0px;
        position: absolute;
      }
    }
    .mint-msgbox {
      border-radius: 7px;
      .mint-msgbox-btn {
        font-size: 16px;
      }
      .mint-msgbox-confirm {
        color: #fff;
        background-color: #45aa9c;
      }
      .mint-msgbox-cancel {
        color: #45aa9c;
      }
    }
  }
</style>

