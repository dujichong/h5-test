<template>
  <div class="components-msg" v-if="msg">
    <div>
      <img v-if="msg=='登录成功'" src="../assets/components/msg/success.png"/>
      <img v-if="msg=='提交数据失败，请稍后重试！'||msg =='系统异常,请稍后重试'" src="../assets/components/msg/fail.png"/>
    </div>
    <p>{{msg}}</p>
  </div>
</template>

<script>
  export default {
    props: ['msg'],

    methods: {
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .components-msg {
    position: absolute;
    top: 5.58rem;
    left: 1.65rem;
    z-index: 999;
    width: 4.2rem;
    height: 2.18rem;
    border-radius: .18rem;
    background-color: #303030;
    opacity: 0.8;
    div{
      margin: 0.5rem auto 0.01rem;
      width: 0.58rem;
      height: 0.58rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    p{
      margin: .3rem auto 0;
      text-align: center;
      font-size: .32rem;
      color: #fff;
    }
  }
</style>