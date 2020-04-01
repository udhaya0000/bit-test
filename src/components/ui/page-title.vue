<template>
  <h1 :class="titleClass">
    <span class="page-title__text">
      <slot></slot>
    </span>
  </h1>
</template>

<script>
export default {
  props: {
    titleClass: {
      type: String,
      default: 'page-title',
    },
  },
};
</script>

<style lang="scss">
@import '~@/style/components/title';
</style>
