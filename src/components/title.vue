<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div v-if="!hide" class="components-title" :class="'components-title-' + skin">
    <span class="arrow" @click="backwards"></span>
    <div v-if="icon" class="icon" @click="iconClick">
      <slot></slot>
    </div>
    <h1>{{ text }}</h1>
  </div>
</template>

<script>
  export default {

    props: {
      // 标题文字
      text: {
        type: String,
        default: ''
      },
      // 是否隐藏
      hide: {
        type: Boolean,
        default: false
      },
      // 皮肤：white, blue, black
      skin: {
        type: String,
        default: 'white'
      },
      // 是否显示右侧图标
      icon: {
        type: Boolean,
        default: false
      }
    },

    watch: {
      text(){
        this.setTitle();
      }
    },

    methods: {

      iconClick (){
        this.$emit('iconclick')
      },


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
        if(!history.state || !history.state.__page || history.state.__page <= 1){
          native.closeWebview();
        }
        else {
          this.$router.go(-1);
        }
      },
    },

    //初始化调用事件
    created(){
      if(!history.state || !history.state.__page){
        history.replaceState(Object.assign(history.state || {}, {__page: history.length}), null , '');
      }
    },

    mounted: function () {
      this.setTitle();
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .components-title {
    width: 100%;
    height: .88rem;
    line-height: .88rem;
    position: relative;
    .arrow {
      position: absolute;
      top: .26rem;
      left: .32rem;
      width: .19rem;
      height: .36rem;
      display: block;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    h1 {
      text-align: center;
      height: 100%;
      margin: 0;
      font-weight: normal;
      font-size: .36rem;
    }
    .icon {
      position: absolute;
      top: 0;
      right: .26rem;
      width: .61rem;
      text-align: right;
      img {
        width: .36rem;
        height: .36rem;
        display: inline-block;
        margin-top: .25rem;
      }
      span {
        font-size: .3rem;
      }
    }
  }

  .components-title-white {
    background-color: #fff;
    color: #595959;
    .arrow {
      background-image: url(../assets/components/title/title-angle.png);
    }
  }

  .components-title-blue {
    background-color: #3399ff;
    color: #fff;
    .arrow {
      background-image: url(../assets/components/title/back.png);
    }
  }

  .components-title-black {
    background-color: #000;
    color: #fff;
    .arrow {
      background-image: url(../assets/components/title/back.png);
    }
  }
</style>