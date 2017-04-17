<template>
  <div>
    <c-title :text="title" :hide="true"></c-title>
    <p>{{ message }}</p>
  </div>
</template>

<script>
  import cTitle from 'components/title';

  export default {
    data () {
      return {
        title: '产品详情',
      }
    },
    
    mounted: function () {
      
    },
    methods: {
      
      test () {
        window.nativeOpen('test');
      },

      apply () {
        window.nativeOpen('apply');
      }
    },
    components: {cTitle}
  }
</script>