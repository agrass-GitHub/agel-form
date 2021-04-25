<template>
  <div>
    <span>默认</span>
    <!-- 显示失败 -->
    <span v-if="$slots.default">
      <slot></slot>
    </span>
    <slot name="name" user="ljf"></slot>
  </div>
</template>
 
<script>
export default {
  name: "agel-map-input",
  data() {
    return {};
  },
};
</script>
 
<style lang="scss" >
</style>