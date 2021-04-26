<template>
  <el-select :value="value" v-bind="$attrs" v-on="$listeners">
    <el-option v-for="option of options" v-bind='option' :key="option.label" :label="option.label" :value="option.value">
    </el-option>
    <template v-slot:prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-slot:empty>
      <slot name="empty"></slot>
    </template>
  </el-select>
</template>

<script>
export default {
  name: "custom-select",
  inheritAttrs: false,
  props: {
    value: [String, Number, Array],
    options: Array,
  },
  install(vue) {
    vue.component(this.name, this);
  },
};
</script>
