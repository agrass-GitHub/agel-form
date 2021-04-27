<template>
  <el-input :value="value" v-bind="$attrs" v-on="$listeners">

  </el-input>
</template>

<script>
export default {
  name: "agel-map-input",
  inheritAttrs: false,
  props: {
    value: String,
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>
