<template>
  <div :class="['progress-bar', { 'progress-bar-xs': this.size === 'xs' }]">
    <div
      class="status"
      :style="'clip-path: inset(0 ' + getWidth() + '% 0 0 round 10px)'"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'progress-bar',
  props: {
    width: {
      type: Number,
    },
    size: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    getWidth: function() {
      return 100 - this.width;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/style/components/progress-bar';
</style>
