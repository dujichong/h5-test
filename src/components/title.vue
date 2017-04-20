<template>
  <div class="title" @click="backwards">
    <img src="../assets/app/title-angle.png" />
    <h1>{{ text }}</h1>
    <!--v-if="!hide"-->
  </div>
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
          }
          document.body.appendChild(iframe);
        }
      },
      backwards(){
        //router.go(-1);
        this.$router.go(-1);
      },
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
      margin: 0 .49rem 0 0;
      font-weight: normal;
      font-size: .36rem;
      line-height: .88rem;
      width: 6.52rem;
    }
  }
</style>