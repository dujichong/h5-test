<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="app-seller-application-item">
    <h4>{{name}}</h4>
    <p v-for="f of fields">{{f.label}}: <span v-html="f.value"></span></p>
  </div>
</template>

<script>
  export default {
    props: ['name', 'fields'],
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .app-seller-application-item {
    border-bottom: 1px solid #e3e3e5;
    padding: .28rem .32rem;
    h4 {
      margin: 0;
      padding-bottom: .16rem;
      color: #333333;
    }
    p {
      margin: 0;
      margin-bottom: .1rem;
      color: #666666;
      a {
        color: #3399ff;
        text-decoration: none;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }

  }
</style>