<template>
  <div>
    <input type="text">
    <!-- 显示失败 -->
    <span v-if="$slots.default">
      <slot></slot>
    </span>
    <slot-render :render="$scopedSlots.name" user="ljfljfljf"></slot-render>
    <!-- <slot name="name" user="ljfljfljf">
    </slot> -->
  </div>
</template>
 
<script>
import slotRender from "./slot-render";

export default {
  name: "agel-map-input",
  components: {
    slotRender,
  },
  data() {
    return {};
  },
  mounted() {
    // console.log(this.$slots, this.$scopedSlots);
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>
 
<style lang="scss" >
</style>