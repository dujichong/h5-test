<template>
  <nav class="components-tab">
    <div v-for="(item, index) of list" @click="change(item, index)" :class="{item: true, active: index == currentIndex}">
      <div class="inner" @click="change(item, index)">
        <span class="prompt" v-if="item.prompt">{{item.prompt}}</span>
        {{item.text}}
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: []
      },
      defaultIndex: {
        type: Number,
        default: 0
      }
    },

    data () {
      return {
        currentIndex: this.defaultIndex
      }
    },

    methods: {
      change (item, index) {

        if (index === this.currentIndex) {
          return;
        }

        this.currentIndex = index;
        this.$emit('change', item, index);
      },
      back () {
        this.$emit('back');
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  $h: .89rem;
  $prompt-width: .38rem;
  .components-tab {
    height: $h;
    line-height: $h;
    border-bottom: 1px solid #e4e4e6;
    box-sizing: border-box;
    display: flex;
    color: #595959;
    .item {
      flex: 1;
      height: 100%;
      text-align: center;
      .inner {
        padding: 0 0.3rem;
        display: inline-block;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        .prompt {
          font-size: 8px;
          position: absolute;
          top: .12rem;
          right: -0.1rem;
          display: block;
          width: $prompt-width;
          height: $prompt-width;
          line-height: $prompt-width;
          text-align: center;
          border-radius: 50%;
          background: #ff3130;
          color: #ffffff;
        }
      }
    }
    .active {
      .inner {
        color: #00a8f0;
        border-bottom: 2px solid #3399ff;
      }
    }
  }
</style>