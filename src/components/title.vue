<template>
  <div v-if="!hide" class="title" >
    <img src="../assets/app/title-angle.png" @click="backwards"/>
    <h1>{{ text }}</h1>
  </div>
  <!---->
</template>

<script>
  export default {

    props: ['text', 'hide'],

    watch: {
      text(){
        this.setTitle();
      }
    },

    methods: {
      setTitle(){
        document.title = this.text;
        if (navigator.userAgent.indexOf('MicroMessenger') >= 0) {
          var iframe = document.createElement("iframe");
          iframe.style.display = 'none';
          iframe.src = window.$spaRootPath + '/static/empty.png';
          iframe.onload = function () {
            setTimeout(function () {
              iframe.onload = null;
              document.body.removeChild(iframe);
            }, 0);
          };
          document.body.appendChild(iframe);
        }
      },

      //回退按钮
      backwards(){
        if(history.state.__page==1){
          window.nativeCloseWebview();
        }
        else {
          this.$router.go(-1);
        }
      },
    },

    //初始化调用事件
    created(){
      if(!history.state || !history.state.__page){
        Object.assign(history.state,{__page: history.length});
        history.replaceState(history.state, null ,'');
      }
    },

    mounted: function () {
      this.setTitle();
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  div.title{
    width: 100%;
    height: .88rem;
    img{
      width: .19rem;
      height: .36rem;
      display: inline-block;
      margin: .26rem 0 .26rem .3rem;
    }
    h1{
      text-align: center;
      height: 100%;
      float: right;
      margin: 0 .86rem 0 0;
      font-weight: normal;
      font-size: .36rem;
      line-height: .88rem;
      width: 5.88rem;
    }
  }
</style>